import { z } from "zod";

import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Grid } from "../../components/ui/Grid";
import { Stack } from "../../components/ui";
import { useAuthStore } from "../../zustand-stores/auth";
import { apiFetch } from "../../react-hooks/lib/api-client";
import { useCulinaryState } from "../../react-hooks/culinary";
import { usePosState } from "../../react-hooks/pos";
import { useArcadeState } from "../../react-hooks/arcade";
import { useStorefrontsStore } from "../../zustand-stores/storefronts";

const AnySchema = z.any();

export function StorefrontsActionsPanel() {
    const { session, apiBase } = useAuthStore();
    const { fetchOverview: fetchCulinary } = useCulinaryState();
    const { fetchOverview: fetchPos } = usePosState();
    const { fetchOverview: fetchArcade } = useArcadeState();
    const {
        culinaryName,
        culinaryPrepMinutes,
        culinaryStatus,
        posTicketStore,
        posTicketChannel,
        posTicketAmount,
        posTicketStatus,
        status,
        updateField,
        setStatus,
    } = useStorefrontsStore();

    const disabled = !session?.accessToken;

    const handleCreateMenuItem = async () => {
        if (disabled) return;
        updateField("culinaryStatus", "Creating menu item...");
        try {
            await apiFetch("/culinary/menu-items", {
                method: "POST",
                token: session!.accessToken,
                baseUrl: apiBase,
                schema: AnySchema,
                body: {
                    name: culinaryName || "Menu Item",
                    prepMinutes: Number(culinaryPrepMinutes) || 10,
                    cost: "7.50",
                    price: "16.00",
                },
            });
            updateField("culinaryStatus", "Menu item created");
            fetchCulinary();
        } catch (err) {
            updateField("culinaryStatus", err instanceof Error ? err.message : "Failed to create menu item");
        }
    };

    const handleCreateTicket = async () => {
        if (disabled) return;
        updateField("posTicketStatus", "Creating ticket...");
        try {
            await apiFetch("/pos/tickets", {
                method: "POST",
                token: session!.accessToken,
                baseUrl: apiBase,
                schema: AnySchema,
                body: {
                    storeName: posTicketStore || "Demo Store",
                    channel: posTicketChannel || "dine-in",
                    total: posTicketAmount || "0",
                },
            });
            updateField("posTicketStatus", "Ticket created");
            fetchPos();
        } catch (err) {
            updateField("posTicketStatus", err instanceof Error ? err.message : "Failed to create ticket");
        }
    };

    const handleRefreshAll = () => {
        if (!session?.accessToken) return;
        setStatus("Refreshing storefront data...");
        fetchCulinary();
        fetchPos();
        fetchArcade();
        setTimeout(() => setStatus(""), 1200);
    };

    return (
        <Card eyebrow="Actions" title="Storefront workflows" subtitle="Menus, tickets, and arcade operations.">
            <Stack gap="md">
                <Grid smCols={1} mdCols={2} lgCols={3} gap="md">
                    <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Add menu item</div>
                        <input
                            className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={culinaryName}
                            onChange={(e) => updateField("culinaryName", e.target.value)}
                            placeholder="Menu item name"
                        />
                        <input
                            className="w-32 rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={culinaryPrepMinutes}
                            onChange={(e) => updateField("culinaryPrepMinutes", e.target.value)}
                            placeholder="Prep (min)"
                        />
                        <Button accent="#fb7185" onClick={handleCreateMenuItem} disabled={disabled}>
                            Create menu item
                        </Button>
                        <div className="text-xs text-slate-300">{culinaryStatus || (!session ? "Sign in to create items." : "Posts to /culinary/menu-items")}</div>
                    </div>

                    <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Add POS ticket</div>
                        <input
                            className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={posTicketStore}
                            onChange={(e) => updateField("posTicketStore", e.target.value)}
                            placeholder="Store"
                        />
                        <input
                            className="w-32 rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={posTicketChannel}
                            onChange={(e) => updateField("posTicketChannel", e.target.value)}
                            placeholder="Channel"
                        />
                        <input
                            className="w-32 rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={posTicketAmount}
                            onChange={(e) => updateField("posTicketAmount", e.target.value)}
                            placeholder="Amount"
                        />
                        <Button accent="#f472b6" onClick={handleCreateTicket} disabled={disabled}>
                            Create ticket
                        </Button>
                        <div className="text-xs text-slate-300">{posTicketStatus || (!session ? "Sign in to create tickets." : "Posts to /pos/tickets")}</div>
                    </div>

                    <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Sync data</div>
                        <Button accent="#f472ff" onClick={handleRefreshAll} disabled={!session?.accessToken}>
                            Refresh all
                        </Button>
                        <div className="text-xs text-slate-300">{status || (!session ? "Sign in to refresh live data." : "Refreshes culinary, POS, arcade.")}</div>
                    </div>
                </Grid>
            </Stack>
        </Card>
    );
}
