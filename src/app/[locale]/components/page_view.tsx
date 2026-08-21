"use client";

import CvView from "./cv_view";
import PortfolioView from "./portfolio_view";
import HeroView from "./hero_view";
import useDict from "@/hooks/use_dict";

export default function PageView() {
  const dict = useDict();

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-3 py-4 sm:px-6 sm:py-8">
        <HeroView />
        <PortfolioView />
        <section id="cv" className="scroll-mt-24">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-11pt font-semibold uppercase tracking-[0.24em] text-slate-500">
                {dict.cv}
              </span>
              <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl">
                {dict.cvTitle}
              </h2>
            </div>
            <button
              onClick={() => window.print()}
              className="w-max rounded-full border border-slate-950 bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              {dict.downloadCv}
            </button>
          </div>
          <div className="mx-auto max-w-[210mm]">
            <CvView />
          </div>
        </section>
      </div>
    </div>
  );
}
