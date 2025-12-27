import { createStore } from "../lib/store";
import { trackTelemetry } from "../lib/telemetry";

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

export type UserIdentity =
  | { status: "anonymous" }
  | { status: "authenticated"; email: string };

type ProfileUpdater = (prev: ProfileState | null) => ProfileState | null;

type AuthStoreState = {
  apiBase: string;
  redirectUri: string;
  user: UserIdentity;
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

export const authStore = createStore<AuthStoreState>((set, get) => ({
  apiBase,
  redirectUri,
  user: { status: "anonymous" },
  authStatus: "idle",
  authMessage: "",
  profile: null,
  profileLoading: false,
  profileMessage: "",
  setProfile: (updater) => set((state: AuthStoreState) => ({ profile: updater(state.profile) })),
  setProfileMessage: (message) => set({ profileMessage: message }),
  setAuthState: (status, message = "") => set({ authStatus: status, authMessage: message }),
  async checkSession() {
    const token = localStorage.getItem("k3h4.accessToken");
    if (!token) {
      set({ user: { status: "anonymous" }, authStatus: "idle", authMessage: "", profile: null });
      return;
    }

    set({ authStatus: "loading", authMessage: "Checking session…" });
    void trackTelemetry("auth.session.check.start");
    try {
      const res = await fetch(`${get().apiBase}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok || !data?.user) {
        throw new Error("Session expired — sign in again");
      }

      const signedInEmail = data.user.email ?? "";
      set({
        user: signedInEmail
          ? { status: "authenticated", email: signedInEmail }
          : { status: "anonymous" },
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
      void trackTelemetry("auth.session.check.success");
    } catch (err) {
      localStorage.removeItem("k3h4.accessToken");
      localStorage.removeItem("k3h4.refreshToken");
      set({
        authStatus: "error",
        authMessage: err instanceof Error ? err.message : "Sign-in needed",
        profile: null,
      });
      void trackTelemetry("auth.session.check.error", { message: err instanceof Error ? err.message : "error" });
    } finally {
      set({ profileLoading: false });
    }
  },
  async startGithubLogin() {
    set({ authStatus: "loading", authMessage: "Redirecting to GitHub…" });
    void trackTelemetry("auth.github.start");
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
      void trackTelemetry("auth.github.redirect", { redirectUri: get().redirectUri });
      window.location.href = data.authorizeUrl;
    } catch (error) {
      set({
        authStatus: "error",
        authMessage: error instanceof Error ? error.message : "Unable to start GitHub login",
      });
      void trackTelemetry("auth.github.start.error", { message: error instanceof Error ? error.message : "error" });
    }
  },
  signOut() {
    localStorage.removeItem("k3h4.accessToken");
    localStorage.removeItem("k3h4.refreshToken");
    set({
      user: { status: "anonymous" },
      authStatus: "idle",
      authMessage: "Signed out",
      profile: null,
      profileMessage: "",
    });
    void trackTelemetry("auth.signout");
  },
  async saveProfile() {
    const token = localStorage.getItem("k3h4.accessToken");
    const currentProfile = get().profile;
    if (!token) {
      set({ profileMessage: "Sign in to save preferences" });
      void trackTelemetry("profile.save.blocked", { reason: "missing-token" });
      return;
    }
    set({ profileLoading: true, profileMessage: "Saving…" });
    void trackTelemetry("profile.save.start");
    try {
      const preferencePayload = {
        theme: currentProfile?.preference?.theme,
        locale: currentProfile?.preference?.locale,
        timezone: currentProfile?.preference?.timezone,
        marketingOptIn: currentProfile?.preference?.marketingOptIn,
        notifications: currentProfile?.preference?.notifications,
      };
      const updatedFields: string[] = [];
      if (currentProfile?.displayName !== undefined) updatedFields.push("displayName");
      if (currentProfile?.avatarUrl !== undefined) updatedFields.push("avatarUrl");
      const updatedPreferences = Object.entries(preferencePayload)
        .filter(([, value]) => value !== undefined)
        .map(([key]) => key);

      const res = await fetch(`${get().apiBase}/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          displayName: currentProfile?.displayName ?? null,
          avatarUrl: currentProfile?.avatarUrl ?? null,
          preference: preferencePayload,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.profile) {
        throw new Error(data?.error || "Unable to save profile");
      }
      const nextEmail = data.profile.email ?? (get().user.status === "authenticated" ? get().user.email : "");
      set({
        profile: data.profile,
        profileMessage: "Saved",
        user: nextEmail ? { status: "authenticated", email: nextEmail } : { status: "anonymous" },
      });
      void trackTelemetry("profile.save.success", {
        updatedFields,
        updatedPreferences,
      });
    } catch (err) {
      set({ profileMessage: err instanceof Error ? err.message : "Save failed" });
      void trackTelemetry("profile.save.error", { message: err instanceof Error ? err.message : "error" });
    } finally {
      set({ profileLoading: false });
    }
  },
  async completeGithubCallback(code, redirect = get().redirectUri) {
    if (!code) {
      const error = "Missing authorization code";
      set({ authStatus: "error", authMessage: error });
      void trackTelemetry("auth.github.callback.error", { reason: "missing-code" });
      return { ok: false, error };
    }
    set({ authStatus: "loading", authMessage: "Signing you in with GitHub…" });
    void trackTelemetry("auth.github.callback.start");
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
      const nextEmail = data?.profile?.email ?? "";
      set({
        authStatus: "success",
        authMessage: "Signed in — redirecting…",
        user: nextEmail ? { status: "authenticated", email: nextEmail } : { status: "anonymous" },
      });
      if (data?.profile) {
        set({ profile: data.profile });
      }
      void trackTelemetry("auth.github.callback.success", { redirect });
      return { ok: true };
    } catch (err) {
      const error = err instanceof Error ? err.message : "Something went wrong";
      set({ authStatus: "error", authMessage: error });
      void trackTelemetry("auth.github.callback.error", { message: error });
      return { ok: false, error };
    }
  },
}));

export type AuthStore = typeof authStore;
