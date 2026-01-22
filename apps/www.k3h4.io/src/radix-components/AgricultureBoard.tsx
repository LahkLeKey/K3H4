import { useEffect } from "react";

import { Badge, Button, Card, StatChip } from "@/components/ui";
import { useAuthStore } from "@/zustand-stores/auth";
import { useAgricultureState } from "@/react-hooks/agriculture";

export function AgricultureBoard() {
    const { session } = useAuthStore();
    const { overview, status, error, fetchOverview } = useAgricultureState();

    useEffect(() => {
        if (session?.accessToken && status === "idle") {
            fetchOverview();
        }
    }, [session?.accessToken, status, fetchOverview]);

    const loading = status === "loading";

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <Badge accent="#86efac">Agri Ops</Badge>
                {loading ? <span className="text-xs text-slate-400">Loading…</span> : null}
                {error ? <span className="text-xs text-amber-300">{error}</span> : null}
                <div className="ml-auto flex items-center gap-2">
                    <Button accent="#86efac" disabled={loading} onClick={() => fetchOverview()}>
                        Refresh
                    </Button>
                </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
                <StatChip label="Plots" value={overview ? overview.plots.toString() : "-"} accent="#86efac" />
                <StatChip label="Tasks" value={overview ? overview.tasks.toString() : "-"} accent="#34d399" />
                <StatChip label="Shipments" value={overview ? overview.shipments.toString() : "-"} accent="#22d3ee" />
            </div>

            <Card eyebrow="Inputs" title="Inventory + finance" actions={<Badge accent="#86efac">Live</Badge>}>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <StatChip label="Seeds" value={overview ? `${overview.seeds}` : "-"} accent="#86efac" />
                    <StatChip label="Fertilizer" value={overview ? `${overview.fertilizer}` : "-"} accent="#a5b4fc" />
                    <StatChip label="Feed" value={overview ? `${overview.feed}` : "-"} accent="#fbbf24" />
                    <StatChip label="Harvest" value={overview ? `${overview.harvest}` : "-"} accent="#22c55e" />
                    <StatChip label="Debt" value={overview ? `₭${overview.debt}` : "-"} accent="#f87171" />
                    <StatChip label="P&L" value={overview ? `₭${overview.pnl}` : "-"} accent="#38bdf8" />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <StatChip label="Burn" value={overview ? `₭${overview.burnRate}` : "-"} accent="#f472b6" />
                    <StatChip label="Receivables" value={overview ? `₭${overview.receivables}` : "-"} accent="#6ee7b7" />
                    <StatChip label="Unlocked slots" value={overview ? overview.unlockedSlots.toString() : "-"} accent="#f59e0b" />
                </div>
            </Card>
        </div>
    );
}
