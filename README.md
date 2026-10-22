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

## Job Search Tooling

Remote job hunting pipeline, backed by the same evidence as the CV:

```bash
# 1. fetch + score remote jobs (8 public job APIs/RSS) → .hermes/jobs/
node scripts/jobs/scan_jobs.mjs --min-score 20 --top 20

# 2. build an application package for one job (cover letter EN/ID, screening
#    answers, checklist)
node scripts/jobs/new_application.mjs --index 1

# 3. assisted apply for platforms that forbid automation (LinkedIn, JobStreet,
#    Glints, Glassdoor): prepares docs, copies them, opens the page — you submit
node scripts/jobs/assist_apply.mjs --index 1 --copy --open
node scripts/jobs/assist_apply.mjs --url "https://www.linkedin.com/jobs/view/…" --company "PT X" --title "Backend Engineer" --copy

# 4. ready-to-click search URLs for those platforms (no scraping)
node scripts/jobs/search_links.mjs      # → .hermes/jobs/search-links.md

# 5. auto-fill ATS forms (Greenhouse/Lever/Ashby/Workable/Recruitee):
#    fills fields + uploads the CV, then STOPS before the submit button
node scripts/jobs/auto_apply.mjs --index 1
node scripts/jobs/auto_apply.mjs --index 1 --confirm submit   # explicit per-application submit
node scripts/jobs/auto_apply.mjs --url "https://jobs.lever.co/…" --title "…" --company "…"
# email-based applications: writes an .eml draft + mailto, never sends mail
node scripts/jobs/auto_apply.mjs --index 2 --email

# 6. track applications (found → drafted → applied → replied → interview …)
node scripts/jobs/track.mjs --id "<jobId>" --status applied
node scripts/jobs/track.mjs --report
```

Guardrails in `auto_apply.mjs`: refuses LinkedIn/JobStreet/Glints/Glassdoor
domains, never stores credentials, caps at 5 submissions per day, takes
before/after screenshots as evidence, and logs every action to
`.hermes/jobs/actions.log`. Regression fixture (a mock ATS form) lives in
`scripts/jobs/__fixtures__/ats-mock.html`.

Filters: remote-only, timezone compatible with WIB, engineering roles only,
salary floor IDR 12M net/month, role priority full-stack → frontend → Node.js →
React/Next → Flutter → React Native → Go. Sources that forbid automation
(LinkedIn, JobStreet/SEEK, Glints, Glassdoor) are never scraped — applications
there are prepared but submitted by hand.

## CV PDF

```bash
npm run build
node scripts/make_cv_pdf.mjs          # → public/cv-en.pdf + public/cv-id.pdf
```

Renders the printable CV section through headless Chrome (CDP): it disables
autoplay, fires the `portfolio:skip-animation` event so the typewriter animation
finishes instantly, then prints only `#print-area`. Two pages per locale.

## Contact

- Email: harits.abdullah19@gmail.com
- WhatsApp: https://wa.me/6283840493135
- LinkedIn: https://linkedin.com/in/abd-harits
- GitHub: https://github.com/Harits19
