import { defaultAnimationPerChar } from "@/constants/animation";
import { motion } from "motion/react";
import { ReactNode } from "react";

export default function ListView({
  items,
}: {
  items: { view: ReactNode; charBefore: number,  }[];
}) {
  return (
    <ul className="list-disc ml-4">
      {items.map((item, index) => (
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: (index + item.charBefore) * defaultAnimationPerChar }}
          key={index}
        >
          {item.view}
        </motion.li>
      ))}
    </ul>
  );
}
