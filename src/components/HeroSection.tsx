"use client";

import { hero, socials } from "@/constants";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import ParticleNetwork from "./ParticleNetwork";
import TypewriterText from "./TypewriterText";

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="bg-dot-grid relative flex min-h-screen items-center justify-center overflow-hidden"
        >
            {/* Particle network background */}
            <ParticleNetwork />

            {/* Radial glow overlays */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.08)_0%,transparent_60%)]" />
            <div className="pointer-events-none absolute -left-48 top-1/4 hidden h-[500px] w-[500px] rounded-full bg-neon-violet/8 blur-[160px] sm:block" />
            <div className="pointer-events-none absolute -right-48 bottom-1/4 hidden h-[500px] w-[500px] rounded-full bg-neon-cyan/6 blur-[160px] sm:block" />

            <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
                {/* Headline — typewriter */}
                <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    <TypewriterText
                        text={hero.headline}
                        className="gradient-text"
                        speed={35}
                        delay={600}
                    />
                </h1>

                {/* Sub-headline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 2.5 }}
                    className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-muted sm:mb-12 sm:text-lg md:text-xl"
                >
                    {hero.subHeadline}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 3 }}
                    className="mb-10 flex flex-col items-center justify-center gap-3 sm:mb-14 sm:flex-row sm:gap-4"
                >
                    {/* Primary CTA — glow */}
                    <a
                        href={hero.primaryCta.href}
                        className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 glow-btn hover:scale-105"
                    >
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40" />
                        <span className="relative">{hero.primaryCta.label}</span>
                    </a>

                    {/* Secondary CTA — outline */}
                    <a
                        href={hero.secondaryCta.href}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-sm font-medium text-foreground transition-all duration-300 hover:border-neon-cyan/40 hover:text-neon-cyan"
                    >
                        <Download size={16} />
                        {hero.secondaryCta.label}
                    </a>
                </motion.div>

                {/* Socials */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 3.5 }}
                    className="flex items-center justify-center gap-4"
                >
                    {socials.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="group rounded-full border border-border p-3 text-muted transition-all duration-300 hover:border-neon-cyan/40 hover:text-neon-cyan hover:glow-cyan"
                        >
                            <social.icon size={18} />
                        </a>
                    ))}
                </motion.div>
            </div>

            {/* Bottom fade */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>
    );
}
