import { create } from "zustand";
import { z } from "zod";

import { apiFetch } from "../react-hooks/lib/api-client";
import { useAuthStore } from "./auth";

const AgricultureOverviewSchema = z.object({
    plots: z.number(),
    tasks: z.number(),
    shipments: z.number(),
    unlockedSlots: z.number(),
    seeds: z.string(),
    fertilizer: z.string(),
    feed: z.string(),
    harvest: z.string(),
    debt: z.string(),
    pnl: z.string(),
    burnRate: z.string(),
    receivables: z.string(),
});

export type AgricultureOverview = z.infer<typeof AgricultureOverviewSchema>;

export type AgricultureState = {
    overview: AgricultureOverview | null;
    status: "idle" | "loading" | "ready" | "error";
    error: string | null;
    fetchOverview: () => Promise<void>;
};

export const useAgricultureStore = create<AgricultureState>((set) => ({
    overview: null,
    status: "idle",
    error: null,

    fetchOverview: async () => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to load agriculture." });
            return;
        }
        set({ status: "loading", error: null });
        try {
            const overview = await apiFetch("/agriculture/overview", {
                token: session.accessToken,
                baseUrl: apiBase,
                schema: AgricultureOverviewSchema,
            });
            set({ overview, status: "ready", error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to fetch agriculture";
            set({ status: "error", error: message });
        }
    },
}));

export function useAgricultureState() {
    return useAgricultureStore();
}
