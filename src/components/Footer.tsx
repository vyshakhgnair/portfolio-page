"use client";

import { siteConfig, socials, contact } from "@/constants";
import { Copy } from "lucide-react";
import { useToast } from "./Toast";

export default function Footer() {
    const { toast } = useToast();

    const copyEmail = () => {
        navigator.clipboard.writeText(contact.email);
        toast("Email copied to clipboard!");
    };

    return (
        <footer className="border-t border-border py-10">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 sm:flex-row sm:justify-between">
                {/* Left — name + email */}
                <div className="flex flex-col items-center gap-2 sm:items-start">
                    <p className="font-mono text-xs text-muted">
                        &copy; {new Date().getFullYear()}{" "}
                        <span className="text-foreground">{siteConfig.name}</span>
                    </p>
                    <button
                        onClick={copyEmail}
                        className="group inline-flex items-center gap-1.5 break-all font-mono text-xs text-muted transition-colors hover:text-neon-cyan"
                    >
                        {contact.email}
                        <Copy
                            size={12}
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                        />
                    </button>
                </div>

                {/* Right — socials */}
                <div className="flex items-center gap-4">
                    {socials.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="text-muted transition-colors duration-200 hover:text-neon-cyan"
                        >
                            <social.icon size={16} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
