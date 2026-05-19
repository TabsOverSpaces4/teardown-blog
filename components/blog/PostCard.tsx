"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { getAuthor } from "@/lib/authors";
import type { Post } from "@/lib/mdx";

interface PostCardProps {
  post: Post;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  const { frontmatter, readTime } = post;
  const author = getAuthor(frontmatter.author);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={`/blog/${frontmatter.slug}`}
        className="group block rounded-xl border overflow-hidden transition-all duration-300 hover:-translate-y-1"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--bg-secondary)",
        }}
      >
        {frontmatter.banner && (
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={frontmatter.banner}
              alt={frontmatter.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-3 left-3">
              <Badge variant={frontmatter.type}>
                {frontmatter.type === "teardown"
                  ? "Teardown"
                  : frontmatter.type === "opinion"
                    ? "Opinion"
                    : "Comparison"}
              </Badge>
            </div>
          </div>
        )}

        <div className="p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            {frontmatter.products.map((product) => (
              <span
                key={product.name}
                className="text-xs font-medium px-2 py-0.5 rounded"
                style={{
                  backgroundColor: "var(--bg-primary)",
                  color: "var(--text-muted)",
                }}
              >
                {product.name}
              </span>
            ))}
          </div>

          <h3
            className="text-lg font-semibold leading-snug mb-3 group-hover:text-[var(--accent)] transition-colors line-clamp-2"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--text-primary)",
            }}
          >
            {frontmatter.title}
          </h3>

          <p
            className="text-sm leading-relaxed mb-4 line-clamp-2"
            style={{ color: "var(--text-muted)" }}
          >
            {frontmatter.excerpt}
          </p>

          <div
            className="flex items-center gap-4 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {author.name}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(frontmatter.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {readTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
