import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ACCESS_TOKEN_KEY } from "../lib/constants";
import { trackTelemetry } from "../lib/telemetry";

export type PosOverview = {
  metrics: {
    grossRevenue: string;
    tickets: number;
    avgTicket: string;
  };
  orders: Array<{ store: string; channel: string; tickets: number; revenue: string }>;
  topItems: Array<{ name: string; sold: number; revenue: string }>;
  stores: Array<{ id: string; name: string; channel: string }>;
};

function getAuthHeaders() {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
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

export function usePosOverviewQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: ["pos", "overview", apiBase, auth?.token || "anon"],
    enabled,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to access POS.");
      const data = await fetchJson<PosOverview>(`${apiBase}/pos/overview`, { headers: auth.headers }, "pos.overview.error");
      void trackTelemetry("pos.overview.success", { tickets: data.metrics.tickets, stores: data.stores?.length ?? 0 });
      return data;
    },
  });
}

type CreatePosTicketInput = {
  storeId?: string;
  storeName?: string;
  channel?: string;
  total: number;
  items?: Array<{ name: string; quantity?: number; price: number }>;
  status?: string;
};

type CreatePosStoreInput = { name: string; channel?: string };

export function useCreatePosTicket(apiBase: string) {
  const auth = getAuthHeaders();
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["pos", "ticket", "create", apiBase, auth?.token || "anon"],
    mutationFn: async (payload: CreatePosTicketInput) => {
      if (!auth) throw new Error("Sign in to create tickets.");
      const data = await fetchJson<{ ticket: unknown }>(
        `${apiBase}/pos/tickets`,
        {
          method: "POST",
          headers: auth.headers,
          body: JSON.stringify(payload),
        },
        "pos.ticket.error",
      );
      void trackTelemetry("pos.ticket.success", { channel: payload.channel || "In-store" });
      return data.ticket;
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["pos", "overview", apiBase] });
    },
  });
}

export function useCreatePosStore(apiBase: string) {
  const auth = getAuthHeaders();
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["pos", "store", "create", apiBase, auth?.token || "anon"],
    mutationFn: async (payload: CreatePosStoreInput) => {
      if (!auth) throw new Error("Sign in to create stores.");
      const data = await fetchJson<{ store: unknown }>(
        `${apiBase}/pos/stores`,
        {
          method: "POST",
          headers: auth.headers,
          body: JSON.stringify(payload),
        },
        "pos.store.error",
      );
      void trackTelemetry("pos.store.success", { channel: payload.channel || "In-store" });
      return data.store;
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["pos", "overview", apiBase] });
    },
  });
}
