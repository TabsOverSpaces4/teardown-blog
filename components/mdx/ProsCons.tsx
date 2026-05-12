"use client";

import { Check, X } from "lucide-react";

interface ProsConsProps {
  pros?: string;
  cons?: string;
}

export function ProsCons({ pros = "", cons = "" }: ProsConsProps) {
  const prosList = pros
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
  const consList = cons
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="my-6 grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl bg-[var(--bg-secondary)] p-5">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
          <span className="flex size-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/50">
            <Check className="size-3.5" />
          </span>
          Pros
        </h4>
        <ul className="space-y-2">
          {prosList.map((pro, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-[var(--text-primary)]"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl bg-[var(--bg-secondary)] p-5">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-red-600 uppercase dark:text-red-400">
          <span className="flex size-5 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
            <X className="size-3.5" />
          </span>
          Cons
        </h4>
        <ul className="space-y-2">
          {consList.map((con, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-[var(--text-primary)]"
            >
              <X className="mt-0.5 size-4 shrink-0 text-red-500" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
