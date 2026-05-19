import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/mdx";
import { getAuthor } from "@/lib/authors";
import { extractHeadings } from "@/lib/mdx-serialize";
import { formatDate, siteConfig } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { MdxContent } from "@/components/blog/MdxContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { AuthorBio } from "@/components/blog/AuthorBio";
import { PostCard } from "@/components/blog/PostCard";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = getPostBySlug(slug);
    const { frontmatter } = post;
    const author = getAuthor(frontmatter.author);

    const ogImageUrl = `${siteConfig.url}/api/og?title=${encodeURIComponent(frontmatter.title)}&author=${encodeURIComponent(author.name)}&type=${frontmatter.type}&products=${encodeURIComponent(frontmatter.products.map((p) => p.name).join(","))}`;

    return {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.excerpt,
        url: `${siteConfig.url}/blog/${slug}`,
        type: "article",
        publishedTime: new Date(frontmatter.date).toISOString(),
        authors: [author.name],
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: frontmatter.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: frontmatter.title,
        description: frontmatter.excerpt,
        images: [ogImageUrl],
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { frontmatter, content, readTime } = post;
  const author = getAuthor(frontmatter.author);
  const headings = extractHeadings(content);
  const relatedPosts = getRelatedPosts(post);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    image: frontmatter.banner,
    datePublished: new Date(frontmatter.date).toISOString(),
    author: {
      "@type": "Person",
      name: author.name,
      url: `${siteConfig.url}/authors/${author.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all posts
        </Link>

        {/* Post header */}
        <header className="max-w-3xl mb-10">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant={frontmatter.type}>
              {frontmatter.type === "teardown"
                ? "Teardown"
                : frontmatter.type === "opinion"
                  ? "Opinion"
                  : "Comparison"}
            </Badge>
            {frontmatter.products.map((product) => (
              <span
                key={product.name}
                className="text-xs font-medium px-2 py-0.5 rounded"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-muted)",
                }}
              >
                {product.name}
              </span>
            ))}
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            {frontmatter.title}
          </h1>

          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: "var(--text-muted)" }}
          >
            {frontmatter.excerpt}
          </p>

          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            <Link
              href={`/authors/${author.slug}`}
              className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <Image
                src={author.avatar}
                alt={author.name}
                width={28}
                height={28}
                className="rounded-full"
              />
              {author.name}
            </Link>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(frontmatter.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readTime}
            </span>
          </div>
        </header>

        {/* Banner image */}
        {frontmatter.banner && (
          <div className="relative aspect-[2/1] max-w-4xl rounded-xl overflow-hidden mb-10 border border-[var(--border)]">
            <Image
              src={frontmatter.banner}
              alt={frontmatter.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        )}

        {/* Content with TOC */}
        <div className="flex gap-12 max-w-4xl">
          <div className="flex-1 min-w-0">
            <TableOfContents headings={headings} variant="inline" />
            <MdxContent source={content} />
          </div>
          <TableOfContents headings={headings} variant="sidebar" />
        </div>

        {/* Author bio */}
        <div className="max-w-3xl mt-16 pt-10 border-t border-[var(--border)]">
          <h3
            className="text-sm font-semibold uppercase tracking-wider mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            Written by
          </h3>
          <AuthorBio author={author} showFullBio />
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-4xl mt-16 pt-10 border-t border-[var(--border)]">
            <h3
              className="text-2xl mb-6"
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--text-primary)",
              }}
            >
              From the same cycle
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((p, i) => (
                <PostCard key={p.frontmatter.slug} post={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
