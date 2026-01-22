import { useEffect, useMemo, useState } from "react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { Badge, Button, Card, EmptyState, MetricTile, SectionHeader, Stack, Table, TablePagination } from "../components/ui";
import type { TelemetryEvent } from "../react-hooks/telemetry";
import { useTelemetryInfiniteQuery } from "../react-hooks/telemetry";
import { TableCard } from "./TableCard";

const axisStyle = { fill: "#cbd5e1", fontSize: 11 };

const percentile = (values: number[], p: number) => {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const idx = Math.min(sorted.length - 1, Math.max(0, Math.floor(((p ?? 0) / 100) * (sorted.length - 1))));
    return sorted[idx];
};

const extractLatencyMs = (payload: unknown) => {
    const nums: number[] = [];
    const collect = (val: unknown) => {
        if (typeof val === "number" && Number.isFinite(val)) nums.push(val);
        else if (typeof val === "string") {
            const n = Number(val);
            if (!Number.isNaN(n)) nums.push(n);
        } else if (Array.isArray(val)) {
            val.forEach(collect);
        } else if (val && typeof val === "object") {
            Object.values(val as Record<string, unknown>).forEach(collect);
        }
    };
    collect(payload);
    const msCandidates = nums.filter((n) => n > 0 && n < 120_000);
    if (msCandidates.length === 0) return null;
    return percentile(msCandidates, 50);
};

const isErrorEvent = (eventType: string, payload: unknown, explicit?: boolean | null) => {
    if (explicit === true) return true;
    const t = eventType.toLowerCase();
    if (t.includes("error") || t.includes("fail")) return true;
    if (typeof payload === "string") return payload.toLowerCase().includes("error");
    return false;
};

const isRefreshEvent = (eventType: string) => {
    const t = eventType.toLowerCase();
    return t.includes("refresh") || t.includes("tile") || t.includes("cache");
};

export function TelemetryDashboard() {
    const sinceIso = useMemo(() => new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), []);
    const [filters] = useState({ limit: 200, since: sinceIso });
    const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useTelemetryInfiniteQuery(filters);

    const events = useMemo(() => {
        const pages = data?.pages ?? [];
        const seen = new Set<string>();
        const merged: TelemetryEvent[] = [];
        for (const page of pages) {
            for (const evt of page.events) {
                if (seen.has(evt.id)) continue;
                seen.add(evt.id);
                merged.push(evt);
            }
        }
        return merged;
    }, [data]);

    const samples = useMemo(() => {
        const sorted = events.slice().sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        const buckets = new Map<number, { ts: number; total: number; errorCount: number; latencies: number[]; refreshCadences: number[] }>();
        const ensureBucket = (ts: number) => {
            const minuteTs = Math.floor(ts / 60_000) * 60_000;
            if (!buckets.has(minuteTs)) {
                buckets.set(minuteTs, { ts: minuteTs, total: 0, errorCount: 0, latencies: [], refreshCadences: [] });
            }
            return buckets.get(minuteTs)!;
        };

        let lastRefreshTs: number | null = null;
        for (const evt of sorted) {
            const ts = new Date(evt.createdAt).getTime();
            if (Number.isNaN(ts)) continue;
            const bucket = ensureBucket(ts);
            bucket.total += 1;

            const latency = evt.durationMs ?? extractLatencyMs(evt.payload);
            if (latency !== null) bucket.latencies.push(latency);

            if (isErrorEvent(evt.eventType, evt.payload, evt.error)) bucket.errorCount += 1;

            if (isRefreshEvent(evt.eventType)) {
                if (lastRefreshTs !== null) bucket.refreshCadences.push((ts - lastRefreshTs) / 60_000);
                lastRefreshTs = ts;
            }
        }

        let carryRefresh = 0;
        return Array.from(buckets.values())
            .sort((a, b) => a.ts - b.ts)
            .map((bucket) => {
                const latencyP50 = percentile(bucket.latencies, 50);
                const latencyP95 = percentile(bucket.latencies, 95);
                const refresh = bucket.refreshCadences.length
                    ? bucket.refreshCadences.reduce((sum, v) => sum + v, 0) / bucket.refreshCadences.length
                    : carryRefresh;
                carryRefresh = refresh;
                const errorsPct = bucket.total > 0 ? (bucket.errorCount / bucket.total) * 100 : 0;
                return {
                    ts: bucket.ts,
                    ingest: bucket.total,
                    latencyP50,
                    latencyP95,
                    errors: errorsPct,
                    refresh,
                };
            });
    }, [events]);

    const summary = useMemo(() => {
        const latest = samples[samples.length - 1];
        if (!latest) return null;
        const errorsPct = Math.min(100, latest.errors);
        return {
            ingest: Math.round(latest.ingest),
            p50: Math.round(latest.latencyP50),
            p95: Math.round(latest.latencyP95),
            errors: errorsPct.toFixed(1),
            refresh: latest.refresh ? latest.refresh.toFixed(1) : "-",
            lastUpdated: new Date(latest.ts).toLocaleTimeString(),
        };
    }, [samples]);

    const pageSize = 25;
    const [page, setPage] = useState(0);
    useEffect(() => {
        setPage(0);
    }, [events.length]);

    const totalPages = Math.max(1, Math.ceil(events.length / pageSize));
    const pagedEvents = events.slice(page * pageSize, page * pageSize + pageSize);

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

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
            <SectionHeader
                kicker="Telemetry"
                title="System signals"
                description="Live ingestion, latency, error rate, and map refresh cadence."
                status={summary ? `Last updated ${summary.lastUpdated}` : undefined}
            />

            {summary ? (
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                    <MetricTile label="Ingest" value={summary.ingest} hint="events/min" accent="#22d3ee" />
                    <MetricTile label="p50" value={`${summary.p50} ms`} hint="latency" accent="#38bdf8" />
                    <MetricTile label="p95" value={`${summary.p95} ms`} hint="latency" accent="#a78bfa" />
                    <MetricTile label="Errors" value={`${summary.errors}%`} hint="recent" accent="#f472b6" />
                    <MetricTile label="Refresh" value={`${summary.refresh} min`} hint="tile cadence" accent="#22c55e" />
                </div>
            ) : null}

            <div className="grid gap-4 lg:grid-cols-2">
                <Card title="Latency trend" actions={<span className="text-xs text-slate-400">p50 + p95</span>}>
                    <div className="mt-3 h-56">
                        <ResponsiveContainer>
                            <AreaChart data={samples} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="latencyGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.42} />
                                        <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.04} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="#0f172a" strokeDasharray="3 3" opacity={0.6} />
                                <XAxis dataKey="ts" tickFormatter={(ts) => new Date(ts).toLocaleTimeString()} stroke="#1e293b" tick={axisStyle} />
                                <YAxis stroke="#1e293b" tick={axisStyle} />
                                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12 }} />
                                <Area type="monotone" dataKey="latencyP50" stroke="#22d3ee" fillOpacity={1} fill="url(#latencyGradient)" />
                                <Area type="monotone" dataKey="latencyP95" stroke="#a78bfa" fillOpacity={0.35} fill="#a78bfa33" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card title="Ingest" actions={<span className="text-xs text-slate-400">Events per minute</span>}>
                    <div className="mt-3 h-56">
                        <ResponsiveContainer>
                            <BarChart data={samples} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                                <CartesianGrid stroke="#0f172a" strokeDasharray="3 3" opacity={0.6} />
                                <XAxis dataKey="ts" tickFormatter={(ts) => new Date(ts).toLocaleTimeString()} stroke="#1e293b" tick={axisStyle} />
                                <YAxis stroke="#1e293b" tick={axisStyle} />
                                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12 }} />
                                <Bar dataKey="ingest" fill="#22d3ee" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <Card title="Errors" actions={<span className="text-xs text-slate-400">% of events</span>}>
                    <div className="mt-3 h-56">
                        <ResponsiveContainer>
                            <AreaChart data={samples} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="errorsGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="5%" stopColor="#f472b6" stopOpacity={0.5} />
                                        <stop offset="95%" stopColor="#f472b6" stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="#0f172a" strokeDasharray="3 3" opacity={0.6} />
                                <XAxis dataKey="ts" tickFormatter={(ts) => new Date(ts).toLocaleTimeString()} stroke="#1e293b" tick={axisStyle} />
                                <YAxis stroke="#1e293b" tick={axisStyle} domain={[0, 100]} />
                                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12 }} />
                                <Area type="monotone" dataKey="errors" stroke="#f472b6" fillOpacity={1} fill="url(#errorsGradient)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card title="Refresh cadence" actions={<span className="text-xs text-slate-400">Minutes between refresh events</span>}>
                    <div className="mt-3 h-56">
                        <ResponsiveContainer>
                            <AreaChart data={samples} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="refreshGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.5} />
                                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid stroke="#0f172a" strokeDasharray="3 3" opacity={0.6} />
                                <XAxis dataKey="ts" tickFormatter={(ts) => new Date(ts).toLocaleTimeString()} stroke="#1e293b" tick={axisStyle} />
                                <YAxis stroke="#1e293b" tick={axisStyle} />
                                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12 }} />
                                <Area type="monotone" dataKey="refresh" stroke="#38bdf8" fillOpacity={1} fill="url(#refreshGradient)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            <TableCard
                title="Recent events"
                subtitle={`Most recent ${pageSize} of ${events.length}`}
                actions={(
                    <>
                        <Button accent="#22d3ee" variant="subtle" onClick={() => refetch()} disabled={isLoading}>
                            {isLoading ? "Refreshing…" : "Refresh"}
                        </Button>
                        <Button
                            accent="#a78bfa"
                            variant="subtle"
                            onClick={() => fetchNextPage()}
                            disabled={!hasNextPage || isFetchingNextPage}
                        >
                            {isFetchingNextPage ? "Loading…" : hasNextPage ? "Load more" : "All loaded"}
                        </Button>
                        {error ? <Badge accent="#f59e0b">{error instanceof Error ? error.message : "Error"}</Badge> : null}
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
                        totalItems={events.length}
                        onPageChange={(next) => setPage(next)}
                    />
                </Stack>
            </TableCard>
        </div>
    );
}
