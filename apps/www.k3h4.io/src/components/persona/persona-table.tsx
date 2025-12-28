import { useMemo, useState } from "react";
import { Plus, RefreshCcw, Send, Sparkles } from "lucide-react";

import { useK3h4Bank } from "../../hooks/use-k3h4-bank";
import {
    useCreatePersonaMutation,
    useGeneratePersonaMutation,
    usePersonaListQuery,
    type Persona,
} from "../../hooks/use-persona-queries";
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

export type PersonaTableProps = {
    apiBase: string;
    userEmail: string | null;
};

export function PersonaTable({ apiBase, userEmail }: PersonaTableProps) {
    const {
        balance,
        loading,
        updating,
        message,
        error,
        applyDelta,
        refreshBalance,
        amountInput,
        setAmountInput,
        note,
    } = useK3h4Bank(apiBase, { page: 0, pageSize: 1 });

    const personasQuery = usePersonaListQuery(apiBase);
    const createPersona = useCreatePersonaMutation(apiBase);
    const generatePersona = useGeneratePersonaMutation(apiBase);

    const [filter, setFilter] = useState("");
    const [newPersona, setNewPersona] = useState({ alias: "", account: "", handle: "", note: "" });
    const [rowAmounts, setRowAmounts] = useState<Record<string, string>>({});
    const [rowNotes, setRowNotes] = useState<Record<string, string>>({});
    const [inlineError, setInlineError] = useState<string>("");

    const formattedBalance = useMemo(() => {
        if (balance === null) return loading ? "Loading..." : "--";
        const numeric = Number.parseFloat(balance);
        return Number.isFinite(numeric) ? `${numeric.toFixed(2)} k3h4-coin` : balance;
    }, [balance, loading]);

    const filteredPersonas = useMemo(() => {
        const personas = personasQuery.data ?? [];
        if (!filter.trim()) return personas;
        const term = filter.toLowerCase();
        return personas.filter((p) =>
            [p.alias, p.account, p.handle, p.note]
                .filter(Boolean)
                .some((value) => value?.toLowerCase().includes(term))
        );
    }, [filter, personasQuery.data]);

    const handleAddPersona = async () => {
        if (!newPersona.alias.trim() || !newPersona.account.trim()) {
            setInlineError("Alias and account are required");
            return;
        }

        try {
            await createPersona.mutateAsync({
                alias: newPersona.alias.trim(),
                account: newPersona.account.trim(),
                handle: newPersona.handle.trim() || undefined,
                note: newPersona.note.trim() || undefined,
                tags: ["custom"],
            });
            setNewPersona({ alias: "", account: "", handle: "", note: "" });
            setInlineError("");
        } catch (err) {
            setInlineError(err instanceof Error ? err.message : "Unable to add persona");
        }
    };

    const amountIsValid = (value: number) => Number.isFinite(value) && value > 0;

    const handleTransfer = (persona: Persona, direction: "pay" | "request") => {
        const rawAmount = rowAmounts[persona.id] ?? amountInput;
        const amountValue = Number.parseFloat(rawAmount);
        if (!amountIsValid(amountValue)) {
            setInlineError("Enter a valid amount before sending");
            return;
        }

        const noteOverride = rowNotes[persona.id]?.trim() || note?.trim() || "";
        const reason = noteOverride
            ? `${noteOverride} • persona:${persona.alias}`
            : `${direction === "pay" ? "Payment to" : "Request from"} ${persona.alias}`;

        const delta = direction === "pay" ? -Math.abs(amountValue) : Math.abs(amountValue);
        applyDelta(delta, `${reason} (${persona.account}${persona.handle ? `, ${persona.handle}` : ""})`);
        setInlineError("");
    };

    return (
        <Card className="border bg-background/80">
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-lg">Persona Browser</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Keep fake accounts you can pay or request with k3h4-coins as {userEmail || "guest"}.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                    <Badge variant="secondary">Balance: {formattedBalance}</Badge>
                    <Button variant="outline" size="sm" onClick={refreshBalance} disabled={loading}>
                        <RefreshCcw className="mr-2 h-4 w-4" /> Refresh balance
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => generatePersona.mutate(1)}
                        disabled={generatePersona.isPending}
                    >
                        <Sparkles className="mr-2 h-4 w-4" /> Generate persona
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="grid gap-2 sm:grid-cols-[2fr,2fr,1fr,auto]">
                    <Input
                        value={newPersona.alias}
                        onChange={(e) => setNewPersona((prev) => ({ ...prev, alias: e.target.value }))}
                        placeholder="Add persona alias"
                        aria-label="Persona alias"
                    />
                    <Input
                        value={newPersona.account}
                        onChange={(e) => setNewPersona((prev) => ({ ...prev, account: e.target.value }))}
                        placeholder="Account or address"
                        aria-label="Persona account"
                    />
                    <Input
                        value={newPersona.handle}
                        onChange={(e) => setNewPersona((prev) => ({ ...prev, handle: e.target.value }))}
                        placeholder="Handle (optional)"
                        aria-label="Persona handle"
                    />
                    <Button onClick={handleAddPersona} variant="secondary" className="justify-center" disabled={updating}>
                        <Plus className="mr-2 h-4 w-4" /> Add persona
                    </Button>
                    <Input
                        value={newPersona.note}
                        onChange={(e) => setNewPersona((prev) => ({ ...prev, note: e.target.value }))}
                        placeholder="Persona note (optional)"
                        aria-label="Persona note"
                        className="sm:col-span-3"
                    />
                </div>

                <div className="grid gap-2 sm:grid-cols-[2fr,2fr]">
                    <Input
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Filter personas by alias, handle, or account"
                        aria-label="Filter personas"
                    />
                    <Input
                        value={amountInput}
                        onChange={(e) => setAmountInput(e.target.value)}
                        placeholder="Default amount for all personas"
                        inputMode="decimal"
                        aria-label="Default amount"
                    />
                </div>

                {inlineError ? <p className="text-sm text-destructive">{inlineError}</p> : null}
                {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
                {error ? <p className="text-sm text-destructive">{error}</p> : null}
                {personasQuery.isLoading ? <p className="text-sm text-muted-foreground">Loading personas...</p> : null}
                {personasQuery.error ? (
                    <p className="text-sm text-destructive">{(personasQuery.error as Error).message}</p>
                ) : null}

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Persona</TableHead>
                            <TableHead>Account</TableHead>
                            <TableHead className="w-[320px]">Amount & Note</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPersonas.map((persona) => (
                            <TableRow key={persona.id}>
                                <TableCell className="space-y-1">
                                    <div className="font-semibold leading-tight">{persona.alias}</div>
                                    <div className="text-xs text-muted-foreground">{persona.note}</div>
                                    <div className="flex flex-wrap gap-1">
                                        {persona.handle ? <Badge variant="outline">{persona.handle}</Badge> : null}
                                        {persona.tags?.map((tag) => (
                                            <Badge key={tag} variant="secondary">{tag}</Badge>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="font-mono text-sm text-muted-foreground">{persona.account}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-2">
                                        <Input
                                            value={rowAmounts[persona.id] ?? amountInput}
                                            onChange={(e) => setRowAmounts((prev) => ({ ...prev, [persona.id]: e.target.value }))}
                                            placeholder="Amount"
                                            inputMode="decimal"
                                        />
                                        <Input
                                            value={rowNotes[persona.id] ?? ""}
                                            onChange={(e) => setRowNotes((prev) => ({ ...prev, [persona.id]: e.target.value }))}
                                            placeholder="Note (optional)"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex flex-wrap justify-end gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => handleTransfer(persona, "pay")}
                                            disabled={updating}
                                        >
                                            <Send className="mr-2 h-4 w-4 rotate-180" /> Pay
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleTransfer(persona, "request")}
                                            disabled={updating}
                                        >
                                            <Send className="mr-2 h-4 w-4" /> Request
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredPersonas.length === 0 && personasQuery.isSuccess ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-sm text-muted-foreground">
                                    No personas yet. Add one above to start paying or requesting.
                                </TableCell>
                            </TableRow>
                        ) : null}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
