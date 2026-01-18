import { useEffect, useState } from "react";
import * as THREE from "three";

export type GeoRouteState = {
    status: "loading" | "ready" | "error";
    points: THREE.Vector3[];
    origin: { lat: number; lng: number };
    destination: { lat: number; lng: number };
    message?: string;
};

const DEFAULT_ORIGIN = { lat: 47.6062, lng: -122.3321 }; // Seattle fallback
const DEFAULT_DESTINATION = { lat: 34.0522, lng: -118.2437 }; // LA fallback

const metersPerDegree = 111_320;
const degToRad = Math.PI / 180;

export function useGeoRoute(target?: { lat: number; lng: number }): GeoRouteState {
    const destination = target ?? DEFAULT_DESTINATION;
    const [state, setState] = useState<GeoRouteState>({
        status: "loading",
        points: [],
        origin: DEFAULT_ORIGIN,
        destination,
        message: undefined,
    });

    useEffect(() => {
        let cancelled = false;

        const resolveOrigin = async () => {
            if (typeof navigator === "undefined" || !navigator.geolocation) return DEFAULT_ORIGIN;
            return await new Promise<{ lat: number; lng: number }>((resolve) => {
                const done = (coords: { lat: number; lng: number }) => resolve(coords);
                navigator.geolocation.getCurrentPosition(
                    (pos) => done({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                    () => done(DEFAULT_ORIGIN),
                    { enableHighAccuracy: false, timeout: 4500 }
                );
            });
        };

        const project = (lat: number, lng: number, centerLat: number, centerLng: number, idx = 0) => {
            const x = (lng - centerLng) * metersPerDegree * Math.cos(centerLat * degToRad) * (1 / 12000);
            const z = (lat - centerLat) * metersPerDegree * (1 / 12000);
            const y = 0.14 + Math.sin(idx * 0.08) * 0.02;
            return new THREE.Vector3(x, y, z);
        };

        const fetchRoute = async () => {
            setState((prev) => ({ ...prev, status: "loading", destination, message: undefined }));
            const origin = await resolveOrigin();
            const centerLat = (origin.lat + destination.lat) / 2;
            const centerLng = (origin.lng + destination.lng) / 2;
            const fallback = [project(origin.lat, origin.lng, centerLat, centerLng), project(destination.lat, destination.lng, centerLat, centerLng, 1)];

            try {
                const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;
                const res = await fetch(url);
                if (!res.ok) throw new Error(`OSRM ${res.status}`);
                const data = await res.json();
                const coords: Array<[number, number]> = data?.routes?.[0]?.geometry?.coordinates ?? [];
                const trimmed = coords.slice(0, 512);
                const points = trimmed.length
                    ? trimmed.map(([lng, lat], idx) => project(lat, lng, centerLat, centerLng, idx))
                    : fallback;
                if (cancelled) return;
                setState({ status: "ready", points, origin, destination, message: undefined });
            } catch (err) {
                const message = err instanceof Error ? err.message : "OSRM unavailable";
                if (cancelled) return;
                setState({ status: "error", points: fallback, origin, destination, message });
            }
        };

        fetchRoute();
        return () => {
            cancelled = true;
        };
    }, [destination.lat, destination.lng]);

    return state;
}
