#!/usr/bin/env node
/**
 * assist_apply.mjs — alur "assisted" untuk platform yang melarang otomasi
 * (LinkedIn, JobStreet/SEEK, Glints, Glassdoor, Dealls, Kalibrr).
 *
 * Script ini TIDAK mengirim lamaran dan TIDAK menyimpan kredensial platform.
 * Yang dilakukan: menyiapkan bahan (cover letter + jawaban screening) ke clipboard,
 * menampilkan urutan langkah, dan menandai status di tracker.
 *
 * Pakai:
 *   node scripts/jobs/assist_apply.mjs --index 1                 # dari shortlist
 *   node scripts/jobs/assist_apply.mjs --index 1 --open --copy    # buka browser + salin
 *   node scripts/jobs/assist_apply.mjs --url "https://..." --company "PT X" --title "Backend Engineer"
 *
 * Opsi:
 *   --index        nomor di shortlist (1 = skor tertinggi)
 *   --id           id lowongan di jobs.json
 *   --url          URL lowongan manual (untuk hasil pencarian di LinkedIn/JobStreet)
 *   --company      nama perusahaan (manual)
 *   --title        posisi (manual)
 *   --lang         en | id (default: en; otomatis en+id bila perusahaan Indonesia)
 *   --copy         salin cover letter + jawaban ke clipboard
 *   --open         buka URL lowongan di browser
 *   --dry-run      tampilkan saja, jangan salin/buka/tandai
 *   --no-track     jangan tandai status "drafted" di tracker
 */
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const argv = process.argv.slice(2);
const opt = {};
for (let i = 0; i < argv.length; i++) {
  if (!argv[i].startsWith("--")) continue;
  opt[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
}
const DIR = String(opt.dir || ".hermes/jobs");
const JOBS = String(opt.jobs || join(DIR, "jobs.json"));
const PROFILE = String(opt.profile || join(DIR, "profile.json"));
const APPLICATIONS = String(opt.applications || join(DIR, "applications"));

const profile = existsSync(PROFILE) ? JSON.parse(readFileSync(PROFILE, "utf8")) : {};
void profile; // profil dipakai lewat new_application.mjs; di sini hanya untuk validasi file ada
let job = null;
if (existsSync(JOBS)) {
  const data = JSON.parse(readFileSync(JOBS, "utf8"));
  if (opt.index) job = data.shortlist[Number(opt.index) - 1] || null;
  if (opt.id) job = data.shortlist.find((j) => j.id === opt.id || j.id.includes(String(opt.id))) || job;
}
const manual = Boolean(opt.url) || Boolean(opt.title);
if (manual) {
  job = {
    id: opt.id || `manual:${Date.now()}`,
    title: String(opt.title || "Posisi (manual)"),
    company: opt.company ? String(opt.company) : null,
    source: "manual",
    url: String(opt.url || ""),
    score: null,
    matched: [],
    gaps: [],
    priorities: [],
    salaryNote: "tidak diketahui (manual)",
    timezoneWhy: "-",
    text: "",
  };
}
if (!job) {
  console.error("Lowongan tidak ditemukan. Pakai --index, --id, atau --url/--title untuk entri manual.");
  process.exit(1);
}

const ID_HINT = /(indonesia|jakarta|bandung|surabaya|yogyakarta|medan|denpasar|rupiah|\bidr\b|\bwib\b|\bpt\s+[a-z]|tbk\b)/i;
const isIndonesian = ID_HINT.test(`${job.company} ${job.region} ${job.text || ""}`);
const lang = opt.lang ? String(opt.lang) : isIndonesian ? "both" : "en";

// ---------- paket dokumen (dibuat dulu lewat new_application.mjs bila belum ada) ----------
const slugify = (s = "") => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
let packageDir = null;
if (existsSync(APPLICATIONS)) {
  const target = slugify(`${job.company || job.source}-${job.title}`);
  try {
    const { readdirSync } = await import("node:fs");
    packageDir =
      readdirSync(APPLICATIONS)
        .map((d) => join(APPLICATIONS, d))
        .find((d) => slugify(d).includes(slugify(job.title).slice(0, 20)) && slugify(d).includes(slugify(job.company || "").slice(0, 10))) || null;
    if (!packageDir && target) {
      packageDir = readdirSync(APPLICATIONS).map((d) => join(APPLICATIONS, d)).find((d) => slugify(d).includes(target.slice(0, 25))) || null;
    }
  } catch {
    packageDir = null;
  }
}
if (!packageDir && !opt["dry-run"]) {
  try {
    const genArgs = ["scripts/jobs/new_application.mjs", "--id", job.id, "--lang", lang];
    if (manual) genArgs.push("--url", job.url, "--title", job.title, "--company", job.company || "");
    execFileSync("node", genArgs, { stdio: "ignore" });
    const { readdirSync } = await import("node:fs");
    packageDir = readdirSync(APPLICATIONS).map((d) => join(APPLICATIONS, d)).filter((d) => slugify(d).includes(slugify(job.title).slice(0, 18))).pop() || null;
  } catch {
    packageDir = null;
  }
}

let coverLetter = "";
let answers = "";
if (packageDir) {
  const cl = join(packageDir, "cover-letter.md");
  const an = join(packageDir, "answers.md");
  if (existsSync(cl)) coverLetter = readFileSync(cl, "utf8");
  if (existsSync(an)) answers = readFileSync(an, "utf8");
}

const clipboardPayload = [
  coverLetter.replace(/<!--[\s\S]*?-->/g, "").trim(),
  "",
  "--- JAWABAN SCREENING ---",
  "",
  answers.replace(/<!--[\s\S]*?-->/g, "").trim(),
].join("\n");

// ---------- tampilan ----------
const line = "─".repeat(72);
console.log(line);
console.log(`ASSISTED APPLY — ${job.title}${job.company ? ` @ ${job.company}` : ""}`);
console.log(line);
console.log(`Sumber     : ${job.source}${job.score ? ` · skor ${job.score}` : ""}`);
console.log(`URL        : ${job.url || "(tidak ada)"}`);
console.log(`Bahasa     : ${lang}`);
if (job.matched?.length) console.log(`Skill cocok: ${job.matched.map((m) => m.label).join(", ")}`);
if (job.gaps?.length) console.log(`Gap pasar  : ${job.gaps.join(", ")}`);
console.log(`Gaji       : ${job.salaryNote}`);
console.log(`Zona waktu : ${job.timezoneWhy}`);
console.log(`Paket      : ${packageDir || "(belum dibuat — jalankan new_application.mjs)"}`);
console.log("");

console.log("LANGKAH (platform ini melarang otomasi — submit manual):");
console.log("1. Pastikan profil/CV PDF terbaru: public/cv-en.pdf" + (lang !== "en" ? " + cv-id.pdf" : ""));
console.log("2. Buka lowongan, cek ulang syarat (izin kerja, zona waktu, level).");
console.log("3. Tempel cover letter dari clipboard ke kolom lamaran / email.");
console.log("4. Jawab pertanyaan screening dengan jawaban yang sudah disiapkan.");
console.log("5. Klik Submit sendiri, lalu catat:");
console.log(`   node scripts/jobs/track.mjs --id "${job.id}" --status applied`);
console.log("");

if (opt["dry-run"]) {
  console.log("[dry-run] tidak menyalin, tidak membuka browser, tidak menandai tracker.");
  console.log(`[dry-run] panjang payload clipboard: ${clipboardPayload.length} karakter`);
} else {
  if (opt.copy) {
    try {
      execFileSync("pbcopy", { input: clipboardPayload });
      console.log(`✓ Cover letter + jawaban disalin ke clipboard (${clipboardPayload.length} karakter).`);
    } catch {
      console.warn("! pbcopy gagal (bukan macOS?). Salin manual dari file paket lamaran.");
    }
  }
  if (opt.open && job.url) {
    try {
      execFileSync("open", [String(job.url)]);
      console.log(`✓ Browser dibuka: ${job.url}`);
    } catch {
      console.warn("! gagal membuka browser. Buka manual.");
    }
  }
  if (!opt["no-track"]) {
    try {
      execFileSync("node", ["scripts/jobs/track.mjs", "--id", job.id, "--status", "drafted", "--note", "paket assisted disiapkan"], { stdio: "ignore" });
      console.log("✓ Status ditandai: drafted");
    } catch {
      console.warn("! gagal menandai tracker (lanjutkan manual).");
    }
  }
}
