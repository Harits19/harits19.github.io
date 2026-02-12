import useLocale from "./useLocale";

const en = {
  aboutMe: "About Me",
} as const;

type Keys = keyof typeof en;

const id: Record<Keys, string> = {
  ...en,
  aboutMe: "Tentang Saya",
} as const;

export default function useDict() {
  const locale = useLocale();
  return locale === "en" ? en : id;
}
