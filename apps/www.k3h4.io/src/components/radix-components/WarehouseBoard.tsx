import { useCallback, useEffect, useState, type ReactNode } from "react";

import { Button, Stack, Table, type TableColumn } from "../ui";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../zustand-stores/auth";
import { useWarehouseState, type WarehouseItem } from "../../zustand-stores/warehouse";

const columns: TableColumn<WarehouseItem>[] = [
    { key: "sku", label: "SKU" },
    { key: "userId", label: "Owner" },
    {
        key: "description",
        label: "Description",
        render: (row) => row.description || "—",
    },
    { key: "quantity", label: "Quantity" },
    { key: "location", label: "Location" },
    { key: "status", label: "Status" },
    { key: "freightLoadId", label: "Freight Load" },
    { key: "category", label: "Category" },
    {
        key: "metadata",
        label: "Metadata",
        render: (row) => {
            const slotSlug = row.metadata?.slot?.slug;
            const notes = row.metadata?.notes;
            if (notes || slotSlug) {
                return notes || slotSlug;
            }
            return row.metadata && Object.keys(row.metadata).length
                ? JSON.stringify(row.metadata)
                : "—";
        },
    },
    {
        key: "createdAt",
        label: "Created",
        render: (row) => (row.createdAt ? new Date(row.createdAt).toLocaleString() : "—"),
    },
    {
        key: "updatedAt",
        label: "Updated",
        render: (row) => (row.updatedAt ? new Date(row.updatedAt).toLocaleString() : "—"),
    },
];

export function WarehouseBoard() {
    const { session } = useAuthStore();
    const { items, status, error, fetchItems, deleteItem, createItem } = useWarehouseState();
    const navigate = useNavigate();
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const [rowFeedback, setRowFeedback] = useState<Record<string, ReactNode>>({});
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

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

    useEffect(() => {
        if (selectedRowKeys.length === 0) return;
        setSelectedRowKeys((prev) => prev.filter((key) => items.some((item) => item.id === key)));
    }, [items, selectedRowKeys.length]);

    const handleDelete = useCallback(async (row: WarehouseItem) => {
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

    const handleAddRow = useCallback(async () => {
        setIsAdding(true);
        try {
            const timestamp = Math.floor(Date.now() / 1000);
            const sku = `NEW-${timestamp}`;
            await createItem({ sku, location: "Manual addition", quantity: 1 });
        } catch (err) {
            console.error(err);
        } finally {
            setIsAdding(false);
        }
    }, [createItem]);

    return (
        <Stack gap="lg">
            <Table<WarehouseItem>
                title="Warehouse"
                actions={
                    <div className="flex flex-wrap items-center gap-2">
                        <Button
                            accent="#22d3ee"
                            variant="outline"
                            disabled={isAdding}
                            onClick={handleAddRow}
                        >
                            {isAdding ? "Adding…" : "Add row"}
                        </Button>
                        <Button
                            accent="#a855f7"
                            variant="outline"
                            disabled={status === "loading"}
                            onClick={() => fetchItems()}
                        >
                            Refresh
                        </Button>
                    </div>
                }
                columns={columns}
                rows={items}
                rowKey={(row) => row.id}
                idAccessor={(row) => row.id}
                noDataMessage={noDataMessage}
                selectable
                selectedRowKeys={selectedRowKeys}
                onSelectionChange={setSelectedRowKeys}
                rowFeedback={rowFeedback}
                rowActionItems={(row) => [{
                    id: "delete",
                    label: <Trash2 className="h-4 w-4" />,
                    disabled: deletingId === row.id,
                    confirmation: {
                        title: "Confirm delete",
                        description: (
                            <span>
                                Delete {row.sku}? This action cannot be undone.
                            </span>
                        ),
                        confirmLabel: "Delete",
                        loadingLabel: "Deleting…",
                        accent: "#ef4444",
                    },
                }]}
                onRowAction={(row) => handleDelete(row)}
            />
        </Stack>
    );
}
