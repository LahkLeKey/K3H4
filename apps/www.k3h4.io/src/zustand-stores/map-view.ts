import { create } from "zustand";
import type maplibregl from "maplibre-gl";

export type MapViewState = {
    center: { lat: number; lng: number };
    zoom: number;
    bearing: number;
    pitch: number;
    ready: boolean;
};

export type MapViewStore = MapViewState & {
    map: maplibregl.Map | null;
    setView: (view: Partial<MapViewState>) => void;
    registerMap: (map: unknown | null) => void;
    flyTo: (opts: { center: { lat: number; lng: number }; zoom?: number; bearing?: number; pitch?: number }) => void;
};

// Hastings, MN for city-level default
const DEFAULT_CENTER = { lat: 44.7434, lng: -92.8512 };
const DEFAULT_VIEW: MapViewState = { center: DEFAULT_CENTER, zoom: 14.5, bearing: 24, pitch: 55, ready: false };

export const useMapViewStore = create<MapViewStore>((set, get) => ({
    ...DEFAULT_VIEW,
    map: null,

    setView: (view) => {
        set((prev) => ({
            ...prev,
            ...view,
            center: view.center ?? prev.center,
            ready: true,
        }));
    },

    registerMap: (map) => set({ map: (map as maplibregl.Map | null) ?? null }),

    flyTo: (opts) => {
        const { map } = get();
        if (map && typeof map.flyTo === "function") {
            map.flyTo({
                center: [opts.center.lng, opts.center.lat],
                zoom: opts.zoom ?? get().zoom,
                bearing: opts.bearing ?? get().bearing,
                pitch: opts.pitch ?? get().pitch,
                essential: true,
            });
            return;
        }
        // If map not ready, just update the view state
        set((prev) => ({
            ...prev,
            center: opts.center,
            zoom: opts.zoom ?? prev.zoom,
            bearing: opts.bearing ?? prev.bearing,
            pitch: opts.pitch ?? prev.pitch,
            ready: true,
        }));
    },
}));
