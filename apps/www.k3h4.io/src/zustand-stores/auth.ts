import { create } from "zustand";

export type Provider = "github" | "linkedin";

export type Session = {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: string;
};

const getApiBase = () =>
    (globalThis as any).__API_URL__ ||
    (import.meta as any)?.API_URL ||
    (import.meta as any)?.env?.API_URL ||
    "http://localhost:3001";

const loadSession = (): Session | null => {
    try {
        const raw = localStorage.getItem("k3h4.session");
        return raw ? (JSON.parse(raw) as Session) : null;
    } catch (err) {
        console.warn("load session failed", err);
        return null;
    }
};

const persistSession = (session: Session | null) => {
    try {
        if (session) {
            localStorage.setItem("k3h4.session", JSON.stringify(session));
        } else {
            localStorage.removeItem("k3h4.session");
        }
    } catch (err) {
        console.warn("persist session failed", err);
    }
};

export type AuthState = {
    apiBase: string;
    providerLoading: Provider | null;
    error: string | null;
    session: Session | null;
    deleteJobId: string | null;
    deleteStatus: "idle" | "queued" | "running" | "done" | "error";
    deleteProgress: number;
    deleteMessage: string | null;
    startOAuth: (provider: Provider, redirectUri?: string) => Promise<void>;
    finalizeCallback: (provider: Provider, code: string, redirectUri: string, state?: string | null) => Promise<void>;
    clearError: () => void;
    signOut: () => void;
    requestDelete: (confirmText: string) => Promise<void>;
    kickToLogin: (reason?: string) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
    apiBase: getApiBase(),
    providerLoading: null,
    error: null,
    session: loadSession(),
    deleteJobId: null,
    deleteStatus: "idle",
    deleteProgress: 0,
    deleteMessage: null,

    clearError: () => set({ error: null }),

    kickToLogin: (reason) => {
        const hadSession = Boolean(get().session);
        persistSession(null);
        set({ session: null, providerLoading: null, error: reason ?? null, deleteJobId: null, deleteStatus: "idle", deleteProgress: 0, deleteMessage: null });

        if (typeof window !== "undefined") {
            const onAuthRoute = window.location.pathname.startsWith("/auth");
            if (hadSession && !onAuthRoute) {
                const current = `${window.location.pathname}${window.location.search}`;
                const params = new URLSearchParams();
                if (reason) params.set("reason", reason);
                if (current && current !== "/") params.set("returnTo", current);
                const qs = params.toString();
                const target = qs ? `/auth/login?${qs}` : "/auth/login";
                window.location.replace(target);
            }
        }
    },

    signOut: () => {
        persistSession(null);
        set({ session: null, providerLoading: null, error: null, deleteJobId: null, deleteStatus: "idle", deleteProgress: 0, deleteMessage: null });
    },

    startOAuth: async (provider, redirectUri) => {
        const apiBase = get().apiBase;
        set({ providerLoading: provider, error: null });
        const fallback = `${apiBase}/auth/${provider}`;
        try {
            const res = await fetch(`${apiBase}/auth/${provider}/url`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ redirectUri }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || !(data.authorizeUrl || data.url || data.redirect)) {
                throw new Error(data.error || `Auth init failed (${res.status})`);
            }
            if (data.state) {
                try {
                    sessionStorage.setItem(`k3h4.oauth.state.${provider}`, String(data.state));
                } catch (err) {
                    console.warn("persist oauth state failed", err);
                }
            }
            const redirect = data.authorizeUrl || data.url || data.redirect || data.location || fallback;
            window.location.href = redirect;
        } catch (err) {
            console.error(err);
            set({ error: "Auth launch failed. Verify API_URL/provider env and retry.", providerLoading: null });
        }
    },

    finalizeCallback: async (provider, code, redirectUri, state) => {
        const apiBase = get().apiBase;
        set({ providerLoading: provider, error: null });
        try {
            const storedState = (() => {
                try {
                    return sessionStorage.getItem(`k3h4.oauth.state.${provider}`);
                } catch {
                    return null;
                }
            })();
            const sendState = state ?? storedState ?? undefined;
            const res = await fetch(`${apiBase}/auth/${provider}/callback`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ code, redirectUri, state: sendState }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                throw new Error(data.error || `Callback failed (${res.status})`);
            }
            persistSession(data);
            set({ session: data, providerLoading: null, error: null });
        } catch (err) {
            console.error(err);
            set({ error: "Unable to finish sign-in. Please retry.", providerLoading: null });
        }
    },

    requestDelete: async (confirmText: string) => {
        const apiBase = get().apiBase;
        const session = get().session;
        if (!session?.accessToken) {
            set({ error: "No session present.", deleteStatus: "error" });
            return;
        }
        set({ deleteStatus: "running", deleteMessage: "Queueing delete...", deleteProgress: 5 });
        try {
            const res = await fetch(`${apiBase}/auth/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessToken}`,
                },
                credentials: "include",
                body: JSON.stringify({ confirmText }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data.jobId) {
                throw new Error(data.error || `Delete start failed (${res.status})`);
            }
            set({ deleteJobId: data.jobId, deleteStatus: "queued", deleteMessage: "Queued", deleteProgress: 10 });

            const poll = async (jobId: string) => {
                try {
                    const statusRes = await fetch(`${apiBase}/auth/delete/status?jobId=${jobId}`, {
                        method: "GET",
                        headers: { Authorization: `Bearer ${session.accessToken}` },
                        credentials: "include",
                    });
                    const statusData = await statusRes.json().catch(() => ({}));
                    if (!statusRes.ok) throw new Error(statusData.error || "Status failed");

                    const { status, progress, message } = statusData as { status?: AuthState["deleteStatus"]; progress?: number; message?: string };
                    const nextStatus = status ?? "running";
                    set({ deleteStatus: nextStatus, deleteProgress: progress ?? get().deleteProgress, deleteMessage: message ?? null });

                    if (nextStatus === "done") {
                        persistSession(null);
                        set({ session: null, providerLoading: null, error: null, deleteJobId: jobId });
                        return;
                    }
                    if (nextStatus === "error") return;
                    setTimeout(() => poll(jobId), 1000);
                } catch (err) {
                    console.error(err);
                    set({ deleteStatus: "error", deleteMessage: err instanceof Error ? err.message : "Delete check failed" });
                }
            };

            poll(data.jobId as string);
        } catch (err) {
            console.error(err);
            set({ deleteStatus: "error", deleteMessage: err instanceof Error ? err.message : "Delete request failed" });
        }
    },
}));
