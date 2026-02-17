"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Github as GithubIcon } from "lucide-react";
import { askGemini } from "@/app/actions/chat";

interface Message {
    role: "user" | "bot" | "system";
    text: string;
}

const QUICK_PROMPTS = [
    "What is ModRes?",
    "Tell me about his RAG expertise",
    "Education?",
    "Contact Info",
];

const INITIAL_MESSAGE: Message = {
    role: "bot",
    text: "Hi! I'm Vyshakh's AI assistant. Ask me about his projects, RAG expertise, or research! 🚀",
};

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);

    // Focus input when opened
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [open]);

    const sendMessage = useCallback(
        async (text: string) => {
            if (!text.trim() || loading) return;

            const userMsg: Message = { role: "user", text: text.trim() };
            setMessages((prev) => [...prev, userMsg]);
            setInput("");
            setLoading(true);

            const response = await askGemini(text.trim());
            const botMsg: Message = { role: "bot", text: response.text };
            setMessages((prev) => [...prev, botMsg]);
            setLoading(false);
        },
        [loading]
    );

    const fetchGitHubStats = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("https://api.github.com/users/vyshakhgnair");
            if (!res.ok) throw new Error("GitHub API error");
            const data = await res.json();
            const sysMsg: Message = {
                role: "system",
                text: `📊 GitHub Stats — ${data.public_repos} public repos • ${data.followers} followers • Latest activity on github.com/vyshakhgnair`,
            };
            setMessages((prev) => [...prev, sysMsg]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "system",
                    text: "Couldn't fetch GitHub stats right now. Visit github.com/vyshakhgnair directly!",
                },
            ]);
        }
        setLoading(false);
    }, []);

    return (
        <>
            {/* FAB — position above the ⌘K button */}
            <AnimatePresence>
                {!open && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setOpen(true)}
                        className="fixed bottom-20 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-neon-cyan/30 bg-surface/90 shadow-lg shadow-neon-cyan/10 backdrop-blur-xl transition-colors hover:border-neon-cyan/50 hover:shadow-neon-cyan/20"
                    >
                        <Sparkles size={22} className="text-neon-cyan" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed bottom-6 right-6 z-50 flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-[#0d1117]/98 shadow-2xl shadow-black/40 backdrop-blur-2xl max-[420px]:left-3 max-[420px]:right-3 max-[420px]:w-auto"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-border px-5 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-neon-cyan/20 bg-neon-cyan/10">
                                    <Sparkles size={16} className="text-neon-cyan" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white">
                                        Chat with Vyshakh
                                    </h3>
                                    <p className="text-[11px] text-slate-500">
                                        Powered by Gemini AI
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={fetchGitHubStats}
                                    disabled={loading}
                                    className="rounded-lg border border-border p-2 text-slate-400 transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan disabled:opacity-40"
                                    title="Fetch GitHub Stats"
                                >
                                    <GithubIcon size={14} />
                                </button>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="rounded-lg border border-border p-2 text-slate-400 transition-colors hover:border-neon-cyan/40 hover:text-white"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
                        >
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${msg.role === "user"
                                                ? "rounded-br-md bg-neon-cyan/15 text-neon-cyan"
                                                : msg.role === "system"
                                                    ? "rounded-bl-md border border-border bg-surface-light/50 font-mono text-xs text-slate-400"
                                                    : "rounded-bl-md bg-surface-light/80 text-slate-300"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-surface-light/80 px-4 py-3">
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Prompts */}
                        <div className="flex gap-2 overflow-x-auto border-t border-border px-4 py-3 scrollbar-hide">
                            {QUICK_PROMPTS.map((prompt) => (
                                <button
                                    key={prompt}
                                    onClick={() => sendMessage(prompt)}
                                    disabled={loading}
                                    className="shrink-0 rounded-full border border-border bg-surface/50 px-3 py-1.5 font-mono text-[11px] text-slate-400 transition-all hover:border-neon-cyan/30 hover:text-neon-cyan disabled:opacity-40"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="border-t border-border px-4 py-3">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    sendMessage(input);
                                }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask me anything..."
                                    disabled={loading}
                                    className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none disabled:opacity-40"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || loading}
                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-slate-400 transition-all hover:border-neon-cyan/40 hover:text-neon-cyan disabled:opacity-30"
                                >
                                    <Send size={14} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
