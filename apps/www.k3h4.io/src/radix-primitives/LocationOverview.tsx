import { useMemo } from "react";

import { useGeoState } from "../zustand-stores/geo";
import { useMapView } from "../react-hooks/useMapView";

const statusLabels: Record<string, string> = {
    idle: "Waiting to locate",
    locating: "Locating...",
    ready: "Location set",
    blocked: "Location blocked",
    error: "Location error",
};

export function LocationOverview() {
    const { status, center, error, poiStatus, requestLocation } = useGeoState();
    const { flyTo, view } = useMapView();

    const centerText = useMemo(() => {
        if (!center) return "--";
        return `${center.lat.toFixed(4)}, ${center.lng.toFixed(4)}`;
    }, [center]);

    const handleRecenter = () => {
        if (!center) return;
        flyTo({ center, zoom: Math.max(view.zoom, 14) });
    };

    const handleRetry = () => {
        requestLocation({ force: true });
    };

    const label = statusLabels[status] ?? status;
    const poiLabel = poiStatus === "loading" ? "POIs loading" : poiStatus === "ready" ? "POIs ready" : poiStatus === "error" ? "POIs failed" : null;

    return (
        <div className="pointer-events-auto w-full rounded-xl border border-slate-800/80 bg-slate-950 px-3 py-3 text-xs text-white shadow-[0_20px_40px_rgba(0,0,0,0.55)]">
            <div className="flex items-center justify-between gap-2">
                <div className="font-semibold text-amber-100">My Location</div>
                <div className="rounded-full bg-slate-800 px-2 py-[2px] text-[11px] text-amber-200">{label}</div>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3 text-[11px] text-amber-50">
                <span className="truncate">{centerText}</span>
                <button
                    type="button"
                    onClick={handleRecenter}
                    className="rounded-md border border-amber-500 bg-amber-500 px-2 py-[4px] text-[11px] font-semibold text-white shadow hover:bg-amber-400"
                    disabled={!center}
                >
                    Recenter
                </button>
            </div>
            {poiLabel ? <div className="mt-1 text-[11px] text-amber-200/90">{poiLabel}</div> : null}
            {error ? <div className="mt-1 text-[11px] text-amber-300/90">{error}</div> : null}
            <div className="mt-2 flex items-center gap-2 text-[11px]">
                <button
                    type="button"
                    onClick={handleRetry}
                    className="rounded-md border border-slate-700 bg-slate-900 px-2 py-[4px] font-semibold text-white shadow hover:bg-slate-800"
                >
                    Retry locate
                </button>
            </div>
        </div>
    );
}
