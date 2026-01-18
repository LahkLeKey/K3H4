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
            zoom: 13,
            pitch: 55,
            bearing: 24,
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

        return () => {
            registerMap(null);
            map.remove();
        };
    }, [registerMap, updateView]);

    return <div ref={ref} className="absolute inset-0 z-0" />;
}
