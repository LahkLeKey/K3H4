import { useEffect, useMemo, useState } from "react";

import { Badge, Button, Card, Input, StatChip, Table } from "../radix-primitives";
import { useAuthStore } from "../zustand-stores/auth";
import { usePersonaState } from "../react-hooks/persona";

export function PersonaBoard() {
    const { session } = useAuthStore();
    const { personas, status, error, stats, fetchPersonas, generatePersonas, createPersona } = usePersonaState();
    const [draftAlias, setDraftAlias] = useState("");
    const [draftAccount, setDraftAccount] = useState("");

    useEffect(() => {
        if (session?.accessToken && status === "idle") {
            fetchPersonas();
        }
    }, [session?.accessToken, status, fetchPersonas]);

    const categories = useMemo(
        () => Object.entries(stats.categories).sort((a, b) => b[1] - a[1]),
        [stats.categories],
    );

    const disabled = !session?.accessToken || status === "loading";

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
                <Badge accent="#a78bfa">Personas</Badge>
                {status === "loading" ? <span className="text-xs text-slate-400">Loading…</span> : null}
                {error ? <span className="text-xs text-amber-300">{error}</span> : null}
                <div className="ml-auto flex items-center gap-2">
                    <Button accent="#22d3ee" onClick={() => fetchPersonas()} disabled={status === "loading"}>
                        Refresh
                    </Button>
                    <Button accent="#a78bfa" onClick={() => generatePersonas(2)} disabled={disabled}>
                        Seed 2
                    </Button>
                </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
                <StatChip label="Personas" value={stats.total.toString()} accent="#a78bfa" />
                <StatChip label="Attributes" value={stats.attributes.toString()} accent="#22d3ee" />
                <StatChip label="Top category" value={categories[0]?.[0] || "n/a"} accent="#f59e0b" />
            </div>

            <Card eyebrow="Quick add" title="Create persona" actions={<Badge accent="#a78bfa">Write</Badge>}>
                <div className="grid gap-3 sm:grid-cols-3">
                    <Input placeholder="Alias" value={draftAlias} onChange={(e) => setDraftAlias(e.target.value)} />
                    <Input placeholder="Account" value={draftAccount} onChange={(e) => setDraftAccount(e.target.value)} />
                    <Button
                        accent="#22c55e"
                        disabled={disabled || !draftAlias.trim() || !draftAccount.trim()}
                        onClick={async () => {
                            await createPersona({ alias: draftAlias.trim(), account: draftAccount.trim() });
                            setDraftAlias("");
                            setDraftAccount("");
                        }}
                    >
                        Save
                    </Button>
                </div>
            </Card>

            <Card eyebrow="Roster" title="Personas" actions={<Badge accent="#a78bfa">Live</Badge>}>
                {personas.length === 0 ? (
                    <div className="space-y-1 rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-slate-200">
                        <div className="font-semibold">{session ? "No personas yet" : "Sign in to view personas"}</div>
                        <div className="text-slate-400">{session ? "Seed a few to inspect attributes." : "Authorize to load your data."}</div>
                    </div>
                ) : (
                    <Table
                        columns={[
                            { key: "alias", label: "Alias" },
                            { key: "account", label: "Account" },
                            {
                                key: "tags",
                                label: "Tags",
                                render: (row) => (
                                    <div className="flex flex-wrap gap-1 text-xs text-slate-300">
                                        {row.tags.map((tag) => (
                                            <span key={`${row.id}-${tag}`} className="rounded-full bg-white/10 px-2 py-0.5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                ),
                            },
                            {
                                key: "attributes",
                                label: "Attributes",
                                render: (row) => `${row.attributes.length} attrs`,
                            },
                        ]}
                        rows={personas}
                        rowKey={(row) => row.id}
                    />
                )}
            </Card>
        </div>
    );
}
