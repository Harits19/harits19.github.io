import { motion } from "motion/react";
import { ReactNode } from "react";

export default function Text({
  text,
  index: indexParent = 1,
}: {
  text: string;
  index?: number;
}) {
  return (
    <div className="whitespace-pre-wrap">
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (index + indexParent) * 0.005 }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
