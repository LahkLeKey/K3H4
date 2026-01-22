import { useEffect, useMemo, useState } from "react";

import {
    Button,
    Grid,
    Input,
    MetricTile,
    Pill,
    SectionHeader,
    Stack,
    Table,
} from "@/components/ui";
import { useBankState } from "@/react-hooks/bank";
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
        <Stack className="mx-auto w-full max-w-6xl px-6 py-10" gap="lg">
            <SectionHeader
                kicker="Bank"
                title="Banking and balances"
                description="Live view of the K3H4 coin ledger plus the HTTP endpoints you can call to read or post balance updates."
                status={statusMessage}
                actions={(
                    <Stack direction="row" gap="sm" align="center">
                        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
                            {refreshing ? "Refreshing..." : "Refresh data"}
                        </Button>
                        <Pill tone="slate">Auth required: Bearer token</Pill>
                    </Stack>
                )}
            />

            <Grid gap="md" smCols={2} lgCols={4}>
                <MetricTile label="Current balance" value={formatAmount(balance)} hint="GET /bank/balance" accent="#22d3ee" />
                <MetricTile label="Ledger entries" value={sortedTransactions.length ? `${sortedTransactions.length}` : "--"} hint="GET /bank/transactions" accent="#a78bfa" />
                <MetricTile label="Last activity" value={lastActivity ? formatDateTime(lastActivity) : "--"} hint="Most recent transaction" accent="#f59e0b" />
                <MetricTile label="Update balance" value="POST /bank/balance" hint="Authenticated write" accent="#34d399" />
            </Grid>

            <EndpointList endpoints={endpoints} eyebrow="HTTP" title="Endpoints" tag="Bank" />

            <TableCard
                title="Transaction ledger"
                subtitle="Server data from /bank/transactions"
                maxHeight={440}
                actions={(
                    <Stack direction="row" gap="sm" align="center">
                        <Input
                            type="number"
                            step="0.01"
                            min="0"
                            className="h-8 w-24"
                            value={adjustAmount}
                            onChange={(e) => setAdjustAmount(Number(e.target.value))}
                            aria-label="Adjustment amount"
                        />
                        <Input
                            type="text"
                            className="h-8 w-40"
                            value={adjustReason}
                            onChange={(e) => setAdjustReason(e.target.value)}
                            placeholder="Optional note"
                            aria-label="Adjustment reason"
                        />
                        <Button variant="outline" size="sm" onClick={() => handleAdjust("credit")} disabled={refreshing}>
                            Add
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleAdjust("debit")} disabled={refreshing}>
                            Remove
                        </Button>
                        {error ? <div className="text-[11px] text-rose-300">{error}</div> : null}
                    </Stack>
                )}
            >
                {sortedTransactions.length === 0 ? (
                    <div className="px-3 py-4 text-center text-slate-400">
                        {refreshing || status === "loading" ? "Loading transactions..." : "No transactions returned."}
                    </div>
                ) : (
                    <Table
                        className="text-sm"
                        columns={[
                            {
                                key: "createdAt",
                                label: "Time",
                                render: (tx) => <span className="font-mono text-[11px] text-slate-200">{formatDateTime(tx.createdAt)}</span>,
                            },
                            { key: "kind", label: "Kind" },
                            {
                                key: "direction",
                                label: "Direction",
                                render: (tx) => {
                                    const isCredit = tx.direction.toLowerCase() === "credit";
                                    return <Pill tone={isCredit ? "emerald" : "rose"}>{tx.direction}</Pill>;
                                },
                            },
                            {
                                key: "amount",
                                label: "Amount",
                                render: (tx) => <span className="font-semibold text-white">{formatAmount(tx.amount)}</span>,
                            },
                            {
                                key: "balanceAfter",
                                label: "Balance after",
                                render: (tx) => <span className="font-mono text-[12px] text-emerald-100">{formatAmount(tx.balanceAfter)}</span>,
                            },
                            {
                                key: "note",
                                label: "Note",
                                render: (tx) => <span className="text-[11px] text-slate-300">{tx.note || "--"}</span>,
                            },
                        ]}
                        rows={sortedTransactions}
                        rowKey={(tx) => tx.id}
                    />
                )}
            </TableCard>
        </Stack>
    );
}
