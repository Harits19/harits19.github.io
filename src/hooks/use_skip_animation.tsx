"use client";

import { useEffect, useState } from "react";
import { skipAnimationEvent } from "@/constants/animation";

export default function useSkipAnimation() {
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    const updateAnimationPreference = () =>
      setSkipAnimation(document.documentElement.classList.contains("skip-animations"));

    updateAnimationPreference();
    window.addEventListener(skipAnimationEvent, updateAnimationPreference);
    return () => window.removeEventListener(skipAnimationEvent, updateAnimationPreference);
  }, []);

  return skipAnimation;
}
