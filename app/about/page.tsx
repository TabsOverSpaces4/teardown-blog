import type { Metadata } from "next";
import Link from "next/link";
import { getAllAuthors } from "@/lib/authors";
import { AuthorBio } from "@/components/blog/AuthorBio";
import { getPostsByAuthor } from "@/lib/mdx";
import { siteConfig } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: `${siteConfig.name} is a weekly product teardown blog. Two writers tear down competing products, then one writes the comparison.`,
};

export default function AboutPage() {
  const authors = getAllAuthors();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-12">
        <h1
          className="text-3xl sm:text-4xl mb-6"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--text-primary)",
          }}
        >
          About Unboxd
        </h1>
      </header>

      <div
        className="prose max-w-none mb-16"
        style={{ color: "var(--text-primary)" }}
      >
        <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Unboxd is a weekly product teardown series written by two people who
          care deeply about how software is built, designed, and experienced.
        </p>

        <h2
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--text-primary)",
          }}
        >
          The Format
        </h2>

        <p>
          Every cycle follows the same rhythm:
        </p>

        <div
          className="rounded-xl border p-6 my-8 not-prose"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{ backgroundColor: "var(--accent)" }}
              >
                1
              </span>
              <div>
                <h3
                  className="font-semibold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  Teardown Week
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Both of us publish a deep-dive teardown of a competing
                  product. Think of these as thorough, opinionated product reviews that go
                  beyond surface-level analysis.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{ backgroundColor: "var(--accent)" }}
              >
                2
              </span>
              <div>
                <h3
                  className="font-semibold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  Comparison Week
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  One of us publishes a side-by-side comparison of those two
                  products, complete with feature tables, ratings, and a clear
                  recommendation for different use cases.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span
                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{ backgroundColor: "var(--accent)" }}
              >
                3
              </span>
              <div>
                <h3
                  className="font-semibold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  Swap & Repeat
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  We swap roles every cycle. Both of us write teardowns, both of
                  us write comparisons. Neither gets too comfortable in a single
                  perspective.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--text-primary)",
          }}
        >
          Why We Do This
        </h2>

        <p>
          Most product reviews are either sponsored, surface-level, or written by
          someone who used the product for twenty minutes. We wanted something
          different: thoughtful, comparative analysis from people who actually live
          inside these tools.
        </p>

        <p>
          The rotation format keeps us honest. When you know someone else is going
          to compare the product you tore down against its competitor, you write
          with more rigor. And when you&apos;re the one writing the comparison, you read
          those teardowns with a critical eye.
        </p>

        <h2
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--text-primary)",
          }}
        >
          No Sponsorships
        </h2>

        <p>
          We don&apos;t accept sponsored content, affiliate deals, or paid placements.
          Every opinion on this site is our own. If we recommend a product, it&apos;s
          because we genuinely think it&apos;s the right choice for the described use case.
        </p>
      </div>

      {/* Authors section */}
      <section>
        <h2
          className="text-2xl mb-6"
          style={{
            fontFamily: "var(--font-serif)",
            color: "var(--text-primary)",
          }}
        >
          Meet the Team
        </h2>
        <div className="space-y-4">
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
      </section>

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
          style={{ backgroundColor: "var(--accent)", color: "white" }}
        >
          Start reading
        </Link>
      </div>
    </div>
  );
}
