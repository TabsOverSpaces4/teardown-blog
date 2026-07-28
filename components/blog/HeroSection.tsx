"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% -10%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--border), transparent)",
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
          style={{ color: "var(--text-secondary)" }}
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
            className="group inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-contrast)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            Read the latest
            <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
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
              className="card rounded-xl p-5 text-left"
              style={{
                borderColor: item.accent ? "var(--accent)" : undefined,
                backgroundColor: item.accent
                  ? "var(--accent-soft)"
                  : undefined,
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
