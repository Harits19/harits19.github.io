"use client";

import useLocale from "@/hooks/use_locale";
import { useRouter } from "next/navigation";
import useDict from "@/hooks/use_dict";

export default function SidebarView() {
  const { locale } = useLocale();
  const router = useRouter();
  const dict = useDict();

  const isEN = locale === "en";

  const toc = [
    { id: "about", label: dict.about },
    { id: "experience", label: dict.experience },
    { id: "education", label: dict.education },
    { id: "skills", label: dict.additional },
  ];

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-6 z-50 flex flex-col items-center gap-6 p-3 bg-white/40 dark:bg-black/40 backdrop-blur-lg border border-white/20 dark:border-white/10 rounded-full shadow-2xl transition-all duration-300 hover:bg-white/60 dark:hover:bg-black/60 print:hidden">
      {/* Controls */}
      <div className="flex flex-col gap-3">
        {/* Dark Mode Toggle Placeholder */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm hover:scale-110 transition-transform active:scale-95"
          title="Toggle Dark Mode"
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
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        {/* Skip Animation Placeholder */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm hover:scale-110 transition-transform active:scale-95"
          title="Skip Animation"
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
            <polygon points="5 4 15 12 5 22 5 4" />
            <line x1="19" y1="5" x2="19" y2="19" />
          </svg>
        </button>

        {/* Language Switcher */}
        <button
          onClick={() => router.push(isEN ? "/id" : "/en")}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm hover:scale-110 transition-transform active:scale-95 text-[10px] font-black"
          title={isEN ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
        >
          {isEN ? "ID" : "EN"}
        </button>
      </div>

      {/* Table of Content Links */}
      <div className="flex flex-col gap-1 py-2 border-y border-gray-200 dark:border-gray-700">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="text-[9px] uppercase font-bold text-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            title={item.label}
          >
            {item.label.substring(0, 3)}
          </a>
        ))}
      </div>

      {/* Print Action */}
      <button
        onClick={() => window.print()}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-lg hover:scale-110 transition-transform active:scale-95"
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
