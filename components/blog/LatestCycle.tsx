"use client";

import { motion } from "framer-motion";
import { PostCard } from "./PostCard";
import type { Post } from "@/lib/mdx";

interface LatestCycleProps {
  teardowns: Post[];
  comparison: Post | null;
  opinions: Post[];
  cycleNumber: number;
}

export function LatestCycle({
  teardowns,
  comparison,
  opinions,
  cycleNumber,
}: LatestCycleProps) {
  if (teardowns.length === 0 && !comparison && opinions.length === 0)
    return null;

  return (
    <section id="latest" className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <h2
            className="text-2xl sm:text-3xl"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--text-primary)",
            }}
          >
            Cycle {cycleNumber}
          </h2>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: "var(--accent)",
              color: "white",
            }}
          >
            Latest
          </span>
        </div>

        {/* Teardowns */}
        {teardowns.length > 0 && (
          <div className="mb-6">
            <p
              className="text-sm font-medium uppercase tracking-wider mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Teardowns
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teardowns.map((post, i) => (
                <PostCard key={post.frontmatter.slug} post={post} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Opinions */}
        {opinions.length > 0 && (
          <div className="mb-6">
            <p
              className="text-sm font-medium uppercase tracking-wider mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Opinions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {opinions.map((post, i) => (
                <PostCard key={post.frontmatter.slug} post={post} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Comparison */}
        {comparison && (
          <div className="mt-8">
            <p
              className="text-sm font-medium uppercase tracking-wider mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              The Verdict
            </p>
            <div className="max-w-2xl">
              <PostCard post={comparison} index={teardowns.length} />
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
