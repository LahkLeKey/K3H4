import { useEffect, useState } from "react";
import { RefreshCcw, Sparkles } from "lucide-react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { CompatibilityCanvas } from "./compatibility-canvas";
import { CompatibilityList, ConfusionMatrix, MetricsBars, ProbabilityHeatmap, ProbabilitySparkline } from "./compatibility-stats";
import { usePersonaCompatibility } from "./use-persona-compat";


export function PersonaCompatibilityPanel({ apiBase, userEmail }: { apiBase: string; userEmail: string | null }) {
    const {
        compatibilities,
        loadingPersonas,
        loadingCompatibility,
        loadingConfusion,
        errors,
        recomputeCompatibility,
        runConfusion,
        generatePersona,
        nodes,
        edges,
        personaIndex,
        labeledPairs,
        confusionPairs,
        maxConfusionPairs,
        trimmedPairs,
        confusionCounts,
        confusionMetrics,
        details,
        probabilities,
        confusion,
        categoryEdges,
        bridgeEdges,
    } = usePersonaCompatibility(apiBase);

    const [threshold, setThreshold] = useState(0.5);
    const [pairPage, setPairPage] = useState(1);
    const pairPageSize = 4;

    const totalPairPages = Math.max(1, Math.ceil((compatibilities.length || 0) / pairPageSize));
    useEffect(() => {
        if (pairPage > totalPairPages) setPairPage(totalPairPages);
    }, [pairPage, totalPairPages]);

    const start = (pairPage - 1) * pairPageSize;
    const pagedCompatibilities = compatibilities.slice(start, start + pairPageSize);

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
                    <CompatibilityCanvas nodes={nodes} edges={edges} categoryEdges={categoryEdges} bridgeEdges={bridgeEdges} />
                    <div className="pointer-events-none absolute left-3 bottom-3 z-10 flex flex-col gap-2 text-[11px] text-muted-foreground">
                        <div className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 shadow">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            <span>Token similarity clouds</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 shadow">
                            <span className="h-2 w-2 rounded-full bg-purple-400" />
                            <span>Category similarity clouds</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 shadow">
                            <span className="h-2 w-2 rounded-full bg-pink-400" />
                            <span>Context bridges</span>
                        </div>
                    </div>
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
                                    onClick={() => runConfusion(apiBase, { pairs: confusionPairs, threshold })}
                                    disabled={loadingConfusion || labeledPairs.length === 0}
                                >
                                    {loadingConfusion ? "Evaluating..." : "Run"}
                                </Button>
                            </div>
                            {trimmedPairs > 0 ? (
                                <p className="text-[11px] text-muted-foreground">
                                    Using first {confusionPairs.length} of {labeledPairs.length} pairs (API limit {maxConfusionPairs}).
                                </p>
                            ) : null}
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
