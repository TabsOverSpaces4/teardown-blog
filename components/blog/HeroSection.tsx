"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, var(--accent), transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight mb-6"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--text-primary)",
            }}
          >
            Products,{" "}
            <span style={{ color: "var(--accent)" }}>unboxed</span>.
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ color: "var(--text-muted)" }}
        >
          Every week, the two of us tear down competing products. Then one of
          us writes the verdict. Honest opinions, no sponsorships.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#latest"
            className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg transition-all duration-200"
            style={{
              backgroundColor: "var(--accent)",
              color: "white",
            }}
          >
            Read the latest
            <ArrowDown className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Format explainer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            {
              step: "Week N",
              desc: "Both of us tear down a competing product",
              accent: true,
            },
            {
              step: "Week N+1",
              desc: "One of us publishes the head-to-head comparison",
              accent: false,
            },
            {
              step: "Repeat",
              desc: "Roles swap — we both write, we both judge",
              accent: false,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl border p-5 text-left"
              style={{
                borderColor: item.accent
                  ? "var(--accent)"
                  : "var(--border)",
                backgroundColor: "var(--bg-secondary)",
              }}
            >
              <div
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{
                  color: item.accent
                    ? "var(--accent)"
                    : "var(--text-muted)",
                }}
              >
                {item.step}
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-primary)" }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
