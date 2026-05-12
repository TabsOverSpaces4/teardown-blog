import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllAuthors, getAuthor } from "@/lib/authors";
import { getPostsByAuthor } from "@/lib/mdx";
import { AuthorBio } from "@/components/blog/AuthorBio";
import { PostGrid } from "@/components/blog/PostGrid";
import { siteConfig } from "@/lib/utils";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllAuthors().map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const author = getAuthor(slug);
    return {
      title: author.name,
      description: author.bio,
      openGraph: {
        title: `${author.name} — ${siteConfig.name}`,
        description: author.bio,
        url: `${siteConfig.url}/authors/${slug}`,
        type: "profile",
      },
    };
  } catch {
    return {};
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;

  let author;
  try {
    author = getAuthor(slug);
  } catch {
    notFound();
  }

  const posts = getPostsByAuthor(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    description: author.bio,
    url: `${siteConfig.url}/authors/${slug}`,
    sameAs: [author.twitter, author.linkedin, author.website].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <AuthorBio author={author} postCount={posts.length} showFullBio />
        </div>

        <section>
          <h2
            className="text-2xl mb-6"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--text-primary)",
            }}
          >
            Posts by {author.name}
          </h2>
          <PostGrid posts={posts} />
        </section>
      </div>
    </>
  );
}
