import { z } from "zod";

import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Grid } from "../components/ui/Grid";
import { Stack } from "../components/ui";
import { useAuthStore } from "../zustand-stores/auth";
import { apiFetch } from "../react-hooks/lib/api-client";
import { useFreightState } from "../react-hooks/freight";
import { useWarehouseState } from "../react-hooks/warehouse";
import { useCulinaryState } from "../react-hooks/culinary";
import { usePosState } from "../react-hooks/pos";
import { useLogisticsStore } from "../zustand-stores/logistics";

const AnySchema = z.any();

export function LogisticsActionsPanel() {
    const { session, apiBase } = useAuthStore();
    const { fetchLoads } = useFreightState();
    const { fetchItems } = useWarehouseState();
    const { fetchOverview: fetchCulinary } = useCulinaryState();
    const { fetchOverview: fetchPos } = usePosState();
    const {
        freightTitle,
        freightRate,
        warehouseSku,
        warehouseQty,
        culinaryName,
        posStore,
        status,
        updateField,
        setStatus: setStatusMessage,
    } = useLogisticsStore();

    const disabled = !session?.accessToken;

    const handlePlanFreight = async () => {
        if (disabled) return;
        setStatusMessage("Planning load...");
        try {
            await apiFetch("/freight", {
                method: "POST",
                token: session!.accessToken,
                baseUrl: apiBase,
                schema: AnySchema,
                body: {
                    title: freightTitle || "Route",
                    originName: "Austin, TX",
                    originLat: 30.2672,
                    originLng: -97.7431,
                    destinationName: "Dallas, TX",
                    destinationLat: 32.7767,
                    destinationLng: -96.797,
                    ratePerKm: Number(freightRate) || 2,
                },
            });
            setStatusMessage("Freight load planned");
            fetchLoads();
        } catch (err) {
            setStatusMessage(err instanceof Error ? err.message : "Failed to plan load");
        }
    };

    const handleCreateItem = async () => {
        if (disabled) return;
        setStatusMessage("Creating item...");
        try {
            await apiFetch("/warehouse/items", {
                method: "POST",
                token: session!.accessToken,
                baseUrl: apiBase,
                schema: AnySchema,
                body: {
                    sku: warehouseSku || "SKU-123",
                    description: "Demo item",
                    quantity: Number(warehouseQty) || 1,
                    location: "A1",
                    status: "active",
                },
            });
            setStatusMessage("Item created");
            fetchItems();
        } catch (err) {
            setStatusMessage(err instanceof Error ? err.message : "Failed to create item");
        }
    };

    const handleCreateMenuItem = async () => {
        if (disabled) return;
        setStatusMessage("Creating menu item...");
        try {
            await apiFetch("/culinary/menu-items", {
                method: "POST",
                token: session!.accessToken,
                baseUrl: apiBase,
                schema: AnySchema,
                body: {
                    name: culinaryName || "Menu Item",
                    prepMinutes: 12,
                    cost: "7.50",
                    price: "16.00",
                },
            });
            setStatusMessage("Menu item created");
            fetchCulinary();
        } catch (err) {
            setStatusMessage(err instanceof Error ? err.message : "Failed to create menu item");
        }
    };

    const handleCreateStore = async () => {
        if (disabled) return;
        setStatusMessage("Creating store...");
        try {
            await apiFetch("/pos/stores", {
                method: "POST",
                token: session!.accessToken,
                baseUrl: apiBase,
                schema: AnySchema,
                body: {
                    name: posStore || "Demo Store",
                    channel: "dine-in",
                },
            });
            setStatusMessage("Store created");
            fetchPos();
        } catch (err) {
            setStatusMessage(err instanceof Error ? err.message : "Failed to create store");
        }
    };

    return (
        <Card
            eyebrow="Actions"
            title="Create and simulate"
            subtitle="Plan freight, add inventory, extend menus, and register POS stores."
        >
            <Stack gap="md">
                <Grid smCols={2} mdCols={2} lgCols={4} gap="md">
                    <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Plan freight</div>
                        <input
                            className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={freightTitle}
                            onChange={(e) => updateField("freightTitle", e.target.value)}
                            placeholder="Route title"
                        />
                        <input
                            className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={freightRate}
                            onChange={(e) => updateField("freightRate", e.target.value)}
                            placeholder="Rate per km"
                        />
                        <Button accent="#fbbf24" onClick={handlePlanFreight} disabled={disabled}>
                            Plan load
                        </Button>
                    </div>

                    <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Add warehouse item</div>
                        <input
                            className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={warehouseSku}
                            onChange={(e) => updateField("warehouseSku", e.target.value)}
                            placeholder="SKU"
                        />
                        <input
                            className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={warehouseQty}
                            onChange={(e) => updateField("warehouseQty", e.target.value)}
                            placeholder="Quantity"
                        />
                        <Button accent="#e0e7ff" onClick={handleCreateItem} disabled={disabled}>
                            Add item
                        </Button>
                    </div>

                    <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Add menu item</div>
                        <input
                            className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={culinaryName}
                            onChange={(e) => updateField("culinaryName", e.target.value)}
                            placeholder="Menu item name"
                        />
                        <Button accent="#fb7185" onClick={handleCreateMenuItem} disabled={disabled}>
                            Create menu item
                        </Button>
                    </div>

                    <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Add POS store</div>
                        <input
                            className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={posStore}
                            onChange={(e) => updateField("posStore", e.target.value)}
                            placeholder="Store name"
                        />
                        <Button accent="#f472b6" onClick={handleCreateStore} disabled={disabled}>
                            Create store
                        </Button>
                    </div>
                </Grid>

                <div className="text-xs text-slate-300">{status || (disabled ? "Sign in to run actions." : "Ready.")}</div>
            </Stack>
        </Card>
    );
}
