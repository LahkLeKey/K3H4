import type { ReactNode } from "react";
import type { ToolId } from "../../stores/agriculture-dashboard-store";
import type { FinancialKpis, InventorySummary, LandmarkId, LogisticsPlan, PlotMesh, PlotVitals, ToolConfig, WorkerKpi } from "./plot-types";

export type LedgerItem = {
    id: string;
    title: string;
    detail?: string;
    tag?: string;
    tone?: "info" | "success" | "warning" | "danger";
};

export type BuildingPanelData = {
    id: LandmarkId;
    title: string;
    subtitle?: string;
    description?: string;
    actions?: { label: string; hint?: string }[];
    tone?: "info" | "warning" | "danger" | "success";
};

type HowToPlayOverlayProps = {
    show: boolean;
    onClose?: () => void;
};

export function DefaultOverlay({ plotCount, balance, k3h4Balance, day, debt, alerts, onRefresh }: {
    plotCount?: number;
    balance?: number | string | null;
    k3h4Balance?: number | string | null;
    day?: number | string | null;
    debt?: number | string | null;
    alerts?: string[];
    onRefresh?: () => void;
}) {
    return (
        <div className="pointer-events-auto flex max-w-md flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/90 p-3 text-sm font-semibold text-slate-800 shadow-xl backdrop-blur">
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">Day {day ?? "–"}</span>
                <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">Plots {plotCount ?? "–"}</span>
                <span className="rounded-full bg-sky-100 px-2 py-1 text-sky-700">USD {balance ?? "–"}</span>
                <span className="rounded-full bg-indigo-100 px-2 py-1 text-indigo-700">K3H4 {k3h4Balance ?? "–"}</span>
                <span className="rounded-full bg-rose-50 px-2 py-1 text-rose-700">Debt {debt ?? "–"}</span>
                {onRefresh ? (
                    <button
                        type="button"
                        onClick={onRefresh}
                        className="ml-auto rounded-full bg-slate-900 px-3 py-1 text-white shadow"
                    >
                        Sync
                    </button>
                ) : null}
            </div>

            {alerts && alerts.length > 0 ? (
                <div className="flex flex-col gap-2">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-amber-700">Alerts</div>
                    {alerts.slice(0, 4).map((alert) => (
                        <div
                            key={alert}
                            className="flex items-center gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-[11px] font-semibold text-amber-800 shadow"
                        >
                            <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden />
                            <span className="truncate" title={alert}>
                                {alert}
                            </span>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

type ToolbeltOverlayProps = {
    tools?: ToolConfig[];
    activeTool?: ToolId;
    onSelect?: (id: ToolId) => void;
    workerKpi?: WorkerKpi;
    inventory?: InventorySummary;
    animalAlerts?: number;
    onAddPlot?: () => void;
    onBuySeeds?: () => void;
    onSchedule?: () => void;
    onRefresh?: () => void;
    onOpenBuilding?: (id: LandmarkId) => void;
};

export function ToolbeltOverlay({ tools, activeTool, onSelect, workerKpi, inventory, animalAlerts, onAddPlot, onBuySeeds, onSchedule, onRefresh, onOpenBuilding }: ToolbeltOverlayProps) {
    return (
        <div className="flex w-full justify-center">
            <div className="flex w-full max-w-6xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-800 shadow-2xl backdrop-blur">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">City Manager</span>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">Busy {workerKpi?.busyPercent ?? "–"}%</span>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-700">Roster {workerKpi?.workersTotal ?? "–"}</span>
                    <span className="rounded-full bg-rose-50 px-2 py-1 text-rose-700">Alerts {animalAlerts ?? 0}</span>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2">
                    {(tools || []).map((tool) => {
                        const disabled = !!tool.disabledReason || !onSelect;
                        const isActive = activeTool === tool.id;
                        return (
                            <button
                                key={tool.id}
                                type="button"
                                onClick={() => !disabled && onSelect?.(tool.id)}
                                disabled={disabled}
                                className={`flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-[12px] font-semibold transition ${isActive ? "border-emerald-400 bg-emerald-50 text-emerald-800 shadow-md shadow-emerald-200" : "border-slate-200 bg-white text-slate-700"} disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-400`}
                                title={tool.disabledReason}
                            >
                                <span className="flex flex-col">
                                    <span>{tool.label}</span>
                                    {tool.disabledReason ? <span className="text-[10px] font-normal text-slate-500">{tool.disabledReason}</span> : null}
                                </span>
                                {tool.hotkey ? (
                                    <span className="rounded bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-700">{tool.hotkey}</span>
                                ) : null}
                            </button>
                        );
                    })}
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                    <div className="flex flex-wrap items-center gap-1">
                        {([
                            { id: "bank", label: "Bank" },
                            { id: "market", label: "Market" },
                            { id: "barn", label: "Barn" },
                            { id: "silo", label: "Silo" },
                            { id: "hut", label: "Hut" },
                        ] as Array<{ id: LandmarkId; label: string }>).map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => onOpenBuilding?.(item.id)}
                                className="rounded-md border border-slate-200 bg-white px-3 py-2 text-slate-700 shadow-sm hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={onAddPlot}
                        disabled={!onAddPlot}
                        className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700 shadow-sm disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-400"
                    >
                        Add plot
                    </button>
                    <button
                        type="button"
                        onClick={onBuySeeds}
                        disabled={!onBuySeeds}
                        className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-amber-700 shadow-sm disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-400"
                    >
                        Buy seeds
                    </button>
                    <button
                        type="button"
                        onClick={onSchedule}
                        disabled={!onSchedule}
                        className="rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-sky-700 shadow-sm disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-400"
                    >
                        Schedule workers
                    </button>
                    <button
                        type="button"
                        onClick={onRefresh}
                        disabled={!onRefresh}
                        className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700 shadow-sm disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-400"
                    >
                        Resync
                    </button>

                    <span className="ml-auto flex items-center gap-2">
                        <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1">Seeds {inventory?.seeds ?? "–"}</span>
                        <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1">Fertilizer {inventory?.fertilizer ?? "–"}</span>
                        <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1">Feed {inventory?.feed ?? "–"}</span>
                        <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1">Harvest {inventory?.harvest ?? "–"}</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

type InspectorPanelProps = {
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
    isPinned?: boolean;
    onUnpin?: () => void;
};

export function InspectorPanel({
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
    isPinned,
    onUnpin,
}: InspectorPanelProps) {
    const healthValue = plot ? Number(plot.health) || 0 : 0;
    const stageLabel = plot?.stage || "Unplanted";

    return (
        <div className="w-80 max-w-full rounded-xl border border-slate-200 bg-white/95 p-3 text-sm text-slate-800 shadow-xl">
            <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Inspector</div>
                    <div className="text-sm font-semibold text-slate-800">{plot ? plot.name : "Select a plot"}</div>
                    {plot ? <div className="text-xs text-slate-500">{plot.crop}</div> : null}
                    {plot && isPinned ? (
                        <button
                            type="button"
                            onClick={onUnpin}
                            className="mt-1 inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-semibold text-indigo-700 shadow"
                        >
                            Pinned
                            {onUnpin ? <span className="text-indigo-600">· Unpin</span> : null}
                        </button>
                    ) : null}
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

export function HowToPlayOverlay({ show, onClose }: HowToPlayOverlayProps) {
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

type SystemStatusChipsProps = {
    kpis?: FinancialKpis;
};

export function SystemStatusChips({ kpis }: SystemStatusChipsProps) {
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

export type OverlayLayerProps = {
    overlayContent: ReactNode;
    financialKpis: FinancialKpis;
    tools: ToolConfig[];
    activeTool: ToolId | undefined;
    onSelectTool: (id: ToolId) => void;
    workerKpi: WorkerKpi;
    inventory: InventorySummary;
    animalAlerts: number;
    onAddPlot?: () => void;
    onBuySeeds?: () => void;
    onSchedule?: () => void;
    onRefresh?: () => void;
    ledgerItems?: LedgerItem[];
    buildingPanel?: BuildingPanelData | null;
    onOpenBuilding?: (id: LandmarkId) => void;
    onCloseBuilding?: () => void;
    selectedPlot: PlotMesh | null;
    vitals?: PlotVitals;
    logisticsPlan?: LogisticsPlan;
    conversionRate?: number | string | null;
    conversionFeePct?: number | string | null;
    loanRatePct?: number | string | null;
    onPlantPlot: (id: string) => void;
    onWaterPlot: (id: string) => void;
    onFertilizePlot: (id: string) => void;
    onTreatPlot: (id: string) => void;
    onHarvestPlot: (id: string) => void;
    onAssignWorker: (id: string) => void;
    showHowToPlay: boolean;
    onCloseHowToPlay: () => void;
    pinnedPlotId?: string | null;
    onUnpinPlot?: () => void;
};

function HistoryLedger({ items }: { items?: LedgerItem[] }) {
    if (!items || items.length === 0) {
        return (
            <div className="w-80 max-w-full rounded-xl border border-slate-200 bg-white/95 p-3 text-sm text-slate-700 shadow-xl">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <span>Recent activity</span>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-600">Empty</span>
                </div>
                <p className="mt-2 text-xs text-slate-500">Actions you take will show here for quick recall.</p>
            </div>
        );
    }

    return (
        <div className="w-80 max-w-full rounded-xl border border-slate-200 bg-white/95 p-3 text-sm text-slate-800 shadow-xl">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
                <span>Recent activity</span>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] text-slate-600">{items.length}</span>
            </div>
            <div className="mt-2 flex flex-col gap-2">
                {items.slice(0, 6).map((item) => {
                    const tone = item.tone || "info";
                    const pillClass =
                        tone === "success"
                            ? "bg-emerald-50 text-emerald-700"
                            : tone === "warning"
                                ? "bg-amber-50 text-amber-700"
                                : tone === "danger"
                                    ? "bg-rose-50 text-rose-700"
                                    : "bg-slate-100 text-slate-700";
                    return (
                        <div key={item.id} className="flex items-start justify-between gap-2 rounded-lg border border-slate-100 bg-white px-3 py-2 text-[12px] font-semibold text-slate-800">
                            <div className="flex flex-col gap-0.5">
                                <span className="leading-tight">{item.title}</span>
                                {item.detail ? <span className="text-[11px] font-normal text-slate-600">{item.detail}</span> : null}
                            </div>
                            {item.tag ? <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${pillClass}`}>{item.tag}</span> : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function BuildingPanel({ panel, onClose }: { panel?: BuildingPanelData | null; onClose?: () => void }) {
    if (!panel) return null;

    const tone = panel.tone || "info";
    const badgeClass =
        tone === "success"
            ? "bg-emerald-50 text-emerald-700"
            : tone === "warning"
                ? "bg-amber-50 text-amber-700"
                : tone === "danger"
                    ? "bg-rose-50 text-rose-700"
                    : "bg-sky-50 text-sky-700";

    return (
        <div className="w-80 max-w-full rounded-xl border border-slate-200 bg-white/95 p-3 text-sm text-slate-800 shadow-xl">
            <div className="mb-2 flex items-start justify-between gap-2">
                <div className="flex flex-col gap-1">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{panel.title}</div>
                    {panel.subtitle ? <div className="text-[12px] text-slate-600">{panel.subtitle}</div> : null}
                </div>
                <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-1 text-[11px] font-semibold ${badgeClass}`}>{panel.id}</span>
                    {onClose ? (
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600 shadow-sm"
                        >
                            Close
                        </button>
                    ) : null}
                </div>
            </div>
            {panel.description ? <p className="text-[12px] text-slate-600">{panel.description}</p> : null}
            <div className="mt-2 flex flex-col gap-2">
                {(panel.actions || []).map((action) => (
                    <button
                        key={action.label}
                        type="button"
                        className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-left text-[12px] font-semibold text-slate-700 shadow-sm hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                    >
                        <span>{action.label}</span>
                        {action.hint ? <span className="text-[11px] font-normal text-slate-500">{action.hint}</span> : null}
                    </button>
                ))}
            </div>
        </div>
    );
}

export function OverlayLayer({
    overlayContent,
    financialKpis,
    tools,
    activeTool,
    onSelectTool,
    workerKpi,
    inventory,
    animalAlerts,
    onAddPlot,
    onBuySeeds,
    onSchedule,
    onRefresh,
    ledgerItems,
    buildingPanel,
    onOpenBuilding,
    onCloseBuilding,
    selectedPlot,
    vitals,
    logisticsPlan,
    conversionRate,
    conversionFeePct,
    loanRatePct,
    onPlantPlot,
    onWaterPlot,
    onFertilizePlot,
    onTreatPlot,
    onHarvestPlot,
    onAssignWorker,
    showHowToPlay,
    onCloseHowToPlay,
    pinnedPlotId,
    onUnpinPlot,
}: OverlayLayerProps) {
    return (
        <div className="pointer-events-none absolute inset-0 flex flex-col">
            <div className="flex flex-col gap-3 p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="pointer-events-auto flex flex-col gap-3">
                        {overlayContent}
                    </div>
                    <div className="pointer-events-auto flex flex-col items-end gap-3">
                        <SystemStatusChips kpis={financialKpis} />
                        <HowToPlayOverlay show={showHowToPlay} onClose={onCloseHowToPlay} />
                    </div>
                </div>
            </div>

            {buildingPanel ? (
                <div className="pointer-events-auto absolute left-4 top-24 z-20 max-w-sm">
                    <BuildingPanel panel={buildingPanel} onClose={onCloseBuilding} />
                </div>
            ) : null}

            <div className="flex flex-1 items-end justify-between gap-3 p-4">
                <div className="pointer-events-auto flex flex-1 justify-center">
                    <ToolbeltOverlay
                        tools={tools}
                        activeTool={activeTool}
                        onSelect={onSelectTool}
                        workerKpi={workerKpi}
                        inventory={inventory}
                        animalAlerts={animalAlerts}
                        onAddPlot={onAddPlot}
                        onBuySeeds={onBuySeeds}
                        onSchedule={onSchedule}
                        onRefresh={onRefresh}
                        onOpenBuilding={onOpenBuilding}
                    />
                </div>
                <div className="pointer-events-auto shrink-0 flex max-h-[70vh] flex-col gap-3 overflow-auto">
                    <HistoryLedger items={ledgerItems} />
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
                        isPinned={selectedPlot ? selectedPlot.id === pinnedPlotId : false}
                        onUnpin={onUnpinPlot}
                    />
                </div>
            </div>
        </div>
    );
}
