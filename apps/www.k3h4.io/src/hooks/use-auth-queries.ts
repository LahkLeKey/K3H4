import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { trackTelemetry } from "../lib/telemetry";
import type { ProfileState, UserIdentity } from "../stores/auth-store";
import { queryClient } from "../lib/query-client";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../lib/constants";

export type SessionResponse = { user?: { email?: string | null } };
export type ProfileResponse = { profile: ProfileState };
export type GithubUrlResponse = { authorizeUrl: string };
export type GithubCallbackResponse = { accessToken: string; refreshToken: string; profile?: ProfileState };

const getToken = () => (typeof window === "undefined" ? "" : localStorage.getItem(ACCESS_TOKEN_KEY) || "");

const authHeaders = () => {
  const token = getToken();
  if (!token) return null;
  return {
    token,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } as const,
  };
};

const clearAuthCaches = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.dispatchEvent(new Event("k3h4:auth-signed-out"));
  }
  queryClient.clear();
};

async function fetchJson<T>(url: string, options: RequestInit, errorMetric: string): Promise<T> {
  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) {
    const message = (data as any)?.error || "Request failed";
    if (res.status === 401 || res.status === 403) {
      clearAuthCaches();
    } else if (res.status >= 500) {
      clearAuthCaches();
    }
    void trackTelemetry(errorMetric, { message, status: res.status });
    throw new Error(message || "Unauthorized");
  }
  return data as T;
}

export function useSessionQuery(apiBase: string) {
  const auth = authHeaders();
  const enabled = !!auth?.token;

  return useQuery<SessionResponse>({
    queryKey: ["auth", "session", apiBase, auth?.token || ""],
    enabled,
    queryFn: async () => {
      if (!auth) return { user: undefined };
      const data = await fetchJson<SessionResponse>(`${apiBase}/auth/me`, { headers: auth.headers }, "auth.session.error");
      void trackTelemetry("auth.session.success");
      return data;
    },
  });
}

export function useProfileQuery(apiBase: string, enabled: boolean) {
  const auth = authHeaders();
  return useQuery<ProfileResponse>({
    queryKey: ["auth", "profile", apiBase, auth?.token || ""],
    enabled: enabled && !!auth?.token,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to load profile");
      const data = await fetchJson<ProfileResponse>(`${apiBase}/profile`, { headers: auth.headers }, "auth.profile.error");
      void trackTelemetry("auth.profile.success");
      return data;
    },
  });
}

export function useGithubUrlMutation(apiBase: string) {
  return useMutation<{ authorizeUrl: string }, Error, { redirectUri: string }>({
    mutationKey: ["auth", "github", "url", apiBase],
    mutationFn: async ({ redirectUri }) => {
      const data = await fetchJson<GithubUrlResponse>(
        `${apiBase}/auth/github/url`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ redirectUri }) },
        "auth.github.url.error",
      );
      void trackTelemetry("auth.github.url.success", { redirectUri });
      return data;
    },
  });
}

export function useGithubCallbackMutation(apiBase: string) {
  const queryClient = useQueryClient();
  return useMutation<GithubCallbackResponse, Error, { code: string; redirectUri: string }>({
    mutationKey: ["auth", "github", "callback", apiBase],
    mutationFn: async ({ code, redirectUri }) => {
      const data = await fetchJson<GithubCallbackResponse>(
        `${apiBase}/auth/github/callback`,
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code, redirectUri }) },
        "auth.github.callback.error",
      );
      void trackTelemetry("auth.github.callback.success", { redirectUri });
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["auth", "session"] });
      void queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
    },
  });
}

export function useProfileSaveMutation(apiBase: string) {
  const queryClient = useQueryClient();
  return useMutation<ProfileResponse, Error, ProfileState>({
    mutationKey: ["auth", "profile", "save", apiBase],
    mutationFn: async (profile) => {
      const auth = authHeaders();
      if (!auth) throw new Error("Sign in to save preferences");
      const data = await fetchJson<ProfileResponse>(
        `${apiBase}/profile`,
        {
          method: "PATCH",
          headers: auth.headers,
          body: JSON.stringify({
            preference: profile?.preference ? { note: profile.preference.note ?? null } : undefined,
          }),
        },
        "auth.profile.save.error",
      );
      void trackTelemetry("auth.profile.save.success");
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["auth", "profile"], data);
    },
  });
}

export function deriveUser(session?: SessionResponse): UserIdentity {
  const email = session?.user?.email || "";
  return email ? { status: "authenticated", email } : { status: "anonymous" };
}
