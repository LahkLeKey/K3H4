import { Compass, MapPin, X } from "lucide-react";
import { useMemo } from "react";

import type { ZoneDefinition, ZoneId } from "../../state/atlas/types";
import { Button } from "../ui/button";

type WorldMapNode = Pick<ZoneDefinition, "id" | "label" | "description" | "accent" | "glyph" | "anchor">;

type WorldMapOverlayProps = {
    open: boolean;
    nodes: WorldMapNode[];
    activeKey: ZoneId;
    onSelect: (key: ZoneId) => void;
    onClose: () => void;
};

export function WorldMapOverlay({ open, nodes, activeKey, onSelect, onClose }: WorldMapOverlayProps) {
    const bounds = useMemo(() => {
        if (!nodes.length) return { minX: -10, maxX: 10, minZ: -10, maxZ: 10 };
        const xs = nodes.map((n) => n.anchor[0]);
        const zs = nodes.map((n) => n.anchor[2]);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minZ = Math.min(...zs);
        const maxZ = Math.max(...zs);
        return { minX, maxX, minZ, maxZ };
    }, [nodes]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-xl">
            <div className="mx-auto flex h-full w-full max-w-6xl flex-col px-4 py-8">
                <div className="glass-surface relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 shadow-2xl ring-1 ring-white/5">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                        <div className="flex items-center gap-3 text-white">
                            <Compass className="h-4 w-4 text-emerald-200" />
                            <div className="flex flex-col leading-tight">
                                <span className="text-[11px] uppercase tracking-[0.22em] text-slate-300">Atlas Map</span>
                                <span className="text-lg font-semibold">K3H4 World</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-300">
                            <span className="hidden sm:inline">Tap a zone to travel</span>
                            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close map">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="relative grid flex-1 grid-cols-1 gap-0 md:grid-cols-[1fr_280px]">
                        <div className="relative min-h-[360px] bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-950 p-6">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(94,219,200,0.08),transparent_32%),radial-gradient(circle_at_82%_16%,rgba(130,188,255,0.08),transparent_34%),radial-gradient(circle_at_48%_80%,rgba(251,146,60,0.08),transparent_36%)] opacity-70" aria-hidden />
                            <div className="absolute inset-4 rounded-2xl border border-white/5" aria-hidden />
                            <div className="absolute inset-8 grid grid-cols-6 grid-rows-6 opacity-30" aria-hidden>
                                {Array.from({ length: 36 }).map((_, idx) => (
                                    <div key={idx} className="border border-white/5" />
                                ))}
                            </div>
                            <div className="relative isolate h-full w-full">
                                {nodes.map((node) => {
                                    const { anchor, accent, label, glyph, id, description } = node;
                                    const xRange = Math.max(bounds.maxX - bounds.minX, 1);
                                    const zRange = Math.max(bounds.maxZ - bounds.minZ, 1);
                                    const left = ((anchor[0] - bounds.minX) / xRange) * 100;
                                    const top = ((anchor[2] - bounds.minZ) / zRange) * 100;
                                    const active = id === activeKey;
                                    return (
                                        <button
                                            key={id}
                                            type="button"
                                            onClick={() => onSelect(id)}
                                            className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-left text-xs text-slate-100 shadow-lg backdrop-blur transition hover:border-white/30"
                                            style={{ left: `${left}%`, top: `${top}%` }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
                                                <span className="text-[11px] uppercase tracking-[0.2em] text-slate-300">{glyph ? `${glyph} ${label}` : label}</span>
                                            </div>
                                            <p className="mt-1 max-w-[220px] text-[11px] text-slate-200/90">{description}</p>
                                            {active ? <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200">Active</span> : null}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="hidden flex-col gap-4 border-l border-white/10 bg-slate-950/60 px-5 py-6 text-sm text-slate-200 md:flex">
                            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                                <MapPin className="h-4 w-4" />
                                Travel Plan
                            </div>
                            <p className="text-slate-300">Select any zone to fly the camera there. The HUD and panel stay alive while the lighting and camera ease into the new area.</p>
                            <ul className="flex flex-col divide-y divide-white/5 rounded-2xl border border-white/10 bg-white/5">
                                {nodes.map((node) => {
                                    const active = node.id === activeKey;
                                    return (
                                        <li key={`${node.id}-legend`} className="flex items-center gap-3 px-4 py-3">
                                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: node.accent }} />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-white">{node.glyph ? `${node.glyph} ${node.label}` : node.label}</span>
                                                <span className="text-xs text-slate-400">{node.description}</span>
                                            </div>
                                            {active ? <span className="ml-auto rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-100">Current</span> : null}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
