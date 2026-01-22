import { useEffect } from "react";

import { Badge, Button, Card, StatChip, Table } from "../components/ui";
import { useAuthStore } from "../zustand-stores/auth";
import { useBankState } from "../react-hooks/bank";

export function BankBoard() {
    const { session } = useAuthStore();
    const { balance, transactions, status, error, fetchBalance, fetchTransactions } = useBankState();

    useEffect(() => {
        if (session?.accessToken && status === "idle") {
            fetchBalance();
            fetchTransactions();
        }
    }, [session?.accessToken, status, fetchBalance, fetchTransactions]);

    const loading = status === "loading";

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <Badge accent="#6cf1d0">Bank</Badge>
                {loading ? <span className="text-xs text-slate-400">Loading…</span> : null}
                {error ? <span className="text-xs text-amber-300">{error}</span> : null}
                <div className="ml-auto flex items-center gap-2">
                    <Button accent="#6cf1d0" disabled={loading} onClick={() => fetchBalance()}>
                        Refresh balance
                    </Button>
                    <Button accent="#22d3ee" disabled={loading} onClick={() => fetchTransactions()}>
                        Refresh transactions
                    </Button>
                </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
                <StatChip label="Balance" value={balance ? `₭${balance}` : "-"} accent="#6cf1d0" />
                <StatChip label="Transactions" value={transactions.length.toString()} accent="#a78bfa" />
                <StatChip label="Credits" value={transactions.filter((t) => t.direction === "credit").length.toString()} accent="#22c55e" />
            </div>

            <Card eyebrow="Ledger" title="Recent transactions" actions={<Badge accent="#6cf1d0">Live</Badge>}>
                {transactions.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">{session ? "No transactions yet." : "Sign in to load ledger."}</div>
                ) : (
                    <Table
                        columns={[
                            { key: "kind", label: "Kind" },
                            { key: "direction", label: "Dir" },
                            { key: "amount", label: "Amount", render: (row) => `₭${row.amount}` },
                            { key: "note", label: "Note" },
                            { key: "createdAt", label: "When", render: (row) => new Date(row.createdAt).toLocaleString() },
                        ]}
                        rows={transactions.slice(0, 8)}
                        rowKey={(row) => row.id}
                    />
                )}
            </Card>
        </div>
    );
}
