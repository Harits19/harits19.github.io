import ClientComponentPage from "./components/client_component_page";

export default function Page() {
  return <ClientComponentPage />;
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }];
}
