import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Callout } from "@/components/mdx/Callout";
import { ProsCons } from "@/components/mdx/ProsCons";
import { ComparisonTable } from "@/components/mdx/ComparisonTable";
import { Rating } from "@/components/mdx/Rating";
import { ProductHeader } from "@/components/mdx/ProductHeader";
import { Verdict } from "@/components/mdx/Verdict";

const components = {
  Callout,
  ProsCons,
  ComparisonTable,
  Rating,
  ProductHeader,
  Verdict,
};

interface MdxContentProps {
  source: string;
}

export async function MdxContent({ source }: MdxContentProps) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: { className: ["anchor"] },
            },
          ],
        ],
      },
    },
  });

  return <div className="prose max-w-none">{content}</div>;
}
