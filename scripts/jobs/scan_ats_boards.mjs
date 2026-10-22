#!/usr/bin/env node
/**
 * scan_ats_boards.mjs — ambil lowongan langsung dari board ATS perusahaan
 * (Greenhouse / Ashby / Lever), yaitu tempat form lamaran benar-benar bisa diisi.
 *
 * Bedanya dengan scan_jobs.mjs: sumber di sini adalah ATS, bukan agregator. Jadi
 * setiap hasil punya `applyUrl` langsung ke form (mis. boards.greenhouse.io/...),
 * yang bisa dilanjutkan ke auto_apply.mjs.
 *
 * Pakai:
 *   node scripts/jobs/scan_ats_boards.mjs
 *   node scripts/jobs/scan_ats_boards.mjs --min-score 18 --limit 20
 *   node scripts/jobs/scan_ats_boards.mjs --only supabase,gitlab
 *
 * Output: .hermes/jobs/ats-jobs.json + .hermes/jobs/ats-shortlist.md
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const argv = process.argv.slice(2);
const opt = {};
for (let i = 0; i < argv.length; i++) {
  if (!argv[i].startsWith("--")) continue;
  opt[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
}
const DIR = String(opt.dir || ".hermes/jobs");
const MIN_SCORE = Number(opt["min-score"] || 14);
const TOP = Number(opt.top || 25);
const ONLY = opt.only ? String(opt.only).split(",").map((s) => s.trim().toLowerCase()) : null;

/** Registry board yang sudah diverifikasi hidup (22 Okt 2026). */
const BOARDS = [
  { ats: "greenhouse", token: "gitlab", company: "GitLab" },
  { ats: "greenhouse", token: "elastic", company: "Elastic" },
  { ats: "greenhouse", token: "cloudflare", company: "Cloudflare" },
  { ats: "greenhouse", token: "mongodb", company: "MongoDB" },
  { ats: "greenhouse", token: "datadog", company: "Datadog" },
  { ats: "greenhouse", token: "grafanalabs", company: "Grafana Labs" },
  { ats: "ashby", token: "supabase", company: "Supabase" },
  { ats: "ashby", token: "linear", company: "Linear" },
  { ats: "ashby", token: "resend", company: "Resend" },
  { ats: "ashby", token: "posthog", company: "PostHog" },
  { ats: "ashby", token: "railway", company: "Railway" },
  { ats: "ashby", token: "neon", company: "Neon" },
];

const UA = "Hermes-Agent-JobScan/1.0 (+personal job search)";
const strip = (html = "") =>
  String(html).replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#\d+;/g, " ").replace(/\s+/g, " ").trim();

// ---------- pengambilan per ATS ----------
async function fetchGreenhouse(token) {
  const res = await fetch(`https://boards-api.greenhouse.io/v1/boards/${token}/jobs?content=true`, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return (json.jobs || []).map((j) => ({
    ats: "greenhouse",
    token,
    id: `gh:${token}:${j.id}`,
    title: j.title,
    location: j.location?.name || "",
    url: j.absolute_url,
    applyUrl: j.absolute_url,
    posted: j.updated_at || j.first_published || null,
    text: strip(j.content || ""),
  }));
}
async function fetchAshby(token) {
  const res = await fetch(`https://api.ashbyhq.com/posting-api/job-board/${token}`, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return (json.jobs || []).map((j) => ({
    ats: "ashby",
    token,
    id: `ashby:${token}:${j.id}`,
    title: j.title,
    location: j.location || (j.secondaryLocations || []).map((s) => s.location).join(", "),
    url: j.jobUrl,
    applyUrl: j.applyUrl || j.jobUrl,
    posted: j.publishedAt || null,
    text: strip(j.descriptionHtml || j.descriptionPlain || ""),
    remote: Boolean(j.isRemote),
    employmentType: j.employmentType || null,
  }));
}
async function fetchLever(token) {
  const res = await fetch(`https://api.lever.co/v0/postings/${token}?mode=json`, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (!Array.isArray(json)) throw new Error("format tidak dikenali");
  return json.map((j) => ({
    ats: "lever",
    token,
    id: `lever:${token}:${j.id}`,
    title: j.text,
    location: j.categories?.location || "",
    url: j.hostedUrl,
    applyUrl: j.applyUrl || `${j.hostedUrl}/apply`,
    posted: j.createdAt ? new Date(j.createdAt).toISOString() : null,
    text: strip(`${j.descriptionPlain || ""} ${(j.lists || []).map((l) => `${l.text} ${strip(l.content)}`).join(" ")}`),
  }));
}
const FETCH = { greenhouse: fetchGreenhouse, ashby: fetchAshby, lever: fetchLever };

// ---------- filter & skor (subset yang sama dengan scan_jobs.mjs) ----------
const SKILLS = [
  { kw: ["typescript"], label: "TypeScript", w: 3 },
  { kw: ["javascript"], label: "JavaScript", w: 2 },
  { kw: ["react native"], label: "React Native", w: 2 },
  { kw: ["react.js", "reactjs", "react"], label: "React", w: 3 },
  { kw: ["next.js", "nextjs"], label: "Next.js", w: 3 },
  { kw: ["node.js", "nodejs"], label: "Node.js", w: 3 },
  { kw: ["express.js", "expressjs", "express"], label: "Express.js", w: 3 },
  { kw: ["golang", "go developer", "go engineer"], label: "Go", w: 3 },
  { kw: ["flutter", "dart"], label: "Flutter", w: 3 },
  { kw: ["python"], label: "Python", w: 2 },
  { kw: ["docker"], label: "Docker", w: 3 },
  { kw: ["kubernetes", "k8s"], label: "Kubernetes", w: 0, gap: true },
  { kw: ["terraform"], label: "Terraform", w: 2 },
  { kw: ["ci/cd", "github actions", "gitlab ci", "continuous integration"], label: "CI/CD", w: 3 },
  { kw: ["rabbitmq", "amqp"], label: "RabbitMQ", w: 3 },
  { kw: ["redis"], label: "Redis", w: 3 },
  { kw: ["postgresql", "postgres"], label: "PostgreSQL", w: 3 },
  { kw: ["mongodb", "mongoose"], label: "MongoDB", w: 3 },
  { kw: ["microservices"], label: "Microservices", w: 3 },
  { kw: ["event-driven", "event driven"], label: "Event-Driven", w: 3 },
  { kw: ["rest api", "restful"], label: "REST API", w: 3 },
  { kw: ["graphql"], label: "GraphQL", w: 0, gap: true },
  { kw: ["aws", "amazon web services"], label: "AWS", w: 0, gap: true },
  { kw: ["google cloud", "gcp"], label: "GCP", w: 3 },
  { kw: ["tailwind"], label: "Tailwind CSS", w: 3 },
  { kw: ["jest", "vitest"], label: "Jest", w: 2 },
  { kw: ["playwright"], label: "Playwright", w: 2 },
  { kw: ["storybook"], label: "Storybook", w: 2 },
  { kw: ["websocket", "socket.io"], label: "WebSocket", w: 2 },
];
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const matcher = (kw) => kw.map((k) => new RegExp(`\\b${escapeRe(k)}\\b`, "i"));
const ROLE_PRIORITY = [
  { re: /\bfull[- ]?stack\b/i, bonus: 8, label: "full-stack" },
  { re: /\b(front[- ]?end|frontend)\b/i, bonus: 6, label: "frontend" },
  { re: /\bnode\.?js\b/i, bonus: 6, label: "Node.js" },
  { re: /\b(next\.?js|react\.?js)\b/i, bonus: 5, label: "React/Next" },
  { re: /\b(flutter|dart)\b/i, bonus: 5, label: "Flutter" },
  { re: /react native/i, bonus: 4, label: "React Native" },
  { re: /\b(golang|go developer|go engineer)\b/i, bonus: 3, label: "Go" },
];
const ROLE_OK = /\b(engineer|developer|programmer|architect|tech(nical)? lead|full[- ]?stack|front[- ]?end|back[- ]?end|mobile|flutter|react|golang|devops|sre|platform|software|qa|test engineer|data engineer|integration)\b/i;
const ROLE_BAD = /\b(mechanical|civil|electrical|hardware|sales|account (executive|manager)|product manager|project manager|marketing|recruiter|designer|support (agent|specialist)|customer|solutions architect)\b/i;
const REMOTE_OK = /(remote|worldwide|anywhere|global|apac|asia|emea|distributed|indonesia|singapore|australia|japan|india)/i;
const REMOTE_BAD = /(united states|usa|u\.s\.|canada|latam|brazil|mexico|uk only|europe only|on-?site|hybrid)/i;

function scoreJob(job) {
  const title = job.title || "";
  const hay = `${title} ${job.location} ${job.text}`.toLowerCase();
  let score = 0;
  const matched = [];
  const gaps = [];
  for (const s of SKILLS) {
    if (!matcher(s.kw).some((re) => re.test(hay))) continue;
    if (s.gap) { gaps.push(s.label); continue; }
    const inTitle = matcher(s.kw).some((re) => re.test(title));
    const pts = s.w * (inTitle ? 2 : 1);
    score += pts;
    matched.push({ label: s.label, points: pts, inTitle });
  }
  if (/\b(senior|sr\.?)\b/i.test(title)) score += 3;
  if (/\b(lead|staff|principal|architect)\b/i.test(title)) score += 4;
  if (/\b(junior|intern|entry)\b/i.test(title)) score -= 8;
  const priorities = ROLE_PRIORITY.filter((p) => p.re.test(title));
  for (const p of priorities) score += p.bonus;
  const roleOk = ROLE_OK.test(title) && !ROLE_BAD.test(title);
  if (!roleOk) score -= 25;
  const loc = `${job.location} ${job.remote ? "remote" : ""}`;
  const locationOk = REMOTE_OK.test(loc) || job.remote === true;
  if (REMOTE_BAD.test(loc)) score -= 20;
  return { score, matched, gaps: [...new Set(gaps)], priorities: priorities.map((p) => p.label), roleOk, locationOk };
}

const boards = ONLY ? BOARDS.filter((b) => ONLY.includes(b.token.toLowerCase())) : BOARDS;
const all = [];
const errors = [];
for (const board of boards) {
  try {
    const jobs = await FETCH[board.ats](board.token);
    const withCompany = jobs.map((j) => ({ ...j, company: board.company, source: `${board.ats}:${board.token}` }));
    all.push(...withCompany);
    console.log(`[${board.ats}] ${board.company}: ${jobs.length} lowongan`);
  } catch (err) {
    errors.push({ board: board.token, error: err.message });
    console.warn(`[${board.ats}] ${board.company} gagal: ${err.message}`);
  }
}

const scored = all
  .map((j) => ({ ...j, ...scoreJob(j) }))
  .filter((j) => j.roleOk && j.locationOk)
  .sort((a, b) => b.score - a.score);

const shortlist = scored.filter((j) => j.score >= MIN_SCORE).slice(0, TOP);

mkdirSync(DIR, { recursive: true });
writeFileSync(
  join(DIR, "ats-jobs.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), counts: { fetched: all.length, passed: scored.length, shortlist: shortlist.length }, errors, shortlist, all: scored }, null, 2),
);
const rows = shortlist.map(
  (j, i) => `| ${i + 1} | ${j.score} | ${j.title} | ${j.company} | ${j.location || "-"} | ${j.ats} | ${j.applyUrl} |`,
);
writeFileSync(
  join(DIR, "ats-shortlist.md"),
  `# Shortlist dari Board ATS (skor ≥ ${MIN_SCORE})

Dibuat: ${new Date().toISOString()}
Diambil ${all.length} lowongan dari ${boards.length} board · lolos filter peran+remote ${scored.length} · shortlist ${shortlist.length}

Semua baris punya \`applyUrl\` langsung ke form ATS → bisa dilanjutkan dengan:
\`node scripts/jobs/auto_apply.mjs --url "<applyUrl>" --title "<judul>" --company "<perusahaan>"\`

| # | Skor | Posisi | Perusahaan | Lokasi | ATS | Apply URL |
|---|---|---|---|---|---|---|
${rows.join("\n")}
`,
);

console.log(JSON.stringify({ fetched: all.length, passed: scored.length, shortlist: shortlist.length, errors: errors.length }, null, 2));
console.log(`Output: ${join(DIR, "ats-jobs.json")}, ${join(DIR, "ats-shortlist.md")}`);
