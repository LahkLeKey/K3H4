import { useLayoutEffect, useMemo, useRef, useState } from "react";

import { trackTelemetry } from "../../lib/telemetry";
import { agricultureDashboardStore } from "../../stores/agriculture-dashboard-store";
import { Button } from "../ui/button";
import { HudToolbar } from "../ui/hud-toolbar";
import { ActionPanel } from "../ui/action-panel";
import { PlotActionForm } from "./actions/plot-action";
import { SeedsActionForm } from "./actions/seeds-action";
import { WorkersActionForm } from "./actions/workers-action";
import { AgricultureOverlay } from "./agriculture-overlay";
import { PlotFocusCard } from "./plot-focus-card";
import { PlotCanvas } from "./plot-canvas";
import { SelectedPlotControlsCard } from "./selected-plot-controls-card";
import { SeedInventoryCard, type SeedInventoryItem } from "./seed-inventory-card";
import { useAgricultureDashboard } from "./use-agriculture-dashboard";

const apiBase = ((globalThis as any)?.__API_URL__ || (import.meta as any)?.API_URL || "http://localhost:3001").replace(/\/$/, "");

export function AgricultureDashboard() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const [seedInventory, setSeedInventory] = useState<SeedInventoryItem[]>([]);
  const [selectedSeed, setSelectedSeed] = useState<string>("");
  const [plotSeedOverrides, setPlotSeedOverrides] = useState<Record<string, string>>({});
  const [showBankOverlay, setShowBankOverlay] = useState(false);

  const {
    highlightedPlot,
    setHighlightedPlot,
    searchTerm,
    actionMode,
    setActionMode,
    plotName,
    setPlotName,
    plotCrop,
    setPlotCrop,
    plotAcres,
    setPlotAcres,
    plotCost,
    setPlotCost,
    seedCommodity,
    setSeedCommodity,
    seedCost,
    setSeedCost,
    workerTaskTitle,
    setWorkerTaskTitle,
    workerDueDate,
    setWorkerDueDate,
    workerAssignee,
    setWorkerAssignee,
    statusMessage,
    setStatusMessage,
  } = agricultureDashboardStore.useShallow((state) => state);

  const {
    bank,
    filteredPlots,
    activePlot,
    plotMeshes,
    seedOptions,
    assigneeOptions,
    derivedStatusMessage,
    busy,
    bankUpdateMutation,
    balanceValue,
    handleConfirmAddPlot,
    handleConfirmBuySeeds,
    handleConfirmScheduleWorkers,
  } = useAgricultureDashboard({
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
    setSignalsOpen: () => undefined,
    setRosterOpen: () => undefined,
    setWorkerDueDate,
    setStatusMessage,
  });

  const handleAddPlot = () => setActionMode(actionMode === "plot" ? null : "plot");
  const handleBuySeeds = () => setActionMode(actionMode === "seeds" ? null : "seeds");
  const handleScheduleWorkers = () => setActionMode(actionMode === "workers" ? null : "workers");
  const handleRefresh = () => trackTelemetry("agriculture.dashboard.refresh");

  useLayoutEffect(() => {
    const recompute = () => {
      const top = containerRef.current?.getBoundingClientRect().top ?? 0;
      const padding = 16; // leave breathing room to avoid scrollbars
      setViewportHeight(Math.max(360, window.innerHeight - top - padding));
    };
    recompute();
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, []);

  useLayoutEffect(() => {
    if (!seedOptions.length || seedInventory.length) return;
    const starter = seedOptions.slice(0, 6).map((option, index) => ({
      code: option.code || `seed-${index}`,
      label: option.label || `Seed ${index + 1}`,
      quantity: 5,
    }));
    setSeedInventory(starter);
  }, [seedOptions, seedInventory.length]);

  const missingPlotCoins = Math.max(0, (Number(plotCost) || 0) - (balanceValue || 0));
  const shouldShowTopUp = statusMessage === "Insufficient K3H4 coin for plot purchase." && missingPlotCoins > 0;

  const activePlotOverrideCrop = activePlot ? plotSeedOverrides[activePlot.id] : undefined;
  const activePlotWithOverride = activePlot ? { ...activePlot, crop: activePlotOverrideCrop || activePlot.crop } : activePlot;
  const plotMeshesWithOverrides = useMemo(
    () => plotMeshes.map((plot) => (plotSeedOverrides[plot.id] ? { ...plot, crop: plotSeedOverrides[plot.id] } : plot)),
    [plotMeshes, plotSeedOverrides],
  );

  const handleTopUpPlotCoins = async () => {
    if (!shouldShowTopUp || bankUpdateMutation.isPending) return;
    try {
      await bankUpdateMutation.mutateAsync({ delta: missingPlotCoins, reason: `Top-up for plot ${plotName || "purchase"}` });
      setStatusMessage(`Added ${missingPlotCoins} coin for plot purchase. Retry the action.`);
    } catch (error: any) {
      setStatusMessage(error?.message || "Unable to add coin right now.");
    }
  };

  const handleConfirmBuySeedsWithInventory = async () => {
    const success = await handleConfirmBuySeeds();
    if (!success || !seedCommodity) return;
    const label = seedOptions.find((item) => item.code === seedCommodity)?.label || seedCommodity;
    setSeedInventory((prev) => {
      const existing = prev.find((item) => item.code === seedCommodity);
      if (existing) {
        return prev.map((item) => (item.code === seedCommodity ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { code: seedCommodity, label, quantity: 1 }];
    });
    setSelectedSeed(seedCommodity);
  };

  const handleApplySeedToPlot = () => {
    if (!activePlot) {
      setStatusMessage("Select a plot before planting.");
      return;
    }
    if (!selectedSeed) {
      setStatusMessage("Choose a seed to plant.");
      return;
    }
    const inventoryItem = seedInventory.find((item) => item.code === selectedSeed);
    if (!inventoryItem || inventoryItem.quantity <= 0) {
      setStatusMessage("No inventory for that seed.");
      return;
    }
    setSeedInventory((prev) => prev.map((item) => (item.code === selectedSeed ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item)));
    setPlotSeedOverrides((prev) => ({ ...prev, [activePlot.id]: inventoryItem.label }));
    setStatusMessage(`Planted ${inventoryItem.label} on ${activePlot.name}.`);
    void trackTelemetry("agriculture.dashboard.plant_seed", { plotId: activePlot.id, seed: inventoryItem.code });
  };

  const handleBankTopUp = async (delta: number) => {
    try {
      await bankUpdateMutation.mutateAsync({ delta, reason: "Bank overlay top-up" });
      setStatusMessage(`Added ${delta} K3H4 coin to bank.`);
    } catch (error: any) {
      setStatusMessage(error?.message || "Unable to update bank.");
    }
  };

  const actionOverlay = actionMode ? (
    <ActionPanel eyebrow="Farm action" title={actionMode} onClose={() => setActionMode(null)}>
      {actionMode === "plot" ? (
        <PlotActionForm
          plotName={plotName}
          plotCrop={plotCrop}
          plotAcres={plotAcres}
          plotCost={plotCost}
          busy={busy}
          onPlotNameChange={setPlotName}
          onPlotCropChange={setPlotCrop}
          onPlotAcresChange={setPlotAcres}
          onPlotCostChange={setPlotCost}
          onConfirm={handleConfirmAddPlot}
        />
      ) : null}

      {actionMode === "seeds" ? (
        <SeedsActionForm
          seedOptions={seedOptions}
          seedCommodity={seedCommodity}
          seedCost={seedCost}
          busy={busy}
          onSeedCommodityChange={setSeedCommodity}
          onSeedCostChange={setSeedCost}
          onConfirm={handleConfirmBuySeedsWithInventory}
        />
      ) : null}

      {actionMode === "workers" ? (
        <WorkersActionForm
          taskTitle={workerTaskTitle}
          dueDate={workerDueDate}
          assignee={workerAssignee}
          assigneeOptions={assigneeOptions}
          busy={busy}
          onTaskTitleChange={setWorkerTaskTitle}
          onDueDateChange={setWorkerDueDate}
          onAssigneeChange={setWorkerAssignee}
          onConfirm={handleConfirmScheduleWorkers}
        />
      ) : null}

      {statusMessage ? <p className="text-xs text-muted-foreground">{statusMessage}</p> : null}
      {shouldShowTopUp ? (
        <HudToolbar className="justify-start p-0">
          <Button size="sm" variant="secondary" onClick={handleTopUpPlotCoins} disabled={bankUpdateMutation.isPending}>
            Add {missingPlotCoins} coin to proceed
          </Button>
        </HudToolbar>
      ) : null}
      {!statusMessage && derivedStatusMessage ? <p className="text-xs text-muted-foreground">{derivedStatusMessage}</p> : null}
    </ActionPanel>
  ) : null;

  const footerOverlay = (
    <>
      <PlotFocusCard activePlot={activePlotWithOverride} />
      <SelectedPlotControlsCard
        activePlotName={activePlotWithOverride?.name}
        onBuySeeds={handleBuySeeds}
        onSchedule={handleScheduleWorkers}
        onRefresh={handleRefresh}
      />
      <SeedInventoryCard
        items={seedInventory}
        selectedCode={selectedSeed}
        onSelect={setSelectedSeed}
        onApplyToPlot={handleApplySeedToPlot}
        disabled={!activePlot}
      />
    </>
  );

  const overlay = () => (
    <AgricultureOverlay
      plotCount={filteredPlots.length}
      balance={bank.balance}
      actionOverlay={actionOverlay}
      footerOverlay={footerOverlay}
      bankOverlay={showBankOverlay ? (
        <HudToolbar className="items-start">
          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Bank</p>
            <span className="text-sm font-semibold">Balance {bank.balance ?? "—"} coin</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => handleBankTopUp(10)}>+10 coin</Button>
            <Button size="sm" variant="secondary" onClick={() => handleBankTopUp(25)}>+25 coin</Button>
          </div>
        </HudToolbar>
      ) : null}
      onAddPlot={handleAddPlot}
      onBuySeeds={handleBuySeeds}
      onSchedule={handleScheduleWorkers}
      onRefresh={handleRefresh}
      onToggleBank={() => setShowBankOverlay((prev) => !prev)}
      bankOpen={showBankOverlay}
    />
  );

  return (
    <div
      ref={containerRef}
      className="relative isolate w-full overflow-hidden rounded-2xl border bg-white"
      style={viewportHeight ? { height: `${viewportHeight}px`, maxHeight: `${viewportHeight}px` } : undefined}
    >
      <PlotCanvas
        plots={plotMeshesWithOverrides}
        highlightedId={highlightedPlot}
        onSelect={setHighlightedPlot}
        onAddPlot={handleAddPlot}
        onBuySeeds={handleBuySeeds}
        onSchedule={handleScheduleWorkers}
        onRefresh={handleRefresh}
        plotCount={filteredPlots.length}
        balance={bank.balance}
        overlay={overlay}
      />
    </div>
  );
}