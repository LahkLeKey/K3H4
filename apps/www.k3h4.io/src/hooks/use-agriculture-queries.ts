import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ACCESS_TOKEN_KEY } from "../lib/constants";
import { trackTelemetry } from "../lib/telemetry";

type AuthHeaders = {
  token: string;
  headers: {
    Authorization: string;
    "Content-Type": string;
  };
} | null;

export type AgricultureOverview = {
  plots: number;
  tasks: number;
  shipments: number;
  unlockedSlots: number;
  seeds?: string;
  fertilizer?: string;
  feed?: string;
  harvest?: string;
  debt?: string;
  pnl?: string;
  burnRate?: string;
  receivables?: string;
};

export type AgriculturePlotSummary = {
  id: string;
  name: string;
  crop: string;
  stage: string;
  acres: string;
  health: string;
  latestCondition:
    | {
        recordedAt: string;
        temperature?: number | null;
        moisture?: number | null;
        ph?: string | null;
        notes?: string | null;
      }
    | null;
  plans: Array<{
    id: string;
    crop: string;
    phase: string;
    status: string;
    startDate: string;
    targetHarvestDate?: string | null;
    endDate?: string | null;
  }>;
};

export type AgriculturePlanSummary = {
  id: string;
  crop: string;
  phase: string;
  status: string;
  startDate: string;
  targetHarvestDate?: string | null;
  endDate?: string | null;
  notes?: string | null;
  plotId: string;
  tasks: Array<{ id: string; title: string; status: string }>;
};

export type AgricultureTaskSummary = {
  id: string;
  title: string;
  assignee: string | null;
  status: string;
  dueDate: string | null;
};

export type AgricultureInventoryItem = {
  id: string;
  sku: string;
  description: string | null;
  totalQuantity: string;
  unit: string;
  location: string | null;
  status: string;
  movements: Array<{
    id: string;
    type: string;
    quantity: string;
    reason: string | null;
    shipmentId: string | null;
    createdAt: string;
  }>;
};

export type AgricultureAnalyticsSnapshot = {
  totalPlots: number;
  planPhaseCounts: Record<string, number>;
  taskStatusCounts: Record<string, number>;
  inventoryHighlights: Array<{ sku: string; totalQuantity: string; unit: string }>;
  trackedShipments: number;
  pnl?: string;
  burnRate?: string;
  receivables?: string;
  animalAlerts?: number;
  debt?: string;
};

export type AgricultureResource = {
  id: string;
  title: string;
  summary: string;
  url: string;
  tags: string[];
  source: string | null;
};

export type AgricultureResourceCategory = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  resources: AgricultureResource[];
};

export type AgricultureSlot = {
  id: string;
  slotIndex: number;
  costPaid: string;
  unlockedAt: string;
  plotId: string | null;
  plot: { id: string; name: string; crop: string; stage: string } | null;
};

export const getAuthHeaders = (): AuthHeaders => {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) return null;
  return {
    token,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

async function fetchJson<T>(url: string, options: RequestInit | undefined, onErrorMetric: string): Promise<T> {
  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) {
    const message = (data as any)?.error || "Request failed";
    void trackTelemetry(onErrorMetric, { message });
    throw new Error(message);
  }
  return data as T;
}

const invalidateAgricultureQueries = async (
  client: ReturnType<typeof useQueryClient>,
  apiBase: string,
  token: string,
) => {
  const scopes = ["overview", "plots", "plans", "tasks", "inventory", "analytics", "resources", "slots"];
  await Promise.all(
    scopes.map((scope) => client.invalidateQueries({ queryKey: ["agriculture", scope, apiBase, token] })),
  );
};

export function useAgricultureOverviewQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: ["agriculture", "overview", apiBase, auth?.token ?? "anon"],
    enabled,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to access agriculture.");
      const data = await fetchJson<AgricultureOverview>(
        `${apiBase}/agriculture/overview`,
        { headers: auth.headers },
        "agriculture.overview.error",
      );
      void trackTelemetry("agriculture.overview.success", {
        plots: data.plots,
        tasks: data.tasks,
        shipments: data.shipments,
      });
      return data;
    },
  });
}

export function useAgricultureSlotsQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: ["agriculture", "slots", apiBase, auth?.token ?? "anon"],
    enabled,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to view slots.");
      const data = await fetchJson<{ slots: AgricultureSlot[] }>(
        `${apiBase}/agriculture/slots`,
        { headers: auth.headers },
        "agriculture.slots.error",
      );
      void trackTelemetry("agriculture.slots.success", { count: data.slots.length });
      return data;
    },
  });
}

export function useAgriculturePlotsQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: ["agriculture", "plots", apiBase, auth?.token ?? "anon"],
    enabled,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to view plots.");
      const data = await fetchJson<{ plots: AgriculturePlotSummary[] }>(
        `${apiBase}/agriculture/plots`,
        { headers: auth.headers },
        "agriculture.plots.error",
      );
      void trackTelemetry("agriculture.plots.success", { count: data.plots.length });
      return data;
    },
  });
}

export function useAgriculturePlansQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: ["agriculture", "plans", apiBase, auth?.token ?? "anon"],
    enabled,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to view plans.");
      const data = await fetchJson<{ plans: AgriculturePlanSummary[] }>(
        `${apiBase}/agriculture/plans`,
        { headers: auth.headers },
        "agriculture.plans.error",
      );
      void trackTelemetry("agriculture.plans.success", { count: data.plans.length });
      return data;
    },
  });
}

export function useAgricultureTasksQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: ["agriculture", "tasks", apiBase, auth?.token ?? "anon"],
    enabled,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to view tasks.");
      const data = await fetchJson<{ tasks: AgricultureTaskSummary[] }>(
        `${apiBase}/agriculture/tasks`,
        { headers: auth.headers },
        "agriculture.tasks.error",
      );
      void trackTelemetry("agriculture.tasks.success", { count: data.tasks.length });
      return data;
    },
  });
}

export function useAgricultureInventoryQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: ["agriculture", "inventory", apiBase, auth?.token ?? "anon"],
    enabled,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to view inventory.");
      const data = await fetchJson<{ inventory: AgricultureInventoryItem[] }>(
        `${apiBase}/agriculture/inventory`,
        { headers: auth.headers },
        "agriculture.inventory.error",
      );
      void trackTelemetry("agriculture.inventory.success", { count: data.inventory.length });
      return data;
    },
  });
}

export function useAgricultureAnalyticsQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: ["agriculture", "analytics", apiBase, auth?.token ?? "anon"],
    enabled,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to access analytics.");
      const data = await fetchJson<AgricultureAnalyticsSnapshot>(
        `${apiBase}/agriculture/analytics`,
        { headers: auth.headers },
        "agriculture.analytics.error",
      );
      void trackTelemetry("agriculture.analytics.success", {
        totalPlots: data.totalPlots,
        trackedShipments: data.trackedShipments,
      });
      return data;
    },
  });
}

export function useAgricultureResourcesQuery(apiBase: string) {
  const auth = getAuthHeaders();
  const enabled = !!auth?.token;

  return useQuery({
    queryKey: ["agriculture", "resources", apiBase, auth?.token ?? "anon"],
    enabled,
    queryFn: async () => {
      if (!auth) throw new Error("Sign in to view resource guides.");
      const data = await fetchJson<{ categories: AgricultureResourceCategory[] }>(
        `${apiBase}/agriculture/resources`,
        { headers: auth.headers },
        "agriculture.resources.error",
      );
      void trackTelemetry("agriculture.resources.success", { categories: data.categories.length });
      return data;
    },
  });
}

type CreatePlotInput = { name: string; crop: string; stage?: string; acres: number; health?: string };
type CreateTaskInput = { title: string; assignee?: string; dueDate?: string; status?: string };
type CreateShipmentInput = { lot: string; destination: string; mode: string; eta?: string; freightLoadId?: string };
type UnlockSlotInput = { costPaid?: number | string };
type UpdateSlotInput = { slotId: string; plotId?: string | null };

export function useCreateAgriculturePlot(apiBase: string) {
  const auth = getAuthHeaders();
  const client = useQueryClient();
  const queryToken = auth?.token ?? "anon";

  return useMutation({
    mutationKey: ["agriculture", "plot", "create", apiBase, queryToken],
    mutationFn: async (payload: CreatePlotInput) => {
      if (!auth) throw new Error("Sign in to create plots.");
      const data = await fetchJson<{ id: string }>(
        `${apiBase}/agriculture/plots`,
        {
          method: "POST",
          headers: auth.headers,
          body: JSON.stringify(payload),
        },
        "agriculture.plot.error",
      );
      void trackTelemetry("agriculture.plot.success", { crop: payload.crop });
      return data;
    },
    onSuccess: async () => {
      await invalidateAgricultureQueries(client, apiBase, queryToken);
    },
  });
}

export function useUnlockAgricultureSlot(apiBase: string) {
  const auth = getAuthHeaders();
  const client = useQueryClient();
  const queryToken = auth?.token ?? "anon";

  return useMutation({
    mutationKey: ["agriculture", "slot", "unlock", apiBase, queryToken],
    mutationFn: async (payload: UnlockSlotInput) => {
      if (!auth) throw new Error("Sign in to unlock slots.");
      const data = await fetchJson<AgricultureSlot>(
        `${apiBase}/agriculture/slots/unlock`,
        {
          method: "POST",
          headers: auth.headers,
          body: JSON.stringify(payload ?? {}),
        },
        "agriculture.slot.unlock.error",
      );
      void trackTelemetry("agriculture.slot.unlock.success", { slotIndex: data.slotIndex });
      return data;
    },
    onSuccess: async () => {
      await invalidateAgricultureQueries(client, apiBase, queryToken);
    },
  });
}

export function useUpdateAgricultureSlot(apiBase: string) {
  const auth = getAuthHeaders();
  const client = useQueryClient();
  const queryToken = auth?.token ?? "anon";

  return useMutation({
    mutationKey: ["agriculture", "slot", "update", apiBase, queryToken],
    mutationFn: async (payload: UpdateSlotInput) => {
      if (!auth) throw new Error("Sign in to update slots.");
      const data = await fetchJson<AgricultureSlot>(
        `${apiBase}/agriculture/slots/${payload.slotId}`,
        {
          method: "PATCH",
          headers: auth.headers,
          body: JSON.stringify({ plotId: payload.plotId ?? null }),
        },
        "agriculture.slot.update.error",
      );
      void trackTelemetry("agriculture.slot.update.success", { slotId: payload.slotId, plotId: data.plotId });
      return data;
    },
    onSuccess: async () => {
      await invalidateAgricultureQueries(client, apiBase, queryToken);
    },
  });
}

export function useCreateAgricultureTask(apiBase: string) {
  const auth = getAuthHeaders();
  const client = useQueryClient();
  const queryToken = auth?.token ?? "anon";

  return useMutation({
    mutationKey: ["agriculture", "task", "create", apiBase, queryToken],
    mutationFn: async (payload: CreateTaskInput) => {
      if (!auth) throw new Error("Sign in to create tasks.");
      const data = await fetchJson<AgricultureTaskSummary>(
        `${apiBase}/agriculture/tasks`,
        {
          method: "POST",
          headers: auth.headers,
          body: JSON.stringify(payload),
        },
        "agriculture.task.error",
      );
      void trackTelemetry("agriculture.task.success", { status: payload.status || "pending" });
      return data;
    },
    onSuccess: async () => {
      await invalidateAgricultureQueries(client, apiBase, queryToken);
    },
  });
}

export function useCreateAgricultureShipment(apiBase: string) {
  const auth = getAuthHeaders();
  const client = useQueryClient();
  const queryToken = auth?.token ?? "anon";

  return useMutation({
    mutationKey: ["agriculture", "shipment", "create", apiBase, queryToken],
    mutationFn: async (payload: CreateShipmentInput) => {
      if (!auth) throw new Error("Sign in to create shipments.");
      const data = await fetchJson<{ id: string }>(
        `${apiBase}/agriculture/shipments`,
        {
          method: "POST",
          headers: auth.headers,
          body: JSON.stringify(payload),
        },
        "agriculture.shipment.error",
      );
      void trackTelemetry("agriculture.shipment.success", { mode: payload.mode, freightLinked: Boolean(payload.freightLoadId) });
      return data;
    },
    onSuccess: async () => {
      await invalidateAgricultureQueries(client, apiBase, queryToken);
    },
  });
}
