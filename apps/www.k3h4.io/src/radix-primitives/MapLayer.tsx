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
            zoom: 12.5,
            pitch: 58,
            bearing: 24,
            minZoom: 11,
            maxZoom: 17.5,
            minPitch: 45,
            maxPitch: 75,
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
                    map.flyTo({ center: [nextCenter.lng, nextCenter.lat], zoom: 12.5, bearing: 24, pitch: 58, essential: true });
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
