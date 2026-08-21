export interface ProjectCardProps {
  title: string;
  subtitle: string;
  tags: string[];
  bgClass: string;
  videoSrc?: string;
  poster?: string;
  link?: string;
  github?: string;
  labels?: {
    liveDemo: string;
    internal: string;
    github: string;
    overview: string;
  };
}

const defaultLabels = {
  liveDemo: "Live Demo",
  internal: "Internal Project",
  github: "GitHub",
  overview: "Project Overview",
};

export function ProjectCard({
  title,
  subtitle,
  tags,
  bgClass,
  link,
  videoSrc,
  poster,
  github,
  labels = defaultLabels,
}: ProjectCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-[28px] border border-slate-200 bg-gradient-to-br ${bgClass} shadow-sm`}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
        {videoSrc ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={poster}
            src={videoSrc}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
            <span className="px-6 text-center text-2xl font-bold tracking-tight text-white/95 sm:text-3xl">
              {title}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
      </div>
      <div className="p-5">
        <div className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
          {labels.overview}
        </div>
        <div className="mt-3 text-2xl font-semibold text-slate-950">
          {title}
        </div>
        <div className="mt-3 text-sm leading-6 text-slate-600">{subtitle}</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-950 bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              {labels.liveDemo}
            </a>
          ) : (
            <span className="rounded-full border border-dashed border-slate-300 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-500">
              {labels.internal}
            </span>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              {labels.github}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
