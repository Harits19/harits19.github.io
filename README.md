# Abdullah Harits — Portfolio & CV

Full-stack software engineer with 5+ years of experience across web, mobile, and
event-driven backends (TypeScript/Node.js, Go, Dart/Flutter). I own and operate
production services in a multi-tenant chatbot platform: containerised
microservices, RabbitMQ/Pub-Sub messaging, relational and document storage,
CI/CD pipelines, and Terraform-provisioned cloud infrastructure.

**Live site:** https://harits19.github.io

## Tech Stack

- **Architecture:** Microservices, Event-Driven Architecture, API Gateway (APISIX), Service Discovery (etcd), OpenAPI/REST
- **Backend:** Express.js, Node.js, Go, Python, Zod
- **DevOps & Infra:** Docker (multi-stage), Docker Compose, GitHub Actions CI/CD, Terraform, GCP, Byteplus
- **Messaging & Realtime:** RabbitMQ, Google Pub/Sub, Kafka, Socket.IO/WebSocket, SIP/VoIP (Asterisk), MQTT
- **Frontend:** React.js, Next.js, Tailwind CSS, Ant Design, Redux Toolkit, TanStack Query
- **Mobile:** Flutter, Dart, React Native
- **Database & Storage:** PostgreSQL, MongoDB, Redis, MinIO (S3)
- **Observability:** Prometheus, Grafana, Loki, Thanos, Winston, GCP Cloud Logging
- **Testing:** Jest, Sinon, Chai, Testing Library, Storybook, Playwright
- **Data:** Apache Airflow, BigQuery

## Site Features

- Portfolio-first landing page with six selected projects (each links to a live
  demo or a public repository)
- Print-perfect A4 CV — the "Resume" section prints exactly like a document
  (use the print button or `Ctrl/Cmd + P`)
- Bilingual English / Bahasa Indonesia with locale-based routing (`/en`, `/id`)
- Typewriter animation on the document with reduced-motion support
- Static export, deployed to GitHub Pages

## Project Layout

```
src/app/[locale]/components/   page sections (hero, portfolio, CV view)
src/app/components/            reusable UI (section, list, project card)
src/hooks/use_profile/         all CV data (single source of truth, EN + ID)
src/hooks/use_dict/            UI labels per locale
scripts/                       GitHub evidence tooling (see below)
```

## Evidence Tooling

The CV claims in `src/hooks/use_profile/constant.tsx` are mapped to repository
evidence. Three local scripts keep that mapping honest:

```bash
# 1. inventory local clones + public GitHub repos → stack & commit evidence
node scripts/github_stack_scan.mjs --root ~/Documents --out .hermes/analysis

# 2. turn the report into an evidence table + stack matrix for CV writing
node scripts/github_stack_evidence.mjs --in .hermes/analysis/github_stack_report.json --out .hermes/analysis

# 3. scan GitHub directly (private repos included) — needs a token
node scripts/github_api_scan.mjs --org 1engage,1Engage-DM --out .hermes/analysis
```

Reports land in `.hermes/analysis/` (git-ignored). Sources are local clones, the
public GitHub API, and the authenticated API when a token is available.
Credential files (`*.pem`, `*.key`, `.env`, `*secret*`) are skipped by default and
tokens are never printed.

### GitHub token (for private repos)

The API scanner resolves a token in this order: `GITHUB_TOKEN` / `GH_TOKEN` env
var → `~/.config/harits/github_token` → `gh` CLI credentials
(`~/.config/gh/hosts.yml`). Keep the token file private:

```bash
mkdir -p ~/.config/harits
printf '%s' '<token>' > ~/.config/harits/github_token
chmod 600 ~/.config/harits/github_token
```

Required read-only scopes: `Contents`, `Metadata`, `Pull requests`, `Issues`
(fine-grained) or `repo` + `read:org` (classic). Smoke test:

```bash
node scripts/github_api_scan.mjs --limit 1   # prints login, scopes, rate limit
```

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3002
```

## Build & Deploy

```bash
npm run lint
npm run build      # static export to ./out
npm run deploy     # publish to GitHub Pages
```

## Contact

- Email: harits.abdullah19@gmail.com
- WhatsApp: https://wa.me/6283840493135
- LinkedIn: https://linkedin.com/in/abd-harits
- GitHub: https://github.com/Harits19
