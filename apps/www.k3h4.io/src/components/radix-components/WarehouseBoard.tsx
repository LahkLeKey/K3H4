import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import { Button, Stack, Table, type TableColumn } from "../ui";
import { Trash2 } from "lucide-react";
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
    const { items, status, error, fetchItems, deleteItem } = useWarehouseState();
    const navigate = useNavigate();
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const [rowFeedback, setRowFeedback] = useState<Record<string, ReactNode>>({});
    const [deletingId, setDeletingId] = useState<string | null>(null);

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

    const selectionLabel = useMemo(() => {
        if (selectedRowKeys.length === 0) return "";
        return `${selectedRowKeys.length} selected`;
    }, [selectedRowKeys.length]);

    useEffect(() => {
        if (selectedRowKeys.length === 0) return;
        setSelectedRowKeys((prev) => prev.filter((key) => items.some((item) => item.id === key)));
    }, [items, selectedRowKeys.length]);

    const handleDelete = useCallback(async (row: WarehouseItem) => {
        const confirmed = window.confirm(`Delete ${row.sku}?`);
        if (!confirmed) return;
        setDeletingId(row.id);
        try {
            await deleteItem(row.id);
            setSelectedRowKeys((prev) => prev.filter((key) => key !== row.id));
            setRowFeedback((prev) => {
                const next = { ...prev };
                delete next[row.id];
                return next;
            });
        } catch (err) {
            console.error(err);
            setRowFeedback((prev) => ({
                ...prev,
                [row.id]: err instanceof Error ? err.message : "Unable to delete item.",
            }));
        } finally {
            setDeletingId(null);
        }
    }, [deleteItem]);

    const handleBulkAction = useCallback((actionId: string) => {
        if (actionId === "clear") {
            setSelectedRowKeys([]);
            return;
        }
        const message = actionId === "plan"
            ? "Planning replenishment…"
            : "Filtering inventory…";
        setRowFeedback((prev) => {
            const next = { ...prev };
            selectedRowKeys.forEach((key) => {
                next[key] = message;
            });
            return next;
        });
    }, [selectedRowKeys]);

    return (
        <Stack gap="lg">
            <Table<WarehouseItem>
                title="Warehouse"
                bulkActions={
                    <div className="flex flex-wrap items-center gap-2">
                        {selectionLabel ? (
                            <div className="text-xs uppercase tracking-[0.3em] text-slate-400">{selectionLabel}</div>
                        ) : null}
                    </div>
                }
                bulkActionItems={[
                    { id: "plan", label: "Plan replenishment", disabled: !selectedRowKeys.length },
                    { id: "filter", label: "Filter" },
                    { id: "clear", label: "Clear selection", disabled: !selectedRowKeys.length },
                ]}
                onBulkAction={handleBulkAction}
                actions={
                    <Button
                        accent="#a855f7"
                        variant="outline"
                        disabled={status === "loading"}
                        onClick={() => fetchItems()}
                    >
                        Refresh
                    </Button>
                }
                columns={columns}
                rows={items}
                rowKey={(row) => row.id}
                noDataMessage={noDataMessage}
                selectable
                selectedRowKeys={selectedRowKeys}
                onSelectionChange={setSelectedRowKeys}
                rowFeedback={rowFeedback}
                rowActionItems={(row) => [{
                    id: "delete",
                    label: <Trash2 className="h-4 w-4" />,
                    disabled: deletingId === row.id,
                }]}
                onRowAction={(row, actionId) => {
                    if (actionId === "delete") {
                        handleDelete(row);
                    }
                }}
            />
        </Stack>
    );
}
