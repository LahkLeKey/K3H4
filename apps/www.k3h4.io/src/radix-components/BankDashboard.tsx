import { useEffect, useMemo, useState } from "react";

import { useBankState } from "../react-hooks/bank";

type Endpoint = {
    method: "GET" | "POST";
    path: string;
    description: string;
};

const endpoints: Endpoint[] = [
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

const methodColors: Record<Endpoint["method"], string> = {
    GET: "border-emerald-400/40 bg-emerald-500/10 text-emerald-100",
    POST: "border-sky-400/40 bg-sky-500/10 text-sky-100",
};

function MethodBadge({ method }: { method: Endpoint["method"] }) {
    return <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${methodColors[method]}`}>{method}</span>;
}

function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg transition hover:border-white/20 hover:bg-white/10">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <MethodBadge method={endpoint.method} />
                    <span className="font-mono text-xs text-emerald-50/90">{endpoint.path}</span>
                </div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">Bank</span>
            </div>
            <p className="mt-2 text-sm text-slate-200">{endpoint.description}</p>
        </div>
    );
}

function StatTile({ label, value, hint }: { label: string; value: string; hint?: string }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{label}</div>
            <div className="text-xl font-semibold text-white">{value}</div>
            {hint ? <div className="text-[11px] text-slate-400">{hint}</div> : null}
        </div>
    );
}

function DirectionPill({ direction }: { direction: string }) {
    const isCredit = direction.toLowerCase() === "credit";
    const color = isCredit ? "bg-emerald-500/15 text-emerald-100 border-emerald-400/40" : "bg-rose-500/15 text-rose-100 border-rose-400/40";
    return <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${color}`}>{direction}</span>;
}

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
            <div className="rounded-2xl border border-white/10 bg-slate-900/85 p-6 shadow-2xl backdrop-blur">
                <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">Bank</p>
                <h1 className="mt-2 text-3xl font-semibold text-white">Banking and balances</h1>
                <p className="mt-2 text-sm text-slate-200">
                    Live view of the K3H4 coin ledger plus the HTTP endpoints you can call to read or post balance updates.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-slate-300">
                    <button
                        type="button"
                        className="rounded border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/10 disabled:opacity-60"
                        onClick={handleRefresh}
                        disabled={refreshing}
                    >
                        {refreshing ? "Refreshing..." : "Refresh data"}
                    </button>
                    <div className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-200">Auth required: Bearer token</div>
                    <div className="text-[11px] text-slate-300">{statusMessage}</div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <StatTile label="Current balance" value={formatAmount(balance)} hint="GET /bank/balance" />
                    <StatTile label="Ledger entries" value={sortedTransactions.length ? `${sortedTransactions.length}` : "--"} hint="GET /bank/transactions" />
                    <StatTile label="Last activity" value={lastActivity ? formatDateTime(lastActivity) : "--"} hint="Most recent transaction" />
                    <StatTile label="Update balance" value="POST /bank/balance" hint="Authenticated write" />
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                {endpoints.map((ep) => (
                    <EndpointCard key={ep.path + ep.method} endpoint={ep} />
                ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/85 p-4 shadow-2xl backdrop-blur">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <div className="text-sm font-semibold text-white">Transaction ledger</div>
                        <div className="text-xs text-slate-400">Server data from /bank/transactions</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
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
                    </div>
                </div>
                <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-slate-950/60">
                    <div className="max-h-[440px] overflow-auto">
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
                                    sortedTransactions.map((tx) => (
                                        <tr key={tx.id} className="transition hover:bg-white/5">
                                            <td className="px-3 py-2 font-mono text-[11px] text-slate-200">{formatDateTime(tx.createdAt)}</td>
                                            <td className="px-3 py-2 text-sm text-white">{tx.kind}</td>
                                            <td className="px-3 py-2 text-sm"><DirectionPill direction={tx.direction} /></td>
                                            <td className="px-3 py-2 font-semibold text-white">{formatAmount(tx.amount)}</td>
                                            <td className="px-3 py-2 font-mono text-[12px] text-emerald-100">{formatAmount(tx.balanceAfter)}</td>
                                            <td className="px-3 py-2 text-[11px] text-slate-300">{tx.note || "--"}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
