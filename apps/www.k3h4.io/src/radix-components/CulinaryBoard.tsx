import { useEffect } from "react";

import { Badge, Button, Card, StatChip, Table } from "../components/ui";
import { useAuthStore } from "../zustand-stores/auth";
import { useCulinaryState } from "../react-hooks/culinary";

export function CulinaryBoard() {
    const { session } = useAuthStore();
    const { overview, status, error, fetchOverview } = useCulinaryState();

    useEffect(() => {
        if (session?.accessToken && status === "idle") fetchOverview();
    }, [session?.accessToken, status, fetchOverview]);

    const loading = status === "loading";

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
