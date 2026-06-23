import { JSX } from "react";

export interface ProjectCardProps {
  title: string;
  subtitle: string;
  tags: string[];
  bgClass: string;
  videoSrc: string;
  link?: string;
  github?: string;
}

export function ProjectCard({
  title,
  subtitle,
  tags,
  bgClass,
  link,
  videoSrc,
  github,
}: ProjectCardProps) {
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
          <a
            href={link}
            target="_blank"
            className=" -full border border-slate-200 bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Live Demo
          </a>
          {github && (
            <a
              href={github}
              target="_blank"
              className=" -full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-50"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
