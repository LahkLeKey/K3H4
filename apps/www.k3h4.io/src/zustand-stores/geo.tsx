import { create } from "zustand";
import { apiUrl } from "../lib/apiBase";

type GeoStatus = "idle" | "locating" | "ready" | "blocked" | "error";

type GeoState = {
    status: GeoStatus;
    center: { lat: number; lng: number } | null;
    error?: string | null;
    pois: any[] | null;
    poisFetched: boolean;
    poiStatus: "idle" | "loading" | "ready" | "error";
    requested: boolean;
    lastFetchCenter: { lat: number; lng: number } | null;
    lastFetchRadius: number | null;
    lastFetchKinds: string | null;
    lastSignature: string | null;
    requestLocation: () => void;
    fetchNearbyPois: (opts?: { radiusM?: number; kinds?: string[]; token?: string; force?: boolean }) => Promise<void>;
    hydrateFromPrefs: (opts: { center?: { lat: number; lng: number } | null; pois?: any[] | null }) => void;
    setCenterFromMap: (center: { lat: number; lng: number }) => void;
};

const DEFAULT_KINDS = "bank,atm,restaurant,cafe,fuel,bus_station,train_station";

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
const toKindsString = (kinds?: string[] | string) => (Array.isArray(kinds) ? kinds.join(",") : kinds ?? DEFAULT_KINDS);
const makeSignature = (center: { lat: number; lng: number }, radiusM: number, kinds: string) =>
    `${center.lat.toFixed(5)}:${center.lng.toFixed(5)}:${radiusM}:${kinds}`;

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
    status: "idle",
    center: null,
    error: null,
    pois: null,
    poisFetched: false,
    poiStatus: "idle",
    requested: false,
    lastFetchCenter: null,
    lastFetchRadius: null,
    lastFetchKinds: null,
    lastSignature: null,

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

    requestLocation: () => {
        set({ status: "locating", requested: true, error: null });
        if (typeof navigator === "undefined" || !navigator.geolocation) {
            set({ status: "blocked", error: "geolocation unsupported" });
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                set({
                    status: "ready",
                    center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
                    error: null,
                });
                void logStatus({ status: "ready", center: { lat: pos.coords.latitude, lng: pos.coords.longitude } });
            },
            (err) => {
                set({ status: "blocked", error: err?.message ?? "geolocation denied" });
                void logStatus({ status: "blocked", error: err?.message ?? "geolocation denied" });
            },
            { enableHighAccuracy: true, timeout: 8000 }
        );
    },

    fetchNearbyPois: async (opts) => {
        const { center, status } = get();
        if (!center || status !== "ready") return;
        set({ poiStatus: "loading" });
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
                set({ poiStatus: "error", poisFetched: true, error: message });
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

            const promise = fetch(apiUrl(`/geo/pois?${qs}`), { credentials: "include", headers })
                .then(async (res) => {
                    if (!res.ok) throw new Error(`poi ${res.status}`);
                    return await res.json();
                })
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
                lastFetchCenter: center,
                lastFetchRadius: radiusM,
                lastFetchKinds: kinds,
                lastSignature: signature,
            });
            void logStatus({ status, poiStatus: "ready", center });
        } catch (err) {
            // keep failure silent but mark attempted
            const message = err instanceof Error ? err.message : "poi fetch failed";
            set({ poisFetched: true, error: message, poiStatus: "error" });
            void logStatus({ status, poiStatus: "error", center, error: message });
        }
    },
}));

export function useGeoState() {
    return useGeoStore();
}