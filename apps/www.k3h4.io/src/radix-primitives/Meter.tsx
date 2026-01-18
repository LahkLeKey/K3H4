export type MeterProps = {
    label?: string;
    value: number; // 0 to 1
    accent?: string;
    className?: string;
};

export function Meter({ label, value, accent = "#7fe4d0", className = "" }: MeterProps) {
    const clamped = Math.min(1, Math.max(0, value));
    return (
        <div className={`flex min-w-[200px] flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 shadow-lg ${className}`.trim()}>
            {label ? <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{label}</span> : null}
            <div className="h-2.5 w-full rounded-full bg-white/10">
                <div className="h-2.5 rounded-full" style={{ width: `${clamped * 100}%`, background: accent }} />
            </div>
        </div>
    );
}
