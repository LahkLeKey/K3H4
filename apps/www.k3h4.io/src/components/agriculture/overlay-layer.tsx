import type { ToolId } from "../../stores/agriculture-dashboard-store";
import type {
    FinancialKpis,
    InventorySummary,
    LogisticsPlan,
    PlotMesh,
    PlotVitals,
    ToolConfig,
    WorkerKpi,
} from "./plot-types";

type HowToPlayOverlayProps = {
    show: boolean;
    onClose?: () => void;
};

export function DefaultOverlay({
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

type ToolbeltOverlayProps = {
    tools?: ToolConfig[];
    activeTool?: ToolId;
    onSelect?: (id: ToolId) => void;
    workerKpi?: WorkerKpi;
    inventory?: InventorySummary;
    animalAlerts?: number;
};

export function ToolbeltOverlay({ tools, activeTool, onSelect, workerKpi, inventory, animalAlerts }: ToolbeltOverlayProps) {
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
                            className={`flex flex-col items-start gap-1 rounded-md border px-3 py-2 text-left text-[12px] shadow ${isActive ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 bg-white text-slate-700"}
                disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400`}
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
    overlayContent: JSX.Element;
    financialKpis: FinancialKpis;
    tools: ToolConfig[];
    activeTool: ToolId | undefined;
    onSelectTool: (id: ToolId) => void;
    workerKpi: WorkerKpi;
    inventory: InventorySummary;
    animalAlerts: number;
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
};

export function OverlayLayer({
    overlayContent,
    financialKpis,
    tools,
    activeTool,
    onSelectTool,
    workerKpi,
    inventory,
    animalAlerts,
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
}: OverlayLayerProps) {
    return (
        <div className="pointer-events-none absolute inset-0">
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
                    <HowToPlayOverlay show={showHowToPlay} onClose={onCloseHowToPlay} />
                </div>
            </div>
        </div>
    );
}
