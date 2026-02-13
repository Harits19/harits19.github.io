import useLocale from "../use_locale";
import profile from "./constant";

export default function useProfile() {
  const locale = useLocale();
  return locale === "en" ? profile.en : profile.id;
}
