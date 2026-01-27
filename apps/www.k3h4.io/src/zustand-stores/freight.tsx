import { create } from "zustand";
import { z } from "zod";

import { apiFetch } from "../react-hooks/lib/api-client";
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
    selectedLoadId: string | null;
    selectLoad: (id: string | null) => void;
    fetchLoads: () => Promise<void>;
    planQuickLoad: () => Promise<void>;
    completeLoad: (id: string) => Promise<void>;
};

type DemoRoute = {
    title: string;
    origin: { name: string; lat: number; lng: number };
    destination: { name: string; lat: number; lng: number };
    rate: number;
};

const demoRoutes: DemoRoute[] = [
    {
        title: "Seattle → Portland",
        origin: { name: "Seattle, WA", lat: 47.6062, lng: -122.3321 },
        destination: { name: "Portland, OR", lat: 45.5152, lng: -122.6784 },
        rate: 2.2,
    },
    {
        title: "Denver → Salt Lake City",
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
    {
        title: "Chicago → Detroit",
        origin: { name: "Chicago, IL", lat: 41.8781, lng: -87.6298 },
        destination: { name: "Detroit, MI", lat: 42.3314, lng: -83.0458 },
        rate: 2.3,
    },
    {
        title: "Miami → Atlanta",
        origin: { name: "Miami, FL", lat: 25.7617, lng: -80.1918 },
        destination: { name: "Atlanta, GA", lat: 33.749, lng: -84.388 },
        rate: 2.5,
    },
    {
        title: "Los Angeles → Phoenix",
        origin: { name: "Los Angeles, CA", lat: 34.0522, lng: -118.2437 },
        destination: { name: "Phoenix, AZ", lat: 33.4484, lng: -112.074 },
        rate: 2.4,
    },
    {
        title: "San Francisco → San Diego",
        origin: { name: "San Francisco, CA", lat: 37.7749, lng: -122.4194 },
        destination: { name: "San Diego, CA", lat: 32.7157, lng: -117.1611 },
        rate: 2.7,
    },
    {
        title: "New York → Boston",
        origin: { name: "New York, NY", lat: 40.7128, lng: -74.006 },
        destination: { name: "Boston, MA", lat: 42.3601, lng: -71.0589 },
        rate: 2.8,
    },
    {
        title: "Houston → Nashville",
        origin: { name: "Houston, TX", lat: 29.7604, lng: -95.3698 },
        destination: { name: "Nashville, TN", lat: 36.1627, lng: -86.7816 },
        rate: 2.1,
    },
    {
        title: "Philadelphia → Pittsburgh",
        origin: { name: "Philadelphia, PA", lat: 39.9526, lng: -75.1652 },
        destination: { name: "Pittsburgh, PA", lat: 40.4406, lng: -79.9959 },
        rate: 2.0,
    },
    {
        title: "Las Vegas → Salt Lake City",
        origin: { name: "Las Vegas, NV", lat: 36.1699, lng: -115.1398 },
        destination: { name: "Salt Lake City, UT", lat: 40.7608, lng: -111.891 },
        rate: 2.2,
    },
    {
        title: "Portland → Los Angeles",
        origin: { name: "Portland, OR", lat: 45.5152, lng: -122.6784 },
        destination: { name: "Los Angeles, CA", lat: 34.0522, lng: -118.2437 },
        rate: 2.4,
    },
];

let demoRouteIndex = 0;

const buildDemoLoadSeed = () => {
    const index = demoRouteIndex;
    demoRouteIndex += 1;
    const route = demoRoutes[index % demoRoutes.length];
    const suffix = 1000 + Math.floor(Math.random() * 9000);
    const adjustedRate = route.rate + (Math.random() - 0.5) * 0.4;
    const ratePerKm = Number(Math.max(1.4, adjustedRate).toFixed(2));
    return {
        title: `${route.title} #${suffix}`,
        origin: route.origin,
        destination: route.destination,
        ratePerKm,
    };
};

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
    selectedLoadId: null,

    selectLoad: (id: string | null) => set({ selectedLoadId: id }),

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
            const currentId = get().selectedLoadId;
            const preferredId = result.loads.find((load) => load.id === currentId)?.id ?? result.loads[0]?.id ?? null;
            set({
                loads: result.loads,
                status: "ready",
                error: null,
                lastFetched: Date.now(),
                totals: summarize(result.loads),
                selectedLoadId: preferredId,
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
        const loadSeed = buildDemoLoadSeed();

        try {
            const { load } = await apiFetch("/freight", {
                method: "POST",
                token: session.accessToken,
                baseUrl: apiBase,
                schema: FreightSingleSchema,
                body: {
                    title: loadSeed.title,
                    originName: loadSeed.origin.name,
                    originLat: loadSeed.origin.lat,
                    originLng: loadSeed.origin.lng,
                    destinationName: loadSeed.destination.name,
                    destinationLat: loadSeed.destination.lat,
                    destinationLng: loadSeed.destination.lng,
                    ratePerKm: loadSeed.ratePerKm,
                },
            });
            const nextLoads = [load, ...get().loads];
            set({ loads: nextLoads, totals: summarize(nextLoads), status: "ready", error: null, selectedLoadId: load.id });
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
            set({ loads: nextLoads, totals: summarize(nextLoads), status: "ready", error: null, selectedLoadId: load.id });
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unable to complete load";
            set({ error: message, status: "error" });
        }
    },
}));

export function useFreightState() {
    return useFreightStore();
}
