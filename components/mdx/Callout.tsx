"use client";

import { Info, AlertTriangle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const config = {
  info: {
    icon: Info,
    border: "border-l-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    iconColor: "text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-l-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    iconColor: "text-amber-500",
  },
  tip: {
    icon: Lightbulb,
    border: "border-l-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    iconColor: "text-emerald-500",
  },
} as const;

interface CalloutProps {
  type: "info" | "warning" | "tip";
  children: React.ReactNode;
}

export function Callout({ type, children }: CalloutProps) {
  const { icon: Icon, border, bg, iconColor } = config[type];

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-r-lg border-l-4 px-4 py-3",
        border,
        bg,
      )}
    >
      <Icon className={cn("mt-0.5 size-5 shrink-0", iconColor)} />
      <div className="text-[var(--text-primary)] text-sm leading-relaxed [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}
