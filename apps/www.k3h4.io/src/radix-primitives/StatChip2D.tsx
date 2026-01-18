export type StatChip2DProps = {
    label: string;
    value: string;
    accent?: string;
    delta?: string;
    className?: string;
};

export function StatChip2D({ label, value, accent = "#7fe4d0", delta, className = "" }: StatChip2DProps) {
    return (
        <div className={`flex min-w-[180px] items-start justify-between rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-left shadow-lg ${className}`.trim()}>
            <div className="flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{label}</span>
                <span className="text-xl font-semibold text-white">{value}</span>
            </div>
            <div className="flex flex-col items-end gap-1">
                <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
                {delta ? <span className="text-[11px] font-semibold text-emerald-200">{delta}</span> : null}
            </div>
        </div>
    );
}
