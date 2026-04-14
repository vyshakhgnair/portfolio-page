import { getBlogPosts } from "@/lib/blog";
import BlogListClient from "@/components/BlogListClient";

export const metadata = {
  title: "Blog | Vyshakh G Nair",
  description: "Writing about AI, Data Science, and building in the future.",
};

export default function BlogList() {
  const posts = getBlogPosts();

  return (
    <div className="relative min-h-screen bg-background pb-32 pt-32 selection:bg-neon-violet/30 selection:text-white">
      <div className="grain" />
      
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Thoughts & <span className="text-neon-cyan">Writing</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted">
            Deep dives on Machine Learning, Agentic AI, personal journeys, and lessons learned from building software.
          </p>
        </div>

        <BlogListClient posts={posts} />
      </div>
    </div>
  );
}
