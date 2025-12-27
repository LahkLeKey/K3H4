import { createStore } from "../lib/store";

export type ProfileState = {
  displayName?: string | null;
  avatarUrl?: string | null;
  email?: string | null;
  k3h4CoinBalance?: string | null;
  preference?: {
    theme?: string;
    locale?: string;
    timezone?: string;
    marketingOptIn?: boolean;
    note?: string | null;
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
  setUser: (user: UserIdentity) => void;
  setProfileFromServer: (profile: ProfileState | null) => void;
};

const apiBase = (globalThis as any)?.__API_URL__ || (import.meta as any)?.API_URL || "http://localhost:3001";
const redirectUri = `${window.location.origin}/auth/github`;

export const authStore = createStore<AuthStoreState>((set) => ({
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
  setUser: (user) => set({ user }),
  setProfileFromServer: (profile) => set({ profile, profileMessage: "" }),
}));

export type AuthStore = typeof authStore;
