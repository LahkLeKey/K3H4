import type { ReactNode } from "react";

export type PanelProps = {
    title?: string;
    accent?: string;
    children?: ReactNode;
    footer?: ReactNode;
    className?: string;
};

export function Panel({ title, accent = "#7fe4d0", children, footer, className = "" }: PanelProps) {
    return (
        <div className={`rounded-2xl border border-white/10 bg-slate-950 shadow-xl ${className}`.trim()}>
            {title ? (
                <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3 text-sm font-semibold text-slate-100">
                    <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
                    {title}
                </div>
            ) : null}
            <div className="px-4 py-3 text-sm text-slate-200">{children}</div>
            {footer ? <div className="border-t border-white/10 px-4 py-3 text-xs text-slate-300">{footer}</div> : null}
        </div>
    );
}
