export interface Author {
  slug: string;
  name: string;
  avatar: string;
  bio: string;
  shortBio: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
}

export const authors: Record<string, Author> = {
  harsh: {
    slug: "harsh",
    name: "Harsh Gupta",
    avatar: "/images/authors/harsh.png",
    bio: "Product-obsessed engineer who believes great software is built at the intersection of taste and engineering rigor. When not tearing apart productivity tools, he's probably building one.",
    shortBio: "Engineer & product thinker",
    twitter: "https://x.com/harshgu41333165?s=11",
    linkedin: "https://www.linkedin.com/in/harshguptaworks/",
    website: "https://tabsoverspaces4.github.io/",
  },
  david: {
    slug: "david",
    name: "David (Jangwon) Yun",
    avatar: "/images/authors/david.svg",
    bio: "User-focused product thinker with an engineering foundation, translating customer insights and market data into scalable product strategies.",
    shortBio: "Product thinker & engineer",
    twitter: "https://twitter.com/davidyun",
    linkedin: "https://www.linkedin.com/in/david-yun-79006836a/",
    website: "https://davidyun.com",
  },
};

export function getAuthor(slug: string): Author {
  const author = authors[slug];
  if (!author) {
    throw new Error(`Author not found: ${slug}`);
  }
  return author;
}

export function getAllAuthors(): Author[] {
  return Object.values(authors);
}
