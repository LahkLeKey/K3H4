import { Suspense, useEffect, useMemo, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Grid, Html, Instances, Instance, MapControls, PerformanceMonitor, Sky, useCursor } from "@react-three/drei";

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

type LandmarkId = "bank" | "market" | "barn" | "silo" | "hut";

type Landmark = {
    id: LandmarkId;
    label: string;
    subtitle?: string;
    color: string;
    position: [number, number, number];
    onClick?: () => void;
};

type PlotVitals = {
    water?: number;
    nutrients?: number;
    pests?: number;
    quality?: number;
    assignedWorker?: string;
    task?: string;
    etaMinutes?: number;
};

type LogisticsPlan = {
    destination?: string;
    distanceKm?: number;
    etaMinutes?: number;
    cost?: number;
    slaDay?: number;
    source?: "osrm" | "fallback";
};

type ToolId = "select" | "plant" | "water" | "fertilize" | "treat" | "harvest" | "assign";

type ToolConfig = {
    id: ToolId;
    label: string;
    hotkey?: string;
    disabledReason?: string;
};

type WorkerKpi = {
    busyPercent?: number;
    workersTotal?: number;
};

type InventorySummary = {
    seeds?: number;
    fertilizer?: number;
    feed?: number;
    harvest?: number;
};

type HowToPlayOverlayProps = {
    show: boolean;
    onClose?: () => void;
};

type FinancialKpis = {
    dailyPnL?: number | string | null;
    burnRate?: number | string | null;
    receivables?: number | string | null;
    slaRisk?: string;
    osrmStatus?: "osrm" | "fallback" | "error";
    usdaStatus?: "live" | "cache" | "offline";
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

function stageVisual(stage: string) {
    const normalized = stage.toLowerCase();
    if (normalized.includes("ready")) return { yScale: 1.1, color: "#22c55e" };
    if (normalized.includes("grow")) return { yScale: 0.8, color: "#4ade80" };
    if (normalized.includes("plant")) return { yScale: 0.55, color: "#86efac" };
    return { yScale: 0.25, color: "#cbd5e1" };
}

function PlotTile({ plot, highlighted, onSelect }: { plot: PlotMesh; highlighted: boolean; onSelect: (id: string | null) => void }) {
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

function CropInstances({ plots, highlightedId }: { plots: PlotMesh[]; highlightedId: string | null }) {
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

function LandmarkBlock({ landmark }: { landmark: Landmark }) {
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);

    return (
        <group position={landmark.position}>
            <mesh
                castShadow
                receiveShadow
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => landmark.onClick?.()}
            >
                <boxGeometry args={[2.6, 1.6, 2.6]} />
                <meshStandardMaterial color={landmark.color} roughness={0.4} />
            </mesh>
            <mesh position={[0, 1.1, 0]}>
                <boxGeometry args={[2.8, 0.2, 2.8]} />
                <meshStandardMaterial color={`${landmark.color}cc`} />
            </mesh>
            {hovered && (
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                    <ringGeometry args={[1.55, 1.85, 32]} />
                    <meshBasicMaterial color={landmark.color} transparent opacity={0.5} />
                </mesh>
            )}
            <Html position={[0, 1.4, 0]} center className="pointer-events-none select-none">
                <div className="rounded-md border border-white/60 bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-700 shadow">
                    {landmark.label}
                    {landmark.subtitle ? <div className="text-[10px] font-medium text-slate-500">{landmark.subtitle}</div> : null}
                </div>
            </Html>
        </group>
    );
}

function DefaultOverlay({
    plotCount,
    balance,
    k3h4Balance,
    day,
    debt,
    alerts,
    onAddPlot,
    onBuySeeds,
    onSchedule,
    onRefresh,
}: {
    plotCount?: number;
    balance?: number | string | null;
    k3h4Balance?: number | string | null;
    day?: number | string | null;
    debt?: number | string | null;
    alerts?: string[];
    onAddPlot?: () => void;
    onBuySeeds?: () => void;
    onSchedule?: () => void;
    onRefresh?: () => void;
}) {
    return (
        <div className="pointer-events-none flex h-full w-full flex-col justify-between p-4 text-slate-800">
            <div className="pointer-events-auto inline-flex items-center gap-3 rounded-full bg-white/85 px-4 py-2 text-xs font-semibold shadow">
                <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">Day: {day ?? "–"}</span>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">Plots: {plotCount ?? "–"}</span>
                <span className="rounded-full bg-sky-100 px-2 py-1 text-sky-700">USD: {balance ?? "–"}</span>
                <span className="rounded-full bg-indigo-100 px-2 py-1 text-indigo-700">K3H4: {k3h4Balance ?? "–"}</span>
                <span className="rounded-full bg-rose-50 px-2 py-1 text-rose-700">Debt: {debt ?? "–"}</span>
                <button
                    type="button"
                    onClick={onRefresh}
                    disabled={!onRefresh}
                    className="rounded-full bg-slate-800 px-3 py-1 text-white shadow disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                    Refresh
                </button>
            </div>

            <div className="pointer-events-auto ml-auto flex flex-col gap-2 rounded-lg bg-white/90 p-3 text-sm shadow-lg">
                <div className="font-semibold text-slate-700">Quick actions</div>
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={onAddPlot}
                        disabled={!onAddPlot}
                        className="rounded-md bg-emerald-600 px-3 py-2 text-white shadow disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        Add plot
                    </button>
                    <button
                        type="button"
                        onClick={onBuySeeds}
                        disabled={!onBuySeeds}
                        className="rounded-md bg-amber-500 px-3 py-2 text-white shadow disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        Buy seeds
                    </button>
                    <button
                        type="button"
                        onClick={onSchedule}
                        disabled={!onSchedule}
                        className="rounded-md bg-sky-600 px-3 py-2 text-white shadow disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                        Schedule tasks
                    </button>
                </div>
            </div>

            {alerts && alerts.length > 0 && (
                <div className="pointer-events-auto mt-3 flex max-w-sm flex-col gap-2">
                    {alerts.slice(0, 3).map((alert) => (
                        <div
                            key={alert}
                            className="flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] font-semibold text-amber-800 shadow"
                        >
                            <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden />
                            <span className="truncate" title={alert}>
                                {alert}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function ToolbeltOverlay({
    tools,
    activeTool,
    onSelect,
    workerKpi,
    inventory,
    animalAlerts,
}: {
    tools?: ToolConfig[];
    activeTool?: ToolId;
    onSelect?: (id: ToolId) => void;
    workerKpi?: WorkerKpi;
    inventory?: InventorySummary;
    animalAlerts?: number;
}) {
    return (
        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white/90 p-3 text-sm font-semibold text-slate-800 shadow-xl">
            <div className="flex items-center justify-between text-[12px] font-semibold text-slate-600">
                <span>Tools</span>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-700">Workers busy {workerKpi?.busyPercent ?? "–"}%</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {(tools || []).map((tool) => {
                    const disabled = !!tool.disabledReason || !onSelect;
                    const isActive = activeTool === tool.id;
                    return (
                        <button
                            key={tool.id}
                            type="button"
                            onClick={() => !disabled && onSelect?.(tool.id)}
                            disabled={disabled}
                            className={`flex flex-col items-start gap-1 rounded-md border px-3 py-2 text-left text-[12px] shadow ${isActive ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-700"
                                } disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400`}
                            title={tool.disabledReason}
                        >
                            <div className="flex w-full items-center justify-between">
                                <span>{tool.label}</span>
                                {tool.hotkey ? <span className="rounded bg-slate-100 px-1 text-[10px] text-slate-600">{tool.hotkey}</span> : null}
                            </div>
                            {tool.disabledReason ? <div className="text-[10px] text-slate-500">{tool.disabledReason}</div> : null}
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-700">
                <div className="rounded-md bg-slate-50 p-2">
                    <div className="text-[10px] text-slate-500">Seeds</div>
                    <div>{inventory?.seeds ?? "–"}</div>
                </div>
                <div className="rounded-md bg-slate-50 p-2">
                    <div className="text-[10px] text-slate-500">Fertilizer</div>
                    <div>{inventory?.fertilizer ?? "–"}</div>
                </div>
                <div className="rounded-md bg-slate-50 p-2">
                    <div className="text-[10px] text-slate-500">Feed</div>
                    <div>{inventory?.feed ?? "–"}</div>
                </div>
                <div className="rounded-md bg-slate-50 p-2">
                    <div className="text-[10px] text-slate-500">Harvest</div>
                    <div>{inventory?.harvest ?? "–"}</div>
                </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-rose-700">
                <span>Animal alerts</span>
                <span className="rounded-full bg-rose-50 px-2 py-1">{animalAlerts ?? 0}</span>
            </div>
        </div>
    );
}

function InspectorPanel({
    plot,
    vitals,
    logisticsPlan,
    conversionRate,
    conversionFeePct,
    loanRatePct,
    onPlant,
    onWater,
    onFertilize,
    onTreat,
    onHarvest,
    onAssignWorker,
}: {
    plot: PlotMesh | null;
    vitals?: PlotVitals;
    logisticsPlan?: LogisticsPlan;
    conversionRate?: number | string | null;
    conversionFeePct?: number | string | null;
    loanRatePct?: number | string | null;
    onPlant?: (id: string) => void;
    onWater?: (id: string) => void;
    onFertilize?: (id: string) => void;
    onTreat?: (id: string) => void;
    onHarvest?: (id: string) => void;
    onAssignWorker?: (id: string) => void;
}) {
    const healthValue = plot ? Number(plot.health) || 0 : 0;
    const stageLabel = plot?.stage || "Unplanted";

    return (
        <div className="w-80 max-w-full rounded-xl border border-slate-200 bg-white/95 p-3 text-sm text-slate-800 shadow-xl">
            <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Inspector</div>
                    <div className="text-sm font-semibold text-slate-800">{plot ? plot.name : "Select a plot"}</div>
                    {plot ? <div className="text-xs text-slate-500">{plot.crop}</div> : null}
                </div>
                <div className="flex flex-col items-end gap-1 text-[10px] font-semibold text-slate-600">
                    <span className="rounded-full bg-indigo-50 px-2 py-1 text-indigo-700">K3H4 rate {conversionRate ?? "1:10"}</span>
                    <span className="rounded-full bg-amber-50 px-2 py-1 text-amber-700">Convert fee {conversionFeePct ?? "2%"}</span>
                    <span className="rounded-full bg-rose-50 px-2 py-1 text-rose-700">Loan {loanRatePct ?? "5%"}/day</span>
                </div>
            </div>

            {plot ? (
                <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold">
                        <div className="rounded-md bg-slate-50 p-2">
                            <div className="text-[10px] text-slate-500">Stage</div>
                            <div className="text-slate-800">{stageLabel}</div>
                        </div>
                        <div className="rounded-md bg-emerald-50 p-2">
                            <div className="text-[10px] text-slate-500">Health</div>
                            <div className="text-emerald-700">{healthValue}%</div>
                        </div>
                        <div className="rounded-md bg-sky-50 p-2">
                            <div className="text-[10px] text-slate-500">Water</div>
                            <div className="text-sky-700">{vitals?.water ?? "–"}%</div>
                        </div>
                        <div className="rounded-md bg-amber-50 p-2">
                            <div className="text-[10px] text-slate-500">Nutrients</div>
                            <div className="text-amber-700">{vitals?.nutrients ?? "–"}%</div>
                        </div>
                        <div className="rounded-md bg-rose-50 p-2">
                            <div className="text-[10px] text-slate-500">Pests</div>
                            <div className="text-rose-700">{vitals?.pests ?? "–"}%</div>
                        </div>
                        <div className="rounded-md bg-indigo-50 p-2">
                            <div className="text-[10px] text-slate-500">Worker/ETA</div>
                            <div className="text-indigo-700">{vitals?.assignedWorker || "Unassigned"}</div>
                            <div className="text-[10px] text-indigo-500">{vitals?.task ? `${vitals.task} · ${vitals.etaMinutes ?? "–"}m` : "Queue empty"}</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
                        <button
                            type="button"
                            onClick={() => onPlant?.(plot.id)}
                            disabled={!onPlant}
                            className="rounded-md bg-emerald-600 px-3 py-2 text-white shadow disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                            Plant
                        </button>
                        <button
                            type="button"
                            onClick={() => onWater?.(plot.id)}
                            disabled={!onWater}
                            className="rounded-md bg-sky-600 px-3 py-2 text-white shadow disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                            Water
                        </button>
                        <button
                            type="button"
                            onClick={() => onFertilize?.(plot.id)}
                            disabled={!onFertilize}
                            className="rounded-md bg-amber-500 px-3 py-2 text-white shadow disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                            Fertilize
                        </button>
                        <button
                            type="button"
                            onClick={() => onTreat?.(plot.id)}
                            disabled={!onTreat}
                            className="rounded-md bg-rose-500 px-3 py-2 text-white shadow disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                            Treat pests
                        </button>
                        <button
                            type="button"
                            onClick={() => onHarvest?.(plot.id)}
                            disabled={!onHarvest}
                            className="rounded-md bg-lime-600 px-3 py-2 text-white shadow disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                            Harvest
                        </button>
                        <button
                            type="button"
                            onClick={() => onAssignWorker?.(plot.id)}
                            disabled={!onAssignWorker}
                            className="rounded-md bg-slate-800 px-3 py-2 text-white shadow disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                            Assign worker
                        </button>
                    </div>

                    {logisticsPlan ? (
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-[11px] font-semibold text-slate-700">
                            <div className="flex items-center justify-between gap-2">
                                <div>Logistics</div>
                                <span className="rounded-full bg-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-700">
                                    {logisticsPlan.source === "fallback" ? "Fallback" : "OSRM"}
                                </span>
                            </div>
                            <div className="mt-1 grid grid-cols-2 gap-2 text-[10px]">
                                <div className="rounded-md bg-white px-2 py-1">Dest: {logisticsPlan.destination || "TBD"}</div>
                                <div className="rounded-md bg-white px-2 py-1">Distance: {logisticsPlan.distanceKm ?? "–"} km</div>
                                <div className="rounded-md bg-white px-2 py-1">ETA: {logisticsPlan.etaMinutes ?? "–"} min</div>
                                <div className="rounded-md bg-white px-2 py-1">Cost: {logisticsPlan.cost ?? "–"}</div>
                                <div className="rounded-md bg-white px-2 py-1">SLA Day: {logisticsPlan.slaDay ?? "–"}</div>
                            </div>
                        </div>
                    ) : null}
                </div>
            ) : (
                <div className="rounded-md bg-slate-50 p-3 text-[12px] font-semibold text-slate-600">
                    Select a plot to view actions, or click the bank/market buildings to open their panels.
                </div>
            )}
        </div>
    );
}

function HowToPlayOverlay({ show, onClose }: HowToPlayOverlayProps) {
    if (!show) return null;

    return (
        <div className="pointer-events-auto w-[320px] max-w-full rounded-xl border border-slate-200 bg-white/95 p-3 text-sm text-slate-800 shadow-xl">
            <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">How to play</div>
                    <div className="text-[12px] text-slate-600">3-minute loop</div>
                </div>
                {onClose ? (
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600 shadow"
                    >
                        Close
                    </button>
                ) : null}
            </div>
            <ol className="flex list-decimal flex-col gap-2 pl-4 text-[12px] font-semibold text-slate-700">
                <li>Pick a plot → Plant (needs seeds & worker).</li>
                <li>Water/Fertilize when alerts show (health rises).</li>
                <li>Harvest when ready → goes to storage.</li>
                <li>Click Bank to convert USD↔K3H4 or take a loan.</li>
                <li>Click Market to sell; OSRM cost updates price net.</li>
            </ol>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600">
                <div className="rounded-md bg-slate-50 p-2">Hotkeys: 1–7 toolbelt</div>
                <div className="rounded-md bg-slate-50 p-2">Arrows/Enter: cycle plots</div>
            </div>
        </div>
    );
}

function SystemStatusChips({ kpis }: { kpis?: FinancialKpis }) {
    if (!kpis) return null;

    const osrmLabel = kpis.osrmStatus === "fallback" ? "OSRM: Fallback" : kpis.osrmStatus === "error" ? "OSRM: Error" : "OSRM: Live";
    const usdaLabel = kpis.usdaStatus === "cache" ? "USDA: Cached" : kpis.usdaStatus === "offline" ? "USDA: Offline" : "USDA: Live";

    return (
        <div className="pointer-events-auto flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white/90 p-3 text-[11px] font-semibold text-slate-700 shadow-xl">
            <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">P&L: {kpis.dailyPnL ?? "–"}</span>
            <span className="rounded-full bg-amber-50 px-2 py-1 text-amber-700">Burn: {kpis.burnRate ?? "–"}</span>
            <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">AR: {kpis.receivables ?? "–"}</span>
            <span className="rounded-full bg-sky-50 px-2 py-1 text-sky-700">SLA: {kpis.slaRisk ?? "On track"}</span>
            <span className="rounded-full bg-indigo-50 px-2 py-1 text-indigo-700">{osrmLabel}</span>
            <span className="rounded-full bg-teal-50 px-2 py-1 text-teal-700">{usdaLabel}</span>
        </div>
    );
}
export function PlotCanvas({
    plots,
    highlightedId,
    onSelect,
    onAddPlot,
    onBuySeeds,
    onSchedule,
    onRefresh,
    plotCount,
    balance,
    k3h4Balance,
    onSelectBank,
    onSelectMarket,
    onSelectBarn,
    onSelectSilo,
    onSelectHut,
    overlay,
    reducedMotion,
    alerts,
    keyboardNavigation,
    day,
    debt,
    plotVitalsById,
    logisticsPlan,
    conversionRate,
    conversionFeePct,
    loanRatePct,
    financialKpis,
    onPlantPlot,
    onWaterPlot,
    onFertilizePlot,
    onTreatPlot,
    onHarvestPlot,
    onAssignWorker,
    tools,
    activeTool,
    onSelectTool,
    workerKpi,
    inventory,
    animalAlerts,
    showHowToPlay,
    onCloseHowToPlay,
}: {
    plots: PlotMesh[];
    highlightedId: string | null;
    onSelect: (id: string | null) => void;
    onAddPlot?: () => void;
    onBuySeeds?: () => void;
    onSchedule?: () => void;
    onRefresh?: () => void;
    plotCount?: number;
    balance?: number | string | null;
    k3h4Balance?: number | string | null;
    onSelectBank?: () => void;
    onSelectMarket?: () => void;
    onSelectBarn?: () => void;
    onSelectSilo?: () => void;
    onSelectHut?: () => void;
    overlay?: (context: {
        plotCount?: number;
        balance?: number | string | null;
        k3h4Balance?: number | string | null;
        day?: number | string | null;
        debt?: number | string | null;
        alerts?: string[];
        onAddPlot?: () => void;
        onBuySeeds?: () => void;
        onSchedule?: () => void;
        onRefresh?: () => void;
    }) => ReactNode;
    reducedMotion?: boolean;
    alerts?: string[];
    keyboardNavigation?: boolean;
    day?: number | string | null;
    debt?: number | string | null;
    plotVitalsById?: Record<string, PlotVitals>;
    logisticsPlan?: LogisticsPlan;
    conversionRate?: number | string | null;
    conversionFeePct?: number | string | null;
    loanRatePct?: number | string | null;
    financialKpis?: FinancialKpis;
    onPlantPlot?: (id: string) => void;
    onWaterPlot?: (id: string) => void;
    onFertilizePlot?: (id: string) => void;
    onTreatPlot?: (id: string) => void;
    onHarvestPlot?: (id: string) => void;
    onAssignWorker?: (id: string) => void;
    tools?: ToolConfig[];
    activeTool?: ToolId;
    onSelectTool?: (id: ToolId) => void;
    workerKpi?: WorkerKpi;
    inventory?: InventorySummary;
    animalAlerts?: number;
    showHowToPlay?: boolean;
    onCloseHowToPlay?: () => void;
}) {
    const laidOut = useMemo(() => generatePlotLayout(plots), [plots]);
    const sceneBackground = useMemo(() => {
        if (typeof window === "undefined") return "#eef2f7";
        const value = getComputedStyle(document.documentElement).getPropertyValue("--background").trim();
        return value || "#eef2f7";
    }, []);
    const gridColor = useMemo(() => {
        if (typeof window === "undefined") return "#d9e2ec";
        const value = getComputedStyle(document.documentElement).getPropertyValue("--muted").trim();
        return value || "#d9e2ec";
    }, []);
    const landmarks: Landmark[] = useMemo(
        () => [
            { id: "bank", label: "Bank · K3H4", subtitle: "Convert & Loans", color: "#0ea5e9", position: [14, 0.8, -2], onClick: onSelectBank },
            { id: "market", label: "Market Board", subtitle: "Sell & Contracts", color: "#f59e0b", position: [14, 0.8, -8], onClick: onSelectMarket },
            { id: "barn", label: "Barn/Pen", subtitle: "Animals", color: "#8b5cf6", position: [-14, 0.8, -4], onClick: onSelectBarn },
            { id: "silo", label: "Silo", subtitle: "Storage", color: "#14b8a6", position: [0, 0.8, 14], onClick: onSelectSilo },
            { id: "hut", label: "Worker Hut", subtitle: "Hire & Assign", color: "#ef4444", position: [-10, 0.8, 10], onClick: onSelectHut },
        ],
        [onSelectBank, onSelectMarket, onSelectBarn, onSelectSilo, onSelectHut]
    );
    const overlayContent = overlay
        ? overlay({ plotCount, balance, k3h4Balance, day, debt, alerts, onAddPlot, onBuySeeds, onSchedule, onRefresh })
        : (
            <DefaultOverlay
                plotCount={plotCount}
                balance={balance}
                k3h4Balance={k3h4Balance}
                day={day}
                debt={debt}
                alerts={alerts}
                onAddPlot={onAddPlot}
                onBuySeeds={onBuySeeds}
                onSchedule={onSchedule}
                onRefresh={onRefresh}
            />
        );
    const [isPerfLimited, setPerfLimited] = useState(false);
    const selectedPlot = useMemo(() => laidOut.find((plot) => plot.id === highlightedId) || null, [laidOut, highlightedId]);
    const vitals = selectedPlot ? plotVitalsById?.[selectedPlot.id] : undefined;

    useEffect(() => {
        if (!keyboardNavigation || plots.length === 0) return;

        const handleKey = (event: KeyboardEvent) => {
            if (event.defaultPrevented) return;
            const keys = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", " ", "Enter"];
            if (!keys.includes(event.key)) return;

            const currentIndex = highlightedId ? plots.findIndex((p) => p.id === highlightedId) : -1;
            if (["ArrowRight", "ArrowDown"].includes(event.key)) {
                const nextIndex = (currentIndex + 1 + plots.length) % plots.length;
                onSelect(plots[nextIndex].id);
                event.preventDefault();
            } else if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
                const prevIndex = (currentIndex - 1 + plots.length) % plots.length;
                onSelect(plots[prevIndex].id);
                event.preventDefault();
            } else if ([" ", "Enter"].includes(event.key) && highlightedId) {
                onSelect(highlightedId);
                event.preventDefault();
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [keyboardNavigation, plots, highlightedId, onSelect]);

    useEffect(() => {
        if (!tools || tools.length === 0 || !onSelectTool) return;

        const handleToolHotkeys = (event: KeyboardEvent) => {
            if (event.defaultPrevented) return;

            const matchedHotkey = tools.find((tool) => tool.hotkey?.toLowerCase() === event.key.toLowerCase());
            if (matchedHotkey && !matchedHotkey.disabledReason) {
                onSelectTool(matchedHotkey.id);
                event.preventDefault();
                return;
            }

            const numeric = Number(event.key);
            if (!Number.isNaN(numeric) && numeric >= 1 && numeric <= tools.length) {
                const tool = tools[numeric - 1];
                if (tool && !tool.disabledReason) {
                    onSelectTool(tool.id);
                    event.preventDefault();
                }
            }
        };

        window.addEventListener("keydown", handleToolHotkeys);
        return () => window.removeEventListener("keydown", handleToolHotkeys);
    }, [tools, onSelectTool]);

    return (
        <Canvas shadows camera={{ position: [12, 10, 12], fov: 46 }} style={{ background: sceneBackground }}>
            <color attach="background" args={[sceneBackground]} />
            <ambientLight intensity={0.32} />
            <hemisphereLight intensity={0.55} color="#e2e8f0" groundColor={gridColor} />
            <directionalLight
                position={[8, 12, 8]}
                intensity={isPerfLimited ? 0.65 : 1}
                castShadow={!isPerfLimited}
                shadow-mapSize-width={isPerfLimited ? 512 : 1024}
                shadow-mapSize-height={isPerfLimited ? 512 : 1024}
            />
            {!isPerfLimited && <Sky sunPosition={[30, 30, 20]} turbidity={4} mieCoefficient={0.01} mieDirectionalG={0.95} rayleigh={2} />}
            <Suspense fallback={<Html center className="text-sm text-slate-500">Preparing field…</Html>}>
                <PerformanceMonitor onDecline={() => setPerfLimited(true)} onIncline={() => setPerfLimited(false)}>
                    <Grid
                        args={[36, 36]}
                        sectionSize={1}
                        infiniteFade
                        cellColor={`${gridColor}99`}
                        sectionColor={`${gridColor}cc`}
                        position={[0, 0, 0]}
                    />
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
                        <planeGeometry args={[48, 48]} />
                        <meshStandardMaterial color={`${gridColor}22`} />
                    </mesh>
                    <CropInstances plots={laidOut} highlightedId={highlightedId} />
                    {laidOut.map((plot) => (
                        <PlotTile key={plot.id} plot={plot} highlighted={plot.id === highlightedId} onSelect={onSelect} />
                    ))}
                    {landmarks.map((landmark) => (
                        <LandmarkBlock key={landmark.id} landmark={landmark} />
                    ))}
                    <MapControls
                        enableDamping={!reducedMotion}
                        dampingFactor={reducedMotion ? 0 : 0.12}
                        minDistance={5}
                        maxDistance={34}
                        maxPolarAngle={Math.PI / 2.2}
                        minPolarAngle={Math.PI / 3}
                        target={[0, 0, 0]}
                    />
                    {!isPerfLimited && <ContactShadows position={[0, -0.02, 0]} opacity={0.38} width={40} height={40} blur={2.6} far={18} />}

                    <Html fullscreen className="pointer-events-none">
                        <div className="relative flex h-full w-full">
                            <div className="pointer-events-none absolute inset-0">{overlayContent}</div>
                            <div className="pointer-events-none absolute inset-0 flex items-start justify-end p-4">
                                <SystemStatusChips kpis={financialKpis} />
                            </div>
                            <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-4">
                                <div className="pointer-events-auto">
                                    <ToolbeltOverlay
                                        tools={tools}
                                        activeTool={activeTool}
                                        onSelect={onSelectTool}
                                        workerKpi={workerKpi}
                                        inventory={inventory}
                                        animalAlerts={animalAlerts}
                                    />
                                </div>
                                <div className="pointer-events-auto">
                                    <InspectorPanel
                                        plot={selectedPlot}
                                        vitals={vitals}
                                        logisticsPlan={logisticsPlan}
                                        conversionRate={conversionRate}
                                        conversionFeePct={conversionFeePct}
                                        loanRatePct={loanRatePct}
                                        onPlant={onPlantPlot}
                                        onWater={onWaterPlot}
                                        onFertilize={onFertilizePlot}
                                        onTreat={onTreatPlot}
                                        onHarvest={onHarvestPlot}
                                        onAssignWorker={onAssignWorker}
                                    />
                                </div>
                            </div>
                            <div className="pointer-events-none absolute inset-0 p-4">
                                <HowToPlayOverlay show={!!showHowToPlay} onClose={onCloseHowToPlay} />
                            </div>
                        </div>
                    </Html>
                </PerformanceMonitor>
            </Suspense>
        </Canvas>
    );
}
