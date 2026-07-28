"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "teardown" | "comparison" | "opinion" | "default";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  const variantStyles: Record<string, string> = {
    teardown:
      "bg-[var(--accent)] text-[var(--accent-contrast)] shadow-sm",
    comparison:
      "bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-sm",
    opinion:
      "bg-[var(--accent-soft)] text-[var(--accent-hover)] border border-[color-mix(in_srgb,var(--accent)_35%,transparent)]",
    default:
      "bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
