import { create } from "zustand";
import { z } from "zod";

import { apiFetch } from "../lib/api-client";
import { useAuthStore } from "./auth";

const FreightLoadSchema = z.object({
    id: z.string(),
    title: z.string(),
    originName: z.string(),
    originLat: z.coerce.number(),
    originLng: z.coerce.number(),
    destinationName: z.string(),
    destinationLat: z.coerce.number(),
    destinationLng: z.coerce.number(),
    distanceKm: z.coerce.number(),
    durationMinutes: z.coerce.number().nullable().optional(),
    cost: z.coerce.number(),
    status: z.string(),
    routeGeoJson: z.any().nullable().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
});

const FreightListSchema = z.object({ loads: z.array(FreightLoadSchema) });
const FreightSingleSchema = z.object({ load: FreightLoadSchema });

export type FreightLoad = z.infer<typeof FreightLoadSchema>;

export type FreightState = {
    loads: FreightLoad[];
    status: "idle" | "loading" | "ready" | "error";
    error: string | null;
    lastFetched: number | null;
    totals: { distanceKm: number; cost: number; completed: number; active: number };
    fetchLoads: () => Promise<void>;
    planQuickLoad: () => Promise<void>;
    completeLoad: (id: string) => Promise<void>;
};

type Preset = {
    title: string;
    origin: { name: string; lat: number; lng: number };
    destination: { name: string; lat: number; lng: number };
    rate: number;
};

const presets: Preset[] = [
    {
        title: "Seattle → Portland",
        origin: { name: "Seattle, WA", lat: 47.6062, lng: -122.3321 },
        destination: { name: "Portland, OR", lat: 45.5152, lng: -122.6784 },
        rate: 2.2,
    },
    {
        title: "Denver → Salt Lake",
        origin: { name: "Denver, CO", lat: 39.7392, lng: -104.9903 },
        destination: { name: "Salt Lake City, UT", lat: 40.7608, lng: -111.891 },
        rate: 2.6,
    },
    {
        title: "Austin → Dallas",
        origin: { name: "Austin, TX", lat: 30.2672, lng: -97.7431 },
        destination: { name: "Dallas, TX", lat: 32.7767, lng: -96.797 },
        rate: 1.9,
    },
];

let presetIndex = 0;

const summarize = (loads: FreightLoad[]) => {
    const distanceKm = loads.reduce((sum, load) => sum + (Number.isFinite(load.distanceKm) ? load.distanceKm : 0), 0);
    const cost = loads.reduce((sum, load) => sum + (Number.isFinite(load.cost) ? load.cost : 0), 0);
    const completed = loads.filter((l) => l.status === "completed").length;
    const active = loads.length - completed;
    return { distanceKm, cost, completed, active };
};

export const useFreightStore = create<FreightState>((set, get) => ({
    loads: [],
    status: "idle",
    error: null,
    lastFetched: null,
    totals: { distanceKm: 0, cost: 0, completed: 0, active: 0 },

    fetchLoads: async () => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ error: "Sign in to load freight.", status: "error" });
            return;
        }

        set({ status: "loading", error: null });
        try {
            const result = await apiFetch("/freight", {
                token: session.accessToken,
                baseUrl: apiBase,
                schema: FreightListSchema,
            });
            set({
                loads: result.loads,
                status: "ready",
                error: null,
                lastFetched: Date.now(),
                totals: summarize(result.loads),
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to fetch freight";
            set({ status: "error", error: message });
        }
    },

    planQuickLoad: async () => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ error: "Sign in to create loads.", status: "error" });
            return;
        }
        const preset = presets[presetIndex % presets.length];
        presetIndex += 1;

        try {
            const { load } = await apiFetch("/freight", {
                method: "POST",
                token: session.accessToken,
                baseUrl: apiBase,
                schema: FreightSingleSchema,
                body: {
                    title: preset.title,
                    originName: preset.origin.name,
                    originLat: preset.origin.lat,
                    originLng: preset.origin.lng,
                    destinationName: preset.destination.name,
                    destinationLat: preset.destination.lat,
                    destinationLng: preset.destination.lng,
                    ratePerKm: preset.rate,
                },
            });
            const nextLoads = [load, ...get().loads];
            set({ loads: nextLoads, totals: summarize(nextLoads), status: "ready", error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to create load";
            set({ error: message, status: "error" });
        }
    },

    completeLoad: async (id: string) => {
        const { session, apiBase } = useAuthStore.getState();
        if (!session?.accessToken) {
            set({ error: "Sign in to complete loads.", status: "error" });
            return;
        }

        try {
            const { load } = await apiFetch(`/freight/${id}/complete`, {
                method: "POST",
                token: session.accessToken,
                baseUrl: apiBase,
                schema: FreightSingleSchema,
            });
            const nextLoads = get().loads.map((item) => (item.id === load.id ? load : item));
            set({ loads: nextLoads, totals: summarize(nextLoads), status: "ready", error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to complete load";
            set({ error: message, status: "error" });
        }
    },
}));

export function useFreightState() {
    return useFreightStore();
}
