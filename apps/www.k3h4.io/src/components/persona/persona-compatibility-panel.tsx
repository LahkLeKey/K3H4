import { Fragment, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Line, OrbitControls } from "@react-three/drei";
import { DodecahedronGeometry, WireframeGeometry } from "three";
import { RefreshCcw, Sparkles } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";

import { useGeneratePersonaMutation, usePersonaListQuery, type Persona, type PersonaCompatibility } from "../../hooks/use-persona-queries";
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

const golden = (1 + Math.sqrt(5)) / 2;

const getDodecahedronVertices = (radius: number) => {
    const phi = golden;
    const invPhi = 1 / phi;
    const raw: Array<[number, number, number]> = [
        [-1, -1, -1],
        [-1, -1, 1],
        [-1, 1, -1],
        [-1, 1, 1],
        [1, -1, -1],
        [1, -1, 1],
        [1, 1, -1],
        [1, 1, 1],
        [0, -invPhi, -phi],
        [0, -invPhi, phi],
        [0, invPhi, -phi],
        [0, invPhi, phi],
        [-invPhi, -phi, 0],
        [-invPhi, phi, 0],
        [invPhi, -phi, 0],
        [invPhi, phi, 0],
        [-phi, 0, -invPhi],
        [-phi, 0, invPhi],
        [phi, 0, -invPhi],
        [phi, 0, invPhi],
    ];
    return raw.map(([x, y, z]) => {
        const mag = Math.hypot(x, y, z) || 1;
        const scale = radius / mag;
        return [x * scale, y * scale, z * scale] as [number, number, number];
    });
};

const getDodecahedronFrame = (radius: number) => {
    const geometry = new DodecahedronGeometry(radius);
    const wire = new WireframeGeometry(geometry);
    const pos = wire.getAttribute("position");
    const segments: Array<[[number, number, number], [number, number, number]]> = [];
    for (let i = 0; i < pos.count; i += 2) {
        segments.push([
            [pos.getX(i), pos.getY(i), pos.getZ(i)],
            [pos.getX(i + 1), pos.getY(i + 1), pos.getZ(i + 1)],
        ]);
    }
    return segments;
};

const buildNodePositions = (personas: Persona[]) => {
    const count = Math.max(personas.length, 1);
    const radius = Math.max(6, count * 0.55);
    const vertices = getDodecahedronVertices(radius);
    return personas.map((persona, index) => {
        const v = vertices[index % vertices.length];
        return { ...persona, position: [v[0], v[1], v[2]] as [number, number, number] };
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
    const frameRadius = useMemo(() => Math.max(...nodes.map((n) => Math.hypot(n.position[0], n.position[2])), 6), [nodes]);
    const dodecaFrame = useMemo(() => getDodecahedronFrame(frameRadius), [frameRadius]);
    const dodecaVertices = useMemo(() => getDodecahedronVertices(frameRadius), [frameRadius]);
    const center = useMemo<[number, number, number]>(() => [0, 0.25, 0], []);
    return (
        <Canvas camera={{ position: [0, 4, 10], fov: 62 }}>
            <color attach="background" args={["#050816"]} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[6, 8, 6]} intensity={0.8} />
            {dodecaFrame.map((segment, idx) => (
                <Line key={`frame-${idx}`} points={segment} color="#1e293b" lineWidth={1.5} />
            ))}
            {dodecaVertices.map((v, idx) => (
                <Line key={`radial-${idx}`} points={[v, center]} color="#0ea5e9" lineWidth={0.75} dashed dashSize={0.35} gapSize={0.25} />
            ))}
            {edges.map((edge) => {
                const source = positions[edge.sourceId];
                const target = positions[edge.targetId];
                if (!source || !target) return null;
                const mid = [
                    (source[0] + target[0]) * 0.35,
                    0.25,
                    (source[2] + target[2]) * 0.35,
                ] as [number, number, number];
                const color = scoreColor(edge.score);
                return (
                    <group key={edge.id}>
                        <Line
                            points={[source, mid, target]}
                            color={color}
                            lineWidth={2}
                            dashed
                            dashSize={0.5}
                            gapSize={0.25}
                        />
                        <Html position={mid} center className="pointer-events-none select-none text-xs">
                            <div
                                className="rounded-full bg-background/80 px-2 py-1 font-semibold shadow"
                                title={`Match ${(edge.score * 100).toFixed(1)}%\n${edge.overlap.length ? `Overlap: ${edge.overlap.join(", ")}` : "No shared tokens"}`}
                            >
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

function CompatibilityList({ edges, personaIndex }: { edges: PersonaCompatibility[]; personaIndex: Record<string, Persona> }) {
    if (edges.length === 0) return <p className="text-sm text-muted-foreground">No compatibility pairs yet.</p>;
    return (
        <div className="space-y-2 text-sm">
            {edges.slice(0, 8).map((edge) => (
                <div key={edge.id} className="rounded-lg border bg-muted/40 px-3 py-2">
                    <div className="flex items-center justify-between">
                        <div className="font-semibold" title={`Overlap: ${(edge.overlappingTokens ?? []).join(", ") || "None"}`}>
                            {(personaIndex[edge.sourceId]?.alias ?? edge.source?.alias ?? edge.sourceId)} &lt;-&gt; {(personaIndex[edge.targetId]?.alias ?? edge.target?.alias ?? edge.targetId)}
                        </div>
                        <Badge
                            variant="secondary"
                            title={`Match ${(Number.isFinite(edge.jaccardScore) ? edge.jaccardScore * 100 : 0).toFixed(1)}%`}
                        >
                            {(Number.isFinite(edge.jaccardScore) ? edge.jaccardScore * 100 : 0).toFixed(0)}%
                        </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Overlap: {(edge.overlappingTokens ?? []).join(", ") || "None"}</div>
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
        <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 6, right: 8, bottom: 6, left: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.28)" />
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
        <div className="h-24">
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
    const personasQuery = usePersonaListQuery(apiBase);
    const generatePersona = useGeneratePersonaMutation(apiBase);
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
    }));
    const [threshold, setThreshold] = useState(0.5);
    const [pairPage, setPairPage] = useState(1);
    const pairPageSize = 4;

    useEffect(() => {
        if (!personas.length && !loadingPersonas && !errors.personas) {
            void loadPersonas(apiBase);
        }
    }, [apiBase, personas.length, loadingPersonas, errors.personas, loadPersonas]);

    useEffect(() => {
        if (!personasQuery.data) return;
        const latest = personasQuery.data;
        personaCompatStore.setState((state) => {
            const prev = state.personas;
            const sameLength = prev.length === latest.length;
            const sameContent = sameLength && prev.every((p, idx) => {
                const next = latest[idx];
                if (!next) return false;
                if (p.id !== next.id) return false;
                if (p.updatedAt && next.updatedAt) return p.updatedAt === next.updatedAt;
                return (
                    p.alias === next.alias &&
                    p.account === next.account &&
                    (p.handle ?? "") === (next.handle ?? "") &&
                    (p.note ?? "") === (next.note ?? "")
                );
            });

            if (sameContent) return state;

            const personasChanged = !sameContent;
            return {
                ...state,
                personas: latest,
                lastPersonasLoad: Date.now(),
                ...(personasChanged
                    ? {
                        compatibilities: [],
                        compatibilityAttempted: false,
                        autoRecomputeLocked: false,
                        lastCompatibilityLoad: 0,
                        lastCompatibilityRequest: 0,
                    }
                    : {}),
            };
        });
    }, [personasQuery.data]);

    useEffect(() => {
        if (loadingCompatibility) return;
        if (personas.length < 2) return;
        const personaIds = new Set(personas.map((p) => p.id));
        const edgeCoverage = new Set<string>();
        for (const edge of compatibilities) {
            edgeCoverage.add(edge.sourceId);
            edgeCoverage.add(edge.targetId);
        }
        const missingPersona = Array.from(personaIds).some((id) => !edgeCoverage.has(id));
        if (compatibilities.length === 0 || missingPersona) {
            void recomputeCompatibility(apiBase);
        }
    }, [apiBase, personas, compatibilities, loadingCompatibility, recomputeCompatibility]);

    useEffect(() => {
        if (loadingCompatibility) return;
        if (errors.compatibility) return;
        if (personas.length < 2) return;
        if (compatibilities.length > 0) return;
        // Reset debounce so the initial load can recompute immediately after the first compatibility fetch returns empty.
        personaCompatStore.setState({ lastCompatibilityRequest: 0 });
        void recomputeCompatibility(apiBase);
    }, [apiBase, personas.length, compatibilities.length, loadingCompatibility, errors.compatibility, recomputeCompatibility]);

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
            score: Number.isFinite(compat.jaccardScore) ? compat.jaccardScore : 0,
            overlap: compat.overlappingTokens ?? [],
        })),
        [compatibilities],
    );

    const personaIndex = useMemo(() => Object.fromEntries(personas.map((p) => [p.id, p])), [personas]);

    const totalPairPages = Math.max(1, Math.ceil((compatibilities.length || 0) / pairPageSize));
    useEffect(() => {
        if (pairPage > totalPairPages) setPairPage(totalPairPages);
    }, [pairPage, totalPairPages]);

    const pagedCompatibilities = useMemo(() => {
        const start = (pairPage - 1) * pairPageSize;
        return compatibilities.slice(start, start + pairPageSize);
    }, [compatibilities, pairPage, pairPageSize]);

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
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
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
            <CardContent className="flex flex-col gap-4">
                <div className="relative h-[460px] md:h-[560px] overflow-hidden rounded-[28px] border bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                    <div className="absolute right-3 top-3 z-10 flex gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => generatePersona.mutate(1)}
                            disabled={generatePersona.isPending}
                        >
                            <Sparkles className="mr-2 h-4 w-4" /> {generatePersona.isPending ? "Working..." : "Generate persona"}
                        </Button>
                    </div>
                    <CompatibilityCanvas nodes={nodes} edges={edges} />
                    {nodes.length === 0 ? (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                            Add personas to see compatibility.
                        </div>
                    ) : null}
                    {(errors.personas || errors.compatibility) ? (
                        <div className="pointer-events-none absolute left-3 top-3 space-y-1 text-xs text-destructive">
                            {errors.personas ? (
                                <div className="rounded border border-destructive/40 bg-background/80 px-2 py-1 shadow">Personas: {errors.personas}</div>
                            ) : null}
                            {errors.compatibility ? (
                                <div className="rounded border border-destructive/40 bg-background/80 px-2 py-1 shadow">Compatibility: {errors.compatibility}</div>
                            ) : null}
                        </div>
                    ) : null}
                    {loadingPersonas || loadingCompatibility ? (
                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                            <Sparkles className="mr-2 h-4 w-4" /> Preparing graph...
                        </div>
                    ) : null}
                </div>

                <div className="grid grid-cols-2 gap-4 items-stretch">
                    <Card className="border bg-muted/40 h-full">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-sm">Top pairs</CardTitle>
                            <CardDescription>Edges ranked by Jaccard similarity.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                                <Badge variant="outline">{compatibilities.length} pairs</Badge>
                                <span className="text-muted-foreground">4 per page</span>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPairPage(Math.max(1, pairPage - 1))}
                                        disabled={pairPage <= 1}
                                    >
                                        Prev
                                    </Button>
                                    <span className="text-muted-foreground">Page {pairPage} / {totalPairPages}</span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPairPage(Math.min(totalPairPages, pairPage + 1))}
                                        disabled={pairPage >= totalPairPages}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                            <div className="max-h-[320px] overflow-y-auto pr-1">
                                <CompatibilityList edges={pagedCompatibilities} personaIndex={personaIndex} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border bg-muted/40 h-full">
                        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <CardTitle className="text-sm">Confusion matrix</CardTitle>
                                <CardDescription>Uses ONNX probabilities when available.</CardDescription>
                            </div>
                            <Badge variant="secondary">Threshold {threshold.toFixed(2)}</Badge>
                        </CardHeader>
                        <CardContent className="space-y-2">
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
                            <div className="grid gap-2 lg:grid-cols-2 lg:items-start">
                                <MetricsBars metrics={confusionMetrics} />
                                <ProbabilitySparkline probabilities={probabilities} />
                            </div>
                            <ProbabilityHeatmap details={details} />
                            <p className="text-xs text-muted-foreground">
                                Evaluated {confusion?.evaluated ?? 0} pairs; {confusion?.missing ?? 0} missing.
                            </p>
                            {errors.confusion ? <p className="text-xs text-destructive">Confusion run failed: {errors.confusion}</p> : null}
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
}
