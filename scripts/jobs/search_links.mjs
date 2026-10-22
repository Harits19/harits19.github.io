#!/usr/bin/env node
/**
 * search_links.mjs — buat daftar URL pencarian siap-klik untuk platform yang
 * melarang otomasi (LinkedIn, JobStreet, Glints, Dealls, Kalibrr).
 *
 * Tidak melakukan scraping dan tidak mengirim lamaran. Tujuannya: user tinggal
 * klik, lalu filter (Remote / 7 hari terakhir) diterapkan di UI platform.
 *
 * Pakai:
 *   node scripts/jobs/search_links.mjs
 *   node scripts/jobs/search_links.mjs --out .hermes/jobs/search-links.md
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const argv = process.argv.slice(2);
const opt = {};
for (let i = 0; i < argv.length; i++) {
  if (!argv[i].startsWith("--")) continue;
  opt[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
}
const DIR = String(opt.dir || ".hermes/jobs");
const OUT = String(opt.out || join(DIR, "search-links.md"));
const PROFILE = String(opt.profile || join(DIR, "profile.json"));
const profile = existsSync(PROFILE) ? JSON.parse(readFileSync(PROFILE, "utf8")) : {};

const enc = (s) => encodeURIComponent(s).replace(/%20/g, "+");

/** Kueri sesuai prioritas peran user (fullstack → frontend → Node → Flutter → RN → Go). */
const QUERIES = [
  { label: "Full-stack (Next.js/Node)", q: "full stack developer", must: ["remote"] },
  { label: "Full-stack Next.js", q: "nextjs full stack", must: ["remote"] },
  { label: "Frontend React", q: "frontend developer react", must: ["remote"] },
  { label: "Backend Node.js", q: "nodejs backend developer", must: ["remote"] },
  { label: "Flutter", q: "flutter developer", must: ["remote"] },
  { label: "React Native", q: "react native developer", must: ["remote"] },
  { label: "Go", q: "golang developer", must: ["remote"] },
  { label: "TypeScript", q: "typescript engineer", must: ["remote"] },
];

function linkedin(q) {
  // f_WT=2 → Remote, sortBy=DD → terbaru
  return `https://www.linkedin.com/jobs/search/?keywords=${enc(q)}&location=Indonesia&f_WT=2&sortBy=DD`;
}
function jobstreet(q) {
  const slug = q.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `https://id.jobstreet.com/id/${slug}-jobs`;
}
function glints(q) {
  return `https://glints.com/id/opportunities/jobs/explore?keyword=${enc(q)}&countryCode=ID&workArrangement=REMOTE`;
}
function dealls(q) {
  return `https://dealls.com/?search=${enc(q)}`;
}
function kalibrr(q) {
  return `https://www.kalibrr.com/job-board/search?keyword=${enc(q)}`;
}
function wellfound(q) {
  return `https://wellfound.com/role/r/${enc(q.replace(/\s+/g, "-"))}`;
}

const SOURCES = [
  { name: "LinkedIn (Remote, terbaru)", fn: linkedin, note: "f_WT=2 = Remote, sortBy=DD = terbaru. Jangan otomasi — klik manual." },
  { name: "JobStreet ID", fn: jobstreet, note: "Set filter 'Remote' + '7 hari terakhir' di UI setelah terbuka." },
  { name: "Glints", fn: glints, note: "Filter Remote aktif via workArrangement=REMOTE." },
  { name: "Dealls", fn: dealls, note: "Filter remote & gaji di UI." },
  { name: "Kalibrr", fn: kalibrr, note: "Filter remote di UI." },
  { name: "Wellfound", fn: wellfound, note: "Remote-first startup jobs (global)." },
];

const lines = [];
lines.push(`# URL Pencarian Siap-Klik — ${new Date().toISOString().slice(0, 10)}`);
lines.push("");
lines.push(`Prioritas peran: ${(profile.rolePriority || []).join(" → ") || "-"}`);
lines.push("");
lines.push("Aturan: tidak ada scraping, tidak ada auto-apply. Buka tautan, pasang filter Remote + 7 hari terakhir, lalu lamar lewat alur assisted (`assist_apply.mjs`).");
lines.push("");

for (const source of SOURCES) {
  lines.push(`## ${source.name}`);
  lines.push(`_${source.note}_`);
  lines.push("");
  for (const item of QUERIES) {
    const q = `${item.q} ${item.must.join(" ")}`;
    lines.push(`- [${item.label}](${source.fn(q)}) — \`${q}\``);
  }
  lines.push("");
}

lines.push("## Tips pakai");
lines.push("- LinkedIn: setelah hasil terbuka, tambahkan filter **Experience level = Mid-Senior** dan **Date posted = Past week**.");
lines.push("- JobStreet: pakai kata kunci tanpa 'remote' bila hasil kosong; filter lokasi 'Remote' ada di sidebar.");
lines.push("- Kalau menemukan lowongan menarik di platform ini, salin URL-nya lalu jalankan:");
lines.push("  `node scripts/jobs/assist_apply.mjs --url \"<URL>\" --company \"<Nama>\" --title \"<Posisi>\"`");

mkdirSync(DIR, { recursive: true });
writeFileSync(OUT, lines.join("\n"));
console.log(`Dibuat: ${OUT}`);
console.log(`Sumber: ${SOURCES.length} platform × ${QUERIES.length} kueri = ${SOURCES.length * QUERIES.length} tautan`);
