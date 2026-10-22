/**
 * github_token.mjs — ambil token GitHub tanpa pernah mencetaknya.
 *
 * Urutan sumber:
 *   1. variabel lingkungan GITHUB_TOKEN / GH_TOKEN
 *   2. file token (default: ~/.config/harits/github_token)
 *   3. kredensial gh CLI (~/.config/gh/hosts.yml) bila gh sudah login
 *
 * Token hanya dikembalikan sebagai string; jangan pernah di-log.
 */
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { homedir } from "node:os";

export const DEFAULT_TOKEN_FILE = join(homedir(), ".config", "harits", "github_token");

export function resolveToken({ tokenFile, quiet = false } = {}) {
  const fromEnv = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
  if (fromEnv) return fromEnv.trim();

  const path = (tokenFile || DEFAULT_TOKEN_FILE).replace(/^~/, homedir());
  if (existsSync(path)) {
    try {
      const raw = readFileSync(path, "utf8").trim();
      // dukung format "GITHUB_TOKEN=xxx" maupun file berisi token saja
      const value = raw.startsWith("GITHUB_TOKEN=") ? raw.split("=").slice(1).join("=").trim() : raw;
      if (value) return value;
    } catch {
      /* lanjut ke gh cli */
    }
  }

  const hosts = join(homedir(), ".config", "gh", "hosts.yml");
  if (existsSync(hosts)) {
    try {
      const m = readFileSync(hosts, "utf8").match(/oauth_token:\s*(\S+)/);
      if (m) return m[1];
    } catch {
      /* lanjut ke gh CLI */
    }
  }

  // gh menyimpan token di keyring (bukan di hosts.yml) → tanya langsung ke gh.
  try {
    const fromCli = execFileSync("gh", ["auth", "token", "--hostname", "github.com"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (fromCli) return fromCli;
  } catch {
    /* gh tidak ada / belum login */
  }

  if (!quiet) {
    console.warn(
      `[token] tidak ditemukan — jalankan tanpa token (hanya repo publik, rate limit 60/jam).\n` +
        `        sumber yang dicek: GITHUB_TOKEN/GH_TOKEN, ${path}, ${hosts}`,
    );
  }
  return "";
}

/** Header Authorization bila token tersedia. */
export function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" } : { Accept: "application/vnd.github+json" };
}

/** Cek token: kembalikan info user atau null. */
export async function verifyToken(token) {
  if (!token) return null;
  const res = await fetch("https://api.github.com/user", { headers: authHeaders(token) });
  if (!res.ok) return { error: `HTTP ${res.status}` };
  const u = await res.json();
  const scopes = res.headers.get("x-oauth-scopes") || "";
  const limit = res.headers.get("x-ratelimit-limit");
  return { login: u.login, name: u.name, scopes, rateLimit: limit };
}
