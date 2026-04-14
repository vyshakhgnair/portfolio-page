"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Briefcase,
    FlaskConical,
    Award,
    Wrench,
    Mail,
    Github,
    Linkedin,
    Trophy,
    Download,
    Search,
    Moon,
    Sun,
} from "lucide-react";

type Action = {
    id: string;
    label: string;
    icon: React.ElementType;
    group: string;
    onSelect: () => void;
};

export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    // Cmd+K / Ctrl+K listener
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((o) => !o);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const scrollTo = (id: string) => {
        setOpen(false);
        setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const actions: Action[] = [
        // Navigation
        {
            id: "experience",
            label: "Go to Experience",
            icon: Briefcase,
            group: "Navigation",
            onSelect: () => scrollTo("experience"),
        },
        {
            id: "projects",
            label: "Go to Projects",
            icon: FlaskConical,
            group: "Navigation",
            onSelect: () => scrollTo("projects"),
        },
        {
            id: "research",
            label: "Go to Research",
            icon: FlaskConical,
            group: "Navigation",
            onSelect: () => scrollTo("research"),
        },
        {
            id: "achievements",
            label: "Go to Achievements",
            icon: Award,
            group: "Navigation",
            onSelect: () => scrollTo("achievements"),
        },
        {
            id: "skills",
            label: "Go to Skills",
            icon: Wrench,
            group: "Navigation",
            onSelect: () => scrollTo("skills"),
        },
        {
            id: "contact",
            label: "Go to Contact",
            icon: Mail,
            group: "Navigation",
            onSelect: () => scrollTo("contact"),
        },
        // Socials
        {
            id: "github",
            label: "Open GitHub",
            icon: Github,
            group: "Socials",
            onSelect: () => {
                setOpen(false);
                window.open("https://github.com/vyshakhgnair", "_blank");
            },
        },
        {
            id: "linkedin",
            label: "Open LinkedIn",
            icon: Linkedin,
            group: "Socials",
            onSelect: () => {
                setOpen(false);
                window.open("https://www.linkedin.com/in/vyshakh-g-nair-2002/", "_blank");
            },
        },
        {
            id: "kaggle",
            label: "Open Kaggle",
            icon: Trophy,
            group: "Socials",
            onSelect: () => {
                setOpen(false);
                window.open("https://kaggle.com/vyshakhgnair", "_blank");
            },
        },
        {
            id: "email",
            label: "Email Me",
            icon: Mail,
            group: "Socials",
            onSelect: () => {
                setOpen(false);
                window.location.href = "mailto:vyshakhgnair.cvr@gmail.com";
            },
        },
        // Assets
        {
            id: "resume",
            label: "Download Resume",
            icon: Download,
            group: "Assets",
            onSelect: () => {
                setOpen(false);
                window.open("/resume.pdf", "_blank");
            },
        },
        // Theme
        {
            id: "theme",
            label: "Toggle Dark Mode",
            icon: Moon,
            group: "Theme",
            onSelect: () => {
                setOpen(false);
                // placeholder — site is already dark-only
            },
        },
    ];

    return (
        <>
            {/* Floating hint button — compact on mobile */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-2 font-mono text-xs text-slate-400 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-neon-cyan/40 hover:text-neon-cyan hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] sm:px-4 sm:py-2.5"
            >
                <Search size={14} />
                <span className="hidden sm:inline">Press</span>
                <kbd className="rounded border border-border bg-surface-light px-1.5 py-0.5 font-mono text-[10px] text-slate-300">
                    ⌘K
                </kbd>
            </button>

            {/* Command palette */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                            onClick={() => setOpen(false)}
                        />

                        {/* Dialog — closer to top on mobile */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: -10 }}
                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed left-1/2 z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 top-[12vh] sm:top-[20vh]"
                        >
                            <Command
                                className="overflow-hidden rounded-2xl border border-border bg-[#0d1117]/95 shadow-2xl shadow-black/40 backdrop-blur-2xl"
                                label="Command palette"
                            >
                                {/* Search input */}
                                <div className="flex items-center gap-3 border-b border-border px-4">
                                    <Search size={16} className="shrink-0 text-slate-400" />
                                    <Command.Input
                                        value={search}
                                        onValueChange={setSearch}
                                        placeholder="Type a command or search…"
                                        className="h-12 w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none sm:h-14"
                                    />
                                    <kbd
                                        onClick={() => setOpen(false)}
                                        className="cursor-pointer rounded border border-border bg-surface-light px-1.5 py-0.5 font-mono text-[10px] text-slate-400 transition-colors hover:text-white"
                                    >
                                        ESC
                                    </kbd>
                                </div>

                                {/* Results */}
                                <Command.List className="max-h-[50vh] overflow-y-auto p-2 sm:max-h-72">
                                    <Command.Empty className="py-8 text-center text-sm text-slate-500">
                                        No results found.
                                    </Command.Empty>

                                    {["Navigation", "Socials", "Assets", "Theme"].map(
                                        (group) => {
                                            const groupActions = actions.filter(
                                                (a) => a.group === group
                                            );
                                            if (groupActions.length === 0) return null;
                                            return (
                                                <Command.Group
                                                    key={group}
                                                    heading={group}
                                                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-slate-500"
                                                >
                                                    {groupActions.map((action) => (
                                                        <Command.Item
                                                            key={action.id}
                                                            value={action.label}
                                                            onSelect={action.onSelect}
                                                            className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition-colors duration-150 data-[selected=true]:bg-neon-cyan/10 data-[selected=true]:text-neon-cyan"
                                                        >
                                                            <action.icon size={16} className="shrink-0" />
                                                            {action.label}
                                                        </Command.Item>
                                                    ))}
                                                </Command.Group>
                                            );
                                        }
                                    )}
                                </Command.List>
                            </Command>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
