import { Feed } from "feed";
import { getAllPosts } from "@/lib/mdx";
import { getAuthor } from "@/lib/authors";
import { siteConfig } from "@/lib/utils";

export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "en",
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.name}`,
    author: {
      name: siteConfig.name,
      link: siteConfig.url,
    },
  });

  for (const post of posts) {
    const author = getAuthor(post.frontmatter.author);
    feed.addItem({
      title: post.frontmatter.title,
      id: `${siteConfig.url}/blog/${post.frontmatter.slug}`,
      link: `${siteConfig.url}/blog/${post.frontmatter.slug}`,
      description: post.frontmatter.excerpt,
      author: [{ name: author.name }],
      date: new Date(post.frontmatter.date),
      category: post.frontmatter.tags.map((tag) => ({ name: tag })),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
