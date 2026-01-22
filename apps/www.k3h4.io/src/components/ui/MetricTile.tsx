import type { ReactNode } from "react";

import { Sparkline } from "./Sparkline";

export type MetricTileProps = {
    label: string;
    value: ReactNode;
    hint?: string;
    accent?: string;
    trend?: number[];
    className?: string;
};

export function MetricTile({ label, value, hint, accent = "#22d3ee", trend, className = "" }: MetricTileProps) {
    return (
        <div className={`rounded-xl border border-white/10 bg-white/5 px-4 py-3 shadow-lg ${className}`.trim()}>
            <div className="flex items-start justify-between gap-3">
                <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</div>
                    <div className="text-xl font-semibold text-white">{value}</div>
                    {hint ? <div className="text-[11px] text-slate-400">{hint}</div> : null}
                </div>
                <span className="mt-0.5 h-2 w-2 rounded-full" style={{ background: accent }} />
            </div>
            {trend && trend.length ? (
                <div className="mt-2">
                    <Sparkline values={trend} color={accent} />
                </div>
            ) : null}
        </div>
    );
}
