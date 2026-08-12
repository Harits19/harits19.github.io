import { defaultAnimationPerChar } from "@/constants/animation";
import useSkipAnimation from "@/hooks/use_skip_animation";
import { motion } from "motion/react";

export default function Text({
  text,
  charBefore = 1,
}: {
  text: string;
  charBefore?: number;
}) {
  const skipAnimation = useSkipAnimation();

  return (
    <div className="whitespace-pre-wrap">
      {text.split("").map((char, index) => (
        <motion.span
          key={skipAnimation ? `skip-${index}` : index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: skipAnimation ? 0 : (index + charBefore) * defaultAnimationPerChar,
            duration: skipAnimation ? 0 : undefined,
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
