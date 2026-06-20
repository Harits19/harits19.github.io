import MainPageComponent from "./components/main_page_component";

export default function Page() {
  return <MainPageComponent />;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }];
}
