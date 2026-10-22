#!/usr/bin/env node
/**
 * scan_jobs.mjs — kumpulkan lowongan remote dari sumber yang MENYEDIAKAN API resmi,
 * lalu nilai kecocokannya dengan skill di CV.
 *
 * Pakai:
 *   node scripts/jobs/scan_jobs.mjs --out .hermes/jobs
 *   node scripts/jobs/scan_jobs.mjs --min-score 12 --limit-per-source 100
 *
 * Opsi:
 *   --out              direktori output (default: .hermes/jobs)
 *   --limit-per-source batas item per sumber (default: 80)
 *   --min-score        skor minimum agar masuk shortlist (default: 10)
 *   --top              jumlah maksimum shortlist (default: 40)
 *   --sources          daftar sumber, dipisah koma (default: semua yang aktif)
 *
 * Catatan kepatuhan: script ini HANYA memakai API publik/RSS dari job board yang
 * mengizinkannya. LinkedIn, JobStreet/SEEK, Glassdoor, dan Glints diblokir atau
 * melarang akses otomatis — untuk platform itu alur "assisted" dipakai (manusia
 * yang menekan tombol kirim), lihat .hermes/plans/*job-application*.md.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const argv = process.argv.slice(2);
const opt = {};
for (let i = 0; i < argv.length; i++) {
  if (!argv[i].startsWith("--")) continue;
  opt[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
}
const OUT = String(opt.out || ".hermes/jobs");
const PER_SOURCE = Number(opt["limit-per-source"] || 80);
const MIN_SCORE = Number(opt["min-score"] || 10);
const TOP = Number(opt.top || 40);

const UA = "Hermes-Agent-JobScan/1.0 (+personal job search; contact: harits.abdullah19@gmail.com)";
const strip = (html = "") =>
  String(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

async function getJson(url, headers = {}) {
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json", ...headers } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// ---------- sumber ----------
const SOURCES = {
  remotive: async () => {
    const j = await getJson("https://remotive.com/api/remote-jobs?limit=200");
    return (j.jobs || []).map((x) => ({
      source: "remotive",
      id: `remotive:${x.id}`,
      title: x.title,
      company: x.company_name,
      type: x.job_type,
      region: x.candidate_required_location,
      salary: x.salary || null,
      tags: x.tags || [],
      url: x.url,
      posted: x.publication_date,
      text: strip(x.description),
    }));
  },
  remoteok: async () => {
    const j = await getJson("https://remoteok.com/api");
    return (Array.isArray(j) ? j : [])
      .filter((x) => x && x.position)
      .map((x) => ({
        source: "remoteok",
        id: `remoteok:${x.id}`,
        title: x.position,
        company: x.company,
        type: Array.isArray(x.tags) && x.tags.includes("full-time") ? "full_time" : "unknown",
        region: x.location || "Remote",
        salary: x.salary_min ? `${x.salary_min}-${x.salary_max || ""} USD/yr` : null,
        tags: x.tags || [],
        url: x.url || `https://remoteok.com/remote-jobs/${x.id}`,
        posted: x.date,
        text: `${strip(x.description)} ${(x.tags || []).join(" ")}`,
      }));
  },
  arbeitnow: async () => {
    const j = await getJson("https://www.arbeitnow.com/api/job-board-api?page=1");
    return (j.data || []).map((x) => ({
      source: "arbeitnow",
      id: `arbeitnow:${x.slug}`,
      title: x.title,
      company: x.company_name,
      type: x.job_types?.[0] || "unknown",
      region: x.location || "Remote",
      salary: null,
      tags: x.tags || [],
      url: x.url,
      posted: x.created_at ? new Date(x.created_at * 1000).toISOString() : null,
      text: `${strip(x.description)} ${(x.tags || []).join(" ")}`,
      remoteFlag: Boolean(x.remote),
    }));
  },
  jobicy: async () => {
    const j = await getJson("https://jobicy.com/api/v2/remote-jobs?count=100&geo=anywhere");
    return (j.jobs || []).map((x) => ({
      source: "jobicy",
      id: `jobicy:${x.id}`,
      title: x.jobTitle,
      company: x.companyName,
      type: x.jobType || "unknown",
      region: x.jobGeo || "Anywhere",
      salary: x.annualSalaryMin ? `${x.annualSalaryMin}-${x.annualSalaryMax || ""} ${x.salaryCurrency || "USD"}/yr` : null,
      tags: x.jobIndustry ? [].concat(x.jobIndustry) : [],
      url: x.url,
      posted: x.pubDate,
      text: strip(x.jobDescription),
    }));
  },
  workingnomads: async () => {
    const j = await getJson("https://www.workingnomads.com/api/exposed_jobs/");
    return (Array.isArray(j) ? j : []).map((x) => ({
      source: "workingnomads",
      id: `workingnomads:${x.id || (x.url || "").split("/").filter(Boolean).pop() || Math.random().toString(36).slice(2)}`,
      title: x.title,
      company: x.company_name,
      type: x.category_name || "unknown",
      region: x.location || "Anywhere",
      salary: null,
      tags: [].concat(x.tags || [], x.category_name || []),
      url: x.url,
      posted: x.pub_date,
      text: strip(x.description),
    }));
  },
  weworkremotely: async () => {
    const res = await fetch("https://weworkremotely.com/categories/remote-programming-jobs.rss", { headers: { "User-Agent": UA } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m, i) => {
      const block = m[1];
      const pick = (tag) => (block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i")) || [])[1] || "";
      const title = strip(pick("title")).replace(/&amp;/g, "&");
      const body = strip(pick("description"));
      return {
        source: "weworkremotely",
        id: `wwr:${i}:${title}`,
        title,
        company: (title.split(":")[0] || "").trim(),
        type: "unknown",
        region: pick("region") || "Remote",
        salary: null,
        tags: [],
        url: pick("link"),
        posted: pick("pubDate") || null,
        text: body,
      };
    });
  },
  jobspresso: async () => {
    const res = await fetch("https://jobspresso.co/?feed=job_feed", { headers: { "User-Agent": UA } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m, i) => {
      const block = m[1];
      const pick = (tag) => (block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i")) || [])[1] || "";
      return {
        source: "jobspresso",
        id: `jobspresso:${i}`,
        title: strip(pick("title")),
        company: "",
        type: "unknown",
        region: "Remote",
        salary: null,
        tags: [].concat([...block.matchAll(/<category><!\[CDATA\[([^\]]+)\]\]><\/category>/g)].map((c) => c[1])),
        url: pick("link"),
        posted: pick("pubDate") || null,
        text: strip(pick("description")),
      };
    });
  },
  himalayas: async () => {
    const pages = await Promise.all(
      [0, 100, 200].map((offset) => getJson(`https://himalayas.app/jobs/api?limit=100&offset=${offset}`).catch(() => ({ jobs: [] }))),
    );
    return pages
      .flatMap((j) => j.jobs || [])
      .map((x) => ({
        source: "himalayas",
        id: `himalayas:${x.guid || x.applicationLink}`,
        title: x.title,
        company: x.companyName,
        type: x.employmentType || "unknown",
        region: (x.locationRestrictions || []).join(", ") || "Anywhere",
        salary: x.minSalary ? `${x.minSalary}-${x.maxSalary || ""} ${x.currency || "USD"}/yr` : null,
        tags: [].concat(x.categories || [], x.parentCategories || []),
        url: x.applicationLink || x.guid,
        posted: x.pubDate ? new Date(x.pubDate * 1000).toISOString() : null,
        text: strip(x.description),
      }));
  },
};

// ---------- skill taxonomy (dari CV, dibobot berdasarkan bukti repo) ----------
// w=3 → bukti kuat (>10 repo atau repo utama), w=2 → bukti sedang, w=1 → bukti tipis
const SKILLS = [
  { kw: ["typescript"], label: "TypeScript", w: 3 },
  { kw: ["javascript"], label: "JavaScript", w: 2 },
  { kw: ["react native"], label: "React Native", w: 2 },
  { kw: ["react.js", "reactjs", "react"], label: "React", w: 3 },
  { kw: ["next.js", "nextjs"], label: "Next.js", w: 3 },
  { kw: ["node.js", "nodejs"], label: "Node.js", w: 3 },
  { kw: ["express.js", "expressjs", "express"], label: "Express.js", w: 3 },
  { kw: ["nestjs"], label: "NestJS", w: 1 },
  { kw: ["elysia"], label: "Elysia", w: 2 },
  { kw: ["fastify"], label: "Fastify", w: 1 },
  { kw: ["golang", "go developer", "go engineer", "go backend", "backend go"], label: "Go", w: 3, alsoTitle: ["go ", "golang"] },
  { kw: ["flutter", "dart"], label: "Flutter/Dart", w: 3 },
  { kw: ["python"], label: "Python", w: 2 },
  { kw: ["docker compose", "docker-compose"], label: "Docker Compose", w: 3 },
  { kw: ["docker"], label: "Docker", w: 3 },
  { kw: ["kubernetes", "k8s"], label: "Kubernetes", w: 0, gapOnly: true },
  { kw: ["terraform"], label: "Terraform", w: 2 },
  { kw: ["github actions", "gitlab ci", "ci/cd", "cicd", "continuous integration"], label: "CI/CD", w: 3 },
  { kw: ["rabbitmq", "amqp"], label: "RabbitMQ", w: 3 },
  { kw: ["pub/sub", "pubsub"], label: "Pub/Sub", w: 2 },
  { kw: ["kafka"], label: "Kafka", w: 1 },
  { kw: ["redis"], label: "Redis", w: 3 },
  { kw: ["postgresql", "postgres"], label: "PostgreSQL", w: 3 },
  { kw: ["mongodb", "mongoose"], label: "MongoDB", w: 3 },
  { kw: ["mysql"], label: "MySQL", w: 2 },
  { kw: ["microservices", "micro-services"], label: "Microservices", w: 3 },
  { kw: ["event-driven", "event driven"], label: "Event-Driven", w: 3 },
  { kw: ["rest api", "restful", "rest apis"], label: "REST API", w: 3 },
  { kw: ["graphql"], label: "GraphQL", w: 0, gapOnly: true },
  { kw: ["websocket", "socket.io", "socketio"], label: "WebSocket", w: 2 },
  { kw: ["tailwind"], label: "Tailwind CSS", w: 3 },
  { kw: ["ant design", "antd"], label: "Ant Design", w: 2 },
  { kw: ["storybook"], label: "Storybook", w: 2 },
  { kw: ["jest", "vitest"], label: "Jest", w: 2 },
  { kw: ["playwright"], label: "Playwright", w: 2 },
  { kw: ["cypress"], label: "Cypress", w: 1 },
  { kw: ["airflow"], label: "Airflow", w: 1 },
  { kw: ["bigquery"], label: "BigQuery", w: 1 },
  { kw: ["google cloud", "gcp"], label: "GCP", w: 3 },
  { kw: ["firebase"], label: "Firebase", w: 1 },
  { kw: ["aws", "amazon web services"], label: "AWS", w: 0, gapOnly: true },
];

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Kata pendek/ambigu wajib word-boundary agar "go" tidak cocok dengan "go to market". */
const matcher = (skill) =>
  skill.kw.map((k) => (k.trim().length <= 12 ? new RegExp(`\\b${escapeRe(k.trim())}\\b`, "i") : new RegExp(escapeRe(k), "i")));

// ---------- filter peran & region ----------
const ROLE_OK = /\b(engineer|developer|programmer|architect|tech(nical)? lead|lead developer|full[- ]?stack|front[- ]?end|back[- ]?end|mobile|flutter|react|golang|go developer|devops|sre|platform|software|qa|test engineer|data engineer|integration)\b/i;
const ROLE_BAD = /\b(mechanical|civil|electrical|hardware|chemical|manufactur|sales|account (executive|manager)|product manager|project manager|marketing|recruiter|nurse|teacher|driver|designer|copywriter|support (agent|specialist)|customer)\b/i;

const ALLOW_REGION = /(worldwide|anywhere|global|apac|asia|indonesia|south ?east asia|\bsea\b|utc\+7|gmt\+7|any ?time ?zone|flexible time ?zone|remote)$/i;
const BLOCK_REGION = [
  { re: /\b(us|u\.s\.|usa|united states)[- ]?(only|based|remote|timezone|time zone)\b/i, why: "US-only" },
  { re: /\bmust (be|reside|live) (in )?(the )?(us|usa|united states|canada|uk|united kingdom|eu|europe|india|brazil|mexico)\b/i, why: "harus residen negara tertentu" },
  { re: /\b(security clearance|clearance required|pubsec)\b/i, why: "perlu clearance" },
  { re: /\b(on-?site|in-?office|hybrid|relocat(e|ion) (required|assistance))\b/i, why: "bukan remote" },
  { re: /\b(work authorization|sponsorship (not|un)available|must be authorized to work)\b/i, why: "butuh izin kerja lokal" },
];
/** Region spesifik (Kansas/Brazil/India/Israel/…) untuk kandidat di Indonesia = tidak realistis. */
const COUNTRY_HINT = /\b(united states|usa|canada|uk|united kingdom|germany|berlin|france|spain|netherlands|poland|india|israel|brazil|mexico|argentina|japan|korea|china|singapore|australia|kansas|texas|california|new york|florida|virginia|washington|massachusetts|illinois|georgia|arizona|colorado|ohio|oregon|pennsylvania|north carolina|ciudad|city of|emea|latam)\b/i;

/** Zona waktu: user WIB (UTC+7). Lowongan dengan jam kerja Amerika = tidak praktis. */
const TZ_BLOCK = [
  { re: /\b(overlap|available|working hours|core hours|must work)[^.]{0,40}\b(pst|pdt|est|edt|cst|cdt|mst|mdt)\b/i, why: "jam kerja Amerika" },
  { re: /\b(pst|pdt|est|edt|cst|cdt|mst|mdt)\s*(time ?zone|hours|working hours|business hours)/i, why: "jam kerja Amerika" },
  { re: /\b(us|u\.s\.)\s*(time ?zone|business hours|working hours)/i, why: "jam kerja Amerika" },
  { re: /\b(americas|latam)\s*(only|based|time)\b/i, why: "region/jam Amerika" },
];
const TZ_OK = /\b(apac|asia|worldwide|anywhere|global|utc\+[2-9]|gmt\+[2-9]|europe|emea|cet|cest|singapore|australia|japan|korea|india|indonesia|flexible hours|async)\b/i;

function timezoneVerdict(job) {
  const hay = `${job.region} ${job.text.slice(0, 6000)}`;
  for (const b of TZ_BLOCK) if (b.re.test(hay)) return { ok: false, why: b.why };
  const euOnly = /\b(cet|cest|emea|europe(an)?)\b/i.test(hay) && !/\b(apac|asia|worldwide|anywhere|global|americas)\b/i.test(hay);
  if (TZ_OK.test(hay))
    return { ok: true, why: euOnly ? "jam kerja Eropa (CET±) — perlu kesepakatan overlap dengan WIB" : "jam kerja kompatibel WIB", marginal: euOnly };
  return { ok: true, why: "tanpa batasan jam kerja eksplisit", marginal: false };
}

/** Prioritas peran sesuai keputusan user (fullstack Next/Node > frontend > Node > Flutter > RN > Go). */
const ROLE_PRIORITY = [
  { re: /\bfull[- ]?stack\b/i, bonus: 8, label: "full-stack" },
  { re: /\b(front[- ]?end|frontend)\b/i, bonus: 6, label: "frontend" },
  { re: /\bnode\.?js\b/i, bonus: 6, label: "Node.js" },
  { re: /\b(next\.?js|react\.?js)\b/i, bonus: 5, label: "React/Next" },
  { re: /\b(flutter|dart)\b/i, bonus: 5, label: "Flutter" },
  { re: /react native/i, bonus: 4, label: "React Native" },
  { re: /\b(golang|go developer|go engineer|go backend)\b/i, bonus: 3, label: "Go" },
];

/** Lantai gaji user: 12jt IDR nett/bulan untuk posisi yang menyebut IDR. */
const SALARY_FLOOR_IDR = 12_000_000;
function salaryVerdict(job) {
  const text = String(job.salary || "");
  if (!text) return { ok: true, note: "gaji tidak disebutkan" };
  const idr = [...text.matchAll(/(?:rp|idr)\s*([\d.,]+)\s*(jt|juta|m|million)?/gi)].map((m) => {
    const n = Number(m[1].replace(/[.,]/g, ""));
    const unit = (m[2] || "").toLowerCase();
    return /jt|juta|m|million/.test(unit) ? n * 1_000_000 : n;
  });
  if (idr.length) {
    const max = Math.max(...idr);
    return max >= SALARY_FLOOR_IDR
      ? { ok: true, note: `IDR di atas lantai (${(max / 1e6).toFixed(1)}jt)` }
      : { ok: false, note: `IDR di bawah lantai (${(max / 1e6).toFixed(1)}jt < 12jt)` };
  }
  return { ok: true, note: "gaji valas/kontrak — verifikasi saat screening" };
}

/** Lowongan berbahasa Spanyol/Portugis biasanya nearshore LATAM — tidak relevan. */
const ES_PT_HINT = /\b(desarrollador|experiencia|conocimientos|requisitos|responsabilidades|empresa|buscamos|jornada|salario|vaga|português|conhecimento|experiência|requisitos|atividades|benefícios)\b/gi;

function languageVerdict(job) {
  const hay = `${job.title} ${job.text.slice(0, 6000)}`;
  const hits = new Set((hay.match(ES_PT_HINT) || []).map((s) => s.toLowerCase()));
  return hits.size >= 3 ? { ok: false, why: `berbahasa Spanyol/Portugis (${[...hits].slice(0, 3).join(", ")})`, hits: hits.size } : { ok: true, hits: hits.size };
}

function regionVerdict(job) {
  const hay = `${job.region} ${job.text.slice(0, 4000)}`;
  for (const b of BLOCK_REGION) if (b.re.test(hay)) return { ok: false, why: b.why };
  const region = String(job.region || "").trim();
  if (ALLOW_REGION.test(region)) return { ok: true, why: "region terbuka" };
  if (COUNTRY_HINT.test(region)) return { ok: false, why: `region spesifik: ${region}` };
  if (ALLOW_REGION.test(hay)) return { ok: true, why: "teks menyebut region terbuka/APAC" };
  return { ok: true, why: "tanpa batasan eksplisit" };
}

function scoreJob(job) {
  const title = job.title || "";
  const hay = `${title} ${(job.tags || []).join(" ")} ${job.text}`.toLowerCase();
  const matched = [];
  const gaps = [];
  let score = 0;
  for (const s of SKILLS) {
    const hit = matcher(s).some((re) => re.test(hay));
    if (!hit) continue;
    if (s.gapOnly) {
      gaps.push(s.label);
      continue;
    }
    const titleHit = (s.alsoTitle || s.kw).some((k) => title.toLowerCase().includes(k.toLowerCase()));
    const points = s.w * (titleHit ? 2 : 1);
    score += points;
    matched.push({ label: s.label, points, inTitle: titleHit });
  }
  if (/\b(lead|principal|staff|head of|architect)\b/i.test(title)) score += 4;
  if (/\b(senior|sr\.?)\b/i.test(title)) score += 3;
  if (/\b(junior|jr\.?|intern|entry level|magang)\b/i.test(title)) score -= 8;
  if (/\b(full[- ]time|contract|freelance)\b/i.test(String(job.type))) score += 1;
  if (job.salary) score += 1;
  const days = job.posted ? (Date.now() - Date.parse(job.posted)) / 86400000 : 999;
  if (days <= 7) score += 3;
  else if (days <= 21) score += 1;
  else if (days > 90) score -= 2;
  // hanya lowongan berbau rekayasa perangkat lunak
  const roleOk = ROLE_OK.test(title) && !ROLE_BAD.test(title);
  if (!roleOk) score -= 25;
  // bonus sesuai prioritas peran user
  const priorities = ROLE_PRIORITY.filter((p) => p.re.test(title));
  for (const p of priorities) score += p.bonus;
  // zona waktu & gaji
  const tz = timezoneVerdict(job);
  const salary = salaryVerdict(job);
  if (!salary.ok) score -= 20;
  return {
    score,
    matched,
    gaps: [...new Set(gaps)],
    roleOk,
    priorities: priorities.map((p) => p.label),
    timezoneOk: tz.ok,
    timezoneWhy: tz.why,
    salaryNote: salary.note,
    ageDays: Number.isFinite(days) ? Math.round(days) : null,
  };
}

// ---------- main ----------
const wanted = opt.sources ? String(opt.sources).split(",").map((s) => s.trim()) : Object.keys(SOURCES);
const raw = [];
const errors = [];
for (const name of wanted) {
  const fn = SOURCES[name];
  if (!fn) {
    errors.push({ source: name, error: "sumber tidak dikenal" });
    continue;
  }
  try {
    const items = await fn();
    raw.push(...items.slice(0, PER_SOURCE));
    console.log(`[fetch] ${name}: ${items.length} lowongan`);
  } catch (err) {
    errors.push({ source: name, error: err.message });
    console.warn(`[fetch] ${name} gagal: ${err.message}`);
  }
}

// dedupe by judul+company (lintas sumber sering duplikat)
const seen = new Map();
for (const j of raw) {
  const key = `${(j.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "")}|${(j.company || "").toLowerCase().replace(/[^a-z0-9]+/g, "")}`;
  if (!seen.has(key)) seen.set(key, j);
}
const deduped = [...seen.values()];

const scored = deduped
  .map((j) => {
    const verdict = scoreJob(j);
    const region = regionVerdict(j);
    const lang = languageVerdict(j);
    return { ...j, ...verdict, regionOk: region.ok, regionWhy: region.why, langOk: lang.ok, langWhy: lang.why };
  })
  .filter((j) => j.regionOk && j.timezoneOk && j.roleOk && j.langOk)
  .sort((a, b) => b.score - a.score);

const shortlist = scored.filter((j) => j.score >= MIN_SCORE).slice(0, TOP);

mkdirSync(OUT, { recursive: true });
writeFileSync(
  join(OUT, "jobs.json"),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      sources: wanted,
      criteria: { minScore: MIN_SCORE, timezone: "WIB/APAC/worldwide", salaryFloorIdr: SALARY_FLOOR_IDR, rolePriority: ROLE_PRIORITY.map((p) => p.label) },
      counts: { fetched: raw.length, deduped: deduped.length, passedFilters: scored.length, shortlist: shortlist.length },
      errors,
      shortlist,
      all: scored,
    },
    null,
    2,
  ),
);

const rows = shortlist.map(
  (j, i) =>
    `| ${i + 1} | ${j.score} | ${j.title} | ${j.company || "-"} | ${j.source} | ${j.region || "-"} | ${j.salary || "-"} | ${j.ageDays ?? "?"}h | ${j.priorities.join("+") || "-"} | ${j.matched.slice(0, 4).map((m) => m.label).join(", ")} | ${j.url} |`,
);
const md = `# Shortlist Lowongan Remote (skor ≥ ${MIN_SCORE})

Dibuat: ${new Date().toISOString()}
Sumber: ${wanted.join(", ")} · diambil ${raw.length} · setelah dedupe ${deduped.length} · lolos filter (remote + zona waktu + peran) ${scored.length} · shortlist ${shortlist.length}

Filter aktif: region terbuka/APAC/luar Amerika · jam kerja kompatibel WIB · hanya peran rekayasa perangkat lunak · lantai gaji 12jt IDR (bila disebutkan).
Prioritas peran: full-stack (8) · frontend (6) · Node.js (6) · React/Next (5) · Flutter (5) · React Native (4) · Go (3).

| # | Skor | Posisi | Perusahaan | Sumber | Region | Gaji | Umur | Prioritas | Skill cocok | Tautan |
|---|---|---|---|---|---|---|---|---|---|---|
${rows.join("\n")}

## Catatan
- Skor = bobot skill (judul bernilai 2×) + prioritas peran + bonus senior/gaji/kebaruan − penalti junior/peran non-engineering/gaji di bawah lantai.
- Kolom "gap" pada \`jobs.json\` menandai teknologi yang diminta pasar tapi belum ada di CV (kini: Kubernetes, AWS) → bahan belajar, bukan klaim.
- Platform yang melarang otomasi (LinkedIn, JobStreet, Glints, Glassdoor) tidak di-scrape; lamaran ke sana memakai alur assisted.
`;
writeFileSync(join(OUT, "shortlist.md"), md);

console.log(JSON.stringify({ fetched: raw.length, deduped: deduped.length, passed: scored.length, shortlist: shortlist.length, errors: errors.length }, null, 2));
console.log(`output: ${join(OUT, "jobs.json")}, ${join(OUT, "shortlist.md")}`);
if (errors.length) console.log(`sumber gagal: ${errors.map((e) => e.source).join(", ")}`);
