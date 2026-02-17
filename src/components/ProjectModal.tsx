"use client";

import type { ProjectDetail } from "@/constants";
import { modresEngines, modresStack } from "@/constants";
import { motion } from "framer-motion";
import { X, ExternalLink, Github, Zap, Lightbulb, Target } from "lucide-react";
import { useEffect, useRef } from "react";

interface Props {
    project: ProjectDetail;
    layoutId: string;
    onClose: () => void;
}

export default function ProjectModal({ project, layoutId, onClose }: Props) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const dd = project.deepDive;
    const isModRes = project.title === "ModRes";

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handler);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handler);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    if (!dd) return null;

    return (
        <>
            {/* Backdrop */}
            <motion.div
                ref={overlayRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                onClick={(e) => {
                    if (e.target === overlayRef.current) onClose();
                }}
            />

            {/* Modal */}
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                onClick={(e) => {
                    if (e.target === e.currentTarget) onClose();
                }}
            >
                <motion.div
                    layoutId={layoutId}
                    className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border bg-[#0d1117]/98 shadow-2xl shadow-black/50 backdrop-blur-2xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 z-10 rounded-lg border border-border p-2 text-slate-400 transition-colors hover:border-neon-cyan/40 hover:text-white"
                    >
                        <X size={16} />
                    </button>

                    <div className="p-6 sm:p-10">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="mb-3 flex flex-wrap items-center gap-3">
                                {isModRes && (
                                    <span className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
                                )}
                                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                                    {isModRes ? "System Architecture" : project.title}
                                </h2>
                                <span className="rounded-full border border-neon-violet/20 bg-neon-violet/10 px-3 py-0.5 font-mono text-xs text-neon-violet">
                                    {project.hook}
                                </span>
                            </div>

                            {/* Links */}
                            <div className="flex gap-2">
                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-xs text-slate-400 transition-all hover:border-neon-cyan/40 hover:text-neon-cyan"
                                    >
                                        <ExternalLink size={12} />
                                        View Live
                                    </a>
                                )}
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-xs text-slate-400 transition-all hover:border-neon-cyan/40 hover:text-neon-cyan"
                                    >
                                        <Github size={12} />
                                        GitHub
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Stack tags */}
                        <div className="mb-8 flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full border border-neon-cyan/15 bg-neon-cyan/5 px-3 py-1 font-mono text-xs text-neon-cyan/80"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* The Story — 3-column grid */}
                        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="rounded-xl border border-border bg-surface/50 p-5">
                                <div className="mb-3 flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10">
                                        <Target size={14} className="text-red-400" />
                                    </div>
                                    <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-red-400">
                                        Problem
                                    </h4>
                                </div>
                                <p className="text-sm leading-relaxed text-slate-300">
                                    {dd.problem}
                                </p>
                            </div>

                            <div className="rounded-xl border border-border bg-surface/50 p-5">
                                <div className="mb-3 flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-neon-cyan/20 bg-neon-cyan/10">
                                        <Lightbulb size={14} className="text-neon-cyan" />
                                    </div>
                                    <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-neon-cyan">
                                        Solution
                                    </h4>
                                </div>
                                <p className="text-sm leading-relaxed text-slate-300">
                                    {dd.solution}
                                </p>
                            </div>

                            <div className="rounded-xl border border-border bg-surface/50 p-5">
                                <div className="mb-3 flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-neon-emerald/20 bg-neon-emerald/10">
                                        <Zap size={14} className="text-neon-emerald" />
                                    </div>
                                    <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-neon-emerald">
                                        Impact
                                    </h4>
                                </div>
                                <p className="text-sm leading-relaxed text-slate-300">
                                    {dd.impact}
                                </p>
                            </div>
                        </div>

                        {/* ModRes-specific: System Internals */}
                        {isModRes && (
                            <div>
                                <p className="mb-4 font-mono text-xs uppercase tracking-wider text-slate-500">
                                    Core Engines
                                </p>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {modresEngines.map((engine) => (
                                        <div
                                            key={engine.title}
                                            className="rounded-xl border border-border bg-[#0a0e14]/80 p-5"
                                        >
                                            <h4 className="mb-3 flex items-center gap-2 font-semibold text-white">
                                                <span>{engine.emoji}</span>
                                                {engine.title}
                                            </h4>
                                            <ul className="space-y-1.5">
                                                {engine.items.map((item) => (
                                                    <li
                                                        key={item.label}
                                                        className="flex items-baseline justify-between gap-2 text-sm"
                                                    >
                                                        <span className="text-slate-500">
                                                            {item.label}
                                                        </span>
                                                        <span className={`text-right font-mono text-xs ${item.color}`}>
                                                            {item.value}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                {/* Stack footer */}
                                <div className="mt-4 rounded-xl border border-border bg-[#0a0e14]/80 p-4">
                                    <p className="mb-2 text-sm font-semibold text-white">
                                        🏗️ Infrastructure
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {modresStack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded border border-border bg-surface-light/50 px-2.5 py-1 font-mono text-xs text-slate-400"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </>
    );
}
