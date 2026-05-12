"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "teardown" | "comparison" | "default";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className }: BadgeProps) {
  const variantStyles: Record<string, string> = {
    teardown:
      "bg-[var(--accent)] text-white",
    comparison:
      "bg-[var(--text-primary)] text-[var(--bg-primary)]",
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
