import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

import { useMapView } from "../react-hooks/useMapView";

const STYLE_URL = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export function MapLayer() {
    const ref = useRef<HTMLDivElement>(null);
    const { updateView, registerMap } = useMapView();

    useEffect(() => {
        if (!ref.current) return;
        const map = new maplibregl.Map({
            container: ref.current,
            style: STYLE_URL,
            center: [-122.3321, 47.6062],
            zoom: 16,
            pitch: 70,
            bearing: 24,
            minZoom: 15.5,
            maxZoom: 18.5,
            minPitch: 60,
            maxPitch: 82,
            attributionControl: false,
            dragRotate: true,
            pitchWithRotate: true,
        });

        map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "bottom-right");

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

        const locate = () => {
            if (typeof navigator === "undefined" || !navigator.geolocation) return;
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const nextCenter = { lng: pos.coords.longitude, lat: pos.coords.latitude };
                    map.flyTo({ center: [nextCenter.lng, nextCenter.lat], zoom: 14, essential: true });
                },
                () => {
                    // ignore; fallback stays Seattle
                },
                { enableHighAccuracy: false, timeout: 4500 }
            );
        };

        map.on("load", locate);
        locate();

        return () => {
            registerMap(null);
            map.remove();
        };
    }, [registerMap, updateView]);

    return <div ref={ref} className="absolute inset-0 z-0" />;
}
