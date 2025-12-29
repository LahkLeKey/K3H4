import type { ReactNode } from "react";
import { useState } from "react";

import { Section } from "../section";
import { SectionCard } from "../shell/section-card";
import { useCreatePosStore, useCreatePosTicket, usePosOverviewQuery } from "../../hooks/use-pos-queries";

export type PosDashboardProps = {
    apiBase: string;
    userEmail: string | null;
};

type Metric = {
    label: string;
    value: string;
    delta?: string;
};

function Stat({ label, value, delta }: Metric) {
    return (
        <div className="flex flex-col gap-1 rounded-xl border bg-background/80 p-4 shadow-sm">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
            <span className="text-2xl font-semibold leading-tight">{value}</span>
            {delta ? <span className="text-xs text-emerald-600">{delta} vs prev day</span> : null}
        </div>
    );
}

export function PosDashboard({ apiBase, userEmail }: PosDashboardProps) {
    const overview = usePosOverviewQuery(apiBase);
    const createStore = useCreatePosStore(apiBase);
    const createTicket = useCreatePosTicket(apiBase);

    const [storeName, setStoreName] = useState("");
    const [storeChannel, setStoreChannel] = useState("In-store");
    const [ticketStoreName, setTicketStoreName] = useState("");
    const [ticketChannel, setTicketChannel] = useState("In-store");
    const [ticketTotal, setTicketTotal] = useState("75.00");
    const [itemName, setItemName] = useState("Item");
    const [itemPrice, setItemPrice] = useState("25.00");
    const [itemQty, setItemQty] = useState("3");
    const [errors, setErrors] = useState<string | null>(null);
    const headerActions: ReactNode = (
        <div className="text-xs text-muted-foreground">Demo data • Connected to {apiBase}</div>
    );

    const metrics: Metric[] = overview.data ? [
        { label: "Gross revenue", value: overview.data.metrics.grossRevenue },
        { label: "Tickets", value: String(overview.data.metrics.tickets) },
        { label: "Avg ticket", value: overview.data.metrics.avgTicket },
    ] : [];

    return (
        <div className="space-y-6">
            <Section
                eyebrow="Point of Sale"
                title="Omni-channel orders"
                description="Monitor revenue, channel mix, and top items."
                actions={headerActions}
            >
                {overview.isLoading ? <div className="text-sm text-muted-foreground">Loading POS overview…</div> : null}
                {overview.isError ? <div className="text-sm text-destructive">{(overview.error as Error).message}</div> : null}
                {overview.data ? (
                    <div className="grid gap-4 md:grid-cols-3">
                        {metrics.map((metric) => (
                            <Stat key={metric.label} {...metric} />
                        ))}
                    </div>
                ) : null}
            </Section>

            <div className="grid gap-4 lg:grid-cols-3">
                <SectionCard className="lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">Quick ticket</h3>
                        <span className="text-xs text-muted-foreground">Creates a closed ticket</span>
                    </div>
                    {errors ? <div className="mt-2 text-sm text-destructive">{errors}</div> : null}
                    <form
                        className="mt-4 grid gap-3 md:grid-cols-2"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setErrors(null);
                            const total = Number(ticketTotal);
                            const price = Number(itemPrice);
                            const quantity = Number(itemQty) || 1;
                            if (!ticketStoreName.trim()) {
                                setErrors("Store name is required");
                                return;
                            }
                            if (!total || Number.isNaN(total)) {
                                setErrors("Total must be a number");
                                return;
                            }
                            try {
                                await createTicket.mutateAsync({
                                    storeName: ticketStoreName.trim(),
                                    channel: ticketChannel,
                                    total,
                                    items: [
                                        {
                                            name: itemName || "Item",
                                            price,
                                            quantity,
                                        },
                                    ],
                                    status: "closed",
                                });
                                setTicketStoreName("");
                                setTicketTotal("75.00");
                                setItemName("Item");
                                setItemPrice("25.00");
                                setItemQty("3");
                            } catch (err) {
                                setErrors((err as Error).message);
                            }
                        }}
                    >
                        <div className="space-y-2">
                            <label className="flex flex-col text-sm font-medium">
                                Store name
                                <input
                                    className="mt-1 rounded-md border px-2 py-1 text-sm"
                                    value={ticketStoreName}
                                    onChange={(e) => setTicketStoreName(e.target.value)}
                                    placeholder="Main counter"
                                />
                            </label>
                        </div>
                        <div className="space-y-2">
                            <label className="flex flex-col text-sm font-medium">
                                Channel
                                <select
                                    className="mt-1 rounded-md border px-2 py-1 text-sm"
                                    value={ticketChannel}
                                    onChange={(e) => setTicketChannel(e.target.value)}
                                >
                                    <option>In-store</option>
                                    <option>Online</option>
                                    <option>Delivery</option>
                                </select>
                            </label>
                        </div>
                        <div className="space-y-2">
                            <label className="flex flex-col text-sm font-medium">
                                Total
                                <input
                                    className="mt-1 rounded-md border px-2 py-1 text-sm"
                                    value={ticketTotal}
                                    onChange={(e) => setTicketTotal(e.target.value)}
                                    type="number"
                                    step="0.01"
                                    min="0"
                                />
                            </label>
                        </div>
                        <div className="space-y-2">
                            <label className="flex flex-col text-sm font-medium">
                                Item name
                                <input
                                    className="mt-1 rounded-md border px-2 py-1 text-sm"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="space-y-2">
                            <label className="flex flex-col text-sm font-medium">
                                Item price
                                <input
                                    className="mt-1 rounded-md border px-2 py-1 text-sm"
                                    value={itemPrice}
                                    onChange={(e) => setItemPrice(e.target.value)}
                                    type="number"
                                    step="0.01"
                                    min="0"
                                />
                            </label>
                        </div>
                        <div className="space-y-2">
                            <label className="flex flex-col text-sm font-medium">
                                Qty
                                <input
                                    className="mt-1 rounded-md border px-2 py-1 text-sm"
                                    value={itemQty}
                                    onChange={(e) => setItemQty(e.target.value)}
                                    type="number"
                                    min="1"
                                />
                            </label>
                        </div>
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="w-full rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                                disabled={createTicket.isPending}
                            >
                                {createTicket.isPending ? "Creating…" : "Create ticket"}
                            </button>
                        </div>
                    </form>
                </SectionCard>

                <SectionCard>
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">Add store</h3>
                        <span className="text-xs text-muted-foreground">Tracks new channel</span>
                    </div>
                    <form
                        className="mt-4 space-y-3"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            setErrors(null);
                            if (!storeName.trim()) {
                                setErrors("Store name is required");
                                return;
                            }
                            try {
                                await createStore.mutateAsync({ name: storeName.trim(), channel: storeChannel });
                                setStoreName("");
                                setStoreChannel("In-store");
                            } catch (err) {
                                setErrors((err as Error).message);
                            }
                        }}
                    >
                        <label className="flex flex-col text-sm font-medium">
                            Store name
                            <input
                                className="mt-1 rounded-md border px-2 py-1 text-sm"
                                value={storeName}
                                onChange={(e) => setStoreName(e.target.value)}
                                placeholder="Pop-up cart"
                            />
                        </label>
                        <label className="flex flex-col text-sm font-medium">
                            Channel
                            <select
                                className="mt-1 rounded-md border px-2 py-1 text-sm"
                                value={storeChannel}
                                onChange={(e) => setStoreChannel(e.target.value)}
                            >
                                <option>In-store</option>
                                <option>Online</option>
                                <option>Delivery</option>
                            </select>
                        </label>
                        <button
                            type="submit"
                            className="w-full rounded-md bg-secondary px-3 py-2 text-sm font-semibold hover:opacity-90"
                            disabled={createStore.isPending}
                        >
                            {createStore.isPending ? "Adding…" : "Add store"}
                        </button>
                    </form>
                </SectionCard>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                <SectionCard className="lg:col-span-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">Orders by channel</h3>
                        <span className="text-xs text-muted-foreground">User: {userEmail ?? "guest"}</span>
                    </div>
                    <div className="mt-4 space-y-2">
                        {overview.data?.orders?.length ? overview.data.orders.map((order) => (
                            <div key={`${order.store}-${order.channel}`} className="flex items-center justify-between rounded-lg border bg-muted/40 px-3 py-2">
                                <div>
                                    <div className="text-sm font-semibold">{order.store}</div>
                                    <div className="text-xs text-muted-foreground">{order.channel}</div>
                                </div>
                                <div className="flex items-center gap-6 text-sm">
                                    <span className="text-muted-foreground">Tickets: {order.tickets}</span>
                                    <span className="font-semibold">{order.revenue}</span>
                                </div>
                            </div>
                        )) : <div className="text-sm text-muted-foreground">No orders yet.</div>}
                    </div>
                </SectionCard>

                <SectionCard>
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold">Top items</h3>
                        <span className="text-xs text-muted-foreground">Last 24h</span>
                    </div>
                    <div className="mt-4 space-y-2">
                        {overview.data?.topItems?.length ? overview.data.topItems.map((item) => (
                            <div key={item.name} className="flex items-center justify-between rounded-lg border bg-background/80 px-3 py-2">
                                <div>
                                    <div className="text-sm font-semibold">{item.name}</div>
                                    <div className="text-xs text-muted-foreground">Sold: {item.sold}</div>
                                </div>
                                <div className="text-sm font-semibold">{item.revenue}</div>
                            </div>
                        )) : <div className="text-sm text-muted-foreground">No item sales yet.</div>}
                    </div>
                </SectionCard>
            </div>
        </div>
    );
}
