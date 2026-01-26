import { useEffect } from "react";
import { z } from "zod";

import { Badge, Button, Card, StatChip, Table } from "../../ui";
import { useAuthStore } from "../../../zustand-stores/auth";
import { usePosState } from "../../../react-hooks/pos";
import { apiFetch } from "../../../react-hooks/lib/api-client";
import { useStorefrontsStore } from "../../../zustand-stores/storefronts";

const AnySchema = z.any();

const posFieldsByPrefix = {
    culinary: {
        store: "culinaryPosStore",
        channel: "culinaryPosChannel",
        amount: "culinaryPosAmount",
        status: "culinaryPosStatus",
    },
    arcade: {
        store: "arcadePosStore",
        channel: "arcadePosChannel",
        amount: "arcadePosAmount",
        status: "arcadePosStatus",
    },
} as const;

type PosEmbeddedPanelProps = {
    prefix: keyof typeof posFieldsByPrefix;
    title: string;
    accent: string;
};

export function PosEmbeddedPanel({ prefix, title, accent }: PosEmbeddedPanelProps) {
    const { session } = useAuthStore();
    const { overview, status, error, fetchOverview } = usePosState();
    const fields = posFieldsByPrefix[prefix];
    const { [fields.store]: storeName, [fields.channel]: channel, [fields.amount]: amount, [fields.status]: statusMsg, updateField } =
        useStorefrontsStore();

    useEffect(() => {
        if (session?.accessToken && status === "idle") {
            fetchOverview();
        }
    }, [session?.accessToken, status, fetchOverview]);

    const loading = status === "loading";

    const handleCreateTicket = async () => {
        if (!session?.accessToken) return;
        updateField(fields.status, "Creating ticket...");
        try {
            await apiFetch("/pos/tickets", {
                method: "POST",
                token: session!.accessToken,
                baseUrl: useAuthStore.getState().apiBase,
                schema: AnySchema,
                body: {
                    storeName: storeName || `${title} Store`,
                    channel: channel || "dine-in",
                    total: amount || "0",
                },
            });
            updateField(fields.status, "Ticket created");
            fetchOverview();
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Failed";
            updateField(fields.status, msg);
        }
    };

    return (
        <Card eyebrow="POS" title={title} actions={<Badge accent={accent}>Embedded</Badge>}>
            <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge accent={accent}>POS</Badge>
                    {loading ? <span className="text-xs text-slate-400">Loading…</span> : null}
                    {error ? <span className="text-xs text-amber-300">{error}</span> : null}
                    <div className="ml-auto flex items-center gap-2">
                        <Button accent={accent} disabled={loading} onClick={() => fetchOverview()}>
                            Refresh
                        </Button>
                    </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-3">
                    <StatChip label="Gross" value={overview ? `₭${overview.metrics.grossRevenue}` : "-"} accent={accent} />
                    <StatChip label="Tickets" value={overview ? overview.metrics.tickets.toString() : "-"} accent="#22d3ee" />
                    <StatChip label="Avg ticket" value={overview ? `₭${overview.metrics.avgTicket}` : "-"} accent="#a78bfa" />
                </div>

                <Card eyebrow="Create" title="Add ticket" actions={<Badge accent={accent}>POST /pos/tickets</Badge>}>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                        <input
                            className="w-full rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={storeName}
                            onChange={(e) => updateField(fields.store, e.target.value)}
                            placeholder="Store"
                        />
                        <input
                            className="w-32 rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={channel}
                            onChange={(e) => updateField(fields.channel, e.target.value)}
                            placeholder="Channel"
                        />
                        <input
                            className="w-32 rounded-lg border border-white/10 bg-slate-900/80 p-2 text-sm text-slate-100 focus:border-emerald-300/60 focus:outline-none"
                            value={amount}
                            onChange={(e) => updateField(fields.amount, e.target.value)}
                            placeholder="Amount"
                        />
                        <Button accent={accent} onClick={handleCreateTicket} disabled={!session?.accessToken || loading}>
                            Create ticket
                        </Button>
                    </div>
                    <div className="text-xs text-slate-300">{statusMsg || (!session ? "Sign in to create tickets." : "Adds POS tickets for this storefront.")}</div>
                </Card>

                <Card eyebrow="Orders" title="Channel mix" actions={<Badge accent={accent}>Live</Badge>}>
                    {overview ? (
                        <Table
                            columns={[
                                { key: "store", label: "Store" },
                                { key: "channel", label: "Channel" },
                                { key: "tickets", label: "Tickets" },
                                { key: "revenue", label: "Revenue", render: (row) => `₭${(row as { revenue: string }).revenue}` },
                            ]}
                            rows={overview.orders}
                            rowKey={(row, idx) => `${(row as { store: string; channel: string }).store}-${(row as { channel: string }).channel}-${idx}`}
                        />
                    ) : (
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">{session ? "No orders yet." : "Sign in to load POS."}</div>
                    )}
                </Card>
            </div>
        </Card>
    );
}
