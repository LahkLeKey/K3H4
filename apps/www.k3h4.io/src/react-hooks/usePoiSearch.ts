import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";

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
    const radiusM = options?.radiusM ?? 1800;
    const kinds = options?.kinds ?? ["bank", "atm", "restaurant", "cafe", "fuel", "bus_station", "train_station"];

    const [state, setState] = useState<PoiResult>({ status: "loading", pois: [], center: centerOverride ?? DEFAULT_CENTER, nearestByKind: {} });

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

        const fetchPois = async () => {
            setState((prev) => ({ ...prev, status: "loading", message: undefined }));
            const center = await resolveCenter();

            try {
                const query = buildQuery(center.lat, center.lng, radiusM, kinds);
                const res = await fetch("https://overpass-api.de/api/interpreter", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
                    body: new URLSearchParams({ data: query }).toString(),
                });
                if (!res.ok) throw new Error(`OSM ${res.status}`);
                const data = await res.json();
                const features: any[] = data?.elements ?? [];
                const pois: Poi[] = features
                    .map((feat) => {
                        const lat = feat.lat as number;
                        const lng = feat.lon as number;
                        const kind = feat.tags?.amenity as string;
                        const name = feat.tags?.name ?? kind ?? "poi";
                        if (!lat || !lng || !kind) return null;
                        const distanceM = haversine(center, { lat, lng });
                        return {
                            id: `${feat.id}`,
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

                if (cancelled) return;
                setState({ status: "ready", pois, center, nearestByKind });
            } catch (err) {
                const message = err instanceof Error ? err.message : "POI lookup failed";
                if (cancelled) return;
                setState((prev) => ({ ...prev, status: "error", message }));
            }
        };

        fetchPois();
        return () => {
            cancelled = true;
        };
    }, [centerOverride?.lat, centerOverride?.lng, radiusM, kinds.join(",")]);

    return useMemo(() => state, [state]);
}
