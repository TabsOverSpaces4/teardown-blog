"use client";

import { useState } from "react";
import { PostGrid } from "./PostGrid";
import type { Post } from "@/lib/mdx";
import { getAllAuthors } from "@/lib/authors";

interface PostFilterProps {
  posts: Post[];
}

export function PostFilter({ posts }: PostFilterProps) {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [authorFilter, setAuthorFilter] = useState<string>("all");
  const authors = getAllAuthors();

  const filtered = posts.filter((post) => {
    const matchType =
      typeFilter === "all" || post.frontmatter.type === typeFilter;
    const matchAuthor =
      authorFilter === "all" || post.frontmatter.author === authorFilter;
    return matchType && matchAuthor;
  });

  const buttonBase =
    "px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer border";

  const chipClass = (active: boolean) =>
    active
      ? "bg-[var(--accent)] text-[var(--accent-contrast)] border-[var(--accent)] shadow-sm"
      : "bg-transparent text-[var(--text-muted)] border-[var(--border)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-secondary)]";

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex flex-wrap gap-2">
          {[
            { value: "all", label: "All" },
            { value: "teardown", label: "Teardowns" },
            { value: "comparison", label: "Comparisons" },
            { value: "opinion", label: "Opinions" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setTypeFilter(opt.value)}
              className={`${buttonBase} ${chipClass(typeFilter === opt.value)}`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div
          className="w-px self-stretch mx-1 hidden sm:block"
          style={{ backgroundColor: "var(--border)" }}
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setAuthorFilter("all")}
            className={`${buttonBase} ${chipClass(authorFilter === "all")}`}
          >
            All Authors
          </button>
          {authors.map((author) => (
            <button
              key={author.slug}
              onClick={() => setAuthorFilter(author.slug)}
              className={`${buttonBase} ${chipClass(authorFilter === author.slug)}`}
            >
              {author.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <PostGrid posts={filtered} />
    </div>
  );
}
