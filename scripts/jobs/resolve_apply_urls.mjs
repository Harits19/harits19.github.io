#!/usr/bin/env node
/**
 * resolve_apply_urls.mjs — cari URL lamaran ASLI (ATS perusahaan / email) untuk
 * setiap lowongan di shortlist. Halaman agregator (Remotive, Jobicy, WWR,
 * Himalayas, Working Nomads) merender tombol Apply lewat JS, jadi server-side
 * fetch tidak cukup: script ini membuka halaman di Chrome headless, klik kandidat
 * tombol "Apply", lalu menangkap URL akhir.
 *
 * Pakai:
 *   node scripts/jobs/resolve_apply_urls.mjs             # 12 teratas
 *   node scripts/jobs/resolve_apply_urls.mjs --limit 25
 *
 * Output: .hermes/jobs/apply-resolved.json
 *   status: direct-ats | login-required | aggregator-only | email | error
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { spawn } from "node:child_process";
import { join } from "node:path";

const argv = process.argv.slice(2);
const opt = {};
for (let i = 0; i < argv.length; i++) {
  if (!argv[i].startsWith("--")) continue;
  opt[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
}
const DIR = String(opt.dir || ".hermes/jobs");
const LIMIT = Number(opt.limit || 12);
const data = JSON.parse(readFileSync(join(DIR, "jobs.json"), "utf8"));
const list = data.shortlist.slice(0, LIMIT);

const ATS = /(greenhouse\.io|lever\.co|ashbyhq\.com|workable\.com|recruitee\.com|breezy\.hr|jobvite|smartrecruiters|myworkdayjobs|workday|bamboohr|teamtailor|personio|rippling|dover\.com|jazz\.co|applytojob|homerun\.co|pinpoint\.hq)/i;
const LOGIN = /(login|sign.?in|signup|sign.?up|register|account\/)/i;
const AGGREGATOR = /(workingnomads|remotive|remoteok|jobicy|himalayas|weworkremotely|jobspresso)/i;
const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.-]{2,}/g;

const CHROME = ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome"].find((p) => {
  try {
    readFileSync(p);
    return true;
  } catch {
    return false;
  }
});
const DEBUG = 9445;
const chrome = spawn(CHROME || "google-chrome", [
  "--headless=new", "--disable-gpu", "--no-first-run", "--mute-audio",
  `--user-data-dir=${join("/tmp", `chrome-resolve-${Date.now()}`)}`,
  `--remote-debugging-port=${DEBUG}`, "about:blank",
], { stdio: "ignore" });
for (let i = 0; i < 60; i++) {
  try { if ((await fetch(`http://127.0.0.1:${DEBUG}/json/version`)).ok) break; } catch { /* tunggu */ }
  await new Promise((r) => setTimeout(r, 400));
}

async function session(url) {
  const t = await (await fetch(`http://127.0.0.1:${DEBUG}/json/new?${encodeURIComponent(url)}`, { method: "PUT" })).json();
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));
  let id = 0;
  const pending = new Map();
  const events = [];
  ws.addEventListener("message", (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const { resolve, reject } = pending.get(m.id);
      pending.delete(m.id);
      if (m.error) reject(new Error(m.error.message));
      else resolve(m.result);
    } else if (m.method) events.push(m);
  });
  const send = (method, params = {}) =>
    new Promise((res, rej) => {
      const i = ++id;
      pending.set(i, { resolve: res, reject: rej });
      ws.send(JSON.stringify({ id: i, method, params }));
    });
  const waitLoad = async (ms = 15000) => {
    const start = Date.now();
    while (Date.now() - start < ms) {
      if (events.some((e) => e.method === "Page.loadEventFired")) return;
      await new Promise((r) => setTimeout(r, 150));
    }
  };
  return { ws, send, waitLoad, id: t.id };
}

const out = [];
for (const job of list) {
  const s = await session(job.url);
  try {
    await s.send("Page.enable");
    await s.send("Page.navigate", { url: job.url });
    await s.waitLoad();
    await new Promise((r) => setTimeout(r, 2200));

    const probe = async () =>
      JSON.parse(
        (
          await s.send("Runtime.evaluate", {
            returnByValue: true,
            expression: `(() => {
              const links = [...document.querySelectorAll('a[href]')].map((a) => ({ href: a.href, text: (a.innerText || '').trim().slice(0, 40) }));
              const buttons = [...document.querySelectorAll('a, button')].filter((el) => /apply|lamar|submit/i.test((el.innerText || el.value || '').trim())).map((el) => (el.innerText || '').trim().slice(0, 40));
              const emails = [...new Set((document.body.innerText.match(/[\\w.+-]+@[\\w-]+\\.[\\w.-]{2,}/g) || []))];
              return JSON.stringify({ url: location.href, links, buttons, emails, textLen: document.body.innerText.length });
            })()`,
          })
        ).result.value,
      );

    let p = await probe();
    const atsInLinks = p.links.filter((l) => ATS.test(l.href));
    let target = atsInLinks[0]?.href || null;

    // kalau belum ketemu, klik kandidat tombol Apply lalu cek URL baru
    if (!target) {
      const before = p.url;
      await s.send("Runtime.evaluate", {
        expression: `(() => {
          const el = [...document.querySelectorAll('a, button')].find((x) => /^apply/i.test((x.innerText || x.value || '').trim()));
          if (el) { el.scrollIntoView({ block: 'center' }); el.click(); return true; }
          return false;
        })()`,
      });
      await new Promise((r) => setTimeout(r, 3500));
      p = await probe();
      const atsAfter = p.links.filter((l) => ATS.test(l.href));
      target = atsAfter[0]?.href || (p.url !== before && !AGGREGATOR.test(p.url) ? p.url : null);
    }

    const emails = [...new Set([...(job.text || "").match(EMAIL_RE) || [], ...p.emails])].filter(
      (e) => !/example\.|sentry|noreply|no-reply|\.png|\.jpg/i.test(e),
    );
    const loginWall = target ? LOGIN.test(target) : LOGIN.test(p.url) && !AGGREGATOR.test(p.url);

    let status = "aggregator-only";
    if (target && ATS.test(target)) status = loginWall ? "login-required" : "direct-ats";
    else if (target) status = loginWall ? "login-required" : "direct-ats";
    else if (emails.length) status = "email";

    out.push({
      id: job.id, title: job.title, company: job.company, score: job.score, source: job.source,
      listing: job.url, applyUrl: target, status, emails: emails.slice(0, 3), resolvedAt: new Date().toISOString(),
    });
    console.log(`${String(job.score).padStart(3)} | ${status.padEnd(15)} | ${job.title.slice(0, 46).padEnd(46)} | ${target || emails[0] || "-"}`);
  } catch (err) {
    out.push({ id: job.id, title: job.title, company: job.company, listing: job.url, status: "error", error: err.message });
    console.log(`ERR | ${job.title}: ${err.message}`);
  } finally {
    s.ws.close();
    await fetch(`http://127.0.0.1:${DEBUG}/json/close/${s.id}`).catch(() => {});
  }
}

chrome.kill();
mkdirSync(DIR, { recursive: true });
writeFileSync(join(DIR, "apply-resolved.json"), JSON.stringify({ generatedAt: new Date().toISOString(), results: out }, null, 2));
const byStatus = out.reduce((acc, r) => ({ ...acc, [r.status]: (acc[r.status] || 0) + 1 }), {});
console.log("\nRingkasan:", JSON.stringify(byStatus));
console.log(`Output: ${join(DIR, "apply-resolved.json")}`);
