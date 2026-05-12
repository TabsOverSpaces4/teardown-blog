"use client";

import { ExternalLink, Package } from "lucide-react";

interface ProductHeaderProps {
  name: string;
  logo?: string;
  tagline?: string;
  url?: string;
}

export function ProductHeader({ name, logo, tagline, url }: ProductHeaderProps) {
  return (
    <div className="my-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-5">
      {logo ? (
        <img
          src={logo}
          alt={`${name} logo`}
          className="size-14 sm:size-16 shrink-0 rounded-xl object-contain"
        />
      ) : (
        <div className="flex size-14 sm:size-16 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/10">
          <Package className="size-7 sm:size-8 text-[var(--accent)]" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h2 className="m-0 text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          {name}
        </h2>
        {tagline && (
          <p className="mt-1 text-sm text-[var(--text-muted)]">{tagline}</p>
        )}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Visit website
            <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
