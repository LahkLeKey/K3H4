export type EmptyStateProps = {
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
};

export function EmptyState({ title, description, action, className = "" }: EmptyStateProps) {
    return (
        <div className={`grid place-items-center rounded-2xl border border-dashed border-white/12 bg-slate-950/70 px-6 py-10 text-center text-slate-200 ${className}`.trim()}>
            <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Empty</p>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                {description ? <p className="text-sm text-slate-400">{description}</p> : null}
                {action ? <div className="mt-3 flex justify-center">{action}</div> : null}
            </div>
        </div>
    );
}
