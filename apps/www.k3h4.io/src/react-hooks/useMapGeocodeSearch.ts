import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from "./useDebouncedCallback";

export type MapSearchResult = { id: string; label: string; lat: number; lng: number; zoom?: number };

type Status = "idle" | "loading" | "ready" | "error";

type Options = {
    apiBase: string;
    accessToken?: string | null;
};

export function useMapGeocodeSearch({ apiBase, accessToken }: Options) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<MapSearchResult[]>([]);
    const [searchStatus, setSearchStatus] = useState<Status>("idle");
    const [searchError, setSearchError] = useState<string | null>(null);

    const performSearch = useDebouncedCallback(
        async (rawTerm: string) => {
            const q = rawTerm.trim();
            if (q.length < 3) {
                setSearchResults([]);
                setSearchStatus("idle");
                setSearchError(null);
                return;
            }

            setSearchStatus("loading");
            setSearchError(null);

            try {
                const authed = Boolean(accessToken);
                const pathParam = `/geocoding/${q}.json`;
                const url = `${apiBase}/maptiler/json?path=${encodeURIComponent(pathParam)}&autocomplete=true&limit=5`;
                const headers = authed && accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined;
                const res = await fetch(url, { headers: headers as any, credentials: "include" });
                if (!res.ok) throw new Error(`geocode ${res.status}`);
                const body = await res.json();
                const feats = Array.isArray(body?.features) ? body.features : [];
                const parsed = feats
                    .map((f: any) => {
                        const center = Array.isArray(f?.center) ? f.center : Array.isArray(f?.geometry?.coordinates) ? f.geometry.coordinates : null;
                        const [lng, lat] = Array.isArray(center) && center.length >= 2 ? center : [null, null];
                        const label = f?.place_name ?? f?.properties?.label ?? f?.text ?? f?.properties?.name ?? q;
                        const zoom = f?.properties?.accuracy === "point" ? 16 : 14;
                        if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
                        return { id: f?.id ?? `${label}:${lng}:${lat}`, label, lat, lng, zoom } as MapSearchResult;
                    })
                    .filter(Boolean) as MapSearchResult[];

                setSearchResults(parsed);
                setSearchStatus("ready");
            } catch (err) {
                setSearchStatus("error");
                setSearchError(err instanceof Error ? err.message : "search failed");
            }
        },
        320,
    );

    useEffect(() => performSearch.cancel, [performSearch]);

    const handleChange = useCallback((value: string) => {
        setSearchTerm(value);
        performSearch(value);
    }, [performSearch]);

    const handleSelect = useCallback((result: MapSearchResult) => {
        setSearchTerm(result.label);
        setSearchResults([]);
    }, []);

    return useMemo(
        () => ({
            searchTerm,
            searchResults,
            searchStatus,
            searchError,
            onChange: handleChange,
            onSelect: handleSelect,
        }),
        [handleChange, handleSelect, searchError, searchResults, searchStatus, searchTerm],
    );
}