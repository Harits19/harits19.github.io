import useLocale from "@/hooks/use_locale";
import { useRouter } from "next/navigation";

export default function SidebarView() {
  const { locale } = useLocale();
  const router = useRouter();

  const isEN = locale === "en";
  return (
    <div className="flex flex-1">
      <button
        onClick={() => {
          if (isEN) {
            router.push("/id");
          } else {
            router.push("/en");
          }
        }}
        className="rounded-full uppercase h-10 w-10 bg-gray-500 flex flex-col m-10 text-white justify-center items-center"
      >
        {isEN ? "EN" : "ID"}
      </button>
    </div>
  );
}
