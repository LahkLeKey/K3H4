import type { ReactNode } from "react";

export type SectionHeaderProps = {
    kicker?: string;
    title: string;
    description?: string;
    actions?: ReactNode;
    status?: ReactNode;
    className?: string;
};

export function SectionHeader({ kicker, title, description, actions, status, className = "" }: SectionHeaderProps) {
    return (
        <div className={`rounded-2xl border border-white/10 bg-slate-900/85 p-6 shadow-2xl backdrop-blur ${className}`.trim()}>
            {kicker ? <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">{kicker}</p> : null}
            <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-semibold text-white">{title}</h1>
                    {description ? <p className="text-sm text-slate-200">{description}</p> : null}
                    {status ? <div className="text-[11px] text-slate-300">{status}</div> : null}
                </div>
                {actions ? <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">{actions}</div> : null}
            </div>
        </div>
    );
}
