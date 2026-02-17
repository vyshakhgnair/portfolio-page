import {
    Github,
    Linkedin,
    Trophy,
    Medal,
    Award,
    GraduationCap,
    Mic,
    Gamepad2,
    Camera,
} from "lucide-react";

// ── Site Config ──────────────────────────────────
export const siteConfig = {
    name: "Vyshakh G Nair",
    title: "Vyshakh G Nair — AI/ML Engineer | Agentic AI & LLMs",
    description:
        "AI/ML Engineer specializing in Agentic Workflows, Scalable RAG Systems, and LLMs.",
};

// ── Navigation ───────────────────────────────────
export const navLinks = [
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Research", href: "#research" },
    { label: "Achievements", href: "#achievements" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

// ── Hero ─────────────────────────────────────────
export const hero = {
    headline: "Architecting Intelligence.",
    subHeadline:
        "AI/ML Engineer specializing in Agentic Workflows, Scalable RAG Systems, and LLMs.",
    primaryCta: { label: "View Projects", href: "#projects" },
    secondaryCta: { label: "Download Resume", href: "/resume.pdf" },
};

// ── Socials ──────────────────────────────────────
export const socials = [
    { label: "GitHub", href: "https://github.com/vyshakhgnair", icon: Github },
    {
        label: "LinkedIn",
        href: "https://linkedin.com/in/vyshakhgnair",
        icon: Linkedin,
    },
    { label: "Kaggle", href: "https://kaggle.com/vyshakhgnair", icon: Trophy },
];

// ── Experience ───────────────────────────────────
export const experience = [
    {
        role: "AI/ML Engineer",
        company: "Rappit",
        period: "Jul 2024 — Present",
        bullets: [
            "Architected enterprise RAG pipelines using Gemini APIs & LangGraph.",
            "Scaled document automation 5x across the platform.",
        ],
        focus: ["Multi-Agent Workflows", "Complex Reasoning"],
        accent: "cyan" as const,
    },
    {
        role: "Software Engineer Intern",
        company: "Saint-Gobain",
        period: "May 2023 — Oct 2023",
        bullets: [
            "Optimized enterprise data workflows by 60% via a QR-based tracking system integrated with PostgreSQL.",
            "Built responsive front-end applications using React.",
        ],
        focus: ["Data Workflows", "React"],
        accent: "violet" as const,
    },
    {
        role: "Software Head",
        company: "Corr Robotics",
        period: "Sept 2022 — May 2024",
        bullets: [
            "Led SDLC and built control OS using Python and Vue.js.",
            "Applied ESRGAN (Computer Vision) to enhance underwater ROV performance in low-light conditions.",
        ],
        focus: ["Computer Vision", "Robotics"],
        accent: "emerald" as const,
    },
];

// ── Education ────────────────────────────────────
export const education = [
    {
        degree: "B.Tech in Computer Science & Engineering",
        institution: "NSS College of Engineering, Palakkad",
        period: "2020 — 2024",
        icon: GraduationCap,
    },
    {
        degree: "B.Sc in Data Science",
        institution: "IIT Madras",
        period: "2021 — 2024",
        icon: GraduationCap,
    },
];

// ── System Internals (for ModRes deep dive) ──────
export interface SystemEngine {
    emoji: string;
    title: string;
    items: { label: string; value: string; color: string }[];
}

export const modresEngines: SystemEngine[] = [
    {
        emoji: "📄",
        title: "Resume Engine",
        items: [
            { label: "Templating", value: "Jinja2 → LaTeX → PDF", color: "text-neon-cyan" },
            { label: "Templates", value: "10 Styles (Ivy, FAANG, Hacker)", color: "text-slate-300" },
            { label: "Renderer", value: "Server-side LaTeX Compiler", color: "text-slate-300" },
        ],
    },
    {
        emoji: "🧠",
        title: "Interview Agent",
        items: [
            { label: "Model", value: "Gemini 2.0 Flash-Lite", color: "text-green-400" },
            { label: "TTS", value: "Edge Neural (Azure)", color: "text-blue-400" },
            { label: "Latency", value: "~1.2s (Streaming)", color: "text-yellow-400" },
            { label: "Visualizer", value: "Web Audio API → Canvas (60fps)", color: "text-slate-300" },
        ],
    },
    {
        emoji: "🕷️",
        title: "Job Harvester",
        items: [
            { label: "Scraper", value: "python-jobspy", color: "text-neon-violet" },
            { label: "Schedule", value: "Vercel Cron @ 00:00 UTC", color: "text-slate-300" },
            { label: "Sources", value: "LinkedIn, Indeed, Glassdoor", color: "text-slate-300" },
        ],
    },
    {
        emoji: "🎨",
        title: "Portfolio Builder",
        items: [
            { label: "Mechanism", value: "Vue Dynamic Components", color: "text-neon-cyan" },
            { label: "Themes", value: "Terminal, Bento, Neo-Brutalist", color: "text-slate-300" },
            { label: "Routing", value: "/p/:username (Public)", color: "text-slate-300" },
        ],
    },
];

export const modresStack = ["Vue 3", "Flask", "SQLAlchemy", "Tailwind CSS", "Vercel"];

// ── Project Detail (for Deep-Dive Modals) ────────
export interface ProjectDetail {
    title: string;
    hook: string;
    description: string;
    stack: string[];
    link?: string;
    github?: string;
    deepDive?: {
        problem: string;
        solution: string;
        impact: string;
    };
}

// ── Projects — Applications (Product Engineering) ─
export const applicationProjects: ProjectDetail[] = [
    {
        title: "ModRes",
        hook: "AI Career Architect",
        description:
            "End-to-end platform for dynamic resume optimization and Agentic mock interviews.",
        stack: ["LLMs", "Python", "Flask", "Supabase", "Vue.js"],
        link: "https://mod-res.vercel.app/",
        github: "https://github.com/vyshakhgnair",
        deepDive: {
            problem:
                "Manual resume reviews are slow, subjective, and fail to adapt to specific job requirements — leaving candidates guessing.",
            solution:
                "Engineered an Agentic workflow using LLMs to simulate interviewer logic. The system parses resumes, matches against job descriptions, and generates hyper-personalized interview questions.",
            impact: "Processed 500+ resumes with <2s latency per analysis cycle.",
        },
    },
    {
        title: "Smart Doc Parser",
        hook: "FinTech",
        description:
            "Automated financial data extraction system with Tally integration and batch verification.",
        stack: ["FastAPI", "Gemini API", "SQLite"],
        github: "https://github.com/vyshakhgnair",
        deepDive: {
            problem:
                "Manual data entry from thousands of financial documents is error-prone and costs hundreds of hours per quarter.",
            solution:
                "Built a FastAPI service leveraging Gemini's multimodal capabilities to extract structured data from invoices, receipts, and statements — with a batch verification pipeline.",
            impact: "Automated 1,200+ document extractions with 98% field-level accuracy.",
        },
    },
];

// ── Projects — R&D Implementations (Core ML/DL) ──
export const rdProjects: ProjectDetail[] = [
    {
        title: "Radar Vision",
        hook: "DDPM",
        description:
            "Statistical modeling pipeline using Denoising Diffusion Probabilistic Models (DDPM) for radar signal estimation.",
        stack: ["PyTorch", "Diffusers", "UNet"],
        github: "https://github.com/vyshakhgnair",
        deepDive: {
            problem:
                "Traditional radar signal processing struggles with noise estimation in low signal-to-noise ratio (SNR) environments.",
            solution:
                "Implemented a UNet-based DDPM that learns the forward noise distribution and iteratively denoises radar returns, achieving robust target estimation even at -10dB SNR.",
            impact: "Achieved 95% accuracy in low-SNR environments, outperforming classical matched filters by 18%.",
        },
    },
    {
        title: "Target Detection Framework",
        hook: "GANs",
        description:
            "GAN-based framework for distinguishing single vs. multiple targets under extreme noise conditions.",
        stack: ["PyTorch", "scikit-learn"],
        github: "https://github.com/vyshakhgnair",
    },
];

// ── Publications ─────────────────────────────────
export const publications = [
    {
        title:
            "Enhancing Molecular Property Prediction by Fusing Graph and Sequence Encoder Representations",
        shortTitle: "Fusion Learning for Drug Discovery",
        venue: "Springer KAIS Journal",
        year: 2024,
        summary:
            "Designed a fusion framework combining molecular graphs and SMILES sequences for enhanced drug property prediction.",
        link: "https://link.springer.com/article/10.1007/s10115-025-02514-2",
        code: "https://github.com/vyshakhgnair/TraGT",
        type: "Journal" as const,
    },
    {
        title: "Optimizing Drug Discovery",
        shortTitle: "Optimizing Drug Discovery",
        venue: "IEEE ICIC3S Conference",
        year: 2024,
        summary:
            "Proposed hybrid Transformer-GNN architecture for drug property prediction.",
        link: "https://ieeexplore.ieee.org/document/10603258",
        type: "Conference" as const,
    },
];

// ── Achievements ─────────────────────────────────
export const achievements = [
    {
        icon: Medal,
        title: "2nd Place",
        detail: "Rappit Agentic AI Hackathon 2024",
        accent: "cyan" as const,
    },
    {
        icon: Trophy,
        title: "1st Prize",
        detail: "Techfest-2024 — Green Rehab Challenge, IEEE Kerala",
        accent: "violet" as const,
    },
    {
        icon: Award,
        title: "3rd Prize",
        detail: "KETCON 2024 — Paper Presentation, CS Track",
        accent: "emerald" as const,
    },
    {
        icon: Award,
        title: "Best All-Rounder Award",
        detail: "2020-24 Batch, CSE at NSS College of Engineering",
        accent: "blue" as const,
    },
];

// ── Skills (4 domains, showing depth) ────────────
export const skills = {
    "Deep Learning & GenAI": [
        "Generative AI (LLMs, RAG, Agents)",
        "Computer Vision (GANs, Diffusers/DDPM)",
        "Graph Neural Networks (GNN, GCNs)",
        "Sequential Models (RNNs to Bidirectional Transformers)",
        "Reinforcement Learning (RL)",
    ],
    "Machine Learning & MLOps": [
        "Algorithms (Regression, SVM, Random Forest, Boosting, Bagging)",
        "MLOps (Pipeline Automation)",
        "Statistical Modeling",
    ],
    "Frameworks & Cloud": [
        "PyTorch",
        "TensorFlow",
        "Keras",
        "GCP (Vertex AI, Cloud Run)",
        "Docker",
        "Git",
    ],
    "Languages & Backend": [
        "Python",
        "SQL",
        "Java",
        "C++",
        "FastAPI",
        "Flask",
        "Supabase",
        "PostgreSQL",
    ],
};

// ── Beyond the Terminal ──────────────────────────
export const beyondCards = [
    {
        icon: Mic,
        title: "The Vocalist",
        description: "I enjoy singing and exploring music.",
    },
    {
        icon: Gamepad2,
        title: "The Gamer",
        description: "Tactical shooter enthusiast (Valorant).",
    },
    {
        icon: Camera,
        title: "The Creator",
        description: "Photography hobbyist capturing nature and people.",
    },
];

// ── Contact ──────────────────────────────────────
export const contact = {
    email: "vyshakhgnair.cvr@gmail.com",
    location: "Kerala, India",
};
