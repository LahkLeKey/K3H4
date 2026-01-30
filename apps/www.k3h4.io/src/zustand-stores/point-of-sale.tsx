import { create } from "zustand";
import { z } from "zod";

import { apiFetch } from "../react-hooks/lib/api-client";
import { useAuthStore } from "./auth";

const PointOfSaleMetricsSchema = z.object({
    grossRevenue: z.string(),
    tickets: z.number(),
    avgTicket: z.string(),
});

const PointOfSaleOrderSchema = z.object({
    store: z.string(),
    channel: z.string(),
    tickets: z.number(),
    revenue: z.string(),
});

const PointOfSaleTopItemSchema = z.object({
    name: z.string(),
    sold: z.number(),
    revenue: z.string(),
});

const PointOfSaleStoreSchema = z.object({
    id: z.string(),
    name: z.string(),
    channel: z.string().nullish(),
});

export const PointOfSaleOverviewSchema = z.object({
    metrics: PointOfSaleMetricsSchema,
    orders: z.array(PointOfSaleOrderSchema),
    topItems: z.array(PointOfSaleTopItemSchema),
    stores: z.array(PointOfSaleStoreSchema),
});

export type PointOfSaleOverview = z.infer<typeof PointOfSaleOverviewSchema>;

export type PointOfSaleState = {
    overview: PointOfSaleOverview | null;
    status: "idle" | "loading" | "ready" | "error";
    error: string | null;
    fetchOverview: () => Promise<void>;
};

export const usePointOfSaleStore = create<PointOfSaleState>((set) => ({
    overview: null,
    status: "idle",
    error: null,

    fetchOverview: async () => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to load point of sale data." });
            return;
        }
        set({ status: "loading", error: null });
        try {
            const overview = await apiFetch("/point-of-sale/overview", {
                token: session.accessToken,
                baseUrl: apiBase,
                schema: PointOfSaleOverviewSchema,
            });
            set({ overview, status: "ready", error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to fetch point of sale overview";
            set({ status: "error", error: message });
        }
    },
}));

export function usePointOfSaleState() {
    return usePointOfSaleStore();
}
