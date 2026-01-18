import { useEffect } from "react";

import { Badge, Button, Card, StatChip, Table } from "../radix-primitives";
import { useAuthStore } from "../zustand-stores/auth";
import { usePosState } from "../react-hooks/pos";

export function PosBoard() {
    const { session } = useAuthStore();
    const { overview, status, error, fetchOverview } = usePosState();

    useEffect(() => {
        if (session?.accessToken && status === "idle") {
            fetchOverview();
        }
    }, [session?.accessToken, status, fetchOverview]);

    const loading = status === "loading";

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <Badge accent="#f472b6">POS</Badge>
                {loading ? <span className="text-xs text-slate-400">Loading…</span> : null}
                {error ? <span className="text-xs text-amber-300">{error}</span> : null}
                <div className="ml-auto flex items-center gap-2">
                    <Button accent="#f472b6" disabled={loading} onClick={() => fetchOverview()}>
                        Refresh
                    </Button>
                </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
                <StatChip label="Gross" value={overview ? `₭${overview.metrics.grossRevenue}` : "-"} accent="#f472b6" />
                <StatChip label="Tickets" value={overview ? overview.metrics.tickets.toString() : "-"} accent="#22d3ee" />
                <StatChip label="Avg ticket" value={overview ? `₭${overview.metrics.avgTicket}` : "-"} accent="#a78bfa" />
            </div>

            <Card eyebrow="Orders" title="Channel mix" actions={<Badge accent="#f472b6">Live</Badge>}>
                {overview ? (
                    <Table
                        columns={[
                            { key: "store", label: "Store" },
                            { key: "channel", label: "Channel" },
                            { key: "tickets", label: "Tickets" },
                            { key: "revenue", label: "Revenue", render: (row) => `₭${row.revenue}` },
                        ]}
                        rows={overview.orders}
                        rowKey={(row, idx) => `${row.store}-${row.channel}-${idx}`}
                    />
                ) : (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">{session ? "No orders yet." : "Sign in to load POS."}</div>
                )}
            </Card>

            <Card eyebrow="Top items" title="Best sellers" actions={<Badge accent="#22d3ee">Top 10</Badge>}>
                {overview ? (
                    <Table
                        columns={[
                            { key: "name", label: "Item" },
                            { key: "sold", label: "Sold" },
                            { key: "revenue", label: "Revenue", render: (row) => `₭${row.revenue}` },
                        ]}
                        rows={overview.topItems}
                        rowKey={(row, idx) => `${row.name}-${idx}`}
                    />
                ) : null}
            </Card>
        </div>
    );
}
