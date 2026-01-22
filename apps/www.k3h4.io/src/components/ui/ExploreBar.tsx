import { useMemo } from "react";

import { useAuthStore } from "../react-hooks/auth";

export type ExploreLink = { label: string; href: string };

type ExploreBarProps = {
    docsHref?: string;
    sourceHref?: string;
    label?: string;
    links?: ExploreLink[];
    className?: string;
    floating?: boolean;
};

// Reusable explore bar primitive for overlay use across screens.
export function ExploreBar({ docsHref, sourceHref, label = "Explore", links, className = "", floating = false }: ExploreBarProps) {
    const { apiBase } = useAuthStore();
    const resolvedDocs = useMemo(() => docsHref || `${apiBase}/docs/static/index.html`, [docsHref, apiBase]);
    const resolvedSource = sourceHref || "https://github.com/LahkLeKey/K3H4";

    const items = useMemo<ExploreLink[]>(() => {
        if (links && links.length > 0) return links;
        return [
            { label: "API Docs", href: resolvedDocs },
            { label: "Source Code", href: resolvedSource },
        ];
    }, [links, resolvedDocs, resolvedSource]);

    const buttonClass =
        "rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-white/30 hover:bg-white/20";

    const container = floating
        ? "pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center pb-6"
        : "pointer-events-auto flex items-center gap-3";

    return (
        <div className={`${container} ${className}`}>
            <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 shadow-lg shadow-black/40 backdrop-blur">
                <span className="text-xs uppercase tracking-[0.25em] text-slate-300">{label}</span>
                {items.map((item) => (
                    <a key={item.href} className={buttonClass} href={item.href} target="_blank" rel="noreferrer">
                        {item.label}
                    </a>
                ))}
            </div>
        </div>
    );
}
