import type { ReactNode } from "react";

export type HistogramProps = { bins: number[]; labels: string[]; footer?: ReactNode; className?: string };

export function Histogram({ bins, labels, footer, className = "" }: HistogramProps) {
    const max = Math.max(...bins, 1);
    return (
        <div className={`space-y-2 ${className}`}>
            <div className="grid grid-cols-5 gap-2 text-[11px] text-slate-300">
                {bins.map((count, idx) => (
                    <div key={labels[idx]} className="flex flex-col gap-1">
                        <div className="h-16 rounded-md bg-white/5">
                            <div
                                className="h-full rounded-md bg-gradient-to-t from-emerald-500/40 via-emerald-300/40 to-sky-400/50"
                                style={{ height: `${(count / max) * 100}%` }}
                            />
                        </div>
                        <div className="text-center text-[10px] text-slate-400">{labels[idx]}</div>
                        <div className="text-center text-[10px] text-white">{count}</div>
                    </div>
                ))}
            </div>
            {footer ? <div className="text-[11px] text-slate-400">{footer}</div> : null}
        </div>
    );
}
