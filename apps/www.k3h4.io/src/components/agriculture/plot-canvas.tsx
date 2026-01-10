import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Grid, Html, MapControls, PerformanceMonitor, Sky } from "@react-three/drei";

import { agricultureDashboardStore, type ToolId } from "../../stores/agriculture-dashboard-store";
import { bankStore } from "../../stores/bank-store";
import { LandmarksLayer } from "./landmarks-layer";
import { OverlayLayer, DefaultOverlay } from "./overlay-layer";
import { PlotsLayer } from "./plots-layer";
import { generatePlotLayout } from "./plot-layout";
import type {
    FinancialKpis,
    Landmark,
    LogisticsPlan,
    PlotMesh,
    PlotVitals,
    ToolConfig,
    WorkerKpi,
    InventorySummary,
} from "./plot-types";
import { useAgricultureDashboard } from "./use-agriculture-dashboard";

export function PlotCanvas() {
    const {
        highlightedPlot,
        searchTerm,
        plotName,
        plotCrop,
        plotAcres,
        plotCost,
        seedCommodity,
        seedCost,
        workerTaskTitle,
        workerDueDate,
        workerAssignee,
        activeTool,
        showHowToPlay,
        reducedMotion,
        keyboardNavigation,
        setHighlightedPlot,
        setActionMode,
        setSignalsOpen,
        setRosterOpen,
        setWorkerDueDate,
        setStatusMessage,
        setActiveTool,
        setShowHowToPlay,
    } = agricultureDashboardStore.useShallow((state) => ({
        highlightedPlot: state.highlightedPlot,
        searchTerm: state.searchTerm,
        plotName: state.plotName,
        plotCrop: state.plotCrop,
        plotAcres: state.plotAcres,
        plotCost: state.plotCost,
        seedCommodity: state.seedCommodity,
        seedCost: state.seedCost,
        workerTaskTitle: state.workerTaskTitle,
        workerDueDate: state.workerDueDate,
        workerAssignee: state.workerAssignee,
        activeTool: state.activeTool,
        showHowToPlay: state.showHowToPlay,
        reducedMotion: state.reducedMotion,
        keyboardNavigation: state.keyboardNavigation,
        setHighlightedPlot: state.setHighlightedPlot,
        setActionMode: state.setActionMode,
        setSignalsOpen: state.setSignalsOpen,
        setRosterOpen: state.setRosterOpen,
        setWorkerDueDate: state.setWorkerDueDate,
        setStatusMessage: state.setStatusMessage,
        setActiveTool: state.setActiveTool,
        setShowHowToPlay: state.setShowHowToPlay,
    }));

    const { apiBase } = bankStore.useShallow((state) => ({ apiBase: state.apiBase }));

    const dashboard = useAgricultureDashboard({
        apiBase,
        highlightedPlot,
        searchTerm,
        plotName,
        plotCrop,
        plotAcres,
        plotCost,
        seedCommodity,
        seedCost,
        workerTaskTitle,
        workerDueDate,
        workerAssignee,
        setActionMode,
        setSignalsOpen,
        setRosterOpen,
        setWorkerDueDate,
        setStatusMessage,
    });

    const plots = dashboard.plotMeshes;
    const highlightedId = highlightedPlot;
    const onSelect = (id: string | null) => setHighlightedPlot(id);
    const onAddPlot = dashboard.handleConfirmAddPlot;
    const onBuySeeds = () => void dashboard.handleConfirmBuySeeds();
    const onSchedule = dashboard.handleConfirmScheduleWorkers;
    const onRefresh = () => {
        void dashboard.plotsQuery.refetch();
        void dashboard.overviewQuery.refetch();
        void dashboard.analyticsQuery.refetch();
        void dashboard.tasksQuery.refetch();
        dashboard.bank.refreshBalance();
    };

    const plotCount = plots.length;
    const balance = dashboard.bank.balance ?? "–";
    const k3h4Balance = balance;
    const day = dashboard.overviewQuery.data?.day ?? dashboard.overviewQuery.data?.daysElapsed ?? null;
    const debt = (dashboard.analyticsQuery.data as any)?.debt ?? null;
    const conversionRate = "1:10";
    const conversionFeePct = "2%";
    const loanRatePct = "5%";

    const plotVitalsById = useMemo<Record<string, PlotVitals>>(() => ({}), []);
    const logisticsPlan: LogisticsPlan | undefined = undefined;

    const financialKpis: FinancialKpis = useMemo(
        () => ({
            dailyPnL: (dashboard.analyticsQuery.data as any)?.pnl ?? "–",
            burnRate: (dashboard.analyticsQuery.data as any)?.burnRate ?? "Stable",
            receivables: (dashboard.analyticsQuery.data as any)?.receivables ?? "–",
            slaRisk: "On track",
            osrmStatus: "fallback",
            usdaStatus: "live",
        }),
        [dashboard.analyticsQuery.data],
    );

    const onPlantPlot = (id: string) => setStatusMessage(`Queued plant for ${id}`);
    const onWaterPlot = (id: string) => setStatusMessage(`Queued water for ${id}`);
    const onFertilizePlot = (id: string) => setStatusMessage(`Queued fertilize for ${id}`);
    const onTreatPlot = (id: string) => setStatusMessage(`Queued pest treatment for ${id}`);
    const onHarvestPlot = (id: string) => setStatusMessage(`Queued harvest for ${id}`);
    const onAssignWorker = (id: string) => {
        setRosterOpen(true);
        setStatusMessage(`Assign worker to ${id}`);
    };

    const onSelectBank = () => setSignalsOpen(true);
    const onSelectMarket = () => setSignalsOpen(true);
    const onSelectBarn = () => setRosterOpen(true);
    const onSelectSilo = () => setSignalsOpen(true);
    const onSelectHut = () => setRosterOpen(true);

    const tools: ToolConfig[] = useMemo(
        () => [
            { id: "select", label: "Select", hotkey: "1" },
            { id: "plant", label: "Plant", hotkey: "2" },
            { id: "water", label: "Water", hotkey: "3" },
            { id: "fertilize", label: "Fertilize", hotkey: "4" },
            { id: "treat", label: "Treat", hotkey: "5" },
            { id: "harvest", label: "Harvest", hotkey: "6" },
            { id: "assign", label: "Assign", hotkey: "7" },
        ],
        [],
    );

    const onSelectTool = (id: ToolId) => {
        setActiveTool(id);
        setStatusMessage(`Selected tool ${id}`);
    };

    const tasks = dashboard.tasksQuery.data?.tasks ?? [];
    const workerKpi: WorkerKpi = {
        busyPercent: tasks.length > 0 ? Math.min(100, Math.round((tasks.filter((task: any) => task.status !== "completed").length / tasks.length) * 100)) : 0,
        workersTotal: undefined,
    };

    const inventory: InventorySummary = {
        seeds: (dashboard.overviewQuery.data as any)?.seeds ?? "–",
        fertilizer: (dashboard.overviewQuery.data as any)?.fertilizer ?? "–",
        feed: (dashboard.overviewQuery.data as any)?.feed ?? "–",
        harvest: (dashboard.overviewQuery.data as any)?.harvest ?? "–",
    };

    const animalAlerts = (dashboard.analyticsQuery.data as any)?.animalAlerts ?? 0;

    const alerts = useMemo(() => {
        const ready = plots.filter((plot) => (plot.stage || "").toLowerCase().includes("ready")).map((plot) => `${plot.name} ready to harvest`);
        const dry = plots.filter((plot) => Number(plot.health) < 45).map((plot) => `${plot.name} is dry`);
        const taskAlerts = tasks.filter((task: any) => task.status === "pending").map((task: any) => task.title || "Pending task");
        return [...ready, ...dry, ...taskAlerts].slice(0, 4);
    }, [plots, tasks]);

    const onCloseHowToPlay = () => setShowHowToPlay(false);

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
        [onSelectBank, onSelectMarket, onSelectBarn, onSelectSilo, onSelectHut],
    );
    const overlayContent = (
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
        if (!tools || tools.length === 0) return;

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
        <div className="relative h-full w-full">
            <Canvas shadows camera={{ position: [12, 10, 12], fov: 46 }} style={{ background: sceneBackground }} className="h-full w-full">
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
                <Suspense fallback={<Html center className="text-sm text-slate-500">Preparing field...</Html>}>
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
                        <PlotsLayer laidOut={laidOut} highlightedId={highlightedId} onSelect={onSelect} />
                        <LandmarksLayer landmarks={landmarks} />
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
                    </PerformanceMonitor>
                </Suspense>
            </Canvas>
            <OverlayLayer
                overlayContent={overlayContent}
                financialKpis={financialKpis}
                tools={tools}
                activeTool={activeTool}
                onSelectTool={onSelectTool}
                workerKpi={workerKpi}
                inventory={inventory}
                animalAlerts={animalAlerts}
                selectedPlot={selectedPlot}
                vitals={vitals}
                logisticsPlan={logisticsPlan}
                conversionRate={conversionRate}
                conversionFeePct={conversionFeePct}
                loanRatePct={loanRatePct}
                onPlantPlot={onPlantPlot}
                onWaterPlot={onWaterPlot}
                onFertilizePlot={onFertilizePlot}
                onTreatPlot={onTreatPlot}
                onHarvestPlot={onHarvestPlot}
                onAssignWorker={onAssignWorker}
                showHowToPlay={!!showHowToPlay}
                onCloseHowToPlay={onCloseHowToPlay}
            />
        </div>
    );
}
