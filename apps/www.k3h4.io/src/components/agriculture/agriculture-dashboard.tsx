import { trackTelemetry } from "../../lib/telemetry";
import { agricultureDashboardStore } from "../../stores/agriculture-dashboard-store";
import { Section } from "../section";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { HudCard } from "../ui/hud-card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { HudChip } from "../ui/hud-chip";
import { HudListPanel } from "../ui/hud-list-panel";
import { HudListItem } from "../ui/hud-list-item";
import { HudToolbar } from "../ui/hud-toolbar";
import { MetricTile } from "../ui/metric-tile";
import { Input } from "../ui/input";
import { FieldRow } from "../ui/field-row";
import { ScrollArea } from "../ui/scroll-area";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Empty, EmptyContent, EmptyDescription, EmptyTitle } from "../ui/empty";
import { Spinner } from "../ui/spinner";
import { ActionPanel } from "../ui/action-panel";
import { PlotActionForm } from "./actions/plot-action";
import { SeedsActionForm } from "./actions/seeds-action";
import { WorkersActionForm } from "./actions/workers-action";
import { PlotCanvas } from "./plot-canvas";
import { useAgricultureDashboard } from "./use-agriculture-dashboard";
import { formatCommodityLabel, formatRaw, formatReleaseLabel } from "./utils";

const apiBase = ((globalThis as any)?.__API_URL__ || (import.meta as any)?.API_URL || "http://localhost:3001").replace(/\/$/, "");

const formatDate = (value?: string | null) => {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(parsed);
};

const formatErrorMessage = (error?: unknown) => (error instanceof Error ? error.message : "Unable to load data.");

export function AgricultureDashboard() {
  const {
    highlightedPlot,
    setHighlightedPlot,
    searchTerm,
    setSearchTerm,
    rosterOpen,
    setRosterOpen,
    signalsOpen,
    setSignalsOpen,
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
    overviewQuery,
    plotsQuery,
    usdaEsrCommoditiesQuery,
    usdaEsrReleaseQuery,
    usdaPsdCommoditiesQuery,
    bank,
    filteredPlots,
    activePlot,
    plotMeshes,
    seedOptions,
    assigneeOptions,
    planPhases,
    taskStatusCounts,
    esrCommodities,
    psdCommodities,
    esrReleases,
    esrCommodityList,
    psdCommodityList,
    esrReleaseList,
    busy,
    derivedStatusMessage,
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
    setSignalsOpen,
    setRosterOpen,
    setWorkerDueDate,
    setStatusMessage,
  });

  const plotCards = [
    { label: "Plots", value: overviewQuery.data?.plots ?? "—", note: "From API" },
    { label: "Tasks", value: overviewQuery.data?.tasks ?? "—", note: "Work orders" },
    { label: "Shipments", value: overviewQuery.data?.shipments ?? "—", note: "Loads" },
  ];

  const handleAddPlot = () => setActionMode(actionMode === "plot" ? null : "plot");
  const handleBuySeeds = () => setActionMode(actionMode === "seeds" ? null : "seeds");
  const handleScheduleWorkers = () => setActionMode(actionMode === "workers" ? null : "workers");

  return (
    <Section
      eyebrow="Agriculture"
      title="Spatial plot manager"
      actions={
        <HudToolbar>
          <Dialog open={rosterOpen} onOpenChange={setRosterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Roster</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Plot roster</DialogTitle>
                <DialogDescription>Quick field lineup and worker targets.</DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh] rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plot</TableHead>
                      <TableHead>Crop · stage</TableHead>
                      <TableHead>Acres</TableHead>
                      <TableHead>Health</TableHead>
                      <TableHead>Latest</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plotsQuery.isLoading ? (
                      <TableRow><TableCell colSpan={5} className="text-muted-foreground">Loading…</TableCell></TableRow>
                    ) : plotsQuery.isError ? (
                      <TableRow><TableCell colSpan={5} className="text-destructive">{formatErrorMessage(plotsQuery.error)}</TableCell></TableRow>
                    ) : filteredPlots.length ? (
                      filteredPlots.map((plot) => (
                        <TableRow key={plot.id} onMouseEnter={() => setHighlightedPlot(plot.id)} onMouseLeave={() => setHighlightedPlot(null)}>
                          <TableCell className="font-semibold text-foreground">{plot.name}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            <HudToolbar className="flex-col items-start gap-1 p-0">
                              <span className="text-foreground">{plot.crop}</span>
                              <HudChip tone="outline" className="text-[11px] uppercase tracking-[0.3em]">{plot.stage}</HudChip>
                            </HudToolbar>
                          </TableCell>
                          <TableCell>{plot.acres}</TableCell>
                          <TableCell>
                            <Badge variant="success">{plot.health}</Badge>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">{plot.latestCondition ? formatDate(plot.latestCondition.recordedAt) : "—"}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow><TableCell colSpan={5} className="text-muted-foreground">No plots available.</TableCell></TableRow>
                    )}
                  </TableBody>
                  <TableCaption>Use roster to assign workers and coin.</TableCaption>
                </Table>
              </ScrollArea>
            </DialogContent>
          </Dialog>

          <Dialog open={signalsOpen} onOpenChange={setSignalsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">USDA signals</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>USDA feeds</DialogTitle>
                <DialogDescription>Seed lists and release cadence to shop from.</DialogDescription>
              </DialogHeader>
              <HudCard className="space-y-3 text-sm">
                <HudListPanel
                  title="ESR commodities"
                  badge={<Badge variant="secondary">{esrCommodities.length || "—"}</Badge>}
                  loading={usdaEsrCommoditiesQuery.isLoading}
                >
                  {esrCommodityList.length ? esrCommodityList.map((item, idx) => (
                    <HudListItem key={idx} primary={formatCommodityLabel(item)} secondary={item?.commodityCode || item?.CommodityCode || ""} />
                  )) : null}
                </HudListPanel>

                <HudListPanel
                  title="PSD commodities"
                  badge={<Badge variant="secondary">{psdCommodities.length || "—"}</Badge>}
                  loading={usdaPsdCommoditiesQuery.isLoading}
                >
                  {psdCommodityList.length ? psdCommodityList.map((item, idx) => (
                    <HudListItem key={idx} primary={formatCommodityLabel(item)} secondary={item?.commodityCode || item?.CommodityCode || ""} />
                  )) : null}
                </HudListPanel>

                <HudListPanel
                  title="ESR releases"
                  badge={<Badge variant="secondary">{esrReleases.length || "—"}</Badge>}
                  loading={usdaEsrReleaseQuery.isLoading}
                >
                  {esrReleaseList.length ? esrReleaseList.map((item, idx) => (
                    <HudListItem key={idx} primary={formatDate(formatReleaseLabel(item))} secondary={formatRaw(item, 32)} />
                  )) : null}
                </HudListPanel>
              </HudCard>
            </DialogContent>
          </Dialog>

          <Button variant="secondary" size="sm" onClick={() => trackTelemetry("agriculture.dashboard.refresh")}>Refresh data</Button>
        </HudToolbar>
      }
      className="p-0"
    >
      <HudCard className="relative isolate overflow-hidden rounded-2xl border bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-0">
        <HudCard className="absolute inset-0 border-none bg-transparent p-0 shadow-none">
          {plotsQuery.isLoading ? (
            <Empty className="h-full border-none bg-transparent">
              <EmptyContent>
                <Spinner className="text-muted-foreground" />
                <EmptyTitle>Loading plots…</EmptyTitle>
              </EmptyContent>
            </Empty>
          ) : plotsQuery.isError ? (
            <Empty className="h-full border-none bg-transparent">
              <EmptyContent>
                <EmptyTitle className="text-destructive">{formatErrorMessage(plotsQuery.error)}</EmptyTitle>
                <EmptyDescription>Refresh or reopen once the API responds.</EmptyDescription>
              </EmptyContent>
            </Empty>
          ) : filteredPlots.length ? (
            <PlotCanvas plots={plotMeshes} highlightedId={highlightedPlot} onSelect={setHighlightedPlot} />
          ) : (
            <Empty className="h-full border-none bg-transparent">
              <EmptyContent>
                <EmptyTitle>No plots to render</EmptyTitle>
                <EmptyDescription>Use Farm manager actions to add your first plot.</EmptyDescription>
              </EmptyContent>
            </Empty>
          )}
        </HudCard>

        <HudCard className="relative z-10 flex min-h-[640px] flex-col justify-between border-none bg-gradient-to-t from-background/10 via-background/0 to-background/10 p-4 shadow-none sm:p-6 lg:p-8">
          <HudToolbar justify="between" className="gap-3">
            <HudToolbar className="flex-col items-start gap-1 p-0">
              <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Plots · USDA-aware</p>
              <span className="text-lg font-semibold text-white drop-shadow">3D field view</span>
            </HudToolbar>
            <HudToolbar>
              <Input
                className="w-[240px] bg-white/10 text-white placeholder:text-white/50 backdrop-blur"
                placeholder="Search plots or crops"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <HudChip tone="outline" className="border-white/30">{filteredPlots.length || "—"} plots</HudChip>
            </HudToolbar>
          </HudToolbar>

          <FieldRow columnsClassName="grid-cols-1 lg:grid-cols-[1fr_auto]">
            <HudToolbar>
              {plotCards.map((card) => (
                <HudChip key={card.label}>{card.label}: {card.value}</HudChip>
              ))}
            </HudToolbar>
            <HudToolbar className="justify-start lg:justify-end">
              <HudChip>ESR {esrCommodities.length || "—"}</HudChip>
              <HudChip>PSD {psdCommodities.length || "—"}</HudChip>
              <HudChip>Releases {esrReleases.length || "—"}</HudChip>
              <HudChip tone="outline">Balance {bank.balance ?? "—"} coin</HudChip>
            </HudToolbar>
          </FieldRow>

          <HudToolbar>
            <HudChip tone="outline">Farm manager</HudChip>
            <Button size="sm" onClick={handleAddPlot}>Add plot (K3H4 coin)</Button>
            <Button size="sm" variant="secondary" className="bg-white/10 text-white" onClick={handleBuySeeds}>Buy seeds (USDA)</Button>
            <Button size="sm" variant="outline" className="border-white/30 text-white" onClick={handleScheduleWorkers}>Schedule workers</Button>
          </HudToolbar>

          {actionMode ? (
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
              {!statusMessage && derivedStatusMessage ? (
                <p className="text-xs text-muted-foreground">{derivedStatusMessage}</p>
              ) : null}
            </ActionPanel>
          ) : null}

          <FieldRow columnsClassName="grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
            <HudCard>
              <HudToolbar justify="between">
                <HudToolbar className="flex-col items-start gap-1 p-0">
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Plot focus</p>
                  <span className="text-lg font-semibold">{activePlot ? activePlot.name : "Select a plot"}</span>
                </HudToolbar>
                {activePlot ? <Badge variant="secondary">{activePlot.crop}</Badge> : null}
              </HudToolbar>
              {activePlot ? (
                <FieldRow columnsClassName="grid-cols-2 sm:grid-cols-4" className="mt-3 gap-2 text-sm">
                  <MetricTile label="Stage" value={activePlot.stage} />
                  <MetricTile label="Acres" value={activePlot.acres} />
                  <MetricTile label="Health" value={<Badge variant="success">{activePlot.health}</Badge>} />
                  <MetricTile
                    label="Last reading"
                    value={<span className="text-xs text-muted-foreground">{activePlot.latestCondition ? formatDate(activePlot.latestCondition.recordedAt) : "—"}</span>}
                  />
                </FieldRow>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">Hover or click a plot to pin details.</p>
              )}
            </HudCard>

            <HudCard>
              <HudToolbar justify="between">
                <HudChip tone="outline" className="text-sm font-semibold">Analytics pulse</HudChip>
                <Badge variant="outline">Live</Badge>
              </HudToolbar>
              <FieldRow columnsClassName="grid-cols-1 sm:grid-cols-2" className="mt-3 gap-2 text-sm">
                {planPhases.length ? planPhases.map(([phase, count]) => (
                  <MetricTile key={phase} label={phase} value={count} />
                )) : <span className="text-muted-foreground">No plan phases yet.</span>}
                {taskStatusCounts.length ? taskStatusCounts.map(([status, count]) => (
                  <MetricTile key={status} label={status} value={count} />
                )) : null}
              </FieldRow>
            </HudCard>
          </FieldRow>
        </HudCard>
      </HudCard>

    </Section>
  );
}