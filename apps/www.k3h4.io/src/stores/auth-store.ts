import { createStore } from "../lib/store";

export type ProfileState = {
  displayName?: string | null;
  avatarUrl?: string | null;
  email?: string | null;
  preference?: {
    theme?: string;
    locale?: string;
    timezone?: string;
    marketingOptIn?: boolean;
    notifications?: unknown;
  };
};

export type AuthStatus = "idle" | "loading" | "error" | "success";

type ProfileUpdater = (prev: ProfileState | null) => ProfileState | null;

type AuthStore = {
  apiBase: string;
  redirectUri: string;
  userEmail: string | null;
  authStatus: AuthStatus;
  authMessage: string;
  profile: ProfileState | null;
  profileLoading: boolean;
  profileMessage: string;
  setProfile: (updater: ProfileUpdater) => void;
  setProfileMessage: (message: string) => void;
  setAuthState: (status: AuthStatus, message?: string) => void;
  checkSession: () => Promise<void>;
  startGithubLogin: () => Promise<void>;
  signOut: () => void;
  saveProfile: () => Promise<void>;
  completeGithubCallback: (code: string, redirect?: string) => Promise<{ ok: boolean; error?: string }>;
};

const apiBase = (globalThis as any)?.__API_URL__ || (import.meta as any)?.API_URL || "http://localhost:3001";
const redirectUri = `${window.location.origin}/auth/github`;

export const authStore = createStore<AuthStore>((set, get) => ({
  apiBase,
  redirectUri,
  userEmail: null,
  authStatus: "idle",
  authMessage: "",
  profile: null,
  profileLoading: false,
  profileMessage: "",
  setProfile: (updater) => set((state) => ({ profile: updater(state.profile) })),
  setProfileMessage: (message) => set({ profileMessage: message }),
  setAuthState: (status, message = "") => set({ authStatus: status, authMessage: message }),
  async checkSession() {
    const token = localStorage.getItem("k3h4.accessToken");
    if (!token) {
      set({ userEmail: null, authStatus: "idle", authMessage: "", profile: null });
      return;
    }

    set({ authStatus: "loading", authMessage: "Checking session…" });
    try {
      const res = await fetch(`${get().apiBase}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok || !data?.user) {
        throw new Error("Session expired — sign in again");
      }

      const signedInEmail = data.user.email ?? null;
      set({
        userEmail: signedInEmail,
        authStatus: "success",
        authMessage: signedInEmail ? `Signed in as ${signedInEmail}` : "Signed in",
      });

      set({ profileLoading: true });
      const profRes = await fetch(`${get().apiBase}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const profData = await profRes.json();
      if (!profRes.ok || !profData?.profile) {
        throw new Error("Unable to load profile");
      }
      set({ profile: profData.profile, profileMessage: "" });
    } catch (err) {
      localStorage.removeItem("k3h4.accessToken");
      localStorage.removeItem("k3h4.refreshToken");
      set({
        authStatus: "error",
        authMessage: err instanceof Error ? err.message : "Sign-in needed",
        profile: null,
      });
    } finally {
      set({ profileLoading: false });
    }
  },
  async startGithubLogin() {
    set({ authStatus: "loading", authMessage: "Redirecting to GitHub…" });
    try {
      const res = await fetch(`${get().apiBase}/auth/github/url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ redirectUri: get().redirectUri }),
      });
      const data = await res.json();
      if (!res.ok || !data?.authorizeUrl) {
        throw new Error(data?.error || "Unable to start GitHub login");
      }
      window.location.href = data.authorizeUrl;
    } catch (error) {
      set({
        authStatus: "error",
        authMessage: error instanceof Error ? error.message : "Unable to start GitHub login",
      });
    }
  },
  signOut() {
    localStorage.removeItem("k3h4.accessToken");
    localStorage.removeItem("k3h4.refreshToken");
    set({
      userEmail: null,
      authStatus: "idle",
      authMessage: "Signed out",
      profile: null,
      profileMessage: "",
    });
  },
  async saveProfile() {
    const token = localStorage.getItem("k3h4.accessToken");
    const currentProfile = get().profile;
    if (!token) {
      set({ profileMessage: "Sign in to save preferences" });
      return;
    }
    set({ profileLoading: true, profileMessage: "Saving…" });
    try {
      const res = await fetch(`${get().apiBase}/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          displayName: currentProfile?.displayName ?? null,
          avatarUrl: currentProfile?.avatarUrl ?? null,
          preference: {
            theme: currentProfile?.preference?.theme,
            locale: currentProfile?.preference?.locale,
            timezone: currentProfile?.preference?.timezone,
            marketingOptIn: currentProfile?.preference?.marketingOptIn,
            notifications: currentProfile?.preference?.notifications,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.profile) {
        throw new Error(data?.error || "Unable to save profile");
      }
      set({ profile: data.profile, profileMessage: "Saved", userEmail: data.profile.email ?? get().userEmail });
    } catch (err) {
      set({ profileMessage: err instanceof Error ? err.message : "Save failed" });
    } finally {
      set({ profileLoading: false });
    }
  },
  async completeGithubCallback(code, redirect = get().redirectUri) {
    if (!code) {
      const error = "Missing authorization code";
      set({ authStatus: "error", authMessage: error });
      return { ok: false, error };
    }
    set({ authStatus: "loading", authMessage: "Signing you in with GitHub…" });
    try {
      const res = await fetch(`${get().apiBase}/auth/github/callback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, redirectUri: redirect }),
      });
      const data = await res.json();
      if (!res.ok) {
        const detail = data?.detail || data?.error || "GitHub sign-in failed";
        const stale = data?.staleCode;
        throw new Error(stale ? `${detail} — restart sign-in` : detail);
      }
      localStorage.setItem("k3h4.accessToken", data.accessToken);
      localStorage.setItem("k3h4.refreshToken", data.refreshToken);
      set({ authStatus: "success", authMessage: "Signed in — redirecting…", userEmail: data?.profile?.email ?? null });
      if (data?.profile) {
        set({ profile: data.profile });
      }
      return { ok: true };
    } catch (err) {
      const error = err instanceof Error ? err.message : "Something went wrong";
      set({ authStatus: "error", authMessage: error });
      return { ok: false, error };
    }
  },
}));

export type AuthStore = typeof authStore;
