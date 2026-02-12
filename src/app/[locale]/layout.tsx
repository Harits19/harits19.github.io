import { LocaleProvider } from "@/hooks/useLocale";

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider value={"en"}>
      <div className="flex justify-center bg-gray-200 p-10">
        <div className="w-[210mm] h-[297mm] bg-white">{children}</div>
      </div>
    </LocaleProvider>
  );
}
