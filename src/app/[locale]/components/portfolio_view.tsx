"use client";

import { ProjectCard, ProjectCardProps } from "./project_card";
import useProfile from "@/hooks/use_profile";
import useLocale from "@/hooks/use_locale";
import useDict from "@/hooks/use_dict";
import { generateLink } from "@/hooks/use_profile/constant";

const projectsByLocale: Record<
  "en" | "id",
  { heading: string; description: string; projects: ProjectCardProps[] }
> = {
  en: {
    heading: "Projects I've Built",
    description:
      "Six selected projects that show how I design, ship, and operate production systems — from event-driven backends and containerised services to Flutter apps and polished frontends. Everything listed here maps to a real repository or a live URL.",
    projects: [
      {
        title: "Vet Management System",
        subtitle:
          "Clinic and cashier system for a veterinary practice — customers, pets, medical records, and unified shop plus doctor transactions, built as a TypeScript monorepo with Docker Compose.",
        tags: [
          "Next.js",
          "Express.js",
          "MongoDB",
          "Docker Compose",
          "TypeScript",
        ],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
        videoSrc: "/vet_management.mp4",
        poster: "/vet_management-poster.jpg",
        link: "https://vet-management-system.vercel.app",
        github: "https://github.com/Harits19/vet-management-system",
      },
      {
        title: "AI Assistant (Model Context Protocol)",
        subtitle:
          "Automation assistant built on the Model Context Protocol: an Express service with Zod-validated tools and Playwright browser automation. Designed and coded end to end as the sole author.",
        tags: ["Bun", "Express.js", "Zod", "Playwright", "MCP SDK"],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
        github: "https://github.com/Harits19/anti_rokok",
      },
      {
        title: "WhatsApp Chatbot Engine",
        subtitle:
          "Reusable chatbot engine on the Meta Cloud API — catalogue messages, conversion events, and flexible multi-flow use cases shared by several products, with events replicated to Google Pub/Sub.",
        tags: ["Node.js", "Express.js", "Meta Cloud API", "RabbitMQ"],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
        videoSrc: "/chatbot_engine.mp4",
        poster: "/chatbot_engine-poster.jpg",
        vertical: true,
        link: "https://wa.me/628881818123?text=hai",
      },
      {
        title: "Broadcast Engine",
        subtitle:
          "Event-driven mass-messaging engine for the chatbot platform: RabbitMQ messaging, etcd service discovery, object storage, and seven CI/CD workflows covering quality checks, Docker builds, and releases.",
        tags: [
          "Node.js",
          "RabbitMQ",
          "etcd",
          "Google Cloud Storage",
          "GitHub Actions",
        ],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
      },
      {
        title: "1ENGAGE Platform Website",
        subtitle:
          "Official product website built with Next.js, Tailwind CSS, and Motion — including an animated hero, scroll-linked sections, and a static export deployed through GitHub Pages.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
        videoSrc: "/1engage.mp4",
        poster: "/1engage-poster.jpg",
        link: "https://1engage.ai",
      },
      {
        title: "Wedding Invitation",
        subtitle:
          "Wedding invitation website for my own wedding: digital invitation flow, guest book, and mobile-first layout, deployed as a static site.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        videoSrc: "/wedding.mp4",
        vertical: true,
        link: "https://harits19.github.io/wedding-app",
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
      },
    ],
  },
  id: {
    heading: "Proyek yang Pernah Saya Buat",
    description:
      "Enam proyek pilihan yang menunjukkan cara saya merancang, merilis, dan mengoperasikan sistem produksi — dari backend berbasis event dan layanan dalam container sampai aplikasi Flutter dan frontend yang rapi. Semua yang ada di sini punya repository nyata atau URL yang bisa dibuka.",
    projects: [
      {
        title: "Sistem Manajemen Klinik Hewan",
        subtitle:
          "Sistem klinik dan kasir untuk praktik dokter hewan — data customer, hewan, rekam medis, serta transaksi toko dan dokter dalam satu sistem, dibangun sebagai monorepo TypeScript dengan Docker Compose.",
        tags: [
          "Next.js",
          "Express.js",
          "MongoDB",
          "Docker Compose",
          "TypeScript",
        ],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
        videoSrc: "/vet_management.mp4",
        poster: "/vet_management-poster.jpg",
        link: "https://vet-management-system.vercel.app",
        github: "https://github.com/Harits19/vet-management-system",
      },
      {
        title: "Asisten AI (Model Context Protocol)",
        subtitle:
          "Asisten otomasi berbasis Model Context Protocol: layanan Express dengan tool yang divalidasi Zod dan otomasi browser Playwright. Dirancang dan dikodekan sendiri dari awal.",
        tags: ["Bun", "Express.js", "Zod", "Playwright", "MCP SDK"],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
        github: "https://github.com/Harits19/anti_rokok",
      },
      {
        title: "Engine Chatbot WhatsApp",
        subtitle:
          "Engine chatbot reusable di Meta Cloud API — catalog messages, event konversi, dan alur multi-use-case yang fleksibel dan dipakai beberapa produk, dengan replikasi event ke Google Pub/Sub.",
        tags: ["Node.js", "Express.js", "Meta Cloud API", "RabbitMQ"],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
        videoSrc: "/chatbot_engine.mp4",
        poster: "/chatbot_engine-poster.jpg",
        vertical: true,
        link: "https://wa.me/628881818123?text=hai",
      },
      {
        title: "Engine Broadcast",
        subtitle:
          "Engine pengiriman massal berbasis event untuk platform chatbot: messaging RabbitMQ, service discovery etcd, object storage, dan tujuh workflow CI/CD untuk pemeriksaan kualitas, build Docker, serta rilis.",
        tags: [
          "Node.js",
          "RabbitMQ",
          "etcd",
          "Google Cloud Storage",
          "GitHub Actions",
        ],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
      },
      {
        title: "Website Platform 1ENGAGE",
        subtitle:
          "Website resmi produk dengan Next.js, Tailwind CSS, dan Motion — hero beranimasi, section yang mengikuti scroll, dan static export yang dideploy lewat GitHub Pages.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
        videoSrc: "/1engage.mp4",
        poster: "/1engage-poster.jpg",
        link: "https://1engage.ai",
      },
      {
        title: "Undangan Pernikahan",
        subtitle:
          "Website undangan pernikahan saya sendiri: alur undangan digital, buku tamu, dan tata letak mobile-first yang dideploy sebagai situs statis.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        videoSrc: "/wedding.mp4",
        vertical: true,
        link: "https://harits19.github.io/wedding-app",
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
      },
    ],
  },
};

export default function PortfolioView() {
  const { locale } = useLocale();
  const profile = useProfile();
  const dict = useDict();

  const { heading, description, projects } =
    projectsByLocale[locale as "en" | "id"] ?? projectsByLocale.en;

  const labels = {
    liveDemo: dict.liveDemo,
    internal: dict.internalProject,
    github: dict.github,
    overview: dict.projectOverview,
  };

  const socialLinks = [
    { label: "LinkedIn", link: generateLink(profile.linkedIn) },
    { label: "GitHub", link: generateLink(profile.github) },
    { label: "Email", link: profile.mailto },
  ];

  const seeMoreLabel = locale === "id" ? "Lihat proyek lainnya" : "See more projects";

  return (
    <div
      id="projects"
      className="scroll-mt-24 bg-slate-100/80 p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/60 backdrop-blur-sm sm:p-8"
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span className="text-11pt font-semibold uppercase tracking-[0.24em] text-slate-500">
            {dict.portfolio}
          </span>
          <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl">
            {heading}
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-slate-600">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} labels={labels} />
          ))}
        </div>

        <div className="rounded-[28px] bg-slate-950 px-6 py-6 text-white shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-slate-400">
                {seeMoreLabel}
              </div>
              <a
                href={generateLink(profile.github)}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block text-base font-semibold underline-offset-4 hover:underline"
              >
                {profile.github}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-slate-200">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.link}
                  target={item.label === "Email" ? undefined : "_blank"}
                  rel={item.label === "Email" ? undefined : "noreferrer"}
                  className="rounded-2xl bg-white/10 px-3 py-2 transition hover:bg-white/20"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
