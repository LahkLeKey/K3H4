import { useMemo } from "react";
import type { MapSearchResult } from "../react-hooks/useMapGeocodeSearch";

export type MapSearchPanelProps = {
    value: string;
    status: "idle" | "loading" | "ready" | "error";
    error?: string | null;
    results: MapSearchResult[];
    onChange: (value: string) => void;
    onSelect: (result: MapSearchResult) => void;
};

export function MapSearchPanel({ value, status, error, results, onChange, onSelect }: MapSearchPanelProps) {
    const hint = useMemo(() => {
        if (status === "loading") return "Searching…";
        if (status === "error") return error ?? "Search failed";
        if (status === "ready" && results.length === 0) return "No results";
        if (status === "idle" && value.trim().length === 0) return "Search places";
        return null;
    }, [error, results.length, status, value]);

    return (
        <div className="rounded-xl border border-slate-200/70 bg-white/95 shadow-lg shadow-slate-900/5 backdrop-blur">
            <div className="flex items-center gap-2 px-3 py-2">
                <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Search for a place"
                    className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-sky-500 focus:outline-none"
                />
                <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">{status}</span>
            </div>
            {hint ? <div className="px-3 pb-3 text-xs text-slate-500">{hint}</div> : null}
            {results.length > 0 ? (
                <ul className="max-h-64 overflow-y-auto border-t border-slate-100">
                    {results.map((result) => (
                        <li key={result.id}>
                            <button
                                type="button"
                                className="flex w-full items-start gap-2 px-3 py-2 text-left text-sm text-slate-900 hover:bg-slate-50"
                                onClick={() => onSelect(result)}
                            >
                                <span className="mt-0.5 h-2 w-2 rounded-full bg-sky-500" aria-hidden />
                                <span className="leading-tight">{result.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}
