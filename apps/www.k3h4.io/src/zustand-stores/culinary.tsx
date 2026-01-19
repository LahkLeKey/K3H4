import { create } from "zustand";
import { z } from "zod";

import { apiFetch } from "../lib/api-client";
import { useAuthStore } from "./auth";

const CulinaryMenuItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    prepMinutes: z.number(),
    cost: z.string(),
    price: z.string(),
    createdAt: z.string().nullish(),
});

const CulinaryPrepTaskSchema = z.object({
    id: z.string(),
    task: z.string(),
    station: z.string(),
    dueAt: z.string().nullish(),
    status: z.string(),
});

const CulinarySupplierNeedSchema = z.object({
    id: z.string(),
    item: z.string(),
    quantity: z.string(),
    status: z.string(),
    dueDate: z.string().nullish(),
});

const CulinaryOverviewSchema = z.object({
    menuItems: z.array(CulinaryMenuItemSchema),
    prepTasks: z.array(CulinaryPrepTaskSchema),
    supplierNeeds: z.array(CulinarySupplierNeedSchema),
});

export type CulinaryOverview = z.infer<typeof CulinaryOverviewSchema>;

export type CulinaryState = {
    overview: CulinaryOverview | null;
    status: "idle" | "loading" | "ready" | "error";
    error: string | null;
    fetchOverview: () => Promise<void>;
};

export const useCulinaryStore = create<CulinaryState>((set) => ({
    overview: null,
    status: "idle",
    error: null,

    fetchOverview: async () => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to load culinary." });
            return;
        }
        set({ status: "loading", error: null });
        try {
            const overview = await apiFetch("/culinary/overview", {
                token: session.accessToken,
                baseUrl: apiBase,
                schema: CulinaryOverviewSchema,
            });
            set({ overview, status: "ready", error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to fetch culinary";
            set({ status: "error", error: message });
        }
    },
}));

export function useCulinaryState() {
    return useCulinaryStore();
}
