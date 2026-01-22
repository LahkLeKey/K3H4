import { useEffect, useMemo, useState } from "react";

import { Tabs } from "../radix-primitives";
import { Badge, Button, SectionHeader, Stack } from "../components/ui";
import type { TelemetryEvent } from "../react-hooks/telemetry";
import { useTelemetryInfiniteQuery } from "../react-hooks/telemetry";
import { useTelemetryStore } from "../zustand-stores/telemetry";
import {
    TelemetryEventsTableCard,
    TelemetryErrorsCard,
    TelemetryIngestCard,
    TelemetryLatencyCard,
    TelemetryRefreshCard,
    TelemetrySlowestEventsCard,
    type TelemetrySummary,
    TelemetrySummaryTiles,
    TelemetryWorstTypesCard,
} from "./telemetry/TelemetryCards";

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
    const { activeTab, setActiveTab, windowHours, limit } = useTelemetryStore();
    const sinceIso = useMemo(() => new Date(Date.now() - windowHours * 60 * 60 * 1000).toISOString(), [windowHours]);
    const filters = useMemo(() => ({ limit, since: sinceIso }), [limit, sinceIso]);
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

    const durationEvents = useMemo(() => events.filter((evt) => typeof evt.durationMs === "number" && evt.durationMs !== null && evt.durationMs > 0), [events]);

    const slowestEvents = useMemo(() => {
        return durationEvents
            .slice()
            .sort((a, b) => (b.durationMs ?? 0) - (a.durationMs ?? 0))
            .slice(0, 10);
    }, [durationEvents]);

    const worstTypes = useMemo(() => {
        const map = new Map<string, number[]>();
        for (const evt of durationEvents) {
            const key = evt.eventType;
            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(evt.durationMs as number);
        }
        const rows = Array.from(map.entries()).map(([eventType, durations]) => ({
            eventType,
            p95: percentile(durations, 95),
            p50: percentile(durations, 50),
            count: durations.length,
        }));
        return rows.sort((a, b) => b.p95 - a.p95).slice(0, 8);
    }, [durationEvents]);

    const summary = useMemo<TelemetrySummary | null>(() => {
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
    const overviewContent = (
        <Stack gap="md">
            <TelemetrySummaryTiles summary={summary} isLoading={isLoading} />

            <div className="grid gap-4 lg:grid-cols-2">
                <TelemetryLatencyCard data={samples} gradientId="latencyGradient-overview" />
                <TelemetryIngestCard data={samples} />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <TelemetryErrorsCard data={samples} gradientId="errorsGradient-overview" />
                <TelemetryRefreshCard data={samples} gradientId="refreshGradient-overview" />
            </div>
        </Stack>
    );

    const performanceContent = (
        <Stack gap="md">
            <div className="grid gap-4 lg:grid-cols-2">
                <TelemetryLatencyCard data={samples} gradientId="latencyGradient-performance" />
                <TelemetryWorstTypesCard rows={worstTypes} />
            </div>
            <TelemetrySlowestEventsCard rows={slowestEvents} />
        </Stack>
    );

    const reliabilityContent = (
        <div className="grid gap-4 lg:grid-cols-2">
            <TelemetryErrorsCard data={samples} gradientId="errorsGradient-reliability" />
            <TelemetryRefreshCard data={samples} gradientId="refreshGradient-reliability" />
            <TelemetryIngestCard data={samples} />
        </div>
    );

    const eventsContent = (
        <Stack gap="md">
            <TelemetrySlowestEventsCard rows={slowestEvents} />
            <TelemetryEventsTableCard
                pagedEvents={pagedEvents}
                page={page}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={events.length}
                isLoading={isLoading}
                error={error instanceof Error ? error : null}
                hasNextPage={Boolean(hasNextPage)}
                isFetchingNextPage={isFetchingNextPage}
                onPageChange={setPage}
                onRefresh={refetch}
                onLoadMore={fetchNextPage}
            />
        </Stack>
    );

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
            <SectionHeader
                kicker="Telemetry"
                title="Observability cockpit"
                description="Live ingestion, latency, error rate, and map refresh cadence across the last 24 hours."
                status={summary ? `Last updated ${summary.lastUpdated}` : "Awaiting telemetry stream..."}
                actions={(
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge accent="#22d3ee">{events.length ? `${events.length} cached` : "No events"}</Badge>
                        <Badge accent="#38bdf8">Window: {windowHours}h • limit {limit}</Badge>
                        <Button accent="#22d3ee" variant="outline" onClick={() => refetch()} disabled={isLoading}>
                            {isLoading ? "Refreshing…" : "Refresh"}
                        </Button>
                        <Button accent="#a78bfa" variant="outline" onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                            {isFetchingNextPage ? "Loading…" : hasNextPage ? "Load more" : "All loaded"}
                        </Button>
                        {error ? <Badge accent="#f59e0b">{error instanceof Error ? error.message : "Error"}</Badge> : null}
                    </div>
                )}
            />

            <Tabs
                value={activeTab}
                onValueChange={(key) => setActiveTab(key as typeof activeTab)}
                tabs={[
                    { key: "overview", label: "Overview", content: overviewContent },
                    { key: "performance", label: "Performance", content: performanceContent },
                    { key: "reliability", label: "Reliability", content: reliabilityContent },
                    { key: "events", label: "Events", content: eventsContent },
                ]}
            />
        </div>
    );
}
