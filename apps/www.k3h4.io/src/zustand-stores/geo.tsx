import { create } from "zustand";
import { apiUrl } from "../react-hooks/lib/apiBase";

type GeoStatus = "idle" | "locating" | "ready" | "blocked" | "error";

type MapConfig = {
    stylePath: string;
    vectorTilePath: string;
    terrainTilePath: string;
};

type GeoState = {
    status: GeoStatus;
    center: { lat: number; lng: number } | null;
    error?: string | null;
    pois: any[] | null;
    poisFetched: boolean;
    poiStatus: "idle" | "loading" | "ready" | "error";
    poiRetryAt: number | null;
    poiError?: string | null;
    requested: boolean;
    lastFetchCenter: { lat: number; lng: number } | null;
    lastFetchRadius: number | null;
    lastFetchKinds: string | null;
    lastSignature: string | null;
    mapConfig: MapConfig | null;
    requestLocation: (opts?: { force?: boolean }) => void;
    fetchNearbyPois: (opts?: { radiusM?: number; kinds?: string[]; token?: string; force?: boolean }) => Promise<void>;
    hydrateFromPrefs: (opts: { center?: { lat: number; lng: number } | null; pois?: any[] | null }) => void;
    setCenterFromMap: (center: { lat: number; lng: number }) => void;
    setMapConfig: (config: MapConfig | null) => void;
    reset: () => void;
};

const DEFAULT_KINDS = "bank,atm,restaurant,cafe,fuel,bus_station,train_station";
const DEFAULT_CENTER = { lat: 44.7433, lng: -92.8524 }; // Hastings, MN

const logStatus = async (payload: {
    status: GeoStatus;
    poiStatus?: string;
    center?: { lat: number; lng: number } | null;
    error?: string | null;
}) => {
    try {
        const body: any = { status: payload.status, poiStatus: payload.poiStatus };
        if (payload.center) {
            body.centerLat = payload.center.lat;
            body.centerLng = payload.center.lng;
        }
        if (payload.error) body.error = payload.error;
        await fetch(apiUrl("/geo/status"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(body),
        });
    } catch {
        // ignore logging errors
    }
};

const coalesceMap = new Map<string, Promise<any>>();

const initialState: Omit<GeoState, "requestLocation" | "fetchNearbyPois" | "hydrateFromPrefs" | "setCenterFromMap" | "setMapConfig" | "reset"> = {
    status: "idle",
    center: null,
    error: null,
    pois: null,
    poisFetched: false,
    poiStatus: "idle",
    poiRetryAt: null,
    poiError: null,
    requested: false,
    lastFetchCenter: null,
    lastFetchRadius: null,
    lastFetchKinds: null,
    lastSignature: null,
    mapConfig: null,
};
const toKindsString = (kinds?: string[] | string) => (Array.isArray(kinds) ? kinds.join(",") : kinds ?? DEFAULT_KINDS);
const makeSignature = (center: { lat: number; lng: number }, radiusM: number, kinds: string) =>
    `${center.lat.toFixed(5)}:${center.lng.toFixed(5)}:${radiusM}:${kinds}`;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithBackoff = async (url: string, init: RequestInit, opts?: { retries?: number; baseDelayMs?: number; maxDelayMs?: number }) => {
    const retries = Math.max(0, opts?.retries ?? 3);
    const baseDelayMs = opts?.baseDelayMs ?? 400;
    const maxDelayMs = opts?.maxDelayMs ?? 4000;

    let attempt = 0;
    // Retry on transient failures (429/5xx/network). Respect retryAfter when present.
    while (true) {
        try {
            const res = await fetch(url, init);
            if (res.ok) return res;

            const status = res.status;

            // Treat non-retriable 4xx as permanent
            if (status < 500 && status !== 429) {
                throw new Error(`poi ${status}`);
            }

            let retryAfterMs: number | null = null;
            if (status === 429) {
                const headerVal = res.headers.get("retry-after");
                const headerSeconds = headerVal ? Number(headerVal) : null;
                if (headerSeconds && Number.isFinite(headerSeconds)) retryAfterMs = headerSeconds * 1000;

                if (retryAfterMs === null) {
                    try {
                        const body = await res.clone().json();
                        const retryAfter = (body as any)?.retryAfter;
                        if (Number.isFinite(retryAfter)) retryAfterMs = Number(retryAfter) * 1000;
                    } catch {
                        // ignore parse errors
                    }
                }
            }

            const jitter = Math.random() * 120;
            const backoff = Math.min(maxDelayMs, baseDelayMs * 2 ** attempt) + jitter;
            const delay = retryAfterMs ?? backoff;

            if (attempt >= retries) {
                const error = new Error(`poi ${status}`) as Error & { retryAfterMs?: number; status?: number };
                if (retryAfterMs) error.retryAfterMs = retryAfterMs;
                error.status = status;
                throw error;
            }

            attempt += 1;
            await wait(delay);
            continue;
        } catch (err) {
            if (attempt >= retries) throw err;
            const jitter = Math.random() * 120;
            const delay = Math.min(maxDelayMs, baseDelayMs * 2 ** attempt) + jitter;
            attempt += 1;
            await wait(delay);
        }
    }
};

const mergePois = (current: any[] | null, incoming: any[] | null) => {
    if (!incoming || incoming.length === 0) return current ?? null;
    if (!current || current.length === 0) return incoming;
    const dedup = new Map<string, any>();
    for (const poi of [...current, ...incoming]) {
        const key = poi?.id ? String(poi.id) : `${poi?.lat ?? ""}:${poi?.lng ?? ""}:${poi?.name ?? ""}`;
        if (!dedup.has(key)) dedup.set(key, poi);
    }
    return Array.from(dedup.values());
};

export const useGeoStore = create<GeoState>((set, get) => ({
    ...initialState,

    hydrateFromPrefs: (opts) => {
        set((prev) => ({
            status: opts.center ? "ready" : prev.status,
            center: opts.center ?? prev.center,
            pois: opts.pois ?? prev.pois,
            // show hydrated pins but still trigger a refresh to update cache
            poisFetched: opts.pois ? false : prev.poisFetched,
            poiStatus: opts.pois ? "ready" : prev.poiStatus,
        }));
    },

    setCenterFromMap: (center) => {
        set({ center, status: "ready" });
    },

    setMapConfig: (config) => set({ mapConfig: config }),

    reset: () => {
        coalesceMap.clear();
        set({ ...initialState });
    },

    // If unauthenticated and nothing cached, fall back to Hastings, MN
    requestLocation: (opts) => {
        const force = opts?.force ?? false;
        const { center, status, requested } = get();
        // If we already have a center and are ready (or previously requested), avoid re-centering unless forced
        if (!force) {
            if (center && status === "ready") return;
            if (requested && center) return;
        }

        set({ status: "locating", requested: true, error: null });
        if (typeof navigator === "undefined" || !navigator.geolocation) {
            set({ status: "blocked", error: "geolocation unsupported" });
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const currentCenter = get().center;
                const nextCenter = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                set({
                    status: "ready",
                    center: currentCenter ?? nextCenter,
                    error: null,
                });
                // Only log/update with the new coordinates if we didn't already have a center
                void logStatus({ status: "ready", center: currentCenter ?? nextCenter });
            },
            (err) => {
                // When denied and no center known, default to Hastings
                const currentCenter = get().center;
                if (!currentCenter) {
                    set({ status: "ready", center: DEFAULT_CENTER, error: err?.message ?? "geolocation denied" });
                    void logStatus({ status: "ready", center: DEFAULT_CENTER, error: err?.message ?? "geolocation denied" });
                } else {
                    set({ status: "blocked", error: err?.message ?? "geolocation denied" });
                    void logStatus({ status: "blocked", error: err?.message ?? "geolocation denied" });
                }
            },
            { enableHighAccuracy: true, timeout: 8000 }
        );
    },

    fetchNearbyPois: async (opts) => {
        const { center, status } = get();
        if (!center || status !== "ready") return;
        set({ poiStatus: "loading", poiRetryAt: null, poiError: null });
        void logStatus({ status, poiStatus: "loading", center });
        const radiusM = opts?.radiusM ?? 1500;
        const kinds = toKindsString(opts?.kinds);
        const signature = makeSignature(center, radiusM, kinds);
        if (!opts?.force && coalesceMap.has(signature)) {
            try {
                await coalesceMap.get(signature);
                set({ poiStatus: "ready", poisFetched: true, lastFetchCenter: center, lastFetchRadius: radiusM, lastFetchKinds: kinds, lastSignature: signature });
                void logStatus({ status, poiStatus: "ready", center });
                return;
            } catch (err) {
                const message = err instanceof Error ? err.message : "poi fetch failed";
                set({ poiStatus: "error", poisFetched: true, error: message, poiError: message });
                void logStatus({ status, poiStatus: "error", center, error: message });
                return;
            }
        }
        try {
            const qs = new URLSearchParams({
                lat: String(center.lat),
                lng: String(center.lng),
                radiusM: String(radiusM),
                kinds,
            }).toString();

            const headers: Record<string, string> = {};
            if (opts?.token) headers.Authorization = `Bearer ${opts.token}`;

            const promise = fetchWithBackoff(apiUrl(`/geo/pois?${qs}`), { credentials: "include", headers }, { retries: 3, baseDelayMs: 400, maxDelayMs: 4500 })
                .then(async (res) => await res.json())
                .finally(() => {
                    coalesceMap.delete(signature);
                });

            coalesceMap.set(signature, promise);
            const body = await promise;
            const mergedPois = mergePois(get().pois, body?.pois ?? null);
            set({
                pois: mergedPois,
                poisFetched: true,
                poiStatus: "ready",
                poiRetryAt: null,
                poiError: null,
                lastFetchCenter: center,
                lastFetchRadius: radiusM,
                lastFetchKinds: kinds,
                lastSignature: signature,
            });
            void logStatus({ status, poiStatus: "ready", center });
        } catch (err) {
            // keep failure silent but mark attempted
            const message = err instanceof Error ? err.message : "poi fetch failed";
            const retryAfterMs = err && typeof err === "object" ? (err as any).retryAfterMs : null;
            const retryAt = retryAfterMs ? Date.now() + retryAfterMs : null;
            set({ poisFetched: true, error: message, poiStatus: "error", poiRetryAt: retryAt, poiError: message });
            void logStatus({ status, poiStatus: "error", center, error: message });
        }
    },
}));

export function useGeoState() {
    return useGeoStore();
}