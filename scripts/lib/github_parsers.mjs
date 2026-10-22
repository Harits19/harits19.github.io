/**
 * github_parsers.mjs — parser manifest + pemetaan teknologi (dipakai bersama
 * oleh github_stack_scan.mjs, github_stack_evidence.mjs, dan github_api_scan.mjs).
 */

/** Nama file manifest yang dikenali. */
export const MANIFEST_NAMES = new Set([
  "package.json",
  "go.mod",
  "pubspec.yaml",
  "requirements.txt",
  "pyproject.toml",
  "composer.json",
  "Gemfile",
  "Cargo.toml",
  "pom.xml",
  "build.gradle",
  "mix.exs",
]);

/** File konfigurasi/infra yang dikenali. */
export const CONFIG_RE =
  /^(Dockerfile.*|docker-compose.*\.ya?ml|.*\.tf|.*\.tfvars|Makefile|vercel\.json|firebase\.json|openapi.*\.(ya?ml|json)|swagger.*\.(ya?ml|json)|(spec|api)[^/]*\.(ya?ml|json))$/i;

/** Pola nama file yang TIDAK boleh dibaca (kredensial & data sensitif). */
export const SECRET_RE =
  /(\.pem$|\.key$|\.p12$|\.crt$|\.p8$|id_rsa|^\.env$|^\.env\.(?!example)|credential|secret|\.xlsm$)/i;

const lines = (s) => s.split("\n").map((x) => x.trim()).filter(Boolean);

export function parseNpm(body) {
  const j = JSON.parse(body);
  return [...Object.keys(j.dependencies || {}), ...Object.keys(j.devDependencies || {})];
}
export function parseGo(body) {
  const deps = new Set();
  let inBlock = false;
  for (const raw of body.split("\n")) {
    const line = raw.split("//")[0];
    if (/^\s*require\s*\(/.test(line)) {
      inBlock = true;
      continue;
    }
    if (inBlock && /^\s*\)/.test(line)) {
      inBlock = false;
      continue;
    }
    const single = line.match(/^\s*require\s+(\S+)/);
    if (single) deps.add(single[1]);
    if (inBlock) {
      const m = line.match(/^\s+([a-z0-9.\-]+\.[a-z]{2,}\/\S+)/i);
      if (m) deps.add(m[1]);
    }
  }
  return [...deps];
}
export function parsePubspec(body) {
  const deps = new Set();
  let section = "";
  for (const raw of body.split("\n")) {
    if (/^\S/.test(raw)) {
      section = raw.split(":")[0];
      continue;
    }
    if (!/^(dependencies|dev_dependencies)/.test(section)) continue;
    const m = raw.match(/^ {2}([a-z0-9_]+):/i);
    if (m) deps.add(m[1]);
  }
  return [...deps];
}
export function parseRequirements(body) {
  return body
    .split("\n")
    .map((l) => l.split(/[=<>!;\[]/)[0].trim())
    .filter((l) => l && !l.startsWith("#"));
}
export function parseComposer(body) {
  const j = JSON.parse(body);
  return [...Object.keys(j.require || {}), ...Object.keys(j["require-dev"] || {})];
}
export function parseGradle(body) {
  return lines(body)
    .map((l) => (l.match(/^(?:implementation|api|compileOnly|testImplementation)\s*[("']([^"')]+)/) || [])[1])
    .filter(Boolean);
}

/** Parser per nama manifest. */
export const PARSERS = {
  "package.json": parseNpm,
  "go.mod": parseGo,
  "pubspec.yaml": parsePubspec,
  "requirements.txt": parseRequirements,
  "pyproject.toml": (b) =>
    lines(b)
      .filter((l) => /^[a-z0-9_.\-]+\s*[>=~<]/.test(l))
      .map((l) => l.split(/[>=~<]/)[0].trim()),
  "composer.json": parseComposer,
  Gemfile: (b) => lines(b).map((l) => (l.match(/^gem\s+["']([^"']+)/) || [])[1]).filter(Boolean),
  "Cargo.toml": (b) =>
    lines(b)
      .filter((l) => /^[a-z0-9_-]+\s*=/.test(l) && !/^(name|version|edition|authors|description)/.test(l))
      .map((l) => l.split("=")[0].trim()),
  "pom.xml": (b) => [...b.matchAll(/<artifactId>([^<]+)<\/artifactId>/g)].map((m) => m[1]).slice(1),
  "build.gradle": parseGradle,
};

/** Label teknologi yang layak ditulis di CV — [regex dependency, label, kategori]. */
export const CANON = [
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
  [/^elysia$|^@elysiajs\//, "Elysia", "Backend"],
  [/^fastify$|^@fastify\//, "Fastify", "Backend"],
  [/^gin-gonic\/gin$/, "Gin", "Backend"],
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
  [/^bun-types$|^@types\/bun$/, "Bun", "Dev Tools"],
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
  [/^axios$|^http$/, "HTTP client", "Integration"],
  [/^xendit|^midtrans|^stripe/, "Payment gateway", "Integration"],
];

export function canonicalize(dep) {
  for (const [re, label, cat] of CANON) if (re.test(dep)) return { label, cat };
  return null;
}

/** Terjemahkan kunci infra mentah hasil scan menjadi label. */
export function infraLabel(k) {
  if (k.startsWith("docker-base:")) return "Docker";
  if (k === "docker-multistage") return "Docker multi-stage build";
  if (k === "docker-compose") return "Docker Compose";
  if (k.startsWith("compose-service:")) {
    const svc = k.split(":")[1] || "";
    if (/(_data$|_config$|^volumes$|^depends_on$|^networks$|^googlecloud$|^env)/.test(svc)) return null;
    return { label: "Compose service: " + svc, cat: "Infra service" };
  }
  if (k.startsWith("terraform:")) return { label: "Terraform (IaC)", cat: "IaC" };
  if (k.startsWith("tf-provider:")) return { label: "Terraform provider: " + k.split(":")[1], cat: "IaC" };
  return k;
}

/** Deteksi sinyal infra dari isi file Dockerfile/compose/terraform/openapi. */
export function detectInfra(name, body, infra = new Set(), openapi = [], rel = name) {
  if (/^Dockerfile/i.test(name)) {
    const from = body.match(/^FROM\s+(\S+)/im);
    infra.add(from ? `docker-base:${from[1]}` : "docker");
    if (/multi-stage|AS\s+\w+/i.test(body)) infra.add("docker-multistage");
  }
  if (/^docker-compose.*\.ya?ml$/i.test(name)) {
    infra.add("docker-compose");
    for (const m of body.matchAll(/^\s{2}([a-z0-9_.-]+):\s*$/gim)) infra.add(`compose-service:${m[1]}`);
  }
  if (/\.tf$/i.test(name)) {
    for (const m of body.matchAll(/^resource\s+"([^"]+)"/gim)) infra.add(`terraform:${m[1]}`);
    for (const m of body.matchAll(/^provider\s+"([^"]+)"/gim)) infra.add(`tf-provider:${m[1]}`);
  }
  const isSpecName = /(openapi|swagger)/i.test(name);
  const looksSpecBody = /^\s*(openapi|swagger)\s*:/im.test(body) || /^\s*paths\s*:/im.test(body);
  if (isSpecName || looksSpecBody) {
    const paths = (body.match(/^ {2}"?\/[^":]+"?:/gm) || []).length;
    openapi.push({ rel, paths });
  }
  return infra;
}
