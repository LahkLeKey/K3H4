import type { ButtonHTMLAttributes, ReactNode } from "react";

export type Button2DProps = {
    accent?: string;
    icon?: ReactNode;
    children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function Button2D({ accent = "#7fe4d0", icon, children, className = "", ...rest }: Button2DProps) {
    return (
        <button
            type="button"
            {...rest}
            className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-50 shadow-lg transition hover:border-white/30 hover:bg-slate-800 ${className}`.trim()}
        >
            <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
            {icon ? <span className="text-slate-200">{icon}</span> : null}
            <span>{children}</span>
        </button>
    );
}
