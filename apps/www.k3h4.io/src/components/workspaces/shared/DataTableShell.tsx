import type { ReactNode } from "react";

export function DataTableShell({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-[0.18em] text-slate-400">{title}</span>
                    <span className="text-sm text-slate-200">Unified table shell</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-300">
                    <span className="rounded-full bg-white/5 px-3 py-1">Filters</span>
                    <span className="rounded-full bg-white/5 px-3 py-1">Columns</span>
                </div>
            </div>
            <div className="overflow-x-auto text-sm text-slate-100">{children}</div>
        </div>
    );
}
