"use client";

import useLocale, { LocaleProvider } from "@/hooks/use_locale";
import { Locale, locales } from "@/lib/i18n";
import { notFound, useParams } from "next/navigation";
import SidebarView from "../components/sidebar_view";

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  return (
    <LocaleProvider value={locale}>
      <div className="flex bg-gray-200">
        <div className="flex flex-1" />
        <div className="">{children}</div>
        <SidebarView />
      </div>
    </LocaleProvider>
  );
}
