"use client";
import { ProjectCard, ProjectCardProps } from "./project_card";
import useProfile from "@/hooks/use_profile";
import { generateLink } from "@/hooks/use_profile/constant";

export default function PortfolioView() {
  const projects: ProjectCardProps[] = [
    {
      title: "1ENGAGE Website",
      subtitle: "Official website for 1ENGAGE",
      tags: ["Next.js", "TypeScript", "Tailwind CSS"],
      bgClass: "from-slate-950/5 via-slate-50 to-cyan-50",
      videoSrc: "/1engage.mp4",
      link: "https://1engage.ai",
    },
  ];

  const profile = useProfile();
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
              <a
                href={generateLink(profile.github)}
                className="mt-2 text-base font-semibold"
              >
                {profile.github}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-slate-200">
              {[
                {
                  label: "LinkedIn",
                  link: generateLink(profile.linkedIn),
                },
                {
                  label: "Github",
                  link: generateLink(profile.github),
                },
                {
                  label: "Email",
                  link: profile.mailto,
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.link}
                  target="_blank"
                  className=" -2xl bg-white/10 px-3 py-2"
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
