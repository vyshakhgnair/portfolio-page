import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Vyshakh G Nair`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-background pb-32 pt-32 selection:bg-neon-violet/30 selection:text-white">
      <div className="grain" />
      
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        <Link 
          href="/blog" 
          className="group inline-flex items-center gap-2 mb-12 text-sm font-mono text-muted transition-colors hover:text-neon-cyan"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Link>
        
        <header className="mb-14 border-b border-border pb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-mono text-muted">
            <span className="text-neon-cyan">{post.date}</span>
            {post.readTime && (
              <>
                <span className="text-border">•</span>
                <span>{post.readTime}</span>
              </>
            )}
          </div>
          
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:leading-[1.1]">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {post.tags.map(tag => (
              <span key={tag} className="rounded-full border border-border bg-card/50 px-2.5 py-1 text-muted">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <article className="prose prose-invert prose-p:text-muted-light prose-headings:text-foreground prose-a:text-neon-cyan hover:prose-a:text-neon-violet prose-a:transition-colors prose-pre:bg-card prose-pre:border prose-pre:border-border prose-hr:border-border prose-blockquote:border-l-neon-cyan prose-blockquote:text-muted max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            rehypePlugins={[rehypeRaw]}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
