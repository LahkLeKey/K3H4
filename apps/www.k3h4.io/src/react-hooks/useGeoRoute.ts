import { createContext, createElement, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";

export type GeoRouteState = {
    status: "loading" | "ready" | "error";
    points: THREE.Vector3[];
    origin: { lat: number; lng: number };
    destination: { lat: number; lng: number };
    message?: string;
};

export type GeoRouteValue = GeoRouteState & {
    refresh: (opts?: { destination?: { lat: number; lng: number } }) => void;
    setDestination: (destination: { lat: number; lng: number }) => void;
};

const DEFAULT_ORIGIN = { lat: 47.6062, lng: -122.3321 }; // Seattle fallback
const DEFAULT_DESTINATION = { lat: 34.0522, lng: -118.2437 }; // LA fallback

const metersPerDegree = 111_320;
const degToRad = Math.PI / 180;

const GeoRouteContext = createContext<GeoRouteValue | null>(null);

export function GeoRouteProvider({ children, defaultDestination }: { children: ReactNode; defaultDestination?: { lat: number; lng: number } }) {
    const [destination, setDestination] = useState<{ lat: number; lng: number }>(defaultDestination ?? DEFAULT_DESTINATION);
    const [state, setState] = useState<GeoRouteState>({
        status: "loading",
        points: [],
        origin: DEFAULT_ORIGIN,
        destination,
        message: undefined,
    });
    const requestId = useRef(0);

    const resolveOrigin = useCallback(async () => {
        if (typeof navigator === "undefined" || !navigator.geolocation) return DEFAULT_ORIGIN;
        return await new Promise<{ lat: number; lng: number }>((resolve) => {
            const done = (coords: { lat: number; lng: number }) => resolve(coords);
            navigator.geolocation.getCurrentPosition(
                (pos) => done({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                () => done(DEFAULT_ORIGIN),
                { enableHighAccuracy: true, timeout: 3500 }
            );
        });
    }, []);

    const project = useCallback((lat: number, lng: number, centerLat: number, centerLng: number, idx = 0) => {
        const x = (lng - centerLng) * metersPerDegree * Math.cos(centerLat * degToRad) * (1 / 12000);
        const z = (lat - centerLat) * metersPerDegree * (1 / 12000);
        const y = 0.14 + Math.sin(idx * 0.08) * 0.02;
        return new THREE.Vector3(x, y, z);
    }, []);

    const fetchRoute = useCallback(
        async (override?: { destination?: { lat: number; lng: number } }) => {
            const dest = override?.destination ?? destination;
            const currentId = ++requestId.current;
            setState((prev) => ({ ...prev, status: "loading", destination: dest, message: undefined }));
            const origin = await resolveOrigin();
            const centerLat = (origin.lat + dest.lat) / 2;
            const centerLng = (origin.lng + dest.lng) / 2;
            const fallback = [project(origin.lat, origin.lng, centerLat, centerLng), project(dest.lat, dest.lng, centerLat, centerLng, 1)];

            try {
                const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${dest.lng},${dest.lat}?overview=full&geometries=geojson`;
                const res = await fetch(url);
                if (!res.ok) throw new Error(`OSRM ${res.status}`);
                const data = await res.json();
                const coords: Array<[number, number]> = data?.routes?.[0]?.geometry?.coordinates ?? [];
                const trimmed = coords.slice(0, 512);
                const points = trimmed.length
                    ? trimmed.map(([lng, lat], idx) => project(lat, lng, centerLat, centerLng, idx))
                    : fallback;
                if (requestId.current !== currentId) return;
                setState({ status: "ready", points, origin, destination: dest, message: undefined });
            } catch (err) {
                const message = err instanceof Error ? err.message : "OSRM unavailable";
                if (requestId.current !== currentId) return;
                setState({ status: "error", points: fallback, origin, destination: dest, message });
            }
        },
        [destination, project, resolveOrigin]
    );

    useEffect(() => {
        void fetchRoute({ destination });
    }, [destination, fetchRoute]);

    const refresh = useCallback(
        (opts?: { destination?: { lat: number; lng: number } }) => {
            if (opts?.destination) {
                setDestination(opts.destination);
                void fetchRoute({ destination: opts.destination });
            } else {
                void fetchRoute({ destination });
            }
        },
        [destination, fetchRoute]
    );

    const value = useMemo<GeoRouteValue>(() => ({ ...state, refresh, setDestination }), [state, refresh, setDestination]);

    return createElement(GeoRouteContext.Provider, { value }, children);
}

export function useGeoRoute(): GeoRouteValue {
    const ctx = useContext(GeoRouteContext);
    if (!ctx) throw new Error("useGeoRoute must be used within GeoRouteProvider");
    return ctx;
}
