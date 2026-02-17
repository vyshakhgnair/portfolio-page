"use client";

import { publications } from "@/constants";
import AnimatedSection from "./AnimatedSection";
import ArchitectureFlow from "./ArchitectureFlow";
import {
    BookOpen,
    Award,
    ExternalLink,
    Code2,
    Layers,
    AlignLeft,
} from "lucide-react";
import { useState } from "react";

// Map publication titles to architecture diagram types
const pubArchMap: Record<string, "fusion"> = {
    "Fusion Learning for Drug Discovery": "fusion",
};

function PublicationCard({
    pub,
    idx,
}: {
    pub: (typeof publications)[number];
    idx: number;
}) {
    const archType = pubArchMap[pub.shortTitle];
    const [showArch, setShowArch] = useState(false);

    return (
        <AnimatedSection delay={idx * 0.12}>
            <div className="glass group flex flex-col gap-5 rounded-2xl p-6 transition-all duration-500 hover:border-neon-cyan/30 hover:glow-border sm:flex-row sm:items-start sm:p-8">
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-neon-cyan/10 transition-colors group-hover:border-neon-cyan/30">
                    {pub.type === "Journal" ? (
                        <BookOpen size={20} className="text-neon-cyan" />
                    ) : (
                        <Award size={20} className="text-neon-violet" />
                    )}
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-lg font-semibold text-white">
                            {pub.shortTitle}
                        </h3>
                        <div className="flex items-center gap-2">
                            {/* Architecture toggle */}
                            {archType && (
                                <button
                                    onClick={() => setShowArch(!showArch)}
                                    className={`rounded-lg border p-1.5 transition-all duration-200 ${showArch
                                            ? "border-neon-cyan/40 text-neon-cyan"
                                            : "border-border text-slate-400 hover:border-neon-cyan/40 hover:text-neon-cyan"
                                        }`}
                                    aria-label={
                                        showArch ? "Show description" : "Show architecture"
                                    }
                                    title={showArch ? "Description" : "Architecture"}
                                >
                                    {showArch ? <AlignLeft size={14} /> : <Layers size={14} />}
                                </button>
                            )}
                            <span
                                className={`inline-flex w-fit items-center rounded-full border px-3 py-0.5 font-mono text-xs ${pub.type === "Journal"
                                        ? "border-neon-cyan/20 bg-neon-cyan/10 text-neon-cyan"
                                        : "border-neon-violet/20 bg-neon-violet/10 text-neon-violet"
                                    }`}
                            >
                                {pub.type} &middot; {pub.year}
                            </span>
                        </div>
                    </div>
                    <p className="mb-1 text-sm font-medium text-slate-300">
                        {pub.title}
                    </p>
                    <p className="mb-2 font-mono text-sm text-neon-cyan/60">
                        {pub.venue}
                    </p>

                    {/* Description or Architecture view */}
                    {showArch && archType ? (
                        <div className="mb-4">
                            <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                                System Architecture
                            </p>
                            <ArchitectureFlow type={archType} />
                        </div>
                    ) : (
                        <p className="mb-4 text-sm leading-relaxed text-slate-400">
                            {pub.summary}
                        </p>
                    )}

                    {/* Links */}
                    <div className="flex flex-wrap gap-3">
                        {pub.link && (
                            <a
                                href={pub.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-xs text-slate-400 transition-all hover:border-neon-cyan/40 hover:text-neon-cyan"
                            >
                                <ExternalLink size={12} />
                                Paper
                            </a>
                        )}
                        {pub.code && (
                            <a
                                href={pub.code}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-xs text-slate-400 transition-all hover:border-neon-cyan/40 hover:text-neon-cyan"
                            >
                                <Code2 size={12} />
                                Code
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}

export default function ResearchSection() {
    return (
        <section id="research" className="relative py-24 sm:py-32">
            <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-neon-cyan/4 blur-[100px]" />

            <div className="mx-auto max-w-5xl px-6">
                <AnimatedSection>
                    <div className="mb-14 max-w-2xl">
                        <p className="mb-3 font-mono text-sm tracking-wider text-neon-cyan">
                            RESEARCH
                        </p>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                            Published{" "}
                            <span className="gradient-text">contributions</span>.
                        </h2>
                    </div>
                </AnimatedSection>

                <div className="flex flex-col gap-5">
                    {publications.map((pub, idx) => (
                        <PublicationCard key={idx} pub={pub} idx={idx} />
                    ))}
                </div>
            </div>

            <div className="section-divider mx-auto mt-24 max-w-4xl sm:mt-32" />
        </section>
    );
}
