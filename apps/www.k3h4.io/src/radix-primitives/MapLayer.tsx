import { useEffect, useMemo, useRef } from "react";
import maplibregl from "maplibre-gl";

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

const createPinEl = (poi: Poi) => {
    const el = document.createElement("div");
    const body = document.createElement("div");
    const tip = document.createElement("div");
    const dot = document.createElement("div");

    el.className = "poi-pin";
    body.className = "poi-pin__body";
    tip.className = "poi-pin__tip";
    dot.className = "poi-pin__dot";

    const color = PIN_COLORS[poi.kind ?? ""] ?? "#e2e8f0";
    el.style.setProperty("--pin-color", color);
    el.title = `${poi.name ?? "poi"}${poi.kind ? ` • ${poi.kind}` : ""}`;

    el.appendChild(body);
    el.appendChild(tip);
    el.appendChild(dot);
    return el;
};

export function MapLayer() {
    const ref = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const markerRef = useRef<maplibregl.Marker[]>([]);
    const { updateView, registerMap, view } = useMapView();
    const { status, center, requestLocation, fetchNearbyPois, pois } = useGeoState();
    const { session, apiBase } = useAuthStore();

    const poiList = useMemo(() => (Array.isArray(pois) ? (pois as Poi[]) : []), [pois]);

    // One-time geolocation request on mount
    useEffect(() => {
        requestLocation();
    }, [requestLocation]);

    useEffect(() => {
        if (!ref.current || !center || status !== "ready") return;
        const map = new maplibregl.Map({
            container: ref.current,
            style: STYLE_URL,
            center: [center.lng, center.lat],
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
            const center = map.getCenter();
            updateView({
                center: { lat: center.lat, lng: center.lng },
                zoom: map.getZoom(),
                bearing: map.getBearing(),
                pitch: map.getPitch(),
            });
        };

        map.on("load", sync);
        map.on("move", sync);
        registerMap(map);

        return () => {
            registerMap(null);
            mapRef.current = null;
            map.remove();
        };
    }, [registerMap, updateView, center]);

    // Render POI markers when data arrives
    useEffect(() => {
        const map = mapRef.current;
        markerRef.current.forEach((m) => m.remove());
        markerRef.current = [];
        if (!map || poiList.length === 0) return;

        markerRef.current = poiList.map((poi) => {
            const marker = new maplibregl.Marker({ element: createPinEl(poi), anchor: "bottom" })
                .setLngLat([poi.lng, poi.lat])
                .addTo(map);
            return marker;
        });

        return () => {
            markerRef.current.forEach((m) => m.remove());
            markerRef.current = [];
        };
    }, [poiList]);
    // Fetch nearby POIs once after location is ready
    useEffect(() => {
        if (status === "ready") {
            void fetchNearbyPois({ token: session?.accessToken });
        }
    }, [fetchNearbyPois, status, session?.accessToken]);

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
