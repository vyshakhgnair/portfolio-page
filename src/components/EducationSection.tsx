"use client";

import { education } from "@/constants";
import AnimatedSection from "./AnimatedSection";

export default function EducationSection() {
    return (
        <section id="education" className="relative py-24 sm:py-32">
            <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-neon-violet/4 blur-[120px]" />

            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <AnimatedSection>
                    <div className="mb-14 max-w-2xl">
                        <p className="mb-3 font-mono text-sm tracking-wider text-neon-cyan">
                            EDUCATION
                        </p>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                            Academic{" "}
                            <span className="gradient-text">foundation</span>.
                        </h2>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {education.map((item, idx) => (
                        <AnimatedSection key={idx} delay={idx * 0.12}>
                            <div className="glass group flex h-full flex-col items-center gap-4 rounded-2xl p-5 text-center transition-all duration-500 hover:border-neon-cyan/30 hover:glow-border sm:flex-row sm:items-start sm:gap-5 sm:p-8 sm:text-left">
                                {/* Icon */}
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-neon-cyan/10 transition-colors group-hover:border-neon-cyan/30">
                                    <item.icon size={22} className="text-neon-cyan" />
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="mb-1 text-lg font-semibold text-foreground">
                                        {item.degree}
                                    </h3>
                                    <p className="mb-1 text-sm text-muted">{item.institution}</p>
                                    <p className="font-mono text-xs text-neon-cyan/60">
                                        {item.period}
                                    </p>
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
