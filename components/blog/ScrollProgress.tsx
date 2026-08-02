"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 inset-x-0 h-[3px] z-[60] origin-left pointer-events-none"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, var(--accent), var(--accent-hover))",
      }}
      aria-hidden="true"
    />
  );
}
