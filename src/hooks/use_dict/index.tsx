import useLocale from "../use_locale";
import dict from "./constant";

export default function useDict() {
  const { locale } = useLocale();
  return locale === "en" ? dict.en : dict.id;
}
