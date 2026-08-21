import { Locale, locales } from "@/lib/i18n";
import { LocaleProvider } from "@/hooks/use_locale";
import SidebarView from "../components/sidebar_view";
import RedirectView from "../components/redirect_view";
import HtmlLang from "./components/html_lang";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    return <RedirectView />;
  }

  return (
    <LocaleProvider value={locale as Locale}>
      <HtmlLang lang={locale} />
      <div className="flex justify-center bg-slate-100 px-2 sm:px-6 py-2 sm:py-6 min-h-screen relative">
        <main>{children}</main>
        <SidebarView />
      </div>
    </LocaleProvider>
  );
}
