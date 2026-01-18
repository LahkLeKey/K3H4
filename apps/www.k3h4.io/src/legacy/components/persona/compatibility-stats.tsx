import { Fragment } from "react";
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";

import type { Persona, PersonaCompatibility } from "../../hooks/use-persona-queries";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

export function CompatibilityList({ edges, personaIndex }: { edges: PersonaCompatibility[]; personaIndex: Record<string, Persona> }) {
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

export function ConfusionMatrix({
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

export function MetricsBars({ metrics }: { metrics: { accuracy: number; precision: number; recall: number; f1: number } }) {
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

export function ProbabilitySparkline({ probabilities }: { probabilities: number[] }) {
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

export function ProbabilityHeatmap({
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
