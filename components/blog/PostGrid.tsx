"use client";

import { PostCard } from "./PostCard";
import type { Post } from "@/lib/mdx";

interface PostGridProps {
  posts: Post[];
}

export function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div
        className="text-center py-16"
        style={{ color: "var(--text-muted)" }}
      >
        <p className="text-lg">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <PostCard key={post.frontmatter.slug} post={post} index={index} />
      ))}
    </div>
  );
}
