"use client";

import { achievements } from "@/constants";
import AnimatedSection from "./AnimatedSection";

const accentMap = {
    cyan: {
        icon: "border-neon-cyan/20 bg-neon-cyan/10 text-neon-cyan",
        hover: "hover:border-neon-cyan/30",
    },
    violet: {
        icon: "border-neon-violet/20 bg-neon-violet/10 text-neon-violet",
        hover: "hover:border-neon-violet/30",
    },
    emerald: {
        icon: "border-neon-emerald/20 bg-neon-emerald/10 text-neon-emerald",
        hover: "hover:border-neon-emerald/30",
    },
    blue: {
        icon: "border-neon-blue/20 bg-neon-blue/10 text-neon-blue",
        hover: "hover:border-neon-blue/30",
    },
};

export default function AchievementsSection() {
    return (
        <section id="achievements" className="relative py-24 sm:py-32">
            <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-neon-violet/4 blur-[140px]" />

            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <AnimatedSection>
                    <div className="mb-14 max-w-2xl">
                        <p className="mb-3 font-mono text-sm tracking-wider text-neon-cyan">
                            ACHIEVEMENTS
                        </p>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                            Recognition &{" "}
                            <span className="gradient-text">honors</span>.
                        </h2>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {achievements.map((item, idx) => {
                        const colors = accentMap[item.accent];
                        return (
                            <AnimatedSection key={idx} delay={idx * 0.1}>
                                <div
                                    className={`glass group flex h-full flex-col items-center gap-4 rounded-2xl p-5 text-center transition-all duration-500 hover:glow-border sm:flex-row sm:items-center sm:gap-5 sm:p-6 sm:text-left ${colors.hover}`}
                                >
                                    {/* Icon */}
                                    <div
                                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${colors.icon}`}
                                    >
                                        <item.icon size={22} />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className="text-lg font-bold text-foreground">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-muted">
                                            {item.detail}
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        );
                    })}
                </div>
            </div>

            <div className="section-divider mx-auto mt-24 max-w-4xl sm:mt-32" />
        </section>
    );
}
