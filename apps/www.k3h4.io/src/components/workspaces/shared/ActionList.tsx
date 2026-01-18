export type ActionItem = { label: string; description?: string; cta?: string; onAction?: () => void };

export function ActionList({ items }: { items: ActionItem[] }) {
    return (
        <div className="flex flex-col divide-y divide-white/5 rounded-2xl border border-white/10 bg-white/5">
            {items.map((item) => (
                <div key={item.label} className="flex flex-wrap items-center gap-3 px-4 py-3">
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white">{item.label}</span>
                        {item.description ? <span className="text-xs text-slate-400">{item.description}</span> : null}
                    </div>
                    {item.cta ? (
                        <button
                            type="button"
                            onClick={item.onAction}
                            className="ml-auto inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-100"
                        >
                            {item.cta}
                        </button>
                    ) : null}
                </div>
            ))}
        </div>
    );
}
