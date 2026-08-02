"use client";

import { motion } from "framer-motion";

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl"
        style={{
          fontFamily: "var(--font-serif)",
          color: "var(--text-primary)",
        }}
      >
        {children}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="h-[3px] w-16 rounded-full origin-left mt-3"
        style={{
          background: "linear-gradient(90deg, var(--accent), transparent)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
