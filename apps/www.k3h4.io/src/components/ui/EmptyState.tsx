import type { ReactNode } from "react";

export type EmptyStateProps = {
    title: string;
    description?: string;
    icon?: ReactNode;
    className?: string;
};

export function EmptyState({ title, description, icon, className = "" }: EmptyStateProps) {
    return (
        <div className={`space-y-1 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200 ${className}`.trim()}>
            <div className="flex items-center gap-2 font-semibold text-white">
                {icon ? <span className="text-base text-slate-200">{icon}</span> : null}
                <span>{title}</span>
            </div>
            {description ? <div className="text-slate-400">{description}</div> : null}
        </div>
    );
}
