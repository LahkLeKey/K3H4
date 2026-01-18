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
  attributes?: PersonaAttribute[];
};

export type PersonaAttribute = {
  id: string;
  category: string;
  value: string;
  weight: number;
};

export type PersonaCompatibility = {
  id: string;
  sourceId: string;
  targetId: string;
  jaccardScore: number;
  intersectionCount: number;
  unionCount: number;
  overlappingTokens: string[];
  computedAt: string;
  status: string;
  rationale?: string;
  source: Persona;
  target: Persona;
};

export type PersonaConfusionMatrix = {
  threshold: number;
  counts: { tp: number; fp: number; tn: number; fn: number };
  metrics: { accuracy: number; precision: number; recall: number; f1: number };
  evaluated: number;
  missing: number;
  details: Array<{
    id: string;
    probability: number;
    predicted: boolean;
    label: boolean;
    usedOnnx: boolean;
    sourceId: string;
    targetId: string;
    jaccardScore: number;
  }>;
};

const personaKeys = {
  list: (apiBase: string, token: string) => ["personas", apiBase, token || "anon"],
  compatibility: (apiBase: string, token: string, personaId?: string) => ["personas", "compatibility", apiBase, token || "anon", personaId ?? "all"],
};

export function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(ACCESS_TOKEN_KEY) || "";
}

export function getAuthHeaders() {
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

export async function fetchJson<T>(url: string, options: RequestInit, onErrorMetric: string): Promise<T> {
  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) {
    const message = (data as any)?.error || "Request failed";
    void trackTelemetry(onErrorMetric, { message });
    throw new Error(message);
  }
  return data as T;
}

export const personaApi = {
  async list(apiBase: string): Promise<Persona[]> {
    const auth = getAuthHeaders();
    if (!auth) throw new Error("Sign in to access personas.");
    const data = await fetchJson<{ personas: Persona[] }>(`${apiBase}/personas`, { headers: auth.headers }, "persona.list.error");
    void trackTelemetry("persona.list.success", { count: Array.isArray(data.personas) ? data.personas.length : 0 });
    return data.personas;
  },

  async compatibility(apiBase: string, personaId?: string): Promise<PersonaCompatibility[]> {
    const auth = getAuthHeaders();
    if (!auth) throw new Error("Sign in to access compatibility.");
    const url = personaId
      ? `${apiBase}/personas/compatibility?personaId=${encodeURIComponent(personaId)}`
      : `${apiBase}/personas/compatibility`;
    const data = await fetchJson<{ compatibilities: PersonaCompatibility[] }>(url, { headers: auth.headers }, "persona.compatibility.error");
    void trackTelemetry("persona.compatibility.success", { count: data.compatibilities.length });
    return data.compatibilities;
  },

  async recomputeCompatibility(apiBase: string): Promise<PersonaCompatibility[]> {
    const auth = getAuthHeaders();
    if (!auth) throw new Error("Sign in to recompute compatibility.");
    const data = await fetchJson<{ compatibilities: PersonaCompatibility[] }>(
      `${apiBase}/personas/compatibility/recompute`,
      { method: "POST", headers: auth.headers, body: "{}" },
      "persona.compatibility.recompute.error",
    );
    void trackTelemetry("persona.compatibility.recompute.success", { count: data.compatibilities.length });
    return data.compatibilities;
  },

  async confusion(apiBase: string, payload: { pairs: { sourceId: string; targetId: string; label: boolean }[]; threshold?: number }): Promise<PersonaConfusionMatrix> {
    const auth = getAuthHeaders();
    if (!auth) throw new Error("Sign in to evaluate compatibility.");
    const data = await fetchJson<PersonaConfusionMatrix>(
      `${apiBase}/personas/compatibility/confusion`,
      { method: "POST", headers: auth.headers, body: JSON.stringify(payload) },
      "persona.compatibility.confusion.error",
    );
    void trackTelemetry("persona.compatibility.confusion.success", { evaluated: data.evaluated, threshold: data.threshold });
    return data;
  },
};

export function usePersonaListQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: personaKeys.list(apiBase, auth?.token || ""),
    enabled,
    queryFn: () => personaApi.list(apiBase),
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
      void queryClient.invalidateQueries({ queryKey: personaKeys.compatibility(apiBase, token) });
    },
  });
}

export function usePersonaCompatibilityQuery(apiBase: string, personaId?: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: personaKeys.compatibility(apiBase, auth?.token || "", personaId),
    enabled,
    queryFn: () => personaApi.compatibility(apiBase, personaId),
  });
}

export function useRecomputePersonaCompatibilityMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["personas", "compatibility", "recompute", apiBase, auth?.token || ""],
    mutationFn: async () => {
      return personaApi.recomputeCompatibility(apiBase);
    },
    onSuccess: () => {
      const token = getToken();
      void queryClient.invalidateQueries({ queryKey: personaKeys.compatibility(apiBase, token) });
      void queryClient.invalidateQueries({ queryKey: ["personas", apiBase, token] });
    },
  });
}

export function useUpsertPersonaAttributesMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["personas", "attributes", apiBase, auth?.token || ""],
    mutationFn: async (payload: { personaId: string; attributes: { category: string; values: string[]; weight?: number }[] }) => {
      if (!auth) throw new Error("Sign in to update attributes.");
      const data = await fetchJson<{ persona: Persona }>(
        `${apiBase}/personas/${payload.personaId}/attributes`,
        { method: "PUT", headers: auth.headers, body: JSON.stringify({ attributes: payload.attributes }) },
        "persona.attributes.error",
      );
      void trackTelemetry("persona.attributes.success", { personaId: payload.personaId, count: payload.attributes.length });
      return data.persona;
    },
    onSuccess: () => {
      const token = getToken();
      void queryClient.invalidateQueries({ queryKey: ["personas", apiBase, token] });
      void queryClient.invalidateQueries({ queryKey: personaKeys.compatibility(apiBase, token) });
    },
  });
}

export function usePersonaConfusionMatrixMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["personas", "compatibility", "confusion", apiBase, auth?.token || ""],
    mutationFn: async (payload: { pairs: { sourceId: string; targetId: string; label: boolean }[]; threshold?: number }) => {
      return personaApi.confusion(apiBase, payload);
    },
  });
}
