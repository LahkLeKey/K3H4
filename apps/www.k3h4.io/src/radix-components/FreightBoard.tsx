import { useEffect, useState } from "react";
import { z } from "zod";

import { Badge, Button, Card, StatChip, Table } from "../components/ui";
import { useAuthStore } from "../zustand-stores/auth";
import { useFreightState } from "../react-hooks/freight";
import { apiFetch } from "../react-hooks/lib/api-client";

export function FreightBoard() {
    const { session } = useAuthStore();
    const { loads, status, error, totals, fetchLoads, planQuickLoad, completeLoad } = useFreightState();
    const [customTitle, setCustomTitle] = useState("Austin -> Dallas");
    const [customRate, setCustomRate] = useState("2.1");
    const [actionStatus, setActionStatus] = useState<string>("");

    useEffect(() => {
        if (session?.accessToken && status === "idle") {
            fetchLoads();
        }
    }, [session?.accessToken, status, fetchLoads]);

    const actionDisabled = !session?.accessToken || status === "loading";

    const handlePlanCustom = async () => {
        if (!session?.accessToken) return;
        setActionStatus("Planning...");
        try {
            await apiFetch("/freight", {
                method: "POST",
                token: session.accessToken,
                baseUrl: useAuthStore.getState().apiBase,
                schema: z.any(),
                body: {
                    title: customTitle || "Route",
                    originName: "Austin, TX",
                    originLat: 30.2672,
                    originLng: -97.7431,
                    destinationName: "Dallas, TX",
                    destinationLat: 32.7767,
                    destinationLng: -96.797,
                    ratePerKm: Number(customRate) || 2,
                },
            });
            setActionStatus("Load planned");
            fetchLoads();
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Failed";
            setActionStatus(msg);
        }
    };

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
                            value={customTitle}
                            onChange={(e) => setCustomTitle(e.target.value)}
                        />
                    </div>
                    <div className="w-32 space-y-1">
                        <label className="text-xs uppercase tracking-[0.16em] text-slate-400">Rate/km</label>
                        <input
                            className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={customRate}
                            onChange={(e) => setCustomRate(e.target.value)}
                        />
                    </div>
                    <Button accent="#fbbf24" onClick={handlePlanCustom} disabled={actionDisabled}>
                        Plan load
                    </Button>
                </div>
                <div className="text-xs text-slate-300">{actionStatus || (actionDisabled ? "Sign in to plan loads." : "Austin to Dallas demo route.")}</div>
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
