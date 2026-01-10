import { useLayoutEffect, useRef, useState } from "react";

import { trackTelemetry } from "../../lib/telemetry";
import { agricultureDashboardStore } from "../../stores/agriculture-dashboard-store";
import { Button } from "../ui/button";
import { HudToolbar } from "../ui/hud-toolbar";
import { ActionPanel } from "../ui/action-panel";
import { PlotActionForm } from "./actions/plot-action";
import { SeedsActionForm } from "./actions/seeds-action";
import { WorkersActionForm } from "./actions/workers-action";
import { AgricultureOverlay } from "./agriculture-overlay";
import { AnalyticsPulseCard } from "./analytics-pulse-card";
import { PlotFocusCard } from "./plot-focus-card";
import { PlotCanvas } from "./plot-canvas";
import { useAgricultureDashboard } from "./use-agriculture-dashboard";

const apiBase = ((globalThis as any)?.__API_URL__ || (import.meta as any)?.API_URL || "http://localhost:3001").replace(/\/$/, "");

export function AgricultureDashboard() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

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
    planPhases,
    taskStatusCounts,
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

  const missingPlotCoins = Math.max(0, (Number(plotCost) || 0) - (balanceValue || 0));
  const shouldShowTopUp = statusMessage === "Insufficient K3H4 coin for plot purchase." && missingPlotCoins > 0;

  const handleTopUpPlotCoins = async () => {
    if (!shouldShowTopUp || bankUpdateMutation.isPending) return;
    try {
      await bankUpdateMutation.mutateAsync({ delta: missingPlotCoins, reason: `Top-up for plot ${plotName || "purchase"}` });
      setStatusMessage(`Added ${missingPlotCoins} coin for plot purchase. Retry the action.`);
    } catch (error: any) {
      setStatusMessage(error?.message || "Unable to add coin right now.");
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
          onConfirm={handleConfirmBuySeeds}
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
      <PlotFocusCard activePlot={activePlot} />
      <AnalyticsPulseCard planPhases={planPhases} taskStatusCounts={taskStatusCounts} />
    </>
  );

  const overlay = () => (
    <AgricultureOverlay
      plotCount={filteredPlots.length}
      balance={bank.balance}
      actionOverlay={actionOverlay}
      footerOverlay={footerOverlay}
      onAddPlot={handleAddPlot}
      onBuySeeds={handleBuySeeds}
      onSchedule={handleScheduleWorkers}
      onRefresh={handleRefresh}
    />
  );

  return (
    <div
      ref={containerRef}
      className="relative isolate w-full overflow-hidden rounded-2xl border bg-white"
      style={viewportHeight ? { height: `${viewportHeight}px`, maxHeight: `${viewportHeight}px` } : undefined}
    >
      <PlotCanvas
        plots={plotMeshes}
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