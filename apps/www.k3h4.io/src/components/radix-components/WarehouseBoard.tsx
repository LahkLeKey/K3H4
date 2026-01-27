import { useEffect } from "react";

import { Button, Stack, Table, type TableColumn } from "../ui";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../zustand-stores/auth";
import { useWarehouseState, type WarehouseItem } from "../../zustand-stores/warehouse";

const columns: TableColumn<WarehouseItem>[] = [
    { key: "sku", label: "SKU" },
    {
        key: "description",
        label: "Description",
        render: (row) => row.description || "—",
    },
    { key: "quantity", label: "Quantity" },
    { key: "location", label: "Location" },
    { key: "status", label: "Status" },
    {
        key: "metadata",
        label: "Notes",
        render: (row) => row.metadata?.notes || row.metadata?.slot?.slug || "—",
    },
];

export function WarehouseBoard() {
    const { session } = useAuthStore();
    const { items, status, error, fetchItems } = useWarehouseState();
    const navigate = useNavigate();

    const noDataMessage =
        status === "loading"
            ? "Loading warehouse inventory…"
            : error
                ? error
                : "No warehouse inventory to show.";

    useEffect(() => {
        if (session?.accessToken && status === "idle") {
            fetchItems();
        }
    }, [session?.accessToken, status, fetchItems]);

    useEffect(() => {
        if (!session?.accessToken) {
            navigate("/auth/login", { replace: true });
        }
    }, [navigate, session?.accessToken]);

    return (
        <Stack gap="lg">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Warehouse</div>
                </div>
                <Button
                    accent="#a855f7"
                    variant="outline"
                    disabled={status === "loading"}
                    onClick={() => fetchItems()}
                >
                    Refresh
                </Button>
            </div>

            <Table
                columns={columns}
                rows={items}
                rowKey={(row) => row.id}
                noDataMessage={noDataMessage}
            />
        </Stack>
    );
}
