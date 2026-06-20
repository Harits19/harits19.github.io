import SectionView from "@/app/components/section_view";
import { JSX } from "react";

const stats = [
  {
    label: "Projects Completed",
    value: "5+",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M3 7h18" />
        <path d="M6 11h12" />
        <path d="M9 15h6" />
      </svg>
    ),
  },
  {
    label: "Deployed Apps",
    value: "3+",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M16 8l6 4-6 4" />
        <path d="M2 12h14" />
      </svg>
    ),
  },
  // {
  //   label: "Full Stack",
  //   value: "Development",
  //   icon: (
  //     <svg
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="1.5"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //       className="h-5 w-5"
  //     >
  //       <path d="M5 12h14" />
  //       <path d="M12 5v14" />
  //     </svg>
  //   ),
  // },
  // {
  //   label: "Experience",
  //   value: "2+ Years",
  //   icon: (
  //     <svg
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="1.5"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //       className="h-5 w-5"
  //     >
  //       <path d="M12 2l3 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
  //     </svg>
  //   ),
  // },
];

const sampleVideo =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const projects = [
  {
    title: "E-Commerce Dashboard",
    subtitle:
      "Admin dashboard for managing products, orders, customers, and analytics.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js", "Node.js"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M4 6h16v12H4z" />
        <path d="M4 10h16" />
        <path d="M8 14v2" />
        <path d="M12 14v2" />
        <path d="M16 14v2" />
      </svg>
    ),
    bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
    videoSrc: sampleVideo,
  },
  {
    title: "Task Management App",
    subtitle:
      "Productivity app to manage tasks, collaborate with teams, and track progress.",
    tags: ["React", "TypeScript", "Redux Toolkit", "Firebase", "Tailwind CSS"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M4 7h16" />
        <path d="M4 12h10" />
        <path d="M4 17h16" />
      </svg>
    ),
    bgClass: "from-slate-950/5 via-slate-50 to-rose-50",
    videoSrc: sampleVideo,
  },
  {
    title: "Real-time Chat Application",
    subtitle:
      "Real-time chat app with authentication and WebSocket-based messaging.",
    tags: ["Next.js", "Socket.io", "MongoDB", "Tailwind CSS", "JWT"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M7 8h10" />
        <path d="M7 12h7" />
        <path d="M7 16h10" />
        <path d="M4 3v18l4-4h12V3H4z" />
      </svg>
    ),
    bgClass: "from-slate-950/5 via-slate-50 to-emerald-50",
    videoSrc: sampleVideo,
  },
  {
    title: "Blog CMS",
    subtitle: "A headless CMS blog with markdown support and SEO optimization.",
    tags: ["Next.js", "MDX", "MongoDB", "NextAuth.js", "Tailwind CSS"],
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M4 5h16" />
        <path d="M4 9h16" />
        <path d="M6 13h12" />
        <path d="M6 17h8" />
      </svg>
    ),
    bgClass: "from-slate-950/5 via-slate-50 to-violet-50",
    videoSrc: sampleVideo,
  },
];

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: JSX.Element;
}) {
  return (
    <div className=" -3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-3 text-slate-900">
        <div className="flex min-h-11 min-w-11 items-center justify-center  -2xl bg-slate-950 text-white">
        </div>
        <div>
          <div className="text-sm font-semibold">{value}</div>
          <div className="text-xs text-slate-500">{label}</div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  subtitle,
  tags,
  icon,
  bgClass,
  videoSrc,
}: {
  title: string;
  subtitle: string;
  tags: string[];
  icon: JSX.Element;
  bgClass: string;
  videoSrc: string;
}) {
  return (
    <div
      className={`overflow-hidden  -[28px] border border-slate-200 bg-gradient-to-br ${bgClass} shadow-sm`}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src={videoSrc}
        >
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2  -full border border-white/20 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm text-xs font-semibold text-slate-950">
          {icon}
          <span>{title.split(" ").slice(0, 2).join(" ")}</span>
        </div>
      </div>
      <div className="p-5">
        <div className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          Project overview
        </div>
        <div className="mt-3 text-2xl font-semibold text-slate-950">
          {title}
        </div>
        <div className="mt-3 text-sm leading-6 text-slate-600">{subtitle}</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className=" -full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button className=" -full border border-slate-200 bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
            Live Demo
          </button>
          <button className=" -full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-50">
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioView() {
  return (
    <div className=" bg-slate-100/80 p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/60 backdrop-blur-sm">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span className="text-11pt font-semibold uppercase tracking-[0.24em] text-slate-500">
            Portfolio
          </span>
          <h2 className="text-4xl font-bold text-slate-950">
            Projects I&apos;ve Built
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-slate-600">
            Here are some selected projects that showcase my skills in building
            scalable, user-friendly, and efficient web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <div className=" -[28px] bg-slate-950 px-6 py-6 text-white shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm uppercase tracking-[0.25em] text-slate-400">
                See more projects
              </div>
              <div className="mt-2 text-base font-semibold">
                github.com/yourusername
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-slate-200">
              <span className=" -2xl bg-white/10 px-3 py-2">LinkedIn</span>
              <span className=" -2xl bg-white/10 px-3 py-2">GitHub</span>
              <span className=" -2xl bg-white/10 px-3 py-2">Email</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
