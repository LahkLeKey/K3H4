import { useEffect, useMemo, useState } from "react";

import { MetricTile, Pill, SectionHeader } from "../radix-primitives";
import { useBankState } from "../react-hooks/bank";
import { EndpointList } from "./EndpointList";
import { TableCard } from "./TableCard";

const endpoints = [
    {
        method: "GET",
        path: "/bank/balance",
        description: "Return the current K3H4 coin balance for the authenticated session.",
    },
    {
        method: "POST",
        path: "/bank/balance",
        description: "Adjust balance by posting a transaction payload (authenticated, validated).",
    },
    {
        method: "GET",
        path: "/bank/transactions",
        description: "List the most recent ledger entries with running balances included.",
    },
];

const formatAmount = (value: string | null) => {
    if (!value) return "--";
    const num = Number(value);
    if (Number.isNaN(num)) return value;
    const fixed = num.toFixed(2);
    return `₭${fixed}`;
};

const formatDateTime = (iso: string) => {
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? iso : date.toLocaleString();
};

export function BankDashboard() {
    const { balance, transactions, status, error, fetchBalance, fetchTransactions, updateBalance } = useBankState();
    const [refreshing, setRefreshing] = useState(false);
    const [adjustAmount, setAdjustAmount] = useState(10);
    const [adjustReason, setAdjustReason] = useState("UI adjustment");

    useEffect(() => {
        setRefreshing(true);
        void Promise.allSettled([fetchBalance(), fetchTransactions()]).finally(() => setRefreshing(false));
    }, [fetchBalance, fetchTransactions]);

    const sortedTransactions = useMemo(
        () => [...transactions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
        [transactions],
    );

    const lastActivity = sortedTransactions[0]?.createdAt ?? null;
    const statusMessage = error ?? (refreshing ? "Refreshing..." : status === "loading" ? "Loading..." : "Live data ready");

    const handleRefresh = () => {
        setRefreshing(true);
        void Promise.allSettled([fetchBalance(), fetchTransactions()]).finally(() => setRefreshing(false));
    };

    const handleAdjust = (direction: "credit" | "debit") => {
        const magnitude = Math.abs(adjustAmount);
        if (!Number.isFinite(magnitude) || magnitude === 0) return;
        const delta = direction === "credit" ? magnitude : magnitude * -1;
        setRefreshing(true);
        void updateBalance(delta, adjustReason || undefined).finally(() => {
            void fetchTransactions();
            setRefreshing(false);
        });
    };

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
            <SectionHeader
                kicker="Bank"
                title="Banking and balances"
                description="Live view of the K3H4 coin ledger plus the HTTP endpoints you can call to read or post balance updates."
                status={statusMessage}
                actions={(
                    <>
                        <button
                            type="button"
                            className="rounded border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/10 disabled:opacity-60"
                            onClick={handleRefresh}
                            disabled={refreshing}
                        >
                            {refreshing ? "Refreshing..." : "Refresh data"}
                        </button>
                        <Pill tone="slate">Auth required: Bearer token</Pill>
                    </>
                )}
            />

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <MetricTile label="Current balance" value={formatAmount(balance)} hint="GET /bank/balance" accent="#22d3ee" />
                <MetricTile label="Ledger entries" value={sortedTransactions.length ? `${sortedTransactions.length}` : "--"} hint="GET /bank/transactions" accent="#a78bfa" />
                <MetricTile label="Last activity" value={lastActivity ? formatDateTime(lastActivity) : "--"} hint="Most recent transaction" accent="#f59e0b" />
                <MetricTile label="Update balance" value="POST /bank/balance" hint="Authenticated write" accent="#34d399" />
            </div>

            <EndpointList endpoints={endpoints} eyebrow="HTTP" title="Endpoints" tag="Bank" />

            <TableCard
                title="Transaction ledger"
                subtitle="Server data from /bank/transactions"
                maxHeight={440}
                actions={(
                    <>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            className="h-8 w-24 rounded border border-white/15 bg-white/5 px-2 text-xs text-white focus:border-white/30 focus:outline-none"
                            value={adjustAmount}
                            onChange={(e) => setAdjustAmount(Number(e.target.value))}
                            aria-label="Adjustment amount"
                        />
                        <input
                            type="text"
                            className="h-8 w-40 rounded border border-white/15 bg-white/5 px-2 text-xs text-white focus:border-white/30 focus:outline-none"
                            value={adjustReason}
                            onChange={(e) => setAdjustReason(e.target.value)}
                            placeholder="Optional note"
                            aria-label="Adjustment reason"
                        />
                        <button
                            type="button"
                            className="rounded border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-50 transition hover:border-emerald-300/60 hover:bg-emerald-500/25 disabled:opacity-60"
                            onClick={() => handleAdjust("credit")}
                            disabled={refreshing}
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            className="rounded border border-rose-400/40 bg-rose-500/15 px-3 py-1 text-xs font-semibold text-rose-50 transition hover:border-rose-300/60 hover:bg-rose-500/25 disabled:opacity-60"
                            onClick={() => handleAdjust("debit")}
                            disabled={refreshing}
                        >
                            Remove
                        </button>
                        {error ? <div className="text-[11px] text-rose-300">{error}</div> : null}
                    </>
                )}
            >
                <table className="min-w-full text-left text-xs text-slate-100">
                    <thead className="bg-white/5 text-[11px] uppercase tracking-[0.16em] text-slate-400">
                        <tr>
                            <th className="px-3 py-2">Time</th>
                            <th className="px-3 py-2">Kind</th>
                            <th className="px-3 py-2">Direction</th>
                            <th className="px-3 py-2">Amount</th>
                            <th className="px-3 py-2">Balance after</th>
                            <th className="px-3 py-2">Note</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {sortedTransactions.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-3 py-4 text-center text-slate-400">
                                    {refreshing || status === "loading" ? "Loading transactions..." : "No transactions returned."}
                                </td>
                            </tr>
                        ) : (
                            sortedTransactions.map((tx) => {
                                const isCredit = tx.direction.toLowerCase() === "credit";
                                return (
                                    <tr key={tx.id} className="transition hover:bg-white/5">
                                        <td className="px-3 py-2 font-mono text-[11px] text-slate-200">{formatDateTime(tx.createdAt)}</td>
                                        <td className="px-3 py-2 text-sm text-white">{tx.kind}</td>
                                        <td className="px-3 py-2 text-sm"><Pill tone={isCredit ? "emerald" : "rose"}>{tx.direction}</Pill></td>
                                        <td className="px-3 py-2 font-semibold text-white">{formatAmount(tx.amount)}</td>
                                        <td className="px-3 py-2 font-mono text-[12px] text-emerald-100">{formatAmount(tx.balanceAfter)}</td>
                                        <td className="px-3 py-2 text-[11px] text-slate-300">{tx.note || "--"}</td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </TableCard>
        </div>
    );
}
