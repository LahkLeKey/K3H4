import type { ReactNode } from "react";

const toneStyles: Record<string, string> = {
    emerald: "border-emerald-400/40 bg-emerald-500/10 text-emerald-100",
    sky: "border-sky-400/40 bg-sky-500/10 text-sky-100",
    amber: "border-amber-400/40 bg-amber-500/10 text-amber-100",
    rose: "border-rose-400/40 bg-rose-500/10 text-rose-100",
    indigo: "border-indigo-400/40 bg-indigo-500/10 text-indigo-100",
    slate: "border-white/20 bg-white/5 text-slate-100",
};

export type PillProps = {
    tone?: keyof typeof toneStyles;
    children: ReactNode;
    className?: string;
};

export function Pill({ tone = "slate", children, className = "" }: PillProps) {
    return (
        <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] ${toneStyles[tone] ?? toneStyles.slate} ${className}`.trim()}
        >
            {children}
        </span>
    );
}
