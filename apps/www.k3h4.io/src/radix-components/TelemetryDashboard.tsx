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

import type { TelemetryEvent } from "../react-hooks/telemetry";
import { useTelemetryInfiniteQuery } from "../react-hooks/telemetry";

function Card({ title, children, subtitle }: { title: string; subtitle?: string; children: React.ReactNode }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-slate-50 shadow-2xl backdrop-blur">
            <div className="flex items-baseline justify-between">
                <div className="text-sm font-semibold text-white">{title}</div>
                {subtitle ? <div className="text-xs text-slate-400">{subtitle}</div> : null}
            </div>
            <div className="mt-3 h-56">{children}</div>
        </div>
    );
}

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

const isErrorEvent = (eventType: string, payload: unknown) => {
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

            if (isErrorEvent(evt.eventType, evt.payload)) bucket.errorCount += 1;

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
            <div className="rounded-2xl border border-white/10 bg-slate-900/85 p-6 shadow-2xl backdrop-blur">
                <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">Telemetry</p>
                <h1 className="mt-2 text-3xl font-semibold text-white">System signals</h1>
                <p className="mt-2 text-sm text-slate-200">Live ingestion, latency, error rate, and map refresh cadence.</p>
                {summary ? (
                    <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Ingest</div>
                            <div className="text-lg font-semibold">{summary.ingest}</div>
                            <div className="text-[11px] text-slate-400">events/min</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">p50</div>
                            <div className="text-lg font-semibold">{summary.p50} ms</div>
                            <div className="text-[11px] text-slate-400">latency</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">p95</div>
                            <div className="text-lg font-semibold">{summary.p95} ms</div>
                            <div className="text-[11px] text-slate-400">latency</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Errors</div>
                            <div className="text-lg font-semibold">{summary.errors}%</div>
                            <div className="text-[11px] text-slate-400">recent</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Refresh</div>
                            <div className="text-lg font-semibold">{summary.refresh} min</div>
                            <div className="text-[11px] text-slate-400">tile cadence</div>
                        </div>
                    </div>
                ) : null}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <Card title="Latency trend" subtitle="p50 + p95">
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
                </Card>
                <Card title="Ingest" subtitle="Events per minute">
                    <ResponsiveContainer>
                        <BarChart data={samples} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                            <CartesianGrid stroke="#0f172a" strokeDasharray="3 3" opacity={0.6} />
                            <XAxis dataKey="ts" tickFormatter={(ts) => new Date(ts).toLocaleTimeString()} stroke="#1e293b" tick={axisStyle} />
                            <YAxis stroke="#1e293b" tick={axisStyle} />
                            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12 }} />
                            <Bar dataKey="ingest" fill="#22d3ee" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <Card title="Errors" subtitle="% of events">
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
                </Card>
                <Card title="Refresh cadence" subtitle="Minutes between refresh events">
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
                </Card>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/85 p-6 shadow-2xl backdrop-blur">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <div className="text-sm font-semibold text-white">Recent events</div>
                        <div className="text-xs text-slate-400">Most recent {pageSize} of {events.length}</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                        <button
                            type="button"
                            className="rounded border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/10 disabled:opacity-60"
                            onClick={() => refetch()}
                            disabled={isLoading}
                        >
                            {isLoading ? "Refreshing..." : "Refresh"}
                        </button>
                        <button
                            type="button"
                            className="rounded border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/10 disabled:opacity-60"
                            onClick={() => fetchNextPage()}
                            disabled={!hasNextPage || isFetchingNextPage}
                        >
                            {isFetchingNextPage ? "Loading..." : hasNextPage ? "Load more" : "All loaded"}
                        </button>
                        {error ? <span className="text-amber-300">{error instanceof Error ? error.message : "Error"}</span> : null}
                    </div>
                </div>

                <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-slate-950/60">
                    <div className="max-h-[520px] overflow-auto">
                        <table className="min-w-full text-left text-xs text-slate-100">
                            <thead className="bg-white/5 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                                <tr>
                                    <th className="px-3 py-2">Time</th>
                                    <th className="px-3 py-2">Type</th>
                                    <th className="px-3 py-2">Duration</th>
                                    <th className="px-3 py-2">Payload</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {pagedEvents.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-3 py-4 text-center text-slate-400">
                                            {isLoading ? "Loading events..." : "No events returned."}
                                        </td>
                                    </tr>
                                ) : (
                                    pagedEvents.map((evt) => (
                                        <tr key={evt.id} className="transition hover:bg-white/5">
                                            <td className="px-3 py-2 font-mono text-[11px] text-slate-200">{fmtTs(evt.createdAt)}</td>
                                            <td className="px-3 py-2 text-sm text-white">{evt.eventType}</td>
                                            <td className="px-3 py-2 text-sm text-white">{evt.durationMs ? `${evt.durationMs} ms` : "-"}</td>
                                            <td className="px-3 py-2 text-[11px] text-slate-300">{fmtPayload(evt.payload)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-300">
                    <div>
                        Page {page + 1} / {totalPages}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="rounded border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/10 disabled:opacity-60"
                            onClick={() => setPage((p) => Math.max(0, p - 1))}
                            disabled={page === 0}
                        >
                            Prev
                        </button>
                        <button
                            type="button"
                            className="rounded border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/10 disabled:opacity-60"
                            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                            disabled={page >= totalPages - 1}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
