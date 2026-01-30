import { useEffect } from "react";

import { Badge, Button, Card, StatChip, Table } from "../ui";
import { useAuthStore } from "../../zustand-stores/auth";
import { useArcadeState } from "../../react-hooks/arcade";

const formatDate = (value?: string | null) => (value ? new Date(value).toLocaleDateString() : "-");
const formatTime = (value?: string | null) => (value ? new Date(value).toLocaleTimeString() : "-");

export function ArcadeBoard() {
    const { session } = useAuthStore();
    const { overview, status, error, fetchOverview } = useArcadeState();

    useEffect(() => {
        if (session?.accessToken && status === "idle") {
            fetchOverview();
        }
    }, [session?.accessToken, status, fetchOverview]);

    const loading = status === "loading";
    const signedIn = Boolean(session?.accessToken);
    const hasOverview = Boolean(overview);
    const machines = overview?.machines ?? [];
    const cards = overview?.cards ?? [];
    const prizes = overview?.prizes ?? [];
    const sessions = overview?.sessions ?? [];
    const redemptions = overview?.redemptions ?? [];

    const statChips = [
        { label: "Machines", value: hasOverview ? machines.length.toString() : "-", accent: "#f472ff" },
        { label: "Cards", value: hasOverview ? cards.length.toString() : "-", accent: "#22d3ee" },
        { label: "Prizes", value: hasOverview ? prizes.length.toString() : "-", accent: "#fef08a" },
        { label: "Sessions", value: hasOverview ? sessions.length.toString() : "-", accent: "#34d399" },
        { label: "Redemptions", value: hasOverview ? redemptions.length.toString() : "-", accent: "#fb7185" },
    ];

    const machineColumns = [
        { key: "name", label: "Machine" },
        { key: "status", label: "Status", render: (row: typeof machines[number]) => row.status ?? "offline" },
        { key: "createdAt", label: "Installed", render: (row: typeof machines[number]) => formatDate(row.createdAt) },
    ];

    const sessionColumns = [
        { key: "cardId", label: "Card" },
        { key: "machineId", label: "Machine" },
        {
            key: "creditsSpent",
            label: "Credits",
            render: (row: typeof sessions[number]) => row.creditsSpent ? `₭${row.creditsSpent}` : "-",
        },
        {
            key: "score",
            label: "Score",
            render: (row: typeof sessions[number]) =>
                typeof row.score === "number" ? row.score.toString() : "-",
        },
        { key: "startedAt", label: "Started", render: (row: typeof sessions[number]) => formatTime(row.startedAt) },
    ];

    const redemptionColumns = [
        { key: "prizeId", label: "Prize" },
        { key: "cardId", label: "Card" },
        {
            key: "sessionId",
            label: "Session",
            render: (row: typeof redemptions[number]) => row.sessionId ?? "-",
        },
        { key: "createdAt", label: "At", render: (row: typeof redemptions[number]) => formatTime(row.createdAt) },
    ];

    const fallbackMessage = (defaultText: string) =>
        signedIn ? defaultText : "Sign in to load arcade.";

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <Badge accent="#f472ff">Arcade</Badge>
                {loading ? <span className="text-xs text-slate-400">Loading…</span> : null}
                {error ? <span className="text-xs text-amber-300">{error}</span> : null}
                <div className="ml-auto flex items-center gap-2">
                    <Button accent="#f472ff" disabled={loading} onClick={() => fetchOverview()}>
                        Refresh
                    </Button>
                </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-5">
                {statChips.map((chip) => (
                    <StatChip key={chip.label} label={chip.label} value={chip.value} accent={chip.accent} />
                ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <Card eyebrow="Cards" title="Balances" actions={<Badge accent="#f472ff">Live</Badge>}>
                    {hasOverview ? (
                        <Table
                            columns={[
                                { key: "label", label: "Card" },
                                {
                                    key: "balance",
                                    label: "Balance",
                                    render: (row: typeof cards[number]) => `₭${row.balance}`,
                                },
                                {
                                    key: "topUps",
                                    label: "Top-ups",
                                    render: (row: typeof cards[number]) => row.topUps.length,
                                },
                            ]}
                            rows={cards}
                            rowKey={(row) => row.id}
                        />
                    ) : (
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                            {fallbackMessage("No cards yet.")}
                        </div>
                    )}
                </Card>

                <Card eyebrow="Devices" title="Machines" actions={<Badge accent="#f472ff">Status</Badge>}>
                    {hasOverview ? (
                        machines.length ? (
                            <Table columns={machineColumns} rows={machines} rowKey={(row) => row.id} />
                        ) : (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                                {fallbackMessage("No machines deployed yet.")}
                            </div>
                        )
                    ) : (
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                            {fallbackMessage("No machines yet.")}
                        </div>
                    )}
                </Card>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <Card eyebrow="Sessions" title="Play history" actions={<Badge accent="#34d399">Live</Badge>}>
                    {hasOverview ? (
                        sessions.length ? (
                            <Table columns={sessionColumns} rows={sessions} rowKey={(row) => row.id} />
                        ) : (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                                {fallbackMessage("No sessions logged yet.")}
                            </div>
                        )
                    ) : (
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                            {fallbackMessage("Sessions will appear here once you sign in.")}
                        </div>
                    )}
                </Card>

                <Card eyebrow="Redemptions" title="Prize claims" actions={<Badge accent="#fb7185">Ledger</Badge>}>
                    {hasOverview ? (
                        redemptions.length ? (
                            <Table columns={redemptionColumns} rows={redemptions} rowKey={(row) => row.id} />
                        ) : (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                                {fallbackMessage("No redemptions recorded yet.")}
                            </div>
                        )
                    ) : (
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                            {fallbackMessage("Rewards will show once you sign in.")}
                        </div>
                    )}
                </Card>
            </div>

            <Card eyebrow="Prizes" title="Prize vault" actions={<Badge accent="#fef08a">Stock</Badge>}>
                {hasOverview && prizes.length ? (
                    <Table
                        columns={[
                            { key: "name", label: "Prize" },
                            { key: "sku", label: "SKU" },
                            { key: "stock", label: "Stock" },
                            {
                                key: "costCoins",
                                label: "Cost",
                                render: (row: typeof prizes[number]) => (row.costCoins ? `₭${row.costCoins}` : "-"),
                            },
                        ]}
                        rows={prizes}
                        rowKey={(row) => row.id}
                    />
                ) : (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                        {fallbackMessage("No prizes configured yet.")}
                    </div>
                )}
            </Card>
        </div>
    );
}
