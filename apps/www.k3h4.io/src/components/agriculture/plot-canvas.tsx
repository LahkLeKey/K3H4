import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Grid, Html, MapControls, PerformanceMonitor, Sky } from "@react-three/drei";

import { agricultureDashboardStore, type ToolId } from "../../stores/agriculture-dashboard-store";
import { bankStore } from "../../stores/bank-store";
import { LandmarksLayer } from "./landmarks-layer";
import { OverlayLayer, DefaultOverlay, type LedgerItem } from "./overlay-layer";
import { PlotsLayer } from "./plots-layer";
import { generatePlotLayout } from "./plot-layout";
import type { FinancialKpis, Landmark, LandmarkId, LogisticsPlan, PlotMesh, PlotVitals, ToolConfig, WorkerKpi, InventorySummary } from "./plot-types";
import type { BuildingPanelData } from "./overlay-layer";
import { useAgricultureDashboard } from "./use-agriculture-dashboard";
import { agricultureSlotsStore } from "../../stores/agriculture-slots-store";

export type { PlotMesh } from "./plot-types";

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

    const [activeBuilding, setActiveBuilding] = useState<LandmarkId | null>(null);

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
    const { slots, unlockedSlotCount, upsertSlot, setUnlockedSlotCount } = agricultureSlotsStore.useShallow((state) => ({
        slots: state.slots,
        unlockedSlotCount: state.unlockedSlotCount,
        upsertSlot: state.upsertSlot,
        setUnlockedSlotCount: state.setUnlockedSlotCount,
    }));
    const unlockedVirtualPlots = useMemo<PlotMesh[]>(() => {
        const openSlots = slots.filter((slot) => !slot.plotId);
        return openSlots.map((slot) => ({
            id: `slot-${slot.slotIndex + 1}`,
            name: `Open Slot ${slot.slotIndex + 1}`,
            crop: "Available",
            stage: "Unlocked",
            acres: "1",
            health: "100",
            latestCondition: null,
            position: [0, 0, 0],
            size: [3, 2],
            healthTint: 0.7,
        }));
    }, [slots]);
    const [pinnedPlotId, setPinnedPlotId] = useState<string | null>(null);
    const highlightedId = pinnedPlotId ?? highlightedPlot;
    const onSelect = (id: string | null) => {
        if (pinnedPlotId && id === null) return; // keep pinned selection when hovering out
        setHighlightedPlot(id);
    };
    const onLockPlot = (id: string) => {
        setPinnedPlotId(id);
        setHighlightedPlot(id);
        setStatusMessage(`Pinned ${id} in inspector.`);
    };
    const onUnpinPlot = () => {
        if (pinnedPlotId) setHighlightedPlot(pinnedPlotId);
        setPinnedPlotId(null);
        setStatusMessage("Unpinned inspector.");
    };
    const onAddPlot = dashboard.handleConfirmAddPlot;
    const onBuySeeds = () => void dashboard.handleConfirmBuySeeds();
    const onSchedule = dashboard.handleConfirmScheduleWorkers;
    const onRefresh = () => {
        void dashboard.plotsQuery.refetch();
        void dashboard.slotsQuery.refetch();
        void dashboard.overviewQuery.refetch();
        void dashboard.analyticsQuery.refetch();
        void dashboard.tasksQuery.refetch();
        dashboard.bank.refreshBalance();
    };

    const TOTAL_PLOT_SLOTS = 12;
    const BASE_UNLOCK_COST = 100;
    const UNLOCK_STEP = 50;

    const currentSlots = Math.max(unlockedSlotCount, plots.length);
    const remainingLocked = Math.max(0, TOTAL_PLOT_SLOTS - currentSlots);
    const lockedSlots: PlotMesh[] = useMemo(() => {
        const calcCost = (slotOffset: number) => {
            const slotIndex = unlockedSlotCount + slotOffset;
            if (slotIndex === 0) return 0;
            return BASE_UNLOCK_COST + UNLOCK_STEP * slotIndex;
        };

        return Array.from({ length: remainingLocked }).map((_, index) => ({
            id: `locked-${index}`,
            name: "Locked",
            crop: "Locked",
            stage: "Locked",
            acres: "1",
            health: "0",
            latestCondition: null,
            position: [0, 0, 0],
            size: [3, 2],
            healthTint: 0.4,
            locked: true,
            unlockCost: calcCost(index),
        }));
    }, [remainingLocked, unlockedSlotCount]);

    const displayPlots = useMemo(() => [...plots, ...unlockedVirtualPlots], [plots, unlockedVirtualPlots]);
    const plotCount = displayPlots.length;
    const balance = dashboard.bank.balance ?? "–";
    const k3h4Balance = balance;
    const day = dashboard.overviewQuery.data?.shipments ?? null;
    const debt = (dashboard.analyticsQuery.data as any)?.debt ?? null;
    const conversionRate = "1:1337";
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

    const onOpenBuilding = (id: LandmarkId) => {
        setActiveBuilding((current) => (current === id ? null : id));
    };

    const onSelectBank = () => {
        setSignalsOpen(true);
        onOpenBuilding("bank");
    };
    const onSelectMarket = () => {
        setSignalsOpen(true);
        onOpenBuilding("market");
    };
    const onSelectBarn = () => {
        setRosterOpen(true);
        onOpenBuilding("barn");
    };
    const onSelectSilo = () => {
        setSignalsOpen(true);
        onOpenBuilding("silo");
    };
    const onSelectHut = () => {
        setRosterOpen(true);
        onOpenBuilding("hut");
    };

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

    const onUnlockPlot = async (id: string, cost?: number) => {
        const slotIndex = unlockedSlotCount;
        const price = cost ?? (slotIndex === 0 ? 0 : BASE_UNLOCK_COST + UNLOCK_STEP * slotIndex);
        const available = Number.isFinite(dashboard.balanceValue) ? dashboard.balanceValue : 0;
        if (available < price) {
            setStatusMessage(`Need ${price} to unlock ${id}.`);
            return;
        }

        try {
            setStatusMessage("");
            const slot = await dashboard.unlockSlotMutation.mutateAsync({ costPaid: price });
            upsertSlot(slot);
            setUnlockedSlotCount(Math.max(slot.slotIndex + 1, unlockedSlotCount + 1));
            try {
                await dashboard.bankUpdateMutation.mutateAsync({ delta: -price, reason: `Unlock plot slot ${slot.slotIndex + 1}` });
            } catch (debitError: any) {
                setStatusMessage("Slot unlocked but debit failed; refresh balance.");
                return;
            }

            setActiveBuilding(null);
            setHighlightedPlot(`slot-${slot.slotIndex + 1}`);
            setStatusMessage(`Unlocked ${id} for ${price}.`);
            void dashboard.slotsQuery.refetch();
            void dashboard.overviewQuery.refetch();
            void dashboard.plotsQuery.refetch();
        } catch (error: any) {
            setStatusMessage(error?.message || "Unable to unlock slot.");
        }
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

    const ledgerItems: LedgerItem[] = useMemo(() => {
        const taskEntries: LedgerItem[] = tasks.slice(0, 6).map((task: any) => ({
            id: `task-${task.id}`,
            title: task.title || "Task",
            detail: task.dueDate ? `Due ${task.dueDate}` : undefined,
            tag: task.status || "pending",
            tone: task.status === "completed" ? "success" : task.status === "pending" ? "warning" : "info",
        }));
        const alertEntries: LedgerItem[] = alerts.map((alert, idx) => ({
            id: `alert-${idx}`,
            title: alert,
            tag: "alert",
            tone: "warning",
        }));
        return [...taskEntries, ...alertEntries].slice(0, 6);
    }, [tasks, alerts]);

    const onCloseHowToPlay = () => setShowHowToPlay(false);

    const laidOut = useMemo(() => generatePlotLayout([...displayPlots, ...lockedSlots]), [displayPlots, lockedSlots]);
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

    const buildingPanels: Record<LandmarkId, BuildingPanelData> = useMemo(
        () => ({
            bank: {
                id: "bank",
                title: "Bank · K3H4",
                subtitle: "Convert & Loans",
                description: "Swap USD↔K3H4 coin, take loans, and view treasury health.",
                actions: [
                    { label: "Convert currency", hint: "Preview rate & fee" },
                    { label: "Request loan", hint: "See daily rate" },
                    { label: "View ledger", hint: "Recent transfers" },
                ],
                tone: "info",
            },
            market: {
                id: "market",
                title: "Market Board",
                subtitle: "Sell & Contracts",
                description: "List harvest, accept contracts, and check OSRM-adjusted delivery costs.",
                actions: [
                    { label: "List harvest", hint: "Set lots & pricing" },
                    { label: "Browse contracts", hint: "Filter by SLA" },
                    { label: "Price calculator", hint: "Freight-inclusive" },
                ],
                tone: "info",
            },
            barn: {
                id: "barn",
                title: "Barn / Pen",
                subtitle: "Animals",
                description: "Manage livestock capacity, feed schedule, and health alerts.",
                actions: [
                    { label: "Add animal lot", hint: "Species & count" },
                    { label: "Set feed plan", hint: "Auto from inventory" },
                    { label: "Review health alerts", hint: "Pests, illness" },
                ],
                tone: "warning",
            },
            silo: {
                id: "silo",
                title: "Silo",
                subtitle: "Storage",
                description: "Track storage fill, spoilage risk, and schedule outbound loads.",
                actions: [
                    { label: "Add storage lot", hint: "Crop & volume" },
                    { label: "Schedule outbound", hint: "Carrier & ETA" },
                    { label: "Check spoilage", hint: "Moisture/temperature" },
                ],
                tone: "info",
            },
            hut: {
                id: "hut",
                title: "Worker Hut",
                subtitle: "Hire & Assign",
                description: "Manage roster, assign tasks, and view utilization.",
                actions: [
                    { label: "Open roster", hint: "Invite/hire" },
                    { label: "Assign tasks", hint: "Queue & ETA" },
                    { label: "Utilization", hint: "Busy % by role" },
                ],
                tone: "success",
            },
        }),
        [],
    );
    const overlayContent = (
        <DefaultOverlay
            plotCount={plotCount}
            balance={balance}
            k3h4Balance={k3h4Balance}
            day={day}
            debt={debt}
            alerts={alerts}
            onRefresh={onRefresh}
        />
    );
    const buildingPanel = activeBuilding ? buildingPanels[activeBuilding] : null;
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
                        <PlotsLayer
                            laidOut={laidOut}
                            highlightedId={highlightedId}
                            pinnedId={pinnedPlotId}
                            onSelect={onSelect}
                            onUnlockPlot={onUnlockPlot}
                            onLockPlot={onLockPlot}
                        />
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
                ledgerItems={ledgerItems}
                buildingPanel={buildingPanel}
                onOpenBuilding={onOpenBuilding}
                onCloseBuilding={() => setActiveBuilding(null)}
                onAddPlot={onAddPlot}
                onBuySeeds={onBuySeeds}
                onSchedule={onSchedule}
                onRefresh={onRefresh}
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
                pinnedPlotId={pinnedPlotId}
                onUnpinPlot={onUnpinPlot}
            />
        </div>
    );
}
