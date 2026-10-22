#!/usr/bin/env node
/**
 * make_cv_pdf.mjs — render area print CV menjadi PDF (EN + ID) memakai Chrome
 * headless lewat Chrome DevTools Protocol (tanpa dependency).
 *
 * Pakai:
 *   npm run build && node scripts/make_cv_pdf.mjs
 *
 * Opsi:
 *   --dir        folder static export (default: out)
 *   --out        folder PDF hasil (default: public)
 *   --copy       folder salinan tambahan (default: .hermes/jobs)
 *   --port       port server lokal (default: 3011)
 *   --locale     locale yang di-render, dipisah koma (default: en,id)
 *   --chrome     path binary Chrome (opsional)
 *
 * Cara kerja:
 *  1. static server lokal menyajikan folder `out/`
 *  2. Chrome dijalankan headless dengan autoplay dimatikan (agar video tidak
 *     menghambat load) dan remote debugging aktif
 *  3. sebelum mencetak: event `portfolio:skip-animation` dikirim supaya animasi
 *     typewriter langsung penuh, video dijeda dan dihapus dari DOM
 *  4. Page.printToPDF (printBackground + preferCSSPageSize) → tulis PDF
 */
import { createServer } from "node:http";
import { readFileSync, existsSync, mkdirSync, copyFileSync, statSync, writeFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { join, extname } from "node:path";

const argv = process.argv.slice(2);
const opt = {};
for (let i = 0; i < argv.length; i++) {
  if (!argv[i].startsWith("--")) continue;
  opt[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
}
const DIR = String(opt.dir || "out");
const OUT = String(opt.out || "public");
const COPY = String(opt.copy || ".hermes/jobs");
const PORT = Number(opt.port || 3011);
const DEBUG_PORT = PORT + 1;
const LOCALES = String(opt.locale || "en,id").split(",").map((s) => s.trim());
const CHROME = String(
  opt.chrome ||
    [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
      "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
      "/usr/bin/google-chrome",
    ].find((p) => existsSync(p)) ||
    "",
);
if (!CHROME) {
  console.error("Chrome/Chromium tidak ditemukan. Set --chrome /path/to/chrome");
  process.exit(1);
}
if (!existsSync(DIR)) {
  console.error(`Folder ${DIR} tidak ada. Jalankan 'npm run build' dulu.`);
  process.exit(1);
}

const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".mp4": "video/mp4",
  ".txt": "text/plain", ".xml": "application/xml", ".ico": "image/x-icon",
};
const server = createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  for (const file of [join(DIR, urlPath), join(DIR, `${urlPath}.html`), join(DIR, urlPath, "index.html")]) {
    if (existsSync(file) && statSync(file).isFile()) {
      res.writeHead(200, { "Content-Type": MIME[extname(file)] || "application/octet-stream" });
      res.end(readFileSync(file));
      return;
    }
  }
  res.writeHead(404).end("not found");
});
await new Promise((r) => server.listen(PORT, r));

// ---------- Chrome headless + CDP ----------
const userDataDir = join("/tmp", `chrome-cv-${Date.now()}`);
const chrome = spawn(
  CHROME,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--mute-audio",
    "--autoplay-policy=user-gesture-required",
    `--user-data-dir=${userDataDir}`,
    `--remote-debugging-port=${DEBUG_PORT}`,
    "about:blank",
  ],
  { stdio: ["ignore", "ignore", "ignore"] },
);

async function waitForDebugger(timeoutMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
      if (res.ok) return true;
    } catch {
      /* belum siap */
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

if (!(await waitForDebugger())) {
  chrome.kill();
  server.close();
  console.error("Chrome debugger tidak siap. Coba jalankan tanpa Chrome lain yang berjalan.");
  process.exit(1);
}

/** Klien CDP minimal berbasis WebSocket global (Node 22+). */
async function openTarget(url) {
  const res = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/new?${encodeURIComponent(url)}`, { method: "PUT" });
  const target = await res.json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });
  let id = 0;
  const pending = new Map();
  const events = [];
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
    } else if (msg.method) {
      events.push(msg.method);
    }
  });
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const msgId = ++id;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  const waitEvent = async (method, timeoutMs = 20000) => {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      if (events.includes(method)) return true;
      await new Promise((r) => setTimeout(r, 150));
    }
    return false;
  };
  return { ws, send, waitEvent, targetId: target.id };
}

const results = [];
for (const locale of LOCALES) {
  const url = `http://localhost:${PORT}/${locale}`;
  const { ws, send, waitEvent, targetId } = await openTarget(url);
  try {
    await send("Page.enable");
    await send("Page.navigate", { url });
    await waitEvent("Page.loadEventFired", 25000);
    // tunggu hidrasi klien (React) selesai
    await new Promise((r) => setTimeout(r, 2500));
    // picu skip-animation + buang video agar cetakan bersih dan cepat
    await send("Runtime.evaluate", {
      expression: `
        window.dispatchEvent(new Event('portfolio:skip-animation'));
        document.querySelectorAll('video').forEach((v) => { try { v.pause(); } catch {} v.remove(); });
        true;
      `,
      awaitPromise: false,
    });
    // beri waktu React menuntaskan re-render tanpa animasi
    await new Promise((r) => setTimeout(r, 2500));
    const { data } = await send("Page.printToPDF", {
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
    });
    const pdf = join(OUT, `cv-${locale}.pdf`);
    mkdirSync(OUT, { recursive: true });
    writeFileSync(pdf, Buffer.from(data, "base64"));
    mkdirSync(COPY, { recursive: true });
    copyFileSync(pdf, join(COPY, `cv-${locale}.pdf`));
    results.push({ locale, pdf, kb: Math.round(statSync(pdf).size / 1024) });
  } catch (err) {
    console.error(`[${locale}] gagal: ${err.message}`);
  } finally {
    ws.close();
    await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/close/${targetId}`).catch(() => {});
  }
}

chrome.kill();
server.close();

for (const r of results) console.log(`✓ ${r.locale}: ${r.pdf} (${r.kb} KB) → salinan ${join(COPY, `cv-${r.locale}.pdf`)}`);
if (!results.length) {
  console.error("Tidak ada PDF yang dihasilkan.");
  process.exit(1);
}
console.log("\nCek manual: buka PDF, pastikan seluruh teks CV tercetak dan jumlah halaman ≤ 2.");
