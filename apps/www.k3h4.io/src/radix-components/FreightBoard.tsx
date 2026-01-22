import { useEffect } from "react";

import { Badge, Button, Card, StatChip, Table } from "@/components/ui";
import { useAuthStore } from "@/zustand-stores/auth";
import { useFreightState } from "@/react-hooks/freight";

export function FreightBoard() {
    const { session } = useAuthStore();
    const { loads, status, error, totals, fetchLoads, planQuickLoad, completeLoad } = useFreightState();

    useEffect(() => {
        if (session?.accessToken && status === "idle") {
            fetchLoads();
        }
    }, [session?.accessToken, status, fetchLoads]);

    const actionDisabled = !session?.accessToken || status === "loading";

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
