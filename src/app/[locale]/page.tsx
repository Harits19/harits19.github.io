import PageView from "./components/page_view";
export default function Page() {
  return <PageView />;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }];
}
