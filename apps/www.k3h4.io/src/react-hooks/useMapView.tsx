import { useMemo, type ReactNode } from "react";

import { useMapViewStore, type MapViewState } from "@/zustand-stores/map-view";

export type MapViewContextValue = {
    view: MapViewState;
    updateView: (view: Partial<MapViewState>) => void;
    registerMap: (map: unknown | null) => void;
    flyTo: (opts: { center: { lat: number; lng: number }; zoom?: number; bearing?: number; pitch?: number }) => void;
};

// Compatibility wrapper to keep existing provider API; state now lives in zustand.
export function MapViewProvider({ children }: { children: ReactNode }) {
    return <>{children}</>;
}

export function useMapView(): MapViewContextValue {
    const { center, zoom, bearing, pitch, ready, setView, registerMap, flyTo } = useMapViewStore();

    return useMemo(
        () => ({
            view: { center, zoom, bearing, pitch, ready },
            updateView: setView,
            registerMap,
            flyTo,
        }),
        [bearing, center, flyTo, pitch, ready, registerMap, setView, zoom],
    );
}
