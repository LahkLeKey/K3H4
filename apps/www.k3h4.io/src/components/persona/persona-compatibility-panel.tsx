import { Fragment, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Line, OrbitControls } from "@react-three/drei";
import { RefreshCcw, Sparkles } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";

import { type Persona, type PersonaCompatibility } from "../../hooks/use-persona-queries";
import { personaCompatStore } from "../../stores/persona-compat-store";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";

const scoreColor = (score: number) => {
    if (score >= 0.66) return "#16a34a";
    if (score >= 0.4) return "#f59e0b";
    if (score >= 0.2) return "#22d3ee";
    return "#94a3b8";
};

const buildNodePositions = (personas: Persona[]) => {
    const count = Math.max(personas.length, 1);
    const radius = 4.2;
    return personas.map((persona, index) => {
        const angle = (2 * Math.PI * index) / count;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return { ...persona, position: [x, 0.6, z] as [number, number, number] };
    });
};

type GraphNode = Persona & { position: [number, number, number] };

type GraphEdge = {
    id: string;
    sourceId: string;
    targetId: string;
    score: number;
    overlap: string[];
};

function CompatibilityCanvas({ nodes, edges }: { nodes: GraphNode[]; edges: GraphEdge[] }) {
    const positions = useMemo(() => Object.fromEntries(nodes.map((node) => [node.id, node.position])), [nodes]);
    return (
        <Canvas camera={{ position: [0, 6, 10], fov: 52 }}>
            <color attach="background" args={["#050816"]} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[6, 8, 6]} intensity={0.8} />
            {edges.map((edge) => {
                const source = positions[edge.sourceId];
                const target = positions[edge.targetId];
                if (!source || !target) return null;
                const mid = [(source[0] + target[0]) / 2, 0.4, (source[2] + target[2]) / 2] as [number, number, number];
                const color = scoreColor(edge.score);
                return (
                    <group key={edge.id}>
                        <Line
                            points={[source, target]}
                            color={color}
                            lineWidth={2}
                            dashed
                            dashSize={0.5}
                            gapSize={0.25}
                        />
                        <Html position={mid} center className="pointer-events-none select-none text-xs">
                            <div className="rounded-full bg-background/80 px-2 py-1 font-semibold shadow">
                                {(edge.score * 100).toFixed(0)}%
                            </div>
                        </Html>
                    </group>
                );
            })}
            {nodes.map((node) => {
                const nodeScore = edges.reduce((max, edge) => (edge.sourceId === node.id || edge.targetId === node.id ? Math.max(max, edge.score) : max), 0);
                return (
                    <group key={node.id} position={node.position}>
                        <mesh>
                            <sphereGeometry args={[0.55, 32, 32]} />
                            <meshStandardMaterial color={scoreColor(nodeScore + 0.1)} emissive="#0ea5e9" emissiveIntensity={0.35} />
                        </mesh>
                        <Html position={[0, 0.9, 0]} center className="pointer-events-none select-none text-xs">
                            <div className="rounded-lg bg-background/85 px-3 py-1 font-semibold shadow">{node.alias}</div>
                        </Html>
                    </group>
                );
            })}
            <OrbitControls enablePan enableZoom minDistance={4} maxDistance={20} target={[0, 0, 0]} />
        </Canvas>
    );
}

function CompatibilityList({ edges }: { edges: PersonaCompatibility[] }) {
    if (edges.length === 0) return <p className="text-sm text-muted-foreground">No compatibility pairs yet.</p>;
    return (
        <div className="space-y-2 text-sm">
            {edges.slice(0, 8).map((edge) => (
                <div key={edge.id} className="rounded-lg border bg-muted/40 px-3 py-2">
                    <div className="flex items-center justify-between">
                        <div className="font-semibold">
                            {edge.source.alias} &lt;-&gt; {edge.target.alias}
                        </div>
                        <Badge variant="secondary">{(edge.jaccardScore * 100).toFixed(0)}%</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Overlap: {edge.overlappingTokens.join(", ") || "None"}</div>
                </div>
            ))}
        </div>
    );
}

function ConfusionMatrix({
    counts,
    metrics,
}: {
    counts: { tp: number; fp: number; tn: number; fn: number };
    metrics: { accuracy: number; precision: number; recall: number; f1: number };
}) {
    const rows = [
        { label: "Predicted positive", values: [counts.tp, counts.fp] },
        { label: "Predicted negative", values: [counts.fn, counts.tn] },
    ];
    const maxCell = Math.max(counts.tp, counts.fp, counts.tn, counts.fn, 1);
    const intensity = (value: number) => {
        const ratio = value / maxCell;
        const base = Math.max(0.08, Math.min(1, ratio));
        return `rgba(34,197,94,${base})`;
    };
    return (
        <div className="space-y-3">
            <div className="overflow-hidden rounded-lg border">
                <div className="grid grid-cols-[auto,1fr,1fr] text-sm">
                    <div className="bg-muted px-3 py-2 font-semibold" />
                    <div className="bg-muted px-3 py-2 font-semibold text-center">Actual positive</div>
                    <div className="bg-muted px-3 py-2 font-semibold text-center">Actual negative</div>
                    {rows.map((row) => (
                        <Fragment key={row.label}>
                            <div className="border-t px-3 py-2 font-semibold">{row.label}</div>
                            <div className="border-t px-3 py-2 text-center" style={{ backgroundColor: intensity(row.values[0]) }}>{row.values[0]}</div>
                            <div className="border-t px-3 py-2 text-center" style={{ backgroundColor: intensity(row.values[1]) }}>{row.values[1]}</div>
                        </Fragment>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                <Badge variant="secondary">Accuracy {metrics.accuracy.toFixed(2)}</Badge>
                <Badge variant="secondary">Precision {metrics.precision.toFixed(2)}</Badge>
                <Badge variant="secondary">Recall {metrics.recall.toFixed(2)}</Badge>
                <Badge variant="secondary">F1 {metrics.f1.toFixed(2)}</Badge>
            </div>
        </div>
    );
}

function MetricsBars({ metrics }: { metrics: { accuracy: number; precision: number; recall: number; f1: number } }) {
    const data = [
        { name: "Accuracy", value: metrics.accuracy },
        { name: "Precision", value: metrics.precision },
        { name: "Recall", value: metrics.recall },
        { name: "F1", value: metrics.f1 },
    ];
    return (
        <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 8, right: 12, bottom: 8, left: 12 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.35)" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 1]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#0ea5e9" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

function ProbabilitySparkline({ probabilities }: { probabilities: number[] }) {
    if (probabilities.length === 0) {
        return <p className="text-xs text-muted-foreground">No probabilities yet.</p>;
    }
    const clamped = probabilities.map((value, idx) => ({ idx, value: Math.min(Math.max(value, 0), 1) }));
    return (
        <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={clamped} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
                    <YAxis hide domain={[0, 1]} />
                    <XAxis hide dataKey="idx" />
                    <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
                    <Area type="monotone" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

function ProbabilityHeatmap({
    details,
}: {
    details: Array<{ id: string; probability: number; sourceId: string; targetId: string }>;
}) {
    if (!details.length) return <p className="text-xs text-muted-foreground">No pairs evaluated yet.</p>;

    const items = details.slice(0, 36).map((d) => ({
        ...d,
        value: Math.min(Math.max(d.probability, 0), 1),
    }));

    return (
        <div className="space-y-2">
            <div className="text-xs font-semibold text-muted-foreground">Pair probability heatmap (top 36)</div>
            <div className="grid grid-cols-6 gap-1">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={cn(
                            "flex h-14 flex-col justify-between rounded-md border p-1 text-[10px] leading-tight",
                        )}
                        style={{
                            background: `linear-gradient(180deg, rgba(14,165,233,${0.6 * item.value}) 0%, rgba(14,165,233,${0.12}) 100%)`,
                        }}
                        title={`${item.sourceId} -> ${item.targetId}: ${(item.value * 100).toFixed(1)}%`}
                    >
                        <span className="font-semibold">{(item.value * 100).toFixed(0)}%</span>
                        <span className="text-[9px] text-muted-foreground">{item.sourceId.slice(0, 3)}→{item.targetId.slice(0, 3)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function PersonaCompatibilityPanel({ apiBase, userEmail }: { apiBase: string; userEmail: string | null }) {
    const {
        personas,
        compatibilities,
        confusion,
        loadingPersonas,
        loadingCompatibility,
        loadingConfusion,
        errors,
        autoRecomputeLocked,
        compatibilityAttempted,
        lastCompatibilityLoad,
        loadPersonas,
        loadCompatibility,
        recomputeCompatibility,
        runConfusion,
        markAutoRecompute,
        clearError,
        clearAttempted,
    } = personaCompatStore.useShallow((state) => ({
        personas: state.personas,
        compatibilities: state.compatibilities,
        confusion: state.confusion,
        loadingPersonas: state.loadingPersonas,
        loadingCompatibility: state.loadingCompatibility,
        loadingConfusion: state.loadingConfusion,
        errors: state.errors,
        autoRecomputeLocked: state.autoRecomputeLocked,
        compatibilityAttempted: state.compatibilityAttempted,
        lastCompatibilityLoad: state.lastCompatibilityLoad,
        loadPersonas: state.loadPersonas,
        loadCompatibility: state.loadCompatibility,
        recomputeCompatibility: state.recomputeCompatibility,
        runConfusion: state.runConfusion,
        markAutoRecompute: state.markAutoRecompute,
        clearError: state.clearError,
        clearAttempted: state.clearAttempted,
    }));
    const [threshold, setThreshold] = useState(0.5);

    useEffect(() => {
        if (!personas.length && !loadingPersonas && !errors.personas) {
            void loadPersonas(apiBase);
        }
    }, [apiBase, personas.length, loadingPersonas, errors.personas, loadPersonas]);

    useEffect(() => {
        if (loadingCompatibility || errors.compatibility) return;
        if (!personas.length) return;
        if (compatibilities.length > 0) return;
        if (compatibilityAttempted) return;
        // Avoid spamming when the API returns an empty list; retry is manual via button.
        if (lastCompatibilityLoad && Date.now() - lastCompatibilityLoad < 10_000) return;
        void loadCompatibility(apiBase);
    }, [apiBase, personas.length, compatibilities.length, loadingCompatibility, errors.compatibility, compatibilityAttempted, lastCompatibilityLoad, loadCompatibility]);

    useEffect(() => {
        if (autoRecomputeLocked) return;
        if (loadingCompatibility || errors.compatibility) return;
        if (compatibilityAttempted) return;
        if (personas.length > 1 && compatibilities.length === 0) {
            markAutoRecompute();
            void recomputeCompatibility(apiBase);
        }
    }, [apiBase, personas.length, compatibilities.length, loadingCompatibility, errors.compatibility, compatibilityAttempted, autoRecomputeLocked, markAutoRecompute, recomputeCompatibility]);

    const nodes = useMemo<GraphNode[]>(() => buildNodePositions(personas), [personas]);
    const edges = useMemo<GraphEdge[]>(
        () => compatibilities.map((compat) => ({
            id: compat.id,
            sourceId: compat.sourceId,
            targetId: compat.targetId,
            score: compat.jaccardScore,
            overlap: compat.overlappingTokens,
        })),
        [compatibilities],
    );

    const labeledPairs = useMemo(() => compatibilities.map((compat) => ({
        sourceId: compat.sourceId,
        targetId: compat.targetId,
        label: (compat.overlappingTokens?.length ?? 0) > 0,
    })), [compatibilities]);

    const confusionCounts = confusion?.counts ?? { tp: 0, fp: 0, tn: 0, fn: 0 };
    const confusionMetrics = confusion?.metrics ?? { accuracy: 0, precision: 0, recall: 0, f1: 0 };
    const details = useMemo(() => confusion?.details ?? [], [confusion]);
    const probabilities = useMemo(() => details.map((d) => d.probability), [details]);

    return (
        <Card className="border bg-background/80">
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-lg">Compatibility graph</CardTitle>
                    <CardDescription>3D view of persona overlap by Jaccard similarity.</CardDescription>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                    <Badge variant="secondary">User: {userEmail ?? "guest"}</Badge>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => recomputeCompatibility(apiBase)}
                        disabled={loadingCompatibility}
                    >
                        <RefreshCcw className="mr-2 h-4 w-4" /> {loadingCompatibility ? "Working..." : "Recompute"}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
                {(errors.personas || errors.compatibility) ? (
                    <div className="lg:col-span-2 space-y-1 text-sm text-destructive">
                        {errors.personas ? (
                            <div className="flex flex-wrap items-center gap-2">
                                <p>Personas: {errors.personas}</p>
                                <Button size="sm" variant="outline" onClick={() => { clearError("personas"); void loadPersonas(apiBase); }}>
                                    Retry personas
                                </Button>
                            </div>
                        ) : null}
                        {errors.compatibility ? (
                            <div className="flex flex-wrap items-center gap-2">
                                <p>Compatibility: {errors.compatibility}</p>
                                <Button size="sm" variant="outline" onClick={() => { clearError("compatibility"); clearAttempted(); void loadCompatibility(apiBase); }}>
                                    Retry compatibility
                                </Button>
                            </div>
                        ) : null}
                    </div>
                ) : null}
                <div className="relative h-[420px] overflow-hidden rounded-2xl border bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                    {loadingPersonas || loadingCompatibility ? (
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                            <Sparkles className="mr-2 h-4 w-4" /> Preparing graph...
                        </div>
                    ) : null}
                    {nodes.length > 0 ? <CompatibilityCanvas nodes={nodes} edges={edges} /> : (
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                            Add personas to see compatibility.
                        </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm font-semibold">Top pairs</div>
                            <p className="text-xs text-muted-foreground">Edges ranked by Jaccard similarity.</p>
                        </div>
                        <Badge variant="outline">{compatibilities.length} pairs</Badge>
                    </div>
                    <CompatibilityList edges={compatibilities} />

                    <div className="rounded-lg border p-3 space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-semibold">Confusion matrix</div>
                                <p className="text-xs text-muted-foreground">Uses ONNX probabilities when available.</p>
                            </div>
                            <Badge variant="secondary">Threshold {threshold.toFixed(2)}</Badge>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-[1fr,auto] sm:items-center">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-muted-foreground" htmlFor="conf-threshold">Decision threshold</label>
                                <Input
                                    id="conf-threshold"
                                    type="number"
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={threshold}
                                    onChange={(e) => setThreshold(Math.min(Math.max(Number(e.target.value) || 0, 0), 1))}
                                />
                            </div>
                            <Button
                                size="sm"
                                onClick={() => runConfusion(apiBase, { pairs: labeledPairs, threshold })}
                                disabled={loadingConfusion || labeledPairs.length === 0}
                            >
                                {loadingConfusion ? "Evaluating..." : "Run"}
                            </Button>
                        </div>
                        <ConfusionMatrix counts={confusionCounts} metrics={confusionMetrics} />
                        <ProbabilityHeatmap details={details} />
                        <ProbabilitySparkline probabilities={probabilities} />
                        <MetricsBars metrics={confusionMetrics} />
                        <p className="text-xs text-muted-foreground">
                            Evaluated {confusion?.evaluated ?? 0} pairs; {confusion?.missing ?? 0} missing.
                        </p>
                        {errors.confusion ? <p className="text-xs text-destructive">Confusion run failed: {errors.confusion}</p> : null}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
