#!/usr/bin/env node
/**
 * github_stack_scan.mjs — inventaris bukti stack dari repo lokal + GitHub publik.
 *
 * Pakai:
 *   node scripts/github_stack_scan.mjs --root ~/Documents --out .hermes/analysis
 *
 * Opsi:
 *   --root       daftar root yang di-scan, dipisah koma (default: ~/Documents)
 *   --inventory  direktori yang isinya nama service (bukan repo git), dipisah koma
 *   --out        direktori output (default: .hermes/analysis)
 *   --author     email git milik user (default: harits.abdullah19@gmail.com)
 *   --depth      kedalaman walk dari root (default: 5)
 *
 * Keamanan: hanya membaca manifest/konfigurasi. File berpola kredensial
 * (*.pem, *.key, .env asli, *secret*, *credential*) selalu dilewati.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, existsSync, mkdirSync, writeFileSync, statSync } from "node:fs";
import { join, relative, basename } from "node:path";
import { homedir } from "node:os";
import {
  CONFIG_RE,
  MANIFEST_NAMES,
  PARSERS,
  SECRET_RE,
  detectInfra,
} from "./lib/github_parsers.mjs";
import { resolveToken } from "./lib/github_token.mjs";

// ---------- args ----------
const argv = process.argv.slice(2);
const opt = {};
for (let i = 0; i < argv.length; i++) {
  if (!argv[i].startsWith("--")) continue;
  opt[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
}
const expand = (p) => p.replace(/^~/, homedir());
const ROOTS = String(opt.root || join(homedir(), "Documents")).split(",").map((s) => expand(s.trim()));
const INVENTORY = String(opt.inventory || "").split(",").filter(Boolean).map((s) => expand(s.trim()));
const OUT = String(opt.out || ".hermes/analysis");
// Identitas git milik user bisa lebih dari satu (email pribadi + noreply GitHub).
const AUTHOR_EMAILS = String(
  opt.author || "harits.abdullah19@gmail.com,135287869+abdullah-harits@users.noreply.github.com,38558796+Harits19@users.noreply.github.com,Harits19@users.noreply.github.com",
)
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);
const AUTHOR_EMAIL = AUTHOR_EMAILS[0];
const MAX_DEPTH = Number(opt.depth || 5);
// ---------- token (dari env atau file, tidak pernah dicetak) ----------
const TOKEN = resolveToken({ tokenFile: typeof opt["token-file"] === "string" ? opt["token-file"] : undefined });
const SELF_OWNERS = ["harits19"];
const ORG_OWNERS = ["1engage", "1engage-dm", "ipm"];

const SKIP_DIRS = new Set([
  "node_modules", ".next", "vendor", ".dart_tool", "build", "dist", "out", ".terraform",
  "Pods", ".venv", "venv", "__pycache__", "bin", "pkg", "logs", "target", ".gradle",
  ".idea", ".vscode", "coverage", "site-packages",
]);

// ---------- helpers ----------
function sh(cmd, args, cwd) {
  try {
    return execFileSync(cmd, args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], maxBuffer: 32 * 1024 * 1024 }).trim();
  } catch {
    return "";
  }
}
const git = (repo, args) => sh("git", ["-C", repo, ...args], undefined);
const lines = (s) => s.split("\n").map((x) => x.trim()).filter(Boolean);

function walkRepos(root, depth = MAX_DEPTH, acc = []) {
  let entries = [];
  try {
    entries = readdirSync(root, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const e of entries) {
    if (!e.isDirectory() || SKIP_DIRS.has(e.name) || e.name.startsWith(".")) continue;
    const full = join(root, e.name);
    if (existsSync(join(full, ".git"))) {
      acc.push(full);
      continue; // jangan masuk ke dalam repo lain
    }
    if (depth > 0) walkRepos(full, depth - 1, acc);
  }
  return acc;
}

function noteFile(repo, rel, acc) {
  const full = join(repo, rel);
  if (!existsSync(full)) return;
  try {
    if (statSync(full).size > 512 * 1024) return; // tolak file raksasa
    acc.push({ rel, body: readFileSync(full, "utf8") });
  } catch {
    /* skip */
  }
}

function topLevel(repo, maxDepth = 2) {
  const acc = [];
  const rec = (dir, depth) => {
    let entries = [];
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.isDirectory()) {
        if (SKIP_DIRS.has(e.name) || e.name.startsWith(".")) continue;
        if (depth > 1) rec(join(dir, e.name), depth - 1);
        continue;
      }
      if (SECRET_RE.test(e.name)) continue;
      const rel = relative(repo, join(dir, e.name));
      if (MANIFEST_NAMES.has(e.name) || CONFIG_RE.test(e.name)) noteFile(repo, rel, acc);
    }
  };
  rec(repo, maxDepth);
  return acc;
}

// ---------- scan satu repo ----------
function scanRepo(repo) {
  const originRaw = git(repo, ["config", "--get", "remote.origin.url"]);
  const origin = originRaw.replace(/^git@([^:]+):/, "https://$1/").replace(/\.git$/, "");
  const owner = (origin.match(/github\.com\/([^/]+)\//) || [])[1] || "";
  // hitung kontribusi dari SEMUA identitas user (email pribadi + noreply GitHub)
  const authorRows = lines(git(repo, ["log", "--pretty=%ae|%ad", "--date=short"]))
    .map((l) => {
      const [email, date] = l.split("|");
      return { email: (email || "").toLowerCase(), date };
    })
    .filter((r) => AUTHOR_EMAILS.includes(r.email));
  const myCommits = authorRows.length;
  const datesByAuthor = authorRows.map((r) => r.date).filter(Boolean);
  const identityTally = authorRows.reduce((acc, r) => ({ ...acc, [r.email]: (acc[r.email] || 0) + 1 }), {});
  const totalCommits = Number(git(repo, ["rev-list", "--count", "HEAD"])) || 0;
  const allDates = lines(git(repo, ["log", "--pretty=%ad", "--date=short"]));

  const files = topLevel(repo);
  const deps = new Set();
  const manifests = [];
  const infra = new Set();
  const ci = [];
  const openapi = [];

  for (const { rel, body } of files) {
    const name = basename(rel);
    const parser = PARSERS[name];
    if (parser) {
      manifests.push(rel);
      try {
        for (const d of parser(body)) deps.add(String(d));
      } catch {
        /* manifest rusak → lewati */
      }
    }
    detectInfra(name, body, infra, openapi, rel);
  }

  const wfDir = join(repo, ".github", "workflows");
  if (existsSync(wfDir)) {
    try {
      ci.push(...readdirSync(wfDir).filter((f) => /\.ya?ml$/i.test(f)));
    } catch { /* skip */ }
  }
  if (existsSync(join(repo, ".gitlab-ci.yml"))) ci.push(".gitlab-ci.yml");

  const readme = ["README.md", "readme.md", "README.MD"].find((f) => existsSync(join(repo, f)));
  const readmeChars = readme ? Math.min(readFileSync(join(repo, readme), "utf8").length, 20000) : 0;

  const commitsByAuthor = myCommits;
  let category = "reference";
  if (SELF_OWNERS.includes(owner.toLowerCase())) category = myCommits > 0 ? "authored" : "self-fork-quiet";
  else if (ORG_OWNERS.includes(owner.toLowerCase())) category = myCommits > 0 ? "org-internal" : "org-readonly";
  else if (myCommits > 0) category = "external-contrib";

  return {
    name: basename(repo),
    path: relative(homedir(), repo),
    origin,
    owner,
    category,
    commitsByAuthor,
    identityTally,
    activityShare: totalCommits ? Number((commitsByAuthor / totalCommits).toFixed(3)) : null,
    totalCommits,
    firstCommitByAuthor: datesByAuthor[datesByAuthor.length - 1] || null,
    lastCommitByAuthor: datesByAuthor[0] || null,
    repoFirstCommit: allDates[allDates.length - 1] || null,
    repoLastCommit: allDates[0] || null,
    manifests,
    deps: [...deps].sort(),
    infra: [...infra].sort(),
    ci,
    openapi,
    readme: readme || null,
    readmeChars,
  };
}

// ---------- GitHub publik ----------
async function scanGithubUser(user = "Harits19") {
  const headers = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};
  try {
    const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`, { headers });
    if (!res.ok) {
      console.warn(`[warn] GitHub API ${res.status} untuk ${user}${TOKEN ? "" : " (tanpa token: rate limit 60/jam)"}`);
      return [];
    }
    return (await res.json()).map((r) => ({
      name: r.name,
      origin: r.html_url,
      fork: r.fork,
      archived: r.archived,
      private: r.private,
      language: r.language,
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
      homepage: r.homepage || null,
      pages: Boolean(r.has_pages),
      description: r.description,
      topics: r.topics || [],
    }));
  } catch (err) {
    console.warn(`[warn] gagal memanggil GitHub API: ${err.message}`);
    return [];
  }
}

// ---------- agregasi ----------
function dedupe(repos) {
  const best = new Map();
  for (const r of repos) {
    const key = (r.origin || r.name).replace(/\.git$/, "").toLowerCase() || `${r.owner}/${r.name.replace(/-1$/, "")}`;
    const prev = best.get(key);
    if (!prev || r.commitsByAuthor > prev.commitsByAuthor) best.set(key, r);
  }
  return [...best.values()];
}

function tally(repos, pick) {
  const map = new Map();
  for (const r of repos) for (const v of pick(r)) map.set(v, [...(map.get(v) || []), r.name]);
  return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
}

function buildInventory(dirs) {
  const out = {};
  for (const d of dirs) {
    try {
      out[d.replace(homedir(), "~")] = readdirSync(d, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
    } catch { /* skip */ }
  }
  return out;
}

function toMarkdown(rep) {
  const ev = rep.localRepos.filter((r) => ["authored", "org-internal", "external-contrib"].includes(r.category));
  const ref = rep.localRepos.filter((r) => ["reference", "org-readonly", "self-fork-quiet"].includes(r.category));
  const repoRows = ev
    .sort((a, b) => b.commitsByAuthor - a.commitsByAuthor)
    .map((r) => `| ${r.name} | ${r.category} | ${r.commitsByAuthor}/${r.totalCommits} (${Math.round((r.activityShare || 0) * 100)}%) | ${r.repoFirstCommit || "?"} → ${r.repoLastCommit || "?"} | ${r.manifests.join(", ") || "-"} | ${r.infra.length} | ${r.ci.length} |`);
  const depRows = rep.depTally
    .filter(([, repos]) => repos.length >= 2)
    .slice(0, 80)
    .map(([d, repos]) => `| ${d} | ${repos.length} | ${repos.slice(0, 4).join(", ")}${repos.length > 4 ? "…" : ""} |`);
  const infraRows = rep.infraTally
    .map(([k, repos]) => `| ${k} | ${repos.length} | ${repos.slice(0, 4).join(", ")}${repos.length > 4 ? "…" : ""} |`);
  const inv = Object.entries(rep.serviceInventory)
    .map(([dir, names]) => `### ${dir} (${names.length})\n\n${names.map((n) => `- ${n}`).join("\n")}`)
    .join("\n\n");

  return `# GitHub Stack Report

Dibuat: ${rep.generatedAt}
Author email: ${rep.authorEmail}
Root yang di-scan: ${rep.roots.join(", ")}

## Summary

\`\`\`json
${JSON.stringify(rep.summary, null, 2)}
\`\`\`

## Repo dengan bukti kontribusi (authored / org-internal / external-contrib)

Commit ditulis sebagai \`commit-oleh-user/total-commit\`.

| Repo | Kategori | Commit | Rentang (repo) | Manifest | File infra | CI |
|---|---|---|---|---|---|---|
${repoRows.join("\n")}

## Dependensi terbanyak (bukti lintas repo)

| Dependency | Jumlah repo | Contoh repo |
|---|---|---|
${depRows.join("\n")}

## Infra & konfigurasi

| Sinyal | Jumlah repo | Contoh repo |
|---|---|---|
${infraRows.join("\n")}

## Repo tanpa bukti kontribusi (referensi/fork/org-readonly — JANGAN masuk CV)

${ref.map((r) => `- ${r.name} (${r.origin || "tanpa remote"}, ${r.category})`).join("\n")}

## Inventori service (dari direktori non-git)

${inv || "_tidak ada_"}
`;
}

// ---------- main ----------
const localRaw = ROOTS.flatMap((r) => walkRepos(r)).map(scanRepo);
const localRepos = dedupe(localRaw);
const remote = await scanGithubUser();
const remoteNames = new Set(remote.map((r) => r.name));
const evidence = localRepos.filter((r) => ["authored", "org-internal", "external-contrib"].includes(r.category));

const report = {
  generatedAt: new Date().toISOString(),
  authorEmail: AUTHOR_EMAIL,
  roots: ROOTS,
  summary: {
    localRaw: localRaw.length,
    localAfterDedupe: localRepos.length,
    authored: localRepos.filter((r) => r.category === "authored").length,
    orgInternal: localRepos.filter((r) => r.category === "org-internal").length,
    externalContrib: localRepos.filter((r) => r.category === "external-contrib").length,
    reference: localRepos.filter((r) => r.category === "reference").length,
    orgReadonly: localRepos.filter((r) => r.category === "org-readonly").length,
    selfForkQuiet: localRepos.filter((r) => r.category === "self-fork-quiet").length,
    reposWithCommitsByAuthor: localRepos.filter((r) => r.commitsByAuthor > 0).length,
    myCommitsTotal: localRepos.reduce((s, r) => s + r.commitsByAuthor, 0),
    authorIdentities: AUTHOR_EMAILS,
    githubPublicRepos: remote.length,
    githubNonFork: remote.filter((r) => !r.fork).length,
  },
  depTally: tally(evidence, (r) => r.deps),
  infraTally: tally(evidence, (r) => r.infra),
  serviceInventory: buildInventory(INVENTORY),
  evidenceRepos: evidence,
  localRepos,
  githubPublicRepos: remote,
  localOnlyNames: localRepos.filter((r) => r.origin && !remoteNames.has(r.name)).map((r) => r.name),
};

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "github_stack_report.json"), JSON.stringify(report, null, 2));
writeFileSync(join(OUT, "github_stack_report.md"), toMarkdown(report));
console.log(JSON.stringify(report.summary, null, 2));
console.log(`\ntotal deps unik: ${report.depTally.length}`);
console.log(`output: ${join(OUT, "github_stack_report.json")}, ${join(OUT, "github_stack_report.md")}`);
