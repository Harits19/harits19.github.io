"use client";

import { motion, useReducedMotion } from "motion/react";
import useProfile from "@/hooks/use_profile";
import useLocale from "@/hooks/use_locale";
import { generateLink } from "@/hooks/use_profile/constant";

const heroByLocale: Record<
  "en" | "id",
  {
    badge: string;
    typewriter: string;
    tagline: string;
    ctaContact: string;
    ctaCv: string;
    stats: { value: string; label: string }[];
  }
> = {
  en: {
    badge: "Open to opportunities",
    typewriter: "Full-Stack Engineer — Next.js · Go · Flutter",
    tagline:
      "5+ years building web & mobile products: WhatsApp chatbots, event-driven microservices, and real-time systems used by businesses across Indonesia.",
    ctaContact: "Contact me",
    ctaCv: "Download CV",
    stats: [
      { value: "5+", label: "Years of experience" },
      { value: "7", label: "Companies served" },
      { value: "3", label: "Platforms: web, mobile, backend" },
      { value: "30+", label: "Technologies" },
    ],
  },
  id: {
    badge: "Tersedia untuk peluang baru",
    typewriter: "Full-Stack Engineer — Next.js · Go · Flutter",
    tagline:
      "5+ tahun membangun produk web & mobile: chatbot WhatsApp, microservices berbasis event, dan sistem real-time yang dipakai bisnis di Indonesia.",
    ctaContact: "Hubungi Saya",
    ctaCv: "Unduh CV",
    stats: [
      { value: "5+", label: "Tahun pengalaman" },
      { value: "7", label: "Perusahaan" },
      { value: "3", label: "Platform: web, mobile, backend" },
      { value: "30+", label: "Teknologi" },
    ],
  },
};

export default function HeroView() {
  const { locale } = useLocale();
  const profile = useProfile();
  const reducedMotion = useReducedMotion();
  const hero = heroByLocale[locale as "en" | "id"] ?? heroByLocale.en;

  const typewriter = hero.typewriter.split("").map((char, index) => (
    <motion.span
      key={`${index}-${char}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: reducedMotion ? 0 : 0.6 + index * 0.045,
        duration: 0,
      }}
    >
      {char}
    </motion.span>
  ));

  return (
    <section className="relative overflow-hidden rounded-[32px] bg-slate-950 px-6 py-10 text-white shadow-2xl shadow-slate-300 sm:px-12 sm:py-14">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-slate-700/30 blur-3xl" />

      <div className="relative flex flex-col gap-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-slate-600 text-xl font-black tracking-tight text-white shadow-lg ring-1 ring-white/20">
            AH
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {hero.badge}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            {profile.name}
          </h1>
          <p
            className="min-h-[1.5em] text-lg font-medium text-slate-200 sm:text-2xl"
            aria-label={hero.typewriter}
          >
            {typewriter}
            <motion.span
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="ml-1 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-cyan-400"
            />
          </p>
          <p className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            {hero.tagline}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            {hero.ctaContact}
          </a>
          <button
            onClick={() => window.print()}
            className="rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            {hero.ctaCv}
          </button>
          <a
            href={generateLink(profile.linkedIn)}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            LinkedIn
          </a>
          <a
            href={generateLink(profile.github)}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            GitHub
          </a>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
          {hero.stats.map((stat) => (
            <div key={stat.label} className="bg-slate-950/95 px-5 py-4">
              <div className="text-2xl font-bold text-white sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
