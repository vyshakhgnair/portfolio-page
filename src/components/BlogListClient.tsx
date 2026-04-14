"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import { useState } from "react";
import type { BlogPost } from "@/lib/blog";

export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));
  const tags = ["All", ...allTags];

  const filteredPosts = selectedTag === "All" 
    ? posts 
    : posts.filter(post => post.tags.includes(selectedTag));

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2 sm:gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`rounded-full border px-4 py-1.5 text-xs sm:text-sm font-mono transition-all ${
              selectedTag === tag
                ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan glow-border"
                : "border-border bg-card/50 text-muted hover:border-neon-cyan/50 hover:text-foreground hover:bg-card"
            }`}
          >
            {tag === "All" ? tag : `#${tag}`}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group glass-strong relative overflow-hidden rounded-2xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:glow-border"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-mono text-muted">
                  <span className="text-neon-cyan">{post.date}</span>
                  {post.readTime && (
                    <>
                      <span className="text-border">•</span>
                      <span>{post.readTime}</span>
                    </>
                  )}
                </div>
                
                <h2 className="mb-3 text-2xl font-semibold text-foreground transition-colors group-hover:text-neon-cyan sm:text-3xl">
                  {post.title}
                </h2>
                
                <p className="mb-6 text-muted line-clamp-3">
                  {post.description}
                </p>
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2 text-xs">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="rounded-full border border-border bg-card px-2 py-1 text-muted transition-colors group-hover:border-neon-cyan/30 group-hover:text-foreground">
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="rounded-full border border-border bg-card px-2 py-1 text-muted">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm font-semibold text-neon-cyan transition-transform duration-300 group-hover:translate-x-1">
                    Read Post <MoveRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-20 text-center glass-strong rounded-2xl border border-border">
            <p className="text-muted">No posts found for this tag.</p>
            <button 
              onClick={() => setSelectedTag("All")}
              className="mt-4 text-neon-cyan hover:underline font-mono text-sm"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
