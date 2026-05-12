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
    avatar: "/images/authors/harsh.svg",
    bio: "Product-obsessed engineer who believes great software is built at the intersection of taste and engineering rigor. When not tearing apart productivity tools, he's probably building one.",
    shortBio: "Engineer & product thinker",
    twitter: "https://twitter.com/harshgupta",
    linkedin: "https://linkedin.com/in/harshgupta",
    website: "https://harshgupta.dev",
  },
  vamsi: {
    slug: "vamsi",
    name: "Vamsi Krishnan",
    avatar: "/images/authors/vamsi.svg",
    bio: "Designer turned strategist who reads product decisions like sheet music. Fascinated by how small UX choices create massive behavioral shifts. Writes about the craft behind the product.",
    shortBio: "Design strategist & writer",
    twitter: "https://twitter.com/vamsikrishnan",
    linkedin: "https://linkedin.com/in/vamsikrishnan",
  },
  david: {
    slug: "david",
    name: "David Yun",
    avatar: "/images/authors/david.svg",
    bio: "Former PM who's shipped products to millions. Now spends his time comparing the ones other people ship. Specializes in finding the signal in the noise of feature sprawl.",
    shortBio: "Former PM & product analyst",
    twitter: "https://twitter.com/davidyun",
    linkedin: "https://linkedin.com/in/davidyun",
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
