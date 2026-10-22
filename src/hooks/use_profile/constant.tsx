const email = "harits.abdullah19@gmail.com";
const phoneNumber = "6283840493135";
const linkedIn = "linkedin.com/in/abd-harits";
const portfolio = "harits19.github.io";
const github = "github.com/Harits19";
const mailto = `mailto:${email}`;
export function generateLink(link: string) {
  return `https://${link}`;
}
// Setiap klaim di bawah dipetakan ke bukti repo di .hermes/analysis/evidence_repos.md.
// Angka yang dipakai hanya yang bisa dibuktikan dari repo (jumlah commit, service, workflow, path API).
const en = {
  name: "ABDULLAH HARITS",
  linkedIn,
  github,
  mailto,
  whatsapp: `https://wa.me/${phoneNumber}`,
  details: [
    {
      text: "Jakarta, Indonesia",
      link: undefined,
    },
    {
      text: email,
      link: mailto,
    },
    {
      text: phoneNumber,
      link: `https://wa.me/${phoneNumber}`,
    },
    {
      text: linkedIn,
      link: generateLink(linkedIn),
    },
    {
      text: portfolio,
      link: generateLink(portfolio),
    },
    {
      text: github,
      link: generateLink(github),
    },
  ],
  about_me:
    "Full-stack Software Engineer with over five years of experience across web, mobile, and event-driven backends (TypeScript/Node.js, Go, Dart/Flutter). Owner of production services in a multi-tenant chatbot platform: 19 repositories contributed to, containerised microservices on Docker and Docker Compose (130 services across 16 projects), RabbitMQ and Google Pub/Sub messaging, PostgreSQL/Redis/MongoDB storage, GitHub Actions CI/CD (66 workflow files), and Terraform-provisioned GCP and Byteplus infrastructure. Comfortable across the stack — React/Next.js frontends, Flutter apps, and API design with OpenAPI — used to code review, service ownership, and production incident response.",
  experience: [
    {
      company: "PT Integra Putra Mandiri",
      location: "Jakarta, Indonesia",
      employment_type: "Permanent",
      position:
        "Software Engineer – Full-stack Developer (owner: CMS; contributor: broadcast, middleware, chatbot flow engine)",
      start_date: "Mar 2025",
      end_date: "Present",
      responsibilities: [
        "Own the platform CMS frontend (Next.js App Router, Tailwind CSS, Motion) — 147 of 182 commits on the repository (81%), including design system components and release workflows.",
        "Integrated Meta Catalog into the chatbot platform and enabled Catalog Messages plus conversion events through the Meta Cloud API.",
        "Extended the event-driven broadcast engine (RabbitMQ, etcd service discovery, object storage) — 7 GitHub Actions workflows covering code quality, Docker builds, and releases.",
        "Authored OpenAPI interface specifications for gateway services (177 declared API paths) as the contract between frontend and backend teams.",
        "Developed a Flutter mini-game for a philanthropy donation app, connecting gameplay with the chatbot flow to lift in-app engagement.",
        "Investigated and resolved production incidents across 19 platform repositories, improving stability and recovery time.",
      ],
    },
    {
      company: "PT Admin Pintar Kita",
      location: "Jakarta, Indonesia",
      employment_type: "Probation",
      position: "Frontend Developer",
      start_date: "Feb 2025",
      end_date: "Feb 2025",
      responsibilities: [
        "Introduced React SWR for API caching and built reusable Next.js components to keep design and logic consistent across pages.",
      ],
    },
    {
      company: "PT Eka Nusantara Gemilang",
      location: "Jakarta, Indonesia",
      employment_type: "Permanent",
      position: "Software Development Specialist – Full-stack Developer",
      start_date: "Aug 2023",
      end_date: "Dec 2024",
      responsibilities: [
        "Designed and implemented event-driven services on Google Pub/Sub with a microservices architecture (RabbitMQ, Redis, PostgreSQL, MongoDB).",
        "Integrated WhatsApp chatbot systems through the Meta Cloud API, handling catalog messages and conversion events.",
        "Built a broadcast engine on Pub/Sub and microservices for scheduled, high-volume campaign delivery.",
        "Led code reviews focused on DRY principles, performance optimisation, and automated testing (Jest, Sinon, Chai).",
      ],
    },
    {
      company: "PT Smartfren Telecom",
      location: "Jakarta, Indonesia",
      employment_type: "Permanent",
      position: "Software Engineer – Mobile, Frontend & Backend Developer",
      start_date: "Jun 2022",
      end_date: "Aug 2023",
      responsibilities: [
        "Developed Flutter mobile sales applications used daily by field sales teams.",
        "Developed the 1ENGAGE mobile app using React Native.",
        "Migrated the 1ENGAGE frontend from Quasar to Next.js and the backend from Go to Express.js to improve maintainability and simplify the toolchain.",
        "Designed a reusable chatbot engine with flexible use case support.",
      ],
    },
    {
      company: "PT Imani Prima",
      location: "Bandung, Indonesia",
      employment_type: "Contract",
      position: "Mobile, Frontend & Backend Developer",
      start_date: "Mar 2022",
      end_date: "May 2022",
      responsibilities: [
        "Developed mobile and web apps using Flutter and managed data models in MongoDB and MySQL.",
        "Integrated MQTT and WebSocket protocols using Go for device communication.",
      ],
    },
    {
      company: "PT Skyshi Digital Indonesia",
      location: "Yogyakarta, Indonesia",
      employment_type: "Contract",
      position: "Mobile, Frontend & Backend Developer",
      start_date: "Feb 2021",
      end_date: "Mar 2022",
      responsibilities: [
        "Delivered mobile apps using Flutter and React Native based on Business Process Documents and UAT feedback.",
        "Integrated applications with REST APIs and Firebase.",
      ],
    },
  ],
  additional_experiences: [
    {
      company: "ChicodeFive",
      location: undefined,
      employment_type: "Side Project",
      position: "Flutter Developer",
      start_date: "May 2023",
      end_date: "Aug 2023",
      responsibilities: [
        "Developed a hotel management application using Flutter with a reusable component library to keep pages consistent.",
      ],
    },
  ],
  education: {
    institution: "Universitas Brawijaya",
    location: "Malang, Indonesia",
    degree: "Bachelor of Computer Science",
    gpa: "Cumulative GPA: 3.66/4.00",
    start_date: "Aug 2017",
    end_date: "Jan 2021",
  },
  skills: [
    {
      title: "Architecture",
      tools: [
        "Microservices",
        "Event-Driven Architecture",
        "API Gateway (APISIX)",
        "Service Discovery (etcd)",
        "OpenAPI/REST",
      ],
    },
    {
      title: "Backend",
      tools: ["Express.js", "Node.js", "Go", "Python", "Zod"],
    },
    {
      title: "DevOps & Infra",
      tools: [
        "Docker (multi-stage)",
        "Docker Compose",
        "GitHub Actions CI/CD",
        "Terraform",
        "Google Cloud Platform",
        "Byteplus",
      ],
    },
    {
      title: "Messaging & Realtime",
      tools: [
        "RabbitMQ",
        "Google Pub/Sub",
        "Kafka",
        "Socket.IO/WebSocket",
        "SIP/VoIP (Asterisk)",
        "MQTT",
      ],
    },
    {
      title: "Frontend",
      tools: [
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "Ant Design",
        "Redux Toolkit",
        "TanStack Query",
      ],
    },
    {
      title: "Mobile",
      tools: ["Flutter", "Dart", "React Native"],
    },
    {
      title: "Database & Storage",
      tools: ["PostgreSQL", "MongoDB", "Redis", "MinIO (S3)"],
    },
    {
      title: "Observability",
      tools: [
        "Prometheus",
        "Grafana",
        "Loki",
        "Thanos",
        "Winston",
        "GCP Cloud Logging",
      ],
    },
    {
      title: "Testing",
      tools: [
        "Jest",
        "Sinon",
        "Chai",
        "Testing Library",
        "Storybook",
        "Playwright",
      ],
    },
    {
      title: "Data",
      tools: ["Apache Airflow", "BigQuery"],
    },
    {
      title: "Tools",
      tools: ["Git/GitHub", "GitLab", "Figma", "JIRA", "Trello", "Slack"],
    },
    {
      title: "Languages",
      tools: ["TypeScript", "Go", "Dart", "Python"],
    },
  ],
  projects: [
    {
      name: "Vet Management System",
      stack: ["Next.js", "Express.js", "MongoDB", "Docker Compose"],
      description:
        "Clinic and cashier system for a veterinary practice: patients, medical records, and unified shop and doctor transactions. 239 of 546 commits; live demo available.",
      link: "https://github.com/Harits19/vet-management-system",
    },
    {
      name: "AI Assistant (Model Context Protocol)",
      stack: ["Bun", "Express.js", "Zod", "Playwright", "MCP SDK"],
      description:
        "Automation assistant built on the Model Context Protocol with browser automation — designed and implemented end to end (sole author).",
      link: "https://github.com/Harits19/anti_rokok",
    },
    {
      name: "Broadcast Engine",
      stack: ["Node.js", "RabbitMQ", "etcd", "Google Cloud Storage"],
      description:
        "Event-driven mass-messaging engine for the chatbot platform: 7 CI/CD workflows covering code quality, Docker builds, and releases.",
      note: "internal — walkthrough on request",
    },
    {
      name: "WhatsApp Chatbot Engine",
      stack: ["Node.js", "Express.js", "Meta Cloud API", "Google Pub/Sub"],
      description:
        "Multi-flow chatbot engine handling catalogue messages and conversion events, with reusable flows shared across several products.",
      note: "internal — walkthrough on request",
    },
    {
      name: "Mobile Suite (Flutter)",
      stack: ["Flutter", "Dart", "FFmpeg", "Google Sign-In"],
      description:
        "Several Flutter apps: personal finance with local notifications, background media backup with FFmpeg, prayer-time and audio-recording apps (65–109 commits each).",
      link: "https://github.com/Harits19/my_money",
    },
    {
      name: "Cloud Infrastructure 4-Tier (Terraform)",
      stack: ["Terraform", "GCP", "Byteplus", "PostgreSQL", "Redis"],
      description:
        "VPC, application and API servers, PostgreSQL and Redis provisioned as code with GCP, Byteplus, and Vault providers — 61 of 62 commits (98%).",
      note: "internal — walkthrough on request",
    },
  ],
  languages: [
    {
      name: "Bahasa Indonesia",
      level: "Native",
    },
    { name: "English", level: "Intermediate" },
  ],
};

const id = {
  ...en,
  name: "ABDULLAH HARITS",

  about_me:
    "Software Engineer Full-stack dengan pengalaman lebih dari lima tahun di aplikasi web, mobile, dan backend berbasis event (TypeScript/Node.js, Go, Dart/Flutter). Pemilik layanan produksi di platform chatbot multi-tenant: berkontribusi pada 19 repository, microservices dalam container (Docker dan Docker Compose, 130 service di 16 proyek), messaging RabbitMQ dan Google Pub/Sub, penyimpanan PostgreSQL/Redis/MongoDB, CI/CD GitHub Actions (66 file workflow), serta infrastruktur GCP dan Byteplus yang diprovisikan lewat Terraform. Nyaman bekerja lintas lapisan — frontend React/Next.js, aplikasi Flutter, dan desain API dengan OpenAPI — serta terbiasa melakukan code review, memiliki layanan, dan menangani insiden produksi.",
  experience: [
    {
      company: "PT Integra Putra Mandiri",
      location: "Jakarta, Indonesia",
      employment_type: "Karyawan Tetap",
      position:
        "Software Engineer – Full-stack Developer (pemilik: CMS; kontributor: broadcast, middleware, flow engine chatbot)",
      start_date: "Mar 2025",
      end_date: "Sekarang",
      responsibilities: [
        "Memiliki frontend CMS platform (Next.js App Router, Tailwind CSS, Motion) — 147 dari 182 commit di repository (81%), termasuk komponen design system dan alur rilis.",
        "Mengintegrasikan Meta Catalog ke platform chatbot serta mengaktifkan Catalog Messages dan event konversi melalui Meta Cloud API.",
        "Mengembangkan engine broadcast berbasis event (RabbitMQ, service discovery etcd, object storage) — 7 workflow GitHub Actions untuk kualitas kode, build Docker, dan rilis.",
        "Menyusun spesifikasi antarmuka OpenAPI untuk layanan gateway (177 path API terdeklarasi) sebagai kontrak antara tim frontend dan backend.",
        "Mengembangkan mini-game Flutter untuk aplikasi donasi filantropi, terhubung dengan alur chatbot untuk meningkatkan engagement di dalam aplikasi.",
        "Menginvestigasi dan menyelesaikan insiden produksi pada 19 repository platform, meningkatkan stabilitas dan waktu pemulihan.",
      ],
    },
    {
      company: "PT Admin Pintar Kita",
      location: "Jakarta, Indonesia",
      employment_type: "Masa Percobaan",
      position: "Frontend Developer",
      start_date: "Feb 2025",
      end_date: "Feb 2025",
      responsibilities: [
        "Menginisiasi React SWR untuk caching API dan membangun komponen Next.js reusable agar desain dan logika konsisten antar halaman.",
      ],
    },
    {
      company: "PT Eka Nusantara Gemilang",
      location: "Jakarta, Indonesia",
      employment_type: "Karyawan Tetap",
      position: "Software Development Specialist – Full-stack Developer",
      start_date: "Agu 2023",
      end_date: "Des 2024",
      responsibilities: [
        "Merancang dan mengimplementasikan layanan berbasis event di Google Pub/Sub dengan arsitektur microservices (RabbitMQ, Redis, PostgreSQL, MongoDB).",
        "Mengintegrasikan sistem chatbot WhatsApp melalui Meta Cloud API, menangani catalog messages dan event konversi.",
        "Mengembangkan engine broadcast berbasis Pub/Sub dan microservices untuk pengiriman kampanye massal terjadwal.",
        "Memimpin code review dengan fokus prinsip DRY, optimasi performa, dan pengujian otomatis (Jest, Sinon, Chai).",
      ],
    },
    {
      company: "PT Smartfren Telecom",
      location: "Jakarta, Indonesia",
      employment_type: "Karyawan Tetap",
      position: "Software Engineer – Mobile, Frontend & Backend Developer",
      start_date: "Jun 2022",
      end_date: "Agu 2023",
      responsibilities: [
        "Mengembangkan aplikasi penjualan mobile berbasis Flutter yang dipakai harian tim penjualan lapangan.",
        "Mengembangkan aplikasi mobile 1ENGAGE menggunakan React Native.",
        "Melakukan migrasi frontend 1ENGAGE dari Quasar ke Next.js dan backend dari Go ke Express.js untuk meningkatkan maintainability dan menyederhanakan toolchain.",
        "Merancang engine chatbot reusable dengan dukungan use case yang fleksibel.",
      ],
    },
    {
      company: "PT Imani Prima",
      location: "Bandung, Indonesia",
      employment_type: "Kontrak",
      position: "Mobile, Frontend & Backend Developer",
      start_date: "Mar 2022",
      end_date: "Mei 2022",
      responsibilities: [
        "Mengembangkan aplikasi mobile dan web dengan Flutter serta mengelola model data di MongoDB dan MySQL.",
        "Mengintegrasikan protokol MQTT dan WebSocket menggunakan Go untuk komunikasi perangkat.",
      ],
    },
    {
      company: "PT Skyshi Digital Indonesia",
      location: "Yogyakarta, Indonesia",
      employment_type: "Kontrak",
      position: "Mobile, Frontend & Backend Developer",
      start_date: "Feb 2021",
      end_date: "Mar 2022",
      responsibilities: [
        "Mengirimkan aplikasi mobile dengan Flutter dan React Native berdasarkan Business Process Document dan feedback UAT.",
        "Mengintegrasikan aplikasi dengan REST API dan Firebase.",
      ],
    },
  ],
  additional_experiences: [
    {
      company: "ChicodeFive",
      employment_type: "Proyek Sampingan",
      location: undefined,
      position: "Flutter Developer",
      start_date: "Mei 2023",
      end_date: "Agu 2023",
      responsibilities: [
        "Mengembangkan aplikasi manajemen hotel dengan Flutter beserta library komponen reusable agar konsisten antar halaman.",
      ],
    },
  ],
  education: {
    institution: "Universitas Brawijaya",
    location: "Malang, Indonesia",
    degree: "Sarjana Ilmu Komputer",
    gpa: "Cumulative GPA: 3.66/4.00",
    start_date: "Aug 2017",
    end_date: "Jan 2021",
  },
  projects: [
    {
      name: "Sistem Manajemen Klinik Hewan",
      stack: ["Next.js", "Express.js", "MongoDB", "Docker Compose"],
      description:
        "Sistem klinik dan kasir untuk praktik dokter hewan: pasien, rekam medis, serta transaksi toko dan dokter dalam satu sistem. 239 dari 546 commit; tersedia demo langsung.",
      link: "https://github.com/Harits19/vet-management-system",
    },
    {
      name: "Asisten AI (Model Context Protocol)",
      stack: ["Bun", "Express.js", "Zod", "Playwright", "MCP SDK"],
      description:
        "Asisten otomasi berbasis Model Context Protocol dengan otomasi browser — dirancang dan diimplementasikan sendiri (penulis tunggal).",
      link: "https://github.com/Harits19/anti_rokok",
    },
    {
      name: "Engine Broadcast",
      stack: ["Node.js", "RabbitMQ", "etcd", "Google Cloud Storage"],
      description:
        "Engine pengiriman massal berbasis event untuk platform chatbot: 7 workflow CI/CD untuk kualitas kode, build Docker, dan rilis.",
      note: "internal — walkthrough saat interview",
    },
    {
      name: "Engine Chatbot WhatsApp",
      stack: ["Node.js", "Express.js", "Meta Cloud API", "Google Pub/Sub"],
      description:
        "Engine chatbot multi-alur yang menangani catalog messages dan event konversi, dengan alur reusable yang dipakai beberapa produk.",
      note: "internal — walkthrough saat interview",
    },
    {
      name: "Rangkaian Aplikasi Mobile (Flutter)",
      stack: ["Flutter", "Dart", "FFmpeg", "Google Sign-In"],
      description:
        "Beberapa aplikasi Flutter: keuangan pribadi dengan notifikasi lokal, backup media latar belakang dengan FFmpeg, aplikasi jadwal sholat dan perekam audio (65–109 commit per aplikasi).",
      link: "https://github.com/Harits19/my_money",
    },
    {
      name: "Infrastruktur Cloud 4-Tier (Terraform)",
      stack: ["Terraform", "GCP", "Byteplus", "PostgreSQL", "Redis"],
      description:
        "VPC, server aplikasi dan API, PostgreSQL serta Redis sebagai infrastructure as code dengan provider GCP, Byteplus, dan Vault — 61 dari 62 commit (98%).",
      note: "internal — walkthrough saat interview",
    },
  ],
};

const profile = {
  en,
  id,
};

export default profile;
