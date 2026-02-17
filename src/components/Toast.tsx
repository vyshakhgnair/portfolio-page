"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { CheckCircle } from "lucide-react";

interface ToastContextType {
    toast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => { } });

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [message, setMessage] = useState<string | null>(null);
    const [exiting, setExiting] = useState(false);

    const toast = useCallback((msg: string) => {
        setExiting(false);
        setMessage(msg);
        setTimeout(() => {
            setExiting(true);
            setTimeout(() => setMessage(null), 300);
        }, 2500);
    }, []);

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            {message && (
                <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2">
                    <div
                        className={`glass-strong flex items-center gap-2 rounded-full px-5 py-3 font-mono text-sm text-neon-cyan shadow-lg shadow-neon-cyan/10 ${exiting ? "toast-exit" : "toast-enter"
                            }`}
                    >
                        <CheckCircle size={16} className="text-neon-emerald" />
                        {message}
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
}
