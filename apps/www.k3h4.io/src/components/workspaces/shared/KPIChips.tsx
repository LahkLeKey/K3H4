export type KPIChip = { label: string; value: string; tone?: "neutral" | "info" | "positive" | "warning" };

export function KPIChips({ chips }: { chips: KPIChip[] }) {
    const toneStyles = {
        neutral: "border-white/12 bg-white/5 text-slate-200",
        info: "border-sky-300/25 bg-sky-500/10 text-sky-100",
        positive: "border-emerald-300/25 bg-emerald-500/10 text-emerald-100",
        warning: "border-amber-300/25 bg-amber-500/10 text-amber-100",
    } as const;
    return (
        <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
                <div key={chip.label} className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${toneStyles[chip.tone ?? "neutral"]}`}>
                    <span className="h-2.5 w-2.5 rounded-full" />
                    <span className="text-[10px] text-white/90">{chip.label}</span>
                    <span className="text-xs font-semibold text-white normal-case tracking-normal">{chip.value}</span>
                </div>
            ))}
        </div>
    );
}
