import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { apiUrl } from "./lib/apiBase";
import { useAuthStore } from "./auth";
import maplibregl from "maplibre-gl";

export type Poi = {
    id: string;
    name: string;
    kind: string;
    lat: number;
    lng: number;
    distanceM: number;
    position: THREE.Vector3;
    scale: number;
};

export type PoiResult = {
    status: "loading" | "ready" | "error";
    pois: Poi[];
    center: { lat: number; lng: number };
    message?: string;
    nearestByKind: Record<string, Poi | undefined>;
};

const DEFAULT_CENTER = { lat: 47.6062, lng: -122.3321 }; // Seattle

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

export function usePoiSearch(options?: { center?: { lat: number; lng: number }; radiusM?: number; kinds?: string[]; map?: maplibregl.Map | null }): PoiResult {
    const centerOverride = options?.center;
    const radiusM = options?.radiusM ?? 1500;
    const kinds = options?.kinds ?? ["bank", "atm", "restaurant", "cafe", "fuel", "bus_station", "train_station"];
    const map = options?.map ?? null;

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
                    const url = apiUrl(`/geo/pois?lat=${center.lat}&lng=${center.lng}&radiusM=${radiusM}&kinds=${encodeURIComponent(kinds.join(","))}`);
                    const { session, kickToLogin } = useAuthStore.getState();
                    const headers: Record<string, string> = {};
                    if (session?.accessToken) headers.Authorization = `Bearer ${session.accessToken}`;

                    const res = await fetch(url, { signal: controller.signal, credentials: "include", headers });
                    if (res.status === 429) {
                        cooldownUntil.current = Date.now() + 5000;
                        throw new Error("Rate limited, retrying soon");
                    }
                    if (res.status === 401 || res.status === 403) {
                        kickToLogin?.("expired");
                        throw new Error("auth required");
                    }
                    if (!res.ok) throw new Error(`API ${res.status}`);
                    const data = await res.json();
                    return (data?.pois ?? []) as Array<{ id: string; name: string; kind: string; lat: number; lng: number }>;
                } catch (err) {
                    if (err instanceof Error && err.message === "auth required") throw err;
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

                        if (map) {
                            const coord = maplibregl.MercatorCoordinate.fromLngLat({ lng, lat }, 0);
                            // scale pins directly in mercator units (meters) to align with map zoom
                            const scale = coord.meterInMercatorCoordinateUnits();
                            return {
                                id: feat.id,
                                name,
                                kind,
                                lat,
                                lng,
                                distanceM,
                                position: new THREE.Vector3(coord.x, coord.y, coord.z ?? 0),
                                scale,
                            } as Poi;
                        }

                        // Fallback projection if map not available
                        const metersPerDegree = 111_320;
                        const degToRad = Math.PI / 180;
                        const localScale = 1 / 12000;
                        const x = (lng - center.lng) * metersPerDegree * Math.cos(center.lat * degToRad) * localScale;
                        const z = (lat - center.lat) * metersPerDegree * localScale;
                        return {
                            id: feat.id,
                            name,
                            kind,
                            lat,
                            lng,
                            distanceM,
                            position: new THREE.Vector3(x, 0.1, z),
                            scale: 1,
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
