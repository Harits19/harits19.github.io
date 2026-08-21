"use client";

import useLocale from "@/hooks/use_locale";
import { useRouter } from "next/navigation";
import useDict from "@/hooks/use_dict";
import useProfile from "@/hooks/use_profile";

export default function SidebarView() {
  const { locale } = useLocale();
  const router = useRouter();
  const dict = useDict();
  const profile = useProfile();

  const isEN = locale === "en";

  const toc = [
    { id: "about", label: dict.about },
    { id: "experience", label: dict.experience },
    { id: "projects", label: dict.projects },
    { id: "education", label: dict.education },
    { id: "skills", label: dict.additional },
    { id: "cv", label: dict.cv },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex w-max -translate-x-1/2 flex-row items-center gap-3 rounded-full border border-white/20 bg-white/75 p-2 shadow-2xl backdrop-blur-lg transition-all duration-300 hover:bg-white/90 sm:bottom-auto sm:left-auto sm:right-6 sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0 sm:flex-col sm:gap-6 sm:p-3 print:hidden">
      {/* Controls */}
      <div className="flex flex-row gap-2 sm:flex-col sm:gap-3">
        <a
          href={profile.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 shadow-sm transition-transform hover:scale-110 active:scale-95"
          title={dict.contact}
          aria-label={dict.contact}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </a>

        {/* Language Switcher */}
        <button
          onClick={() => router.push(isEN ? "/id" : "/en")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-800 shadow-sm hover:scale-110 transition-transform active:scale-95 text-[10px] font-black"
          title={isEN ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
        >
          {isEN ? "ID" : "EN"}
        </button>
      </div>

      <div className="hidden flex-col gap-1 border-y border-gray-200 py-2 sm:flex">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="text-[9px] uppercase font-bold text-center text-gray-500 hover:text-gray-900 transition-colors"
            title={item.label}
          >
            {item.id === "cv" ? "CV" : item.label.substring(0, 3)}
          </a>
        ))}
      </div>

      <button
        onClick={() => window.print()}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-800 shadow-sm hover:scale-110 transition-transform active:scale-95"
        title={dict.print}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
      </button>
    </div>
  );
}
