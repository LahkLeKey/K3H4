import { create } from "zustand";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "../lib/api-client";
import { useAuthStore } from "../react-hooks/auth";

export type Bbox = { minLat: number; minLng: number; maxLat: number; maxLng: number };

const PoiItemSchema = z.object({
    id: z.string(),
    cluster: z.boolean().optional(),
    count: z.number().optional(),
    lat: z.number(),
    lng: z.number(),
    name: z.string().nullable().optional(),
    category: z.string().nullable().optional(),
    sampleCategories: z.array(z.string()).optional(),
    sampleIds: z.array(z.string()).optional(),
});

const PoiResponseSchema = z.object({
    items: z.array(PoiItemSchema),
    total: z.number(),
    returned: z.number().optional(),
    clustered: z.boolean().optional(),
    bbox: z.object({ minLat: z.number(), minLng: z.number(), maxLat: z.number(), maxLng: z.number() }).optional(),
    zoom: z.number().optional(),
});

export type PoiItem = z.infer<typeof PoiItemSchema>;

export type PoiState = {
    bbox: Bbox | null;
    zoom: number | null;
    kinds: string[];
    setViewport: (bbox: Bbox, zoom: number) => void;
    setKinds: (kinds: string[]) => void;
};

const DEFAULT_KINDS = ["restaurant", "cafe", "bar", "fast_food", "fuel", "bank", "atm", "bus_station", "train_station"];

export const usePoiStore = create<PoiState>((set) => ({
    bbox: null,
    zoom: null,
    kinds: DEFAULT_KINDS,
    setViewport: (bbox, zoom) => set({ bbox, zoom }),
    setKinds: (kinds) => set({ kinds: kinds.length ? kinds : DEFAULT_KINDS }),
}));

export function usePoiQuery(opts?: { enabled?: boolean }) {
    const { bbox, zoom, kinds } = usePoiStore();
    const { session, apiBase } = useAuthStore();

    const enabled = Boolean(opts?.enabled ?? true) && Boolean(bbox) && Number.isFinite(zoom) && Boolean(session?.accessToken);

    return useQuery<z.infer<typeof PoiResponseSchema>>({
        queryKey: ["pois", bbox?.minLat, bbox?.minLng, bbox?.maxLat, bbox?.maxLng, Math.round(zoom ?? 0), kinds.join(",")],
        enabled,
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        queryFn: async () => {
            if (!bbox || !Number.isFinite(zoom) || !session?.accessToken) return { items: [], total: 0 } as z.infer<typeof PoiResponseSchema>;
            const bboxParam = `${bbox.minLng},${bbox.minLat},${bbox.maxLng},${bbox.maxLat}`;
            const qs = new URLSearchParams({ bbox: bboxParam, zoom: String(Math.round(zoom ?? 0)), kinds: kinds.join(",") }).toString();
            return apiFetch(`/api/pois?${qs}`, {
                token: session.accessToken,
                baseUrl: apiBase,
                schema: PoiResponseSchema,
            });
        },
    });
}
