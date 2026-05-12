"use client";

interface RatingProps {
  category: string;
  score: number;
  outOf?: number;
}

export function Rating({ category, score, outOf = 5 }: RatingProps) {
  const pct = Math.min((score / outOf) * 100, 100);

  return (
    <div className="my-3 flex items-center gap-4">
      <span className="w-28 shrink-0 text-sm font-medium text-[var(--text-primary)]">
        {category}
      </span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[var(--bg-secondary)]">
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-10 shrink-0 text-right text-sm font-semibold tabular-nums text-[var(--text-primary)]">
        {score}/{outOf}
      </span>
    </div>
  );
}
