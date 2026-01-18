import { useMemo } from "react";

import { Dialog } from "../radix-primitives";
import { useAtlasState } from "../react-hooks/atlas";

export type AtlasMapDialogProps = {
    open: boolean;
    onClose: () => void;
};

export function AtlasMapDialog({ open, onClose }: AtlasMapDialogProps) {
    const { contexts, activeId, setActiveId } = useAtlasState();

    const bounds = useMemo(() => {
        if (!contexts.length) return { minX: -10, maxX: 10, minZ: -10, maxZ: 10 };
        const xs = contexts.map((ctx) => ctx.anchor[0]);
        const zs = contexts.map((ctx) => ctx.anchor[2]);
        return {
            minX: Math.min(...xs),
            maxX: Math.max(...xs),
            minZ: Math.min(...zs),
            maxZ: Math.max(...zs),
        };
    }, [contexts]);

    return (
        <Dialog open={open} onClose={onClose} title="Atlas map" footer="Travel keeps the workspace mounted.">
            <div className="space-y-4">
                <p className="text-sm text-slate-300">Tap any anchor to travel. Anchors are positioned relative to the live 3D space.</p>
                <div className="relative aspect-[5/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-950">
                    <div className="absolute inset-3 rounded-2xl border border-white/10" aria-hidden />
                    <div className="absolute inset-4 grid grid-cols-8 grid-rows-6 opacity-30" aria-hidden>
                        {Array.from({ length: 48 }).map((_, idx) => (
                            <div key={`cell-${idx}`} className="border border-white/5" />
                        ))}
                    </div>
                    <div className="relative h-full w-full">
                        {contexts.map((ctx) => {
                            const xRange = Math.max(bounds.maxX - bounds.minX, 1);
                            const zRange = Math.max(bounds.maxZ - bounds.minZ, 1);
                            const left = ((ctx.anchor[0] - bounds.minX) / xRange) * 100;
                            const top = ((ctx.anchor[2] - bounds.minZ) / zRange) * 100;
                            const active = ctx.id === activeId;
                            return (
                                <button
                                    key={ctx.id}
                                    type="button"
                                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-2 text-left text-xs transition shadow-lg backdrop-blur ${active ? "border-white/60 bg-white/15" : "border-white/15 bg-slate-950/80 hover:border-white/40"
                                        }`.trim()}
                                    style={{ left: `${left}%`, top: `${top}%` }}
                                    onClick={() => {
                                        setActiveId(ctx.id);
                                        onClose();
                                    }}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full" style={{ background: ctx.accent }} />
                                        <span className="text-[11px] uppercase tracking-[0.2em] text-slate-200">{ctx.glyph ? `${ctx.glyph} ${ctx.name}` : ctx.name}</span>
                                    </div>
                                    <p className="mt-1 max-w-[220px] text-[11px] text-slate-300">{ctx.summary}</p>
                                    {active ? <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200">Active</span> : null}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
