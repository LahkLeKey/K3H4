import type { ReactNode } from "react";

import { Badge, Button, Card, EmptyState, Grid, MetricTile, Stack, Table, TablePagination } from "../../components/ui";
import { BarChartCard, TimeAreaChartCard } from "../../components/charts/RechartsPrimitives";
import type { TelemetryEvent } from "../../react-hooks/telemetry";
import { TableCard } from "../TableCard";

export type TelemetrySample = {
    ts: number;
    ingest: number;
    latencyP50: number;
    latencyP95: number;
    errors: number;
    refresh: number;
};

export type TelemetrySummary = {
    ingest: number;
    p50: number;
    p95: number;
    errors: string;
    refresh: string;
    lastUpdated: string;
};

export type WorstTypeRow = {
    eventType: string;
    p95: number;
    p50: number;
    count: number;
};

const fmtDuration = (ms?: number | null) => {
    if (!ms) return "-";
    return `${ms.toLocaleString()} ms`;
};

const fmtTs = (ts: string) => new Date(ts).toLocaleString();

const fmtPayload = (payload: unknown) => {
    if (payload === null || payload === undefined) return "-";
    try {
        const str = typeof payload === "string" ? payload : JSON.stringify(payload);
        return str.length > 120 ? `${str.slice(0, 116)}…` : str;
    } catch (err) {
        return "[unserializable]";
    }
};

export function TelemetrySummaryTiles({ summary, isLoading }: { summary: TelemetrySummary | null; isLoading: boolean }) {
    if (!summary) {
        return (
            <Card>
                <EmptyState title={isLoading ? "Loading telemetry..." : "No telemetry yet."} />
            </Card>
        );
    }

    return (
        <Grid gap="md" smCols={2} lgCols={5}>
            <MetricTile label="Ingest" value={summary.ingest} hint="events/min" accent="#22d3ee" />
            <MetricTile label="p50" value={`${summary.p50} ms`} hint="latency" accent="#38bdf8" />
            <MetricTile label="p95" value={`${summary.p95} ms`} hint="latency" accent="#a78bfa" />
            <MetricTile label="Errors" value={`${summary.errors}%`} hint="recent" accent="#f472b6" />
            <MetricTile label="Refresh" value={`${summary.refresh} min`} hint="tile cadence" accent="#22c55e" />
        </Grid>
    );
}

export function TelemetryLatencyCard({ data, gradientId = "latencyGradient" }: { data: TelemetrySample[]; gradientId?: string }) {
    return (
        <TimeAreaChartCard
            title="Latency trend"
            hint="p50 + p95 (24h)"
            data={data}
            series={[
                { key: "latencyP50", color: "#22d3ee", gradientId },
                { key: "latencyP95", color: "#a78bfa", fillOpacity: 0.35, gradientId: `${gradientId}-p95` },
            ]}
        />
    );
}

export function TelemetryIngestCard({ data }: { data: TelemetrySample[] }) {
    const cleaned = data.map((d) => {
        const ingest = Number.isFinite(Number(d.ingest)) ? Number(d.ingest) : 0;
        const tsMs = typeof d.ts === "number" && Number.isFinite(d.ts) ? d.ts : Number(d.ts);
        const tsLabel = Number.isFinite(tsMs) ? new Date(tsMs).toLocaleTimeString() : "";
        return { ...d, ingest, tsLabel };
    });

    if (cleaned.length === 0) {
        return (
            <Card title="Ingest" actions={<span className="text-xs text-slate-400">Events per minute</span>}>
                <EmptyState title="No ingest samples" />
            </Card>
        );
    }

    return (
        <BarChartCard
            title="Ingest"
            hint="Events per minute"
            data={cleaned}
            dataKey="ingest"
            categoryKey="tsLabel"
            barColor="#22d3ee"
        />
    );
}

export function TelemetryErrorsCard({ data, gradientId = "errorsGradient" }: { data: TelemetrySample[]; gradientId?: string }) {
    return (
        <TimeAreaChartCard
            title="Errors"
            hint="% of events"
            data={data}
            yDomain={[0, 100]}
            series={[{ key: "errors", color: "#f472b6", gradientId }]}
        />
    );
}

export function TelemetryRefreshCard({ data, gradientId = "refreshGradient" }: { data: TelemetrySample[]; gradientId?: string }) {
    return (
        <TimeAreaChartCard
            title="Refresh cadence"
            hint="Minutes between refresh events"
            data={data}
            series={[{ key: "refresh", color: "#38bdf8", gradientId }]}
        />
    );
}

export function TelemetryWorstTypesCard({ rows }: { rows: WorstTypeRow[] }) {
    const cleaned = rows
        .filter((r) => Number.isFinite(r.p95))
        .map((r) => ({ ...r, p95: Number(r.p95 || 0), p50: Number(r.p50 || 0) }));

    if (cleaned.length === 0) {
        return (
            <Card title="Worst latency by type" actions={<span className="text-xs text-slate-400">p95 (recent)</span>}>
                <EmptyState title="No duration data yet." />
            </Card>
        );
    }

    const worst = cleaned[0];
    const prompt = `Optimize telemetry event type "${worst.eventType}": current p95 ${Math.round(worst.p95)} ms, p50 ${Math.round(
        worst.p50,
    )} ms. Investigate payload size, batching, caching, or backend path.`;

    const compactLabel = (label: string) => {
        if (!label) return label;
        const parts = label.split(".");
        if (parts.length <= 2) return label;
        const tail = parts.slice(-2).join(".");
        return tail.length < 18 ? tail : parts.slice(-3).join(".");
    };

    return (
        <BarChartCard
            title="Worst latency by type"
            hint={
                <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span>p95 (recent)</span>
                    <Button
                        accent="#22d3ee"
                        variant="subtle"
                        className="px-2 py-1 text-[11px]"
                        onClick={() => navigator.clipboard?.writeText(prompt)}
                    >
                        Copy optimize prompt
                    </Button>
                </div>
            }
            data={cleaned}
            dataKey="p95"
            categoryKey="eventType"
            barColor="#fb7185"
            layout="vertical"
            xTickFormatter={(v) => `${Math.round(v)} ms`}
            showCategoryLabels={false}
            yTickFormatter={(label) => compactLabel(String(label))}
            categoryWidth={220}
        />
    );
}

export function TelemetrySlowestEventsCard({ rows }: { rows: TelemetryEvent[] }) {
    return (
        <Card title="Slowest recent events" actions={<span className="text-xs text-slate-400">Top 10</span>}>
            <Stack gap="sm" className="mt-2">
                {rows.length === 0 ? (
                    <EmptyState title="No duration data yet." />
                ) : (
                    <Table
                        columns={[
                            { key: "createdAt" as const, label: "Time", render: (row) => fmtTs(row.createdAt) },
                            { key: "eventType" as const, label: "Type" },
                            {
                                key: "error" as const,
                                label: "Status",
                                render: (row) => (row.error ? <Badge accent="#f472b6">Error</Badge> : <Badge accent="#22c55e">OK</Badge>),
                            },
                            {
                                key: "durationMs" as const,
                                label: "Duration",
                                render: (row) => fmtDuration(row.durationMs ?? undefined),
                            },
                        ]}
                        rows={rows}
                        rowKey={(row) => row.id}
                    />
                )}
            </Stack>
        </Card>
    );
}

export function TelemetryEventsTableCard({
    pagedEvents,
    page,
    totalPages,
    pageSize,
    totalItems,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    onPageChange,
    onRefresh,
    onLoadMore,
    subtitle,
    actionsSlot,
}: {
    pagedEvents: TelemetryEvent[];
    page: number;
    totalPages: number;
    pageSize: number;
    totalItems: number;
    isLoading: boolean;
    error?: Error | null;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    onPageChange: (next: number) => void;
    onRefresh: () => void;
    onLoadMore: () => void;
    subtitle?: string;
    actionsSlot?: ReactNode;
}) {
    return (
        <TableCard
            title="Recent events"
            subtitle={subtitle ?? `Most recent ${pageSize} of ${totalItems}`}
            actions={(
                <>
                    <Button accent="#22d3ee" variant="subtle" onClick={onRefresh} disabled={isLoading}>
                        {isLoading ? "Refreshing…" : "Refresh"}
                    </Button>
                    <Button accent="#a78bfa" variant="subtle" onClick={onLoadMore} disabled={!hasNextPage || isFetchingNextPage}>
                        {isFetchingNextPage ? "Loading…" : hasNextPage ? "Load more" : "All loaded"}
                    </Button>
                    {error ? <Badge accent="#f59e0b">{error instanceof Error ? error.message : "Error"}</Badge> : null}
                    {actionsSlot}
                </>
            )}
        >
            <Stack gap="sm">
                {pagedEvents.length === 0 ? (
                    <EmptyState title={isLoading ? "Loading events..." : "No events returned."} />
                ) : (
                    <Table
                        columns={[
                            { key: "createdAt" as const, label: "Time", render: (row) => fmtTs(row.createdAt) },
                            { key: "eventType" as const, label: "Type" },
                            {
                                key: "error" as const,
                                label: "Status",
                                render: (row) => (row.error ? <Badge accent="#f472b6">Error</Badge> : <Badge accent="#22c55e">OK</Badge>),
                            },
                            { key: "durationMs" as const, label: "Duration", render: (row) => (row.durationMs ? `${row.durationMs} ms` : "-") },
                            { key: "payload" as const, label: "Payload", render: (row) => fmtPayload(row.payload) },
                        ]}
                        rows={pagedEvents}
                        rowKey={(row) => row.id}
                    />
                )}

                <TablePagination
                    page={page}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    totalItems={totalItems}
                    onPageChange={onPageChange}
                />
            </Stack>
        </TableCard>
    );
}
