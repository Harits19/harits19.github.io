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
      "Selected projects that showcase my skills in building scalable, user-friendly, and efficient web and mobile applications.",
    projects: [
      {
        title: "1ENGAGE Website",
        subtitle:
          "Official website for 1ENGAGE built with Next.js, Tailwind, and Motion.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
        videoSrc: "/1engage.mp4",
        poster: "/1engage-poster.jpg",
        link: "https://1engage.ai",
      },
      {
        title: "WhatsApp Chatbot Engine",
        subtitle:
          "Reusable chatbot engine on the Meta Cloud API — catalog messages, conversion events, and flexible multi-use-case flows.",
        tags: ["Node.js", "Express.js", "Meta Cloud API", "WhatsApp"],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
      },
      {
        title: "Broadcast Engine",
        subtitle:
          "Event-driven broadcast engine built on Google Pub/Sub with a microservices architecture.",
        tags: ["Go", "Google Pub/Sub", "Microservices", "Event-Driven"],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
      },
      {
        title: "Tzu Chi Donate Mini-Game",
        subtitle:
          "Flutter mini-game inside the Tzu Chi Donate app to boost user engagement and connect with the chatbot flow.",
        tags: ["Flutter", "Dart"],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
      },
      {
        title: "1ENGAGE Mobile App",
        subtitle:
          "Mobile app for the 1ENGAGE chatbot platform built with React Native.",
        tags: ["React Native", "TypeScript"],
        bgClass: "from-slate-950/5 via-slate-50 to-violet-50",
      },
      {
        title: "Hotel Management App",
        subtitle:
          "Hotel management application built with Flutter as a side project.",
        tags: ["Flutter", "Dart"],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
      },
    ],
  },
  id: {
    heading: "Proyek yang Pernah Saya Buat",
    description:
      "Proyek pilihan yang menunjukkan kemampuan saya membangun aplikasi web dan mobile yang skalabel, ramah pengguna, dan efisien.",
    projects: [
      {
        title: "Website 1ENGAGE",
        subtitle:
          "Website resmi produk 1ENGAGE, dibangun dengan Next.js, Tailwind, dan Motion.",
        tags: ["Next.js", "TypeScript", "Tailwind CSS"],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
        videoSrc: "/1engage.mp4",
        poster: "/1engage-poster.jpg",
        link: "https://1engage.ai",
      },
      {
        title: "Engine Chatbot WhatsApp",
        subtitle:
          "Mesin chatbot reusable di Meta Cloud API — catalog messages, event konversi, dan alur multi-use-case yang fleksibel.",
        tags: ["Node.js", "Express.js", "Meta Cloud API", "WhatsApp"],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
      },
      {
        title: "Broadcast Engine",
        subtitle:
          "Engine broadcast berbasis event di Google Pub/Sub dengan arsitektur microservices.",
        tags: ["Go", "Google Pub/Sub", "Microservices", "Event-Driven"],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
      },
      {
        title: "Mini-Game Tzu Chi Donate",
        subtitle:
          "Mini-game Flutter di aplikasi Tzu Chi Donate untuk meningkatkan engagement pengguna dan terhubung dengan alur chatbot.",
        tags: ["Flutter", "Dart"],
        bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
      },
      {
        title: "Aplikasi Mobile 1ENGAGE",
        subtitle:
          "Aplikasi mobile untuk platform chatbot 1ENGAGE yang dibangun dengan React Native.",
        tags: ["React Native", "TypeScript"],
        bgClass: "from-slate-950/5 via-slate-50 to-violet-50",
      },
      {
        title: "Aplikasi Manajemen Hotel",
        subtitle:
          "Aplikasi manajemen hotel dengan Flutter sebagai proyek sampingan.",
        tags: ["Flutter", "Dart"],
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
