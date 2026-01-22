import type { ReactNode } from "react";

export type TableCardProps = {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
    children: ReactNode;
    maxHeight?: number;
    className?: string;
};

export function TableCard({ title, subtitle, actions, children, maxHeight = 520, className = "" }: TableCardProps) {
    return (
        <div className={`rounded-2xl border border-white/10 bg-slate-900/85 p-6 shadow-2xl backdrop-blur ${className}`.trim()}>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <div className="text-sm font-semibold text-white">{title}</div>
                    {subtitle ? <div className="text-xs text-slate-400">{subtitle}</div> : null}
                </div>
                {actions ? <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">{actions}</div> : null}
            </div>
            <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-slate-950/60">
                <div className="overflow-auto" style={{ maxHeight }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
