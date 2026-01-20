import { useCallback, useEffect } from "react";
import maplibregl from "maplibre-gl";

type SetViewport = (bounds: { minLat: number; minLng: number; maxLat: number; maxLng: number }, zoom: number) => void;

export function usePoiViewportSync(
    mapRef: React.RefObject<maplibregl.Map | null>,
    readonly: boolean | undefined,
    setViewport: SetViewport,
) {
    const updatePoiViewport = useCallback(() => {
        if (readonly) return;
        const map = mapRef.current;
        if (!map) return;
        const bounds = map.getBounds();
        setViewport(
            { minLat: bounds.getSouth(), minLng: bounds.getWest(), maxLat: bounds.getNorth(), maxLng: bounds.getEast() },
            map.getZoom(),
        );
    }, [mapRef, readonly, setViewport]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map || readonly) return;

        const onMoveEnd = () => { updatePoiViewport(); };

        map.on("moveend", onMoveEnd);
        map.on("zoomend", onMoveEnd);

        updatePoiViewport();

        return () => {
            map.off("moveend", onMoveEnd);
            map.off("zoomend", onMoveEnd);
        };
    }, [mapRef, readonly, updatePoiViewport]);
}