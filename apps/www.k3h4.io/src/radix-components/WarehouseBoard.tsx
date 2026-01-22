import { useEffect } from "react";

import { Badge, Button, MetricTile, SectionHeader, Table } from "../radix-primitives";
import { useAuthStore } from "../zustand-stores/auth";
import { useWarehouseState } from "../react-hooks/warehouse";
import { TableCard } from "./TableCard";

export function WarehouseBoard() {
    const { session } = useAuthStore();
    const { items, status, error, fetchItems } = useWarehouseState();

    useEffect(() => {
        if (session?.accessToken && status === "idle") {
            fetchItems();
        }
    }, [session?.accessToken, status, fetchItems]);

    const loading = status === "loading";
    const totalQty = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

    return (
        <div className="space-y-4">
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

            <div className="grid gap-3 sm:grid-cols-3">
                <MetricTile label="SKUs" value={items.length.toString()} hint="Count" accent="#e0e7ff" />
                <MetricTile label="Quantity" value={totalQty.toString()} hint="Units" accent="#34d399" />
                <MetricTile label="Active" value={items.filter((i) => i.status !== "archived").length.toString()} hint="Non-archived" accent="#fcd34d" />
            </div>

            <TableCard title="Recent items" subtitle="Inventory" actions={<Badge accent="#e0e7ff">Live</Badge>}>
                {items.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">{session ? "No items yet." : "Sign in to view items."}</div>
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
        </div>
    );
}
