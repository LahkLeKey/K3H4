import { useEffect, useMemo } from "react";
import { z } from "zod";

import { Badge, Button, Card, StatChip, Table } from "../ui";
import { FreightRouteMap } from "./FreightRouteMap";
import { useAuthStore } from "../../zustand-stores/auth";
import { useFreightState } from "../../react-hooks/freight";
import { useFreightDirections } from "../../react-hooks/freight-directions";
import { apiFetch } from "../../react-hooks/lib/api-client";
import { useLogisticsStore } from "../../zustand-stores/logistics";

export function FreightBoard() {
    const { session, apiBase } = useAuthStore();
    const {
        loads,
        status,
        error,
        totals,
        fetchLoads,
        planQuickLoad,
        completeLoad,
        selectedLoadId,
        selectLoad,
    } = useFreightState();
    const { freightCustomTitle, freightCustomRate, freightActionStatus, updateField } = useLogisticsStore();
    const selectedLoad = useMemo(() => loads.find((load) => load.id === selectedLoadId) ?? loads[0] ?? null, [loads, selectedLoadId]);
    const directionQuery = useFreightDirections(selectedLoad?.id ?? null, Boolean(selectedLoad));

    useEffect(() => {
        if (session?.accessToken && status === "idle") {
            fetchLoads();
        }
    }, [session?.accessToken, status, fetchLoads]);

    useEffect(() => {
        if (!loads.length) {
            selectLoad(null);
            return;
        }
        if (selectedLoadId && loads.some((load) => load.id === selectedLoadId)) return;
        selectLoad(loads[0].id);
    }, [loads, selectedLoadId, selectLoad]);

    const actionDisabled = !session?.accessToken || status === "loading";

    const handlePlanCustom = async () => {
        if (!session?.accessToken) return;
        updateField("freightActionStatus", "Planning...");
        try {
            await apiFetch("/freight", {
                method: "POST",
                token: session.accessToken,
                baseUrl: apiBase,
                schema: z.any(),
                body: {
                    title: freightCustomTitle || "Route",
                    originName: "Austin, TX",
                    originLat: 30.2672,
                    originLng: -97.7431,
                    destinationName: "Dallas, TX",
                    destinationLat: 32.7767,
                    destinationLng: -96.797,
                    ratePerKm: Number(freightCustomRate) || 2,
                },
            });
            updateField("freightActionStatus", "Load planned");
            fetchLoads();
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Failed";
            updateField("freightActionStatus", msg);
        }
    };

    const routeDistance = directionQuery.data?.distanceMeters
        ? directionQuery.data.distanceMeters / 1000
        : selectedLoad?.distanceKm ?? 0;
    const routeDurationMinutes = directionQuery.data?.durationSeconds
        ? Math.round(directionQuery.data.durationSeconds / 60)
        : selectedLoad?.durationMinutes ?? null;
    const previewSegments = directionQuery.data?.segments?.slice(0, 4) ?? [];
    const previewStops = directionQuery.data?.stops ?? [];
    const previewStatus = directionQuery.isError
        ? directionQuery.error?.message ?? "Route preview unavailable"
        : directionQuery.isFetching
            ? "Refreshing route preview…"
            : selectedLoad
                ? "Live route preview"
                : "Select a load to see the map";

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <Badge accent="#fbbf24">Freight</Badge>
                {status === "loading" ? <span className="text-xs text-slate-400">Loading…</span> : null}
                {error ? <span className="text-xs text-amber-300">{error}</span> : null}
                <div className="ml-auto flex items-center gap-2">
                    <Button accent="#22d3ee" onClick={() => fetchLoads()} disabled={status === "loading"}>
                        Refresh
                    </Button>
                    <Button accent="#fbbf24" onClick={() => planQuickLoad()} disabled={actionDisabled}>
                        Plan demo load
                    </Button>
                </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                <StatChip label="Active" value={totals.active.toString()} accent="#fbbf24" />
                <StatChip label="Completed" value={totals.completed.toString()} accent="#22c55e" />
                <StatChip label="Distance" value={`${totals.distanceKm.toFixed(1)} km`} accent="#60a5fa" />
                <StatChip label="Cost" value={`₭${totals.cost.toFixed(2)}`} accent="#f472b6" />
            </div>

            <Card eyebrow="Create" title="Plan load" actions={<Badge accent="#22d3ee">POST /freight</Badge>}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                    <div className="flex-1 space-y-1">
                        <label className="text-xs uppercase tracking-[0.16em] text-slate-400">Title</label>
                        <input
                            className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={freightCustomTitle}
                            onChange={(e) => updateField("freightCustomTitle", e.target.value)}
                        />
                    </div>
                    <div className="w-32 space-y-1">
                        <label className="text-xs uppercase tracking-[0.16em] text-slate-400">Rate/km</label>
                        <input
                            className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={freightCustomRate}
                            onChange={(e) => updateField("freightCustomRate", e.target.value)}
                        />
                    </div>
                    <Button accent="#fbbf24" onClick={handlePlanCustom} disabled={actionDisabled}>
                        Plan load
                    </Button>
                </div>
                <div className="text-xs text-slate-300">
                    {freightActionStatus || (actionDisabled ? "Sign in to plan loads." : "Austin to Dallas demo route.")}
                </div>
            </Card>

            <Card
                eyebrow="Route preview"
                title={selectedLoad?.title ? `${selectedLoad.title}` : "Freight map"}
                actions={<Badge accent="#22d3ee">GET /freight/:id/directions</Badge>}
            >
                <div className="space-y-2 text-xs uppercase tracking-[0.26em] text-slate-400">{previewStatus}</div>
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
                    <FreightRouteMap
                        direction={directionQuery.data ?? null}
                        placeholderCenter={
                            selectedLoad
                                ? {
                                    lat: (selectedLoad.originLat + selectedLoad.destinationLat) / 2,
                                    lng: (selectedLoad.originLng + selectedLoad.destinationLng) / 2,
                                }
                                : undefined
                        }
                        className="min-h-[260px]"
                        isLoading={directionQuery.isFetching}
                    />
                    <div className="flex flex-col gap-3">
                        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/60 to-slate-950/50 p-4">
                            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Distance</div>
                            <div className="text-3xl font-semibold text-white">{routeDistance.toFixed(1)} km</div>
                            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                                {routeDurationMinutes ? `${routeDurationMinutes} min` : "Duration pending"}
                            </div>
                        </div>
                        <div className="space-y-2 overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/40 p-3 text-sm text-slate-200" style={{ maxHeight: "220px" }}>
                            {previewSegments.length ? (
                                previewSegments.map((segment) => (
                                    <div key={segment.id} className="rounded-2xl border border-white/5 bg-white/5 p-3">
                                        <div className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                                            Leg {segment.sequence + 1}
                                        </div>
                                        <p className="text-sm font-semibold text-white">{segment.instruction}</p>
                                        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-slate-500">
                                            <span>{(segment.distanceMeters / 1000).toFixed(2)} km</span>
                                            <span>{segment.durationSeconds ? `${Math.round(segment.durationSeconds / 60)} min` : "—"}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-xs text-slate-400">Turn-by-turn instructions will populate after the preview loads.</div>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.24em] text-slate-300">
                            {previewStops.length ? (
                                previewStops.map((stop) => (
                                    <span
                                        key={stop.id}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white"
                                    >
                                        {stop.label || (stop.sequence === 0 ? "Origin" : "Destination")}
                                    </span>
                                ))
                            ) : (
                                <span className="text-slate-400">Stops are generated from the selected load.</span>
                            )}
                        </div>
                    </div>
                </div>
            </Card>

            <Card eyebrow="Loads" title="Route planner" actions={<Badge accent="#fbbf24">Live</Badge>}>
                {loads.length === 0 ? (
                    <div className="space-y-1 rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-slate-200">
                        <div className="font-semibold">{session ? "No loads yet" : "Sign in to view loads"}</div>
                        <div className="text-slate-400">
                            {session ? "Plan a demo load to fetch OSRM distance + cost." : "Authorize to load your freight data."}
                        </div>
                    </div>
                ) : (
                    <Table
                        columns={[
                            { key: "title", label: "Load" },
                            {
                                key: "originName",
                                label: "Route",
                                render: (row) => (
                                    <span className="text-sm text-slate-200">
                                        {row.originName} → {row.destinationName}
                                    </span>
                                ),
                            },
                            {
                                key: "distanceKm",
                                label: "Distance",
                                render: (row) => `${row.distanceKm.toFixed(1)} km`,
                            },
                            {
                                key: "cost",
                                label: "Cost",
                                render: (row) => `₭${row.cost.toFixed(2)}`,
                            },
                            { key: "status", label: "Status" },
                            {
                                key: "preview",
                                label: "Preview",
                                render: (row) => (
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            accent={row.id === selectedLoadId ? "#22d3ee" : "#fbbf24"}
                                            variant={row.id === selectedLoadId ? "solid" : "outline"}
                                            onClick={() => selectLoad(row.id)}
                                            disabled={actionDisabled && row.id !== selectedLoadId}
                                        >
                                            {row.id === selectedLoadId ? "Viewing" : "Preview"}
                                        </Button>
                                        {row.id === selectedLoadId ? (
                                            <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-300">selected</span>
                                        ) : null}
                                    </div>
                                ),
                            },
                            {
                                key: "id",
                                label: "",
                                render: (row) => (
                                    <Button
                                        accent={row.status === "completed" ? "#22c55e" : "#fbbf24"}
                                        disabled={row.status === "completed" || actionDisabled}
                                        onClick={() => completeLoad(row.id)}
                                    >
                                        {row.status === "completed" ? "Done" : "Complete"}
                                    </Button>
                                ),
                            },
                        ]}
                        rows={loads}
                        rowKey={(row) => row.id}
                    />
                )}
            </Card>
        </div>
    );
}
