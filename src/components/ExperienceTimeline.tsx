"use client";

import { experience } from "@/constants";
import AnimatedSection from "./AnimatedSection";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const accentColors = {
    cyan: {
        dot: "bg-neon-cyan",
        dotGlow: "shadow-[0_0_12px_rgba(6,182,212,0.6)]",
        tag: "border-neon-cyan/20 bg-neon-cyan/10 text-neon-cyan",
        hover: "hover:border-neon-cyan/30",
    },
    violet: {
        dot: "bg-neon-violet",
        dotGlow: "shadow-[0_0_12px_rgba(139,92,246,0.6)]",
        tag: "border-neon-violet/20 bg-neon-violet/10 text-neon-violet",
        hover: "hover:border-neon-violet/30",
    },
    emerald: {
        dot: "bg-neon-emerald",
        dotGlow: "shadow-[0_0_12px_rgba(16,185,129,0.6)]",
        tag: "border-neon-emerald/20 bg-neon-emerald/10 text-neon-emerald",
        hover: "hover:border-neon-emerald/30",
    },
};

export default function ExperienceTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 60%"],
    });
    const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="experience" className="relative py-24 sm:py-32">
            <div className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-neon-cyan/4 blur-[140px]" />

            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <AnimatedSection>
                    <div className="mb-14 max-w-2xl">
                        <p className="mb-3 font-mono text-sm tracking-wider text-neon-cyan">
                            EXPERIENCE
                        </p>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                            A connected{" "}
                            <span className="gradient-text">career path</span>.
                        </h2>
                    </div>
                </AnimatedSection>

                {/* Timeline */}
                <div ref={containerRef} className="relative">
                    {/* Static beam track */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border sm:left-[23px]" />

                    {/* Animated beam glow */}
                    <motion.div
                        className="absolute left-[19px] top-0 w-px bg-gradient-to-b from-neon-cyan via-neon-violet to-neon-cyan/0 sm:left-[23px]"
                        style={{ height: beamHeight }}
                    />

                    {/* Experience entries */}
                    <div className="flex flex-col gap-12">
                        {experience.map((item, idx) => {
                            const colors = accentColors[item.accent];
                            return (
                                <AnimatedSection key={idx} delay={idx * 0.15}>
                                    <div className="relative flex gap-4 sm:gap-6 md:gap-8">
                                        {/* Dot */}
                                        <div className="relative z-10 mt-1.5 flex shrink-0">
                                            <div
                                                className={`h-[11px] w-[11px] rounded-full ${colors.dot} ${colors.dotGlow} ring-4 ring-background sm:h-[13px] sm:w-[13px]`}
                                            />
                                        </div>

                                        {/* Card */}
                                        <div
                                            className={`glass group min-w-0 flex-1 rounded-2xl p-5 transition-all duration-500 hover:glow-border sm:p-6 md:p-8 ${colors.hover}`}
                                        >
                                            {/* Header */}
                                            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <h3 className="text-lg font-bold text-foreground">
                                                        {item.role}
                                                    </h3>
                                                    <p className="font-mono text-sm text-neon-cyan/80">
                                                        {item.company}
                                                    </p>
                                                </div>
                                                <span className="font-mono text-xs text-muted">
                                                    {item.period}
                                                </span>
                                            </div>

                                            {/* Bullets */}
                                            <ul className="mb-4 space-y-2">
                                                {item.bullets.map((bullet, bIdx) => (
                                                    <li
                                                        key={bIdx}
                                                        className="flex items-start gap-2 text-sm leading-relaxed text-muted"
                                                    >
                                                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-light" />
                                                        {bullet}
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Focus tags */}
                                            <div className="flex flex-wrap gap-2">
                                                {item.focus.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className={`rounded-full border px-3 py-0.5 font-mono text-[11px] ${colors.tag}`}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedSection>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="section-divider mx-auto mt-24 max-w-4xl sm:mt-32" />
        </section>
    );
}
