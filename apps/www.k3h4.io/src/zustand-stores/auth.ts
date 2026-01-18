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
    startOAuth: (provider: Provider, redirectUri?: string) => Promise<void>;
    finalizeCallback: (provider: Provider, code: string, redirectUri: string) => Promise<void>;
    clearError: () => void;
    signOut: () => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
    apiBase: getApiBase(),
    providerLoading: null,
    error: null,
    session: loadSession(),

    clearError: () => set({ error: null }),

    signOut: () => {
        persistSession(null);
        set({ session: null, providerLoading: null, error: null });
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
            const redirect = data.authorizeUrl || data.url || data.redirect || data.location || fallback;
            window.location.href = redirect;
        } catch (err) {
            console.error(err);
            set({ error: "Auth launch failed. Verify API_URL/provider env and retry.", providerLoading: null });
        }
    },

    finalizeCallback: async (provider, code, redirectUri) => {
        const apiBase = get().apiBase;
        set({ providerLoading: provider, error: null });
        try {
            const res = await fetch(`${apiBase}/auth/${provider}/callback`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ code, redirectUri }),
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
}));
