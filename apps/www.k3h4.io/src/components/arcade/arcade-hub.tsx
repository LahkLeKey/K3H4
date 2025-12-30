import { useMemo } from "react";

import { Section } from "../section";
import { SectionCard } from "../shell/section-card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import {
    useArcadeOverviewQuery,
    useCreateArcadeCard,
    useTopUpArcadeCard,
    useCreateArcadeSession,
    useRedeemArcadePrize,
    useCreateArcadePrize,
} from "../../hooks/use-arcade-queries";
import { ArcadeGames } from "./arcade-games";
import { useLocalStore } from "../../lib/store";

export type ArcadeHubProps = {
    apiBase: string;
    userEmail: string | null;
};

export function ArcadeHub({ apiBase, userEmail }: ArcadeHubProps) {
    const overview = useArcadeOverviewQuery(apiBase);
    const createCard = useCreateArcadeCard(apiBase);
    const topUpCard = useTopUpArcadeCard(apiBase);
    const startSession = useCreateArcadeSession(apiBase);
    const redeemPrize = useRedeemArcadePrize(apiBase);
    const createPrize = useCreateArcadePrize(apiBase);

    const cards = overview.data?.cards ?? [];
    const machines = overview.data?.machines ?? [];
    const prizes = overview.data?.prizes ?? [];
    const sessions = overview.data?.sessions ?? [];
    const redemptions = overview.data?.redemptions ?? [];

    const store = useLocalStore(() => ({
        cardLabel: "Arcade visitor card",
        topUpAmount: "10",
        selectedCard: "",
        selectedMachine: "",
        creditsSpent: "1",
        prizeName: "Sticker pack",
        prizeCost: "2",
        prizeStock: "10",
        redeemPrizeId: "",
        redeemCardId: "",
        inlineError: null as string | null,
    }));

    const {
        cardLabel,
        topUpAmount,
        selectedCard,
        selectedMachine,
        creditsSpent,
        prizeName,
        prizeCost,
        prizeStock,
        redeemPrizeId,
        redeemCardId,
        inlineError,
    } = store.useShallow((state) => ({
        cardLabel: state.cardLabel,
        topUpAmount: state.topUpAmount,
        selectedCard: state.selectedCard,
        selectedMachine: state.selectedMachine,
        creditsSpent: state.creditsSpent,
        prizeName: state.prizeName,
        prizeCost: state.prizeCost,
        prizeStock: state.prizeStock,
        redeemPrizeId: state.redeemPrizeId,
        redeemCardId: state.redeemCardId,
        inlineError: state.inlineError,
    }));

    const defaultCardId = useMemo(() => selectedCard || cards[0]?.id || "", [cards, selectedCard]);
    const defaultMachineId = useMemo(() => selectedMachine || machines[0]?.id || "", [machines, selectedMachine]);

    const loading = overview.isLoading;

    return (
        <div className="space-y-6">
            <Section
                eyebrow="Arcade"
                title="Retro arcade operations"
                description="Manage game cards, top-ups, sessions, and prize redemptions."
                actions={<Badge variant="secondary">User: {userEmail ?? "guest"}</Badge>}
            >
                <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-3">
                        <ArcadeGames />
                        <SectionCard className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-semibold">Cards & balances</div>
                                    <p className="text-xs text-muted-foreground">Top up with k3h4-coins to play machines.</p>
                                </div>
                                <Badge variant="outline">{cards.length} cards</Badge>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-3">
                                <div className="space-y-1">
                                    <Label>Label</Label>
                                    <Input value={cardLabel} onChange={(e) => store.setState({ cardLabel: e.target.value })} placeholder="Card name" />
                                    <Button className="w-full" onClick={() => createCard.mutate({ label: cardLabel })} disabled={createCard.isPending}>Create card</Button>
                                </div>
                                <div className="space-y-1">
                                    <Label>Top-up card</Label>
                                    <select className="w-full rounded-md border px-2 py-2 text-sm" value={defaultCardId} onChange={(e) => store.setState({ selectedCard: e.target.value })}>
                                        {cards.map((c) => <option key={c.id} value={c.id}>{c.label ?? c.id.slice(0, 6)}</option>)}
                                    </select>
                                    <div className="flex gap-2">
                                        <Input value={topUpAmount} onChange={(e) => store.setState({ topUpAmount: e.target.value })} inputMode="decimal" />
                                        <Button
                                            onClick={() => {
                                                store.setState({ inlineError: null });
                                                const amt = Number(topUpAmount);
                                                if (!Number.isFinite(amt) || amt <= 0) { store.setState({ inlineError: "Enter a valid amount" }); return; }
                                                if (!defaultCardId) { store.setState({ inlineError: "Select a card" }); return; }
                                                topUpCard.mutate({ cardId: defaultCardId, amount: amt });
                                            }}
                                            disabled={topUpCard.isPending}
                                        >
                                            Top up
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label>Play session</Label>
                                    <div className="grid gap-2">
                                        <select className="w-full rounded-md border px-2 py-2 text-sm" value={defaultMachineId} onChange={(e) => store.setState({ selectedMachine: e.target.value })}>
                                            {machines.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                                        </select>
                                        <div className="flex gap-2">
                                            <Input value={creditsSpent} onChange={(e) => store.setState({ creditsSpent: e.target.value })} inputMode="decimal" />
                                            <Button
                                                onClick={() => {
                                                    store.setState({ inlineError: null });
                                                    const credits = Number(creditsSpent);
                                                    if (!Number.isFinite(credits) || credits <= 0) { store.setState({ inlineError: "Enter credits > 0" }); return; }
                                                    if (!defaultCardId || !defaultMachineId) { store.setState({ inlineError: "Select card and machine" }); return; }
                                                    startSession.mutate({ cardId: defaultCardId, machineId: defaultMachineId, creditsSpent: credits });
                                                }}
                                                disabled={startSession.isPending}
                                            >
                                                Start
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {inlineError ? <p className="text-sm text-destructive">{inlineError}</p> : null}
                        </SectionCard>

                        <SectionCard className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-semibold">Prizes & redemptions</div>
                                    <p className="text-xs text-muted-foreground">Create prizes and redeem using card balance.</p>
                                </div>
                                <Badge variant="outline">{prizes.length} prizes</Badge>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-3">
                                <div className="space-y-1">
                                    <Label>Prize</Label>
                                    <Input value={prizeName} onChange={(e) => store.setState({ prizeName: e.target.value })} placeholder="Prize name" />
                                </div>
                                <div className="space-y-1">
                                    <Label>Cost (coins)</Label>
                                    <Input value={prizeCost} onChange={(e) => store.setState({ prizeCost: e.target.value })} inputMode="decimal" />
                                </div>
                                <div className="space-y-1">
                                    <Label>Stock</Label>
                                    <Input value={prizeStock} onChange={(e) => store.setState({ prizeStock: e.target.value })} inputMode="numeric" />
                                </div>
                            </div>
                            <Button
                                onClick={() => {
                                    const cost = Number(prizeCost);
                                    if (!prizeName.trim() || !Number.isFinite(cost) || cost <= 0) { store.setState({ inlineError: "Prize requires name and cost" }); return; }
                                    createPrize.mutate({ name: prizeName.trim(), costCoins: cost, stock: Number(prizeStock) || 0 });
                                }}
                                disabled={createPrize.isPending}
                            >
                                Add prize
                            </Button>

                            <div className="grid gap-2 sm:grid-cols-3">
                                <div className="space-y-1">
                                    <Label>Redeem prize</Label>
                                    <select className="w-full rounded-md border px-2 py-2 text-sm" value={redeemPrizeId} onChange={(e) => store.setState({ redeemPrizeId: e.target.value })}>
                                        <option value="">Select prize</option>
                                        {prizes.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.stock} in stock)</option>)}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <Label>Card</Label>
                                    <select className="w-full rounded-md border px-2 py-2 text-sm" value={redeemCardId} onChange={(e) => store.setState({ redeemCardId: e.target.value })}>
                                        <option value="">Select card</option>
                                        {cards.map((c) => <option key={c.id} value={c.id}>{c.label ?? c.id.slice(0, 6)}</option>)}
                                    </select>
                                </div>
                                <div className="flex items-end">
                                    <Button
                                        className="w-full"
                                        onClick={() => {
                                            if (!redeemPrizeId || !redeemCardId) { store.setState({ inlineError: "Select prize and card" }); return; }
                                            redeemPrize.mutate({ prizeId: redeemPrizeId, cardId: redeemCardId });
                                        }}
                                        disabled={redeemPrize.isPending}
                                    >
                                        Redeem
                                    </Button>
                                </div>
                            </div>
                        </SectionCard>
                    </div>

                    <div className="space-y-3">
                        <SectionCard className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold">Cards</div>
                                <Badge variant="outline">Balance</Badge>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Card</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Balance</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cards.map((card) => (
                                        <TableRow key={card.id}>
                                            <TableCell>{card.label ?? card.id.slice(0, 6)}</TableCell>
                                            <TableCell><Badge variant="secondary">{card.status}</Badge></TableCell>
                                            <TableCell className="text-right font-mono">{card.balance}</TableCell>
                                        </TableRow>
                                    ))}
                                    {cards.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-sm text-muted-foreground">No cards yet.</TableCell>
                                        </TableRow>
                                    ) : null}
                                </TableBody>
                            </Table>
                        </SectionCard>

                        <SectionCard className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold">Machines</div>
                                <Badge variant="outline">{machines.length}</Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                                {machines.map((m) => (
                                    <div key={m.id} className="rounded-lg border bg-muted/30 px-3 py-2">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold">{m.name}</span>
                                            <Badge variant="outline">{m.gameTitle}</Badge>
                                        </div>
                                        <div className="text-xs text-muted-foreground">{m.location ?? "Arcade"} · {m.status}</div>
                                    </div>
                                ))}
                                {machines.length === 0 ? <p className="text-sm text-muted-foreground">Add machines via API/DB seed.</p> : null}
                            </div>
                        </SectionCard>

                        <SectionCard className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold">Recent sessions</div>
                                <Badge variant="outline">{sessions.length}</Badge>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Machine</TableHead>
                                        <TableHead>Card</TableHead>
                                        <TableHead className="text-right">Credits</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sessions.map((s) => (
                                        <TableRow key={s.id}>
                                            <TableCell className="font-mono text-xs">{s.machineId.slice(0, 6)}…</TableCell>
                                            <TableCell className="font-mono text-xs">{s.cardId.slice(0, 6)}…</TableCell>
                                            <TableCell className="text-right">{s.creditsSpent}</TableCell>
                                        </TableRow>
                                    ))}
                                    {sessions.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-sm text-muted-foreground">No sessions yet.</TableCell>
                                        </TableRow>
                                    ) : null}
                                </TableBody>
                            </Table>
                        </SectionCard>

                        <SectionCard className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold">Redemptions</div>
                                <Badge variant="outline">{redemptions.length}</Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                                {redemptions.map((r: any) => (
                                    <div key={r.id} className="rounded-lg border bg-muted/20 px-3 py-2">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold">{r.prizeId.slice(0, 6)}…</span>
                                            <Badge variant="secondary">{r.status}</Badge>
                                        </div>
                                        <div className="text-xs text-muted-foreground">Card {r.cardId.slice(0, 6)}…</div>
                                    </div>
                                ))}
                                {redemptions.length === 0 ? <p className="text-sm text-muted-foreground">No redemptions yet.</p> : null}
                            </div>
                        </SectionCard>
                    </div>
                </div>
            </Section>
            {loading ? <p className="text-sm text-muted-foreground">Loading arcade data…</p> : null}
        </div>
    );
}
