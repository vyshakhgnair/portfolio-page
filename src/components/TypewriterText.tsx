"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
}

export default function TypewriterText({
    text,
    className = "",
    speed = 40,
    delay = 800,
}: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        if (displayedText.length >= text.length) {
            setDone(true);
            return;
        }
        const timer = setTimeout(() => {
            setDisplayedText(text.slice(0, displayedText.length + 1));
        }, speed);
        return () => clearTimeout(timer);
    }, [started, displayedText, text, speed]);

    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={className}
        >
            {displayedText}
            {!done && (
                <span className="cursor-blink ml-0.5 inline-block h-[1em] w-[3px] translate-y-[2px] bg-neon-cyan" />
            )}
        </motion.span>
    );
}
