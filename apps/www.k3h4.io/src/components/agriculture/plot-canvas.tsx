import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Grid, Html, OrbitControls } from "@react-three/drei";

import { HudChip } from "../ui/hud-chip";
import { normalizeHealth } from "./utils";

export type PlotMesh = {
    id: string;
    name: string;
    crop: string;
    stage: string;
    acres: string;
    health: string;
    latestCondition: { recordedAt: string } | null;
    position: [number, number, number];
    size: [number, number];
    healthTint: number;
};

const cropColor = (crop: string) => {
    const normalized = crop.toLowerCase();
    if (normalized.includes("wheat")) return "#f59e0b";
    if (normalized.includes("corn")) return "#10b981";
    if (normalized.includes("soy")) return "#6366f1";
    if (normalized.includes("grass")) return "#22c55e";
    return "#0ea5e9";
};

function generatePlotLayout(plots: PlotMesh[]) {
    const cols = 3;
    const spacing = 6;
    return plots.map((plot, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = (col - (cols - 1) / 2) * spacing;
        const z = -row * spacing;
        const acres = Number(plot.acres) || 1;
        const base = Math.sqrt(Math.max(1, acres));
        const size: [number, number] = [Math.max(2, base * 0.9), Math.max(1.6, base * 0.7)];
        return {
            ...plot,
            position: [x, 0.01, z] as [number, number, number],
            size,
            healthTint: normalizeHealth(plot.health),
        };
    });
}

function PlotTile({ plot, highlighted, onSelect }: { plot: PlotMesh; highlighted: boolean; onSelect: (id: string | null) => void }) {
    return (
        <group position={plot.position}>
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                onPointerOver={() => onSelect(plot.id)}
                onPointerOut={() => onSelect(null)}
                onClick={() => onSelect(plot.id)}
            >
                <planeGeometry args={plot.size} />
                <meshStandardMaterial color={cropColor(plot.crop)} transparent opacity={highlighted ? 0.95 : plot.healthTint * 0.85} />
            </mesh>
            <Html position={[0, 0.08, 0]} center className="pointer-events-none select-none">
                <HudChip tone="outline" className="bg-background/80 text-foreground shadow">
                    {plot.name} · {plot.crop}
                </HudChip>
            </Html>
        </group>
    );
}

export function PlotCanvas({ plots, highlightedId, onSelect }: { plots: PlotMesh[]; highlightedId: string | null; onSelect: (id: string | null) => void }) {
    const laidOut = useMemo(() => generatePlotLayout(plots), [plots]);
    return (
        <Canvas shadows camera={{ position: [12, 10, 12], fov: 46 }}>
            <color attach="background" args={["#05060a"]} />
            <hemisphereLight intensity={0.6} color="#dbeafe" groundColor="#0b1224" />
            <directionalLight position={[8, 12, 8]} intensity={1.05} />
            <Suspense fallback={<Html center className="text-sm text-muted-foreground">Preparing field…</Html>}>
                <Grid args={[36, 36]} sectionSize={1} infiniteFade cellColor="#0b1224" sectionColor="#111827" position={[0, 0, 0]} />
                {laidOut.map((plot) => (
                    <PlotTile key={plot.id} plot={plot} highlighted={plot.id === highlightedId} onSelect={onSelect} />
                ))}
                <OrbitControls enablePan minDistance={5} maxDistance={34} target={[0, 0, 0]} />
            </Suspense>
        </Canvas>
    );
}
