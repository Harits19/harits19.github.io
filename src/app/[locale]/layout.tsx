import { Locale, locales } from "@/lib/i18n";
import { LocaleProvider } from "@/hooks/use_locale";
import SidebarView from "../components/sidebar_view";
import RedirectView from "../components/redirect_view";

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
      <div className="flex bg-gray-200">
        <div className="flex flex-1" />
        <div>{children}</div>
        <SidebarView />
      </div>
    </LocaleProvider>
  );
}
