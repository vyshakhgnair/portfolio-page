"use client";

import { skills } from "@/constants";
import AnimatedSection from "./AnimatedSection";

export default function SkillsSection() {
    const categories = Object.entries(skills);

    return (
        <section id="skills" className="relative py-24 sm:py-32">
            <div className="pointer-events-none absolute left-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-neon-cyan/4 blur-[120px]" />

            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <AnimatedSection>
                    <div className="mb-14 max-w-2xl">
                        <p className="mb-3 font-mono text-sm tracking-wider text-neon-cyan">
                            SKILLS
                        </p>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                            Technical{" "}
                            <span className="gradient-text">Arsenal</span>.
                        </h2>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {categories.map(([category, items], idx) => (
                        <AnimatedSection key={category} delay={idx * 0.1}>
                            <div className="glass rounded-2xl p-6 transition-all duration-500 hover:border-neon-cyan/20 hover:glow-border sm:p-8">
                                <p className="mb-5 font-mono text-xs font-semibold tracking-wider text-neon-cyan">
                                    {category.toUpperCase()}
                                </p>
                                <div className="flex flex-wrap gap-2.5">
                                    {items.map((skill) => (
                                        <span
                                            key={skill}
                                            className="rounded-full border border-border bg-surface-light/40 px-3.5 py-1.5 text-sm text-slate-300 transition-all duration-300 hover:border-neon-cyan/30 hover:text-white"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>

            <div className="section-divider mx-auto mt-24 max-w-4xl sm:mt-32" />
        </section>
    );
}
