import { useMemo } from "react";

import { Card } from "../ui/Card";
import { MetricTile } from "../ui/MetricTile";
import { JsonPanel } from "../actor-entity-kit/JsonPanel";
import type { ActorRecord, EntityRecord } from "../../schemas/actor-entity";
import { asRecord, formatCurrency, formatDate, formatPayload, parseNumber } from "./actor-entity-utils";

const BANK_ACTOR_TYPE = "bank-account";
const FREIGHT_ACTOR_TYPE = "freight";
const WAREHOUSE_ACTOR_TYPE = "warehouse";

type ActorTypeDetailsProps = {
    actor: ActorRecord;
    entities: EntityRecord[];
};

const toText = (value: unknown, fallback: string) => {
    if (value === null || value === undefined) return fallback;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }
    const formatted = formatPayload(value);
    return formatted === "-" ? fallback : formatted;
};

export function ActorTypeDetails({ actor, entities }: ActorTypeDetailsProps) {
    const typeSpecific = useMemo(() => {
        switch (actor.type) {
            case BANK_ACTOR_TYPE:
                return <BankActorDetails entities={entities} />;
            case FREIGHT_ACTOR_TYPE:
                return <FreightActorDetails entities={entities} />;
            case WAREHOUSE_ACTOR_TYPE:
                return <WarehouseActorDetails entities={entities} />;
            default:
                return null;
        }
    }, [actor.type, entities]);

    return (
        <div className="space-y-4">
            <ActorOverviewCard actor={actor} entityCount={entities.length} />
            {typeSpecific ?? (actor.metadata ? (
                <JsonPanel
                    title="Actor metadata"
                    subtitle="Custom payload"
                    payload={actor.metadata}
                    emptyMessage="No metadata captured."
                />
            ) : null)}
        </div>
    );
}

function ActorOverviewCard({ actor, entityCount }: { actor: ActorRecord; entityCount: number }) {
    return (
        <Card
            title="Actor overview"
            eyebrow={actor.type}
            subtitle={`Entities: ${entityCount}`}
            className="space-y-3"
        >
            <div className="grid gap-3 md:grid-cols-3">
                <div>
                    <div className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Label</div>
                    <div className="text-base font-semibold text-white">{actor.label}</div>
                </div>
                <div>
                    <div className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Owner</div>
                    <div className="text-sm text-white">{actor.userId ?? "system"}</div>
                </div>
                <div>
                    <div className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Updated</div>
                    <div className="text-sm text-white">{formatDate(actor.updatedAt)}</div>
                    <div className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Created</div>
                    <div className="text-sm text-white">{formatDate(actor.createdAt)}</div>
                </div>
            </div>
            {actor.note ? (
                <div className="text-xs text-slate-300">
                    <span className="font-semibold text-white">Note:</span> {actor.note}
                </div>
            ) : null}
        </Card>
    );
}

function BankActorDetails({ entities }: { entities: EntityRecord[] }) {
    const summary = useMemo(() => {
        if (!entities.length) {
            return null;
        }
        const sorted = [...entities].sort(
            (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
        let creditTotal = 0;
        let debitTotal = 0;
        let latestBalance: number | null = null;
        let latestTimestamp = 0;
        sorted.forEach((entry) => {
            const metadata = asRecord(entry.metadata);
            const amount = parseNumber(metadata.amount);
            if (amount !== null) {
                if (entry.direction === "credit") {
                    creditTotal += amount;
                }
                if (entry.direction === "debit") {
                    debitTotal += amount;
                }
            }
            const balanceValue = parseNumber(metadata.balanceAfter);
            const entryTimestamp = Date.parse(entry.updatedAt);
            if (!Number.isNaN(entryTimestamp) && entryTimestamp > latestTimestamp) {
                latestTimestamp = entryTimestamp;
                if (balanceValue !== null) {
                    latestBalance = balanceValue;
                }
            }
        });
        return {
            creditTotal,
            debitTotal,
            latestBalance,
            lastUpdated: sorted[0] ? formatDate(sorted[0].updatedAt) : "-",
            recent: sorted.slice(0, 3),
        };
    }, [entities]);

    if (!summary) return null;

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
                <MetricTile
                    label="Balance"
                    value={formatCurrency(summary.latestBalance)}
                    hint={`Updated ${summary.lastUpdated}`}
                    accent="#34d399"
                />
                <MetricTile label="Credits" value={formatCurrency(summary.creditTotal)} accent="#22d3ee" />
                <MetricTile label="Debits" value={formatCurrency(summary.debitTotal)} accent="#f87171" />
            </div>
            <Card title="Recent transactions">
                <div className="space-y-3 text-sm text-slate-100">
                    {summary.recent.map((entry) => {
                        const metadata = asRecord(entry.metadata);
                        const amount = parseNumber(metadata.amount);
                        return (
                            <div key={entry.id} className="rounded-xl border border-white/10 bg-slate-900/60 p-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                                            {entry.direction ?? "direction"}
                                        </p>
                                        <p className="text-lg font-semibold text-white">{formatCurrency(amount)}</p>
                                    </div>
                                    <span className="text-xs text-slate-400">{formatDate(entry.updatedAt)}</span>
                                </div>
                                <p className="mt-2 text-xs text-slate-300">
                                    {toText(metadata.note ?? metadata.kind, "No note")}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}

function FreightActorDetails({ entities }: { entities: EntityRecord[] }) {
    const summary = useMemo(() => {
        if (!entities.length) {
            return null;
        }
        const sorted = [...entities].sort(
            (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
        const statusMap = new Map<string, number>();
        let totalCost = 0;
        let totalDistance = 0;
        let distanceCount = 0;
        sorted.forEach((entry) => {
            const metadata = asRecord(entry.metadata);
            const status = (metadata.status as string) ?? "unknown";
            statusMap.set(status, (statusMap.get(status) ?? 0) + 1);
            const cost = parseNumber(metadata.cost);
            if (cost !== null) {
                totalCost += cost;
            }
            const distance = parseNumber(metadata.distanceKm);
            if (distance !== null) {
                totalDistance += distance;
                distanceCount += 1;
            }
        });
        const avgDistance = distanceCount ? totalDistance / distanceCount : null;
        return {
            statusMap,
            totalCost,
            avgDistance,
            featured: sorted.slice(0, 3),
        };
    }, [entities]);

    if (!summary) return null;

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
                <MetricTile label="Loads" value={entities.length} accent="#38bdf8" />
                <MetricTile label="Total cost" value={formatCurrency(summary.totalCost)} accent="#818cf8" />
                <MetricTile
                    label="Avg distance"
                    value={summary.avgDistance ? `${summary.avgDistance.toFixed(1)} km` : "-"}
                    accent="#34d399"
                />
            </div>
            <Card title="Load status">
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {Array.from(summary.statusMap.entries()).map(([status, count]) => (
                        <div
                            key={status}
                            className="rounded-xl border border-white/10 bg-slate-900/60 p-3 text-sm"
                        >
                            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">{status}</p>
                            <p className="text-2xl font-semibold text-white">{count}</p>
                        </div>
                    ))}
                    {!summary.statusMap.size ? (
                        <div className="text-xs text-slate-400">No freight loads recorded.</div>
                    ) : null}
                </div>
            </Card>
            {summary.featured.length ? (
                <Card title="Recent routes">
                    <div className="space-y-3 text-sm text-white">
                        {summary.featured.map((entry) => {
                            const metadata = asRecord(entry.metadata);
                            const distance = parseNumber(metadata.distanceKm);
                            const cost = parseNumber(metadata.cost);
                            return (
                                <div
                                    key={entry.id}
                                    className="rounded-xl border border-white/10 bg-slate-900/60 p-3"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="text-base font-semibold text-white">
                                                {toText(metadata.title ?? entry.name, "Freight load")}
                                            </p>
                                            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                                                {toText(metadata.originName, "Origin")} → {toText(metadata.destinationName, "Destination")}
                                            </p>
                                        </div>
                                        <div className="text-sm text-white">{formatCurrency(cost)}</div>
                                    </div>
                                    <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-400">
                                        <span>{distance ? `${distance.toFixed(1)} km` : "Distance unknown"}</span>
                                        <span>Status: {toText(metadata.status, "unknown")}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
            ) : null}
        </div>
    );
}

type WarehouseLowStock = {
    id: string;
    sku: string;
    quantity: number;
    location: string;
};

function WarehouseActorDetails({ entities }: { entities: EntityRecord[] }) {
    const summary = useMemo(() => {
        if (!entities.length) {
            return null;
        }
        const statusMap = new Map<string, number>();
        const categoryMap = new Map<string, number>();
        let totalQuantity = 0;
        const lowStock: WarehouseLowStock[] = [];
        entities.forEach((entry) => {
            const metadata = asRecord(entry.metadata);
            const quantity = parseNumber(metadata.quantity) ?? 0;
            totalQuantity += quantity;
            const status = (metadata.status as string) ?? "unknown";
            statusMap.set(status, (statusMap.get(status) ?? 0) + 1);
            const category = (metadata.category as string) ?? "misc";
            categoryMap.set(category, (categoryMap.get(category) ?? 0) + 1);
            if (quantity > 0 && quantity < 5) {
                lowStock.push({
                    id: entry.id,
                    sku: (metadata.sku as string) ?? entry.name ?? "item",
                    quantity,
                    location: (metadata.location as string) ?? "storage",
                });
            }
        });
        return {
            totalQuantity,
            statusMap,
            categoryMap,
            lowStock: lowStock.slice(0, 4),
        };
    }, [entities]);

    if (!summary) return null;

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
                <MetricTile label="Inventory" value={summary.totalQuantity.toLocaleString()} accent="#c084fc" />
                <MetricTile label="Categories" value={`${summary.categoryMap.size}`} accent="#38bdf8" />
                <MetricTile label="Tracked records" value={entities.length} accent="#fcd34d" />
            </div>
            <Card title="Status breakdown">
                <div className="flex flex-wrap gap-3">
                    {Array.from(summary.statusMap.entries()).map(([status, count]) => (
                        <div
                            key={status}
                            className="flex flex-col gap-1 rounded-xl border border-white/10 bg-slate-900/60 p-3 text-sm"
                        >
                            <span className="text-[11px] uppercase tracking-[0.3em] text-slate-400">{status}</span>
                            <span className="text-2xl font-semibold text-white">{count}</span>
                        </div>
                    ))}
                    {!summary.statusMap.size ? (
                        <div className="text-xs text-slate-400">No stock activity recorded.</div>
                    ) : null}
                </div>
            </Card>
            {summary.lowStock.length ? (
                <Card title="Low stock">
                    <div className="space-y-3">
                        {summary.lowStock.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-xl border border-white/10 bg-slate-900/60 p-3 text-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-white">{item.sku}</span>
                                    <span className="text-xs text-slate-400">Qty {item.quantity}</span>
                                </div>
                                <div className="text-xs text-slate-400">Location: {item.location}</div>
                            </div>
                        ))}
                    </div>
                </Card>
            ) : null}
        </div>
    );
}
