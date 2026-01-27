import { create } from "zustand";
import { z } from "zod";

import { apiFetch } from "../react-hooks/lib/api-client";
import { useAuthStore } from "./auth";

const WarehouseCategorySchema = z.enum(["agriculture", "other"]);
const NormalizedWarehouseCategory = z.preprocess(
    (value) => {
        if (typeof value === "string" && WarehouseCategorySchema.options.includes(value)) {
            return value;
        }
        return "other";
    },
    WarehouseCategorySchema,
);

const WarehouseItemSchema = z.object({
    id: z.string(),
    sku: z.string(),
    description: z.string().nullish(),
    quantity: z.number(),
    location: z.string(),
    status: z.string(),
    category: NormalizedWarehouseCategory,
    metadata: z.any().nullable(),
    freightLoadId: z.string().nullish(),
    createdAt: z.string().nullish(),
});

const WarehouseItemsSchema = z.object({ items: z.array(WarehouseItemSchema) });

export type WarehouseItem = z.infer<typeof WarehouseItemSchema>;

export type WarehouseState = {
    items: WarehouseItem[];
    status: "idle" | "loading" | "ready" | "error";
    error: string | null;
    fetchItems: () => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
    createItem: (payload: { sku: string; location: string; quantity?: number; description?: string }) => Promise<void>;
};

export const useWarehouseStore = create<WarehouseState>((set) => ({
    items: [],
    status: "idle",
    error: null,

    fetchItems: async () => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ status: "error", error: "Sign in to load warehouse." });
            return;
        }
        set({ status: "loading", error: null });
        try {
            const res = await apiFetch("/warehouse/items", {
                token: session.accessToken,
                baseUrl: apiBase,
                schema: WarehouseItemsSchema,
            });
            set({ items: res.items, status: "ready", error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to fetch warehouse";
            set({ status: "error", error: message });
        }
    },
    deleteItem: async (id: string) => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            throw new Error("Sign in to delete items.");
        }
        await apiFetch(`/warehouse/items/${id}`, {
            method: "DELETE",
            token: session.accessToken,
            baseUrl: apiBase,
        });
        set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
    },
    createItem: async (payload) => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            throw new Error("Sign in to add items.");
        }
        const res = await apiFetch("/warehouse/items", {
            method: "POST",
            token: session.accessToken,
            baseUrl: apiBase,
            schema: z.object({ item: WarehouseItemSchema }),
            body: payload,
        });
        set((state) => ({ items: [res.item, ...state.items] }));
    },
}));

export function useWarehouseState() {
    return useWarehouseStore();
}
