import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "../lib/query-client";
import { trackTelemetry } from "../lib/telemetry";
import { ACCESS_TOKEN_KEY } from "../lib/constants";

export type WarehouseItem = {
  id: string;
  sku: string;
  description?: string | null;
  quantity: number;
  location: string;
  status: string;
  freightLoadId?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

const warehouseKeys = {
  list: (apiBase: string, token: string) => ["warehouse", apiBase, token || "anon"],
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
    void trackTelemetry(onErrorMetric, { message, status: res.status });
    throw new Error(message);
  }
  return data as T;
}

export function useWarehouseItemsQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: warehouseKeys.list(apiBase, auth?.token || ""),
    enabled,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to view warehouse items.");
      const data = await fetchJson<{ items: WarehouseItem[] }>(`${apiBase}/warehouse/items`, { headers: auth.headers }, "warehouse.list.error");
      void trackTelemetry("warehouse.list.success", { count: Array.isArray(data.items) ? data.items.length : 0 });
      return data.items;
    },
  });
}

export function useCreateWarehouseItemMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["warehouse", "create", apiBase, auth?.token || ""],
    mutationFn: async (payload: {
      sku: string;
      description?: string;
      quantity: number;
      location: string;
      status?: string;
      freightLoadId?: string;
    }) => {
      if (!auth) throw new Error("Sign in to create items.");
      const data = await fetchJson<{ item: WarehouseItem }>(
        `${apiBase}/warehouse/items`,
        { method: "POST", headers: auth.headers, body: JSON.stringify(payload) },
        "warehouse.create.error",
      );
      void trackTelemetry("warehouse.create.success", { sku: payload.sku, freightLoadId: payload.freightLoadId });
      return data.item;
    },
    onSuccess: () => {
      const token = getToken();
      void queryClient.invalidateQueries({ queryKey: ["warehouse", apiBase, token] });
    },
  });
}

export function useUpdateWarehouseItemMutation(apiBase: string) {
  const auth = getAuthHeaders();
  return useMutation({
    mutationKey: ["warehouse", "update", apiBase, auth?.token || ""],
    mutationFn: async (payload: {
      id: string;
      description?: string;
      quantity?: number;
      location?: string;
      status?: string;
      freightLoadId?: string | null;
    }) => {
      if (!auth) throw new Error("Sign in to update items.");
      const { id, ...rest } = payload;
      const data = await fetchJson<{ item: WarehouseItem }>(
        `${apiBase}/warehouse/items/${id}`,
        { method: "PATCH", headers: auth.headers, body: JSON.stringify(rest) },
        "warehouse.update.error",
      );
      void trackTelemetry("warehouse.update.success", { id });
      return data.item;
    },
    onSuccess: (data) => {
      const token = getToken();
      void queryClient.invalidateQueries({ queryKey: ["warehouse", apiBase, token] });
      void queryClient.invalidateQueries({ queryKey: ["freight", apiBase, token] });
      return data;
    },
  });
}
