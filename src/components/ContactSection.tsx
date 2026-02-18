"use client";

import { contact, socials } from "@/constants";
import AnimatedSection from "./AnimatedSection";
import { Copy, Mail } from "lucide-react";
import { useToast } from "./Toast";

export default function ContactSection() {
    const { toast } = useToast();

    const copyEmail = () => {
        navigator.clipboard.writeText(contact.email);
        toast("Email copied to clipboard!");
    };

    return (
        <section id="contact" className="relative py-24 sm:py-32">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(139,92,246,0.04)_0%,transparent_60%)]" />

            <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
                <AnimatedSection>
                    <p className="mb-3 font-mono text-sm tracking-wider text-neon-cyan">
                        CONTACT
                    </p>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Let&apos;s build something{" "}
                        <span className="gradient-text">extraordinary</span>.
                    </h2>
                    <p className="mx-auto mb-10 max-w-lg text-muted">
                        Have a project in mind or want to discuss AI solutions? I&apos;d
                        love to hear from you.
                    </p>
                </AnimatedSection>

                {/* Email + Copy */}
                <AnimatedSection delay={0.1}>
                    <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <div className="glass flex items-center gap-3 rounded-full px-6 py-3">
                            <Mail size={16} className="text-neon-cyan" />
                            <a
                                href={`mailto:${contact.email}`}
                                className="font-mono text-sm text-foreground transition-colors hover:text-neon-cyan"
                            >
                                {contact.email}
                            </a>
                        </div>
                        <button
                            onClick={copyEmail}
                            className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 font-mono text-sm text-muted transition-all duration-300 hover:border-neon-cyan/40 hover:text-neon-cyan"
                        >
                            <Copy size={14} />
                            Copy Email
                        </button>
                    </div>
                </AnimatedSection>

                {/* Social Links */}
                <AnimatedSection delay={0.2}>
                    <div className="flex items-center justify-center gap-4">
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
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
