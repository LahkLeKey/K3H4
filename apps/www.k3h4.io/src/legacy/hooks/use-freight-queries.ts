import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "../lib/query-client";
import { trackTelemetry } from "../lib/telemetry";
import { ACCESS_TOKEN_KEY } from "../lib/constants";

export type FreightLoad = {
  id: string;
  title: string;
  originName: string;
  originLat: number;
  originLng: number;
  destinationName: string;
  destinationLat: number;
  destinationLng: number;
  distanceKm: string | number;
  durationMinutes: number;
  cost: string | number;
  status: string;
  routeGeoJson?: any;
  createdAt?: string;
  updatedAt?: string;
};

const freightKeys = {
  list: (apiBase: string, token: string) => ["freight", apiBase, token || "anon"],
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

export function useFreightLoadsQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: freightKeys.list(apiBase, auth?.token || ""),
    enabled,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to access freight loads.");
      const data = await fetchJson<{ loads: FreightLoad[] }>(`${apiBase}/freight`, { headers: auth.headers }, "freight.list.error");
      void trackTelemetry("freight.list.success", { count: Array.isArray(data.loads) ? data.loads.length : 0 });
      return data.loads;
    },
  });
}

export function useCreateFreightMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["freight", "create", apiBase, auth?.token || ""],
    mutationFn: async (payload: {
      title: string;
      originName: string;
      originLat: number;
      originLng: number;
      destinationName: string;
      destinationLat: number;
      destinationLng: number;
      ratePerKm?: number;
    }) => {
      if (!auth) throw new Error("Sign in to create freight loads.");
      const data = await fetchJson<{ load: FreightLoad }>(
        `${apiBase}/freight`,
        { method: "POST", headers: auth.headers, body: JSON.stringify(payload) },
        "freight.create.error",
      );
      void trackTelemetry("freight.create.success", { title: payload.title, rate: payload.ratePerKm });
      return data.load;
    },
    onSuccess: () => {
      const token = getToken();
      void queryClient.invalidateQueries({ queryKey: ["freight", apiBase, token] });
    },
  });
}

export function useCompleteFreightMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["freight", "complete", apiBase, auth?.token || ""],
    mutationFn: async (payload: { id: string }) => {
      if (!auth) throw new Error("Sign in to complete freight loads.");
      const data = await fetchJson<{ load: FreightLoad }>(
        `${apiBase}/freight/${payload.id}/complete`,
        { method: "POST", headers: auth.headers, body: JSON.stringify({}) },
        "freight.complete.error",
      );
      void trackTelemetry("freight.complete.success", { id: payload.id });
      return data.load;
    },
    onSuccess: () => {
      const token = getToken();
      void queryClient.invalidateQueries({ queryKey: ["freight", apiBase, token] });
      void queryClient.invalidateQueries({ queryKey: ["bank", "balance"] });
    },
  });
}
