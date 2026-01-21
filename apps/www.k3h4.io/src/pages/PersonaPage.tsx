import { useEffect, useMemo, useState } from "react";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { PageHeader } from "../components/PageHeader";
import { R3FErrorBoundary } from "../r3f-components/R3FErrorBoundary";
import { Badge, Button, Card, Input, StatChip, Table, Textarea } from "../radix-primitives";
import { useAuthStore } from "../react-hooks/auth";
import {
    usePersonaState,
    type PersonaCompatibility,
    type PersonaConfusionResult,
} from "../react-hooks/persona";

const endpoints = [
    { method: "GET", path: "/personas", description: "List personas and seed defaults if empty." },
    { method: "POST", path: "/personas", description: "Create a persona with alias, account, and optional tags/notes." },
    { method: "POST", path: "/personas/generate", description: "Generate a handful of faker personas plus starter attributes." },
    { method: "PUT", path: "/personas/{id}/attributes", description: "Replace attributes for a persona (category + values + optional weight)." },
    { method: "POST", path: "/personas/compatibility/recompute", description: "Rebuild pairwise compatibility (Jaccard + ONNX features)." },
    { method: "GET", path: "/personas/compatibility", description: "Read compatibility graph, optionally filtered by persona." },
    { method: "POST", path: "/personas/compatibility/confusion", description: "Score labeled pairs to see precision/recall at a threshold." },
] as const;

type Endpoint = (typeof endpoints)[number];

type AttributeDraft = { category: string; values: string[]; weight?: number };

type PairRow = { id: string; sourceId?: string; targetId?: string; label: boolean };

const methodColors: Record<Endpoint["method"], string> = {
    GET: "border-emerald-400/40 bg-emerald-500/10 text-emerald-100",
    POST: "border-sky-400/40 bg-sky-500/10 text-sky-100",
    PUT: "border-amber-400/40 bg-amber-500/10 text-amber-100",
};

const parseAttributes = (input: string): AttributeDraft[] =>
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
            return { category, values, weight: Number.isFinite(weight) ? weight : undefined } as AttributeDraft;
        })
        .filter((entry): entry is AttributeDraft => Boolean(entry));

const formatNumber = (value: number | string | null | undefined) => {
    if (value === null || value === undefined) return "--";
    const num = typeof value === "string" ? Number(value) : value;
    if (!Number.isFinite(num)) return String(value);
    return num.toLocaleString();
};

const OrbitingStars = () => (
    <>
        <Stars radius={150} depth={120} count={1900} factor={1.0} saturation={0.06} fade speed={0.24} />
        <Stars radius={95} depth={70} count={1200} factor={0.82} saturation={0.08} fade speed={0.42} />
    </>
);

const MethodBadge = ({ method }: { method: Endpoint["method"] }) => (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${methodColors[method]}`}>{method}</span>
);

const EndpointCard = ({ endpoint }: { endpoint: Endpoint }) => (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg transition hover:border-white/20 hover:bg-white/10">
        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <MethodBadge method={endpoint.method} />
                <span className="font-mono text-xs text-emerald-50/90">{endpoint.path}</span>
            </div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">Persona</span>
        </div>
        <p className="mt-2 text-sm text-slate-200">{endpoint.description}</p>
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

export function PersonaPage() {
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

    const [newAlias, setNewAlias] = useState("");
    const [newAccount, setNewAccount] = useState("");
    const [newHandle, setNewHandle] = useState("");
    const [newTags, setNewTags] = useState("");
    const [newNote, setNewNote] = useState("");
    const [generateCount, setGenerateCount] = useState(2);
    const [creating, setCreating] = useState(false);
    const [seeding, setSeeding] = useState(false);

    const [selectedPersonaId, setSelectedPersonaId] = useState<string | undefined>(undefined);
    const [attributesInput, setAttributesInput] = useState("stack: node, python | weight=1\nindustry: fintech, logistics");
    const parsedAttributes = useMemo(() => parseAttributes(attributesInput), [attributesInput]);

    const [pairRows, setPairRows] = useState<PairRow[]>([{ id: "pair-0", label: true }]);
    const [threshold, setThreshold] = useState(0.5);
    const [modelPath, setModelPath] = useState("");

    useEffect(() => {
        if (session?.accessToken && status === "idle") void fetchPersonas();
    }, [session?.accessToken, status, fetchPersonas]);

    useEffect(() => {
        if (!selectedPersonaId && personas[0]) setSelectedPersonaId(personas[0].id);
    }, [personas, selectedPersonaId]);

    useEffect(() => {
        if (session?.accessToken && compatStatus === "idle") void fetchCompatibilities();
    }, [session?.accessToken, compatStatus, fetchCompatibilities]);

    const handleCreate = async () => {
        if (!newAlias.trim() || !newAccount.trim()) return;
        setCreating(true);
        await createPersona({
            alias: newAlias.trim(),
            account: newAccount.trim(),
            handle: newHandle.trim() || undefined,
            note: newNote.trim() || undefined,
            tags: newTags
                .split(',')
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

    const validPairs = useMemo(
        () => pairRows.filter((row) => row.sourceId && row.targetId) as Required<Omit<PairRow, "id"> & { id: string }>[],
        [pairRows],
    );

    const handleRunConfusion = async () => {
        if (validPairs.length === 0) return;
        const clamped = Math.min(Math.max(Number(threshold) || 0.5, 0), 1);
        await runConfusion({
            pairs: validPairs.map((row) => ({
                sourceId: row.sourceId!,
                targetId: row.targetId!,
                label: row.label,
            })),
            threshold: clamped,
            modelPath: modelPath.trim() || undefined,
        });
    };

    const compatTop = useMemo(() => compatibilities.slice(0, 8), [compatibilities]);

    const statusText = error || (status === "loading" ? "Loading personas..." : "Live");
    const compatText = compatError || (compatStatus === "loading" ? "Refreshing..." : `${compatibilities.length} pairs`);

    const personaOptions = personas.map((p) => ({ value: p.id, label: p.alias }));

    return (
        <div className="relative min-h-screen w-screen overflow-hidden bg-slate-950 text-white">
            <div className="pointer-events-none absolute inset-0">
                <R3FErrorBoundary>
                    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 9], fov: 45 }} gl={{ antialias: true, alpha: false }}>
                        <color attach="background" args={["#020617"]} />
                        <ambientLight intensity={0.18} color="#cbd5e1" />
                        <OrbitingStars />
                    </Canvas>
                </R3FErrorBoundary>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.12),transparent_40%),radial-gradient(circle_at_75%_10%,rgba(56,189,248,0.12),transparent_38%),radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.12),transparent_38%)]" />
            </div>

            <div className="relative z-10 flex min-h-screen flex-col">
                <PageHeader className="sticky top-0 z-20" />
                <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/85 p-6 shadow-2xl backdrop-blur">
                        <p className="text-xs uppercase tracking-[0.28em] text-emerald-200/80">Personas</p>
                        <h1 className="mt-2 text-3xl font-semibold text-white">Persona management + compatibility</h1>
                        <p className="mt-2 text-sm text-slate-200">
                            Covers the persona CRUD endpoints, compatibility recompute, graph reads, and labeled confusion runs for ONNX scoring.
                        </p>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            <StatChip label="Personas" value={formatNumber(stats.total)} accent="#c084fc" />
                            <StatChip label="Attributes" value={formatNumber(stats.attributes)} accent="#22d3ee" />
                            <StatChip label="Compatibility pairs" value={formatNumber(compatibilities.length)} accent="#f59e0b" />
                            <StatChip label="Status" value={statusText} accent="#22c55e" />
                        </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-3">
                        {endpoints.map((ep) => (
                            <EndpointCard key={ep.path + ep.method} endpoint={ep} />
                        ))}
                    </div>

                    <Card
                        eyebrow="Primary endpoints"
                        title="Persona roster"
                        actions={
                            <div className="flex items-center gap-2">
                                <Badge accent="#22d3ee">GET /personas</Badge>
                                <Badge accent="#a78bfa">POST /personas</Badge>
                            </div>
                        }
                    >
                        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-300">
                            <Button accent="#22d3ee" onClick={() => fetchPersonas()} disabled={status === "loading"}>
                                Refresh
                            </Button>
                            <span className="rounded-full border border-white/10 px-3 py-1">{statusText}</span>
                            {error ? <span className="text-amber-300">{error}</span> : null}
                        </div>

                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                            <div className="space-y-2">
                                <Input placeholder="Alias" value={newAlias} onChange={(e) => setNewAlias(e.target.value)} />
                                <Input placeholder="Account" value={newAccount} onChange={(e) => setNewAccount(e.target.value)} />
                                <Input placeholder="Handle (optional)" value={newHandle} onChange={(e) => setNewHandle(e.target.value)} />
                                <Input placeholder="Tags comma separated" value={newTags} onChange={(e) => setNewTags(e.target.value)} />
                                <Textarea rows={3} placeholder="Note" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
                                <div className="flex items-center gap-2">
                                    <Button accent="#22c55e" onClick={handleCreate} disabled={creating || !newAlias.trim() || !newAccount.trim()}>
                                        {creating ? "Saving..." : "Create persona"}
                                    </Button>
                                    <div className="flex items-center gap-2">
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
                            </div>
                            <div>
                                <div className="flex items-center justify-between text-xs text-slate-400">
                                    <span>Current personas ({personas.length})</span>
                                    <span>GET /personas</span>
                                </div>
                                {personas.length === 0 ? (
                                    <div className="mt-2 rounded-xl border border-white/10 bg-white/5 px-3 py-4 text-sm text-slate-200">
                                        {session ? "No personas yet. Use Generate to seed." : "Sign in to view personas."}
                                    </div>
                                ) : (
                                    <Table
                                        columns={[
                                            { key: "alias", label: "Alias" },
                                            { key: "account", label: "Account" },
                                            { key: "tags", label: "Tags", render: (row) => row.tags.join(", ") || "--" },
                                            { key: "attributes", label: "Attributes", render: (row) => row.attributes.length },
                                        ]}
                                        rows={personas}
                                        rowKey={(row) => row.id}
                                        className="mt-2"
                                    />
                                )}
                            </div>
                        </div>
                    </Card>

                    <Card
                        eyebrow="PUT /personas/{id}/attributes"
                        title="Attribute writer"
                        actions={<Badge accent="#f59e0b">Replace</Badge>}
                    >
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
                                <div className="text-[11px] text-slate-400">Attributes are fully replaced for the persona.</div>
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
                    </Card>

                    <Card
                        eyebrow="Compatibility graph"
                        title="Jaccard + ONNX"
                        actions={
                            <div className="flex items-center gap-2 text-xs text-slate-300">
                                <Badge accent="#0ea5e9">GET /personas/compatibility</Badge>
                                <Badge accent="#f59e0b">POST /personas/compatibility/recompute</Badge>
                            </div>
                        }
                    >
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                            <Button accent="#0ea5e9" onClick={() => fetchCompatibilities(selectedPersonaId)} disabled={compatStatus === "loading"}>
                                Fetch
                            </Button>
                            <Button accent="#f59e0b" onClick={() => recomputeCompatibilities()} disabled={compatStatus === "loading"}>
                                Recompute
                            </Button>
                            <span className="rounded-full border border-white/10 px-3 py-1">{compatText}</span>
                            {compatError ? <span className="text-amber-300">{compatError}</span> : null}
                        </div>
                        <div className="mt-3 space-y-2">
                            {compatTop.length === 0 ? (
                                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">No compatibility rows yet.</div>
                            ) : (
                                compatTop.map((compat) => <CompatibilityRow key={compat.id} compat={compat} />)
                            )}
                        </div>
                    </Card>

                    <Card
                        eyebrow="POST /personas/compatibility/confusion"
                        title="Confusion analysis"
                        actions={<Badge accent="#e11d48">Evaluate</Badge>}
                    >
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
                                            setPairRows((rows) => [
                                                ...rows,
                                                { id: `pair-${rows.length}`, label: rows.length % 2 === 0 },
                                            ])
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
                                                    setPairRows((rows) =>
                                                        rows.map((r) => (r.id === row.id ? { ...r, sourceId: e.target.value } : r)),
                                                    )
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
                                                    setPairRows((rows) =>
                                                        rows.map((r) => (r.id === row.id ? { ...r, targetId: e.target.value } : r)),
                                                    )
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
                                                        setPairRows((rows) =>
                                                            rows.map((r) => (r.id === row.id ? { ...r, label: e.target.checked } : r)),
                                                        )
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
                            <div className="mt-4 space-y-3">
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
                    </Card>
                </main>
            </div>
        </div>
    );
}
