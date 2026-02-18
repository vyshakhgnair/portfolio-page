"use client";

import { motion } from "framer-motion";

interface FlowNode {
    label: string;
    x: number;
    y: number;
    accent?: "cyan" | "violet" | "emerald";
}

type ArchType = "modres" | "fusion";

const accentColors = {
    cyan: { fill: "rgba(6,182,212,0.12)", stroke: "rgba(6,182,212,0.4)", text: "rgba(6,182,212,0.95)" },
    violet: { fill: "rgba(139,92,246,0.12)", stroke: "rgba(139,92,246,0.4)", text: "rgba(139,92,246,0.95)" },
    emerald: { fill: "rgba(16,185,129,0.12)", stroke: "rgba(16,185,129,0.4)", text: "rgba(16,185,129,0.95)" },
};

const architectures: Record<ArchType, { nodes: FlowNode[]; edges: [number, number][] }> = {
    modres: {
        nodes: [
            { label: "User", x: 60, y: 55, accent: "cyan" },
            { label: "API Gateway", x: 190, y: 55, accent: "cyan" },
            { label: "Agent Router", x: 320, y: 55, accent: "violet" },
            { label: "LLM", x: 440, y: 30, accent: "emerald" },
            { label: "Vector DB", x: 440, y: 80, accent: "emerald" },
        ],
        edges: [
            [0, 1],
            [1, 2],
            [2, 3],
            [2, 4],
        ],
    },
    fusion: {
        nodes: [
            { label: "SMILES", x: 60, y: 30, accent: "cyan" },
            { label: "Mol Graph", x: 60, y: 80, accent: "cyan" },
            { label: "Transformer", x: 200, y: 30, accent: "violet" },
            { label: "GNN", x: 200, y: 80, accent: "violet" },
            { label: "Fusion", x: 340, y: 55, accent: "emerald" },
            { label: "Predict", x: 450, y: 55, accent: "emerald" },
        ],
        edges: [
            [0, 2],
            [1, 3],
            [2, 4],
            [3, 4],
            [4, 5],
        ],
    },
};

export default function ArchitectureFlow({ type }: { type: ArchType }) {
    const arch = architectures[type];
    const nodeW = 90;
    const nodeH = 30;
    const nodeR = 10;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-3 w-full rounded-xl border border-border bg-[#0a0e14]/60 p-2 sm:p-4"
        >
            <svg
                viewBox="0 0 510 110"
                className="w-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <marker
                        id={`arrow-${type}`}
                        markerWidth="7"
                        markerHeight="5"
                        refX="6"
                        refY="2.5"
                        orient="auto"
                    >
                        <path d="M0,0 L7,2.5 L0,5" fill="rgba(148,163,184,0.4)" />
                    </marker>
                    <filter id={`nodeGlow-${type}`}>
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Edges — drawn first so nodes render on top */}
                {arch.edges.map(([from, to], idx) => {
                    const a = arch.nodes[from];
                    const b = arch.nodes[to];
                    // Start from right edge of source node, end at left edge of target node
                    const x1 = a.x + nodeW / 2;
                    const y1 = a.y;
                    const x2 = b.x - nodeW / 2;
                    const y2 = b.y;

                    return (
                        <motion.line
                            key={`edge-${idx}`}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="rgba(148,163,184,0.2)"
                            strokeWidth="1.5"
                            strokeDasharray="4 3"
                            markerEnd={`url(#arrow-${type})`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                        />
                    );
                })}

                {/* Nodes */}
                {arch.nodes.map((node, idx) => {
                    const colors = accentColors[node.accent || "cyan"];
                    return (
                        <motion.g
                            key={idx}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: idx * 0.08 }}
                        >
                            <rect
                                x={node.x - nodeW / 2}
                                y={node.y - nodeH / 2}
                                width={nodeW}
                                height={nodeH}
                                rx={nodeR}
                                fill={colors.fill}
                                stroke={colors.stroke}
                                strokeWidth="1"
                            />
                            <text
                                x={node.x}
                                y={node.y + 4}
                                textAnchor="middle"
                                fill={colors.text}
                                fontSize="10"
                                fontFamily="var(--font-mono), monospace"
                                fontWeight="500"
                            >
                                {node.label}
                            </text>
                        </motion.g>
                    );
                })}
            </svg>
        </motion.div>
    );
}
