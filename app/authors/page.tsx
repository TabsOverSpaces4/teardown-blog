import type { Metadata } from "next";
import { getAllAuthors } from "@/lib/authors";
import { getPostsByAuthor } from "@/lib/mdx";
import { AuthorBio } from "@/components/blog/AuthorBio";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Authors",
  description: `Meet the writers behind ${siteConfig.name} — the team that tears products apart every week.`,
};

export default function AuthorsPage() {
  const authors = getAllAuthors();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-12">
        <h1
          className="text-3xl sm:text-4xl mb-4"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--text-primary)",
          }}
        >
          The Team
        </h1>
        <p
          className="text-lg leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Two perspectives, one mission: honest product analysis. We swap
          roles every cycle so neither of us gets too comfortable.
        </p>
      </header>

      <div className="space-y-6">
        {authors.map((author) => {
          const posts = getPostsByAuthor(author.slug);
          return (
            <AuthorBio
              key={author.slug}
              author={author}
              postCount={posts.length}
              showFullBio
            />
          );
        })}
      </div>
    </div>
  );
}
