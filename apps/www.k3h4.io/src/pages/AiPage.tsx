import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Tabs } from "../radix-primitives";
import { Badge, Button, Card, SectionHeader, Textarea } from "../components/ui";
import { StarfieldLayout } from "../radix-components/StarfieldLayout";
import { useAuthStore } from "../react-hooks/auth";

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

const gradient = "bg-[radial-gradient(circle_at_15%_10%,rgba(16,185,129,0.15),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(249,115,22,0.18),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(37,99,235,0.12),transparent_45%)]";
const FALLBACK_MODEL = "llama2";

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

    const activeSession = useMemo(
        () => sessions.find((item) => item.id === activeSessionId) ?? sessions[0] ?? null,
        [sessions, activeSessionId],
    );

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

    const handleUnauthorized = (response: Response) => {
        if (response.status === 401) {
            kickToLogin("Session expired");
            return true;
        }
        return false;
    };

    const fetchSessions = useCallback(async () => {
        if (!token) return;
        setLoadingSessions(true);
        try {
            setError(null);
            const res = await fetch(`${apiBase}/chat/sessions`, {
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

    const fetchMessages = useCallback(
        async (sessionId?: string) => {
            if (!token || !sessionId) return;
            setLoadingMessages(true);
            try {
                setError(null);
                const res = await fetch(`${apiBase}/chat/sessions/${sessionId}/messages`, {
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
        setLoadingSessions(true);
        try {
            setError(null);
            const res = await fetch(`${apiBase}/chat/sessions`, {
                method: "POST",
                headers: buildHeaders(true),
                body: JSON.stringify({ systemPrompt: systemPromptDraft || undefined }),
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
            setError(err instanceof Error ? err.message : "Session create failed");
        } finally {
            setLoadingSessions(false);
        }
    }, [apiBase, token, systemPromptDraft]);

    const handleSend = useCallback(
        async (event?: FormEvent<HTMLFormElement>) => {
            event?.preventDefault();
            if (!token || !activeSession) return;
            const trimmed = chatInput.trim();
            if (!trimmed) return;
            setSending(true);
            setError(null);
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
                const res = await fetch(`${apiBase}/chat/sessions/${activeSession.id}/messages`, {
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
                setError(err instanceof Error ? err.message : "Unable to process message");
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
        }
    }, [fetchSessions, session]);

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
                        disabled={loadingSessions}
                    >
                        {loadingSessions ? "Generating" : "New session"}
                    </Button>
                </div>
                <Textarea
                    placeholder="Describe the tone, style, or guardrails for the next chat"
                    value={systemPromptDraft}
                    onChange={(event) => setSystemPromptDraft(event.target.value)}
                    rows={3}
                />
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
                <div
                    className="relative mt-4 flex-1 overflow-y-auto pr-4"
                    style={{ minHeight: "40vh" }}
                    aria-live="polite"
                >
                    {loadingMessages ? (
                        <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-6 text-center text-sm text-slate-300">
                            Loading transcript…
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-center text-sm text-slate-300">
                            No prompts yet. Send one to begin the exchange.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map((message) => (
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
                            ))}
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

    const insightContent = (
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
        { key: "signals", label: "Signals", content: insightContent },
    ];

    if (!session) {
        return (
            <StarfieldLayout gradientClassName={gradient} contentClassName="flex h-screen items-center justify-center">
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 px-8 py-6 text-center text-xs uppercase tracking-[0.4em] text-white shadow-2xl">
                    Sign in to open the AI cockpit
                </div>
            </StarfieldLayout>
        );
    }

    return (
        <StarfieldLayout gradientClassName={gradient} contentClassName="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
            <SectionHeader
                kicker="AI cockpit"
                title="Conversational lab"
                description="Pair session history with Ollama chat responses, tune your system instructions, and keep everything fresh inside a dedicated tabbed experience."
                status={<span className="text-xs uppercase tracking-[0.28em] text-slate-400">Connected</span>}
            />
            <Tabs tabs={tabs} className="w-full" />
        </StarfieldLayout>
    );
}
