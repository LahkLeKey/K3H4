import type { ReactNode } from "react";

export type BadgeProps = {
    accent?: string;
    children: ReactNode;
    className?: string;
};

export function Badge({ accent = "#94a3b8", children, className = "" }: BadgeProps) {
    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-100 ${className}`.trim()}
        >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
            {children}
        </span>
    );
}
