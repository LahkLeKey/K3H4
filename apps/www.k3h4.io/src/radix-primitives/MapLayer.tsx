import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import * as THREE from "three";

import { useMapView } from "../react-hooks/useMapView";
import { useGeoState } from "../zustand-stores/geo";
import { LocationOverview } from "./LocationOverview";
import { useAuthStore } from "../react-hooks/auth";

const STYLE_URL = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

type Poi = { id: string; lat: number; lng: number; kind?: string; name?: string };

const PIN_COLORS: Record<string, string> = {
    restaurant: "#f97316",
    cafe: "#a855f7",
    fuel: "#f59e0b",
    bank: "#22c55e",
    atm: "#22c55e",
    bus_station: "#38bdf8",
    train_station: "#0ea5e9",
};

function PinMesh({ color, phase }: { color: string; phase: number }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        const bob = Math.sin(t * 2.1 + phase) * 1.5;
        if (groupRef.current) groupRef.current.position.y = bob;
    });

    return (
        <group ref={groupRef}>
            <mesh position={[0, 12, 0]}>
                <sphereGeometry args={[4, 22, 22]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} roughness={0.26} metalness={0.12} />
            </mesh>
            <mesh rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[5, 14, 22]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.85} roughness={0.32} metalness={0.1} />
            </mesh>
            <mesh position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <torusGeometry args={[4.4, 1.1, 16, 28]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} roughness={0.4} metalness={0.08} />
            </mesh>
        </group>
    );
}

function MapPins3D({ map, pois, frame }: { map: maplibregl.Map | null; pois: Poi[]; frame: number }) {
    const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
    const phaseCache = useRef<Record<string, number>>({});

    useEffect(() => {
        if (!map) return;
        const container = map.getContainer();
        const update = () => setSize({ w: container.clientWidth, h: container.clientHeight });
        update();
        const ro = new ResizeObserver(update);
        ro.observe(container);
        return () => ro.disconnect();
    }, [map]);

    const projected = useMemo(() => {
        if (!map || !size.w || !size.h) return [] as Array<{ poi: Poi; x: number; y: number; color: string; phase: number }>;
        return pois
            .map((poi) => {
                const p = map.project([poi.lng, poi.lat]);
                const color = PIN_COLORS[poi.kind ?? ""] ?? "#e2e8f0";
                if (!phaseCache.current[poi.id]) phaseCache.current[poi.id] = Math.random() * Math.PI * 2;
                return { poi, x: p.x, y: p.y, color, phase: phaseCache.current[poi.id] };
            })
            .filter((p) => p.x >= -64 && p.x <= size.w + 64 && p.y >= -64 && p.y <= size.h + 64);
    }, [frame, map, pois, size.h, size.w]);

    if (!map || !size.w || !size.h || projected.length === 0) return null;

    const left = -size.w / 2;
    const right = size.w / 2;
    const top = size.h / 2;
    const bottom = -size.h / 2;

    return (
        <div className="pointer-events-none absolute inset-0 z-10">
            <Canvas
                className="pointer-events-none"
                orthographic
                camera={{ position: [0, 0, 400], zoom: 1, left, right, top, bottom, near: -500, far: 500 }}
                style={{ pointerEvents: "none" }}
                dpr={1}
                events={undefined}
            >
                <ambientLight intensity={0.65} />
                <directionalLight position={[120, 180, 160]} intensity={0.55} color="#ffffff" />
                <group position={[-size.w / 2, size.h / 2, 0]}>
                    {projected.map((p) => (
                        <group key={p.poi.id} position={[p.x, -p.y, 0]}>
                            <PinMesh color={p.color} phase={p.phase} />
                        </group>
                    ))}
                </group>
            </Canvas>
        </div>
    );
}

export function MapLayer() {
    const ref = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const initialCenterRef = useRef<{ lat: number; lng: number } | null>(null);
    const [mapFrame, setMapFrame] = useState(0);
    const { updateView, registerMap, view } = useMapView();
    const { status, center, requestLocation, fetchNearbyPois, pois, lastFetchCenter, lastFetchRadius, setCenterFromMap } = useGeoState();
    const { session, apiBase } = useAuthStore();

    const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const poiList = useMemo(() => (Array.isArray(pois) ? (pois as Poi[]) : []), [pois]);

    // One-time geolocation request on mount
    useEffect(() => {
        requestLocation();
    }, [requestLocation]);

    // Capture first known center to initialize the map only once
    useEffect(() => {
        if (status === "ready" && center && !initialCenterRef.current) {
            initialCenterRef.current = center;
        }
    }, [status, center]);

    useEffect(() => {
        if (mapRef.current) return; // already created
        const initialCenter = initialCenterRef.current;
        if (!ref.current || !initialCenter || status !== "ready") return;
        const map = new maplibregl.Map({
            container: ref.current,
            style: STYLE_URL,
            center: [initialCenter.lng, initialCenter.lat],
            zoom: 14.5,
            pitch: 58,
            bearing: 24,
            minZoom: 5.5,
            maxZoom: 17.5,
            minPitch: 45,
            maxPitch: 75,
            attributionControl: false,
            dragRotate: true,
            pitchWithRotate: true,
        });

        map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "bottom-right");
        mapRef.current = map;

        const sync = () => {
            const c = map.getCenter();
            const next = { lat: c.lat, lng: c.lng };
            updateView({
                center: next,
                zoom: map.getZoom(),
                bearing: map.getBearing(),
                pitch: map.getPitch(),
            });
        };

        const syncAndStoreCenter = () => {
            const c = map.getCenter();
            const next = { lat: c.lat, lng: c.lng };
            setCenterFromMap(next);
            sync();
        };

        let raf: number | null = null;
        const bump = () => {
            if (raf !== null) return;
            raf = requestAnimationFrame(() => {
                setMapFrame((n) => n + 1);
                raf = null;
            });
        };

        map.on("load", () => {
            syncAndStoreCenter();
            bump();
        });
        map.on("move", () => {
            sync();
            bump();
        });
        map.on("moveend", () => {
            syncAndStoreCenter();
            bump();
        });
        map.on("zoom", bump);
        map.on("rotate", bump);
        map.on("pitch", bump);
        map.on("render", bump);
        registerMap(map);

        return () => {
            if (raf !== null) cancelAnimationFrame(raf);
            registerMap(null);
            mapRef.current = null;
            map.remove();
        };
    }, [registerMap, updateView, status]);

    // Fetch nearby POIs once after location is ready (force to refresh cache on first load)
    useEffect(() => {
        if (status === "ready") {
            void fetchNearbyPois({ token: session?.accessToken, force: true });
        }
    }, [fetchNearbyPois, status, session?.accessToken]);

    const distanceMeters = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
        const R = 6371000; // meters
        const dLat = ((b.lat - a.lat) * Math.PI) / 180;
        const dLng = ((b.lng - a.lng) * Math.PI) / 180;
        const lat1 = (a.lat * Math.PI) / 180;
        const lat2 = (b.lat * Math.PI) / 180;
        const sinDLat = Math.sin(dLat / 2);
        const sinDLng = Math.sin(dLng / 2);
        const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
        return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
    };

    // Debounced refresh when moving far from last fetched center (chunk-like buffering)
    useEffect(() => {
        if (status !== "ready" || !view.ready) return;
        const currentCenter = view.center;
        const lastCenter = lastFetchCenter;
        const radius = lastFetchRadius ?? 1500;
        const threshold = Math.max(400, radius * 0.45); // meters

        const dist = lastCenter ? distanceMeters(lastCenter, currentCenter) : Infinity;
        if (dist < threshold) return;

        if (refreshTimer.current) clearTimeout(refreshTimer.current);
        refreshTimer.current = setTimeout(() => {
            void fetchNearbyPois({ token: session?.accessToken, radiusM: radius, force: true });
        }, 500);

        return () => {
            if (refreshTimer.current) {
                clearTimeout(refreshTimer.current);
                refreshTimer.current = null;
            }
        };
    }, [fetchNearbyPois, lastFetchCenter, lastFetchRadius, session?.accessToken, status, view.center, view.ready]);

    // Persist current map view to user prefs (debounced)
    useEffect(() => {
        if (!session?.accessToken || !view.ready) return;
        const handle = setTimeout(() => {
            void fetch(`${apiBase}/geo/prefs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessToken}`,
                },
                credentials: "include",
                body: JSON.stringify({
                    center: view.center,
                    view: { zoom: view.zoom, bearing: view.bearing, pitch: view.pitch },
                }),
            }).catch((err) => console.warn("geo prefs persist failed", err));
        }, 450);

        return () => clearTimeout(handle);
    }, [apiBase, session?.accessToken, view]);

    if (status === "blocked" || status === "error") {
        return (
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-slate-900 text-sm font-semibold text-white/90">
                enable-geo-location-to-see-map
            </div>
        );
    }

    if (status !== "ready" || !center) {
        return (
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-slate-900 text-sm font-semibold text-white/80">
                requesting-location...
            </div>
        );
    }

    return (
        <>
            <div ref={ref} className="absolute inset-0 z-0" />
            <MapPins3D map={mapRef.current} pois={poiList} frame={mapFrame} />
            <LocationOverview />
            <button
                type="button"
                onClick={requestLocation}
                className="absolute right-3 top-3 z-10 rounded bg-white/90 px-3 py-2 text-xs font-semibold text-slate-800 shadow"
            >
                Locate me
            </button>
        </>
    );
}
