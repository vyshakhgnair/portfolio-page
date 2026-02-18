"use client";

import { beyondCards } from "@/constants";
import AnimatedSection from "./AnimatedSection";

export default function BeyondTerminal() {
    return (
        <section id="beyond" className="relative py-24 sm:py-32">
            <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-neon-violet/4 blur-[100px]" />

            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <AnimatedSection>
                    <div className="mb-14 text-center">
                        <p className="mb-3 font-mono text-sm tracking-wider text-neon-cyan">
                            BEYOND THE TERMINAL
                        </p>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                            More than just{" "}
                            <span className="gradient-text-warm">code</span>.
                        </h2>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                    {beyondCards.map((card, idx) => (
                        <AnimatedSection key={idx} delay={idx * 0.12}>
                            <div className="glass group flex h-full flex-col items-center rounded-2xl p-8 text-center transition-all duration-500 hover:border-neon-violet/30 hover:glow-border">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-neon-violet/10 transition-colors group-hover:border-neon-violet/30">
                                    <card.icon
                                        size={24}
                                        className="text-neon-violet transition-colors group-hover:text-neon-violet"
                                    />
                                </div>
                                <h3 className="mb-3 text-lg font-semibold text-foreground">
                                    {card.title}
                                </h3>
                                <p className="text-sm leading-relaxed text-muted">
                                    {card.description}
                                </p>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>

            <div className="section-divider mx-auto mt-24 max-w-4xl sm:mt-32" />
        </section>
    );
}
