import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "../lib/query-client";
import { trackTelemetry } from "../lib/telemetry";
import { ACCESS_TOKEN_KEY } from "../lib/constants";

export type Persona = {
  id: string;
  alias: string;
  account: string;
  handle?: string;
  note?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
};

const personaKeys = {
  list: (apiBase: string, token: string) => ["personas", apiBase, token || "anon"],
};

function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(ACCESS_TOKEN_KEY) || "";
}

function getAuthHeaders() {
  const token = getToken();
  if (!token) return null;
  return {
    token,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    } as const,
  };
}

async function fetchJson<T>(url: string, options: RequestInit, onErrorMetric: string): Promise<T> {
  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) {
    const message = (data as any)?.error || "Request failed";
    void trackTelemetry(onErrorMetric, { message });
    throw new Error(message);
  }
  return data as T;
}

export function usePersonaListQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: personaKeys.list(apiBase, auth?.token || ""),
    enabled,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to access personas.");
      const data = await fetchJson<{ personas: Persona[] }>(`${apiBase}/personas`, { headers: auth.headers }, "persona.list.error");
      void trackTelemetry("persona.list.success", { count: Array.isArray(data.personas) ? data.personas.length : 0 });
      return data.personas;
    },
  });
}

export function useCreatePersonaMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["personas", "create", apiBase, auth?.token || ""],
    mutationFn: async (payload: { alias: string; account: string; handle?: string; note?: string; tags?: string[] }) => {
      if (!auth) throw new Error("Sign in to create personas.");
      const data = await fetchJson<{ persona: Persona }>(
        `${apiBase}/personas`,
        { method: "POST", headers: auth.headers, body: JSON.stringify(payload) },
        "persona.create.error",
      );
      void trackTelemetry("persona.create.success", { hasHandle: !!payload.handle, hasTags: Array.isArray(payload.tags) && payload.tags.length > 0 });
      return data.persona;
    },
    onSuccess: () => {
      const token = getToken();
      void queryClient.invalidateQueries({ queryKey: ["personas", apiBase, token] });
    },
  });
}

export function useGeneratePersonaMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["personas", "generate", apiBase, auth?.token || ""],
    mutationFn: async (count: number = 1) => {
      if (!auth) throw new Error("Sign in to generate personas.");
      const data = await fetchJson<{ personas: Persona[] }>(
        `${apiBase}/personas/generate`,
        { method: "POST", headers: auth.headers, body: JSON.stringify({ count }) },
        "persona.generate.error",
      );
      void trackTelemetry("persona.generate.success", { count });
      return data.personas;
    },
    onSuccess: () => {
      const token = getToken();
      void queryClient.invalidateQueries({ queryKey: ["personas", apiBase, token] });
    },
  });
}
