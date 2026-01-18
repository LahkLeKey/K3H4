import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";

export type MapViewState = {
    center: { lat: number; lng: number };
    zoom: number;
    bearing: number;
    pitch: number;
    ready: boolean;
};

export type MapViewContextValue = {
    view: MapViewState;
    updateView: (view: Partial<MapViewState>) => void;
    registerMap: (map: unknown | null) => void;
    flyTo: (opts: { center: { lat: number; lng: number }; zoom?: number; bearing?: number; pitch?: number }) => void;
};

// Hastings, MN for city-level default
const DEFAULT_CENTER = { lat: 44.7434, lng: -92.8512 };
// Very close downtown view
const defaultState: MapViewState = { center: DEFAULT_CENTER, zoom: 14.5, bearing: 24, pitch: 55, ready: false };

const MapViewContext = createContext<MapViewContextValue | null>(null);

export function MapViewProvider({ children }: { children: ReactNode }) {
    const [view, setView] = useState<MapViewState>(defaultState);
    const mapRef = useRef<any>(null);

    const updateView = useCallback((next: Partial<MapViewState>) => {
        setView((prev) => ({ ...prev, ...next, ready: true }));
    }, []);

    const registerMap = useCallback((map: unknown | null) => {
        mapRef.current = map as any;
    }, []);

    const flyTo = useCallback(
        (opts: { center: { lat: number; lng: number }; zoom?: number; bearing?: number; pitch?: number }) => {
            const map = mapRef.current;
            if (!map || typeof map.flyTo !== "function") return;
            map.flyTo({
                center: [opts.center.lng, opts.center.lat],
                zoom: opts.zoom ?? view.zoom,
                bearing: opts.bearing ?? view.bearing,
                pitch: opts.pitch ?? view.pitch,
                essential: true,
            });
        },
        [view.bearing, view.pitch, view.zoom]
    );

    const value = useMemo(() => ({ view, updateView, registerMap, flyTo }), [view, updateView, registerMap, flyTo]);

    return <MapViewContext.Provider value={value}>{children}</MapViewContext.Provider>;
}

export function useMapView(): MapViewContextValue {
    const ctx = useContext(MapViewContext);
    if (!ctx) throw new Error("useMapView must be used within MapViewProvider");
    return ctx;
}
