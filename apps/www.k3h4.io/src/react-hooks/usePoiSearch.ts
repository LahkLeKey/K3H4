import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { enqueueOverpass } from "../lib/overpassQueue";

export type Poi = {
    id: string;
    name: string;
    kind: string;
    lat: number;
    lng: number;
    distanceM: number;
    position: THREE.Vector3;
};

export type PoiResult = {
    status: "loading" | "ready" | "error";
    pois: Poi[];
    center: { lat: number; lng: number };
    message?: string;
    nearestByKind: Record<string, Poi | undefined>;
};

const DEFAULT_CENTER = { lat: 47.6062, lng: -122.3321 }; // Seattle
const metersPerDegree = 111_320;
const degToRad = Math.PI / 180;
const scale = 1 / 12000; // Keep scene compact

const project = (lat: number, lng: number, centerLat: number, centerLng: number) => {
    const x = (lng - centerLng) * metersPerDegree * Math.cos(centerLat * degToRad) * scale;
    const z = (lat - centerLat) * metersPerDegree * scale;
    return new THREE.Vector3(x, 0.1, z);
};

const toRad = (deg: number) => deg * (Math.PI / 180);

const haversine = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
    const R = 6371e3;
    const dLat = toRad(b.lat - a.lat);
    const dLng = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const h =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    return 2 * R * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};

const buildQuery = (lat: number, lng: number, radiusM: number, kinds: string[]) => {
    const filters = kinds.map((k) => `node[amenity=${k}](around:${radiusM},${lat},${lng});`).join("\n");
    return `[out:json][timeout:10];(${filters});out center 30;`;
};

export function usePoiSearch(options?: { center?: { lat: number; lng: number }; radiusM?: number; kinds?: string[] }): PoiResult {
    const centerOverride = options?.center;
    const radiusM = options?.radiusM ?? 1500;
    const kinds = options?.kinds ?? ["bank", "atm", "restaurant", "cafe", "fuel", "bus_station", "train_station"];

    const [state, setState] = useState<PoiResult>({ status: "loading", pois: [], center: centerOverride ?? DEFAULT_CENTER, nearestByKind: {} });
    const lastSignature = useRef<string | null>(null);
    const cooldownUntil = useRef<number>(0);
    const pending = useRef<AbortController | null>(null);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        let cancelled = false;

        const resolveCenter = async () => {
            if (centerOverride) return centerOverride;
            if (typeof navigator === "undefined" || !navigator.geolocation) return DEFAULT_CENTER;
            return await new Promise<{ lat: number; lng: number }>((resolve) => {
                navigator.geolocation.getCurrentPosition(
                    (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                    () => resolve(DEFAULT_CENTER),
                    { enableHighAccuracy: false, timeout: 4500 }
                );
            });
        };

        const schedule = () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(run, 900);
        };

        const run = async () => {
            if (cancelled) return;
            const now = Date.now();
            if (now < cooldownUntil.current) {
                schedule();
                return;
            }

            const center = await resolveCenter();
            const signature = `${center.lat.toFixed(5)}:${center.lng.toFixed(5)}:${radiusM}:${kinds.sort().join(",")}`;
            if (signature === lastSignature.current) return;
            lastSignature.current = signature;

            pending.current?.abort();
            const controller = new AbortController();
            pending.current = controller;

            setState((prev) => ({ ...prev, status: "loading", message: undefined, center }));

            const doRequest = async () => {
                try {
                    // Prefer cached API; fallback to Overpass if unavailable/unauthorized.
                    const apiUrl = `/geo/pois?lat=${center.lat}&lng=${center.lng}&radiusM=${radiusM}&kinds=${encodeURIComponent(kinds.join(","))}`;
                    const res = await fetch(apiUrl, { signal: controller.signal, credentials: "include" });
                    if (res.status === 429) {
                        cooldownUntil.current = Date.now() + 5000;
                        throw new Error("Rate limited, retrying soon");
                    }
                    if (res.status === 401 || res.status === 403) throw new Error("auth required");
                    if (!res.ok) throw new Error(`API ${res.status}`);
                    const data = await res.json();
                    return (data?.pois ?? []) as Array<{ id: string; name: string; kind: string; lat: number; lng: number }>;
                } catch (err) {
                    if (err instanceof Error && err.message === "auth required") {
                        // Fallback to direct Overpass with same throttling.
                        const query = buildQuery(center.lat, center.lng, radiusM, kinds);
                        const data = await enqueueOverpass(query);
                        return (data?.elements ?? []).map((feat: any) => ({
                            id: `${feat.id}`,
                            name: feat.tags?.name ?? feat.tags?.amenity ?? "poi",
                            kind: feat.tags?.amenity,
                            lat: feat.lat,
                            lng: feat.lon,
                        }));
                    }
                    throw err;
                }
            };

            try {
                const features = await doRequest();
                const pois: Poi[] = features
                    .map((feat) => {
                        const lat = feat.lat as number;
                        const lng = feat.lng as number;
                        const kind = feat.kind as string;
                        const name = feat.name ?? kind ?? "poi";
                        if (!lat || !lng || !kind) return null;
                        const distanceM = haversine(center, { lat, lng });
                        return {
                            id: feat.id,
                            name,
                            kind,
                            lat,
                            lng,
                            distanceM,
                            position: project(lat, lng, center.lat, center.lng),
                        } as Poi;
                    })
                    .filter(Boolean) as Poi[];

                const nearestByKind = pois.reduce<Record<string, Poi>>((acc, poi) => {
                    if (!acc[poi.kind] || poi.distanceM < acc[poi.kind].distanceM) acc[poi.kind] = poi;
                    return acc;
                }, {});

                if (cancelled || controller.signal.aborted) return;
                setState({ status: "ready", pois, center, nearestByKind });
            } catch (err) {
                if (controller.signal.aborted || cancelled) return;
                const message = err instanceof Error ? err.message : "POI lookup failed";
                setState((prev) => ({ ...prev, status: "error", message }));
            }
        };

        schedule();
        return () => {
            cancelled = true;
            if (debounceTimer.current) clearTimeout(debounceTimer.current);
            pending.current?.abort();
        };
    }, [centerOverride?.lat, centerOverride?.lng, radiusM, kinds.join(",")]);

    return useMemo(() => state, [state]);
}
