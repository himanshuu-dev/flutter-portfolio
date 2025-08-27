"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// =============================================================
// app/page.tsx — Futuristic Portfolio (No Testimonials)
// Tailwind required, darkMode: 'class'. Single-file drop-in.
// =============================================================

// ---------- Icons ----------
const Icon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
    const stroke = 1.8;
    const common = {
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        strokeWidth: stroke,
    };
    const paths: Record<string, React.ReactNode> = {
        sun: <circle cx="12" cy="12" r="4" {...(common as any)} />,
        moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" {...(common as any)} />,
        bolt: <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" {...(common as any)} />,
        code: <path d="M9 18l-6-6 6-6M15 6l6 6-6 6" {...(common as any)} />,
        sparkles: <path d="M5 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4zM19 11l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" {...(common as any)} />,
        link: <path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L10.5 5" {...(common as any)} />,
        briefcase: <path d="M3 7h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zm5-4h8a2 2 0 0 1 2 2v2H6V5a2 2 0 0 1 2-2z" {...(common as any)} />,
        mail: <path d="M3 5h18v14H3z" {...(common as any)} />,
        send: <path d="M22 2L11 13" {...(common as any)} />,
        star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" {...(common as any)} />,
        check: <path d="M20 6L9 17l-5-5" {...(common as any)} />,
        android: <path d="M8 3l1 2m6-2l-1 2M6 8h12v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8z" {...(common as any)} />,
        apple: <path d="M16 13c0 3-2 7-4 7s-4-4-4-7 2-5 4-5 4 2 4 5zm1-7c-.7 1-2 2-3 2-1 0-2-1-2-2 0-.8.6-1.9 1.3-2.6C14.5 2.7 15.6 2 16.4 2c.2 0 .4 0 .6.1-.1.9-.5 1.8-1 2.9z" {...(common as any)} />,
        ts: <path d="M3 5h18v14H3z" {...(common as any)} />,
        tailwind: <path d="M4 14c2-6 6-6 8-4s4 2 8-2c-2 6-6 6-8 4s-4-2-8 2z" {...(common as any)} />,
        firebase: <path d="M6 19L12 3l6 16-6 2z" {...(common as any)} />,
    };
    return (
        <svg viewBox="0 0 24 24" className={className || "w-5 h-5"} aria-hidden>
            {paths[name] || paths["sparkles"]}
        </svg>
    );
};

// ---------- Theme ----------
const useTheme = () => {
    const [theme, setTheme] = useState<"light" | "dark">("dark");
    useEffect(() => {
        const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as "light" | "dark" | null;
        const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial = stored || (prefersDark ? "dark" : "light");
        setTheme(initial);
        if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", initial === "dark");
    }, []);
    const toggle = () => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", next === "dark");
        if (typeof window !== "undefined") localStorage.setItem("theme", next);
    };
    return { theme, toggle };
};

// ---------- Parallax ----------
function useParallax(mult = 20) {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const onMove = (e: MouseEvent) => {
            const { innerWidth: w, innerHeight: h } = window;
            const x = (e.clientX - w / 2) / w;
            const y = (e.clientY - h / 2) / h;
            el.style.transform = `translate3d(${x * mult}px, ${y * mult}px, 0)`;
        };
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, [mult]);
    return ref;
}

// ---------- UI Primitives ----------
const Chip: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
    <span className={`inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs backdrop-blur-md shadow-sm dark:border-white/10 dark:bg-white/5 ${className || ""}`}>
        <Icon name="sparkles" className="w-3.5 h-3.5" />
        {children}
    </span>
);

const Glass: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
    <div className={`rounded-2xl border border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${className || ""}`}>{children}</div>
);

// ---------- Data ----------
const DATA = {
    name: "Himanshu Choudhary",
    role: "Flutter Developer • Full‑Stack Learner",
    about: "Flutter developer with 2.5+ years experience, focused on clean architecture, Riverpod state, and delightful UX. Built 20+ shipped projects with 99% quick response across clients.",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=800&auto=format&fit=crop",
    stats: [
        { label: "Years", value: "2.5+" },
        { label: "Projects", value: "20+" },
        { label: "Response", value: "99%" },
    ],
    projects: [
        { title: "Patient Health Records App", desc: "Secure EHR viewer with Riverpod, bottom sheets, filtering, and unit toggles.", tags: ["Flutter", "Riverpod", "Security"], image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop", playstore: "#", appstore: "#" },
        { title: "InstantSaver", desc: "Instagram reels & photo saver with repost workflows and clean UX.", tags: ["Flutter", "Dart", "Android"], image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop", playstore: "#", appstore: "#" },
        { title: "Portfolio v3", desc: "Next.js + Tailwind personal site with glass morphism & parallax.", tags: ["Next.js", "TypeScript", "Tailwind"], image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop", playstore: "#", appstore: "#" },
    ],
    experience: [
        {
            company: "Freelance", role: "Flutter Developer", period: "2023 — Present", points: [
                "Shipped 20+ client apps with scalable architectures and pixel-perfect UIs.",
                "Integrated analytics, crash reporting, and secure storage best practices.",
                "Automated CI/CD with Play Console delivery and fastlane.",
            ]
        },
        {
            company: "Open Source", role: "Contributor", period: "2022 — Present", points: [
                "Built widgets (Height/Weight selectors) with custom rulers and unit toggles.",
                "Auth flows with Flutter Secure Storage and token lifecycle handling.",
            ]
        },
    ],
};

// ---------- Backgrounds ----------
const Stars: React.FC = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const el = ref.current; if (!el) return;
        const dots = 100;
        const children: HTMLSpanElement[] = [];
        for (let i = 0; i < dots; i++) {
            const s = document.createElement('span');
            s.className = 'absolute rounded-full bg-white/60 dark:bg-white/80';
            const size = Math.random() * 2 + 1;
            s.style.width = `${size}px`;
            s.style.height = `${size}px`;
            s.style.left = `${Math.random() * 100}%`;
            s.style.top = `${Math.random() * 100}%`;
            s.style.opacity = String(Math.random() * 0.7 + 0.3);
            s.animate([{ transform: 'translateY(0px)' }, { transform: `translateY(${Math.random() * -20 - 5}px)` }], { duration: 3000 + Math.random() * 4000, direction: 'alternate', iterations: Infinity });
            el.appendChild(s); children.push(s);
        }
        return () => { children.forEach(c => c.remove()); };
    }, []);
    return <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" />;
};

// --- Skills data with external logo URLs ---
const SKILLS: { name: string; logo: string; hint?: string }[] = [
    { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    { name: "Dart", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
    { name: "GoRouter", logo: "https://cdn.simpleicons.org/flutter/02569B", hint: "Flutter routing" },
    { name: "Riverpod", logo: "https://cdn.simpleicons.org/flutter/02569B", hint: "State management" },
    { name: "Bloc", logo: "https://cdn.simpleicons.org/flutter/02569B", hint: "State management" },
    { name: "GetX", logo: "https://cdn.simpleicons.org/flutter/02569B", hint: "State management" },
    { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "Supabase", logo: "https://cdn.simpleicons.org/supabase/3FCF8E" },
    { name: "SQLite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
    { name: "Hive", logo: "https://cdn.simpleicons.org/flutter/02569B", hint: "Local DB" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
    { name: "REST APIs", logo: "https://cdn.simpleicons.org/openapiinitiative/6BA539" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "CI/CD", logo: "https://cdn.simpleicons.org/githubactions/2088FF" },
];

// --- Skills Grid component ---
const SkillsGrid: React.FC = () => {
    return (
        <Glass className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {SKILLS.map((s) => (
                    <div key={s.name} title={s.hint || s.name} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur hover:-translate-y-0.5 transition [transform-style:preserve-3d] [perspective:800px]">
                        <div className="flex items-center gap-3 p-3">
                            <Image src={s.logo} alt={`${s.name} logo`} width={24} height={24} className="h-6 w-6 object-contain select-none" />
                            <span className="text-sm">{s.name}</span>
                        </div>
                        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-fuchsia-500/10 via-cyan-400/10 to-emerald-400/10" />
                    </div>
                ))}
            </div>
        </Glass>
    );
};

// ---------- Page ----------
export default function Page() {
    const { theme, toggle } = useTheme();
    const parallaxRef = useParallax(12);
    const [toast, setToast] = useState<null | { title: string; desc: string }>(null);
    const [sending, setSending] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const name = String(fd.get('name') || '').trim();
        const email = String(fd.get('email') || '').trim();
        const subject = String(fd.get('subject') || '').trim();
        const message = String(fd.get('message') || '').trim();
        if (!name || !email || !subject || !message) { setToast({ title: "Missing fields", desc: "Please fill out all required fields." }); return; }
        setSending(true); setTimeout(() => { setSending(false); setToast({ title: "Message sent", desc: "Thanks! I’ll reply within hours." }); (e.target as HTMLFormElement).reset(); }, 800);
    };

    const gtxt = "bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-sky-400 to-emerald-400";

    return (
        <main className="relative min-h-screen overflow-x-clip bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-[#0a0a0a] dark:via-[#0b0b0e] dark:to-[#0a0a0a] text-slate-800 dark:text-slate-100">
            {/* Decorative */}
            <Stars />
            <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]">
                <div className="absolute -top-48 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/30 via-cyan-400/30 to-emerald-400/30 blur-3xl" />
            </div>

            {/* Floating cursor ring */}
            <div id="cursor" className="pointer-events-none fixed top-0 left-0 z-[60] hidden md:block" />

            {/* Nav */}
            <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-black/30 border-b border-white/10">
                <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-fuchsia-500 to-indigo-500 grid place-items-center shadow-lg">
                            <Icon name="bolt" className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold tracking-wide">Himanshu.dev</span>
                    </div>
                    <nav className="hidden md:flex gap-6 text-sm text-slate-600 dark:text-slate-300">
                        <a href="#projects" className="hover:text-slate-900 dark:hover:text-white">Projects</a>
                        <a href="#skills" className="hover:text-slate-900 dark:hover:text-white">Skills</a>
                        <a href="#experience" className="hover:text-slate-900 dark:hover:text-white">Experience</a>
                        <a href="#contact" className="hover:text-slate-900 dark:hover:text-white">Contact</a>
                    </nav>
                    <div className="flex items-center gap-2">
                        <a href="#contact" className="hidden md:inline-flex rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-2 text-white shadow-lg hover:shadow-xl transition">Hire Me</a>
                        <button onClick={toggle} aria-label="Toggle theme" className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 backdrop-blur hover:scale-[1.02] transition">
                            {theme === "dark" ? <Icon name="sun" /> : <Icon name="moon" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="relative mx-auto max-w-6xl px-4 pt-16 md:pt-24">
                <div className="grid gap-10 md:grid-cols-[1.1fr_.9fr] items-center">
                    <div>
                        <Chip>Available for freelance</Chip>
                        <h1 className={`mt-4 text-4xl md:text-6xl font-bold leading-tight ${gtxt}`}> {DATA.name} </h1>
                        <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">{DATA.role}</p>
                        <p className="mt-5 text-slate-600 dark:text-slate-300 max-w-xl">{DATA.about}</p>
                        <div className="mt-8 grid w-full max-w-md grid-cols-3 gap-3">
                            {DATA.stats.map((s) => (
                                <Glass key={s.label} className="p-4 text-center ring-1 ring-white/10 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)]">
                                    <div className="text-2xl font-bold">{s.value}</div>
                                    <div className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">{s.label}</div>
                                </Glass>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-fuchsia-500/20 via-cyan-500/10 to-emerald-500/20 blur-2xl animate-pulse" />
                        <Glass className="relative p-4 ring-1 ring-white/10">
                            <div ref={parallaxRef} className="rounded-2xl overflow-hidden">
                                <Image src={DATA.avatar} alt={DATA.name} width={720} height={720} className="h-[380px] w-full object-cover rounded-xl" />
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
                                    <Icon name="star" />
                                    <span>Top-rated • Futuristic UI</span>
                                </div>
                                <Link href="#contact" className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-2 text-white shadow-lg hover:shadow-xl transition">Hire Me</Link>
                            </div>
                        </Glass>
                    </div>
                </div>
            </section>

            {/* Skills */}
            <section id="skills" className="mx-auto max-w-6xl px-4 py-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-semibold">Core Skills</h2>
                    <Chip>Clean architecture • DX</Chip>
                </div>
                <SkillsGrid />
            </section>

            {/* Projects */}
            <section id="projects" className="mx-auto max-w-6xl px-4 py-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-semibold">Selected Projects</h2>
                    <Chip>20+ delivered</Chip>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {DATA.projects.map((p) => (
                        <div key={p.title} className="group [transform-style:preserve-3d] [perspective:1000px]">
                            <Glass className="overflow-hidden transition will-change-transform group-hover:[transform:rotateX(2deg)_rotateY(-3deg)]">
                                <div className="relative">
                                    <Image src={p.image} alt={p.title} width={800} height={600} className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
                                </div>
                                <div className="p-5">
                                    <h3 className="font-semibold text-lg">{p.title}</h3>
                                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{p.desc}</p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {p.tags.map(t => <span key={t} className="text-xs rounded-full bg-white/10 px-3 py-1">{t}</span>)}
                                    </div>
                                    <div className="mt-4 flex items-center justify-between gap-2">
                                        <Link href={(p as any).playstore || '#'} className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-sm hover:-translate-y-0.5 transition">
                                            <Icon name="android" className="w-4 h-4" /> Play Store
                                        </Link>
                                        <Link href={(p as any).appstore || '#'} className="inline-flex items-center gap-2 rounded-xl border border-sky-400/30 bg-sky-400/10 px-3 py-2 text-sm hover:-translate-y-0.5 transition">
                                            <Icon name="apple" className="w-4 h-4" /> App Store
                                        </Link>
                                    </div>
                                </div>
                            </Glass>
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience */}
            <section id="experience" className="mx-auto max-w-6xl px-4 py-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-semibold">Experience</h2>
                    <Chip>Impact & Ownership</Chip>
                </div>
                <div className="relative">
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-fuchsia-400/60 via-cyan-400/40 to-emerald-400/60" />
                    <div className="space-y-8">
                        {DATA.experience.map((e, idx) => (
                            <div key={e.company} className={`relative md:grid md:grid-cols-2 md:gap-10 items-start ${idx % 2 ? "md:pt-12" : ""}`}>
                                <div className={`md:col-start-${idx % 2 ? 2 : 1} md:text-right`}>
                                    <Glass className="inline-block p-4">
                                        <div className="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400">{e.period}</div>
                                        <div className="mt-1 font-semibold">{e.role} • {e.company}</div>
                                    </Glass>
                                </div>
                                <div className={`md:col-start-${idx % 2 ? 1 : 2}`}>
                                    <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                        {e.points.map(pt => (
                                            <li key={pt} className="flex gap-2"><Icon name="check" className="mt-0.5 w-4 h-4 text-emerald-400" /> {pt}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-semibold">Let’s build something incredible</h2>
                    <Chip>Replies in hours (99%)</Chip>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <Glass className="p-6">
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div>
                                <label className="text-sm">Your Name<span className="text-rose-500"> *</span></label>
                                <input name="name" required placeholder="John Doe" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur outline-none focus:ring-2 focus:ring-fuchsia-400" />
                            </div>
                            <div>
                                <label className="text-sm">Email<span className="text-rose-500"> *</span></label>
                                <input type="email" name="email" required placeholder="you@example.com" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur outline-none focus:ring-2 focus:ring-fuchsia-400" />
                            </div>
                            <div>
                                <label className="text-sm">Subject<span className="text-rose-500"> *</span></label>
                                <input name="subject" required placeholder="Project idea…" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur outline-none focus:ring-2 focus:ring-fuchsia-400" />
                            </div>
                            <div>
                                <label className="text-sm">Message<span className="text-rose-500"> *</span></label>
                                <textarea name="message" required rows={5} placeholder="Tell me about your goals…" className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur outline-none focus:ring-2 focus:ring-fuchsia-400" />
                            </div>
                            <button disabled={sending} className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-5 py-3 text-white shadow-lg hover:shadow-xl transition disabled:opacity-60">
                                <Icon name="send" className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                                {sending ? "Sending…" : "Send Message"}
                            </button>
                        </form>
                    </Glass>

                    <div className="space-y-4">
                        <Glass className="p-6">
                            <h3 className="font-semibold">Contact Details</h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                <li className="flex items-center gap-2"><Icon name="mail" /> hello.himanshu@example.com</li>
                                <li className="flex items-center gap-2"><Icon name="briefcase" /> India</li>
                            </ul>
                            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Open to freelance & full-time Flutter roles. Happy to collaborate with product teams and founders.</p>
                        </Glass>
                        <Glass className="p-6">
                            <h3 className="font-semibold">Why me?</h3>
                            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                <li className="flex gap-2"><Icon name="check" className="w-4 h-4 text-emerald-400" /> 2.5+ years building robust Flutter apps</li>
                                <li className="flex gap-2"><Icon name="check" className="w-4 h-4 text-emerald-400" /> 20+ projects shipped end‑to‑end</li>
                                <li className="flex gap-2"><Icon name="check" className="w-4 h-4 text-emerald-400" /> 99% quick response • proactive comms</li>
                            </ul>
                        </Glass>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p>© {new Date().getFullYear()} {DATA.name}. All rights reserved.</p>
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="rounded-xl border border-white/10 bg-white/10 px-4 py-2">Back to top</button>
                </div>
            </footer>

            {/* Futuristic CSS */}
            <style jsx global>{`
        /* magnetic cursor ring */
        #cursor::after{content:'';position:fixed;inset:0;width:28px;height:28px;border:2px solid rgba(255,255,255,.45);border-radius:9999px;transform:translate(-50%,-50%);pointer-events:none}
      `}</style>

            {/* Toast */}
            {toast && (
                <div role="status" className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60]">
                    <div className="rounded-2xl border border-white/10 bg-black/70 px-5 py-3 text-white backdrop-blur">
                        <div className="font-medium">{toast.title}</div>
                        <div className="text-sm opacity-80">{toast.desc}</div>
                    </div>
                    {setTimeout(() => setToast(null), 2500) && null}
                </div>
            )}
        </main>
    );
}

// Magnetic cursor effect (mounted once)
if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
        const c = document.getElementById('cursor');
        if (!c) return;
        (c as HTMLDivElement).style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
}
