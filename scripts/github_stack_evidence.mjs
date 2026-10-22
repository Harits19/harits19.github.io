#!/usr/bin/env node
/**
 * github_stack_evidence.mjs — ubah github_stack_report.json menjadi tabel bukti
 * siap dipakai untuk menyusun isi CV.
 *
 * Pakai:
 *   node scripts/github_stack_evidence.mjs --in .hermes/analysis/github_stack_report.json --out .hermes/analysis
 *
 * Output:
 *   evidence_repos.md  — repo bukti per tier + matriks stack + sinyal kepemimpinan
 *   evidence_stack.json — versi mesin (dipakai Fase 2: matriks gap)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const argv = process.argv.slice(2);
const opt = {};
for (let i = 0; i < argv.length; i++) {
  if (!argv[i].startsWith("--")) continue;
  opt[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true;
}
const IN = opt.in || ".hermes/analysis/github_stack_report.json";
const OUT = opt.out || ".hermes/analysis";
const report = JSON.parse(readFileSync(IN, "utf8"));

// ---------- peta dependency → label teknologi yang layak ditulis di CV ----------
const CANON = [
  [/^next$/, "Next.js", "Frontend"],
  [/^react$|^react-dom$/, "React", "Frontend"],
  [/^react-native$/, "React Native", "Mobile"],
  [/^vue$|^nuxt/, "Vue/Nuxt", "Frontend"],
  [/quasar/, "Quasar", "Frontend"],
  [/^tailwindcss$|tailwind/, "Tailwind CSS", "Frontend"],
  [/^antd$|^@ant-design\//, "Ant Design", "Frontend"],
  [/^@emotion\//, "Emotion", "Frontend"],
  [/^@mui\//, "Material UI", "Frontend"],
  [/^styled-components$/, "styled-components", "Frontend"],
  [/^framer-motion$|^motion$/, "Motion (Framer Motion)", "Frontend"],
  [/^@monaco-editor\//, "Monaco Editor", "Frontend"],
  [/^react-hook-form$/, "React Hook Form", "Frontend"],
  [/^socket\.io(-client)?$/, "Socket.IO", "Realtime"],
  [/^ws$/, "WebSocket", "Realtime"],
  [/asterisk-ami-client/, "Asterisk AMI (SIP/VoIP)", "Realtime"],
  [/mqtt/, "MQTT", "Realtime"],
  [/^express$/, "Express.js", "Backend"],
  [/^@nestjs\//, "NestJS", "Backend"],
  [/^fastify$|^@fastify\//, "Fastify", "Backend"],
  [/^amqplib$|^amqp-connection-manager$/, "RabbitMQ (AMQP)", "Messaging"],
  [/^kafkajs$/, "Kafka", "Messaging"],
  [/^@google-cloud\/pubsub$/, "Google Pub/Sub", "Messaging"],
  [/^etcd3$|^etcd/, "etcd (service discovery)", "Messaging"],
  [/^@google-cloud\/bigquery$|^google-cloud-bigquery$/, "BigQuery", "Data"],
  [/^apache-airflow$/, "Apache Airflow", "Data"],
  [/^@google-cloud\/storage$|^google-cloud-storage$/, "GCS", "Cloud"],
  [/^minio$/, "MinIO (S3)", "Cloud"],
  [/^mongoose$/, "Mongoose (MongoDB)", "Database"],
  [/^mongodb$/, "MongoDB", "Database"],
  [/^pg$|^psycopg2/, "PostgreSQL", "Database"],
  [/^mysql2?$/, "MySQL", "Database"],
  [/^redis$|^ioredis$|go-redis/, "Redis", "Database"],
  [/^@prisma\/client$|^prisma$/, "Prisma", "Database"],
  [/^typeorm$/, "TypeORM", "Database"],
  [/^swagger-ui-express$|^@nestjs\/swagger$/, "OpenAPI/Swagger", "API"],
  [/^zod$/, "Zod", "API"],
  [/^jsonwebtoken$/, "JWT Auth", "Auth"],
  [/^bcrypt$/, "bcrypt", "Auth"],
  [/^google-sign-in$|^google_sign_in$/, "Google Sign-In", "Auth"],
  [/^passport/, "Passport", "Auth"],
  [/^jest$|^ts-jest$|^@types\/jest$/, "Jest", "Testing"],
  [/^vitest$|^@vitest\//, "Vitest", "Testing"],
  [/^cypress$/, "Cypress", "Testing"],
  [/playwright/, "Playwright", "Testing"],
  [/^@storybook\/|^storybook$/, "Storybook", "Testing"],
  [/^@testing-library\//, "Testing Library", "Testing"],
  [/^sinon$/, "Sinon", "Testing"],
  [/^chai$/, "Chai", "Testing"],
  [/^eslint$|^@typescript-eslint\/|^typescript-eslint$|^eslint-/, "ESLint", "Dev Tools"],
  [/^prettier$/, "Prettier", "Dev Tools"],
  [/^typescript$/, "TypeScript", "Language"],
  [/^tsx$|^ts-node/, "ts-node/tsx", "Dev Tools"],
  [/^bun-types$|^@types\/bun$|^oven\/bun/, "Bun", "Dev Tools"],
  [/^vite$|^@vitejs\//, "Vite", "Dev Tools"],
  [/^@reduxjs\/toolkit$|^redux$|^react-redux$/, "Redux Toolkit", "State Mgmt"],
  [/^@tanstack\//, "TanStack Query/Table", "State Mgmt"],
  [/^swr$/, "SWR", "State Mgmt"],
  [/^zustand$/, "Zustand", "State Mgmt"],
  [/^flutter_bloc$|^bloc$/, "Bloc", "State Mgmt"],
  [/^riverpod$|^flutter_riverpod$/, "Riverpod", "State Mgmt"],
  [/^provider$/, "Provider", "State Mgmt"],
  [/^shared_preferences$/, "SharedPreferences", "Mobile"],
  [/^flutter_local_notifications$/, "Local Notifications", "Mobile"],
  [/^firebase/, "Firebase", "Cloud"],
  [/^@strapi\/|^strapi$/, "Strapi CMS", "Frontend"],
  [/^@modelcontextprotocol\/sdk$/, "MCP SDK", "AI"],
  [/^openai$|^@ai-sdk\/openai$/, "OpenAI API", "AI"],
  [/^@anthropic-ai\/sdk$/, "Anthropic API", "AI"],
  [/^ollama$/, "Ollama", "AI"],
  [/^google-genai$|^@google\/generative-ai$/, "Google GenAI", "AI"],
  [/^fluent-ffmpeg$|ffmpeg/, "FFmpeg", "Media"],
  [/^pdfplumber$|^pdfminer\.six$|^pypdfium2$/, "PDF extraction", "Media"],
  [/^node-telegram-bot-api$/, "Telegram Bot API", "Integration"],
  [/^googleapis$|^googleapis_auth$/, "Google APIs", "Integration"],
  [/^@google-cloud\/logging/, "Cloud Logging", "Cloud"],
  [/^winston$/, "Winston", "Observability"],
  [/^moment$|^date-fns$|^dayjs$|^intl$/, "Date/Intl", "Frontend"],
  [/^lodash/, "Lodash", "Frontend"],
  [/^axios$|^http$/, "HTTP client", "Integration"],
  [/^xendit|^midtrans|^stripe/, "Payment gateway", "Integration"],
];
function canonicalize(dep) {
  for (const [re, label, cat] of CANON) if (re.test(dep)) return { label, cat };
  return null;
}

const INFRA_LABEL = (k) => {
  if (k.startsWith("docker-base:")) return "Docker";
  if (k === "docker-multistage") return "Docker multi-stage build";
  if (k === "docker-compose") return "Docker Compose";
  if (k.startsWith("compose-service:")) {
    const svc = k.split(":")[1] || "";
    // buang key non-service (volume/nama data/config) agar matriks tidak berisik
    if (/(_data$|_config$|^volumes$|^depends_on$|^networks$|^googlecloud$|^env)/.test(svc)) return null;
    return { label: "Compose service: " + svc, cat: "Infra service" };
  }
  if (k.startsWith("terraform:")) return { label: "Terraform (IaC)", cat: "IaC" };
  if (k.startsWith("tf-provider:")) return { label: "Terraform provider: " + k.split(":")[1], cat: "IaC" };
  return k;
};

// ---------- tiering ----------
function tier(r) {
  // fork berukuran besar dengan kontribusi tipis = fork + tweak, bukan karya
  if (r.category === "authored" && r.totalCommits > 300 && (r.activityShare || 0) < 0.2) return "D";
  if (r.category === "authored" && r.commitsByAuthor >= 5) return "A";
  if (r.category === "org-internal" && r.commitsByAuthor >= 3) return "B";
  if (r.category === "external-contrib" && r.commitsByAuthor >= 3) return "C";
  return "D";
}

const repos = report.localRepos.map((r) => ({ ...r, tier: tier(r) }));
const usable = repos.filter((r) => r.tier !== "D");

// ---------- matriks stack ----------
const stackMap = new Map(); // label → { cat, repos:Set, tierMin, custom }
function add(label, cat, repo, isCustom = false) {
  const cur = stackMap.get(label) || { label, cat, repos: [], best: "D", custom: isCustom };
  if (!cur.repos.includes(repo.name)) cur.repos.push(repo.name);
  const order = { A: 0, B: 1, C: 2, D: 3 };
  if (order[repo.tier] < order[cur.best]) cur.best = repo.tier;
  stackMap.set(label, cur);
}
for (const r of usable) {
  for (const d of r.deps) {
    const c = canonicalize(d);
    if (c) add(c.label, c.cat, r);
  }
  // label tingkat ekosistem (manifest = bukti bahasa/framework yang dipakai)
  for (const m of r.manifests) {
    if (/go\.mod$/.test(m)) add("Go", "Language", r);
    if (/pubspec\.yaml$/.test(m)) add("Flutter (Dart)", "Mobile", r);
    if (/(requirements\.txt|pyproject\.toml)$/.test(m)) add("Python", "Language", r);
    if (/package\.json$/.test(m)) add("Node.js", "Runtime", r);
    if (/\.gradle$/.test(m)) add("Android/Gradle", "Mobile", r);
    if (/pom\.xml$/.test(m)) add("Java/Maven", "Language", r);
  }
  if (r.deps.includes("typescript")) add("TypeScript", "Language", r);
  for (const k of r.infra) {
    const v = INFRA_LABEL(k);
    if (v === null) continue;
    if (typeof v === "string") add(v, "Infra", r);
    else add(v.label, v.cat, r);
  }
  if (r.ci.length) add("GitHub Actions (CI/CD)", "DevOps", r);
}

const stackRows = [...stackMap.values()]
  .map((s) => ({ ...s, count: s.repos.length }))
  // label per nama service infra terlalu granular untuk CV → direkap sebagai metrik
  .filter((s) => s.count >= 1 && s.cat !== "Infra service")
  .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

// ---------- metrik bersumber bukti (Opsi B) ----------
const composeRepos = usable.filter((r) => r.infra.includes("docker-compose"));
const composeServices = new Set();
for (const r of composeRepos)
  for (const i of r.infra) {
    if (!i.startsWith("compose-service:")) continue;
    const svc = i.split(":")[1];
    if (/(_data$|_config$|^volumes$|^depends_on$|^networks$|^googlecloud$|^env)/.test(svc)) continue;
    composeServices.add(`${r.name}/${svc}`);
  }
const openapiPaths = usable.reduce((s, r) => s + (r.openapi || []).reduce((x, o) => x + (o.paths || 0), 0), 0);
const orgRepos = usable.filter((r) => r.category === "org-internal");
const firstOrg = orgRepos.map((r) => r.repoFirstCommit).filter(Boolean).sort()[0];
const lastOrg = orgRepos.map((r) => r.lastCommitByAuthor).filter(Boolean).sort().slice(-1)[0];
const ciFiles = new Set(usable.flatMap((r) => r.ci.map((f) => `${r.name}/${f}`)));

const metrics = {
  reposWithMyCommits: report.localRepos.filter((r) => r.commitsByAuthor > 0).length,
  myCommitsTotal: report.summary.myCommitsTotal,
  tierA: repos.filter((r) => r.tier === "A").length,
  tierB: repos.filter((r) => r.tier === "B").length,
  orgServicesContributed: orgRepos.length,
  composeProjects: composeRepos.length,
  composeServicesDefined: composeServices.size,
  ciWorkflowFilesInTouchedRepos: ciFiles.size,
  declaredApiPaths: openapiPaths,
  orgContributionSpan: { first: firstOrg || null, last: lastOrg || null },
  serviceInventoryFromBackup: report.serviceInventory["~/mongo_backup"]?.length || 0,
  cloudTargets: [...new Set(usable.flatMap((r) => r.infra.filter((i) => i.startsWith("tf-provider:")).map((i) => i.split(":")[1])))],
};

// ---------- sinyal kepemimpinan / ownership ----------
const leadership = usable
  .filter((r) => (r.activityShare || 0) >= 0.4 || /specs|template|flow-generic|broadcast|middleware|cms|sip-gateway|cdp-docker/.test(r.name))
  .sort((a, b) => (b.activityShare || 0) - (a.activityShare || 0))
  .map((r) => ({
    repo: r.name,
    tier: r.tier,
    commits: r.commitsByAuthor,
    share: Math.round((r.activityShare || 0) * 100),
    span: `${r.repoFirstCommit || "?"} → ${r.repoLastCommit || "?"}`,
    ci: r.ci.length,
    note: (r.activityShare || 0) >= 0.5 ? "kontributor dominan repo" : "kontributor signifikan",
  }));

// ---------- tulis markdown ----------
const md = [];
md.push("# Bukti Repo untuk Isi CV\n");
md.push(`Dibuat: ${new Date().toISOString()}\n`);
md.push("Tier: **A** = repo pribadi dengan kontribusi nyata · **B** = repo organisasi tempat user berkontribusi · **C** = kontribusi ke repo pihak ketiga · **D** = TIDAK dipakai sebagai bukti (fork/referensi/read-only).\n");

md.push("## Repo bukti (Tier A–C)\n");
md.push("| Repo | Tier | Kategori | Commit user/total (porsi) | Rentang repo | Teknologi kunci | Infra | CI |");
md.push("|---|---|---|---|---|---|---|---|");
for (const r of usable.sort((a, b) => a.tier.localeCompare(b.tier) || b.commitsByAuthor - a.commitsByAuthor)) {
  const keyStack = [...new Set(r.deps.map((d) => canonicalize(d)?.label).filter(Boolean))].slice(0, 7).join(", ");
  const infra = [...new Set(r.infra.map((i) => INFRA_LABEL(i)).filter(Boolean).map((v) => (typeof v === "string" ? v : v.label)))].slice(0, 5).join(", ");
  md.push(`| ${r.name} | ${r.tier} | ${r.category} | ${r.commitsByAuthor}/${r.totalCommits} (${Math.round((r.activityShare || 0) * 100)}%) | ${r.repoFirstCommit || "?"} → ${r.repoLastCommit || "?"} | ${keyStack || "-"} | ${infra || "-"} | ${r.ci.length} |`);
}

md.push("\n## Matriks stack (label CV ↔ repo bukti)\n");
md.push("| Label | Kategori CV | Tier terbaik | Jumlah repo | Contoh repo |");
md.push("|---|---|---|---|---|");
for (const s of stackRows) md.push(`| ${s.label} | ${s.cat} | ${s.best} | ${s.count} | ${s.repos.slice(0, 4).join(", ")}${s.repos.length > 4 ? "…" : ""} |`);

md.push("\n## Metrik bersumber bukti (aman dipakai di bullet CV)\n");
md.push("```json");
md.push(JSON.stringify(metrics, null, 2));
md.push("```");

md.push("\n## Sinyal ownership / kepemimpinan teknis\n");
md.push("| Repo | Tier | Commit | Porsi repo | Rentang | CI | Catatan |");
md.push("|---|---|---|---|---|---|---|");
for (const l of leadership) md.push(`| ${l.repo} | ${l.tier} | ${l.commits} | ${l.share}% | ${l.span} | ${l.ci} | ${l.note} |`);

md.push("\n## Dikecualikan dari bukti (Tier D)\n");
for (const r of repos.filter((x) => x.tier === "D")) md.push(`- ${r.name} — ${r.category}, commit user ${r.commitsByAuthor}, ${r.origin || "tanpa remote"}`);

writeFileSync(join(OUT, "evidence_repos.md"), md.join("\n"));
writeFileSync(
  join(OUT, "evidence_stack.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), metrics, stack: stackRows, repos: usable, excluded: repos.filter((r) => r.tier === "D").map((r) => r.name) }, null, 2),
);
console.log(JSON.stringify(metrics, null, 2));
console.log(`\nlabel stack: ${stackRows.length}`);
console.log(`output: ${join(OUT, "evidence_repos.md")}, ${join(OUT, "evidence_stack.json")}`);
