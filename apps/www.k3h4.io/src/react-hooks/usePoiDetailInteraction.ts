import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type maplibregl from "maplibre-gl";
import type { Poi } from "../r3f-components/MapPinsOverlay";
import { useDebouncedCallback } from "./useDebouncedCallback";

export type PoiDetail = {
    id: string;
    name?: string | null;
    category?: string | null;
    lat: number;
    lng: number;
    building?: {
        id: number | null;
        osmId: number | null;
        type?: string | null;
        addressHouseNumber?: string | null;
        addressStreet?: string | null;
        addressCity?: string | null;
        addressPostcode?: string | null;
        addressState?: string | null;
        addressCountry?: string | null;
        geometry?: any;
    } | null;
} | null;

export type PoiAnchor = { x: number; y: number; lat: number; lng: number } | null;

type Options = {
    mapRef: React.RefObject<maplibregl.Map | null>;
    apiBase: string;
    accessToken?: string | null;
    signOut: () => void;
    poiPins: Poi[];
    frame: number;
};

export function usePoiDetailInteraction({ mapRef, apiBase, accessToken, signOut, poiPins, frame }: Options) {
    const [poiDetail, setPoiDetail] = useState<PoiDetail>(null);
    const [poiAnchor, setPoiAnchor] = useState<PoiAnchor>(null);
    const fetchingDetailRef = useRef<string | null>(null);
    const currentPoiDetailIdRef = useRef<string | null>(null);

    const updateHighlight = useCallback((geometry: any | null) => {
        const map = mapRef.current;
        if (!map) return;
        const src = map.getSource("building-highlight") as maplibregl.GeoJSONSource | undefined;
        if (!src) return;
        const data = geometry
            ? { type: "FeatureCollection", features: [{ type: "Feature", geometry, properties: {} }] }
            : { type: "FeatureCollection", features: [] };
        src.setData(data as any);
    }, [mapRef]);

    const fetchPoiDetail = useCallback(
        async (id: string) => {
            if (fetchingDetailRef.current === id) return null;
            fetchingDetailRef.current = id;
            try {
                const authed = Boolean(accessToken);
                const url = `${apiBase}${authed ? "/api/pois" : "/pois"}/${id}?includeGeometry=true`;
                const headers = authed && accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined;
                const res = await fetch(url, { headers: headers as any, credentials: "include" });
                if (res.status === 401 && authed) {
                    signOut();
                    return null;
                }
                if (!res.ok) throw new Error(`poi detail ${res.status}`);
                const body = (await res.json()) as any;
                return body as any;
            } finally {
                fetchingDetailRef.current = null;
            }
        },
        [accessToken, apiBase, signOut],
    );

    useEffect(() => {
        currentPoiDetailIdRef.current = poiDetail?.id ?? null;
    }, [poiDetail?.id]);

    const pickPoiAndFetch = useCallback(
        async (lngLat: { lng: number; lat: number }) => {
            const map = mapRef.current;
            if (!map || !poiPins.length) return;
            const clickPoint = map.project(lngLat);
            let nearest: Poi | null = null;
            let minDist = Infinity;
            for (const p of poiPins) {
                const pt = map.project([p.lng, p.lat]);
                const dx = pt.x - clickPoint.x;
                const dy = pt.y - clickPoint.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < minDist) {
                    minDist = d;
                    nearest = p;
                }
            }
            if (!nearest || minDist > 28) return;
            if (currentPoiDetailIdRef.current === nearest.id) return;

            const detail = await fetchPoiDetail(nearest.id);
            if (!detail) return;
            const building = detail.building ?? null;
            updateHighlight(building?.geometry ?? null);
            const projected = map.project([nearest.lng, nearest.lat]);
            setPoiAnchor({ x: projected.x, y: projected.y, lat: nearest.lat, lng: nearest.lng });
            setPoiDetail({
                id: nearest.id,
                name: detail.name ?? nearest.name ?? null,
                category: detail.category ?? nearest.kind ?? null,
                lat: nearest.lat,
                lng: nearest.lng,
                building: building
                    ? {
                        id: building.id ?? null,
                        osmId: building.osmId ?? null,
                        type: building.type ?? null,
                        addressHouseNumber: building.addressHouseNumber ?? null,
                        addressStreet: building.addressStreet ?? null,
                        addressCity: building.addressCity ?? null,
                        addressPostcode: building.addressPostcode ?? null,
                        addressState: building.addressState ?? null,
                        addressCountry: building.addressCountry ?? null,
                        geometry: building.geometry ?? null,
                    }
                    : null,
            });
        },
        [fetchPoiDetail, mapRef, poiPins, updateHighlight],
    );

    const debouncedHoverPick = useDebouncedCallback((lng: number, lat: number) => pickPoiAndFetch({ lng, lat }), 260);

    useEffect(() => debouncedHoverPick.cancel, [debouncedHoverPick]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map || !poiAnchor) return;
        const p = map.project([poiAnchor.lng, poiAnchor.lat]);
        setPoiAnchor((prev) => (prev ? { ...prev, x: p.x, y: p.y } : prev));
    }, [frame, mapRef, poiAnchor?.lat, poiAnchor?.lng]);

    const clearPoi = useCallback(() => {
        setPoiDetail(null);
        setPoiAnchor(null);
        updateHighlight(null);
    }, [updateHighlight]);

    return useMemo(
        () => ({ poiDetail, poiAnchor, pickPoiAndFetch, debouncedHoverPick, clearPoi }),
        [clearPoi, debouncedHoverPick, pickPoiAndFetch, poiAnchor, poiDetail],
    );
}