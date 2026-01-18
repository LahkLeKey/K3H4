import { useMemo } from "react";

import { useFreightLoadsQuery } from "../../hooks/use-freight-queries";
import {
    useCreateWarehouseItemMutation,
    useUpdateWarehouseItemMutation,
    useWarehouseItemsQuery,
    type WarehouseItem,
} from "../../hooks/use-warehouse-queries";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useLocalStore } from "../../lib/store";

export type WarehouseDashboardProps = {
    apiBase: string;
    userEmail: string | null;
    onNavigateFreight: () => void;
};


export function WarehouseDashboard({ apiBase, userEmail, onNavigateFreight }: WarehouseDashboardProps) {
    const loadsQuery = useFreightLoadsQuery(apiBase);
    const itemsQuery = useWarehouseItemsQuery(apiBase);
    const createItem = useCreateWarehouseItemMutation(apiBase);
    const updateItem = useUpdateWarehouseItemMutation(apiBase);
    const uiStore = useLocalStore(() => ({
        draft: { sku: "", description: "", quantity: "1", location: "", freightLoadId: "" },
    }));

    const { draft } = uiStore.useShallow((state) => state);
    const setDraft = (updater: (prev: typeof draft) => typeof draft) => uiStore.setState((prev) => ({ draft: updater(prev.draft) }));

    const inboundLoads = useMemo(() => (loadsQuery.data ?? []).filter((l) => l.status !== "completed"), [loadsQuery.data]);
    const completedLoads = useMemo(() => (loadsQuery.data ?? []).filter((l) => l.status === "completed"), [loadsQuery.data]);
    const items = itemsQuery.data ?? [];

    const addItem = async () => {
        const qty = Number(draft.quantity);
        if (!draft.sku.trim() || !Number.isFinite(qty) || qty <= 0) return;
        await createItem.mutateAsync({
            sku: draft.sku.trim(),
            description: draft.description.trim() || undefined,
            quantity: qty,
            location: draft.location.trim() || "Staging",
            status: "stored",
            freightLoadId: draft.freightLoadId.trim() || undefined,
        });
        setDraft(prev => ({ ...prev, sku: "", description: "", quantity: "1", location: "", freightLoadId: "" }));
    };

    const toggleStatus = async (item: WarehouseItem) => {
        const nextStatus = item.status === "stored" ? "picked" : "stored";
        await updateItem.mutateAsync({ id: item.id, status: nextStatus });
    };

    return (
        <div className="space-y-6">
            <Card className="border bg-background/80">
                <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <CardTitle className="text-lg">Warehouse</CardTitle>
                        <p className="text-sm text-muted-foreground">Track inventory and coordinate with freight loads.</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm">
                        <Badge variant="secondary">User: {userEmail ?? "guest"}</Badge>
                        <Badge variant="outline">Inbound loads: {inboundLoads.length}</Badge>
                        <Badge variant="outline">Completed loads: {completedLoads.length}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-4">
                        <div className="space-y-1 sm:col-span-1">
                            <Label>SKU</Label>
                            <Input value={draft.sku} onChange={(e) => setDraft((prev) => ({ ...prev, sku: e.target.value }))} placeholder="SKU-1234" />
                        </div>
                        <div className="space-y-1 sm:col-span-2">
                            <Label>Description</Label>
                            <Input value={draft.description} onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))} placeholder="Describe the item" />
                        </div>
                        <div className="space-y-1 sm:col-span-1">
                            <Label>Quantity</Label>
                            <Input value={draft.quantity} inputMode="decimal" onChange={(e) => setDraft((prev) => ({ ...prev, quantity: e.target.value }))} />
                        </div>
                        <div className="space-y-1 sm:col-span-2">
                            <Label>Location</Label>
                            <Input value={draft.location} onChange={(e) => setDraft((prev) => ({ ...prev, location: e.target.value }))} placeholder="Aisle / Bay" />
                        </div>
                        <div className="space-y-1 sm:col-span-2">
                            <Label>Link to freight load (optional)</Label>
                            <Input
                                value={draft.freightLoadId}
                                onChange={(e) => setDraft((prev) => ({ ...prev, freightLoadId: e.target.value }))}
                                placeholder="Freight load ID"
                            />
                        </div>
                        <div className="flex items-end sm:col-span-2">
                            <Button className="w-full" onClick={addItem}>Add to inventory</Button>
                        </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
                        <Card className="border">
                            <CardHeader className="flex flex-row items-center justify-between gap-2">
                                <CardTitle className="text-base">Inventory</CardTitle>
                                <Badge variant="outline">{items.length} items</Badge>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>SKU</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Location</TableHead>
                                            <TableHead className="text-right">Qty</TableHead>
                                            <TableHead className="text-right">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {items.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                                                <TableCell>{item.description}</TableCell>
                                                <TableCell>{item.location}</TableCell>
                                                <TableCell className="text-right font-mono">{item.quantity}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Badge variant={item.status === "stored" ? "secondary" : "outline"}>{item.status}</Badge>
                                                        <Button size="sm" variant="ghost" onClick={() => toggleStatus(item)} disabled={updateItem.isPending}>
                                                            {item.status === "stored" ? "Pick" : "Restock"}
                                                        </Button>
                                                        {item.freightLoadId ? (
                                                            <Badge variant="outline" className="font-mono">{item.freightLoadId.slice(0, 8)}…</Badge>
                                                        ) : null}
                                                        <Button size="sm" variant="secondary" onClick={onNavigateFreight}>
                                                            Freight
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {items.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-sm text-muted-foreground">
                                                    Nothing in inventory yet. Add an item above.
                                                </TableCell>
                                            </TableRow>
                                        ) : null}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        <div className="space-y-3">
                            <Card className="border">
                                <CardHeader className="flex flex-row items-center justify-between gap-2">
                                    <CardTitle className="text-base">Inbound loads</CardTitle>
                                    <Badge variant="outline">{inboundLoads.length}</Badge>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {inboundLoads.map((load) => (
                                        <div key={load.id} className="rounded-lg border bg-muted/30 p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="font-semibold">{load.title}</div>
                                                <Badge variant={load.status === "completed" ? "secondary" : "outline"}>{load.status}</Badge>
                                            </div>
                                            <div className="text-sm text-muted-foreground">{load.originName} → {load.destinationName}</div>
                                            <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                                                <span>{Number(load.distanceKm).toFixed(2)} km</span>
                                                <span>•</span>
                                                <span>{load.durationMinutes} min</span>
                                                <span>•</span>
                                                <span>{Number(load.cost).toFixed(2)} k3h4c</span>
                                            </div>
                                            <div className="mt-2 flex gap-2">
                                                <Button size="sm" variant="secondary" onClick={onNavigateFreight}>Open in freight</Button>
                                            </div>
                                        </div>
                                    ))}
                                    {inboundLoads.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">No active loads. Use Freight to schedule inbound shipments.</p>
                                    ) : null}
                                </CardContent>
                            </Card>
                            <Card className="border">
                                <CardHeader className="flex flex-row items-center justify-between gap-2">
                                    <CardTitle className="text-base">Completed loads</CardTitle>
                                    <Badge variant="outline">{completedLoads.length}</Badge>
                                </CardHeader>
                                <CardContent className="space-y-3 text-sm text-muted-foreground">
                                    {completedLoads.length === 0 ? "No completed loads yet." : completedLoads.map((load) => (
                                        <div key={load.id} className="rounded-lg border bg-muted/30 p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="font-semibold text-foreground">{load.title}</div>
                                                <Badge variant="secondary">completed</Badge>
                                            </div>
                                            <div>{load.originName} → {load.destinationName}</div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
