import { getAllPosts, getLatestCycle, getPostsByCycle } from "@/lib/mdx";
import { HeroSection } from "@/components/blog/HeroSection";
import { LatestCycle } from "@/components/blog/LatestCycle";
import { PostFilter } from "@/components/blog/PostFilter";
import { ScrollProgress } from "@/components/blog/ScrollProgress";
import { SectionHeading } from "@/components/blog/SectionHeading";

export default function HomePage() {
  const allPosts = getAllPosts();
  const latestCycleNum = getLatestCycle();
  const cyclePosts = getPostsByCycle(latestCycleNum);

  const teardowns = cyclePosts.filter((p) => p.frontmatter.type === "teardown");
  const comparison =
    cyclePosts.find((p) => p.frontmatter.type === "comparison") ?? null;
  const opinions = cyclePosts.filter((p) => p.frontmatter.type === "opinion");

  return (
    <div>
      <ScrollProgress />
      <HeroSection />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        {/* Latest cycle */}
        <LatestCycle
          teardowns={teardowns}
          comparison={comparison}
          opinions={opinions}
          cycleNumber={latestCycleNum}
        />

        {/* All posts */}
        <section className="mt-20">
          <SectionHeading>All Posts</SectionHeading>
          <PostFilter posts={allPosts} />
        </section>
      </div>
    </div>
  );
}
