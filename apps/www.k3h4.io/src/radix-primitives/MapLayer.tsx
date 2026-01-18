import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

import { useMapView } from "../react-hooks/useMapView";
import { useGeoState } from "../zustand-stores/geo";
import { LocationOverview } from "./LocationOverview";

const STYLE_URL = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export function MapLayer() {
    const ref = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const { updateView, registerMap } = useMapView();
    const { status, center, requestLocation, fetchNearbyPois } = useGeoState();

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
    // Fetch nearby POIs once after location is ready
    useEffect(() => {
        if (status === "ready") {
            void fetchNearbyPois();
        }
    }, [fetchNearbyPois, status]);

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
