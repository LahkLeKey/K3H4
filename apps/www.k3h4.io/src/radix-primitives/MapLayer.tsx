import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import maplibregl, { type RequestParameters, type ResourceType } from "maplibre-gl";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { TerrainLayer } from "@deck.gl/geo-layers";
import { setLoaderOptions } from "@loaders.gl/core";

type DeckMapboxOverlay = InstanceType<typeof MapboxOverlay>;

import { useMapView } from "../react-hooks/useMapView";
import { useGeoState } from "../zustand-stores/geo";
import { LocationOverview } from "./LocationOverview";
import { useAuthStore } from "../react-hooks/auth";
import { MapPinsOverlay, type Poi } from "../r3f-components/MapPinsOverlay";
import { usePoiQuery, usePoiStore } from "../zustand-stores/poi";

const MAX_DEM_ERROR = 28;
const TERRAIN_EXAGGERATION = 1.6;
const MAPTILER_STYLE_PATH = "/maps/hybrid/style.json"; // realistic satellite + labels
const EMPTY_TILE_PNG =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP8z8BQDwAEsALp2UNzMgAAAABJRU5ErkJggg==";
// Weather overlay disabled

// Lightweight debounce to avoid pulling in lodash-es
const debounce = <T extends (...args: any[]) => void>(fn: T, wait: number) => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const debounced = (...args: Parameters<T>) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn(...args), wait);
    };
    debounced.cancel = () => {
        if (timer) clearTimeout(timer);
        timer = null;
    };
    return debounced as T & { cancel: () => void };
};

export function MapLayer({ readonly }: { readonly?: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const navControlRef = useRef<maplibregl.NavigationControl | null>(null);
    const initialCenterRef = useRef<{ lat: number; lng: number } | null>(null);
    const [mapFrame, setMapFrame] = useState(0);
    const { updateView, registerMap, view } = useMapView();
    const { status, center, requestLocation, setCenterFromMap } = useGeoState();
    const { session, apiBase, signOut } = useAuthStore();
    const { setViewport } = usePoiStore();
    const poiQuery = usePoiQuery({ enabled: !readonly });
    type SearchResult = { id: string; label: string; lat: number; lng: number; zoom?: number };
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [searchStatus, setSearchStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
    const [searchError, setSearchError] = useState<string | null>(null);

    const [poiDetail, setPoiDetail] = useState<
        | null
        | {
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
        }
    >(null);
    const fetchingDetailRef = useRef<string | null>(null);

    const overlayRef = useRef<DeckMapboxOverlay | null>(null);

    const poiList = useMemo(() => {
        const items = poiQuery.data?.items ?? [];
        return items
            .filter((item) => !item.cluster)
            .map((item) => ({
                id: item.id,
                lat: item.lat,
                lng: item.lng,
                kind: item.category ?? undefined,
                name: item.name ?? undefined,
            })) as Poi[];
    }, [poiQuery.data]);

    const poiStatus: "idle" | "loading" | "ready" | "error" = poiQuery.isFetching
        ? "loading"
        : poiQuery.isError
            ? "error"
            : poiQuery.data
                ? "ready"
                : "idle";
    const poiError = poiQuery.error instanceof Error ? poiQuery.error.message : null;

    const terrainUrl = useMemo(
        // Use MapTiler terrain-rgb via proxy to avoid local DEM decode failures
        () => `${apiBase}/maptiler/tiles?path=/tiles/terrain-rgb-v2/{z}/{x}/{y}.png`,
        [apiBase],
    );
    const maptilerVectorTiles = useMemo(
        () => `${apiBase}/maptiler/tiles?path=/tiles/v3/{z}/{x}/{y}.pbf`,
        [apiBase],
    );
    const maptilerStyleUrl = useMemo(() => `${apiBase}/maptiler/json?path=${MAPTILER_STYLE_PATH}`, [apiBase]);

    const updateHighlight = useCallback((geometry: any | null) => {
        const map = mapRef.current;
        if (!map) return;
        const src = map.getSource("building-highlight") as maplibregl.GeoJSONSource | undefined;
        if (!src) return;
        const data = geometry
            ? { type: "FeatureCollection", features: [{ type: "Feature", geometry, properties: {} }] }
            : { type: "FeatureCollection", features: [] };
        src.setData(data as any);
    }, []);

    const fetchPoiDetail = useCallback(
        async (id: string) => {
            if (fetchingDetailRef.current === id) return null;
            fetchingDetailRef.current = id;
            try {
                const authed = Boolean(session?.accessToken);
                const url = `${apiBase}${authed ? "/api/pois" : "/pois"}/${id}?includeGeometry=true`;
                const headers = authed && session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : undefined;
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
        [apiBase, session?.accessToken, signOut],
    );

    const pickPoiAndFetch = useCallback(
        async (lngLat: { lng: number; lat: number }) => {
            const map = mapRef.current;
            if (!map || !poiList.length) return;
            const clickPoint = map.project(lngLat);
            let nearest: Poi | null = null;
            let minDist = Infinity;
            for (const p of poiList) {
                const pt = map.project([p.lng, p.lat]);
                const dx = pt.x - clickPoint.x;
                const dy = pt.y - clickPoint.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < minDist) {
                    minDist = d;
                    nearest = p;
                }
            }
            if (!nearest || minDist > 28) return; // ignore distant clicks/hovers

            if (poiDetail?.id === nearest.id) return;

            const detail = await fetchPoiDetail(nearest.id);
            if (!detail) return;
            const building = detail.building ?? null;
            updateHighlight(building?.geometry ?? null);
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
        [fetchPoiDetail, poiList, poiDetail?.id, updateHighlight],
    );

    const debouncedHoverPick = useMemo(() => debounce((lng: number, lat: number) => pickPoiAndFetch({ lng, lat }), 260), [pickPoiAndFetch]);

    const debouncedSearch = useMemo(
        () =>
            debounce(async (term: string) => {
                const q = term.trim();
                if (q.length < 3) {
                    setSearchResults([]);
                    setSearchStatus("idle");
                    setSearchError(null);
                    return;
                }
                setSearchStatus("loading");
                setSearchError(null);
                try {
                    const authed = Boolean(session?.accessToken);
                    const pathParam = `/geocoding/${q}.json`;
                    const url = `${apiBase}/maptiler/json?path=${encodeURIComponent(pathParam)}&autocomplete=true&limit=5`;
                    const headers = authed && session?.accessToken ? { Authorization: `Bearer ${session.accessToken}` } : undefined;
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
                            return { id: f?.id ?? `${label}:${lng}:${lat}`, label, lat, lng, zoom } as SearchResult;
                        })
                        .filter(Boolean) as SearchResult[];
                    setSearchResults(parsed);
                    setSearchStatus("ready");
                } catch (err) {
                    setSearchStatus("error");
                    setSearchError(err instanceof Error ? err.message : "search failed");
                }
            }, 320),
        [apiBase, session?.accessToken],
    );

    useEffect(() => {
        return () => {
            debouncedHoverPick.cancel();
            debouncedSearch.cancel();
        };
    }, [debouncedHoverPick, debouncedSearch]);

    const handleSelectSearch = useCallback((result: SearchResult) => {
        const map = mapRef.current;
        if (!map) return;
        setSearchTerm(result.label);
        setSearchResults([]);
        map.flyTo({ center: [result.lng, result.lat], zoom: result.zoom ?? 15, essential: true });
    }, []);

    const proxiedMaptilerRequest = useCallback(
        (url: string, type?: ResourceType): RequestParameters => {
            if (!url.includes("api.maptiler.com")) return { url } as RequestParameters;

            const u = new URL(url);
            u.searchParams.delete("key");
            const qs = u.searchParams.toString();
            const wantsBinary =
                type === "Tile" ||
                type === "Image" ||
                type === "SpriteImage" ||
                type === "SpriteJSON" ||
                type === "Glyphs";
            const endpoint = wantsBinary ? "tiles" : "json";
            const proxied = `${apiBase}/maptiler/${endpoint}?path=${u.pathname}${qs ? `&${qs}` : ""}`;
            return { url: proxied } as RequestParameters;
        },
        [apiBase],
    );

    const buildDeckLayers = useCallback(() => {
        const layers = [] as any[];

        layers.push(
            new TerrainLayer({
                id: "lowpoly-terrain",
                elevationData: terrainUrl,
                elevationDecoder: { rScaler: 6553.6, gScaler: 25.6, bScaler: 0.1, offset: -10000 },
                meshMaxError: MAX_DEM_ERROR,
                maxZoom: 14,
                wireframe: true,
                color: [190, 200, 210],
                operation: "terrain+draw",
                loadOptions: {
                    worker: false, // avoid loaders.gl worker parse errors in-browser
                    _workerType: "none",
                    // Swap in a transparent PNG if the DEM tile cannot be fetched or decoded
                    fetch: async (url: string, options?: RequestInit) => {
                        const res = await fetch(url, options);
                        const contentType = res.headers.get("content-type") ?? "";
                        if (res.ok && contentType.includes("image")) return res;
                        return fetch(EMPTY_TILE_PNG);
                    },
                },
                onTileError: () => null,
            }),
        );

        // Vector overlay disabled to stop MapTiler 400 spam; rely on base style tiles only

        return layers;
    }, [apiBase, maptilerVectorTiles, terrainUrl]);

    // One-time geolocation request on mount
    useEffect(() => {
        requestLocation();
    }, [requestLocation]);

    // Capture first known center to initialize the map only once
    useEffect(() => {
        if (status === "ready" && center && !initialCenterRef.current) {
            initialCenterRef.current = center;
        }
    }, [status, center]);

    useEffect(() => {
        if (mapRef.current) return; // already created
        const initialCenter = initialCenterRef.current;
        if (!ref.current || !initialCenter || status !== "ready") return;
        const map = new maplibregl.Map({
            container: ref.current,
            style: maptilerStyleUrl,
            center: [initialCenter.lng, initialCenter.lat],
            zoom: 14.5,
            pitch: 58,
            bearing: 24,
            minZoom: 5.5,
            maxZoom: 17.5,
            minPitch: 45,
            maxPitch: 75,
            attributionControl: false,
            interactive: !readonly,
            dragRotate: !readonly,
            pitchWithRotate: !readonly,
            transformRequest: proxiedMaptilerRequest,
        });

        if (readonly) {
            setLoaderOptions({ worker: false });


            map.boxZoom.disable();
            map.dragPan.disable();
            map.scrollZoom.disable();
            map.keyboard.disable();
            map.doubleClickZoom.disable();
            map.touchZoomRotate.disable();
            map.dragRotate.disable();
        }

        if (!readonly) {
            const nav = new maplibregl.NavigationControl({ visualizePitch: true });
            map.addControl(nav, "bottom-right");
            navControlRef.current = nav;
        }
        const overlay = new MapboxOverlay({ interleaved: true });
        map.addControl(overlay as any);
        overlayRef.current = overlay;
        mapRef.current = map;

        const applyDeckLayers = () => overlay.setProps({ layers: buildDeckLayers() });

        const sync = () => {
            const c = map.getCenter();
            const next = { lat: c.lat, lng: c.lng };
            updateView({
                center: next,
                zoom: map.getZoom(),
                bearing: map.getBearing(),
                pitch: map.getPitch(),
            });
        };

        const syncAndStoreCenter = () => {
            const c = map.getCenter();
            const next = { lat: c.lat, lng: c.lng };
            setCenterFromMap(next);
            sync();
        };

        let raf: number | null = null;
        const bump = () => {
            if (raf !== null) return;
            raf = requestAnimationFrame(() => {
                setMapFrame((n) => n + 1);
                raf = null;
            });
        };

        map.on("load", () => {
            // Highlight source/layers for building outlines
            if (!map.getSource("building-highlight")) {
                map.addSource("building-highlight", {
                    type: "geojson",
                    data: { type: "FeatureCollection", features: [] },
                } as any);
                const firstSymbolId = map.getStyle()?.layers?.find((l) => l.type === "symbol")?.id;
                map.addLayer(
                    {
                        id: "building-highlight-fill",
                        type: "fill",
                        source: "building-highlight",
                        paint: {
                            "fill-color": "#38bdf8",
                            "fill-opacity": 0.18,
                        },
                    } as any,
                    firstSymbolId,
                );
                map.addLayer(
                    {
                        id: "building-highlight-line",
                        type: "line",
                        source: "building-highlight",
                        paint: {
                            "line-color": "#0ea5e9",
                            "line-width": 2,
                            "line-opacity": 0.9,
                        },
                    } as any,
                    firstSymbolId,
                );
            }

            // Add DEM source and hillshade/terrain for more realistic relief (served via API cache)
            if (!map.getSource("terrain-dem")) {
                map.addSource("terrain-dem", {
                    type: "raster-dem",
                    tiles: [terrainUrl],
                    tileSize: 256,
                    maxzoom: 14,
                    encoding: "mapbox",
                } as any);
                map.setTerrain({ source: "terrain-dem", exaggeration: TERRAIN_EXAGGERATION });
            }

            // Separate DEM source for hillshade to avoid sharing the terrain source
            if (!map.getSource("terrain-dem-hillshade")) {
                map.addSource("terrain-dem-hillshade", {
                    type: "raster-dem",
                    tiles: [terrainUrl],
                    tileSize: 256,
                    maxzoom: 14,
                    encoding: "mapbox",
                } as any);
            }
            if (!map.getLayer("terrain-hillshade")) {
                map.addLayer({
                    id: "terrain-hillshade",
                    type: "hillshade",
                    source: "terrain-dem-hillshade",
                    paint: {
                        "hillshade-exaggeration": 0.7,
                        "hillshade-shadow-color": "#0f172a",
                        "hillshade-highlight-color": "#e2e8f0",
                    },
                } as any);
            }

            // Guard against bad DEM tiles: swap to transparent PNG on decode errors
            map.on("error", (ev) => {
                const sid =
                    typeof ev === "object" && ev && "sourceId" in ev
                        ? (ev as { sourceId?: string }).sourceId
                        : undefined;
                if (sid === "terrain-dem" || sid === "terrain-dem-hillshade") {
                    const src = map.getSource(sid) as any;
                    if (src?.tiles && src.tiles[0] !== EMPTY_TILE_PNG) {
                        // Swap in empty tile so rendering continues, but keep terrain exaggeration active
                        src.tiles = [EMPTY_TILE_PNG];
                        console.warn(`${sid} decode failed; using empty tile`);
                    }
                }
            });

            applyDeckLayers();
            syncAndStoreCenter();
            bump();

            // Ensure vector source exists for 3D buildings when style lacks "openmaptiles"
            if (!map.getSource("openmaptiles")) {
                map.addSource("openmaptiles", {
                    type: "vector",
                    tiles: [maptilerVectorTiles],
                    minzoom: 0,
                    maxzoom: 14,
                } as any);
            }

            // Building layer disabled per request; map remains base style only

            // Weather overlay temporarily disabled (API is returning 500s)
        });
        map.on("click", (ev) => {
            void pickPoiAndFetch(ev.lngLat);
        });
        map.on("mousemove", (ev) => {
            debouncedHoverPick(ev.lngLat.lng, ev.lngLat.lat);
        });
        map.on("move", () => {
            sync();
            bump();
        });
        map.on("moveend", () => {
            syncAndStoreCenter();
            bump();
        });
        map.on("zoom", bump);
        map.on("rotate", bump);
        map.on("pitch", bump);
        map.on("render", bump);
        registerMap(map);

        return () => {
            if (raf !== null) cancelAnimationFrame(raf);
            registerMap(null);
            overlayRef.current?.finalize();
            overlayRef.current = null;
            navControlRef.current = null;
            mapRef.current = null;
            map.remove();
        };
    }, [
        buildDeckLayers,
        debouncedHoverPick,
        registerMap,
        terrainUrl,
        updateView,
        status,
        maptilerStyleUrl,
        maptilerVectorTiles,
        proxiedMaptilerRequest,
        readonly,
        pickPoiAndFetch,
    ]);

    // Toggle interaction controls when switching between readonly/auth and normal views
    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        const disableAll = () => {
            map.scrollZoom.disable();
            map.boxZoom.disable();
            map.dragPan.disable();
            map.dragRotate.disable();
            map.keyboard.disable();
            map.doubleClickZoom.disable();
            map.touchZoomRotate.disable();
            if (navControlRef.current) {
                map.removeControl(navControlRef.current);
                navControlRef.current = null;
            }
        };

        const enableAll = () => {
            map.scrollZoom.enable();
            map.boxZoom.enable();
            map.dragPan.enable();
            map.dragRotate.enable();
            map.keyboard.enable();
            map.doubleClickZoom.enable();
            map.touchZoomRotate.enable();
            if (!navControlRef.current) {
                const nav = new maplibregl.NavigationControl({ visualizePitch: true });
                map.addControl(nav, "bottom-right");
                navControlRef.current = nav;
            }
        };

        if (readonly) {
            disableAll();
        } else {
            enableAll();
        }
    }, [readonly]);

    const updatePoiViewport = useCallback(() => {
        if (readonly) return;
        const map = mapRef.current;
        if (!map) return;
        const bounds = map.getBounds();
        setViewport(
            {
                minLat: bounds.getSouth(),
                minLng: bounds.getWest(),
                maxLat: bounds.getNorth(),
                maxLng: bounds.getEast(),
            },
            map.getZoom(),
        );
    }, [readonly, setViewport]);
    // Update POI viewport on map moves/zooms
    useEffect(() => {
        const map = mapRef.current;
        if (!map || readonly) return;

        const onMoveEnd = () => {
            updatePoiViewport();
        };

        map.on("moveend", onMoveEnd);
        map.on("zoomend", onMoveEnd);

        updatePoiViewport();

        return () => {
            map.off("moveend", onMoveEnd);
            map.off("zoomend", onMoveEnd);
        };
    }, [readonly, updatePoiViewport]);

    // Persist current map view to user prefs (debounced)
    useEffect(() => {
        if (!session?.accessToken || !view.ready) return;
        const handle = setTimeout(() => {
            void fetch(`${apiBase}/geo/prefs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessToken}`,
                },
                credentials: "include",
                body: JSON.stringify({
                    center: view.center,
                    view: { zoom: view.zoom, bearing: view.bearing, pitch: view.pitch },
                }),
            })
                .then((res) => {
                    if (res && res.status === 401) {
                        signOut();
                    } else if (!res?.ok) {
                        console.warn("geo prefs persist failed", res?.status);
                    }
                })
                .catch((err) => console.warn("geo prefs persist failed", err));
        }, 450);

        return () => clearTimeout(handle);
    }, [apiBase, session?.accessToken, view, signOut]);

    // Refresh deck.gl layers when API base changes
    useEffect(() => {
        if (!overlayRef.current) return;
        overlayRef.current.setProps({ layers: buildDeckLayers() });
    }, [buildDeckLayers]);

    if (status === "blocked" || status === "error") {
        return (
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-slate-900 text-sm font-semibold text-white/90">
                enable-geo-location-to-see-map
            </div>
        );
    }

    if (status !== "ready" || !center) {
        return (
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-slate-900 text-sm font-semibold text-white/80">
                requesting-location...
            </div>
        );
    }

    return (
        <>
            <div ref={ref} className="absolute inset-0 z-0" />
            {!readonly ? (
                <div className="pointer-events-none absolute right-3 top-20 z-40 flex flex-col items-end gap-3">
                    <div className="pointer-events-auto w-80 max-w-[calc(100%-24px)]">
                        <LocationOverview />
                    </div>
                    <div className="pointer-events-auto w-80 max-w-[calc(100%-24px)] space-y-1">
                        <div className="rounded-lg bg-white/90 px-3 py-2 shadow">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSearchTerm(val);
                                    debouncedSearch(val);
                                }}
                                placeholder="Search address or place"
                                className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-sm text-slate-800 outline-none focus:border-sky-400"
                            />
                            {searchStatus === "error" && searchError ? (
                                <div className="mt-1 text-[11px] text-amber-600">{searchError}</div>
                            ) : null}
                            {searchStatus === "loading" ? (
                                <div className="mt-1 text-[11px] text-slate-500">Searching…</div>
                            ) : null}
                            {searchResults.length > 0 ? (
                                <div className="mt-2 max-h-52 space-y-1 overflow-y-auto text-sm text-slate-800">
                                    {searchResults.map((r) => (
                                        <button
                                            key={r.id}
                                            type="button"
                                            className="block w-full rounded px-2 py-1 text-left hover:bg-slate-100"
                                            onClick={() => handleSelectSearch(r)}
                                        >
                                            <div className="text-[13px] font-semibold text-slate-900">{r.label}</div>
                                            <div className="text-[11px] text-slate-500">{r.lat.toFixed(4)}, {r.lng.toFixed(4)}</div>
                                        </button>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            ) : null}
            {poiDetail ? (
                <div className="absolute left-3 bottom-3 z-10 max-w-xs rounded-lg bg-slate-900/90 px-3 py-3 text-xs text-white shadow-lg">
                    <div className="text-sm font-semibold text-white">{poiDetail.name ?? "POI"}</div>
                    <div className="mt-0.5 text-[11px] uppercase tracking-wide text-slate-300">{poiDetail.category ?? "unknown"}</div>
                    {poiDetail.building ? (
                        <div className="mt-2 space-y-0.5 text-[11px] text-slate-200">
                            <div className="font-semibold text-slate-100">Building</div>
                            {poiDetail.building.type ? <div>Type: {poiDetail.building.type}</div> : null}
                            {poiDetail.building.osmId ? <div>OSM: {poiDetail.building.osmId}</div> : null}
                            {(poiDetail.building.addressStreet || poiDetail.building.addressHouseNumber) ? (
                                <div>
                                    {poiDetail.building.addressHouseNumber ? `${poiDetail.building.addressHouseNumber} ` : ""}
                                    {poiDetail.building.addressStreet ?? ""}
                                </div>
                            ) : null}
                            {(poiDetail.building.addressCity || poiDetail.building.addressPostcode) ? (
                                <div>
                                    {poiDetail.building.addressCity ?? ""}
                                    {poiDetail.building.addressCity && poiDetail.building.addressPostcode ? ", " : ""}
                                    {poiDetail.building.addressPostcode ?? ""}
                                </div>
                            ) : null}
                            {poiDetail.building.addressState ? <div>{poiDetail.building.addressState}</div> : null}
                            {poiDetail.building.addressCountry ? <div>{poiDetail.building.addressCountry}</div> : null}
                        </div>
                    ) : (
                        <div className="mt-2 text-[11px] text-slate-300">No building linked</div>
                    )}
                </div>
            ) : null}
            {poiStatus === "error" && !readonly ? (
                <div className="pointer-events-none absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-slate-900/85 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                    poi fetch failed
                    {poiError ? <span className="ml-2 text-[11px] font-normal text-amber-200/80">{poiError}</span> : null}
                </div>
            ) : null}
            {!readonly ? <MapPinsOverlay map={mapRef.current} pois={poiList} frame={mapFrame} /> : null}
            {/* LocationOverview now rendered inside the top-right overlay with the search box */}
            {!readonly ? (
                <button
                    type="button"
                    onClick={requestLocation}
                    className="absolute right-3 top-3 z-10 rounded bg-white/90 px-3 py-2 text-xs font-semibold text-slate-800 shadow"
                >
                    Locate me
                </button>
            ) : null}
        </>
    );
}
