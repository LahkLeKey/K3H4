import { useEffect } from "react";

import { Badge, Button, Card, StatChip, Table } from "../ui";
import { useAuthStore } from "../../zustand-stores/auth";
import { useArcadeState } from "../../react-hooks/arcade";

export function ArcadeBoard() {
    const { session } = useAuthStore();
    const { overview, status, error, fetchOverview } = useArcadeState();

    useEffect(() => {
        if (session?.accessToken && status === "idle") {
            fetchOverview();
        }
    }, [session?.accessToken, status, fetchOverview]);

    const loading = status === "loading";

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <Badge accent="#f472ff">Arcade</Badge>
                {loading ? <span className="text-xs text-slate-400">Loading…</span> : null}
                {error ? <span className="text-xs text-amber-300">{error}</span> : null}
                <div className="ml-auto flex items-center gap-2">
                    <Button accent="#f472ff" disabled={loading} onClick={() => fetchOverview()}>
                        Refresh
                    </Button>
                </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-4">
                <StatChip label="Machines" value={overview ? overview.machines.length.toString() : "-"} accent="#f472ff" />
                <StatChip label="Cards" value={overview ? overview.cards.length.toString() : "-"} accent="#22d3ee" />
                <StatChip label="Prizes" value={overview ? overview.prizes.length.toString() : "-"} accent="#fef08a" />
                <StatChip label="Sessions" value={overview ? overview.sessions.length.toString() : "-"} accent="#34d399" />
            </div>

            <Card eyebrow="Cards" title="Balances" actions={<Badge accent="#f472ff">Live</Badge>}>
                {overview ? (
                    <Table
                        columns={[
                            { key: "label", label: "Card" },
                            { key: "balance", label: "Balance", render: (row) => `₭${row.balance}` },
                            { key: "topUps", label: "Top-ups", render: (row) => row.topUps.length },
                        ]}
                        rows={overview.cards}
                        rowKey={(row) => row.id}
                    />
                ) : (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">{session ? "No cards yet." : "Sign in to load arcade."}</div>
                )}
            </Card>

            <Card eyebrow="Prizes" title="Prize vault" actions={<Badge accent="#fef08a">Stock</Badge>}>
                {overview ? (
                    <Table
                        columns={[
                            { key: "name", label: "Prize" },
                            { key: "sku", label: "SKU" },
                            { key: "stock", label: "Stock" },
                            { key: "costCoins", label: "Cost", render: (row) => (row.costCoins ? `₭${row.costCoins}` : "-") },
                        ]}
                        rows={overview.prizes}
                        rowKey={(row) => row.id}
                    />
                ) : null}
            </Card>
        </div>
    );
}
