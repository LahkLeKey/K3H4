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
    osmId: z.string().optional(),
    osmType: z.string().optional(),
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

type HistoryEntry = {
    id: string;
    signature: string;
    staleAfter?: string | Date | null;
    pois: Array<{ id: string; name?: string | null; category?: string | null; lat: number; lng: number }>;
};

const HISTORY_LIMIT = 80;
const HISTORY_TTL_MS = 5 * 60_000;
const historyCache = new Map<string, { expiresAt: number; value?: HistoryEntry[]; promise?: Promise<HistoryEntry[]> }>();

export const primeHistoryCache = (token: string | null | undefined, rows: HistoryEntry[] | null | undefined) => {
    if (!token || !rows || rows.length === 0) return;
    historyCache.set(`${token}:${HISTORY_LIMIT}`, { value: rows, expiresAt: Date.now() + HISTORY_TTL_MS });
};

const fetchHistoryOnce = async (token: string | null | undefined, baseUrl: string | undefined) => {
    if (!token) return null;
    const cacheKey = `${token ?? "anon"}:${HISTORY_LIMIT}`;
    const cached = historyCache.get(cacheKey);
    const now = Date.now();
    if (cached?.value && cached.expiresAt > now) return cached.value;
    if (cached?.promise) return await cached.promise;

    const promise = apiFetch<HistoryEntry[]>("/geo/history?limit=" + HISTORY_LIMIT, {
        token,
        baseUrl,
    })
        .then((rows) => {
            historyCache.set(cacheKey, { value: rows, expiresAt: Date.now() + HISTORY_TTL_MS });
            return rows;
        })
        .catch((err) => {
            historyCache.delete(cacheKey);
            throw err;
        });

    historyCache.set(cacheKey, { promise, expiresAt: now + HISTORY_TTL_MS });
    return await promise;
};

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
    const isAuthed = Boolean(session?.accessToken);

    const enabled = Boolean(opts?.enabled ?? true) && Boolean(bbox) && Number.isFinite(zoom);

    const signature = bbox
        ? [bbox.minLat.toFixed(4), bbox.minLng.toFixed(4), bbox.maxLat.toFixed(4), bbox.maxLng.toFixed(4), Math.round(zoom ?? 0)]
            .join(":")
        : null;

    return useQuery<z.infer<typeof PoiResponseSchema>>({
        queryKey: ["pois", bbox?.minLat, bbox?.minLng, bbox?.maxLat, bbox?.maxLng, Math.round(zoom ?? 0), kinds.join(",")],
        enabled,
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        queryFn: async () => {
            if (!bbox || !Number.isFinite(zoom)) return { items: [], total: 0 } as z.infer<typeof PoiResponseSchema>;

            // Try to reuse cached history once per token/signature to avoid duplicate network calls
            if (isAuthed && signature) {
                try {
                    const history = await fetchHistoryOnce(session?.accessToken, apiBase);
                    const match = history?.find((h) => h.signature === signature);
                    if (match) {
                        const staleAt = match.staleAfter ? new Date(match.staleAfter) : null;
                        const isStale = staleAt ? staleAt.getTime() < Date.now() : false;
                        if (!isStale && match.pois?.length) {
                            return {
                                items: match.pois.map((p) => ({ id: p.id, lat: p.lat, lng: p.lng, name: p.name ?? null, category: p.category ?? null })),
                                total: match.pois.length,
                                returned: match.pois.length,
                                clustered: false,
                                bbox,
                                zoom: zoom ?? undefined,
                            } as z.infer<typeof PoiResponseSchema>;
                        }
                    }
                } catch {
                    // ignore history fetch errors
                }
            }

            const bboxParam = `${bbox.minLng},${bbox.minLat},${bbox.maxLng},${bbox.maxLat}`;
            const qs = new URLSearchParams({ bbox: bboxParam, zoom: String(Math.round(zoom ?? 0)), kinds: kinds.join(",") }).toString();
            const path = isAuthed ? `/api/pois?${qs}` : `/pois?${qs}`;
            return apiFetch(path, {
                token: isAuthed ? session?.accessToken : undefined,
                baseUrl: apiBase,
                schema: PoiResponseSchema,
            });
        },
    });
}
