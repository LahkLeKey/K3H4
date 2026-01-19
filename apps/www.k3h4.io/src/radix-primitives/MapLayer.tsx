import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl from "maplibre-gl";

import { useMapView } from "../react-hooks/useMapView";
import { useGeoState } from "../zustand-stores/geo";
import { LocationOverview } from "./LocationOverview";
import { useAuthStore } from "../react-hooks/auth";
import { MapPinsOverlay, type Poi } from "../r3f-components/MapPinsOverlay";

const STYLE_URL = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

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
            <MapPinsOverlay map={mapRef.current} pois={poiList} frame={mapFrame} />
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
