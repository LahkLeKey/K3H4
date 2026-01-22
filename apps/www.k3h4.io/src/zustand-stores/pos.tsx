import { create } from "zustand";
import { z } from "zod";

import { apiFetch } from "@/react-hooks/lib/api-client";
import { useAuthStore } from "./auth";

const PosMetricsSchema = z.object({
    grossRevenue: z.string(),
    tickets: z.number(),
    avgTicket: z.string(),
});

const PosOrderSchema = z.object({
    store: z.string(),
    channel: z.string(),
    tickets: z.number(),
    revenue: z.string(),
});

const PosTopItemSchema = z.object({
    name: z.string(),
    sold: z.number(),
    revenue: z.string(),
});

const PosStoreSchema = z.object({
    id: z.string(),
    name: z.string(),
    channel: z.string().nullish(),
});

const PosOverviewSchema = z.object({
    metrics: PosMetricsSchema,
    orders: z.array(PosOrderSchema),
    topItems: z.array(PosTopItemSchema),
    stores: z.array(PosStoreSchema),
});

export type PosOverview = z.infer<typeof PosOverviewSchema>;

export type PosState = {
    overview: PosOverview | null;
    status: "idle" | "loading" | "ready" | "error";
    error: string | null;
    fetchOverview: () => Promise<void>;
};

export const usePosStore = create<PosState>((set) => ({
    overview: null,
    status: "idle",
    error: null,

    fetchOverview: async () => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to load POS." });
            return;
        }
        set({ status: "loading", error: null });
        try {
            const overview = await apiFetch("/pos/overview", {
                token: session.accessToken,
                baseUrl: apiBase,
                schema: PosOverviewSchema,
            });
            set({ overview, status: "ready", error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to fetch POS overview";
            set({ status: "error", error: message });
        }
    },
}));

export function usePosState() {
    return usePosStore();
}
