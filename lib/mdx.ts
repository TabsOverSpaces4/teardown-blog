import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export interface PostFrontmatter {
  title: string;
  slug: string;
  author: string;
  date: string;
  type: "teardown" | "comparison";
  products: { name: string; logo?: string }[];
  cycle: number;
  excerpt: string;
  banner: string;
  tags: string[];
}

export interface Post {
  frontmatter: PostFrontmatter;
  content: string;
  readTime: string;
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const { text } = readingTime(content);

  return {
    frontmatter: data as PostFrontmatter,
    content,
    readTime: text,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    return getPostBySlug(slug);
  });

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getPostsByCycle(cycle: number): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.cycle === cycle);
}

export function getPostsByAuthor(authorSlug: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.author === authorSlug);
}

export function getPostsByType(type: "teardown" | "comparison"): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.type === type);
}

export function getRelatedPosts(post: Post): Post[] {
  return getAllPosts().filter(
    (p) =>
      p.frontmatter.cycle === post.frontmatter.cycle &&
      p.frontmatter.slug !== post.frontmatter.slug
  );
}

export function getLatestCycle(): number {
  const posts = getAllPosts();
  if (posts.length === 0) return 0;
  return Math.max(...posts.map((p) => p.frontmatter.cycle));
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
