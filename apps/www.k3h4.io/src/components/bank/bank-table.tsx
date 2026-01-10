import { Suspense, useEffect, useMemo, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ContactShadows, Grid, Html, MapControls, PerformanceMonitor, Sparkles } from "@react-three/drei";

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
import { useLocalStore } from "../../lib/store";

type CoinStack = {
    id: string;
    coins: number;
    height: number;
    position: [number, number, number];
    baseY: number;
    direction: "credit" | "debit" | "";
    note?: string | null;
    amount: number;
    balanceAfter: number;
    createdAt?: string;
};

function mixColor(hex: string, amount: number) {
    const clamped = Math.min(1, Math.max(0, amount));
    const num = Number.parseInt(hex.replace("#", ""), 16);
    const r = (num >> 16) & 0xff;
    const g = (num >> 8) & 0xff;
    const b = num & 0xff;
    const mix = (channel: number) => Math.round(channel + (255 - channel) * clamped);
    return `#${[mix(r), mix(g), mix(b)].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

export type BankTableProps = {
    apiBase: string;
    userEmail: string | null;
};

export function BankTable({ apiBase, userEmail }: BankTableProps) {
    const uiStore = useLocalStore(() => ({
        page: 0,
        pageSize: 10,
        fromDate: "",
        toDate: "",
        direction: "" as "" | "credit" | "debit",
    }));

    const { page, pageSize, fromDate, toDate, direction } = uiStore.useShallow((state) => state);
    const setPage = (updater: (prev: number) => number) => uiStore.setState((prev) => ({ page: updater(prev.page) }));
    const setPageValue = (value: number) => uiStore.setState({ page: value });
    const setPageSize = (value: number) => uiStore.setState({ pageSize: value });
    const setFromDate = (value: string) => uiStore.setState({ fromDate: value });
    const setToDate = (value: string) => uiStore.setState({ toDate: value });
    const setDirection = (value: "" | "credit" | "debit") => uiStore.setState({ direction: value });

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
        const coinHeight = 0.08;

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

    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const hoveredStack = useMemo(() => coinStacks.find((stack) => stack.id === hoveredId) ?? null, [coinStacks, hoveredId]);
    const [isPerfLimited, setPerfLimited] = useState(false);
    const [supportsWebgl, setSupportsWebgl] = useState(false);
    const [burstStackId, setBurstStackId] = useState<string | null>(null);
    const [burstToken, setBurstToken] = useState(0);

    useEffect(() => {
        if (typeof document === "undefined") return;
        const canvas = document.createElement("canvas");
        const supported = !!canvas.getContext("webgl") || !!canvas.getContext("webgl2");
        setSupportsWebgl(supported);
    }, []);

    const handleBurst = (id: string) => {
        setBurstStackId(id);
        setBurstToken((token) => token + 1);
    };

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
    const [ledgerPage, setLedgerPage] = useState(0);
    const currentLedger = ledgerPages[Math.min(ledgerPage, ledgerPages.length - 1)] ?? [];
    const ledgerTitle = ledgerPages.length > 1 ? `Ledger page ${ledgerPage + 1} / ${ledgerPages.length}` : "Ledger";

    useEffect(() => {
        if (ledgerPage >= ledgerPages.length) {
            setLedgerPage(0);
        }
    }, [ledgerPage, ledgerPages.length]);

    return (
        <div className="space-y-4">
            <Card className="overflow-hidden border bg-white text-slate-900 shadow-lg">
                <div className="relative h-[440px] w-full">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.18),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(14,165,233,0.16),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(234,179,8,0.16),transparent_35%)]" />
                    {supportsWebgl ? (
                        <Canvas shadows camera={{ position: [8, 8, 10], fov: 48 }} className="h-full w-full">
                            <color attach="background" args={["#eef2f7"]} />
                            <ambientLight intensity={0.55} />
                            <hemisphereLight intensity={0.65} color="#cbd5e1" groundColor="#f8fafc" />
                            <directionalLight
                                position={[6, 10, 6]}
                                intensity={isPerfLimited ? 0.6 : 1}
                                castShadow={!isPerfLimited}
                                shadow-mapSize-width={isPerfLimited ? 512 : 1024}
                                shadow-mapSize-height={isPerfLimited ? 512 : 1024}
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
                                    <CoinStacksLayer
                                        stacks={coinStacks}
                                        highlightedId={hoveredId}
                                        onHover={setHoveredId}
                                        onClickStack={handleBurst}
                                        perfLimited={isPerfLimited}
                                        burstStackId={burstStackId}
                                        burstToken={burstToken}
                                    />
                                    <LedgerStand
                                        title={ledgerTitle}
                                        entries={currentLedger}
                                        onPrev={() => setLedgerPage((p) => Math.max(0, p - 1))}
                                        onNext={() => setLedgerPage((p) => Math.min(ledgerPages.length - 1, p + 1))}
                                        page={ledgerPage}
                                        totalPages={ledgerPages.length}
                                    />
                                    <Sparkles
                                        count={isPerfLimited ? 20 : 60}
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
                                    {!isPerfLimited && <ContactShadows position={[0, -0.02, 0]} opacity={0.32} width={24} height={24} blur={2.4} far={12} />}
                                </PerformanceMonitor>
                            </Suspense>
                        </Canvas>
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-500">
                            3D preview unavailable in this environment.
                        </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
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
                                    <TableRow key={txn.id} onMouseEnter={() => setHoveredId(txn.id)} onMouseLeave={() => setHoveredId(null)}>
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

const COIN_HEIGHT = 0.08;
const TABLE_HEIGHT = 1.1;
const TABLE_THICKNESS = 0.12;
const VAULT_TABLES = [
    { x: -4, z: -2, w: 4, d: 3, baseY: TABLE_HEIGHT },
    { x: 4, z: -2, w: 4, d: 3, baseY: TABLE_HEIGHT },
    { x: 0, z: 2.5, w: 9, d: 2.4, baseY: TABLE_HEIGHT },
];

type CoinStacksLayerProps = {
    stacks: CoinStack[];
    highlightedId: string | null;
    onHover: (id: string | null) => void;
    perfLimited: boolean;
    onClickStack: (id: string) => void;
    burstStackId: string | null;
    burstToken: number;
};

type DroppingCoinProps = {
    index: number;
    direction: "credit" | "debit" | "";
    perfLimited: boolean;
    shadeIndex: number;
    coinCount: number;
    burstKey: number;
    active: boolean;
    baseY: number;
};

function DroppingCoin({ index, direction, perfLimited, shadeIndex, coinCount, burstKey, active, baseY }: DroppingCoinProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const delay = useMemo(() => Math.random() * 0.6, []);
    const startY = baseY + 2 + index * 0.05;
    const targetY = baseY + index * COIN_HEIGHT + COIN_HEIGHT / 2 + 0.05;
    const dropDuration = 1.2;
    const burstState = useRef({ key: -1, t0: 0 });

    const baseColor = direction === "credit" ? "#16a34a" : "#f97316";
    const shadeAmount = coinCount > 1 ? shadeIndex / (coinCount * 1.35) : 0.05;
    const faceColor = mixColor(baseColor, shadeAmount);
    const rimColor = mixColor(baseColor, Math.min(1, shadeAmount + 0.2));

    useFrame((state) => {
        const elapsed = Math.max(0, state.clock.getElapsedTime() - delay);
        const progress = Math.min(1, elapsed / dropDuration);
        const ease = 1 - Math.pow(1 - progress, 3);
        const wobble = (1 - progress) * 0.02 * Math.sin(elapsed * 6);

        if (burstKey !== burstState.current.key && active) {
            burstState.current = { key: burstKey, t0: state.clock.getElapsedTime() };
        }

        const burstElapsed = state.clock.getElapsedTime() - burstState.current.t0;
        const burstPhase = Math.max(0, Math.min(1, burstElapsed / 0.9));
        const burstLift = active ? Math.sin(burstPhase * Math.PI) * (0.5 + 0.1 * shadeIndex) * (1 - burstPhase) : 0;

        const y = startY * (1 - ease) + targetY * ease + wobble + burstLift;
        if (meshRef.current) {
            meshRef.current.position.y = y;
            meshRef.current.rotation.y = ease * Math.PI * 0.35 + burstLift * 0.6;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, startY, 0]} castShadow={!perfLimited} receiveShadow>
            <cylinderGeometry args={[0.35, 0.35, COIN_HEIGHT, 64, 1, false]} />
            <meshStandardMaterial
                attachArray="material"
                color={faceColor}
                metalness={0.9}
                roughness={0.22}
                emissive={direction === "credit" ? "#166534" : "#7c2d12"}
                emissiveIntensity={0.22}
            />
            <meshStandardMaterial
                attachArray="material"
                color={rimColor}
                metalness={0.94}
                roughness={0.16}
                emissive={rimColor}
                emissiveIntensity={0.18}
            />
            <meshStandardMaterial
                attachArray="material"
                color={mixColor(baseColor, 0.08)}
                metalness={0.88}
                roughness={0.24}
                emissive={direction === "credit" ? "#14532d" : "#7c2d12"}
                emissiveIntensity={0.16}
            />
        </mesh>
    );
}

function CoinStacksLayer({ stacks, highlightedId, onHover, onClickStack, perfLimited, burstStackId, burstToken }: CoinStacksLayerProps) {
    return (
        <group>
            {stacks.map((stack) => {
                const ringColor = stack.direction === "credit" ? "#16a34a" : stack.direction === "debit" ? "#f97316" : "#94a3b8";
                return (
                    <group
                        key={stack.id}
                        position={[stack.position[0], 0, stack.position[2]]}
                        onPointerOver={(event) => {
                            event.stopPropagation();
                            onHover(stack.id);
                        }}
                        onPointerOut={(event) => {
                            event.stopPropagation();
                            onHover(null);
                        }}
                        onClick={(event) => {
                            event.stopPropagation();
                            onClickStack(stack.id);
                        }}
                    >
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, stack.baseY + 0.001, 0]} receiveShadow>
                            <circleGeometry args={[0.62, 48]} />
                            <meshStandardMaterial color={`${ringColor}55`} transparent roughness={0.6} metalness={0.2} />
                        </mesh>
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, stack.baseY + 0.002, 0]} receiveShadow castShadow={!perfLimited}>
                            <torusGeometry args={[0.62, 0.02, 24, 64]} />
                            <meshStandardMaterial
                                color={ringColor}
                                emissive={ringColor}
                                emissiveIntensity={highlightedId === stack.id ? 0.8 : 0.25}
                                metalness={0.6}
                                roughness={0.2}
                            />
                        </mesh>
                        {Array.from({ length: stack.coins }).map((_, coinIndex) => (
                            <DroppingCoin
                                key={`${stack.id}-coin-${coinIndex}`}
                                index={coinIndex}
                                direction={stack.direction}
                                perfLimited={perfLimited}
                                shadeIndex={coinIndex}
                                coinCount={stack.coins}
                                burstKey={stack.id === burstStackId ? burstToken : 0}
                                active={stack.id === burstStackId}
                                baseY={stack.baseY}
                            />
                        ))}
                        {highlightedId === stack.id ? (
                            <Html center style={{ pointerEvents: "none" }}>
                                <div className="rounded-md border border-slate-200 bg-white/95 px-3 py-2 text-xs text-slate-900 shadow-xl backdrop-blur">
                                    <p className="font-semibold">{stack.direction === "credit" ? "+" : "-"}{stack.amount.toFixed(2)}</p>
                                    <p className="text-[11px] text-slate-600">{stack.note || "No note"}</p>
                                    <p className="text-[11px] text-slate-500">Bal {stack.balanceAfter.toFixed(2)}</p>
                                </div>
                            </Html>
                        ) : null}
                    </group>
                );
            })}
        </group>
    );
}

function VaultShell() {
    return (
        <group>
            <mesh position={[0, 2.5, -10]} receiveShadow>
                <boxGeometry args={[24, 6, 0.4]} />
                <meshStandardMaterial color="#e5e7eb" metalness={0.25} roughness={0.55} />
            </mesh>
            <mesh position={[-12, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                <boxGeometry args={[20, 6, 0.4]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.22} roughness={0.58} />
            </mesh>
            <mesh position={[12, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                <boxGeometry args={[20, 6, 0.4]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.22} roughness={0.58} />
            </mesh>
            <mesh position={[0, 5.5, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[24, 20]} />
                <meshStandardMaterial color="#f8fafc" metalness={0.1} roughness={0.78} />
            </mesh>
        </group>
    );
}

function TablesLayer() {
    return (
        <group>
            {VAULT_TABLES.map((table, idx) => {
                const legOffsetX = table.w / 2 - 0.2;
                const legOffsetZ = table.d / 2 - 0.2;
                return (
                    <group key={`table-${idx}`} position={[table.x, 0, table.z]}>
                        <mesh position={[0, table.baseY - TABLE_THICKNESS / 2, 0]} castShadow receiveShadow>
                            <boxGeometry args={[table.w, TABLE_THICKNESS, table.d]} />
                            <meshStandardMaterial color="#f1f5f9" metalness={0.12} roughness={0.35} />
                        </mesh>
                        {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map((pair, legIdx) => (
                            <mesh
                                key={`table-${idx}-leg-${legIdx}`}
                                position={[pair[0] * legOffsetX, (TABLE_HEIGHT - 0.6) / 2, pair[1] * legOffsetZ]}
                                castShadow
                                receiveShadow
                            >
                                <cylinderGeometry args={[0.07, 0.07, TABLE_HEIGHT - 0.6, 12]} />
                                <meshStandardMaterial color="#cbd5e1" metalness={0.14} roughness={0.5} />
                            </mesh>
                        ))}
                    </group>
                );
            })}
        </group>
    );
}

type LedgerStandProps = {
    title: string;
    entries: { id: string; note?: string | null; amount?: string | number; balanceAfter?: string | number; createdAt?: string }[];
    onPrev: () => void;
    onNext: () => void;
    page: number;
    totalPages: number;
};

function LedgerStand({ title, entries, onPrev, onNext, page, totalPages }: LedgerStandProps) {
    const formattedEntries = entries.map((entry) => {
        const amount = Number.parseFloat(String(entry.amount ?? 0)) || 0;
        const directionSign = amount >= 0 ? "+" : "";
        const balance = Number.parseFloat(String(entry.balanceAfter ?? 0)) || 0;
        return {
            id: entry.id,
            note: entry.note || "(no note)",
            amount: `${directionSign}${amount.toFixed(2)}`,
            balance: balance.toFixed(2),
            created: entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : "",
        };
    });

    return (
        <group position={[0, TABLE_HEIGHT + 0.6, -5.2]}>
            <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[3.8, 2.6]} />
                <meshStandardMaterial color="#e2e8f0" metalness={0.08} roughness={0.65} />
            </mesh>
            <Html position={[0, 0, 0]} transform style={{ pointerEvents: "auto" }}>
                <div className="w-64 rounded-lg border border-slate-200 bg-white/95 p-3 shadow-xl">
                    <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
                        <span>{title}</span>
                        <span>Game view: vault</span>
                    </div>
                    <div className="space-y-1 text-xs text-slate-700">
                        {formattedEntries.length === 0 ? <p className="text-slate-400">No entries</p> : null}
                        {formattedEntries.map((row) => (
                            <div key={row.id} className="flex items-center justify-between rounded-md bg-slate-50 px-2 py-1">
                                <span className="truncate font-semibold">{row.amount}</span>
                                <span className="truncate text-slate-500">{row.note}</span>
                                <span className="text-[10px] text-slate-400">{row.created}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                        <button className="rounded border border-slate-200 px-2 py-1 hover:bg-slate-100" onClick={onPrev} disabled={page === 0}>
                            Prev
                        </button>
                        <span>Page {page + 1} / {Math.max(1, totalPages)}</span>
                        <button className="rounded border border-slate-200 px-2 py-1 hover:bg-slate-100" onClick={onNext} disabled={page + 1 >= totalPages}>
                            Next
                        </button>
                    </div>
                </div>
            </Html>
        </group>
    );
}
