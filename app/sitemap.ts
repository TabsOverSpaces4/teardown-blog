import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { getAllAuthors } from "@/lib/authors";
import { siteConfig } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const authors = getAllAuthors();

  const blogEntries = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.frontmatter.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const authorEntries = authors.map((author) => ({
    url: `${siteConfig.url}/authors/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/authors`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    ...blogEntries,
    ...authorEntries,
  ];
}
