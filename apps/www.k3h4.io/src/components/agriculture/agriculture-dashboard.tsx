import { Suspense, useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Grid, Html, OrbitControls } from "@react-three/drei";

import {
  useAgricultureAnalyticsQuery,
  useAgricultureOverviewQuery,
  useAgriculturePlotsQuery,
  useAgricultureTasksQuery,
  useCreateAgriculturePlot,
  useCreateAgricultureTask,
} from "../../hooks/use-agriculture-queries";
import {
  useUsdaEsrCommoditiesQuery,
  useUsdaEsrReleaseQuery,
  useUsdaPsdCommoditiesQuery,
} from "../../hooks/use-usda-queries";
import { trackTelemetry } from "../../lib/telemetry";
import { useBankUpdateMutation } from "../../hooks/use-bank-queries";
import { useK3h4Bank } from "../../hooks/use-k3h4-bank";
import { agricultureDashboardStore } from "../../stores/agriculture-dashboard-store";
import { Section } from "../section";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { HudCard } from "../ui/hud-card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ActionPanel } from "../ui/action-panel";
import { LabeledField } from "../ui/labeled-field";
import { HudSelect } from "../ui/hud-select";
import { FieldRow } from "../ui/field-row";
import { HudChip } from "../ui/hud-chip";
import { HudListPanel } from "../ui/hud-list-panel";
import { MetricTile } from "../ui/metric-tile";
import { Input } from "../ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const apiBase = ((globalThis as any)?.__API_URL__ || (import.meta as any)?.API_URL || "http://localhost:3001").replace(/\/$/, "");

const formatDate = (value?: string | null) => {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(parsed);
};

const formatErrorMessage = (error?: unknown) => (error instanceof Error ? error.message : "Unable to load data.");

const formatCommodityLabel = (item: any) =>
  item?.commodityName || item?.CommodityName || item?.name || item?.Commodity || item?.commodity || item?.description || item?.code || "Unknown";

const formatReleaseLabel = (item: any) =>
  item?.releasedOn || item?.ReleaseDate || item?.releaseDate || item?.date || item?.DataReleaseDate || item?.dataReleaseDate || null;

const formatRaw = (item: any, max = 80) => {
  const raw = JSON.stringify(item) ?? "";
  if (!raw) return "—";
  return raw.length > max ? `${raw.slice(0, max)}…` : raw;
};

const cropColor = (crop: string) => {
  const normalized = crop.toLowerCase();
  if (normalized.includes("wheat")) return "#f59e0b";
  if (normalized.includes("corn")) return "#10b981";
  if (normalized.includes("soy")) return "#6366f1";
  if (normalized.includes("grass")) return "#22c55e";
  return "#0ea5e9";
};

const normalizeHealth = (health: string | number | undefined | null) => {
  if (typeof health === "number" && Number.isFinite(health)) return Math.max(0.2, Math.min(1, health));
  if (typeof health === "string") {
    const numeric = Number(health);
    if (Number.isFinite(numeric)) return Math.max(0.2, Math.min(1, numeric / 100));
    const lowered = health.toLowerCase();
    if (lowered.includes("good") || lowered.includes("healthy")) return 0.82;
    if (lowered.includes("ok")) return 0.65;
    if (lowered.includes("low") || lowered.includes("watch")) return 0.45;
    if (lowered.includes("crit")) return 0.3;
  }
  return 0.6;
};

type PlotMesh = {
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
        <div className="rounded-full bg-background/85 px-3 py-1 text-xs font-semibold shadow">
          {plot.name} · {plot.crop}
        </div>
      </Html>
    </group>
  );
}

function PlotCanvas({ plots, highlightedId, onSelect }: { plots: PlotMesh[]; highlightedId: string | null; onSelect: (id: string | null) => void }) {
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

  const overviewQuery = useAgricultureOverviewQuery(apiBase);
  const analyticsQuery = useAgricultureAnalyticsQuery(apiBase);
  const plotsQuery = useAgriculturePlotsQuery(apiBase);
  const tasksQuery = useAgricultureTasksQuery(apiBase);
  const createPlotMutation = useCreateAgriculturePlot(apiBase);
  const createTaskMutation = useCreateAgricultureTask(apiBase);
  const bankUpdateMutation = useBankUpdateMutation(apiBase);
  const bank = useK3h4Bank(apiBase);

  const usdaEsrCommoditiesQuery = useUsdaEsrCommoditiesQuery(apiBase);
  const usdaEsrReleaseQuery = useUsdaEsrReleaseQuery(apiBase);
  const usdaPsdCommoditiesQuery = useUsdaPsdCommoditiesQuery(apiBase);

  const plots = plotsQuery.data?.plots ?? [];
  const filteredPlots = useMemo(() => {
    if (!searchTerm.trim()) return plots;
    const needle = searchTerm.toLowerCase();
    return plots.filter((plot) => `${plot.name} ${plot.crop} ${plot.stage}`.toLowerCase().includes(needle));
  }, [plots, searchTerm]);

  useEffect(() => {
    const withTargets = plots
      .flatMap((plot) => plot.plans || [])
      .map((plan) => plan.targetHarvestDate || plan.endDate || plan.startDate)
      .filter(Boolean) as string[];
    const soonest = withTargets.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())[0];
    if (soonest) {
      setWorkerDueDate(soonest.slice(0, 10));
    }
  }, [plots]);

  const esrCommodities = Array.isArray(usdaEsrCommoditiesQuery.data) ? usdaEsrCommoditiesQuery.data : [];
  const psdCommodities = Array.isArray(usdaPsdCommoditiesQuery.data) ? usdaPsdCommoditiesQuery.data : [];
  const esrReleases = Array.isArray(usdaEsrReleaseQuery.data) ? usdaEsrReleaseQuery.data : [];
  const esrCommodityList = esrCommodities.slice(0, 8);
  const psdCommodityList = psdCommodities.slice(0, 8);
  const esrReleaseList = esrReleases.slice(0, 6);

  const activePlot = filteredPlots.find((plot) => plot.id === highlightedPlot) || filteredPlots[0];

  const planPhases = Object.entries(analyticsQuery.data?.planPhaseCounts ?? {});
  const taskStatusCounts = Object.entries(analyticsQuery.data?.taskStatusCounts ?? {});

  const handleAddPlot = () => setActionMode((mode) => (mode === "plot" ? null : "plot"));
  const handleBuySeeds = () => setActionMode((mode) => (mode === "seeds" ? null : "seeds"));
  const handleScheduleWorkers = () => setActionMode((mode) => (mode === "workers" ? null : "workers"));

  const seedOptions = esrCommodities.slice(0, 12).map((item) => ({
    label: formatCommodityLabel(item),
    code: (item as any)?.commodityCode || (item as any)?.CommodityCode || "",
  }));

  const assigneeOptions = Array.from(
    new Set(["Crew", ...((tasksQuery.data?.tasks || []).map((task) => task.assignee).filter(Boolean) as string[])]),
  );

  const busy = bankUpdateMutation.isPending || createPlotMutation.isPending || createTaskMutation.isPending;
  const bankUpdateError = (bankUpdateMutation.error as Error | null | undefined)?.message || "";
  const createPlotError = (createPlotMutation.error as Error | null | undefined)?.message || "";
  const createTaskError = (createTaskMutation.error as Error | null | undefined)?.message || "";
  const derivedStatusMessage = bank.error || bankUpdateError || createPlotError || createTaskError || bank.message || "";

  const balanceValue = Number(bank.balance || 0);

  const handleConfirmAddPlot = async () => {
    const acresValue = Number(plotAcres) || 1;
    const costValue = Number(plotCost) || 0;
    if (balanceValue < costValue) {
      setStatusMessage("Insufficient K3H4 coin for plot purchase.");
      return;
    }
    try {
      setStatusMessage("");
      await bankUpdateMutation.mutateAsync({ delta: -costValue, reason: `Plot purchase: ${plotName}` });
      await createPlotMutation.mutateAsync({ name: plotName, crop: plotCrop, stage: "planned", acres: acresValue, health: "good" });
      setActionMode(null);
      void trackTelemetry("agriculture.dashboard.add_plot.success", { costValue, acresValue });
    } catch (error: any) {
      setStatusMessage(error?.message || "Unable to create plot.");
      void trackTelemetry("agriculture.dashboard.add_plot.error", { message: error?.message });
    }
  };

  const handleConfirmBuySeeds = async () => {
    const costValue = Number(seedCost) || 0;
    const label = seedOptions.find((item) => item.code === seedCommodity)?.label || "Seed";
    if (balanceValue < costValue) {
      setStatusMessage("Insufficient K3H4 coin for seeds.");
      return;
    }
    try {
      setStatusMessage("");
      await bankUpdateMutation.mutateAsync({ delta: -costValue, reason: `Seeds: ${label}` });
      // TODO: when inventory/purchase endpoint exists, POST there with the same reason.
      setActionMode(null);
      setSignalsOpen(true);
      void trackTelemetry("agriculture.dashboard.buy_seeds.success", { costValue, seedCommodity });
    } catch (error: any) {
      setStatusMessage(error?.message || "Unable to purchase seeds.");
      void trackTelemetry("agriculture.dashboard.buy_seeds.error", { message: error?.message });
    }
  };

  const handleConfirmScheduleWorkers = async () => {
    try {
      setStatusMessage("");
      await createTaskMutation.mutateAsync({ title: workerTaskTitle, assignee: workerAssignee, dueDate: workerDueDate, status: "pending" });
      setActionMode(null);
      setRosterOpen(true);
      void trackTelemetry("agriculture.dashboard.schedule_workers.success");
    } catch (error: any) {
      setStatusMessage(error?.message || "Unable to schedule workers.");
      void trackTelemetry("agriculture.dashboard.schedule_workers.error", { message: error?.message });
    }
  };

  const plotMeshes: PlotMesh[] = filteredPlots.map((plot) => ({
    id: plot.id,
    name: plot.name,
    crop: plot.crop,
    stage: plot.stage,
    acres: plot.acres,
    health: plot.health,
    latestCondition: plot.latestCondition,
    position: [0, 0, 0],
    size: [3, 2],
    healthTint: normalizeHealth(plot.health),
  }));

  const plotCards = [
    { label: "Plots", value: overviewQuery.data?.plots ?? "—", note: "From API" },
    { label: "Tasks", value: overviewQuery.data?.tasks ?? "—", note: "Work orders" },
    { label: "Shipments", value: overviewQuery.data?.shipments ?? "—", note: "Loads" },
  ];

  return (
    <Section
      eyebrow="Agriculture"
      title="Spatial plot manager"
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <Dialog open={rosterOpen} onOpenChange={setRosterOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Roster</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Plot roster</DialogTitle>
                <DialogDescription>Quick field lineup and worker targets.</DialogDescription>
              </DialogHeader>
              <div className="max-h-[60vh] overflow-auto rounded-lg border">
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
                            <div>{plot.crop}</div>
                            <div className="text-[11px] uppercase tracking-[0.3em]">{plot.stage}</div>
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
              </div>
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
              <div className="space-y-3 text-sm">
                <HudListPanel
                  title="ESR commodities"
                  badge={<Badge variant="secondary">{esrCommodities.length || "—"}</Badge>}
                  loading={usdaEsrCommoditiesQuery.isLoading}
                >
                  {esrCommodityList.length ? esrCommodityList.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span>{formatCommodityLabel(item)}</span>
                      <span className="text-[11px]">{item?.commodityCode || item?.CommodityCode || ""}</span>
                    </div>
                  )) : null}
                </HudListPanel>

                <HudListPanel
                  title="PSD commodities"
                  badge={<Badge variant="secondary">{psdCommodities.length || "—"}</Badge>}
                  loading={usdaPsdCommoditiesQuery.isLoading}
                >
                  {psdCommodityList.length ? psdCommodityList.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span>{formatCommodityLabel(item)}</span>
                      <span className="text-[11px]">{item?.commodityCode || item?.CommodityCode || ""}</span>
                    </div>
                  )) : null}
                </HudListPanel>

                <HudListPanel
                  title="ESR releases"
                  badge={<Badge variant="secondary">{esrReleases.length || "—"}</Badge>}
                  loading={usdaEsrReleaseQuery.isLoading}
                >
                  {esrReleaseList.length ? esrReleaseList.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span>{formatDate(formatReleaseLabel(item))}</span>
                      <span className="text-[11px]">{formatRaw(item, 32)}</span>
                    </div>
                  )) : null}
                </HudListPanel>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="secondary" size="sm" onClick={() => trackTelemetry("agriculture.dashboard.refresh")}>Refresh data</Button>
        </div>
      }
      className="p-0"
    >
      <div className="relative isolate overflow-hidden rounded-2xl border bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0">
          {plotsQuery.isLoading ? (
            <div className="flex h-full items-center justify-center text-muted-foreground">Loading plots…</div>
          ) : plotsQuery.isError ? (
            <div className="flex h-full items-center justify-center text-destructive">{formatErrorMessage(plotsQuery.error)}</div>
          ) : filteredPlots.length ? (
            <PlotCanvas plots={plotMeshes} highlightedId={highlightedPlot} onSelect={setHighlightedPlot} />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">No plots to render yet.</div>
          )}
        </div>

        <div className="relative z-10 flex min-h-[640px] flex-col justify-between bg-gradient-to-t from-background/10 via-background/0 to-background/10 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">Plots · USDA-aware</p>
              <div className="text-lg font-semibold text-white drop-shadow">3D field view</div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Input
                className="w-[240px] bg-white/10 text-white placeholder:text-white/50 backdrop-blur"
                placeholder="Search plots or crops"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <HudChip tone="outline" className="border-white/30">{filteredPlots.length || "—"} plots</HudChip>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
            <div className="flex flex-wrap items-center gap-2">
              {plotCards.map((card) => (
                <HudChip key={card.label}>{card.label}: {card.value}</HudChip>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2 justify-start lg:justify-end">
              <HudChip>ESR {esrCommodities.length || "—"}</HudChip>
              <HudChip>PSD {psdCommodities.length || "—"}</HudChip>
              <HudChip>Releases {esrReleases.length || "—"}</HudChip>
              <HudChip tone="outline">Balance {bank.balance ?? "—"} coin</HudChip>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <HudChip tone="outline">Farm manager</HudChip>
            <Button size="sm" onClick={handleAddPlot}>Add plot (K3H4 coin)</Button>
            <Button size="sm" variant="secondary" className="bg-white/10 text-white" onClick={handleBuySeeds}>Buy seeds (USDA)</Button>
            <Button size="sm" variant="outline" className="border-white/30 text-white" onClick={handleScheduleWorkers}>Schedule workers</Button>
          </div>

          {actionMode ? (
            <ActionPanel eyebrow="Farm action" title={actionMode} onClose={() => setActionMode(null)}>
              {actionMode === "plot" ? (
                <FieldRow>
                  <LabeledField label="Plot name">
                    <Input value={plotName} onChange={(e) => setPlotName(e.target.value)} />
                  </LabeledField>
                  <LabeledField label="Crop">
                    <Input value={plotCrop} onChange={(e) => setPlotCrop(e.target.value)} />
                  </LabeledField>
                  <LabeledField label="Acres">
                    <Input type="number" value={plotAcres} onChange={(e) => setPlotAcres(e.target.value)} />
                  </LabeledField>
                  <LabeledField label="Cost (coin)">
                    <Input type="number" value={plotCost} onChange={(e) => setPlotCost(e.target.value)} />
                  </LabeledField>
                  <div className="sm:col-span-2 lg:col-span-4">
                    <Button size="sm" onClick={handleConfirmAddPlot} disabled={busy}>Confirm plot purchase</Button>
                    <span className="ml-3 text-xs text-muted-foreground">Creates plot and debits K3H4 coin.</span>
                  </div>
                </FieldRow>
              ) : null}

              {actionMode === "seeds" ? (
                <FieldRow>
                  <LabeledField label="Commodity" className="sm:col-span-2">
                    <HudSelect
                      value={seedCommodity}
                      onChange={(e) => setSeedCommodity(e.target.value)}
                    >
                      <option value="">Select commodity</option>
                      {seedOptions.map((item) => (
                        <option key={item.code || item.label} value={item.code}>{item.label}</option>
                      ))}
                    </HudSelect>
                  </LabeledField>
                  <LabeledField label="Cost (coin)">
                    <Input type="number" value={seedCost} onChange={(e) => setSeedCost(e.target.value)} />
                  </LabeledField>
                  <LabeledField label="Preview">
                    <div className="rounded-md border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
                      {seedCommodity ? seedOptions.find((item) => item.code === seedCommodity)?.label || "Custom seed" : "Pick a USDA commodity to buy."}
                    </div>
                  </LabeledField>
                  <div className="sm:col-span-2 lg:col-span-4">
                    <Button size="sm" onClick={handleConfirmBuySeeds} disabled={!seedCommodity || busy}>Purchase seeds</Button>
                    <span className="ml-3 text-xs text-muted-foreground">Debits coin and opens USDA signals.</span>
                  </div>
                </FieldRow>
              ) : null}

              {actionMode === "workers" ? (
                <FieldRow>
                  <LabeledField label="Task title" className="sm:col-span-2">
                    <Input value={workerTaskTitle} onChange={(e) => setWorkerTaskTitle(e.target.value)} />
                  </LabeledField>
                  <LabeledField label="Due date">
                    <Input type="date" value={workerDueDate} onChange={(e) => setWorkerDueDate(e.target.value)} />
                  </LabeledField>
                  <LabeledField label="Assignee">
                    <HudSelect
                      value={workerAssignee}
                      onChange={(e) => setWorkerAssignee(e.target.value)}
                    >
                      {assigneeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </HudSelect>
                  </LabeledField>
                  <div className="sm:col-span-2 lg:col-span-4">
                    <Button size="sm" onClick={handleConfirmScheduleWorkers} disabled={busy}>Schedule crew</Button>
                    <span className="ml-3 text-xs text-muted-foreground">Creates a task for workers and opens roster.</span>
                  </div>
                </FieldRow>
              ) : null}

              {statusMessage ? <p className="text-xs text-muted-foreground">{statusMessage}</p> : null}
              {!statusMessage && derivedStatusMessage ? (
                <p className="text-xs text-muted-foreground">{derivedStatusMessage}</p>
              ) : null}
            </ActionPanel>
          ) : null}

          <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
            <HudCard>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Plot focus</p>
                  <div className="text-lg font-semibold">{activePlot ? activePlot.name : "Select a plot"}</div>
                </div>
                {activePlot ? <Badge variant="secondary">{activePlot.crop}</Badge> : null}
              </div>
              {activePlot ? (
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                  <MetricTile label="Stage" value={activePlot.stage} />
                  <MetricTile label="Acres" value={activePlot.acres} />
                  <MetricTile label="Health" value={<Badge variant="success">{activePlot.health}</Badge>} />
                  <MetricTile
                    label="Last reading"
                    value={<span className="text-xs text-muted-foreground">{activePlot.latestCondition ? formatDate(activePlot.latestCondition.recordedAt) : "—"}</span>}
                  />
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">Hover or click a plot to pin details.</p>
              )}
            </HudCard>

            <HudCard>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Analytics pulse</div>
                <Badge variant="outline">Live</Badge>
              </div>
              <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                {planPhases.length ? planPhases.map(([phase, count]) => (
                  <MetricTile key={phase} label={phase} value={count} />
                )) : <span className="text-muted-foreground">No plan phases yet.</span>}
                {taskStatusCounts.length ? taskStatusCounts.map(([status, count]) => (
                  <MetricTile key={status} label={status} value={count} />
                )) : null}
              </div>
            </HudCard>
          </div>
        </div>
      </div>

    </Section>
  );
}