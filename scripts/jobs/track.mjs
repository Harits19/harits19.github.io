#!/usr/bin/env node
/**
 * track.mjs — pelacak lamaran: catat status, jaga batas volume harian, dan
 * hasilkan ringkasan mingguan.
 *
 * Pakai:
 *   node scripts/jobs/track.mjs --id "jobicy:155389-..." --status applied --note "submit via jobicy"
 *   node scripts/jobs/track.mjs --list
 *   node scripts/jobs/track.mjs --report
 *
 * Status: found | drafted | applied | replied | interview | offer | rejected | closed
 * Batas: 8 lamaran/hari, 40/minggu (peringatan, bukan larangan).
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const argv = process.argv.slice(2);
const opt = {};
for (let i = 0; i < argv.length; i++) {
  if (!argv[i].startsWith("--")) continue;
  opt[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
}
const DIR = String(opt.dir || ".hermes/jobs");
const DB = join(DIR, "applications.json");
const JOBS = String(opt.jobs || join(DIR, "jobs.json"));
const STATUSES = ["found", "drafted", "applied", "replied", "interview", "offer", "rejected", "closed"];
const DAILY_LIMIT = Number(opt.dailyLimit || 5);
const HARD_LIMIT = Number(opt.hardLimit || 8);

mkdirSync(DIR, { recursive: true });
const db = existsSync(DB) ? JSON.parse(readFileSync(DB, "utf8")) : { updatedAt: null, applications: [] };

function save() {
  db.updatedAt = new Date().toISOString();
  writeFileSync(DB, JSON.stringify(db, null, 2));
  const rows = db.applications
    .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
    .map((a) => `| ${a.status} | ${a.title} | ${a.company || "-"} | ${a.source} | ${a.score ?? "-"} | ${a.appliedAt || "-"} | ${a.note || ""} | ${a.url} |`);
  writeFileSync(
    join(DIR, "applications.md"),
    `# Pelacak Lamaran

Terakhir diperbarui: ${db.updatedAt}
Total: ${db.applications.length} · status: ${STATUSES.map((s) => `${s}=${db.applications.filter((a) => a.status === s).length}`).join(" ")}

| Status | Posisi | Perusahaan | Sumber | Skor | Dikirim | Catatan | Tautan |
|---|---|---|---|---|---|---|---|
${rows.join("\n")}
`,
  );
  const csv = [
    "status,title,company,source,score,appliedAt,note,url",
    ...db.applications.map((a) =>
      STATUSES.includes(a.status)
        ? [a.status, a.title, a.company, a.source, a.score, a.appliedAt, (a.note || "").replace(/,/g, ";"), a.url].join(",")
        : "",
    ),
  ].join("\n");
  writeFileSync(join(DIR, "applications.csv"), csv);
}

if (opt.list || (!opt.id && !opt.report)) {
  if (!db.applications.length) console.log("Belum ada lamaran tercatat.");
  else
    db.applications.forEach((a) =>
      console.log(`${a.status.padEnd(9)} ${String(a.score ?? "-").padStart(3)}  ${a.title} @ ${a.company || "-"} (${a.source}) ${a.url}`),
    );
}

if (opt.report) {
  const bySource = new Map();
  for (const a of db.applications) bySource.set(a.source, (bySource.get(a.source) || 0) + 1);
  const week = db.applications.filter((a) => a.appliedAt && Date.now() - Date.parse(a.appliedAt) < 7 * 86400000);
  console.log(`Total lamaran: ${db.applications.length}`);
  console.log(`7 hari terakhir: ${week.length} (batas mingguan 40)`);
  console.log(`Per sumber: ${[...bySource.entries()].map(([k, v]) => `${k}=${v}`).join(", ") || "-"}`);
  const replied = db.applications.filter((a) => ["replied", "interview", "offer"].includes(a.status)).length;
  const applied = db.applications.filter((a) => a.status !== "found" && a.status !== "drafted").length;
  console.log(`Balasan: ${replied}/${applied || 0} (${applied ? Math.round((replied / applied) * 100) : 0}%)`);
}

if (opt.id) {
  if (!STATUSES.includes(String(opt.status))) {
    console.error(`Status tidak dikenal: ${opt.status}. Pilihan: ${STATUSES.join(", ")}`);
    process.exit(1);
  }
  const jobsData = existsSync(JOBS) ? JSON.parse(readFileSync(JOBS, "utf8")) : { shortlist: [] };
  const job = jobsData.shortlist.find((j) => j.id === opt.id || j.id.includes(String(opt.id))) || {};
  const today = new Date().toISOString().slice(0, 10);
  const appliedToday = db.applications.filter((a) => a.appliedAt === today).length;
  if (opt.status === "applied") {
    if (appliedToday >= HARD_LIMIT) {
      console.error(`Berhenti: batas keras ${HARD_LIMIT} lamaran/hari tercapai. Kualitas > kuantitas.`);
      process.exit(1);
    }
    if (appliedToday >= DAILY_LIMIT) {
      console.warn(`Peringatan: target harian ${DAILY_LIMIT} sudah tercapai. Pertimbangkan berhenti hari ini.`);
    }
  }
  const existing = db.applications.find((a) => a.id === opt.id);
  const entry = {
    id: opt.id,
    title: job.title || existing?.title || "(tidak ada di shortlist)",
    company: job.company || existing?.company || null,
    source: job.source || existing?.source || "manual",
    url: job.url || existing?.url || null,
    score: job.score ?? existing?.score ?? null,
    status: String(opt.status),
    note: opt.note ? String(opt.note) : existing?.note || null,
    foundAt: existing?.foundAt || new Date().toISOString(),
    appliedAt: opt.status === "applied" ? today : existing?.appliedAt || null,
    updatedAt: new Date().toISOString(),
  };
  if (existing) Object.assign(existing, entry);
  else db.applications.push(entry);
  save();
  console.log(`${entry.status.padEnd(9)} ${entry.title} @ ${entry.company || "-"}`);
  console.log(`Lamaran hari ini: ${appliedToday + (opt.status === "applied" ? 1 : 0)}/${DAILY_LIMIT} (batas keras ${HARD_LIMIT})`);
  console.log(`Tersimpan: ${DB}`);
}
