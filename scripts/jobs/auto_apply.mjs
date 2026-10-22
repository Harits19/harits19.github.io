#!/usr/bin/env node
/**
 * auto_apply.mjs — eksekutor lamaran untuk kanal yang MENGIZINKAN otomasi:
 *   • ATS (Greenhouse, Lever, Ashby, Workable, Recruitee): isi form otomatis,
 *     unggah CV, ambil screenshot, lalu BERHENTI sebelum tombol submit.
 *     Submit hanya dilakukan bila user menambahkan --confirm submit.
 *   • Email: tidak mengirim email. Script hanya membuat draf (.eml) + mailto +
 *     menyalin isi ke clipboard, karena pengiriman butuh kredensial SMTP.
 *
 * Platform yang melarang otomasi (LinkedIn, JobStreet/SEEK, Glints, Glassdoor)
 * DITOLAK oleh script ini — pakai assist_apply.mjs.
 *
 * Pakai:
 *   node scripts/jobs/auto_apply.mjs --index 1                    # isi form, stop
 *   node scripts/jobs/auto_apply.mjs --index 1 --confirm submit    # isi + submit
 *   node scripts/jobs/auto_apply.mjs --url "https://boards.greenhouse.io/..." --title "..." --company "..."
 *   node scripts/jobs/auto_apply.mjs --index 2 --email             # siapkan draf email
 *
 * Opsi:
 *   --index/--id/--url/--title/--company   sumber lowongan (shortlist atau manual)
 *   --resume PATH     PDF CV (default: public/cv-en.pdf, atau cv-id.pdf bila --lang id)
 *   --lang en|id      bahasa CV & jawaban (default en)
 *   --confirm submit  benar-benar klik tombol kirim (tanpa ini: berhenti sebelum submit)
 *   --headless false  tampilkan jendela Chrome (default: true)
 *   --email           mode email: buat draf, tanpa browser
 *   --dry-run         isi form lalu tutup tanpa screenshot? (default: screenshot tetap diambil)
 *
 * Keamanan: tidak menyimpan kredensial, tidak menembus CAPTCHA/login, menolak
 * domain terlarang, membatasi 5 lamaran/hari, dan mencatat setiap aksi ke
 * .hermes/jobs/actions.log.
 */
import {
  readFileSync, writeFileSync, existsSync, mkdirSync, appendFileSync,
} from "node:fs";
import { spawn, execFileSync } from "node:child_process";
import { join, resolve } from "node:path";

const argv = process.argv.slice(2);
const opt = {};
for (let i = 0; i < argv.length; i++) {
  if (!argv[i].startsWith("--")) continue;
  opt[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
}
const DIR = String(opt.dir || ".hermes/jobs");
const JOBS = join(DIR, "jobs.json");
const PROFILE = join(DIR, "profile.json");
const APPS = join(DIR, "applications");
const LOG = join(DIR, "actions.log");
const SCREENS = join(DIR, "screens");
const DAILY_LIMIT = 5;

const profile = JSON.parse(readFileSync(PROFILE, "utf8"));
const lang = String(opt.lang || "en");

function log(line) {
  mkdirSync(DIR, { recursive: true });
  appendFileSync(LOG, `${new Date().toISOString()} ${line}\n`);
}

// ---------- resolusi lowongan ----------
let job = null;
if (existsSync(JOBS)) {
  const data = JSON.parse(readFileSync(JOBS, "utf8"));
  if (opt.index) job = data.shortlist?.[Number(opt.index) - 1] || null;
  if (opt.id) job = data.shortlist?.find((j) => j.id === opt.id || j.id.includes(String(opt.id))) || job;
}
if (!job && (opt.url || opt.title)) {
  job = {
    id: String(opt.id || `manual:${Date.now()}`),
    title: String(opt.title || "Posisi (manual)"),
    company: opt.company ? String(opt.company) : null,
    source: "manual",
    url: String(opt.url || ""),
    score: null, matched: [], gaps: [], salaryNote: "-", timezoneWhy: "-", text: "",
  };
}
if (!job) {
  console.error("Lowongan tidak ditemukan. Pakai --index, --id, atau --url/--title.");
  process.exit(1);
}

// ---------- pagar: domain terlarang ----------
const BLOCKED = [
  { re: /linkedin\.com/i, why: "LinkedIn melarang otomasi" },
  { re: /jobstreet\.com|seek\.com|jobsdb\.com/i, why: "JobStreet/SEEK anti-bot" },
  { re: /glints\.com/i, why: "Glints anti-bot" },
  { re: /glassdoor\./i, why: "Glassdoor anti-bot" },
];
const url = String(job.url || "");
for (const b of BLOCKED) {
  if (b.re.test(url)) {
    console.error(`DITOLAK: ${b.why}. Gunakan scripts/jobs/assist_apply.mjs untuk platform ini.`);
    log(`REFUSED ${job.id} blocked-host (${b.why})`);
    process.exit(2);
  }
}

// ---------- pagar: batas harian ----------
const DB = join(DIR, "applications.json");
const db = existsSync(DB) ? JSON.parse(readFileSync(DB, "utf8")) : { applications: [] };
const today = new Date().toISOString().slice(0, 10);
const appliedToday = (db.applications || []).filter((a) => a.appliedAt === today).length;
if (opt.confirm === "submit" && appliedToday >= DAILY_LIMIT) {
  console.error(`Berhenti: batas ${DAILY_LIMIT} lamaran/hari sudah tercapai.`);
  process.exit(3);
}

// ---------- aset ----------
const resume = resolve(
  String(opt.resume || join("public", lang === "id" ? "cv-id.pdf" : "cv-en.pdf")),
);
if (!existsSync(resume)) {
  console.error(`CV tidak ditemukan: ${resume}. Jalankan 'node scripts/make_cv_pdf.mjs' dulu.`);
  process.exit(1);
}
const slug = `${(job.company || job.source).toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 28)}-${job.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 36)}`.replace(/-+$/, "");
const pkgDir = join(APPS, slug);
const coverPath = join(pkgDir, "cover-letter.md");
const coverLetter = existsSync(coverPath)
  ? readFileSync(coverPath, "utf8").replace(/<!--[\s\S]*?-->/g, "").trim()
  : `Hi ${job.company || "team"}, I'm Abdullah Harits — full-stack engineer (${profile.highlightSkills.slice(0, 5).join(", ")}). ${profile.portfolio}`;

// ---------- mode email ----------
const emails = [...String(job.text || "").matchAll(/[\w.+-]+@[\w-]+\.[\w.-]+/g)]
  .map((m) => m[0])
  .filter((e) => !/example\.|sentry|noreply|no-reply|@2x|\.png|\.jpg/i.test(e));
if (opt.email || (emails.length && !/greenhouse|lever|ashby|workable|recruitee/i.test(url))) {
  const to = emails[0] || String(opt.to || "");
  const subject = `Application — ${job.title}${job.company ? ` at ${job.company}` : ""} (Abdullah Harits)`;
  const body = `${coverLetter}`;
  const eml = [
    `To: ${to}`,
    `From: ${profile.fullName} <${profile.email}>`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset="utf-8"`,
    ``,
    body,
    ``,
    `--`,
    `${profile.fullName} · ${profile.phone}`,
    `${profile.portfolio} · ${profile.linkedin} · ${profile.github}`,
    ``,
    `Attachment to add manually: ${resume}`,
  ].join("\r\n");
  mkdirSync(pkgDir, { recursive: true });
  const emlPath = join(pkgDir, "email-draft.eml");
  writeFileSync(emlPath, eml);
  const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body).slice(0, 1800)}`;
  writeFileSync(join(pkgDir, "email-mailto.txt"), mailto);
  console.log(`Alamat email terdeteksi: ${to || "(tidak ada — isi manual)"}`);
  console.log(`Draf email : ${emlPath}`);
  console.log(`mailto     : ${mailto}`);
  console.log(`CV dilampirkan manual: ${resume}`);
  console.log("\nScript ini TIDAK mengirim email (tidak ada kredensial SMTP yang disimpan). Buka draf di klien email, lampirkan CV, lalu kirim sendiri.");
  if (opt.open && to) {
    try { execFileSync("open", [mailto]); } catch { /* abaikan */ }
  }
  log(`EMAIL-DRAFT ${job.id} to=${to || "-"} file=${emlPath}`);
  process.exit(0);
}

// ---------- mode ATS: Chrome + CDP ----------
const CHROME = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
].find((p) => existsSync(p));
if (!CHROME) {
  console.error("Chrome tidak ditemukan.");
  process.exit(1);
}
const headless = String(opt.headless || "true") !== "false";
const DEBUG_PORT = 9333;
const chrome = spawn(CHROME, [
  headless ? "--headless=new" : "--new-window",
  "--disable-gpu", "--no-first-run", "--mute-audio",
  `--user-data-dir=${join("/tmp", `chrome-apply-${Date.now()}`)}`,
  `--remote-debugging-port=${DEBUG_PORT}`,
  "about:blank",
], { stdio: "ignore", detached: !headless });

for (let i = 0; i < 60; i++) {
  try { if ((await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`)).ok) break; } catch { /* tunggu */ }
  await new Promise((r) => setTimeout(r, 400));
}

const target = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/new?${encodeURIComponent(url)}`, { method: "PUT" })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let msgId = 0;
const pending = new Map();
const events = [];
ws.addEventListener("message", (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    const { resolve: res, reject } = pending.get(m.id);
    pending.delete(m.id);
    if (m.error) reject(new Error(m.error.message));
    else res(m.result);
  } else if (m.method) events.push(m.method);
});
const send = (method, params = {}) =>
  new Promise((res, rej) => {
    const id = ++msgId;
    pending.set(id, { resolve: res, reject: rej });
    ws.send(JSON.stringify({ id, method, params }));
  });

await send("Page.enable");
await send("DOM.enable");
await send("Runtime.enable");
await send("Page.navigate", { url });
for (let i = 0; i < 150 && !events.includes("Page.loadEventFired"); i++) await new Promise((r) => setTimeout(r, 150));
await new Promise((r) => setTimeout(r, 2500));

const whyFile = join(pkgDir, "why-us.md");
const whyUs = existsSync(whyFile)
  ? readFileSync(whyFile, "utf8").trim()
  : coverLetter.split("\n\n").slice(1, 4).join("\n\n").trim();

const FILL = {
  name: profile.fullName,
  first: String(profile.fullName).split(" ")[0],
  last: String(profile.fullName).split(" ").slice(1).join(" "),
  email: profile.email,
  phone: profile.phone,
  location: `${profile.location} (${profile.timezone})`,
  linkedin: profile.linkedin,
  github: profile.github,
  website: profile.portfolio,
  salary: `IDR ${profile.salaryFloorIdr.toLocaleString("en-US")} net/month (≈ USD ${profile.salaryFloorUsdMonthly}/month)`,
  workAuth:
    "Based in Indonesia (WIB/UTC+7). No visa sponsorship needed — I work remotely as a contractor or through an employer-of-record.",
  years: "5+ years",
  notice: "1 month",
  source: "Company careers page (Greenhouse)",
  country: "Indonesia",
  openSource:
    "Yes — 94 public repositories at github.com/Harits19, including production-shaped projects: vet-management-system (Next.js/Express/MongoDB, 239 commits), invitation-backend-service (Go/Fiber, 74 commits), anti_rokok (MCP + Playwright assistant), and my_money (Flutter).",
  why: whyUs,
  narrative: `Full-stack engineer based in Jakarta (WIB, UTC+7) with 5+ years across TypeScript/Node.js, Go, and Flutter. I own the CMS frontend of a multi-tenant chatbot platform (${"Next.js App Router, Tailwind, Motion"}) and maintain the services behind it: Express APIs on PostgreSQL, Redis and MongoDB, a RabbitMQ broadcast engine with etcd service discovery, Docker multi-stage builds, GitHub Actions pipelines, and Terraform-provisioned infrastructure on GCP and Byteplus. Verifiable: 128 repositories contributed to, 3,977 commits, 218 pull requests authored, 175 reviewed. I also run production observability (Prometheus, Grafana, Loki, Thanos) and OpenAPI design (177 paths).`,
  cover: coverLetter,
};

const fillResult = await send("Runtime.evaluate", {
  returnByValue: true,
  expression: `(() => {
    const map = ${JSON.stringify(FILL)};
    const done = [];
    const skipped = [];
    const setValue = (el, value) => {
      const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype
        : el instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
      if (setter) setter.call(el, value); else el.value = value;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      el.dispatchEvent(new Event('blur', { bubbles: true }));
    };
    const labelOf = (el) => {
      let t = '';
      const id = el.id;
      if (id) {
        const l = document.querySelector('label[for="' + id.replace(/"/g, '') + '"]');
        if (l) t = l.innerText;
      }
      if (!t) { const p = el.closest('label'); if (p) t = p.innerText; }
      if (!t) t = el.getAttribute('aria-label') || el.getAttribute('placeholder') || '';
      if (!t) { const box = el.closest('div'); if (box) t = (box.innerText || '').slice(0, 140); }
      return (t || '').replace(/\\s+/g, ' ').trim().toLowerCase();
    };
    const pick = (label) => {
      if (/g-recaptcha|recaptcha/.test(label)) return null;
      if (/why|cover|motivat|additional info|anything else|message to|tell us|little about|background|interest in|what excites/.test(label)) return map.why;
      if (/e-?mail/.test(label)) return map.email;
      if (/first name/.test(label)) return map.first;
      if (/last name|surname|family name/.test(label)) return map.last;
      if (/full name|^name$|your name|legal name/.test(label)) return map.name;
      if (/phone|mobile|whatsapp/.test(label)) return map.phone;
      if (/linkedin/.test(label)) return map.linkedin;
      if (/github|gitlab/.test(label)) return map.github;
      if (/portfolio|website|personal site|blog/.test(label)) return map.website;
      if (/salary|compensation|expectation|rate/.test(label)) return map.salary;
      if (/sponsor|visa|authoriz|right to work|legally eligible/.test(label)) return map.workAuth;
      if (/passport|country of residence|country\b|nationality/.test(label)) return map.country;
      if (/open source|open-source/.test(label)) return map.openSource;
      if (/where|location|based|city|time ?zone|reside/.test(label)) return map.location;
      if (/how many years|years of (professional )?experience|year experience/.test(label)) return map.years;
      if (/describe|tell us about|experience with|explain|summar/.test(label)) return map.narrative;
      if (/notice|start date|available|availability/.test(label)) return map.notice;
      if (/hear about|how did you find|referr|source/.test(label)) return map.source;
      return null;
    };
    const fields = [...document.querySelectorAll('input, textarea, select')].filter((el) => {
      const t = (el.getAttribute('type') || el.tagName).toLowerCase();
      if (['hidden', 'submit', 'button', 'file', 'checkbox', 'radio', 'search'].includes(t)) return false;
      if ((el.name || '').includes('g-recaptcha')) return false;
      return true;
    });
    for (const el of fields) {
      const label = labelOf(el);
      const value = pick(label);
      if (!value) { skipped.push(label.slice(0, 48) || el.tagName.toLowerCase()); continue; }
      setValue(el, value);
      done.push(label.slice(0, 48) || el.tagName.toLowerCase());
    }
    // fallback: textarea wajib yang masih kosong diisi jawaban naratif (bukan dibiarkan kosong)
    for (const el of document.querySelectorAll('textarea')) {
      if (String(el.value || '').trim()) continue;
      if ((el.name || '').includes('g-recaptcha')) continue;
      const label = labelOf(el);
      setValue(el, map.why);
      done.push('fallback: ' + (label.slice(0, 40) || 'textarea'));
    }
    const unfilledRequired = [...document.querySelectorAll('[required]')]
      .filter((el) => el.type !== 'file' && !String(el.value || '').trim())
      .map((el) => {
        const l = el.id ? document.querySelector('label[for="' + el.id + '"]') : null;
        return ((l && l.innerText) || el.id || el.name || el.tagName).replace(/\\s+/g, ' ').trim().slice(0, 48).toLowerCase();
      });
    const captcha = Boolean(document.querySelector('iframe[src*="recaptcha"], .g-recaptcha, textarea[name="g-recaptcha-response"], iframe[src*="hcaptcha"]'));
    return JSON.stringify({ done, skipped, unfilledRequired, captcha, inputs: fields.length });
  })()`,
});
const fill = JSON.parse(fillResult.result.value);

// unggah CV ke input[type=file] pertama
let upload = "tidak ada input file";
try {
  const doc = await send("DOM.getDocument", { depth: -1 });
  const q = await send("DOM.querySelector", { nodeId: doc.root.nodeId, selector: 'input[type="file"]' });
  if (q.nodeId) {
    await send("DOM.setFileInputFiles", { nodeId: q.nodeId, files: [resume] });
    upload = `berhasil → ${resume}`;
  }
} catch (err) {
  upload = `gagal: ${err.message}`;
}

mkdirSync(SCREENS, { recursive: true });
const beforeShot = join(SCREENS, `${slug}-before-submit.png`);
const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
writeFileSync(beforeShot, Buffer.from(shot.data, "base64"));

console.log("─".repeat(72));
console.log(`ATS AUTOFILL — ${job.title}${job.company ? ` @ ${job.company}` : ""}`);
console.log("─".repeat(72));
console.log(`URL        : ${url}`);
console.log(`Input      : ${fill.inputs} field terdeteksi`);
console.log(`Terisi     : ${fill.done.join(", ") || "(tidak ada yang cocok)"}`);
console.log(`Tak dikenali: ${[...new Set(fill.skipped)].slice(0, 8).join(", ") || "-"}`);
console.log(`Wajib kosong: ${fill.unfilledRequired.join(", ") || "(semua terisi)"}`);
console.log(`reCAPTCHA  : ${fill.captcha ? "ADA — submit harus diselesaikan manusia" : "tidak terdeteksi"}`);
console.log(`CV         : ${upload}`);
console.log(`Screenshot : ${beforeShot}`);
console.log("");

let submitted = false;
if (String(opt.confirm) === "submit" && fill.captcha) {
  console.log("✗ Submit dibatalkan: form memakai reCAPTCHA/hCaptcha.");
  console.log("  Form sudah terisi + CV terunggah. Selesaikan submit di jendela Chrome (atau jalankan ulang dengan --headless false).");
  console.log("  Ini batas yang tidak akan dilewati otomasi: menyelesaikan captcha = menyamar sebagai manusia.");
  log(`CAPTCHA-BLOCK ${job.id} url=${url}`);
  process.exit(4);
}
if (String(opt.confirm) === "submit") {
  const clickResult = await send("Runtime.evaluate", {
    returnByValue: true,
    expression: `(() => {
      const btn = [...document.querySelectorAll('button, input[type=submit]')]
        .find((b) => /submit|apply|send application|kirim/i.test((b.innerText || b.value || '').trim()));
      if (!btn) return JSON.stringify({ ok: false, reason: 'tombol submit tidak ditemukan' });
      btn.scrollIntoView({ block: 'center' });
      btn.click();
      return JSON.stringify({ ok: true, label: (btn.innerText || btn.value || '').trim() });
    })()`,
  });
  const res = JSON.parse(clickResult.result.value);
  if (res.ok) {
    submitted = true;
    await new Promise((r) => setTimeout(r, 3000));
    const after = await send("Page.captureScreenshot", { format: "png" });
    const afterShot = join(SCREENS, `${slug}-after-submit.png`);
    writeFileSync(afterShot, Buffer.from(after.data, "base64"));
    try {
      execFileSync("node", ["scripts/jobs/track.mjs", "--id", job.id, "--status", "applied", "--note", `auto-submit (${res.label})`], { stdio: "ignore" });
    } catch { /* tracker opsional */ }
    console.log(`✓ Submit diklik ("${res.label}") · bukti: ${afterShot}`);
    console.log("✓ Status tracker: applied");
    log(`AUTO-SUBMIT ${job.id} url=${url} label=${res.label}`);
  } else {
    console.log(`✗ Submit tidak dilakukan: ${res.reason}`);
    log(`AUTO-SUBMIT-FAILED ${job.id} url=${url} reason=${res.reason}`);
  }
} else {
  console.log("BERHENTI sebelum submit (sesuai pagar). Form sudah terisi + CV terunggah.");
  console.log(`Untuk benar-benar mengirim: ulangi dengan --confirm submit`);
  console.log(`Cek dulu screenshot: ${beforeShot}`);
  try {
    execFileSync("node", ["scripts/jobs/track.mjs", "--id", job.id, "--status", "drafted", "--note", "ATS autofill siap submit"], { stdio: "ignore" });
  } catch { /* opsional */ }
  log(`AUTOFILL ${job.id} url=${url} filled=${fill.done.length} submitted=false`);
}

ws.close();
if (headless) chrome.kill();
else console.log("\nJendela Chrome dibiarkan terbuka agar kamu bisa submit manual.");
process.exit(submitted || String(opt.confirm) !== "submit" ? 0 : 1);
