import { getAllPosts, getLatestCycle, getPostsByCycle } from "@/lib/mdx";
import { HeroSection } from "@/components/blog/HeroSection";
import { LatestCycle } from "@/components/blog/LatestCycle";
import { PostFilter } from "@/components/blog/PostFilter";

export default function HomePage() {
  const allPosts = getAllPosts();
  const latestCycleNum = getLatestCycle();
  const cyclePosts = getPostsByCycle(latestCycleNum);

  const teardowns = cyclePosts.filter((p) => p.frontmatter.type === "teardown");
  const comparison =
    cyclePosts.find((p) => p.frontmatter.type === "comparison") ?? null;

  return (
    <div>
      <HeroSection />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        {/* Latest cycle */}
        <LatestCycle
          teardowns={teardowns}
          comparison={comparison}
          cycleNumber={latestCycleNum}
        />

        {/* All posts */}
        <section className="mt-20">
          <h2
            className="text-2xl sm:text-3xl mb-8"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--text-primary)",
            }}
          >
            All Posts
          </h2>
          <PostFilter posts={allPosts} />
        </section>
      </div>
    </div>
  );
}
