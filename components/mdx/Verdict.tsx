"use client";

import { Trophy } from "lucide-react";

interface VerdictProps {
  winner: string;
  summary: string;
}

export function Verdict({ winner, summary }: VerdictProps) {
  return (
    <div className="my-8 overflow-hidden rounded-xl border-2 border-[var(--accent)]">
      <div className="flex items-center gap-3 bg-[var(--accent)] px-5 py-3">
        <Trophy className="size-5 shrink-0 text-white" />
        <span className="text-sm font-semibold tracking-wide text-white uppercase">
          Our Pick
        </span>
      </div>
      <div className="bg-[var(--bg-secondary)] px-5 py-5">
        <h3 className="m-0 text-xl font-bold text-[var(--text-primary)]">
          {winner}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
          {summary}
        </p>
      </div>
    </div>
  );
}
