import useLocale from "@/hooks/use_locale";
import { useRouter } from "next/navigation";
import RoundButton from "./round_button";
import useDict from "@/hooks/use_dict";

export default function SidebarView() {
  const { locale } = useLocale();
  const router = useRouter();
  const dict = useDict();

  const isEN = locale === "en";
  return (
    <div className="flex flex-row flex-1 items-start gap-4 p-4 item">
      <RoundButton
        onClick={() => {
          if (isEN) {
            router.push("/id");
          } else {
            router.push("/en");
          }
        }}
      >
        {isEN ? "EN" : "ID"}
      </RoundButton>
      <RoundButton onClick={() => window.print()}>{dict.print}</RoundButton>
    </div>
  );
}
