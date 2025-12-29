import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ACCESS_TOKEN_KEY } from "../lib/constants";
import { trackTelemetry } from "../lib/telemetry";

export type AgricultureOverview = {
  plots: Array<{ id: string; name: string; crop: string; stage: string; acres: string; health: string }>;
  tasks: Array<{ id: string; title: string; assignee: string | null; dueDate: string | null; status: string }>;
  shipments: Array<{ id: string; lot: string; destination: string; mode: string; eta: string | null; freightLoadId: string | null }>;
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

export function useAgricultureOverviewQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: ["agriculture", "overview", apiBase, auth?.token || "anon"],
    enabled,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to access agriculture.");
      const data = await fetchJson<AgricultureOverview>(`${apiBase}/agriculture/overview`, { headers: auth.headers }, "agriculture.overview.error");
      void trackTelemetry("agriculture.overview.success", {
        plots: data.plots?.length ?? 0,
        tasks: data.tasks?.length ?? 0,
        shipments: data.shipments?.length ?? 0,
      });
      return data;
    },
  });
}

type CreatePlotInput = { name: string; crop: string; stage?: string; acres: number; health?: string };
type CreateTaskInput = { title: string; assignee?: string; dueDate?: string; status?: string };
type CreateShipmentInput = { lot: string; destination: string; mode: string; eta?: string; freightLoadId?: string };

export function useCreateAgriculturePlot(apiBase: string) {
  const auth = getAuthHeaders();
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["agriculture", "plot", "create", apiBase, auth?.token || "anon"],
    mutationFn: async (payload: CreatePlotInput) => {
      if (!auth) throw new Error("Sign in to create plots.");
      const data = await fetchJson<{ plot: unknown }>(
        `${apiBase}/agriculture/plots`,
        {
          method: "POST",
          headers: auth.headers,
          body: JSON.stringify(payload),
        },
        "agriculture.plot.error",
      );
      void trackTelemetry("agriculture.plot.success", { crop: payload.crop });
      return data.plot;
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["agriculture", "overview", apiBase] });
    },
  });
}

export function useCreateAgricultureTask(apiBase: string) {
  const auth = getAuthHeaders();
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["agriculture", "task", "create", apiBase, auth?.token || "anon"],
    mutationFn: async (payload: CreateTaskInput) => {
      if (!auth) throw new Error("Sign in to create tasks.");
      const data = await fetchJson<{ task: unknown }>(
        `${apiBase}/agriculture/tasks`,
        {
          method: "POST",
          headers: auth.headers,
          body: JSON.stringify(payload),
        },
        "agriculture.task.error",
      );
      void trackTelemetry("agriculture.task.success", { status: payload.status || "pending" });
      return data.task;
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["agriculture", "overview", apiBase] });
    },
  });
}

export function useCreateAgricultureShipment(apiBase: string) {
  const auth = getAuthHeaders();
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["agriculture", "shipment", "create", apiBase, auth?.token || "anon"],
    mutationFn: async (payload: CreateShipmentInput) => {
      if (!auth) throw new Error("Sign in to create shipments.");
      const data = await fetchJson<{ shipment: unknown }>(
        `${apiBase}/agriculture/shipments`,
        {
          method: "POST",
          headers: auth.headers,
          body: JSON.stringify(payload),
        },
        "agriculture.shipment.error",
      );
      void trackTelemetry("agriculture.shipment.success", { mode: payload.mode, freightLinked: Boolean(payload.freightLoadId) });
      return data.shipment;
    },
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["agriculture", "overview", apiBase] });
    },
  });
}
