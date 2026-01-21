import { useEffect } from "react";
import maplibregl from "maplibre-gl";

export function useMapInteractionToggle(
    mapRef: React.RefObject<maplibregl.Map | null>,
    navControlRef: React.RefObject<maplibregl.NavigationControl | null>,
    readonly?: boolean,
) {
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        const disableAll = () => {
            map.scrollZoom.disable();
            map.boxZoom.disable();
            map.dragPan.disable();
            map.dragRotate.disable();
            map.keyboard.disable();
            map.doubleClickZoom.disable();
            map.touchZoomRotate.disable();
            if (navControlRef.current) {
                map.removeControl(navControlRef.current);
                navControlRef.current = null;
            }
        };

        const enableAll = () => {
            map.scrollZoom.enable();
            map.boxZoom.enable();
            map.dragPan.enable();
            map.dragRotate.enable();
            map.keyboard.enable();
            map.doubleClickZoom.enable();
            map.touchZoomRotate.enable();
            if (!navControlRef.current) {
                const nav = new maplibregl.NavigationControl({ visualizePitch: true });
                map.addControl(nav, "bottom-right");
                navControlRef.current = nav;
            }
        };

        if (readonly) {
            disableAll();
        } else {
            enableAll();
        }
    }, [mapRef, navControlRef, readonly]);
}