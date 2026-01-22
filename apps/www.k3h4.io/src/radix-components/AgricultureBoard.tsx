import { useEffect } from "react";
import { z } from "zod";

import { Badge, Button, Card, StatChip } from "../components/ui";
import { useAuthStore } from "../zustand-stores/auth";
import { useAgricultureState } from "../react-hooks/agriculture";
import { apiFetch } from "../react-hooks/lib/api-client";
import { useLogisticsStore } from "../zustand-stores/logistics";

export function AgricultureBoard() {
    const { session } = useAuthStore();
    const { overview, status, error, fetchOverview } = useAgricultureState();
    const { agricultureSlotId, agricultureInvName, agricultureInvQty, agricultureFormStatus, updateField } = useLogisticsStore();

    useEffect(() => {
        if (session?.accessToken && status === "idle") {
            fetchOverview();
        }
    }, [session?.accessToken, status, fetchOverview]);

    const loading = status === "loading";

    const handleUnlockSlot = async () => {
        if (!session?.accessToken) return;
        updateField("agricultureFormStatus", "Unlocking slot...");
        try {
            await apiFetch("/agriculture/slots/unlock", {
                method: "POST",
                token: session.accessToken,
                baseUrl: useAuthStore.getState().apiBase,
                schema: z.any(),
                body: { slotId: agricultureSlotId || "slot-1" },
            });
            updateField("agricultureFormStatus", "Slot unlocked");
            fetchOverview();
        } catch (err) {
            updateField("agricultureFormStatus", err instanceof Error ? err.message : "Failed");
        }
    };

    const handleAddInventory = async () => {
        if (!session?.accessToken) return;
        updateField("agricultureFormStatus", "Adding inventory...");
        try {
            await apiFetch("/agriculture/inventory", {
                method: "POST",
                token: session.accessToken,
                baseUrl: useAuthStore.getState().apiBase,
                schema: z.any(),
                body: { item: agricultureInvName || "Item", quantity: Number(agricultureInvQty) || 1, unit: "units" },
            });
            updateField("agricultureFormStatus", "Inventory added");
            fetchOverview();
        } catch (err) {
            updateField("agricultureFormStatus", err instanceof Error ? err.message : "Failed");
        }
    };

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

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Unlock slot</div>
                        <input
                            className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={agricultureSlotId}
                            onChange={(e) => updateField("agricultureSlotId", e.target.value)}
                            placeholder="slot-1"
                        />
                        <Button accent="#86efac" onClick={handleUnlockSlot} disabled={!session?.accessToken || loading}>
                            Unlock
                        </Button>
                    </div>

                    <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Add inventory</div>
                        <input
                            className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={agricultureInvName}
                            onChange={(e) => updateField("agricultureInvName", e.target.value)}
                            placeholder="Item"
                        />
                        <input
                            className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={agricultureInvQty}
                            onChange={(e) => updateField("agricultureInvQty", e.target.value)}
                            placeholder="Qty"
                        />
                        <Button accent="#22d3ee" onClick={handleAddInventory} disabled={!session?.accessToken || loading}>
                            Add inventory
                        </Button>
                    </div>
                </div>
                <div className="mt-2 text-xs text-slate-300">{agricultureFormStatus || (!session ? "Sign in to post actions." : "Live agriculture actions.")}</div>
            </Card>
        </div>
    );
}
