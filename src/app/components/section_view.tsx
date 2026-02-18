import { motion } from "motion/react";
import { ReactNode } from "react";
import Text from "./text";
import {
  defaultAnimationPerChar,
  defaultLineChar,
} from "@/constants/animation";

export default function SectionView({
  children,
  title,
  charBefore = 0,
}: {
  title: string;
  children: ReactNode;
  charBefore?: number;
}) {
  const section1 = title.length + charBefore;
  return (
    <div className=" w-full flex flex-col text-justify">
      <span className="font-semibold text-12pt uppercase ">
        <Text text={title} charBefore={charBefore} />
      </span>
      <motion.span
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{
          delay: (section1 + defaultLineChar) * defaultAnimationPerChar,
        }}
        className="border-b-[0.5px]"
      />
      <div className="h-1" />
      {children}
      <div className="h-6" />
    </div>
  );
}
