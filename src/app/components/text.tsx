import { defaultAnimationPerChar } from "@/constants/animation";
import { motion } from "motion/react";

export default function Text({
  text,
  charBefore = 1,
}: {
  text: string;
  charBefore?: number;
}) {
  return (
    <div className="whitespace-pre-wrap">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (index + charBefore) * defaultAnimationPerChar }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
