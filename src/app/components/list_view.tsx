import { motion } from "motion/react";
import { ReactNode } from "react";
import useSkipAnimation from "@/hooks/use_skip_animation";

export default function ListView({
  items,
}: {
  items: { view: ReactNode; charBefore: number }[];
}) {
  const skipAnimation = useSkipAnimation();

  return (
    <ul className="list-disc ml-4">
      {items.map((item, index) => (
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: skipAnimation ? 0 : Math.min(index * 0.05, 0.4),
            duration: 0.4,
          }}
          key={index}
        >
          {item.view}
        </motion.li>
      ))}
    </ul>
  );
}
