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
        <div className="pointer-events-auto absolute right-3 top-20 z-20 flex max-w-[260px] flex-col items-end gap-2">
            <div className="w-full rounded-lg border border-slate-900/80 bg-slate-950/95 px-3 py-2 text-xs text-white shadow-[0_10px_30px_rgba(0,0,0,0.55)] backdrop-blur-md">
                <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-amber-100">My Location</div>
                    <div className="rounded-full bg-slate-800 px-2 py-[2px] text-[11px] text-amber-200">{label}</div>
                </div>
                <div className="mt-1 flex items-center justify-between gap-3 text-[11px] text-amber-50">
                    <span className="truncate">{centerText}</span>
                    <button
                        type="button"
                        onClick={handleRecenter}
                        className="rounded bg-amber-300 px-2 py-[2px] text-[11px] font-semibold text-slate-900 shadow hover:bg-amber-200"
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
                        className="rounded bg-slate-800 px-2 py-[2px] font-semibold text-white shadow hover:bg-slate-700"
                    >
                        Retry locate
                    </button>
                </div>
            </div>
        </div>
    );
}
