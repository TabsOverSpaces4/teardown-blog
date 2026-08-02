"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";

function cubeFaces(half: number) {
  return [
    `rotateY(0deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];
}

/**
 * A wireframe "box" that spins as the user scrolls — a nod to the
 * Unboxd name. Purely decorative: hidden from screen readers and
 * static when the user prefers reduced motion.
 */
function ScrollCube({
  size,
  scrollFactor,
  floatDistance = 14,
  floatDuration = 7,
  className = "",
}: {
  size: number;
  scrollFactor: number;
  floatDistance?: number;
  floatDuration?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const rotateY = useSpring(
    useTransform(scrollY, (v) => 45 + v * scrollFactor),
    { stiffness: 50, damping: 16 }
  );

  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ perspective: "900px" }}
      aria-hidden="true"
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -floatDistance, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          style={{
            width: size,
            height: size,
            transformStyle: "preserve-3d",
            rotateX: 24,
            rotateY: reduceMotion ? 45 : rotateY,
          }}
        >
          {cubeFaces(size / 2).map((transform, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-lg"
              style={{
                transform,
                border:
                  "1.5px solid color-mix(in srgb, var(--accent) 45%, transparent)",
                background:
                  "color-mix(in srgb, var(--accent) 7%, transparent)",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: hero content drifts up and fades slightly as it scrolls away.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100svh-4rem)] flex items-center py-16 overflow-hidden"
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% -10%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)",
        }}
      />

      {/* Dot grid, faded out toward the edges */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in srgb, var(--border-strong) 70%, transparent) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 70% 65% at 50% 25%, black 25%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 65% at 50% 25%, black 25%, transparent 75%)",
        }}
      />

      {/* Parallax glow orbs */}
      <motion.div
        className="absolute -top-20 right-[10%] w-[26rem] h-[26rem] rounded-full blur-3xl pointer-events-none"
        style={{
          y: reduceMotion ? 0 : orbY1,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-0 left-[5%] w-[20rem] h-[20rem] rounded-full blur-3xl pointer-events-none"
        style={{
          y: reduceMotion ? 0 : orbY2,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 10%, transparent), transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Scroll-driven cubes */}
      <ScrollCube
        size={150}
        scrollFactor={0.22}
        className="hidden md:block absolute right-[6%] top-[20%]"
      />
      <ScrollCube
        size={80}
        scrollFactor={-0.16}
        floatDistance={10}
        floatDuration={9}
        className="hidden lg:block absolute left-[8%] bottom-[16%]"
      />

      <div
        className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--border), transparent)",
        }}
      />

      <motion.div
        className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 text-center"
        style={
          reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }
        }
      >
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
            <span
              className="relative inline-block"
              style={{ color: "var(--accent)" }}
            >
              unboxed
              <motion.svg
                viewBox="0 0 200 12"
                className="absolute left-0 -bottom-1 sm:-bottom-2 w-full h-2.5 sm:h-3"
                fill="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M3 9 C 55 2.5, 145 2.5, 197 7.5"
                  stroke="var(--accent)"
                  strokeWidth={4}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                />
              </motion.svg>
            </span>
            .
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
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
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
              desc: "Roles swap: we both write, we both judge",
              accent: false,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 + i * 0.12 }}
              className="card card-interactive rounded-xl p-5 text-left"
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
                  color: item.accent ? "var(--accent)" : "var(--text-muted)",
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
