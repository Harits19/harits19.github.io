import { motion } from "motion/react";

export default function Text({
  text,
  charBefore = 1,
}: {
  text: string;
  charBefore?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: Math.min(charBefore * 0.0005, 0.3) }}
      className="whitespace-pre-wrap"
    >
      {text}
    </motion.div>
  );
}
