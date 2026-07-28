import { defaultAnimationPerChar } from "@/constants/animation";
import useSkipAnimation from "@/hooks/use_skip_animation";
import { motion } from "motion/react";
import { ReactNode } from "react";

export default function ListView({
  items,
}: {
  items: { view: ReactNode; charBefore: number,  }[];
}) {
  const skipAnimation = useSkipAnimation();

  return (
    <ul className="list-disc ml-4">
      {items.map((item, index) => (
        <motion.li
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: skipAnimation
              ? 0
              : (index + item.charBefore) * defaultAnimationPerChar,
            duration: skipAnimation ? 0 : undefined,
          }}
          key={index}
        >
          {item.view}
        </motion.li>
      ))}
    </ul>
  );
}
