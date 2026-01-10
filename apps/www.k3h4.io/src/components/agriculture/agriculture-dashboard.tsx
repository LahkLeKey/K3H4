import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Grid, Html, OrbitControls } from "@react-three/drei";

import {
  useAgricultureAnalyticsQuery,
  useAgricultureOverviewQuery,
  useAgriculturePlotsQuery,
  useAgricultureTasksQuery,
} from "../../hooks/use-agriculture-queries";
import {
  useUsdaEsrCommoditiesQuery,
  useUsdaEsrReleaseQuery,
  useUsdaPsdCommoditiesQuery,
} from "../../hooks/use-usda-queries";
import { trackTelemetry } from "../../lib/telemetry";
import { Section } from "../section";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
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
  const [highlightedPlot, setHighlightedPlot] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const overviewQuery = useAgricultureOverviewQuery(apiBase);
  const analyticsQuery = useAgricultureAnalyticsQuery(apiBase);
  const plotsQuery = useAgriculturePlotsQuery(apiBase);
  const tasksQuery = useAgricultureTasksQuery(apiBase);

  const usdaEsrCommoditiesQuery = useUsdaEsrCommoditiesQuery(apiBase);
  const usdaEsrReleaseQuery = useUsdaEsrReleaseQuery(apiBase);
  const usdaPsdCommoditiesQuery = useUsdaPsdCommoditiesQuery(apiBase);

  const plots = plotsQuery.data?.plots ?? [];
  const filteredPlots = useMemo(() => {
    if (!searchTerm.trim()) return plots;
    const needle = searchTerm.toLowerCase();
    return plots.filter((plot) => `${plot.name} ${plot.crop} ${plot.stage}`.toLowerCase().includes(needle));
  }, [plots, searchTerm]);

  const esrCommodities = Array.isArray(usdaEsrCommoditiesQuery.data) ? usdaEsrCommoditiesQuery.data : [];
  const psdCommodities = Array.isArray(usdaPsdCommoditiesQuery.data) ? usdaPsdCommoditiesQuery.data : [];
  const esrReleases = Array.isArray(usdaEsrReleaseQuery.data) ? usdaEsrReleaseQuery.data : [];

  const activePlot = filteredPlots.find((plot) => plot.id === highlightedPlot) || filteredPlots[0];

  const planPhases = Object.entries(analyticsQuery.data?.planPhaseCounts ?? {});
  const taskStatusCounts = Object.entries(analyticsQuery.data?.taskStatusCounts ?? {});

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
      description="R3F-powered plot canvas with live data from agriculture + USDA feeds."
      actions={
        <Button variant="secondary" size="sm" onClick={() => trackTelemetry("agriculture.dashboard.refresh")}>Refresh data</Button>
      }
    >
      <Card className="space-y-4 bg-background/80 p-4 shadow-lg sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Plots · USDA-aware</p>
            <div className="text-lg font-semibold">3D field view</div>
          </div>
          <div className="flex items-center gap-2">
            <Input
              className="w-[240px]"
              placeholder="Search plots or crops"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <Badge variant="outline">{filteredPlots.length || "—"} plots</Badge>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.35fr_0.85fr]">
          <div className="relative h-[520px] overflow-hidden rounded-2xl border bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {plotsQuery.isLoading ? (
              <div className="flex h-full items-center justify-center text-muted-foreground">Loading plots…</div>
            ) : plotsQuery.isError ? (
              <div className="flex h-full items-center justify-center text-destructive">{formatErrorMessage(plotsQuery.error)}</div>
            ) : filteredPlots.length ? (
              <PlotCanvas plots={plotMeshes} highlightedId={highlightedPlot} onSelect={setHighlightedPlot} />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">No plots to render yet.</div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
          </div>

          <div className="space-y-3">
            <Card className="space-y-3 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Plot focus</p>
                  <div className="text-lg font-semibold">{activePlot ? activePlot.name : "Select a plot"}</div>
                </div>
                {activePlot ? <Badge variant="secondary">{activePlot.crop}</Badge> : null}
              </div>
              {activePlot ? (
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Stage</span>
                    <span className="font-semibold uppercase tracking-wide">{activePlot.stage}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Acres</span>
                    <span className="font-semibold">{activePlot.acres}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Health</span>
                    <Badge variant="success">{activePlot.health}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Last reading</span>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      {activePlot.latestCondition ? formatDate(activePlot.latestCondition.recordedAt) : "—"}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Hover or click a plot to pin details.</p>
              )}
            </Card>

            <div className="grid gap-2 sm:grid-cols-3">
              {plotCards.map((card) => (
                <Card key={card.label} className="space-y-1 p-3">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{card.label}</div>
                  <div className="text-xl font-semibold">{card.value}</div>
                  <div className="text-xs text-muted-foreground">{card.note}</div>
                </Card>
              ))}
            </div>

            <Card className="space-y-2 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Analytics pulse</div>
                <Badge variant="outline">Live</Badge>
              </div>
              <div className="grid gap-2 text-sm">
                {planPhases.length ? planPhases.map(([phase, count]) => (
                  <div key={phase} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{phase}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                )) : <span className="text-muted-foreground">No plan phases yet.</span>}
                {taskStatusCounts.length ? taskStatusCounts.map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{status}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                )) : null}
              </div>
            </Card>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Plot table</p>
                <div className="text-lg font-semibold">Inventory of fields</div>
              </div>
              <Badge variant="outline">{filteredPlots.length} rows</Badge>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plot</TableHead>
                  <TableHead>Crop · stage</TableHead>
                  <TableHead>Acres</TableHead>
                  <TableHead>Health</TableHead>
                  <TableHead>Latest condition</TableHead>
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
              <TableCaption>Data is sourced from the agriculture API and visualized in the 3D canvas.</TableCaption>
            </Table>
          </Card>

          <Card className="space-y-3 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">USDA signals</p>
                <div className="text-lg font-semibold">Reference feeds</div>
              </div>
              <Badge variant="outline">{(esrCommodities.length || 0) + (psdCommodities.length || 0)} items</Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="rounded-lg border bg-muted/40 px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">ESR commodities</span>
                  <Badge variant="secondary">{esrCommodities.length || "—"}</Badge>
                </div>
                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                  {usdaEsrCommoditiesQuery.isLoading ? "Loading…" : esrCommodities.slice(0, 5).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span>{formatCommodityLabel(item)}</span>
                      <span className="text-[11px]">{item?.commodityCode || item?.CommodityCode || ""}</span>
                    </div>
                  )) || <span>No data</span>}
                </div>
              </div>

              <div className="rounded-lg border bg-muted/40 px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">PSD commodities</span>
                  <Badge variant="secondary">{psdCommodities.length || "—"}</Badge>
                </div>
                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                  {usdaPsdCommoditiesQuery.isLoading ? "Loading…" : psdCommodities.slice(0, 5).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span>{formatCommodityLabel(item)}</span>
                      <span className="text-[11px]">{item?.commodityCode || item?.CommodityCode || ""}</span>
                    </div>
                  )) || <span>No data</span>}
                </div>
              </div>

              <div className="rounded-lg border bg-muted/40 px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">ESR releases</span>
                  <Badge variant="secondary">{esrReleases.length || "—"}</Badge>
                </div>
                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                  {usdaEsrReleaseQuery.isLoading ? "Loading…" : esrReleases.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span>{formatDate(formatReleaseLabel(item))}</span>
                      <span className="text-[11px]">{formatRaw(item, 32)}</span>
                    </div>
                  )) || <span>No data</span>}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </Section>
  );
}