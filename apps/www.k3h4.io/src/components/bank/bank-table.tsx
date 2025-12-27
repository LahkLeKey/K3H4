import { useMemo } from "react";

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
    const {
        balance,
        loading,
        updating,
        message,
        error,
        transactions,
        transactionsLoading,
        refreshBalance,
        refreshTransactions,
        applyDelta,
        setAbsolute,
        amountInput,
        setAmountInput,
        note,
        setNote,
    } = useK3h4Bank(apiBase);

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
                        {transactions.slice(0, 15).map((txn) => {
                            const delta = Number.parseFloat(String(txn.delta ?? 0));
                            const balanceValue = Number.parseFloat(String(txn.balance ?? 0));
                            const deltaDisplay = Number.isFinite(delta) ? delta.toFixed(2) : "0.00";
                            const balanceDisplay = Number.isFinite(balanceValue) ? balanceValue.toFixed(2) : "0.00";

                            return (
                                <TableRow key={txn.id}>
                                    <TableCell className="text-xs text-muted-foreground">
                                        {txn.createdAt ? new Date(txn.createdAt).toLocaleString() : ""}
                                    </TableCell>
                                    <TableCell>{txn.note || ""}</TableCell>
                                    <TableCell className="text-right font-mono">{delta > 0 ? "+" : ""}{deltaDisplay}</TableCell>
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
            </CardContent>
        </Card>
    );
}
