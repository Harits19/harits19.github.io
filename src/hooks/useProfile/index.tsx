import useLocale from "../useLocale";
import profile from "./constant";

export default function useProfile() {
  const locale = useLocale();
  return locale === "en" ? profile.en : profile.id;
}
