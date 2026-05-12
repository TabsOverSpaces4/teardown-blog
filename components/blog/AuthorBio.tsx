import Link from "next/link";
import Image from "next/image";
import { Globe, ExternalLink } from "lucide-react";
import type { Author } from "@/lib/authors";

interface AuthorBioProps {
  author: Author;
  postCount?: number;
  showFullBio?: boolean;
}

export function AuthorBio({
  author,
  postCount,
  showFullBio = false,
}: AuthorBioProps) {
  return (
    <div
      className="rounded-xl border p-6 flex flex-col sm:flex-row gap-5"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <Link href={`/authors/${author.slug}`} className="shrink-0">
        <div
          className="w-16 h-16 rounded-full overflow-hidden border-2"
          style={{ borderColor: "var(--border)" }}
        >
          <Image
            src={author.avatar}
            alt={author.name}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <Link
            href={`/authors/${author.slug}`}
            className="font-semibold hover:text-[var(--accent)] transition-colors"
            style={{
              color: "var(--text-primary)",
              fontFamily: "var(--font-serif)",
              fontSize: "1.125rem",
            }}
          >
            {author.name}
          </Link>
          {postCount !== undefined && (
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "var(--bg-primary)",
                color: "var(--text-muted)",
              }}
            >
              {postCount} {postCount === 1 ? "post" : "posts"}
            </span>
          )}
        </div>

        <p
          className="text-sm leading-relaxed mb-3"
          style={{ color: "var(--text-muted)" }}
        >
          {showFullBio ? author.bio : author.shortBio}
        </p>

        <div className="flex items-center gap-3">
          {author.twitter && (
            <a
              href={author.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs transition-colors hover:text-[var(--accent)]"
              style={{ color: "var(--text-muted)" }}
              aria-label={`${author.name} on X/Twitter`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              X
            </a>
          )}
          {author.linkedin && (
            <a
              href={author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs transition-colors hover:text-[var(--accent)]"
              style={{ color: "var(--text-muted)" }}
              aria-label={`${author.name} on LinkedIn`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              LinkedIn
            </a>
          )}
          {author.website && (
            <a
              href={author.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs transition-colors hover:text-[var(--accent)]"
              style={{ color: "var(--text-muted)" }}
              aria-label={`${author.name}'s website`}
            >
              <Globe className="w-3.5 h-3.5" />
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
