import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { faker } from "@faker-js/faker";
import { Tabs } from "../components/radix-primitives";
import { Badge, Button, Card, FormField, Input, SectionHeader, Table, TableCard, Textarea } from "../components/ui";
import type { TableColumn } from "../components/ui";
import { StarfieldLayout } from "../components/radix-components/StarfieldLayout";
import { useAuthStore } from "../react-hooks/auth";
import { buildApiUrl } from "../react-hooks/lib/apiBase";
import type { FormEvent } from "react";

type ChatSessionSummary = {
    id: string;
    title: string | null;
    systemPrompt: string | null;
    model: string;
    temperature: number | null;
    metadata: unknown | null;
    createdAt: string;
    updatedAt: string;
    messageCount: number;
    lastMessage: { role: string; content: string; createdAt: string } | null;
};

type ChatMessage = {
    id: string;
    role: "SYSTEM" | "USER" | "ASSISTANT";
    content: string;
    metadata?: unknown | null;
    createdAt: string;
};

type AiInsight = {
    id: string;
    description: string;
    targetType: string | null;
    targetId: string | null;
    targetLabel: string | null;
    metadata: unknown;
    payload: unknown;
    createdAt: string;
    updatedAt: string;
};

type OperationSourceFilter = 'all' | 'chat' | 'insights';
type SessionFilter = 'all' | 'active';

type OllamaOperationRecord = {
    id: string;
    source: OperationSourceFilter;
    model: string;
    temperature: number | null;
    systemPrompt: string | null;
    requestBody: unknown;
    responseBody: unknown;
    metadata: unknown;
    statusCode: number | null;
    errorMessage: string | null;
    sessionId: string | null;
    sessionTitle: string | null;
    createdAt: string;
    updatedAt: string;
};

type OperationStatus = 'success' | 'error';

type OllamaOperationRow = {
    id: string;
    createdAt: string;
    source: string;
    model: string;
    sessionLabel: string;
    status: OperationStatus;
    statusLabel: string;
    systemPrompt: string | null;
    requestPreview: string | null;
    responsePreview: string | null;
    metadataPreview: string | null;
    errorMessage: string | null;
};

const PROXY_OPERATION_LIMIT = 40;
const FILTER_SELECT_CLASS =
    'rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-1.5 text-[11px] text-slate-200 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-500/30';
const SOURCE_FILTER_OPTIONS: Array<{ label: string; value: OperationSourceFilter }> = [
    { label: 'All sources', value: 'all' },
    { label: 'Chat', value: 'chat' },
    { label: 'Insights', value: 'insights' },
];
const SESSION_FILTER_OPTIONS: Array<{ label: string; value: SessionFilter }> = [
    { label: 'All operations', value: 'all' },
    { label: 'Active session', value: 'active' },
];

const gradient = "bg-[radial-gradient(circle_at_15%_10%,rgba(16,185,129,0.15),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(249,115,22,0.18),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(37,99,235,0.12),transparent_45%)]";
const FALLBACK_MODEL = "llama2";
const OLLAMA_LIBRARY_SOURCE_URL = "https://ollama.com/library";

export function AiPage() {
    const { apiBase, session, kickToLogin } = useAuthStore();
    const token = session?.accessToken;
    const [sessions, setSessions] = useState<ChatSessionSummary[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loadingSessions, setLoadingSessions] = useState(false);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [sending, setSending] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [systemPromptDraft, setSystemPromptDraft] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState("Awaiting prompts");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [selectedModel, setSelectedModel] = useState(FALLBACK_MODEL);
    const [installedModels, setInstalledModels] = useState<string[]>([]);
    const [loadingInstalledModels, setLoadingInstalledModels] = useState(false);
    const [modelFetchError, setModelFetchError] = useState<string | null>(null);
    const [missingModel, setMissingModel] = useState<string | null>(null);
    const [insights, setInsights] = useState<AiInsight[]>([]);
    const [loadingInsights, setLoadingInsights] = useState(false);
    const [insightsError, setInsightsError] = useState<string | null>(null);
    const [insightDescription, setInsightDescription] = useState("");
    const [insightTargetType, setInsightTargetType] = useState("");
    const [insightTargetId, setInsightTargetId] = useState("");
    const [insightTargetLabel, setInsightTargetLabel] = useState("");
    const [metadataDraft, setMetadataDraft] = useState("");
    const [payloadDraft, setPayloadDraft] = useState("");
    const [creatingInsight, setCreatingInsight] = useState(false);
    const [createInsightError, setCreateInsightError] = useState<string | null>(null);
    const [insightStatus, setInsightStatus] = useState<string | null>(null);
    const [operations, setOperations] = useState<OllamaOperationRow[]>([]);
    const [loadingOperations, setLoadingOperations] = useState(false);
    const [operationsError, setOperationsError] = useState<string | null>(null);
    const [sourceFilter, setSourceFilter] = useState<OperationSourceFilter>('all');
    const [sessionFilter, setSessionFilter] = useState<SessionFilter>('active');

    const activeSession = useMemo(
        () => sessions.find((item) => item.id === activeSessionId) ?? sessions[0] ?? null,
        [sessions, activeSessionId],
    );
    const selectedModelIsInstalled = installedModels.includes(selectedModel);

    useEffect(() => {
        if (!activeSessionId && sessions.length) {
            setActiveSessionId(sessions[0].id);
        }
    }, [sessions, activeSessionId]);

    const buildHeaders = (json = true) => {
        const headers: Record<string, string> = {};
        if (json) headers["Content-Type"] = "application/json";
        if (token) headers.Authorization = `Bearer ${token}`;
        return headers;
    };

    const handleUnauthorized = useCallback(
        (response: Response) => {
            if (response.status === 401) {
                kickToLogin("Session expired");
                return true;
            }
            return false;
        },
        [kickToLogin],
    );

    const fetchSessions = useCallback(async () => {
        if (!token) return;
        setLoadingSessions(true);
        try {
            setError(null);
            const res = await fetch(buildApiUrl(apiBase, "/chat/sessions"), {
                method: "GET",
                headers: buildHeaders(false),
            });
            if (handleUnauthorized(res)) return;
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.error || "Unable to list sessions");
            setSessions(data.sessions ?? []);
            setStatusMessage("Sessions synchronized");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to fetch sessions");
        } finally {
            setLoadingSessions(false);
        }
    }, [apiBase, token]);

    const fetchInstalledModels = useCallback(async () => {
        if (!token) return;
        setLoadingInstalledModels(true);
        try {
            setModelFetchError(null);
            const headers: Record<string, string> = {};
            if (token) headers.Authorization = `Bearer ${token}`;
            const res = await fetch(buildApiUrl(apiBase, "/chat/models"), {
                method: "GET",
                headers,
            });
            if (handleUnauthorized(res)) return;
            const payload = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(payload.error || "Unable to list Ollama models");
            const raw = Array.isArray(payload.models) ? payload.models : [];
            const normalizedNames: string[] = raw
                .map((item: unknown) => {
                    if (typeof item === "string") return item;
                    if (typeof item === "object" && item !== null) {
                        const record = item as Record<string, unknown>;
                        if (typeof record.name === "string") return record.name;
                        if (typeof record.model === "string") return record.model;
                    }
                    return "";
                })
                .map((name: string) => name.trim())
                .filter((name: string): name is string => name.length > 0);

            const normalized = Array.from(new Set(normalizedNames));
            setInstalledModels(normalized);
            setMissingModel(null);
        } catch (err) {
            setModelFetchError(err instanceof Error ? err.message : "Unable to list Ollama models");
        } finally {
            setLoadingInstalledModels(false);
        }
    }, [apiBase, handleUnauthorized, token]);

    const fetchInsights = useCallback(async () => {
        if (!token) return;
        setLoadingInsights(true);
        try {
            setInsightsError(null);
            const res = await fetch(buildApiUrl(apiBase, "/ai/insights?limit=20"), {
                method: "GET",
                headers: buildHeaders(false),
            });
            if (handleUnauthorized(res)) return;
            const payload = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(payload.error || "Unable to load insights");
            setInsights(Array.isArray(payload.insights) ? payload.insights : []);
        } catch (err) {
            setInsightsError(err instanceof Error ? err.message : "Unable to load insights");
        } finally {
            setLoadingInsights(false);
        }
    }, [apiBase, handleUnauthorized, token]);

    const fetchProxyOperations = useCallback(async () => {
        if (!token) return;
        setLoadingOperations(true);
        try {
            setOperationsError(null);
            const params = new URLSearchParams();
            params.set("limit", PROXY_OPERATION_LIMIT.toString());
            if (sourceFilter !== "all") params.set("source", sourceFilter);
            const sessionQueryId = sessionFilter === "active" ? activeSession?.id ?? null : null;
            if (sessionQueryId) params.set("sessionId", sessionQueryId);
            const res = await fetch(buildApiUrl(apiBase, `/ai/ollama/operations?${params.toString()}`), {
                method: "GET",
                headers: buildHeaders(false),
            });
            if (handleUnauthorized(res)) return;
            const payload = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(payload.error || "Unable to load Ollama operations");
            const raw = Array.isArray(payload.operations) ? payload.operations : [];
            setOperations(raw.map(buildOperationRow));
        } catch (err) {
            setOperationsError(err instanceof Error ? err.message : "Unable to load Ollama operations");
        } finally {
            setLoadingOperations(false);
        }
    }, [activeSession?.id, apiBase, handleUnauthorized, sessionFilter, sourceFilter, token]);

    const handleSaveInsight = useCallback(async () => {
        if (!token) return;
        const trimmedDescription = insightDescription.trim();
        if (!trimmedDescription) {
            setCreateInsightError("Describe the enrichment before saving");
            setInsightStatus(null);
            return;
        }
        let parsedMetadata: unknown | null = null;
        let parsedPayload: unknown | null = null;
        try {
            parsedMetadata = parseJsonInput(metadataDraft, "Metadata");
            parsedPayload = parseJsonInput(payloadDraft, "Payload");
        } catch (err) {
            const message = err instanceof Error ? err.message : "Invalid JSON";
            setCreateInsightError(message);
            setInsightStatus(null);
            return;
        }
        setCreatingInsight(true);
        setCreateInsightError(null);
        try {
            const response = await fetch(buildApiUrl(apiBase, "/ai/insights"), {
                method: "POST",
                headers: buildHeaders(true),
                body: JSON.stringify({
                    description: trimmedDescription,
                    metadata: parsedMetadata ?? undefined,
                    payload: parsedPayload ?? undefined,
                    targetType: insightTargetType.trim() || undefined,
                    targetId: insightTargetId.trim() || undefined,
                    targetLabel: insightTargetLabel.trim() || undefined,
                }),
            });
            if (handleUnauthorized(response)) return;
            const payload = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(payload.error || "Unable to store insight");
            setInsightDescription("");
            setInsightTargetType("");
            setInsightTargetId("");
            setInsightTargetLabel("");
            setMetadataDraft("");
            setPayloadDraft("");
            setInsightStatus("Insight recorded");
            await fetchInsights();
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to record insight";
            setCreateInsightError(message);
            setInsightStatus(null);
        } finally {
            setCreatingInsight(false);
        }
    }, [
        apiBase,
        fetchInsights,
        handleUnauthorized,
        insightDescription,
        insightTargetId,
        insightTargetLabel,
        insightTargetType,
        metadataDraft,
        payloadDraft,
        token,
    ]);

    const seedInsightFields = useCallback(() => {
        const seed = buildInsightSeed();
        setInsightDescription(seed.description);
        setInsightTargetType(seed.targetType);
        setInsightTargetId(seed.targetId);
        setInsightTargetLabel(seed.targetLabel);
        setMetadataDraft(JSON.stringify(seed.metadata, null, 2));
        setPayloadDraft(JSON.stringify(seed.payload, null, 2));
        setInsightStatus("Seeded faker data");
        setCreateInsightError(null);
    }, []);

    const fetchMessages = useCallback(
        async (sessionId?: string) => {
            if (!token || !sessionId) return;
            setLoadingMessages(true);
            try {
                setError(null);
                const res = await fetch(buildApiUrl(apiBase, `/chat/sessions/${sessionId}/messages`), {
                    headers: buildHeaders(false),
                });
                if (handleUnauthorized(res)) return;
                const payload = await res.json().catch(() => ({}));
                if (!res.ok) throw new Error(payload.error || "Unable to load conversation");
                setMessages(payload.messages ?? []);
                setStatusMessage("Conversation loaded");
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unable to load messages");
            } finally {
                setLoadingMessages(false);
            }
        },
        [apiBase, token],
    );

    const createSession = useCallback(async () => {
        if (!token) return;
        if (!selectedModel || !selectedModelIsInstalled) {
            setError("Select a pulled Ollama model before creating a session");
            return;
        }
        setMissingModel(null);
        setLoadingSessions(true);
        try {
            setError(null);
            const res = await fetch(buildApiUrl(apiBase, "/chat/sessions"), {
                method: "POST",
                headers: buildHeaders(true),
                body: JSON.stringify({ systemPrompt: systemPromptDraft || undefined, model: selectedModel }),
            });
            if (handleUnauthorized(res)) return;
            const payload = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(payload.error || "Unable to spin up a chat");
            setSessions((prev) => [payload.session, ...prev.filter((item) => item.id !== payload.session.id)]);
            setActiveSessionId(payload.session.id);
            setMessages([]);
            setSystemPromptDraft("");
            setStatusMessage("New session ready");
        } catch (err) {
            const message = err instanceof Error ? err.message : "Session create failed";
            setMissingModel(parseMissingModelName(message));
            setError(message);
        } finally {
            setLoadingSessions(false);
        }
    }, [apiBase, installedModels, selectedModel, systemPromptDraft, token]);

    const handleSend = useCallback(
        async (event?: FormEvent<HTMLFormElement>) => {
            event?.preventDefault();
            if (!token || !activeSession) return;
            const trimmed = chatInput.trim();
            if (!trimmed) return;
            setSending(true);
            setError(null);
            setMissingModel(null);
            setStatusMessage("Synthesizing response...");
            const optimisticId = `user-${Date.now()}`;
            const optimisticMessage: ChatMessage = {
                id: optimisticId,
                role: "USER",
                content: trimmed,
                createdAt: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, optimisticMessage]);
            setChatInput("");
            try {
                const res = await fetch(buildApiUrl(apiBase, `/chat/sessions/${activeSession.id}/messages`), {
                    method: "POST",
                    headers: buildHeaders(true),
                    body: JSON.stringify({ message: trimmed }),
                });
                if (handleUnauthorized(res)) return;
                const data = await res.json().catch(() => ({}));
                if (!res.ok) throw new Error(data.error || "Chat response failed");
                setMessages((prev) => [
                    ...prev.filter((message) => message.id !== optimisticId),
                    { ...data.message, createdAt: data.message.createdAt },
                ]);
                setStatusMessage("Response ready");
                await fetchSessions();
            } catch (err) {
                setMessages((prev) => prev.filter((message) => message.id !== optimisticId));
                const message = err instanceof Error ? err.message : "Unable to process message";
                setMissingModel(parseMissingModelName(message));
                setError(message);
                setStatusMessage("Ready for another prompt");
            } finally {
                setSending(false);
            }
        },
        [activeSession, apiBase, chatInput, fetchSessions, token],
    );

    useEffect(() => {
        if (session) {
            fetchSessions();
            fetchInstalledModels();
            fetchInsights();
        }
    }, [fetchSessions, fetchInstalledModels, fetchInsights, session]);

    useEffect(() => {
        if (session) {
            fetchProxyOperations();
        } else {
            setOperations([]);
        }
    }, [fetchProxyOperations, session]);

    useEffect(() => {
        if (sessionFilter === 'active' && !activeSession) {
            setSessionFilter('all');
        }
    }, [activeSession, sessionFilter]);

    useEffect(() => {
        if (!installedModels.length) return;
        if (installedModels.includes(selectedModel)) return;
        const fallback = installedModels.includes(FALLBACK_MODEL) ? FALLBACK_MODEL : installedModels[0];
        setSelectedModel(fallback);
    }, [installedModels, selectedModel]);

    useEffect(() => {
        fetchMessages(activeSession?.id ?? undefined);
    }, [activeSession?.id, fetchMessages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const currentTemperature = activeSession?.temperature ?? null;
    const temperatureLabel = currentTemperature != null ? `T ${currentTemperature.toFixed(2)}` : "T default";
    const supportMessage = activeSession?.systemPrompt ? "System intent applied" : "Clear system intent";

    const chatContent = (
        <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr]">
            <Card className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-2xl">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Sessions</p>
                        <p className="text-lg font-semibold text-white">{sessions.length} stored</p>
                    </div>
                    <Button
                        variant="solid"
                        className="text-[11px]"
                        onClick={createSession}
                        disabled={loadingSessions || !selectedModelIsInstalled}
                    >
                        {loadingSessions ? "Generating" : "New session"}
                    </Button>
                </div>
                <div className="space-y-4">
                    <Textarea
                        placeholder="Describe the tone, style, or guardrails for the next chat"
                        value={systemPromptDraft}
                        onChange={(event) => setSystemPromptDraft(event.target.value)}
                        rows={3}
                    />
                    <div className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Selected model</p>
                                <span className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                                    {installedModels.length} pulled
                                </span>
                            </div>
                            {loadingInstalledModels ? (
                                <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-6 text-center text-sm text-slate-300">
                                    Discovering pulled models… <span className="inline-block animate-pulse">•</span>
                                </div>
                            ) : installedModels.length === 0 ? (
                                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-sm text-slate-300">
                                    No Ollama models are installed yet. Pull
                                    <span className="mx-1 font-mono">ollama pull {FALLBACK_MODEL}</span>
                                    (or another release) and refresh the list below.
                                </div>
                            ) : (
                                <select
                                    value={selectedModel}
                                    onChange={(event) => {
                                        setMissingModel(null);
                                        setSelectedModel(event.target.value);
                                    }}
                                    className="w-full rounded-2xl border border-white/20 bg-slate-900/80 px-3 py-2 text-sm text-white outline-none transition focus:border-emerald-400/80 focus:ring-2 focus:ring-emerald-500/30"
                                >
                                    {installedModels.map((model) => (
                                        <option key={model} value={model}>
                                            {model}
                                        </option>
                                    ))}
                                </select>
                            )}
                            <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-slate-400">
                                <p>Manually refresh after a pull</p>
                                <button
                                    type="button"
                                    onClick={fetchInstalledModels}
                                    disabled={loadingInstalledModels}
                                    className="text-[11px] uppercase tracking-[0.3em] text-slate-400 transition hover:text-white disabled:opacity-40"
                                >
                                    Refresh
                                </button>
                            </div>
                            {modelFetchError ? (
                                <p className="text-xs text-rose-300">{modelFetchError}</p>
                            ) : null}
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Installed models</p>
                                <a
                                    href={OLLAMA_LIBRARY_SOURCE_URL}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[11px] uppercase tracking-[0.3em] text-slate-500 hover:text-white"
                                >
                                    Browse library
                                </a>
                            </div>
                            <div className="max-h-[18rem] overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-3">
                                {installedModels.length ? (
                                    <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
                                        {installedModels.map((model) => (
                                            <span
                                                key={model}
                                                className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-[11px] font-semibold transition ${model === selectedModel
                                                    ? "border-emerald-400/70 bg-emerald-500/10 text-emerald-200"
                                                    : "border-white/10 bg-white/5 text-slate-300 hover:border-white/40"
                                                    }`}
                                            >
                                                {model}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-400">
                                        Add more models by running <span className="font-mono">ollama pull &lt;model&gt;</span> and pressing refresh.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-h-[45vh] space-y-2 overflow-y-auto pr-1">
                    {loadingSessions ? (
                        <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-6 text-center text-sm text-slate-300">
                            Syncing sessions… <span className="inline-block animate-pulse">•</span>
                        </div>
                    ) : sessions.length === 0 ? (
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-center text-sm text-slate-300">
                            Start a new chat to create a session.
                        </div>
                    ) : (
                        sessions.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setActiveSessionId(item.id)}
                                className={`w-full rounded-2xl border px-4 py-3 text-left transition ${activeSession?.id === item.id ? "border-emerald-500/60 bg-emerald-500/10" : "border-white/10 bg-white/5 hover:border-white/40"
                                    }`}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm font-semibold text-white">{item.title ?? "Untitled chat"}</p>
                                    <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                        {new Date(item.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="mt-2 text-xs text-slate-300">
                                    {item.lastMessage?.content ?? "No messages yet"}
                                </p>
                                <div className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-500">
                                    <Badge accent="#38bdf8">{item.model}</Badge>
                                    <span>{item.temperature !== null ? `T ${item.temperature.toFixed(2)}` : "T Auto"}</span>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </Card>

            <Card className="flex min-h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/60 via-slate-900/80 to-slate-950/90 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.8)]">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Chat</p>
                        <h2 className="text-2xl font-semibold text-white">
                            {activeSession?.title ?? "Select or start a chat"}
                        </h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge accent="#34d399">{activeSession?.model ?? FALLBACK_MODEL}</Badge>
                        <Badge accent="#fcd34d">{temperatureLabel}</Badge>
                    </div>
                </div>
                <p className="mt-1 text-sm text-slate-400">{supportMessage}</p>
                {error ? (
                    <div className="mt-4 rounded-2xl border border-rose-400/60 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                        {error}
                    </div>
                ) : null}
                {missingModel ? (
                    <div className="mt-4 rounded-2xl border border-amber-300/60 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                        The Ollama sidecar has not pulled <span className="font-semibold text-amber-100">{missingModel}</span>. Run
                        <span className="mx-1 font-mono">ollama pull {missingModel}</span> and restart the service so it registers.
                    </div>
                ) : null}
                <div
                    className="relative mt-4 flex-1 overflow-y-auto pr-4"
                    style={{ minHeight: "40vh" }}
                    aria-live="polite"
                >
                    {loadingMessages ? (
                        <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-6 text-center text-sm text-slate-300">
                            Loading transcript…
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.length === 0 ? (
                                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-center text-sm text-slate-300">
                                    No prompts yet. Send one to begin the exchange.
                                </div>
                            ) : (
                                messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`rounded-2xl border px-4 py-3 shadow-lg backdrop-blur ${message.role === "USER"
                                            ? "border-emerald-400/50 bg-emerald-500/10 text-white"
                                            : "border-white/10 bg-white/5 text-slate-100"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em]">
                                            <span className="text-slate-400">
                                                {message.role === "USER" ? "You" : message.role === "ASSISTANT" ? "Assistant" : "System"}
                                            </span>
                                            <span className="text-slate-500">{new Date(message.createdAt).toLocaleTimeString()}</span>
                                        </div>
                                        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed">
                                            {message.content}
                                        </p>
                                    </div>
                                ))
                            )}
                            {sending && (
                                <div className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-slate-300">
                                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                                        <span>Assistant</span>
                                        <span>thinking</span>
                                    </div>
                                    <p className="mt-2 flex items-center gap-2 text-white">
                                        Crafting a reply
                                        <span className="inline-flex h-2 w-6 items-center justify-between space-x-0.5">
                                            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                                            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400 delay-150" />
                                            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400 delay-300" />
                                        </span>
                                    </p>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>
                <form className="mt-6 grid gap-3" onSubmit={handleSend}>
                    <Textarea
                        placeholder="Describe your question or scenario. Shift+Enter for newline."
                        value={chatInput}
                        onChange={(event) => setChatInput(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" && !event.shiftKey) {
                                event.preventDefault();
                                handleSend();
                            }
                        }}
                        rows={3}
                    />
                    <div className="flex items-center justify-between gap-4">
                        <Button variant="solid" className="text-[11px]" type="submit" disabled={sending || !activeSession}>
                            {sending ? "Sending…" : "Send to AI"}
                        </Button>
                        <span className="text-xs uppercase tracking-[0.3em] text-slate-500">
                            {statusMessage}
                        </span>
                    </div>
                </form>
            </Card>
        </div>
    );

    const insightsPanel = (
        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <Card className="space-y-4 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/80 to-slate-900/70 p-5 shadow-2xl">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">AI insights</p>
                        <p className="text-3xl font-semibold text-white">{insights.length} stored</p>
                    </div>
                    <Button
                        variant="ghost"
                        className="text-[11px]"
                        onClick={fetchInsights}
                        disabled={loadingInsights}
                    >
                        {loadingInsights ? "Refreshing…" : "Refresh history"}
                    </Button>
                </div>
                {insightsError ? (
                    <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                        {insightsError}
                    </div>
                ) : null}
                <div className="max-h-[52vh] space-y-3 overflow-y-auto pr-1">
                    {loadingInsights ? (
                        <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-6 text-center text-sm text-slate-300">
                            Syncing insights…
                        </div>
                    ) : insights.length === 0 ? (
                        <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-6 text-center text-sm text-slate-300">
                            Document what the AI enrichments mean and they will appear here.
                        </div>
                    ) : (
                        insights.map((insight) => {
                            const metadataPreview = formatJsonPreview(insight.metadata);
                            const payloadPreview = formatJsonPreview(insight.payload);
                            const targetLabel = describeInsightTarget(insight);
                            return (
                                <div
                                    key={insight.id}
                                    className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/70 p-4"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-sm font-semibold text-white">{insight.description}</p>
                                        <span className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                                            {new Date(insight.createdAt).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                        <Badge accent={insight.targetType ? "#c084fc" : "#94a3b8"}>
                                            {insight.targetType ?? "general"}
                                        </Badge>
                                        <span className="truncate text-[11px] text-slate-400">{targetLabel}</span>
                                    </div>
                                    {metadataPreview ? (
                                        <pre className="mt-2 max-h-36 overflow-auto rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2 text-[11px] text-slate-200">
                                            {metadataPreview}
                                        </pre>
                                    ) : null}
                                    {payloadPreview ? (
                                        <pre className="max-h-36 overflow-auto rounded-2xl border border-white/10 bg-slate-950/60 px-3 py-2 text-[11px] text-slate-200">
                                            {payloadPreview}
                                        </pre>
                                    ) : null}
                                </div>
                            );
                        })
                    )}
                </div>
            </Card>
            <Card className="space-y-4 rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950/90 p-6 shadow-2xl">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Record enrichment</p>
                    <h3 className="text-2xl font-semibold text-white">Insights builder</h3>
                </div>
                <FormField
                    label="Description"
                    description="Summarize what the enrichment produced or why it exists."
                    required
                >
                    <Textarea
                        value={insightDescription}
                        onChange={(event) => {
                            setInsightDescription(event.target.value);
                            setInsightStatus(null);
                        }}
                        rows={3}
                        placeholder="Highlight context, tone, or rationale."
                    />
                </FormField>
                <div className="grid gap-3 md:grid-cols-2">
                    <FormField label="Target type">
                        <Input
                            value={insightTargetType}
                            onChange={(event) => {
                                setInsightTargetType(event.target.value);
                                setInsightStatus(null);
                            }}
                            placeholder="e.g. poi, order, persona"
                        />
                    </FormField>
                    <FormField label="Target id">
                        <Input
                            value={insightTargetId}
                            onChange={(event) => {
                                setInsightTargetId(event.target.value);
                                setInsightStatus(null);
                            }}
                            placeholder="ID being enriched"
                        />
                    </FormField>
                </div>
                <FormField label="Target label" description="Friendly name used by other UIs">
                    <Input
                        value={insightTargetLabel}
                        onChange={(event) => {
                            setInsightTargetLabel(event.target.value);
                            setInsightStatus(null);
                        }}
                        placeholder="Display copy for the record"
                    />
                </FormField>
                <FormField label="Metadata (JSON)" description="Structured hints that describe the insight">
                    <Textarea
                        value={metadataDraft}
                        onChange={(event) => {
                            setMetadataDraft(event.target.value);
                            setInsightStatus(null);
                        }}
                        rows={4}
                        placeholder='{"action":"tagged","confidence":0.9}'
                    />
                </FormField>
                <FormField label="Payload (JSON)" description="Full enrichment payload captured from the AI">
                    <Textarea
                        value={payloadDraft}
                        onChange={(event) => {
                            setPayloadDraft(event.target.value);
                            setInsightStatus(null);
                        }}
                        rows={4}
                        placeholder='{"summary":"...","delta":{...}}'
                    />
                </FormField>
                {createInsightError ? (
                    <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-100">
                        {createInsightError}
                    </div>
                ) : null}
                {insightStatus ? (
                    <p className="text-xs text-emerald-300">{insightStatus}</p>
                ) : null}
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-3">
                        <Button
                            variant="solid"
                            className="text-[11px]"
                            onClick={handleSaveInsight}
                            disabled={creatingInsight || !insightDescription.trim()}
                        >
                            {creatingInsight ? "Saving…" : "Record insight"}
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-[11px]"
                            onClick={seedInsightFields}
                            disabled={creatingInsight}
                        >
                            Seed faker data
                        </Button>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                        {creatingInsight ? "Persisting..." : "Ready when you are"}
                    </span>
                </div>
            </Card>
        </div>
    );

    const operationColumns = useMemo<TableColumn<OllamaOperationRow>[]>(
        () => [
            {
                key: "createdAt",
                label: "Time",
                render: (row) => formatOperationTimestamp(row.createdAt),
            },
            {
                key: "source",
                label: "Source",
                render: (row) => (
                    <Badge accent={getSourceBadgeAccent(row.source)}>
                        {row.source}
                    </Badge>
                ),
            },
            { key: "model", label: "Model" },
            { key: "sessionLabel", label: "Session" },
            {
                key: "statusLabel",
                label: "Status",
                render: (row) => (
                    <Badge accent={getStatusBadgeAccent(row.status)}>
                        {row.statusLabel}
                    </Badge>
                ),
            },
            {
                key: "requestPreview",
                label: "Context",
                render: (row) => renderOperationPreview(row),
            },
        ],
        [],
    );

    const proxyPanel = (
        <div className="space-y-5">
            <TableCard
                title="Ollama proxy"
                subtitle="Captured Ollama requests and responses"
                actions={
                    <div className="flex flex-wrap items-center gap-2">
                        <select
                            value={sourceFilter}
                            onChange={(event) => setSourceFilter(event.target.value as OperationSourceFilter)}
                            className={FILTER_SELECT_CLASS}
                        >
                            {SOURCE_FILTER_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <select
                            value={sessionFilter}
                            onChange={(event) => setSessionFilter(event.target.value as SessionFilter)}
                            className={FILTER_SELECT_CLASS}
                        >
                            {SESSION_FILTER_OPTIONS.map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                    disabled={option.value === "active" && !activeSession}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <Button
                            variant="ghost"
                            className="text-[11px]"
                            onClick={fetchProxyOperations}
                            disabled={loadingOperations}
                        >
                            {loadingOperations ? "Refreshing…" : "Refresh history"}
                        </Button>
                    </div>
                }
            >
                {operationsError ? (
                    <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                        {operationsError}
                    </div>
                ) : null}
                {loadingOperations ? (
                    <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-6 text-center text-sm text-slate-300">
                        Syncing operations…
                    </div>
                ) : operations.length === 0 ? (
                    <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-6 text-center text-sm text-slate-300">
                        Ollama requests sent through the API will appear here.
                    </div>
                ) : (
                    <Table columns={operationColumns} rows={operations} rowKey={(row) => row.id} />
                )}
            </TableCard>
        </div>
    );

    const signalsPanel = (
        <div className="grid gap-5 lg:grid-cols-2">
            <Card className="space-y-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-6 shadow-2xl">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Latency</p>
                        <p className="text-3xl font-semibold text-white">~118 ms</p>
                    </div>
                    <Badge accent="#a855f7">Ollama</Badge>
                </div>
                <p className="text-sm text-slate-300">
                    Requests proxied through the Ollama sidecar aim for single-digit latency variance. Tune the temperature if you need calmer replies.
                </p>
            </Card>
            <Card className="space-y-3 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/60 to-indigo-900/60 px-5 py-6 shadow-2xl">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Context depth</p>
                        <p className="text-3xl font-semibold text-white">32 msgs</p>
                    </div>
                    <Badge accent="#22d3ee">History</Badge>
                </div>
                <p className="text-sm text-slate-300">
                    The chat context keeps the latest 32 turns so conversations stay focused. Increase `OLLAMA_CHAT_HISTORY_LIMIT` if you need deeper memory.
                </p>
            </Card>
        </div>
    );

    const tabs = [
        { key: "chat", label: "Chat", content: chatContent },
        { key: "insights", label: "Insights", content: insightsPanel },
        { key: "proxy", label: "Ollama proxy", content: proxyPanel },
        { key: "signals", label: "Signals", content: signalsPanel },
    ];

    if (!session) {
        return (
            <StarfieldLayout gradientClassName={gradient} contentClassName="flex h-screen items-center justify-center">
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 px-8 py-6 text-center text-xs uppercase tracking-[0.4em] text-white shadow-2xl">
                    Sign in to open the AI page
                </div>
            </StarfieldLayout>
        );
    }

    return (
        <StarfieldLayout gradientClassName={gradient} contentClassName="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
            <SectionHeader
                kicker="AI tools"
                title="Conversational lab"
                description="Pair session history with Ollama chat responses, tune your system instructions, and keep everything fresh inside a dedicated tabbed experience."
                status={<span className="text-xs uppercase tracking-[0.28em] text-slate-400">Connected</span>}
            />
            <Tabs tabs={tabs} className="w-full" />
        </StarfieldLayout>
    );
}

const INSIGHT_PREVIEW_LIMIT = 360;

function formatJsonPreview(value: unknown): string | null {
    if (value === null || value === undefined) return null;
    try {
        const text = JSON.stringify(value, null, 2);
        return text.length > INSIGHT_PREVIEW_LIMIT ? `${text.slice(0, INSIGHT_PREVIEW_LIMIT)}…` : text;
    } catch {
        const fallback = String(value ?? "");
        return fallback.length > INSIGHT_PREVIEW_LIMIT ? `${fallback.slice(0, INSIGHT_PREVIEW_LIMIT)}…` : fallback;
    }
}

function describeInsightTarget(insight: AiInsight): string {
    if (insight.targetLabel) return insight.targetLabel;
    if (!insight.targetType) return "Unlinked insight";
    return insight.targetId ? `${insight.targetType} · ${insight.targetId}` : insight.targetType;
}

type InsightSeed = {
    description: string;
    targetType: string;
    targetId: string;
    targetLabel: string;
    metadata: Record<string, unknown>;
    payload: Record<string, unknown>;
};

const INSIGHT_SEED_TARGET_TYPES = ["order", "persona", "poi", "shipment", "provider", "assignment"];
const INSIGHT_SEED_ACTIONS = ["tagged", "validated", "enriched", "reviewed", "escalated"];
const INSIGHT_SEED_SOURCES = ["automation", "manual review", "analytics", "sensor input"];
const INSIGHT_SEED_STATUSES = ["updated", "created", "resolved", "flagged", "deprecated"];
const INSIGHT_SEED_SEVERITIES = ["low", "medium", "high"];
const INSIGHT_SEED_TAG_POOL = ["latency", "capacity", "quality", "risk", "supply", "signal"];

function buildInsightSeed(): InsightSeed {
    const targetType = faker.helpers.arrayElement(INSIGHT_SEED_TARGET_TYPES);
    const confidence = Number((faker.number.int({ min: 65, max: 99 }) / 100).toFixed(2));
    const tags = faker.helpers.shuffle(INSIGHT_SEED_TAG_POOL).slice(0, 3);
    return {
        description: faker.hacker.phrase(),
        targetType,
        targetId: `${targetType.toUpperCase()}-${faker.string.numeric({ length: 6 })}`,
        targetLabel: `${faker.company.name()} ${faker.commerce.department()}`,
        metadata: {
            action: faker.helpers.arrayElement(INSIGHT_SEED_ACTIONS),
            confidence,
            source: faker.helpers.arrayElement(INSIGHT_SEED_SOURCES),
            reviewer: faker.person.fullName(),
        },
        payload: {
            summary: faker.company.catchPhrase(),
            delta: {
                status: faker.helpers.arrayElement(INSIGHT_SEED_STATUSES),
                severity: faker.helpers.arrayElement(INSIGHT_SEED_SEVERITIES),
                note: faker.hacker.phrase(),
            },
            context: {
                tags,
                actor: faker.person.fullName(),
                location: faker.location.city(),
            },
            reference: {
                id: faker.string.alphanumeric({ length: 8 }).toUpperCase(),
                url: faker.internet.url(),
            },
        },
    };
}

function parseJsonInput(value: string, label: string): unknown | null {
    const trimmed = value.trim();
    if (!trimmed) return null;
    try {
        return JSON.parse(trimmed);
    } catch {
        throw new Error(`${label} must be valid JSON`);
    }
}

function parseMissingModelName(message?: string | null): string | null {
    if (!message) return null;
    const match = message.match(/model '?([^']+)'? not found/i);
    return match?.[1] ?? null;
}

function buildOperationRow(record: OllamaOperationRecord): OllamaOperationRow {
    const status: OperationStatus = record.errorMessage ? "error" : "success";
    return {
        id: record.id,
        createdAt: record.createdAt,
        source: record.source,
        model: record.model,
        sessionLabel: describeOperationSession(record),
        status,
        statusLabel: status === "error" ? "Error" : "Success",
        systemPrompt: record.systemPrompt ? shorten(record.systemPrompt, 140) : null,
        requestPreview: previewFromRequest(record.requestBody),
        responsePreview: previewFromResponse(record.responseBody),
        metadataPreview: previewFromMetadata(record.metadata),
        errorMessage: record.errorMessage,
    };
}

function describeOperationSession(record: OllamaOperationRecord): string {
    if (record.sessionTitle) return record.sessionTitle;
    if (record.sessionId) return `Session ${record.sessionId.slice(0, 8)}`;
    return "General";
}

function previewFromRequest(value: unknown): string | null {
    if (!value) return null;
    if (typeof value === "object" && value !== null) {
        const record = value as Record<string, unknown>;
        const messages = record.messages;
        if (Array.isArray(messages) && messages.length) {
            const last = messages[messages.length - 1] as { content?: unknown };
            if (typeof last?.content === "string") return shorten(last.content, 180);
        }
    }
    const preview = formatJsonPreview(value);
    return preview ? shorten(preview, 200) : null;
}

function previewFromResponse(value: unknown): string | null {
    if (!value) return null;
    if (typeof value === "string") return shorten(value, 200);
    if (typeof value === "object" && value !== null) {
        const record = value as Record<string, unknown>;
        const candidate = record.choices ?? record.message ?? record.content ?? record.delta;
        if (typeof candidate === "string") return shorten(candidate, 200);
        if (Array.isArray(candidate)) {
            const flattened = candidate
                .map((item) => (typeof item === "string" ? item : ""))
                .filter(Boolean)
                .join(" ");
            if (flattened) return shorten(flattened, 200);
        }
    }
    const preview = formatJsonPreview(value);
    return preview ? shorten(preview, 200) : null;
}

function previewFromMetadata(value: unknown): string | null {
    return formatJsonPreview(value);
}

function shorten(value: string, limit = 120): string {
    return value.length > limit ? `${value.slice(0, limit)}…` : value;
}

function formatOperationTimestamp(value: string): string {
    return new Date(value).toLocaleString();
}

function getSourceBadgeAccent(source: string): string {
    if (source === "chat") return "#34d399";
    if (source === "insights") return "#c084fc";
    return "#94a3b8";
}

function getStatusBadgeAccent(status: OperationStatus): string {
    return status === "error" ? "#fb7185" : "#22c55e";
}

function renderOperationPreview(row: OllamaOperationRow) {
    return (
        <div className="space-y-1 text-[11px] text-slate-300">
            {row.systemPrompt ? (
                <div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Prompt</span>
                    <p className="truncate text-slate-100">{row.systemPrompt}</p>
                </div>
            ) : null}
            {row.requestPreview ? (
                <p className="text-slate-300">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Request</span> {row.requestPreview}
                </p>
            ) : null}
            {row.responsePreview ? (
                <p className="text-slate-200">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Response</span> {row.responsePreview}
                </p>
            ) : null}
            {row.metadataPreview ? (
                <p className="text-slate-400">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Metadata</span> {row.metadataPreview}
                </p>
            ) : null}
            {row.errorMessage ? (
                <p className="text-[10px] uppercase tracking-[0.3em] text-rose-300">Error: {row.errorMessage}</p>
            ) : null}
        </div>
    );
}
