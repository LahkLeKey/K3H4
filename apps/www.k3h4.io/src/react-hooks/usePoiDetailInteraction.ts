import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type maplibregl from "maplibre-gl";
import type { Poi } from "../r3f-components/MapPinsOverlay";
import type { Polygon, MultiPolygon } from "geojson";
import { useDebouncedCallback } from "./useDebouncedCallback";

export type PoiDetail = {
    id: string;
    name?: string | null;
    category?: string | null;
    lat: number;
    lng: number;
    address?: {
        label?: string | null;
        house_number?: string | null;
        road?: string | null;
        neighborhood?: string | null;
        city?: string | null;
        postcode?: string | null;
        country?: string | null;
    } | null;
    contact?: { phone?: string | null; website?: string | null } | null;
    openingHours?: string | null;
    fuelTypes?: string[] | null;
    accessibility?: { wheelchair?: string | null } | null;
    description?: string | null;
    photos?: Array<{ url: string; caption?: string | null }> | null;
    building?: {
        type?: string | null;
        subtype?: string | null;
        levels?: number | null;
        footprint?: Polygon | MultiPolygon | null;
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
        async (poi: Poi) => {
            const authed = Boolean(accessToken);
            const { id } = poi;
            if (fetchingDetailRef.current === id) return null;
            fetchingDetailRef.current = id;
            try {
                const include = [
                    "address",
                    "contact",
                    "openingHours",
                    "fuel",
                    "accessibility",
                    "building",
                    "photos",
                    "description",
                ].join(",");

                const osmId = poi.osmId && poi.osmType ? `${poi.osmType}/${poi.osmId}` : null;
                const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined;

                // Try enrichment first if we have an OSM identifier
                if (osmId) {
                    const enrichUrl = `${apiBase}/api/poi/${osmId}/enrich?include=${encodeURIComponent(include)}`;
                    const res = await fetch(enrichUrl, { headers: headers as any, credentials: "include" });
                    if (res.status === 401 && authed) {
                        signOut();
                        return null;
                    }
                    if (res.ok) return (await res.json()) as any;
                    if (res.status !== 404) throw new Error(`poi detail ${res.status}`);
                    // fall through to legacy if 404
                }

                const legacyUrl = `${apiBase}${authed ? "/api/pois" : "/pois"}/${id}?includeGeometry=true`;
                const legacyRes = await fetch(legacyUrl, { headers: headers as any, credentials: "include" });
                if (legacyRes.status === 401 && authed) {
                    signOut();
                    return null;
                }
                if (!legacyRes.ok) throw new Error(`poi detail ${legacyRes.status}`);
                return (await legacyRes.json()) as any;
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

            const detail = await fetchPoiDetail(nearest);
            if (!detail) return;
            const building = detail.building ?? null;
            const footprint = building?.footprint ?? (building as any)?.geometry ?? null;
            updateHighlight(footprint);
            const projected = map.project([nearest.lng, nearest.lat]);
            setPoiAnchor({ x: projected.x, y: projected.y, lat: nearest.lat, lng: nearest.lng });
            setPoiDetail({
                id: nearest.id,
                name: detail.name ?? nearest.name ?? null,
                category: detail.category ?? nearest.kind ?? null,
                lat: nearest.lat,
                lng: nearest.lng,
                address: detail.address ?? null,
                contact: detail.contact ?? null,
                openingHours: detail.openingHours ?? null,
                fuelTypes: detail.fuelTypes ?? null,
                accessibility: detail.accessibility ?? null,
                description: detail.description ?? null,
                photos: detail.photos ?? null,
                building: building
                    ? {
                        type: building.type ?? null,
                        subtype: building.subtype ?? null,
                        levels: building.levels ?? null,
                        footprint: footprint ?? null,
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