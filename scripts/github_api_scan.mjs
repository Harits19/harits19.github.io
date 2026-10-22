#!/usr/bin/env node
/**
 * github_api_scan.mjs — inventaris bukti stack langsung dari GitHub API,
 * termasuk repo privat (perlu token). Tidak perlu clone lokal.
 *
 * Pakai:
 *   node scripts/github_api_scan.mjs --out .hermes/analysis
 *   node scripts/github_api_scan.mjs --org 1engage,1Engage-DM --out .hermes/analysis
 *
 * Opsi:
 *   --out        direktori output (default: .hermes/analysis)
 *   --org        daftar organisasi yang ikut dipindai, dipisah koma
 *   --login      username GitHub (default: diambil dari /user)
 *   --token-file path file token (default: ~/.config/harits/github_token)
 *   --max-files  maksimum file manifest per repo (default: 12)
 *   --concurrency jumlah permintaan paralel (default: 5)
 *
 * Keamanan: token dibaca dari env/file dan TIDAK pernah dicetak. Nama file yang
 * berpola kredensial (*.pem, *.key, .env, *secret*) dilewati sebelum diunduh.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  CONFIG_RE,
  MANIFEST_NAMES,
  PARSERS,
  SECRET_RE,
  canonicalize,
  infraLabel,
  detectInfra,
} from "./lib/github_parsers.mjs";
import { authHeaders, resolveToken, verifyToken } from "./lib/github_token.mjs";

const argv = process.argv.slice(2);
const opt = {};
for (let i = 0; i < argv.length; i++) {
  if (!argv[i].startsWith("--")) continue;
  opt[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
}
const OUT = String(opt.out || ".hermes/analysis");
const ORGS = String(opt.org || "").split(",").map((s) => s.trim()).filter(Boolean);
const MAX_FILES = Number(opt["max-files"] || 12);
const CONCURRENCY = Math.max(1, Number(opt.concurrency || 5));
const LIMIT = Number(opt.limit || 0);
const TOKEN = resolveToken({
  tokenFile: typeof opt["token-file"] === "string" ? opt["token-file"] : undefined,
});

const API = "https://api.github.com";

async function api(path, { raw = false, allow404 = false } = {}) {
  const res = await fetch(path.startsWith("http") ? path : `${API}${path}`, {
    headers: raw ? { ...authHeaders(TOKEN), Accept: "application/vnd.github.raw" } : authHeaders(TOKEN),
  });
  if (res.status === 404 && allow404) return null;
  if (res.status === 403 || res.status === 429) {
    const reset = res.headers.get("x-ratelimit-reset");
    throw new Error(`rate limit (HTTP ${res.status}); reset epoch ${reset}`);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} ${path}`);
  return raw ? res.text() : res.json();
}

async function paginate(path, maxPages = 10) {
  const out = [];
  for (let page = 1; page <= maxPages; page++) {
    const sep = path.includes("?") ? "&" : "?";
    const batch = await api(`${path}${sep}per_page=100&page=${page}`);
    if (!Array.isArray(batch) || batch.length === 0) break;
    out.push(...batch);
    if (batch.length < 100) break;
  }
  return out;
}

async function pool(items, limit, worker) {
  const results = [];
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index).catch((err) => ({ error: err.message }));
    }
  });
  await Promise.all(runners);
  return results;
}

/** Hitung commit oleh user tanpa menarik seluruh riwayat. */
async function countCommits(fullName, login, branch) {
  try {
    const res = await fetch(`${API}/repos/${fullName}/commits?author=${encodeURIComponent(login)}&sha=${branch}&per_page=1`, {
      headers: authHeaders(TOKEN),
    });
    if (!res.ok) return { count: 0, error: `HTTP ${res.status}` };
    const link = res.headers.get("link") || "";
    const last = link.match(/[?&]page=(\d+)>;\s*rel="last"/);
    if (last) return { count: Number(last[1]) };
    const body = await res.json();
    return { count: Array.isArray(body) ? body.length : 0 };
  } catch (err) {
    return { count: 0, error: err.message };
  }
}

async function searchCount(query) {
  try {
    const res = await api(`/search/issues?q=${encodeURIComponent(query)}&per_page=1`);
    return res.total_count ?? 0;
  } catch {
    return null;
  }
}

async function scanRepo(repo, login) {
  const fullName = repo.full_name;
  const branch = repo.default_branch || "main";
  const deps = new Set();
  const manifests = [];
  const infra = new Set();
  const openapi = [];
  const ci = [];
  const languages = await api(`/repos/${fullName}/languages`, { allow404: true }).catch(() => ({}));

  let tree = null;
  try {
    const t = await api(`/repos/${fullName}/git/trees/${branch}?recursive=1`, { allow404: true });
    tree = t?.tree || null;
  } catch {
    tree = null;
  }

  const candidates = (tree || [])
    .filter((node) => node.type === "blob")
    .map((node) => node.path)
    .filter((p) => {
      const name = p.split("/").pop();
      if (SECRET_RE.test(name)) return false;
      if (MANIFEST_NAMES.has(name) || CONFIG_RE.test(name)) return true;
      return false;
    })
    .sort((a, b) => a.split("/").length - b.split("/").length)
    .slice(0, MAX_FILES);

  for (const path of candidates) {
    const body = await api(`/repos/${fullName}/contents/${path}?ref=${branch}`, { raw: true, allow404: true }).catch(() => null);
    if (!body || body.length > 512 * 1024) continue;
    const name = path.split("/").pop();
    const parser = PARSERS[name];
    if (parser) {
      manifests.push(path);
      try {
        for (const d of parser(body)) deps.add(String(d));
      } catch {
        /* manifest rusak */
      }
    }
    detectInfra(name, body, infra, openapi, path);
  }

  if (tree) {
    for (const p of tree.map((n) => n.path)) {
      if (/^\.github\/workflows\/[^/]+\.ya?ml$/i.test(p)) ci.push(p.split("/").pop());
      if (p === ".gitlab-ci.yml") ci.push(".gitlab-ci.yml");
    }
  }

  const readme = await api(`/repos/${fullName}/readme`, { raw: true, allow404: true }).catch(() => null);
  const { count: commitsByAuthor } = await countCommits(fullName, login, branch);

  const labelSet = new Map();
  for (const dep of deps) {
    const c = canonicalize(dep);
    if (c) labelSet.set(c.label, c.cat);
  }
  for (const key of infra) {
    const l = infraLabel(key);
    if (!l) continue;
    if (typeof l === "string") {
      labelSet.set(l, "Infra");
      continue;
    }
    if (l.cat === "Infra service") continue; // terlalu granular untuk daftar label CV
    labelSet.set(l.label, l.cat);
  }
  for (const m of manifests) {
    if (/go\.mod$/.test(m)) labelSet.set("Go", "Language");
    if (/pubspec\.yaml$/.test(m)) labelSet.set("Flutter (Dart)", "Mobile");
    if (/(requirements\.txt|pyproject\.toml)$/.test(m)) labelSet.set("Python", "Language");
    if (/\.gradle$/.test(m)) labelSet.set("Android/Gradle", "Mobile");
  }
  if (deps.has("typescript")) labelSet.set("TypeScript", "Language");
  if (ci.length) labelSet.set("GitHub Actions (CI/CD)", "DevOps");

  return {
    name: repo.name,
    fullName,
    owner: repo.owner.login,
    private: repo.private,
    fork: repo.fork,
    archived: repo.archived,
    description: repo.description || null,
    homepage: repo.homepage || null,
    topics: repo.topics || [],
    language: repo.language || null,
    languages,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    openIssues: repo.open_issues_count,
    sizeKb: repo.size,
    createdAt: repo.created_at,
    pushedAt: repo.pushed_at,
    defaultBranch: branch,
    hasPages: Boolean(repo.has_pages),
    commitsByAuthor,
    manifests,
    deps: [...deps].sort(),
    labels: [...labelSet.entries()].map(([label, cat]) => ({ label, cat })),
    infra: [...infra].sort(),
    ci,
    openapi,
    readmeChars: readme ? Math.min(readme.length, 40000) : 0,
    treeTruncated: tree === null,
  };
}

// ---------- main ----------
const who = await verifyToken(TOKEN);
if (TOKEN && who?.error) {
  console.error(`[fatal] token ditolak GitHub: ${who.error}. Periksa token/scope.`);
  process.exit(1);
}
const login = String(opt.login || who?.login || "");
if (!login) {
  console.error("[fatal] tidak bisa menentukan username. Set --login atau sediakan token.");
  process.exit(1);
}
console.log(`[token] ${TOKEN ? `aktif sebagai ${who?.login}` : "TIDAK ADA (hanya repo publik)"}`);
if (TOKEN) console.log(`[token] scope: ${who?.scopes || "-"} · rate limit: ${who?.rateLimit || "-"}`);
console.log(`[login] ${login}${ORGS.length ? ` · org: ${ORGS.join(", ")}` : ""}`);

const owned = TOKEN
  ? await paginate(`/user/repos?affiliation=owner,collaborator,organization_member&sort=pushed`)
  : await paginate(`/users/${login}/repos?sort=pushed`).catch(() => []);
const orgRepos = [];
for (const org of ORGS) {
  const repos = await paginate(`/orgs/${org}/repos?type=all&sort=pushed`).catch((err) => {
    console.warn(`[warn] org ${org}: ${err.message}`);
    return [];
  });
  orgRepos.push(...repos.map((r) => ({ ...r, __viaOrg: org })));
}

const merged = new Map();
for (const r of [...owned, ...orgRepos]) merged.set(r.full_name, r);
const repos = [...merged.values()]
  .sort((a, b) => String(b.pushed_at).localeCompare(String(a.pushed_at)))
  .slice(0, LIMIT > 0 ? LIMIT : undefined);
console.log(`[repos] ${repos.length} repo akan dipindai (${repos.filter((r) => r.private).length} privat)`);

const scanned = await pool(repos, CONCURRENCY, (repo) => scanRepo(repo, login));

const prAuthored = await searchCount(`author:${login} type:pr`);
const prReviewed = await searchCount(`reviewed-by:${login} type:pr`);
const issuesAuthored = await searchCount(`author:${login} type:issue`);

const missed = scanned.filter((r) => r.error).map((r) => r.name);
const good = scanned.filter((r) => !r.error);
const withMyCommits = good.filter((r) => r.commitsByAuthor > 0);

const labelTally = new Map();
for (const r of withMyCommits)
  for (const { label, cat } of r.labels || []) labelTally.set(label, { cat, repos: [...(labelTally.get(label)?.repos || []), r.fullName] });

const report = {
  generatedAt: new Date().toISOString(),
  login,
  tokenUsed: Boolean(TOKEN),
  summary: {
    reposTotal: repos.length,
    reposPrivate: repos.filter((r) => r.private).length,
    reposScanned: good.length,
    reposWithMyCommits: withMyCommits.length,
    myCommitsTotal: withMyCommits.reduce((s, r) => s + (r.commitsByAuthor || 0), 0),
    prsAuthored: prAuthored,
    prsReviewed: prReviewed,
    issuesAuthored: issuesAuthored,
    scanErrors: missed.length,
  },
  labelTally: [...labelTally.entries()]
    .map(([label, v]) => ({ label, cat: v.cat, count: v.repos.length, repos: v.repos }))
    .sort((a, b) => b.count - a.count),
  repos: good,
  errors: scanned.filter((r) => r.error),
};

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "github_api_report.json"), JSON.stringify(report, null, 2));
const md = [
  `# GitHub API Report`,
  ``,
  `Dibuat: ${report.generatedAt}`,
  `Login: ${login} · token: ${report.tokenUsed ? "ya" : "tidak"}`,
  ``,
  "```json",
  JSON.stringify(report.summary, null, 2),
  "```",
  ``,
  `## Repo dengan commit user (${withMyCommits.length})`,
  ``,
  "| Repo | Visibilitas | Commit user | Bahasa | Label stack | CI | README |",
  "|---|---|---|---|---|---|---|",
  ...withMyCommits
    .sort((a, b) => b.commitsByAuthor - a.commitsByAuthor)
    .map(
      (r) =>
        `| ${r.fullName} | ${r.private ? "privat" : "publik"} | ${r.commitsByAuthor} | ${r.language || "-"} | ${(r.labels || []).map((l) => l.label).slice(0, 6).join(", ")} | ${r.ci.length} | ${r.readmeChars} |`,
    ),
  ``,
  `## Matriks label stack (dari repo yang user kontribusi)`,
  ``,
  "| Label | Kategori | Jumlah repo | Contoh |",
  "|---|---|---|---|",
  ...report.labelTally.map((l) => `| ${l.label} | ${l.cat} | ${l.count} | ${l.repos.slice(0, 3).join(", ")}${l.repos.length > 3 ? "…" : ""} |`),
  ``,
  missed.length ? `## Gagal dipindai\n\n${missed.map((n) => `- ${n}`).join("\n")}` : "",
].join("\n");
writeFileSync(join(OUT, "github_api_report.md"), md);

console.log(JSON.stringify(report.summary, null, 2));
console.log(`\noutput: ${join(OUT, "github_api_report.json")}, ${join(OUT, "github_api_report.md")}`);
