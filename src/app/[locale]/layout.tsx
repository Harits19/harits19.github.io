"use client";

import { LocaleProvider } from "@/hooks/use_locale";
import { Locale, locales } from "@/lib/i18n";
import { notFound, useParams } from "next/navigation";

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
      <div className="flex justify-center bg-gray-200">
        <div>{children}</div>
      </div>
    </LocaleProvider>
  );
}
