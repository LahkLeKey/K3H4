import { create } from "zustand";
import { z } from "zod";

import { apiFetch } from "../lib/api-client";
import { useAuthStore } from "./auth";

const UnknownArraySchema = z.array(z.any());

export type UsdaState = {
    regions: unknown[];
    commodities: unknown[];
    countries: unknown[];
    status: "idle" | "loading" | "ready" | "error";
    error: string | null;
    fetchReference: () => Promise<void>;
};

export const useUsdaStore = create<UsdaState>((set) => ({
    regions: [],
    commodities: [],
    countries: [],
    status: "idle",
    error: null,

    fetchReference: async () => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to load USDA." });
            return;
        }
        set({ status: "loading", error: null });
        try {
            const [regions, commodities, countries] = await Promise.all([
                apiFetch("/usda/esr/regions", { token: session.accessToken, baseUrl: apiBase, schema: UnknownArraySchema }),
                apiFetch("/usda/esr/commodities", { token: session.accessToken, baseUrl: apiBase, schema: UnknownArraySchema }),
                apiFetch("/usda/esr/countries", { token: session.accessToken, baseUrl: apiBase, schema: UnknownArraySchema }),
            ]);
            set({ regions, commodities, countries, status: "ready", error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to fetch USDA";
            set({ status: "error", error: message });
        }
    },
}));

export function useUsdaState() {
    return useUsdaStore();
}
