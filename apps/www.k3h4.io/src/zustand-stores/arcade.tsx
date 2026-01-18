import { create } from "zustand";
import { z } from "zod";

import { apiFetch } from "../lib/api-client";
import { useAuthStore } from "./auth";

const ArcadeMachineSchema = z.object({
    id: z.string(),
    name: z.string(),
    status: z.string().nullish(),
    createdAt: z.string().nullish(),
});

const ArcadeTopUpSchema = z.object({
    id: z.string(),
    amount: z.string(),
    source: z.string().nullish(),
    createdAt: z.string().nullish(),
});

const ArcadeCardSchema = z.object({
    id: z.string(),
    label: z.string().nullish(),
    balance: z.string(),
    topUps: z.array(ArcadeTopUpSchema).default([]),
});

const ArcadePrizeSchema = z.object({
    id: z.string(),
    name: z.string(),
    sku: z.string().nullish(),
    costCoins: z.string().nullish(),
    stock: z.number().default(0),
});

const ArcadeSessionSchema = z.object({
    id: z.string(),
    machineId: z.string(),
    cardId: z.string(),
    creditsSpent: z.string().nullish(),
    score: z.number().nullish(),
    startedAt: z.string().nullish(),
});

const ArcadeRedemptionSchema = z.object({
    id: z.string(),
    prizeId: z.string(),
    cardId: z.string(),
    sessionId: z.string().nullish(),
    createdAt: z.string().nullish(),
});

const ArcadeOverviewSchema = z.object({
    machines: z.array(ArcadeMachineSchema),
    cards: z.array(ArcadeCardSchema),
    prizes: z.array(ArcadePrizeSchema),
    sessions: z.array(ArcadeSessionSchema),
    redemptions: z.array(ArcadeRedemptionSchema),
});

export type ArcadeOverview = z.infer<typeof ArcadeOverviewSchema>;

export type ArcadeState = {
    overview: ArcadeOverview | null;
    status: "idle" | "loading" | "ready" | "error";
    error: string | null;
    fetchOverview: () => Promise<void>;
};

export const useArcadeStore = create<ArcadeState>((set) => ({
    overview: null,
    status: "idle",
    error: null,

    fetchOverview: async () => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to load arcade." });
            return;
        }
        set({ status: "loading", error: null });
        try {
            const overview = await apiFetch("/arcade/overview", {
                token: session.accessToken,
                baseUrl: apiBase,
                schema: ArcadeOverviewSchema,
            });
            set({ overview, status: "ready", error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to fetch arcade";
            set({ status: "error", error: message });
        }
    },
}));

export function useArcadeState() {
    return useArcadeStore();
}
