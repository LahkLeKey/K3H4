import { useEffect } from "react";

import { Badge, Button, EmptyState, Grid, MetricTile, SectionHeader, Stack, Table } from "../components/ui";
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
