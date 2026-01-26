import { useEffect } from "react";
import { z } from "zod";

import { Badge, Button, EmptyState, Grid, MetricTile, SectionHeader, Stack, Table } from "../ui";
import { useAuthStore } from "../../zustand-stores/auth";
import { useWarehouseState } from "../../react-hooks/warehouse";
import { useLogisticsStore } from "../../zustand-stores/logistics";
import { TableCard } from "./TableCard";
import { apiFetch } from "../../react-hooks/lib/api-client";

export function WarehouseBoard() {
    const { session } = useAuthStore();
    const { items, status, error, fetchItems } = useWarehouseState();
    const { warehouseSku, warehouseQty, warehouseLocation, warehouseCreateStatus, updateField } = useLogisticsStore();

    useEffect(() => {
        if (session?.accessToken && status === "idle") {
            fetchItems();
        }
    }, [session?.accessToken, status, fetchItems]);

    const loading = status === "loading";
    const totalQty = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

    const handleCreate = async () => {
        if (!session?.accessToken) return;
        updateField("warehouseCreateStatus", "Creating item...");
        try {
            await apiFetch("/warehouse/items", {
                method: "POST",
                token: session.accessToken,
                baseUrl: useAuthStore.getState().apiBase,
                schema: z.any(),
                body: {
                    sku: warehouseSku || "SKU-123",
                    description: "Demo item",
                    quantity: Number(warehouseQty) || 1,
                    location: warehouseLocation || "A1",
                    status: "active",
                },
            });
            updateField("warehouseCreateStatus", "Item added");
            fetchItems();
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Failed";
            updateField("warehouseCreateStatus", msg);
        }
    };

    return (
        <Stack gap="lg">
            <SectionHeader
                kicker="Warehouse"
                title="Inventory overview"
                description="Live SKUs, quantities, and statuses."
                status={loading ? "Loading…" : error ? error : undefined}
                actions={(
                    <Button accent="#e0e7ff" variant="outline" disabled={loading} onClick={() => fetchItems()}>
                        Refresh
                    </Button>
                )}
            />

            <Grid gap="md" smCols={3}>
                <MetricTile label="SKUs" value={items.length.toString()} hint="Count" accent="#e0e7ff" />
                <MetricTile label="Quantity" value={totalQty.toString()} hint="Units" accent="#34d399" />
                <MetricTile label="Active" value={items.filter((i) => i.status !== "archived").length.toString()} hint="Non-archived" accent="#fcd34d" />
            </Grid>

            <TableCard title="Add item" subtitle="POST /warehouse/items" actions={<Badge accent="#e0e7ff">Create</Badge>}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                    <input
                        className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                        value={warehouseSku}
                        onChange={(e) => updateField("warehouseSku", e.target.value)}
                        placeholder="SKU"
                    />
                    <input
                        className="w-32 rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                        value={warehouseQty}
                        onChange={(e) => updateField("warehouseQty", e.target.value)}
                        placeholder="Qty"
                    />
                    <input
                        className="w-32 rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                        value={warehouseLocation}
                        onChange={(e) => updateField("warehouseLocation", e.target.value)}
                        placeholder="Loc"
                    />
                    <Button accent="#e0e7ff" onClick={handleCreate} disabled={!session?.accessToken || loading}>
                        Add item
                    </Button>
                </div>
                <div className="text-xs text-slate-300">{warehouseCreateStatus || (!session ? "Sign in to create items." : "Creates inventory rows.")}</div>
            </TableCard>

            <TableCard title="Recent items" subtitle="Inventory" actions={<Badge accent="#e0e7ff">Live</Badge>}>
                {items.length === 0 ? (
                    <EmptyState title={session ? "No items yet." : "Sign in to view items."} />
                ) : (
                    <Table
                        columns={[
                            { key: "sku", label: "SKU" },
                            { key: "description", label: "Description" },
                            { key: "quantity", label: "Qty" },
                            { key: "location", label: "Location" },
                            { key: "status", label: "Status" },
                        ]}
                        rows={items.slice(0, 10)}
                        rowKey={(row) => row.id}
                    />
                )}
            </TableCard>
        </Stack>
    );
}
