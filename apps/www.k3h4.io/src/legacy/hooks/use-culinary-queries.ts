import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ACCESS_TOKEN_KEY } from "../lib/constants";
import { trackTelemetry } from "../lib/telemetry";

export type CulinaryOverview = {
  menuItems: Array<{ id: string; name: string; prepMinutes: number; cost: string; price: string }>;
  prepTasks: Array<{ id: string; task: string; station: string; dueAt: string | null; status: string }>;
  supplierNeeds: Array<{ id: string; item: string; quantity: string; status: string; dueDate: string | null }>;
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

export function useCulinaryOverviewQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: ["culinary", "overview", apiBase, auth?.token || "anon"],
    enabled,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to access culinary.");
      const data = await fetchJson<CulinaryOverview>(`${apiBase}/culinary/overview`, { headers: auth.headers }, "culinary.overview.error");
      void trackTelemetry("culinary.overview.success", {
        menu: data.menuItems?.length ?? 0,
        prep: data.prepTasks?.length ?? 0,
        suppliers: data.supplierNeeds?.length ?? 0,
      });
      return data;
    },
  });
}

type CreateMenuItemInput = { name: string; prepMinutes: number; cost: number; price: number };
type CreatePrepTaskInput = { task: string; station: string; dueAt?: string; status?: string };
type CreateSupplierNeedInput = { item: string; quantity: string; status?: string; dueDate?: string };

export function useCreateCulinaryMenuItem(apiBase: string) {
  const auth = getAuthHeaders();
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["culinary", "menu", "create", apiBase, auth?.token || "anon"],
    mutationFn: async (payload: CreateMenuItemInput) => {
      if (!auth) throw new Error("Sign in to create menu items.");
      const data = await fetchJson<{ item: unknown }>(
        `${apiBase}/culinary/menu-items`,
        {
          method: "POST",
          headers: auth.headers,
          body: JSON.stringify(payload),
        },
        "culinary.menu.error",
      );
      void trackTelemetry("culinary.menu.success", { name: payload.name });
      return data.item;
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["culinary", "overview", apiBase] });
    },
  });
}

export function useCreateCulinaryPrepTask(apiBase: string) {
  const auth = getAuthHeaders();
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["culinary", "prep", "create", apiBase, auth?.token || "anon"],
    mutationFn: async (payload: CreatePrepTaskInput) => {
      if (!auth) throw new Error("Sign in to create prep tasks.");
      const dueAtIso = payload.dueAt
        ? (() => {
            const [hours, minutes] = payload.dueAt.split(":").map((v) => Number(v));
            if (Number.isNaN(hours) || Number.isNaN(minutes)) return undefined;
            const d = new Date();
            d.setHours(hours, minutes, 0, 0);
            return d.toISOString();
          })()
        : undefined;
      const data = await fetchJson<{ prep: unknown }>(
        `${apiBase}/culinary/prep-tasks`,
        {
          method: "POST",
          headers: auth.headers,
          body: JSON.stringify({ ...payload, dueAt: dueAtIso }),
        },
        "culinary.prep.error",
      );
      void trackTelemetry("culinary.prep.success", { station: payload.station });
      return data.prep;
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["culinary", "overview", apiBase] });
    },
  });
}

export function useCreateCulinarySupplierNeed(apiBase: string) {
  const auth = getAuthHeaders();
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["culinary", "supplier", "create", apiBase, auth?.token || "anon"],
    mutationFn: async (payload: CreateSupplierNeedInput) => {
      if (!auth) throw new Error("Sign in to create supplier needs.");
      const data = await fetchJson<{ need: unknown }>(
        `${apiBase}/culinary/supplier-needs`,
        {
          method: "POST",
          headers: auth.headers,
          body: JSON.stringify(payload),
        },
        "culinary.supplier.error",
      );
      void trackTelemetry("culinary.supplier.success", { item: payload.item });
      return data.need;
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["culinary", "overview", apiBase] });
    },
  });
}
