import { useEffect, useState } from "react";
import { z } from "zod";

import { Badge, Button, EmptyState, Grid, MetricTile, SectionHeader, Stack, Table } from "../components/ui";
import { useAuthStore } from "../zustand-stores/auth";
import { useWarehouseState } from "../react-hooks/warehouse";
import { TableCard } from "./TableCard";
import { apiFetch } from "../react-hooks/lib/api-client";

export function WarehouseBoard() {
    const { session } = useAuthStore();
    const { items, status, error, fetchItems } = useWarehouseState();
    const [sku, setSku] = useState("SKU-123");
    const [qty, setQty] = useState("10");
    const [location, setLocation] = useState("A1");
    const [createStatus, setCreateStatus] = useState<string>("");

    useEffect(() => {
        if (session?.accessToken && status === "idle") {
            fetchItems();
        }
    }, [session?.accessToken, status, fetchItems]);

    const loading = status === "loading";
    const totalQty = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

    const handleCreate = async () => {
        if (!session?.accessToken) return;
        setCreateStatus("Creating item...");
        try {
            await apiFetch("/warehouse/items", {
                method: "POST",
                token: session.accessToken,
                baseUrl: useAuthStore.getState().apiBase,
                schema: z.any(),
                body: {
                    sku: sku || "SKU-123",
                    description: "Demo item",
                    quantity: Number(qty) || 1,
                    location: location || "A1",
                    status: "active",
                },
            });
            setCreateStatus("Item added");
            fetchItems();
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Failed";
            setCreateStatus(msg);
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
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        placeholder="SKU"
                    />
                    <input
                        className="w-32 rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        placeholder="Qty"
                    />
                    <input
                        className="w-32 rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Loc"
                    />
                    <Button accent="#e0e7ff" onClick={handleCreate} disabled={!session?.accessToken || loading}>
                        Add item
                    </Button>
                </div>
                <div className="text-xs text-slate-300">{createStatus || (!session ? "Sign in to create items." : "Creates inventory rows.")}</div>
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
