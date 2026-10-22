#!/usr/bin/env node
/**
 * new_application.mjs — buat paket lamaran untuk satu lowongan dari shortlist:
 * cover letter (EN, atau EN+ID bila perusahaan Indonesia), jawaban screening,
 * dan checklist langkah submit.
 *
 * Pakai:
 *   node scripts/jobs/new_application.mjs --index 1
 *   node scripts/jobs/new_application.mjs --id "jobicy:155389-platform-engineer-managed-postgres"
 *   node scripts/jobs/new_application.mjs --index 1 --lang id
 *
 * Opsi:
 *   --index      nomor urut di shortlist (1 = skor tertinggi)
 *   --id         id lowongan di jobs.json
 *   --lang       en (default) | id | both
 *   --jobs       path jobs.json (default: .hermes/jobs/jobs.json)
 *   --out        direktori output (default: .hermes/jobs/applications)
 *   --force      timpa folder yang sudah ada
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const argv = process.argv.slice(2);
const opt = {};
for (let i = 0; i < argv.length; i++) {
  if (!argv[i].startsWith("--")) continue;
  opt[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
}
const JOBS = String(opt.jobs || ".hermes/jobs/jobs.json");
const OUT = String(opt.out || ".hermes/jobs/applications");
const PROFILE = String(opt.profile || ".hermes/jobs/profile.json");
const LANG = String(opt.lang || "en");

const data = JSON.parse(readFileSync(JOBS, "utf8"));
const profile = JSON.parse(readFileSync(PROFILE, "utf8"));

let job = null;
if (opt.id) job = data.shortlist?.find((j) => j.id === opt.id || j.id.includes(String(opt.id))) || null;
else if (opt.index) job = data.shortlist?.[Number(opt.index) - 1] || null;

if (!job && (opt.url || opt.title)) {
  // entri manual: lowongan dari LinkedIn/JobStreet/Glints yang tidak ada di shortlist
  job = {
    id: String(opt.id || `manual:${Date.now()}`),
    title: String(opt.title || "Posisi (manual)"),
    company: opt.company ? String(opt.company) : null,
    source: String(opt.source || "manual"),
    url: String(opt.url || ""),
    score: null,
    matched: [],
    gaps: [],
    priorities: [],
    salaryNote: "tidak diketahui (manual)",
    timezoneWhy: "-",
    region: opt.region ? String(opt.region) : "",
    text: String(opt.text || opt.title || ""),
  };
}
if (!job) {
  console.error("Lowongan tidak ditemukan. Jalankan scan_jobs.mjs dulu atau periksa --index/--id.");
  process.exit(1);
}

// ---------- deteksi perusahaan Indonesia ----------
const ID_HINT = /(indonesia|jakarta|bandung|surabaya|yogyakarta|medan|denpasar|rupiah|\bidr\b|\bwib\b|\bpt\s+[a-z]|tbk\b|bahasa indonesia)/i;
const isIndonesianCompany = ID_HINT.test(`${job.company} ${job.region} ${job.text.slice(0, 4000)}`);
const langs = LANG === "both" || (LANG === "en" && isIndonesianCompany) ? ["en", "id"] : [LANG === "id" ? "id" : "en"];

// ---------- pemilihan bukti yang paling relevan dengan lowongan ----------
const hay = `${job.title} ${(job.tags || []).join(" ")} ${job.text}`.toLowerCase();
const EVIDENCE = [
  { re: /next\.?js|react|frontend|front-end/, line: { en: "Owned the CMS frontend of a multi-tenant platform (Next.js App Router, Tailwind CSS, Motion) — 147 of 182 commits on that repository (81%).", id: "Memiliki frontend CMS platform multi-tenant (Next.js App Router, Tailwind CSS, Motion) — 147 dari 182 commit di repository tersebut (81%)." } },
  { re: /node\.?js|express|backend|api/, line: { en: "Contributed across 26 repositories in the product organisation (1,420 commits), building Express services with RabbitMQ, PostgreSQL, and Redis.", id: "Berkontribusi pada 26 repository di organisasi produk (1.420 commit), membangun layanan Express dengan RabbitMQ, PostgreSQL, dan Redis." } },
  { re: /microservice|event-driven|pub\/sub|rabbitmq|kafka/, line: { en: "Extended an event-driven broadcast engine (RabbitMQ, etcd service discovery, object storage) with 7 CI/CD workflows covering code quality, Docker builds, and releases.", id: "Mengembangkan engine broadcast berbasis event (RabbitMQ, service discovery etcd, object storage) dengan 7 workflow CI/CD untuk kualitas kode, build Docker, dan rilis." } },
  { re: /docker|kubernetes|devops|ci\/cd|terraform|cloud|infra/, line: { en: "Ship containerised services (Docker multi-stage, Docker Compose) through GitHub Actions and provision infrastructure with Terraform on GCP and Byteplus (61 of 62 commits on the Terraform repository).", id: "Merilis layanan dalam container (Docker multi-stage, Docker Compose) lewat GitHub Actions dan memprovision infrastruktur dengan Terraform di GCP dan Byteplus (61 dari 62 commit di repository Terraform)." } },
  { re: /flutter|dart|mobile/, line: { en: "Built several Flutter apps end to end: personal finance with local notifications, a password manager with biometric auth and encryption (121 commits), and background media backup using FFmpeg.", id: "Membangun beberapa aplikasi Flutter dari awal: keuangan pribadi dengan notifikasi lokal, manajer password dengan autentikasi biometrik dan enkripsi (121 commit), serta backup media latar belakang memakai FFmpeg." } },
  { re: /react native/, line: { en: "Delivered React Native apps earlier in my career and currently maintain the mobile suite plus the backend services behind it.", id: "Mengirim aplikasi React Native di awal karier dan kini merawat rangkaian aplikasi mobile beserta layanan backend di belakangnya." } },
  { re: /golang|\bgo\b/, line: { en: "Maintain a Go backend service (Fiber, AWS S3, Docker Compose, CI) — 74 commits, my largest Go codebase.", id: "Merawat layanan backend Go (Fiber, AWS S3, Docker Compose, CI) — 74 commit, codebase Go terbesar saya." } },
  { re: /postgres|sql|database/, line: { en: "Model data across PostgreSQL, MongoDB, Redis, and MySQL in production services, including schema and query tuning.", id: "Memodelkan data di PostgreSQL, MongoDB, Redis, dan MySQL pada layanan produksi, termasuk tuning skema dan query." } },
  { re: /test|jest|playwright|quality/, line: { en: "Cover changes with Jest, Sinon, Chai, Testing Library, Storybook, and Playwright where automation pays off.", id: "Menutup perubahan dengan Jest, Sinon, Chai, Testing Library, Storybook, dan Playwright pada bagian yang layak diotomasi." } },
];
const picked = EVIDENCE.filter((e) => e.re.test(hay)).map((e) => e.line);
if (picked.length < 2) picked.push(EVIDENCE[1].line, EVIDENCE[3].line);

const matchedLabels = (job.matched || []).map((m) => m.label);
const company = job.company || "the team";

// ---------- cover letter ----------
function coverLetter(lang) {
  const l = lang === "id";
  const e = picked.slice(0, 3).map((p) => (l ? p.id : p.en));
  const tzLine = l
    ? `${profile.timezone}, ${profile.timezoneOverlap.split(".")[0]}`
    : String(profile.timezoneLineEn || profile.timezone).replace(/\.$/, "");
  const salaryLine = l
    ? `Ekspektasi: minimum ${profile.salaryFloorIdr.toLocaleString("id-ID")} IDR nett/bulan; untuk posisi valas setara ±USD ${profile.salaryFloorUsdMonthly}/bulan.`
    : `Compensation: minimum IDR ${profile.salaryFloorIdr.toLocaleString("en-US")} net/month for IDR-based roles, ≈ USD ${profile.salaryFloorUsdMonthly}/month for USD-based roles.`;
  const greeting = l ? `Halo tim ${company},` : `Hi ${company} team,`;
  const body = l
    ? [
        `Saya Abdullah Harits, full-stack engineer dengan pengalaman lebih dari lima tahun dan basis di Jakarta (${tzLine}).`,
        ...e,
        `Total bukti yang bisa diverifikasi: ${profile.coreEvidence.repositoriesContributed} repository (${profile.coreEvidence.privateRepositories} privat), ${profile.coreEvidence.commits.toLocaleString("id-ID")} commit, ${profile.coreEvidence.pullRequestsAuthored} pull request dibuat dan ${profile.coreEvidence.pullRequestsReviewed} direview.`,
        `Posisi ini cocok dengan fokus saya (${profile.rolePriority.slice(0, 2).join(", ")}), dan saya siap bekerja remote penuh dengan overlap jam kerja Eropa maupun APAC. ${salaryLine}`,
        `Portofolio dan CV: ${profile.portfolio} · GitHub: ${profile.github}`,
        `Terima kasih atas waktunya. Saya senang membahas bagaimana pengalaman ini bisa membantu tim Anda.`,
      ]
    : [
        `I'm Abdullah Harits, a full-stack engineer with 5+ years of experience, based in Jakarta (${tzLine}).`,
        ...e,
        `Verifiable track record: ${profile.coreEvidence.repositoriesContributed} repositories (${profile.coreEvidence.privateRepositories} private), ${profile.coreEvidence.commits.toLocaleString("en-US")} commits, ${profile.coreEvidence.pullRequestsAuthored} pull requests authored and ${profile.coreEvidence.pullRequestsReviewed} reviewed.`,
        `This role lines up with my focus (${profile.rolePriority.slice(0, 2).join(", ")}), and I work fully remote with overlap across Europe and APAC alike. ${salaryLine}`,
        `Portfolio and CV: ${profile.portfolio} · GitHub: ${profile.github}`,
        `Thanks for your time — I'd be glad to walk through how this experience can help ${company}.`,
      ];
  return [greeting, "", ...body.flatMap((p) => [p, ""]), l ? profile.fullName : profile.fullName, `${profile.email} · ${profile.whatsapp} · ${profile.linkedin}`].join("\n");
}

// ---------- jawaban screening ----------
const answers = `# Jawaban Screening — ${job.title} @ ${job.company || "?"}

Salin-tempel sesuai pertanyaan yang muncul. Nilai diambil dari \`profile.json\`; perbarui di sana bila berubah.

| Pertanyaan umum | Jawaban |
|---|---|
| Nama lengkap | ${profile.fullName} |
| Email / WhatsApp | ${profile.email} / ${profile.phone} |
| Lokasi | ${profile.location} (${profile.timezone}) |
| Remote? | Ya, remote penuh. ${profile.timezoneOverlap} |
| Ekspektasi gaji | ${profile.salaryFloorIdr.toLocaleString("id-ID")} IDR nett/bulan minimum untuk posisi berbasis IDR; untuk posisi valas terbuka pada rentang yang ditawarkan. |
| Notice period | ${profile.noticePeriod} |
| Ketersediaan mulai | ${profile.availability} |
| Izin kerja | ${profile.workAuthorization} |
| Tipe kerja yang diterima | ${profile.employmentTypes.join(", ")} |
| Level bahasa Inggris | ${profile.englishLevel} |
| Tautan portofolio | ${profile.portfolio} |
| Penghasilan saat ini | Tersedia saat proses (tidak dipublikasikan di CV). |

## Jawaban naratif siap pakai

**"Ceritakan pengalaman remote Anda."**
${LANG === "id" ? "" : ""}Saya bekerja remote sejak 2021 di tim yang tersebar (Jakarta, Bandung, Yogyakarta), dan sejak 2023 menangani 26 repository dalam satu organisasi produk bersama rekan di beberapa zona waktu. Komunikasi harian memakai tulisan (issue, PR description, dokumentasi), jadi progres tetap terlihat tanpa harus bertemu langsung.

**"Bagaimana Anda menangani perbedaan zona waktu?"**
${profile.timezoneOverlap} Saya menaruh pekerjaan yang butuh sinkron di jam overlap dan sisanya asinkron (PR + catatan desain).

**"Apa kontribusi teknis terbesar Anda?"**
Broadcast engine event-driven: RabbitMQ, service discovery etcd, object storage, 7 workflow CI/CD, dan spesifikasi OpenAPI 177 path sebagai kontrak antar tim — plus frontend CMS platform yang 81% commit-nya saya pegang.

**"Kenapa cocok untuk posisi ini?"**
${matchedLabels.length ? `Skill yang diminta lowongan ini (${matchedLabels.slice(0, 6).join(", ")}) semuanya ada di CV dengan bukti repository.` : `Skill inti saya yang paling relevan: ${(profile.highlightSkills || []).slice(0, 6).join(", ")} — semuanya ada di CV dengan bukti repository.`} Yang belum saya kuasai dan sedang dipelajari: ${profile.learningTargets.join(", ")}.
`;

const checklist = `# Checklist Lamaran — ${job.title} @ ${job.company || "?"}

- Lowongan: ${job.url}
- Sumber: ${job.source} · Region: ${job.region || "-"} · Gaji: ${job.salary || "tidak disebutkan"}
- Skor kecocokan: ${job.score} (prioritas: ${(job.priorities || []).join("+") || "-"})
- Skill cocok: ${matchedLabels.join(", ") || "-"}
- Gap yang diminta pasar: ${(job.gaps || []).join(", ") || "tidak ada"}
- Catatan gaji: ${job.salaryNote}
- Zona waktu: ${job.timezoneWhy}

## Langkah
1. [ ] Buka tautan lowongan, cek ulang kualifikasi (terutama syarat izin kerja / zona waktu).
2. [ ] Siapkan CV PDF (EN; kalau perusahaan Indonesia, siapkan versi ID).
3. [ ] Salin cover letter dari \`cover-letter.md\`${langs.length > 1 ? " (EN dan ID)" : ""}.
4. [ ] Isi form dengan jawaban dari \`answers.md\`.
${job.url.match(/greenhouse|lever|ashby|workable|recruitee/i) ? "5. [ ] ATS terdeteksi → alur auto-isi diizinkan, tetap konfirmasi sebelum submit.\n" : "5. [ ] Platform tanpa API (LinkedIn/JobStreet/Glints/Glassdoor) → submit manual oleh user.\n"}6. [ ] Submit, lalu catat: \`node scripts/jobs/track.mjs --id ${job.id} --status applied\`
7. [ ] Simpan bukti (screenshot/email konfirmasi) di folder ini.
`;

const slug = `${(job.company || job.source).toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}-${job.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`.replace(/-+$/, "");
const dir = join(OUT, slug);
if (existsSync(dir) && !opt.force) {
  console.log(`Folder sudah ada: ${dir} (pakai --force untuk menimpa)`);
}
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "cover-letter.md"), langs.map((l) => `<!-- ${l.toUpperCase()} -->\n\n${coverLetter(l)}`).join("\n\n---\n\n"));
writeFileSync(join(dir, "answers.md"), answers);
writeFileSync(join(dir, "checklist.md"), checklist);
writeFileSync(join(dir, "job.json"), JSON.stringify(job, null, 2));

console.log(`Paket lamaran dibuat: ${dir}`);
console.log(`- cover-letter.md (${langs.join(", ")})`);
console.log("- answers.md");
console.log("- checklist.md");
console.log(`- job.json`);
console.log(`\nTautan: ${job.url}`);
