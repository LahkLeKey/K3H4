import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";

import { Badge, Button, Card, Histogram, Input, Sparkline, StatChip, Table, Tabs, Textarea } from "../radix-primitives";
import { useAuthStore } from "../react-hooks/auth";
import {
    usePersonaState,
    type PersonaCompatibility,
    type PersonaConfusionResult,
} from "../react-hooks/persona";
import { R3FErrorBoundary } from "../r3f-components/R3FErrorBoundary";
import { NodeLinkGraph } from "../r3f-primitives/NodeLinkGraph";

const formatNumber = (value: number | string | null | undefined) => {
    if (value === null || value === undefined) return "--";
    const num = typeof value === "string" ? Number(value) : value;
    if (!Number.isFinite(num)) return String(value);
    return num.toLocaleString();
};

const parseAttributes = (input: string) =>
    input
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const [main, weightToken] = line.split("|").map((token) => token.trim());
            const [categoryRaw, valuesRaw] = (main.includes(":") ? main.split(":") : main.split("=")).map((token) => token.trim());
            const category = categoryRaw?.toLowerCase();
            const values = (valuesRaw || "")
                .split(/[;,]/)
                .map((value) => value.trim())
                .filter(Boolean);
            if (!category || values.length === 0) return null;
            const weight = weightToken ? Number(weightToken.replace(/[^0-9.-]/g, "")) : undefined;
            return { category, values, weight: Number.isFinite(weight) ? weight : undefined } as {
                category: string;
                values: string[];
                weight?: number;
            };
        })
        .filter(Boolean) as { category: string; values: string[]; weight?: number }[];

const KpiCard = ({ label, value, hint, trend = [], accent = "#22d3ee" }: { label: string; value: string; hint?: string; trend?: number[]; accent?: string }) => (
    <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-lg">
        <div className="flex items-start justify-between gap-3">
            <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{label}</div>
                <div className="text-2xl font-semibold text-white">{value}</div>
            </div>
            {hint ? <span className="rounded-full border border-white/10 px-2 py-1 text-[11px] text-slate-300">{hint}</span> : null}
        </div>
        <div className="mt-2">
            <Sparkline values={trend} color={accent} />
        </div>
    </div>
);

const CompatibilityRow = ({ compat }: { compat: PersonaCompatibility }) => {
    const overlap = compat.overlappingTokens.slice(0, 4);
    return (
        <div className="grid grid-cols-5 items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-sm text-white">
            <div className="truncate">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-400">Pair</div>
                <div className="font-semibold">{compat.source.alias}</div>
                <div className="text-[11px] text-slate-400">{compat.target.alias}</div>
            </div>
            <div className="text-center">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-400">Jaccard</div>
                <div className="text-lg font-semibold text-emerald-200">{compat.jaccardScore.toFixed(3)}</div>
            </div>
            <div className="text-center">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-400">Overlap</div>
                <div className="text-sm text-white">{overlap.join(" ") || "--"}</div>
            </div>
            <div className="text-center">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-400">Tokens</div>
                <div className="text-sm text-white">{compat.intersectionCount} / {compat.unionCount}</div>
            </div>
            <div className="text-right text-[11px] text-slate-400">{new Date(compat.computedAt).toLocaleString()}</div>
        </div>
    );
};

const ConfusionSummary = ({ result }: { result: PersonaConfusionResult }) => (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatChip label="Accuracy" value={`${(result.metrics.accuracy * 100).toFixed(1)}%`} accent="#22d3ee" />
        <StatChip label="Precision" value={`${(result.metrics.precision * 100).toFixed(1)}%`} accent="#a78bfa" />
        <StatChip label="Recall" value={`${(result.metrics.recall * 100).toFixed(1)}%`} accent="#f59e0b" />
        <StatChip label="F1" value={`${(result.metrics.f1 * 100).toFixed(1)}%`} accent="#4ade80" />
        <StatChip label="Evaluated" value={formatNumber(result.evaluated)} accent="#f472b6" />
    </div>
);

export function PersonaDashboard() {
    const { session } = useAuthStore();
    const {
        personas,
        stats,
        status,
        error,
        compatibilities,
        compatStatus,
        compatError,
        confusion,
        confusionStatus,
        confusionError,
        fetchPersonas,
        generatePersonas,
        createPersona,
        updateAttributes,
        fetchCompatibilities,
        recomputeCompatibilities,
        runConfusion,
    } = usePersonaState();

    const [selectedPersonaId, setSelectedPersonaId] = useState<string | undefined>(undefined);
    const [activeTab, setActiveTab] = useState("overview");
    const [rosterQuery, setRosterQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [sortKey, setSortKey] = useState<"alias" | "attributes">("attributes");

    const [newAlias, setNewAlias] = useState("");
    const [newAccount, setNewAccount] = useState("");
    const [newHandle, setNewHandle] = useState("");
    const [newTags, setNewTags] = useState("");
    const [newNote, setNewNote] = useState("");
    const [generateCount, setGenerateCount] = useState(2);
    const [creating, setCreating] = useState(false);
    const [seeding, setSeeding] = useState(false);

    const [attributesInput, setAttributesInput] = useState("stack: node, python | weight=1\nindustry: fintech, logistics");
    const parsedAttributes = useMemo(() => parseAttributes(attributesInput), [attributesInput]);

    const [pairRows, setPairRows] = useState<{ id: string; sourceId?: string; targetId?: string; label: boolean }[]>([
        { id: "pair-0", label: true },
    ]);
    const [threshold, setThreshold] = useState(0.5);
    const [modelPath, setModelPath] = useState("");
    const [showGraph, setShowGraph] = useState(false);

    useEffect(() => {
        if (session?.accessToken && status === "idle") void fetchPersonas();
    }, [session?.accessToken, status, fetchPersonas]);

    useEffect(() => {
        if (!selectedPersonaId && personas[0]) setSelectedPersonaId(personas[0].id);
    }, [personas, selectedPersonaId]);

    useEffect(() => {
        if (session?.accessToken && compatStatus === "idle") void fetchCompatibilities();
    }, [session?.accessToken, compatStatus, fetchCompatibilities]);

    const authed = Boolean(session?.accessToken);

    const tagCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        personas.forEach((persona) => {
            (persona.tags || []).forEach((tag) => {
                counts[tag] = (counts[tag] || 0) + 1;
            });
        });
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6);
    }, [personas]);

    const filteredPersonas = useMemo(() => {
        const query = rosterQuery.trim().toLowerCase();
        let rows = personas;
        if (query) {
            rows = rows.filter((p) => [p.alias, p.account, (p.tags || []).join(" ")].some((field) => field.toLowerCase().includes(query)));
        }
        if (selectedTag) {
            rows = rows.filter((p) => (p.tags || []).includes(selectedTag));
        }
        const sorted = [...rows].sort((a, b) => {
            if (sortKey === "alias") return a.alias.localeCompare(b.alias);
            return b.attributes.length - a.attributes.length;
        });
        return sorted;
    }, [personas, rosterQuery, selectedTag, sortKey]);

    const compatBins = useMemo(() => {
        const buckets = [0, 0, 0, 0, 0];
        compatibilities.forEach((row) => {
            const idx = Math.min(4, Math.floor(row.jaccardScore * 5));
            buckets[idx] += 1;
        });
        return buckets;
    }, [compatibilities]);

    const scoreTrend = useMemo(() => compatibilities.slice(0, 12).map((c) => c.jaccardScore), [compatibilities]);
    const attributeTrend = useMemo(() => personas.slice(0, 12).map((p) => p.attributes.length), [personas]);
    const compatTop = useMemo(() => compatibilities.slice(0, 8), [compatibilities]);
    const personaOptions = personas.map((p) => ({ value: p.id, label: p.alias }));

    const statusText = error || (status === "loading" ? "Loading personas..." : "Live");
    const compatText = compatError || (compatStatus === "loading" ? "Refreshing..." : `${compatibilities.length} pairs`);

    const kpis = [
        { label: "Personas", value: formatNumber(stats.total), hint: "Roster", trend: attributeTrend, accent: "#a78bfa" },
        { label: "Attributes", value: formatNumber(stats.attributes), hint: "Depth", trend: attributeTrend, accent: "#22d3ee" },
        { label: "Compatibility pairs", value: formatNumber(compatibilities.length), hint: compatText, trend: scoreTrend, accent: "#f59e0b" },
        { label: "Confusion runs", value: confusion ? "Latest" : "Pending", hint: confusion ? `${(confusion.metrics.f1 * 100).toFixed(1)}% F1` : "Awaiting pairs", trend: scoreTrend, accent: "#10b981" },
    ];

    const validPairs = useMemo(
        () => pairRows.filter((row) => row.sourceId && row.targetId) as Required<Omit<typeof pairRows[number], "id"> & { id: string }>[],
        [pairRows],
    );

    const handleCreate = async () => {
        if (!newAlias.trim() || !newAccount.trim()) return;
        setCreating(true);
        await createPersona({
            alias: newAlias.trim(),
            account: newAccount.trim(),
            handle: newHandle.trim() || undefined,
            note: newNote.trim() || undefined,
            tags: newTags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
        });
        setCreating(false);
        setNewAlias("");
        setNewAccount("");
        setNewHandle("");
        setNewTags("");
        setNewNote("");
    };

    const handleGenerate = async () => {
        const count = Number.isFinite(Number(generateCount)) ? Number(generateCount) : 2;
        setSeeding(true);
        await generatePersonas(count);
        setSeeding(false);
    };

    const handleAttributesSave = async () => {
        if (!selectedPersonaId || parsedAttributes.length === 0) return;
        await updateAttributes(selectedPersonaId, parsedAttributes);
        await fetchCompatibilities(selectedPersonaId);
    };

    const handleRunConfusion = async () => {
        if (validPairs.length === 0) return;
        const clamped = Math.min(Math.max(Number(threshold) || 0.5, 0), 1);
        await runConfusion({
            pairs: validPairs.map((row) => ({ sourceId: row.sourceId!, targetId: row.targetId!, label: row.label })),
            threshold: clamped,
            modelPath: modelPath.trim() || undefined,
        });
    };

    const overviewTab = (
        <div className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-emerald-200/80">Persona</p>
                    <h2 className="text-2xl font-semibold text-white">Persona dashboard</h2>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                        <span className="rounded-full border border-white/10 px-3 py-1">{authed ? "Authenticated" : "Sign in required"}</span>
                        <span className="rounded-full border border-white/10 px-3 py-1">{statusText}</span>
                        <span className="rounded-full border border-white/10 px-3 py-1">Compat {compatText}</span>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button accent="#22d3ee" onClick={() => fetchPersonas()} disabled={status === "loading"}>
                        {status === "loading" ? "Refreshing..." : "Refresh"}
                    </Button>
                    <Button accent="#a78bfa" onClick={handleGenerate} disabled={seeding}>
                        {seeding ? "Seeding..." : `Generate ${generateCount}`}
                    </Button>
                    <Button accent="#f59e0b" onClick={() => recomputeCompatibilities()} disabled={compatStatus === "loading"}>
                        {compatStatus === "loading" ? "Recomputing..." : "Recompute"}
                    </Button>
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {kpis.map((kpi) => (
                    <KpiCard key={kpi.label} {...kpi} />
                ))}
            </div>

            <Card
                eyebrow="Compatibility"
                title="Score distribution"
                actions={<Badge accent="#0ea5e9">Jaccard + ONNX</Badge>}
            >
                <Histogram bins={compatBins} labels={["0-0.2", "0.2-0.4", "0.4-0.6", "0.6-0.8", "0.8-1.0"]} footer={`Pairs: ${compatibilities.length}`} />
                <div className="mt-3 space-y-2">
                    {compatTop.length === 0 ? (
                        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">No compatibility rows yet.</div>
                    ) : (
                        compatTop.map((compat) => <CompatibilityRow key={compat.id} compat={compat} />)
                    )}
                </div>
            </Card>
        </div>
    );

    const rosterTab = (
        <div className="space-y-4">
            <Card eyebrow="Roster" title="Persona workspace" actions={<Badge accent="#22d3ee">Live roster</Badge>}>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                    <Input
                        placeholder="Search alias, account, tag"
                        value={rosterQuery}
                        onChange={(e) => setRosterQuery(e.target.value)}
                        className="min-w-[220px]"
                    />
                    <select
                        value={sortKey}
                        onChange={(e) => setSortKey(e.target.value as "alias" | "attributes")}
                        className="h-10 rounded-xl border border-white/15 bg-slate-900/60 px-3 text-sm text-white"
                    >
                        <option value="attributes">Sort by attributes</option>
                        <option value="alias">Sort by alias</option>
                    </select>
                    {error ? <span className="text-amber-300">{error}</span> : null}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                    <span className="rounded-full border border-white/10 px-3 py-1">{filteredPersonas.length} shown</span>
                    <span className="rounded-full border border-white/10 px-3 py-1">{personas.length} total</span>
                    {tagCounts.map(([tag, count]) => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => setSelectedTag((current) => (current === tag ? null : tag))}
                            className={`rounded-full border px-3 py-1 text-[11px] transition ${selectedTag === tag ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-50" : "border-white/10 bg-white/5 text-slate-200 hover:border-white/30"}`}
                        >
                            {tag} · {count}
                        </button>
                    ))}
                    {selectedTag ? (
                        <button
                            type="button"
                            onClick={() => setSelectedTag(null)}
                            className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-slate-200 hover:border-white/30"
                        >
                            Clear tag
                        </button>
                    ) : null}
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Input placeholder="Alias" value={newAlias} onChange={(e) => setNewAlias(e.target.value)} />
                            <Input placeholder="Account" value={newAccount} onChange={(e) => setNewAccount(e.target.value)} />
                        </div>
                        <Input placeholder="Handle (optional)" value={newHandle} onChange={(e) => setNewHandle(e.target.value)} />
                        <Input placeholder="Tags comma separated" value={newTags} onChange={(e) => setNewTags(e.target.value)} />
                        <Textarea rows={3} placeholder="Note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                        <div className="flex flex-wrap items-center gap-2">
                            <Button accent="#22c55e" onClick={handleCreate} disabled={creating || !newAlias.trim() || !newAccount.trim()}>
                                {creating ? "Saving..." : "Create"}
                            </Button>
                            <Input
                                type="number"
                                min={1}
                                max={10}
                                value={generateCount}
                                onChange={(e) => setGenerateCount(Number(e.target.value))}
                                className="w-20"
                            />
                            <Button accent="#a78bfa" onClick={handleGenerate} disabled={seeding}>
                                {seeding ? "Seeding..." : "Generate"}
                            </Button>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>Roster ({filteredPersonas.length})</span>
                            <span>{authed ? "Live" : "Auth required"}</span>
                        </div>
                        {filteredPersonas.length === 0 ? (
                            <div className="mt-2 rounded-xl border border-white/10 bg-white/5 px-3 py-4 text-sm text-slate-200">
                                {session ? "No personas match filters. Adjust search or tag." : "Sign in to view personas."}
                            </div>
                        ) : (
                            <Table
                                columns={[
                                    { key: "alias", label: "Alias" },
                                    { key: "account", label: "Account" },
                                    { key: "tags", label: "Tags", render: (row) => (row.tags || []).join(", ") || "--" },
                                    { key: "attributes", label: "Attributes", render: (row) => row.attributes.length },
                                    {
                                        key: "actions",
                                        label: "Actions",
                                        render: (row) => (
                                            <div className="flex items-center gap-2 text-[11px]">
                                                <button
                                                    type="button"
                                                    className="rounded border border-white/15 px-2 py-1 text-white hover:border-emerald-300/60"
                                                    onClick={() => {
                                                        setSelectedPersonaId(row.id);
                                                        setActiveTab("attributes");
                                                    }}
                                                >
                                                    Edit attributes
                                                </button>
                                                <button
                                                    type="button"
                                                    className="rounded border border-white/15 px-2 py-1 text-white hover:border-sky-300/60"
                                                    onClick={() => {
                                                        setSelectedPersonaId(row.id);
                                                        setActiveTab("compatibility");
                                                    }}
                                                >
                                                    View compat
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                rows={filteredPersonas}
                                rowKey={(row) => row.id}
                                className="mt-2"
                            />
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );

    const compatibilityTab = (
        <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                <Button accent="#0ea5e9" onClick={() => fetchCompatibilities(selectedPersonaId)} disabled={compatStatus === "loading"}>
                    {compatStatus === "loading" ? "Fetching..." : "Fetch"}
                </Button>
                <Button accent="#f59e0b" onClick={() => recomputeCompatibilities()} disabled={compatStatus === "loading"}>
                    {compatStatus === "loading" ? "Recomputing..." : "Recompute"}
                </Button>
                <span className="rounded-full border border-white/10 px-3 py-1">{compatText}</span>
                {compatError ? <span className="text-amber-300">{compatError}</span> : null}
                {compatibilities.length > 0 ? (
                    <button
                        type="button"
                        className={`rounded-full border px-3 py-1 text-[11px] transition ${showGraph ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-50" : "border-white/10 bg-white/5 text-slate-200 hover:border-white/30"}`}
                        onClick={() => setShowGraph((prev) => !prev)}
                    >
                        {showGraph ? "Hide graph" : "Show graph"}
                    </button>
                ) : null}
            </div>
            <Histogram bins={compatBins} labels={["0-0.2", "0.2-0.4", "0.4-0.6", "0.6-0.8", "0.8-1.0"]} footer={`Pairs: ${compatibilities.length}`} />
            {showGraph && compatibilities.length > 0 ? (
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-2">
                    <R3FErrorBoundary>
                        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 6, 10], fov: 55 }} style={{ height: 340 }}>
                            <color attach="background" args={["#0b1224"]} />
                            <NodeLinkGraph
                                nodes={Array.from(
                                    new Map(
                                        compatibilities.flatMap((c) => [
                                            [c.source.id, { id: c.source.id, label: c.source.alias }],
                                            [c.target.id, { id: c.target.id, label: c.target.alias }],
                                        ]),
                                    ).values(),
                                )}
                                links={compatibilities.slice(0, 24).map((c) => ({
                                    source: c.source.id,
                                    target: c.target.id,
                                    weight: c.jaccardScore,
                                }))}
                                color="#a78bfa"
                                linkColor="#22d3ee"
                            />
                        </Canvas>
                    </R3FErrorBoundary>
                </div>
            ) : null}
            <div className="space-y-2">
                {compatTop.length === 0 ? (
                    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">No compatibility rows yet.</div>
                ) : (
                    compatTop.map((compat) => <CompatibilityRow key={compat.id} compat={compat} />)
                )}
            </div>
        </div>
    );

    const attributesTab = (
        <div className="grid gap-3 md:grid-cols-3">
            <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.16em] text-slate-400">Persona</label>
                <select
                    value={selectedPersonaId || ""}
                    onChange={(e) => setSelectedPersonaId(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-3 py-2 text-sm text-white"
                >
                    <option value="" disabled>
                        Select persona
                    </option>
                    {personaOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <div className="text-[11px] text-slate-400">Replace all attributes for the selected persona.</div>
                <Button accent="#f59e0b" onClick={handleAttributesSave} disabled={!selectedPersonaId || parsedAttributes.length === 0}>
                    Save attributes
                </Button>
            </div>
            <div className="md:col-span-2">
                <Textarea
                    rows={6}
                    value={attributesInput}
                    onChange={(e) => setAttributesInput(e.target.value)}
                    placeholder="category: value1, value2 | weight=1"
                />
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-300">
                    <span className="rounded-full border border-white/10 px-2 py-1">Parsed {parsedAttributes.length} entries</span>
                    {parsedAttributes.map((attr, idx) => (
                        <span key={`${attr.category}-${idx}`} className="rounded-full bg-white/10 px-2 py-1">
                            {attr.category}: {attr.values.join("/")}
                            {attr.weight ? ` (w${attr.weight})` : ""}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );

    const qualityTab = (
        <div className="space-y-3">
            <div className="grid gap-3 lg:grid-cols-3">
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.16em] text-slate-400">Threshold (0-1)</label>
                    <Input
                        type="number"
                        min={0}
                        max={1}
                        step={0.01}
                        value={threshold}
                        onChange={(e) => setThreshold(Number(e.target.value))}
                    />
                    <Input
                        placeholder="Optional ONNX model path"
                        value={modelPath}
                        onChange={(e) => setModelPath(e.target.value)}
                    />
                    <Button accent="#e11d48" onClick={handleRunConfusion} disabled={confusionStatus === "loading" || validPairs.length === 0}>
                        {confusionStatus === "loading" ? "Scoring..." : "Run confusion"}
                    </Button>
                    {confusionError ? <div className="text-xs text-amber-300">{confusionError}</div> : null}
                    {validPairs.length === 0 ? <div className="text-xs text-slate-400">Add at least one labeled pair.</div> : null}
                </div>
                <div className="lg:col-span-2 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Pairs ({pairRows.length})</span>
                        <button
                            type="button"
                            className="rounded border border-white/15 px-2 py-1 text-[11px] text-white"
                            onClick={() =>
                                setPairRows((rows) => [...rows, { id: `pair-${rows.length}`, label: rows.length % 2 === 0 }])
                            }
                        >
                            Add pair
                        </button>
                    </div>
                    <div className="space-y-2">
                        {pairRows.map((row) => (
                            <div key={row.id} className="grid grid-cols-5 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-2 text-sm text-white">
                                <select
                                    value={row.sourceId || ""}
                                    onChange={(e) =>
                                        setPairRows((rows) => rows.map((r) => (r.id === row.id ? { ...r, sourceId: e.target.value } : r)))
                                    }
                                    className="col-span-2 rounded border border-white/15 bg-slate-950/60 px-2 py-2 text-sm"
                                >
                                    <option value="">Source</option>
                                    {personaOptions.map((opt) => (
                                        <option key={`s-${opt.value}`} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={row.targetId || ""}
                                    onChange={(e) =>
                                        setPairRows((rows) => rows.map((r) => (r.id === row.id ? { ...r, targetId: e.target.value } : r)))
                                    }
                                    className="col-span-2 rounded border border-white/15 bg-slate-950/60 px-2 py-2 text-sm"
                                >
                                    <option value="">Target</option>
                                    {personaOptions.map((opt) => (
                                        <option key={`t-${opt.value}`} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                <label className="flex items-center gap-2 text-xs text-slate-200">
                                    <input
                                        type="checkbox"
                                        checked={row.label}
                                        onChange={(e) =>
                                            setPairRows((rows) => rows.map((r) => (r.id === row.id ? { ...r, label: e.target.checked } : r)))
                                        }
                                    />
                                    Match
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {confusion ? (
                <div className="space-y-3">
                    <ConfusionSummary result={confusion} />
                    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-200">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full border border-white/10 px-2 py-1">TP {confusion.counts.tp}</span>
                            <span className="rounded-full border border-white/10 px-2 py-1">FP {confusion.counts.fp}</span>
                            <span className="rounded-full border border-white/10 px-2 py-1">TN {confusion.counts.tn}</span>
                            <span className="rounded-full border border-white/10 px-2 py-1">FN {confusion.counts.fn}</span>
                            <span className="rounded-full border border-white/10 px-2 py-1">Threshold {confusion.threshold}</span>
                            <span className="rounded-full border border-white/10 px-2 py-1">Missing {confusion.missing}</span>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );

    return (
        <div className="space-y-4">
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                tabs={[
                    { key: "overview", label: "Overview", content: overviewTab },
                    { key: "roster", label: "Roster", content: rosterTab },
                    { key: "compatibility", label: "Compatibility", content: compatibilityTab },
                    { key: "quality", label: "Quality", content: qualityTab },
                    { key: "attributes", label: "Attributes", content: attributesTab },
                ]}
            />
        </div>
    );
}
