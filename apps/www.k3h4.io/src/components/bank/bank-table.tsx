import { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Grid, Html, MapControls, PerformanceMonitor, Sparkles } from "@react-three/drei";

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
import { useBankStore } from "./bank-store";
import { CoinStacksLayer } from "./coin-stacks-layer";
import { LedgerStand } from "./ledger-stand";
import { TablesLayer } from "./tables-layer";
import { VaultShell } from "./vault-shell";
import { COIN_HEIGHT, VAULT_TABLES } from "./bank-constants";
import type { CoinStack } from "./bank-types";

export type BankTableProps = {
    apiBase: string;
    userEmail: string | null;
};

export function BankTable({ apiBase, userEmail }: BankTableProps) {
    const {
        page,
        pageSize,
        fromDate,
        toDate,
        direction,
        ledgerPage,
        setPage,
        setPageValue,
        setPageSize,
        setFromDate,
        setToDate,
        setDirection,
        setLedgerPage,
        setCoinStacks,
        setLedgerData,
        perfLimited,
        setPerfLimited,
        hoveredId,
        setHovered,
    } = useBankStore((state) => ({
        page: state.page,
        pageSize: state.pageSize,
        fromDate: state.fromDate,
        toDate: state.toDate,
        direction: state.direction,
        ledgerPage: state.ledgerPage,
        setPage: state.setPage,
        setPageValue: state.setPageValue,
        setPageSize: state.setPageSize,
        setFromDate: state.setFromDate,
        setToDate: state.setToDate,
        setDirection: state.setDirection,
        setLedgerPage: state.setLedgerPage,
        setCoinStacks: state.setCoinStacks,
        setLedgerData: state.setLedgerData,
        perfLimited: state.perfLimited,
        setPerfLimited: state.setPerfLimited,
        hoveredId: state.hoveredId,
        setHovered: state.setHovered,
    }));

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
            setPageValue(maxPage);
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

    const maxAbsAmount = useMemo(() => {
        if (!transactions || transactions.length === 0) return 0;
        return Math.max(...transactions.map((txn) => Math.abs(Number.parseFloat(String(txn.amount ?? 0))) || 0));
    }, [transactions]);

    const coinStacks = useMemo<CoinStack[]>(() => {
        const maxValue = maxAbsAmount || 1;
        const coinHeight = COIN_HEIGHT;

        return transactions.slice(0, 24).map((txn, index) => {
            const amount = Math.abs(Number.parseFloat(String(txn.amount ?? 0))) || 0.01;
            const normalized = Math.min(1, amount / maxValue);
            const coins = Math.max(1, Math.round(normalized * 14));
            const height = coins * coinHeight;

            const table = VAULT_TABLES[index % VAULT_TABLES.length];
            const within = index % 6;
            const slotsPerRow = 3;
            const slotSpacingX = table.w / slotsPerRow;
            const slotSpacingZ = table.d / 2;
            const slotX = table.x - table.w / 2 + (within % slotsPerRow + 0.5) * slotSpacingX;
            const slotZ = table.z - table.d / 2 + (Math.floor(within / slotsPerRow) + 0.5) * slotSpacingZ;
            const baseY = table.baseY;

            return {
                id: txn.id,
                coins,
                height,
                position: [slotX, baseY + height / 2, slotZ],
                baseY,
                direction: (txn.direction as CoinStack["direction"]) || "",
                note: txn.note,
                amount,
                balanceAfter: Number.parseFloat(String(txn.balanceAfter ?? 0)) || 0,
                createdAt: txn.createdAt,
            } satisfies CoinStack;
        });
    }, [transactions, maxAbsAmount]);

    const hoveredStack = useMemo(() => coinStacks.find((stack) => stack.id === hoveredId) ?? null, [coinStacks, hoveredId]);
    const [supportsWebgl, setSupportsWebgl] = useState(false);

    useEffect(() => {
        if (typeof document === "undefined") return;
        const canvas = document.createElement("canvas");
        const supported = !!canvas.getContext("webgl") || !!canvas.getContext("webgl2");
        setSupportsWebgl(supported);
    }, []);

    const creditTotal = useMemo(() => {
        return transactions
            .filter((txn) => txn.direction === "credit")
            .reduce((sum, txn) => sum + Math.abs(Number.parseFloat(String(txn.amount ?? 0)) || 0), 0);
    }, [transactions]);

    const debitTotal = useMemo(() => {
        return transactions
            .filter((txn) => txn.direction === "debit")
            .reduce((sum, txn) => sum + Math.abs(Number.parseFloat(String(txn.amount ?? 0)) || 0), 0);
    }, [transactions]);

    const netFlow = creditTotal - debitTotal;

    const showingLabel = useMemo(() => {
        const first = totalTransactions === 0 ? 0 : Math.min(totalTransactions, page * pageSize + 1);
        const last = Math.min(totalTransactions, (page + 1) * pageSize);
        return `Showing ${first}-${last} of ${totalTransactions}`;
    }, [page, pageSize, totalTransactions]);

    const ledgerPages = useMemo(() => {
        const pageSizeLocal = 6;
        const pages: typeof transactions[] = [];
        for (let i = 0; i < transactions.length; i += pageSizeLocal) {
            pages.push(transactions.slice(i, i + pageSizeLocal));
        }
        return pages.length > 0 ? pages : [[]];
    }, [transactions]);
    const currentLedger = ledgerPages[Math.min(ledgerPage, ledgerPages.length - 1)] ?? [];
    const ledgerTitle = ledgerPages.length > 1 ? `Ledger page ${ledgerPage + 1} / ${ledgerPages.length}` : "Ledger";

    useEffect(() => {
        if (ledgerPage >= ledgerPages.length) {
            setLedgerPage(() => 0);
        }
    }, [ledgerPage, ledgerPages.length]);

    useEffect(() => {
        setCoinStacks(coinStacks);
    }, [coinStacks, setCoinStacks]);

    useEffect(() => {
        setLedgerData({ title: ledgerTitle, entries: currentLedger, totalPages: ledgerPages.length });
    }, [currentLedger, ledgerPages.length, ledgerTitle, setLedgerData]);

    return (
        <div className="space-y-4">
            <Card className="overflow-hidden border bg-white text-slate-900 shadow-lg">
                <div className="relative h-[440px] w-full">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.08),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.06),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(234,179,8,0.06),transparent_35%)]" />
                    {supportsWebgl ? (
                        <Canvas shadows camera={{ position: [8, 8, 10], fov: 48 }} className="h-full w-full">
                            <color attach="background" args={["#eef2f7"]} />
                            <ambientLight intensity={0.55} />
                            <hemisphereLight intensity={0.65} color="#cbd5e1" groundColor="#f8fafc" />
                            <directionalLight
                                position={[6, 10, 6]}
                                intensity={perfLimited ? 0.6 : 1}
                                castShadow={!perfLimited}
                                shadow-mapSize-width={perfLimited ? 512 : 1024}
                                shadow-mapSize-height={perfLimited ? 512 : 1024}
                            />
                            <Suspense fallback={<Html center className="text-sm text-slate-400">Preparing vault...</Html>}>
                                <PerformanceMonitor onDecline={() => setPerfLimited(true)} onIncline={() => setPerfLimited(false)}>
                                    <Grid args={[18, 18]} sectionSize={1} infiniteFade cellColor="#cbd5e166" sectionColor="#94a3b8cc" position={[0, 0, 0]} />
                                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
                                        <planeGeometry args={[32, 32]} />
                                        <meshStandardMaterial color="#e2e8f0" />
                                    </mesh>
                                    <VaultShell />
                                    <TablesLayer />
                                    <CoinStacksLayer />
                                    <LedgerStand />
                                    <Sparkles
                                        count={perfLimited ? 20 : 60}
                                        speed={0.25}
                                        opacity={0.15}
                                        color={"#16a34a"}
                                        size={3}
                                        position={[0, 2, 0]}
                                        scale={[12, 6, 12]}
                                    />
                                    <MapControls
                                        enableDamping
                                        dampingFactor={0.1}
                                        minDistance={5}
                                        maxDistance={18}
                                        maxPolarAngle={Math.PI / 2.2}
                                        minPolarAngle={Math.PI / 3.2}
                                        target={[0, 0.5, 0]}
                                    />
                                </PerformanceMonitor>
                            </Suspense>
                        </Canvas>
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-500">
                            3D preview unavailable in this environment.
                        </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/30 via-white/10 to-transparent" />
                    <div className="absolute inset-x-4 top-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                            <p className="text-xs uppercase tracking-wide text-slate-500">Industry module · Bank</p>
                            <p className="text-lg font-semibold leading-tight text-slate-900">K3H4 Coin vault visualization</p>
                            <p className="text-sm text-slate-600">Recent credits/debits are stacked as coins; hover stacks to inspect.</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 md:justify-end">
                            <Badge variant="secondary" className="border border-slate-200 bg-white text-slate-900 shadow-sm">
                                Balance: {formattedBalance}
                            </Badge>
                            <Badge variant="outline" className="border-emerald-500/60 bg-emerald-500/10 text-emerald-700">
                                Net flow: {netFlow >= 0 ? "+" : ""}{netFlow.toFixed(2)}
                            </Badge>
                        </div>
                    </div>
                    <div className="absolute inset-x-4 bottom-4 grid gap-3 text-sm md:grid-cols-3">
                        <div className="rounded-lg border border-white/70 bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
                            <p className="text-xs uppercase tracking-wide text-slate-500">Hover selection</p>
                            <p className="text-base font-semibold text-slate-900">
                                {hoveredStack ? `${hoveredStack.direction === "credit" ? "+" : "-"}${hoveredStack.amount.toFixed(2)} coin` : "Move over a stack"}
                            </p>
                            <p className="text-xs text-slate-600">{hoveredStack?.note || hoveredStack?.createdAt || "Ledger notes appear here"}</p>
                        </div>
                        <div className="rounded-lg border border-white/70 bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
                            <p className="text-xs uppercase tracking-wide text-slate-500">Credits</p>
                            <p className="text-base font-semibold text-emerald-700">+{creditTotal.toFixed(2)}</p>
                            <p className="text-xs text-slate-600">Current filter window</p>
                        </div>
                        <div className="rounded-lg border border-white/70 bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
                            <p className="text-xs uppercase tracking-wide text-slate-500">Debits</p>
                            <p className="text-base font-semibold text-amber-700">-{debitTotal.toFixed(2)}</p>
                            <p className="text-xs text-slate-600">Includes fees and transfers</p>
                        </div>
                    </div>
                </div>
            </Card>

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
                            <Input type="date" value={fromDate} onChange={(e) => { setPageValue(0); setFromDate(e.target.value); }} />
                        </div>
                        <div className="space-y-1 text-sm">
                            <label className="text-muted-foreground">To</label>
                            <Input type="date" value={toDate} onChange={(e) => { setPageValue(0); setToDate(e.target.value); }} />
                        </div>
                        <div className="space-y-1 text-sm">
                            <label className="text-muted-foreground">Direction</label>
                            <select
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                value={direction}
                                onChange={(e) => { setPageValue(0); setDirection(e.target.value as "" | "credit" | "debit"); }}
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
                                onChange={(e) => { setPageValue(0); setPageSize(Number(e.target.value) || 10); }}
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
                                const amountNum = Number.parseFloat(String(txn.amount ?? 0));
                                const signedAmount = txn.direction === "debit" ? -Math.abs(amountNum) : Math.abs(amountNum);
                                const balanceValue = Number.parseFloat(String(txn.balanceAfter ?? 0));
                                const deltaDisplay = Number.isFinite(signedAmount) ? signedAmount.toFixed(2) : "0.00";
                                const balanceDisplay = Number.isFinite(balanceValue) ? balanceValue.toFixed(2) : "0.00";

                                return (
                                    <TableRow key={txn.id} onMouseEnter={() => setHovered(txn.id)} onMouseLeave={() => setHovered(null)}>
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
                        <span>{showingLabel}</span>
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
        </div>
    );
}

