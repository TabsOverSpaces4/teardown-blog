"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className="w-9 h-9 rounded-lg border flex items-center justify-center"
        style={{ borderColor: "var(--border)" }}
        aria-label="Toggle theme"
      >
        <span className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 rounded-lg border flex items-center justify-center transition-colors duration-200 cursor-pointer hover:bg-[var(--bg-secondary)]"
      style={{ borderColor: "var(--border)" }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
      ) : (
        <Moon className="w-4 h-4" style={{ color: "var(--text-primary)" }} />
      )}
    </button>
  );
}
