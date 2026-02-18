"use client";

import { applicationProjects, rdProjects } from "@/constants";
import type { ProjectDetail } from "@/constants";
import AnimatedSection from "./AnimatedSection";
import ArchitectureFlow from "./ArchitectureFlow";
import ProjectModal from "./ProjectModal";
import { ExternalLink, Github, Layers, AlignLeft } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useState, useRef, useEffect } from "react";

type Tab = "applications" | "rnd";

const tabs: { key: Tab; label: string }[] = [
    { key: "applications", label: "Applications" },
    { key: "rnd", label: "R&D Implementations" },
];

// Map project titles to architecture diagram types
const archMap: Record<string, "modres" | "fusion"> = {
    ModRes: "modres",
};

function ProjectCard({
    project,
    idx,
    onOpenModal,
}: {
    project: ProjectDetail;
    idx: number;
    onOpenModal: (project: ProjectDetail) => void;
}) {
    const [showArch, setShowArch] = useState(false);
    const archType = archMap[project.title];
    const cardId = `project-card-${project.title.replace(/\s+/g, "-").toLowerCase()}`;

    return (
        <AnimatedSection delay={idx * 0.1}>
            <motion.div
                layoutId={cardId}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="glass group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:border-neon-cyan/30 hover:glow-border"
                onClick={() => {
                    if (project.deepDive) onOpenModal(project);
                }}
            >
                {/* Top accent line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white">{project.title}</h3>
                            <p className="mt-0.5 font-mono text-xs text-neon-violet">
                                {project.hook}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {/* Architecture toggle */}
                            {archType && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowArch(!showArch);
                                    }}
                                    className={`rounded-lg border p-2 transition-all duration-200 ${showArch
                                        ? "border-neon-cyan/40 text-neon-cyan"
                                        : "border-border text-slate-400 hover:border-neon-cyan/40 hover:text-neon-cyan"
                                        }`}
                                    aria-label={
                                        showArch ? "Show description" : "Show architecture"
                                    }
                                    title={showArch ? "Description" : "Architecture"}
                                >
                                    {showArch ? <AlignLeft size={16} /> : <Layers size={16} />}
                                </button>
                            )}
                            {project.github && (
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="rounded-lg border border-border p-2 text-slate-400 transition-all duration-200 hover:border-neon-cyan/40 hover:text-neon-cyan"
                                    aria-label="View code"
                                >
                                    <Github size={16} />
                                </a>
                            )}
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="rounded-lg border border-border p-2 text-slate-400 transition-all duration-200 hover:border-neon-cyan/40 hover:text-neon-cyan"
                                    aria-label="View project"
                                >
                                    <ExternalLink size={16} />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Description or Architecture view */}
                    <div className="mb-6 flex-1">
                        {showArch && archType ? (
                            <div>
                                <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                                    System Architecture
                                </p>
                                <ArchitectureFlow type={archType} />
                            </div>
                        ) : (
                            <p className="text-sm leading-relaxed text-slate-300">
                                {project.description}
                            </p>
                        )}
                    </div>

                    {/* Stack pills + Deep Dive hint */}
                    <div className="flex items-end justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-full border border-border bg-surface-light/50 px-3 py-1 font-mono text-[11px] text-slate-400 transition-colors duration-200 group-hover:border-neon-cyan/20 group-hover:text-neon-cyan/80"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                        {project.deepDive && (
                            <span className="whitespace-nowrap font-mono text-[10px] text-slate-500 transition-colors group-hover:text-neon-cyan/60">
                                Click to deep dive →
                            </span>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatedSection>
    );
}

export default function ProjectsResearch() {
    const [activeTab, setActiveTab] = useState<Tab>("applications");
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(
        null
    );
    const tabsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tabEl = tabsRef.current?.querySelector(
            `[data-tab="${activeTab}"]`
        ) as HTMLElement | null;
        if (tabEl) {
            setIndicatorStyle({
                left: tabEl.offsetLeft,
                width: tabEl.offsetWidth,
            });
        }
    }, [activeTab]);

    const currentProjects =
        activeTab === "applications" ? applicationProjects : rdProjects;

    return (
        <section id="projects" className="relative py-24 sm:py-32">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-neon-cyan/3 blur-[160px]" />

            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <AnimatedSection>
                    <div className="mb-14 max-w-2xl">
                        <p className="mb-3 font-mono text-sm tracking-wider text-neon-cyan">
                            PROJECTS
                        </p>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                            Built to{" "}
                            <span className="gradient-text">solve real problems</span>.
                        </h2>
                    </div>
                </AnimatedSection>

                {/* Tabs */}
                <AnimatedSection delay={0.1}>
                    <div className="relative mb-10">
                        <div
                            ref={tabsRef}
                            className="relative inline-flex gap-1 rounded-xl border border-border bg-surface/50 p-1"
                        >
                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    data-tab={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`relative z-10 rounded-lg px-5 py-2.5 font-mono text-sm font-medium transition-all duration-300 ${activeTab === tab.key
                                        ? "text-white"
                                        : "text-slate-400 hover:text-slate-200"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                            <div
                                className="tab-indicator absolute top-1 h-[calc(100%-8px)] rounded-lg border border-neon-cyan/20 bg-surface-light shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                                style={{
                                    left: indicatorStyle.left,
                                    width: indicatorStyle.width,
                                }}
                            />
                        </div>
                    </div>
                </AnimatedSection>

                {/* Project Cards */}
                <LayoutGroup>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 gap-5 md:grid-cols-2"
                    >
                        {currentProjects.map((project, idx) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                                idx={idx}
                                onOpenModal={setSelectedProject}
                            />
                        ))}
                    </motion.div>

                    {/* Modal */}
                    <AnimatePresence>
                        {selectedProject && (
                            <ProjectModal
                                project={selectedProject}
                                layoutId={`project-card-${selectedProject.title.replace(/\s+/g, "-").toLowerCase()}`}
                                onClose={() => setSelectedProject(null)}
                            />
                        )}
                    </AnimatePresence>
                </LayoutGroup>
            </div>

            <div className="section-divider mx-auto mt-24 max-w-4xl sm:mt-32" />
        </section>
    );
}
