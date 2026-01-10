import { Html, Instance, Instances, useCursor } from "@react-three/drei";
import { useState } from "react";

import { cropColor, stageVisual } from "./plot-layout";
import type { PlotMesh } from "./plot-types";

type PlotTileProps = {
    plot: PlotMesh;
    highlighted: boolean;
    onSelect: (id: string | null) => void;
};

function PlotTile({ plot, highlighted, onSelect }: PlotTileProps) {
    const [hovered, setHovered] = useState(false);
    useCursor(hovered || highlighted);

    const healthValue = Number(plot.health) || 0;
    const stageLabel = plot.stage || "Unplanted";
    const isReady = stageLabel.toLowerCase().includes("ready");
    const isDry = healthValue < 45;

    return (
        <group position={plot.position}>
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                onPointerOver={() => {
                    setHovered(true);
                    onSelect(plot.id);
                }}
                onPointerOut={() => {
                    setHovered(false);
                    onSelect(null);
                }}
                onClick={() => onSelect(plot.id)}
            >
                <planeGeometry args={plot.size} />
                <meshStandardMaterial color={cropColor(plot.crop)} transparent opacity={highlighted ? 0.95 : plot.healthTint * 0.85} />
            </mesh>
            {(hovered || highlighted) && (
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
                    <ringGeometry args={[Math.max(plot.size[0], plot.size[1]) * 0.55, Math.max(plot.size[0], plot.size[1]) * 0.62, 48]} />
                    <meshBasicMaterial color="#22c55e" transparent opacity={0.65} />
                </mesh>
            )}
            <Html position={[0, 0.08, 0]} center className="pointer-events-none select-none">
                <div className="flex flex-col items-center gap-1">
                    <div className="rounded-full border border-white/60 bg-white/85 px-3 py-1 text-[11px] font-semibold text-slate-700 shadow">
                        {plot.name} · {plot.crop}
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-white/85 px-2 py-[6px] text-[10px] font-semibold text-slate-700 shadow">
                        <span
                            className={`h-2.5 w-2.5 rounded-full ${isReady ? "bg-emerald-500" : isDry ? "bg-amber-500" : "bg-sky-500"}`}
                            aria-hidden
                        />
                        <span>{stageLabel}</span>
                        <div className="flex h-2.5 w-16 overflow-hidden rounded-full border border-slate-200">
                            <div
                                className="bg-emerald-500"
                                style={{ width: `${Math.min(100, Math.max(0, healthValue))}%` }}
                            />
                        </div>
                        <span className="text-[10px] text-slate-500">{healthValue || 0}%</span>
                    </div>
                </div>
            </Html>
        </group>
    );
}

type CropInstancesProps = {
    plots: PlotMesh[];
    highlightedId: string | null;
};

function CropInstances({ plots, highlightedId }: CropInstancesProps) {
    return (
        <Instances limit={64} position={[0, 0.02, 0]}>
            <boxGeometry args={[0.6, 1, 0.6]} />
            <meshStandardMaterial roughness={0.35} metalness={0.05} />
            {plots.map((plot) => {
                const visual = stageVisual(plot.stage || "");
                const scaleY = visual.yScale;
                const baseScale = highlightedId === plot.id ? 1.1 : 1;
                return (
                    <Instance
                        key={`crop-${plot.id}`}
                        position={[plot.position[0], 0.5 * scaleY, plot.position[2]]}
                        scale={[baseScale, scaleY * baseScale, baseScale]}
                        color={visual.color}
                    />
                );
            })}
        </Instances>
    );
}

type PlotsLayerProps = {
    laidOut: PlotMesh[];
    highlightedId: string | null;
    onSelect: (id: string | null) => void;
};

export function PlotsLayer({ laidOut, highlightedId, onSelect }: PlotsLayerProps) {
    return (
        <>
            <CropInstances plots={laidOut} highlightedId={highlightedId} />
            {laidOut.map((plot) => (
                <PlotTile key={plot.id} plot={plot} highlighted={plot.id === highlightedId} onSelect={onSelect} />
            ))}
        </>
    );
}
