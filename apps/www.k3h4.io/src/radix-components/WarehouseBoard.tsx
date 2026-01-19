import { useEffect } from "react";

import { Badge, Button, Card, StatChip, Table } from "../radix-primitives";
import { useAuthStore } from "../zustand-stores/auth";
import { useWarehouseState } from "../react-hooks/warehouse";

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
            <div className="flex flex-wrap items-center gap-2">
                <Badge accent="#e0e7ff">Warehouse</Badge>
                {loading ? <span className="text-xs text-slate-400">Loading…</span> : null}
                {error ? <span className="text-xs text-amber-300">{error}</span> : null}
                <div className="ml-auto flex items-center gap-2">
                    <Button accent="#e0e7ff" disabled={loading} onClick={() => fetchItems()}>
                        Refresh
                    </Button>
                </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
                <StatChip label="SKUs" value={items.length.toString()} accent="#e0e7ff" />
                <StatChip label="Quantity" value={totalQty.toString()} accent="#34d399" />
                <StatChip label="Active" value={items.filter((i) => i.status !== "archived").length.toString()} accent="#fcd34d" />
            </div>

            <Card eyebrow="Inventory" title="Recent items" actions={<Badge accent="#e0e7ff">Live</Badge>}>
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
            </Card>
        </div>
    );
}
