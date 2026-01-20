import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import maplibregl, { type RequestParameters, type ResourceType } from "maplibre-gl";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { TerrainLayer } from "@deck.gl/geo-layers";
import { setLoaderOptions } from "@loaders.gl/core";

type DeckMapboxOverlay = InstanceType<typeof MapboxOverlay>;

import { useMapView } from "../react-hooks/useMapView";
import { useGeoState } from "../zustand-stores/geo";
import { LocationOverview } from "../radix-primitives/LocationOverview";
import { useAuthStore } from "../react-hooks/auth";
import { MapPinsOverlay, type Poi } from "../r3f-components/MapPinsOverlay";
import { usePoiQuery, usePoiStore } from "../zustand-stores/poi";
import { useMapGeocodeSearch, type MapSearchResult } from "../react-hooks/useMapGeocodeSearch";
import { MapLocateButton, MapSearchPanel, MapStatusOverlay, PoiDetailCard, PoiErrorBanner } from "../radix-primitives";
import { usePoiDetailInteraction } from "../react-hooks/usePoiDetailInteraction";
import { useMapInteractionToggle } from "../react-hooks/useMapInteractionToggle";
import { usePoiViewportSync } from "../react-hooks/usePoiViewportSync";
import { usePersistMapView } from "../react-hooks/usePersistMapView";

const MAX_DEM_ERROR = 28;
const TERRAIN_EXAGGERATION = 1.6;
const MAPTILER_STYLE_PATH = "/maps/hybrid/style.json";
const EMPTY_TILE_PNG =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP8z8BQDwAEsALp2UNzMgAAAABJRU5ErkJggg==";

export function MapLayer({ readonly }: { readonly?: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const navControlRef = useRef<maplibregl.NavigationControl | null>(null);
    const initialCenterRef = useRef<{ lat: number; lng: number } | null>(null);
    const overlayRef = useRef<DeckMapboxOverlay | null>(null);
    const [mapFrame, setMapFrame] = useState(0);

    const { updateView, registerMap, view } = useMapView();
    const { status, center, requestLocation, setCenterFromMap } = useGeoState();
    const { session, apiBase, signOut } = useAuthStore();
    const { setViewport } = usePoiStore();
    const poiQuery = usePoiQuery({ enabled: !readonly });

    const poiItems = useMemo(() => poiQuery.data?.items ?? [], [poiQuery.data]);
    const poiPins = useMemo(() => {
        return poiItems
            .filter((item) => !item.cluster)
            .map((item) => ({
                id: item.id,
                lat: item.lat,
                lng: item.lng,
                kind: item.category ?? undefined,
                name: item.name ?? undefined,
            })) as Poi[];
    }, [poiItems]);

    const poiPinsVisual = useMemo(() => {
        return poiItems.map((item) => ({
            id: item.id,
            lat: item.lat,
            lng: item.lng,
            kind: item.cluster ? "cluster" : item.category ?? undefined,
            name: item.name ?? undefined,
        })) as Poi[];
    }, [poiItems]);

    const poiStatus: "idle" | "loading" | "ready" | "error" = poiQuery.isFetching
        ? "loading"
        : poiQuery.isError
            ? "error"
            : poiQuery.data
                ? "ready"
                : "idle";
    const poiError = poiQuery.error instanceof Error ? poiQuery.error.message : null;

    const terrainUrl = useMemo(
        () => `${apiBase}/maptiler/tiles?path=/tiles/terrain-rgb-v2/{z}/{x}/{y}.png`,
        [apiBase],
    );
    const maptilerVectorTiles = useMemo(
        () => `${apiBase}/maptiler/tiles?path=/tiles/v3/{z}/{x}/{y}.pbf`,
        [apiBase],
    );
    const maptilerStyleUrl = useMemo(() => `${apiBase}/maptiler/json?path=${MAPTILER_STYLE_PATH}`, [apiBase]);

    const {
        searchTerm,
        searchResults,
        searchStatus,
        searchError,
        onChange: onSearchChange,
        onSelect: commitSearchSelection,
    } = useMapGeocodeSearch({ apiBase, accessToken: session?.accessToken });

    const { poiDetail, poiAnchor, pickPoiAndFetch, debouncedHoverPick, clearPoi } = usePoiDetailInteraction({
        mapRef,
        apiBase,
        accessToken: session?.accessToken ?? null,
        signOut,
        poiPins,
        frame: mapFrame,
    });

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
                    worker: false,
                    _workerType: "none",
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

        return layers;
    }, [terrainUrl]);

    const requestedLocationRef = useRef(false);

    useEffect(() => {
        if (requestedLocationRef.current) return;
        if (!center) {
            requestedLocationRef.current = true;
            requestLocation({ force: false });
        }
    }, [center, requestLocation]);

    useEffect(() => {
        if (status === "ready" && center && !initialCenterRef.current) {
            initialCenterRef.current = center;
        }
    }, [status, center]);

    useEffect(() => {
        if (mapRef.current) return;
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
                        paint: { "fill-color": "#38bdf8", "fill-opacity": 0.18 },
                    } as any,
                    firstSymbolId,
                );
                map.addLayer(
                    {
                        id: "building-highlight-line",
                        type: "line",
                        source: "building-highlight",
                        paint: { "line-color": "#0ea5e9", "line-width": 2, "line-opacity": 0.9 },
                    } as any,
                    firstSymbolId,
                );
            }

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

            map.on("error", (ev) => {
                const sid = typeof ev === "object" && ev && "sourceId" in ev ? (ev as { sourceId?: string }).sourceId : undefined;
                if (sid === "terrain-dem" || sid === "terrain-dem-hillshade") {
                    const src = map.getSource(sid) as any;
                    if (src?.tiles && src.tiles[0] !== EMPTY_TILE_PNG) {
                        src.tiles = [EMPTY_TILE_PNG];
                        console.warn(`${sid} decode failed; using empty tile`);
                    }
                }
            });

            applyDeckLayers();
            syncAndStoreCenter();

            const b = map.getBounds();
            setViewport(
                { minLat: b.getSouth(), minLng: b.getWest(), maxLat: b.getNorth(), maxLng: b.getEast() },
                map.getZoom(),
            );
            bump();

            if (!map.getSource("openmaptiles")) {
                map.addSource("openmaptiles", {
                    type: "vector",
                    tiles: [maptilerVectorTiles],
                    minzoom: 0,
                    maxzoom: 14,
                } as any);
            }
        });

        map.on("click", (ev) => { void pickPoiAndFetch(ev.lngLat); });
        map.on("mousemove", (ev) => { debouncedHoverPick(ev.lngLat.lng, ev.lngLat.lat); });
        map.on("move", () => { sync(); bump(); });
        map.on("moveend", () => { syncAndStoreCenter(); bump(); });
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
        maptilerStyleUrl,
        maptilerVectorTiles,
        pickPoiAndFetch,
        proxiedMaptilerRequest,
        readonly,
        registerMap,
        setCenterFromMap,
        setViewport,
        status,
        terrainUrl,
        updateView,
    ]);

    useMapInteractionToggle(mapRef, navControlRef, readonly);
    usePoiViewportSync(mapRef, Boolean(readonly), setViewport);
    usePersistMapView(apiBase, session?.accessToken ?? null, signOut, view);

    useEffect(() => {
        if (!overlayRef.current) return;
        overlayRef.current.setProps({ layers: buildDeckLayers() });
    }, [buildDeckLayers]);

    const handleSelectSearch = useCallback(
        (result: MapSearchResult) => {
            commitSearchSelection(result);
            const map = mapRef.current;
            if (!map) return;
            map.flyTo({ center: [result.lng, result.lat], zoom: result.zoom ?? 15, essential: true });
        },
        [commitSearchSelection],
    );

    if (status === "blocked" || status === "error") {
        return <MapStatusOverlay state="blocked" />;
    }

    if (status !== "ready" || !center) {
        return <MapStatusOverlay state="requesting" />;
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
                        <MapSearchPanel
                            value={searchTerm}
                            status={searchStatus}
                            error={searchError}
                            results={searchResults}
                            onChange={onSearchChange}
                            onSelect={handleSelectSearch}
                        />
                    </div>
                </div>
            ) : null}
            {poiDetail && poiAnchor ? <PoiDetailCard detail={poiDetail} anchor={poiAnchor} onClose={clearPoi} /> : null}
            {!readonly ? <PoiErrorBanner status={poiStatus} error={poiError} /> : null}
            {!readonly ? <MapPinsOverlay map={mapRef.current} pois={poiPinsVisual} frame={mapFrame} /> : null}
            {!readonly ? <MapLocateButton onClick={() => requestLocation({ force: true })} /> : null}
        </>
    );
}