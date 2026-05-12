"use client";

import { useEffect, useState } from "react";
import { List, ChevronDown } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TocItem[];
  variant: "sidebar" | "inline";
}

export function TableOfContents({ headings, variant }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  if (variant === "sidebar") {
    return (
      <aside className="hidden xl:block w-64 shrink-0">
        <div className="sticky top-24">
          <h4
            className="text-xs font-semibold uppercase tracking-wider mb-4 flex items-center gap-2"
            style={{ color: "var(--text-muted)" }}
          >
            <List className="w-4 h-4" />
            On this page
          </h4>
          <nav className="space-y-1">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className="block text-sm py-1 transition-colors duration-200 border-l-2"
                style={{
                  paddingLeft: `${(heading.level - 2) * 12 + 12}px`,
                  color:
                    activeId === heading.id
                      ? "var(--accent)"
                      : "var(--text-muted)",
                  borderColor:
                    activeId === heading.id
                      ? "var(--accent)"
                      : "transparent",
                }}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </div>
      </aside>
    );
  }

  return (
    <div
      className="xl:hidden mb-8 rounded-lg border overflow-hidden"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium cursor-pointer"
        style={{ color: "var(--text-primary)" }}
      >
        <span className="flex items-center gap-2">
          <List className="w-4 h-4" />
          Table of Contents
        </span>
        <ChevronDown
          className="w-4 h-4 transition-transform"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>
      {isOpen && (
        <nav className="px-4 pb-4 space-y-1">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={() => setIsOpen(false)}
              className="block text-sm py-1 transition-colors"
              style={{
                paddingLeft: `${(heading.level - 2) * 12}px`,
                color:
                  activeId === heading.id
                    ? "var(--accent)"
                    : "var(--text-muted)",
              }}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
