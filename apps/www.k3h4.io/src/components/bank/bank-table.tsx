import { useEffect, useMemo, useState } from "react";

import { useK3h4Bank } from "../../hooks/use-k3h4-bank";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

export type BankTableProps = {
    apiBase: string;
    userEmail: string | null;
};

export function BankTable({ apiBase, userEmail }: BankTableProps) {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [direction, setDirection] = useState<"" | "credit" | "debit">('');

    const {
        balance,
        loading,
        updating,
        message,
        error,
        transactions,
        totalTransactions,
        transactionsLoading,
        refreshBalance,
        refreshTransactions,
        applyDelta,
        setAbsolute,
        amountInput,
        setAmountInput,
        note,
        setNote,
    } = useK3h4Bank(apiBase, { page, pageSize, from: fromDate || undefined, to: toDate || undefined, direction });

    useEffect(() => {
        const maxPage = Math.max(0, Math.ceil((totalTransactions || 0) / pageSize) - 1);
        if (page > maxPage) {
            setPage(maxPage);
        }
    }, [totalTransactions, page, pageSize]);

    const formattedBalance = useMemo(() => {
        if (balance === null) return loading ? "Loading..." : "--";
        const numeric = Number.parseFloat(balance);
        return Number.isFinite(numeric) ? `${numeric.toFixed(2)} k3h4-coin` : balance;
    }, [balance, loading]);

    const amountValue = useMemo(() => Number.parseFloat(amountInput), [amountInput]);
    const amountIsValid = Number.isFinite(amountValue);

    const handleDeposit = () => {
        if (!amountIsValid) return;
        applyDelta(Math.abs(amountValue), note || "deposit");
    };

    const handleWithdraw = () => {
        if (!amountIsValid) return;
        applyDelta(-Math.abs(amountValue), note || "withdrawal");
    };

    const handleSetExact = () => {
        if (!amountIsValid) return;
        setAbsolute(amountValue, note || "set exact");
    };

    const handleReset = () => setAbsolute(0, "reset");

    return (
        <Card className="border bg-background/80">
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-lg">K3H4 Bank</CardTitle>
                    <p className="text-sm text-muted-foreground">Sandbox balance for {userEmail || "guest"}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                    <Badge variant="secondary">Balance: {formattedBalance}</Badge>
                    <Button variant="outline" size="sm" onClick={refreshBalance} disabled={loading}>
                        Refresh balance
                    </Button>
                    <Button variant="outline" size="sm" onClick={refreshTransactions} disabled={transactionsLoading}>
                        Refresh activity
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="grid gap-2 sm:grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
                    <div className="space-y-1 text-sm">
                        <label className="text-muted-foreground">From</label>
                        <Input type="date" value={fromDate} onChange={(e) => { setPage(0); setFromDate(e.target.value); }} />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label className="text-muted-foreground">To</label>
                        <Input type="date" value={toDate} onChange={(e) => { setPage(0); setToDate(e.target.value); }} />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label className="text-muted-foreground">Direction</label>
                        <select
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            value={direction}
                            onChange={(e) => { setPage(0); setDirection(e.target.value as "" | "credit" | "debit"); }}
                        >
                            <option value="">All</option>
                            <option value="credit">Credit</option>
                            <option value="debit">Debit</option>
                        </select>
                    </div>
                    <div className="space-y-1 text-sm">
                        <label className="text-muted-foreground">Page size</label>
                        <select
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            value={pageSize}
                            onChange={(e) => { setPage(0); setPageSize(Number(e.target.value) || 10); }}
                        >
                            {[10, 20, 50].map((size) => (
                                <option key={size} value={size}>{size} rows</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-[1fr,1fr,auto,auto,auto]">
                    <Input
                        value={amountInput}
                        onChange={(e) => setAmountInput(e.target.value)}
                        placeholder="Amount"
                        inputMode="decimal"
                    />
                    <Input
                        value={note ?? ""}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Note"
                    />
                    <Button variant="default" onClick={handleDeposit} disabled={!amountIsValid || updating}>
                        Deposit
                    </Button>
                    <Button variant="outline" onClick={handleWithdraw} disabled={!amountIsValid || updating}>
                        Withdraw
                    </Button>
                    <Button variant="ghost" onClick={handleSetExact} disabled={!amountIsValid || updating}>
                        Set exact
                    </Button>
                    <Button variant="secondary" onClick={handleReset} disabled={updating} className="sm:col-span-2">
                        Reset to 0
                    </Button>
                </div>

                {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
                {error ? <p className="text-sm text-destructive">{error}</p> : null}

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>When</TableHead>
                            <TableHead>Note</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">Balance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((txn) => {
                            const amountValue = Number.parseFloat(String(txn.amount ?? 0));
                            const signedAmount = txn.direction === "debit" ? -Math.abs(amountValue) : Math.abs(amountValue);
                            const balanceValue = Number.parseFloat(String(txn.balanceAfter ?? 0));
                            const deltaDisplay = Number.isFinite(signedAmount) ? signedAmount.toFixed(2) : "0.00";
                            const balanceDisplay = Number.isFinite(balanceValue) ? balanceValue.toFixed(2) : "0.00";

                            return (
                                <TableRow key={txn.id}>
                                    <TableCell className="text-xs text-muted-foreground">
                                        {txn.createdAt ? new Date(txn.createdAt).toLocaleString() : ""}
                                    </TableCell>
                                    <TableCell>{txn.note || ""}</TableCell>
                                    <TableCell className="text-right font-mono">{signedAmount > 0 ? "+" : ""}{deltaDisplay}</TableCell>
                                    <TableCell className="text-right font-mono">{balanceDisplay}</TableCell>
                                </TableRow>
                            );
                        })}
                        {transactions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-sm text-muted-foreground">
                                    {transactionsLoading ? "Loading activity..." : "No transactions yet."}
                                </TableCell>
                            </TableRow>
                        ) : null}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
                    <span>
                        Showing {totalTransactions === 0 ? 0 : Math.min(totalTransactions, page * pageSize + 1)}-
                        {Math.min(totalTransactions, (page + 1) * pageSize)} of {totalTransactions}
                    </span>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((p) => Math.max(0, p - 1))}
                            disabled={page === 0}
                        >
                            Prev
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((p) => (p + 1) * pageSize < totalTransactions ? p + 1 : p)}
                            disabled={(page + 1) * pageSize >= totalTransactions}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
