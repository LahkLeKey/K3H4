import { useEffect } from "react";
import { z } from "zod";

import { Badge, Button, Card, StatChip, Table } from "../ui";
import { useAuthStore } from "../../zustand-stores/auth";
import { useCulinaryState } from "../../react-hooks/culinary";
import { apiFetch } from "../../react-hooks/lib/api-client";
import { useStorefrontsStore } from "../../zustand-stores/storefronts";

export function CulinaryBoard() {
    const { session } = useAuthStore();
    const { overview, status, error, fetchOverview } = useCulinaryState();
    const { culinaryName, culinaryPrepMinutes, culinaryStatus, updateField } = useStorefrontsStore();

    useEffect(() => {
        if (session?.accessToken && status === "idle") fetchOverview();
    }, [session?.accessToken, status, fetchOverview]);

    const loading = status === "loading";

    const handleCreateMenu = async () => {
        if (!session?.accessToken) return;
        updateField("culinaryStatus", "Creating menu item...");
        try {
            await apiFetch("/culinary/menu-items", {
                method: "POST",
                token: session.accessToken,
                baseUrl: useAuthStore.getState().apiBase,
                schema: z.any(),
                body: {
                    name: culinaryName || "Menu Item",
                    prepMinutes: Number(culinaryPrepMinutes) || 10,
                    cost: "7.50",
                    price: "16.00",
                },
            });
            updateField("culinaryStatus", "Menu item created");
            fetchOverview();
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Failed";
            updateField("culinaryStatus", msg);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <Badge accent="#fb7185">Culinary</Badge>
                {loading ? <span className="text-xs text-slate-400">Loading…</span> : null}
                {error ? <span className="text-xs text-amber-300">{error}</span> : null}
                <div className="ml-auto flex items-center gap-2">
                    <Button accent="#fb7185" disabled={loading} onClick={() => fetchOverview()}>
                        Refresh
                    </Button>
                </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
                <StatChip label="Menu items" value={overview ? overview.menuItems.length.toString() : "-"} accent="#fb7185" />
                <StatChip label="Prep tasks" value={overview ? overview.prepTasks.length.toString() : "-"} accent="#f59e0b" />
                <StatChip label="Supplier needs" value={overview ? overview.supplierNeeds.length.toString() : "-"} accent="#22d3ee" />
            </div>

            <Card eyebrow="Menu" title="Items" actions={<Badge accent="#fb7185">Live</Badge>}>
                {overview ? (
                    <Table
                        columns={[
                            { key: "name", label: "Name" },
                            { key: "prepMinutes", label: "Prep (min)" },
                            { key: "cost", label: "Cost", render: (row) => `₭${row.cost}` },
                            { key: "price", label: "Price", render: (row) => `₭${row.price}` },
                        ]}
                        rows={overview.menuItems}
                        rowKey={(row) => row.id}
                    />
                ) : null}
            </Card>

            <Card eyebrow="Create" title="Add menu item" actions={<Badge accent="#fb7185">POST /culinary/menu-items</Badge>}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                    <input
                        className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                        value={culinaryName}
                        onChange={(e) => updateField("culinaryName", e.target.value)}
                        placeholder="Name"
                    />
                    <input
                        className="w-32 rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                        value={culinaryPrepMinutes}
                        onChange={(e) => updateField("culinaryPrepMinutes", e.target.value)}
                        placeholder="Prep (min)"
                    />
                    <Button accent="#fb7185" onClick={handleCreateMenu} disabled={!session?.accessToken || loading}>
                        Create
                    </Button>
                </div>
                <div className="text-xs text-slate-300">{culinaryStatus || (!session ? "Sign in to create items." : "Creates menu items.")}</div>
            </Card>

            <Card eyebrow="Prep" title="Tasks" actions={<Badge accent="#f59e0b">Stations</Badge>}>
                {overview ? (
                    <Table
                        columns={[
                            { key: "task", label: "Task" },
                            { key: "station", label: "Station" },
                            { key: "status", label: "Status" },
                            { key: "dueAt", label: "Due", render: (row) => (row.dueAt ? new Date(row.dueAt).toLocaleString() : "-") },
                        ]}
                        rows={overview.prepTasks}
                        rowKey={(row) => row.id}
                    />
                ) : null}
            </Card>
        </div>
    );
}
