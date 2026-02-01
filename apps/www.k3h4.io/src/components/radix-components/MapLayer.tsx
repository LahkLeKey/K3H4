import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import maplibregl, { type MapSourceDataEvent, type RequestParameters, type ResourceType } from "maplibre-gl";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { TerrainLayer } from "@deck.gl/geo-layers";
import { setLoaderOptions } from "@loaders.gl/core";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

type DeckMapboxOverlay = InstanceType<typeof MapboxOverlay>;

import { useMapView } from "../../react-hooks/useMapView";
import { useGeoState } from "../../zustand-stores/geo";
import { LocationOverview } from "../ui";
import { useAuthStore } from "../../react-hooks/auth";
import { MapPinsOverlay, type Poi } from "../r3f-components/MapPinsOverlay";
import { usePoiQuery, usePoiStore } from "../../zustand-stores/poi";
import { useMapGeocodeSearch, type MapSearchResult } from "../../react-hooks/useMapGeocodeSearch";
import { MapLocateButton, MapSearchPanel, MapStatusOverlay, PoiDetailCard, PoiErrorBanner } from "../ui";
import { usePoiDetailInteraction } from "../../react-hooks/usePoiDetailInteraction";
import { useMapInteractionToggle } from "../../react-hooks/useMapInteractionToggle";
import { usePoiViewportSync } from "../../react-hooks/usePoiViewportSync";
import { usePersistMapView } from "../../react-hooks/usePersistMapView";
import { useDebouncedCallback } from "../../react-hooks/useDebouncedCallback";
import { buildApiUrl } from "../../react-hooks/lib/apiBase";
import { R3FErrorBoundary } from "../r3f-components/R3FErrorBoundary";

const MAX_DEM_ERROR = 28;
const TERRAIN_EXAGGERATION = 1.6;
const DEFAULT_STYLE_PATH = "/maps/hybrid/style.json";
const DEFAULT_VECTOR_TILE_PATH = "/tiles/v3/{z}/{x}/{y}.pbf";
const DEFAULT_TERRAIN_TILE_PATH = "/tiles/terrain-rgb-v2/{z}/{x}/{y}.png";
const FALLBACK_STYLE_URL = "https://demotiles.maplibre.org/style.json";
const EMPTY_TILE_PNG =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGP8z8BQDwAEsALp2UNzMgAAAABJRU5ErkJggg==";
const STAR_LAYERS = [
    { radius: 150, depth: 120, count: 1900, factor: 1.0, saturation: 0.06, fade: true, speed: 0.24 },
    { radius: 95, depth: 70, count: 1200, factor: 0.82, saturation: 0.08, fade: true, speed: 0.42 },
];

function StarfieldBackground() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
            <div className="pointer-events-none absolute inset-0">
                <R3FErrorBoundary>
                    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 9], fov: 45 }} gl={{ antialias: true, alpha: false }}>
                        <color attach="background" args={["#020617"]} />
                        <ambientLight intensity={0.18} color="#cbd5e1" />
                        {STAR_LAYERS.map((layer, idx) => (
                            <Stars key={idx} {...layer} />
                        ))}
                    </Canvas>
                </R3FErrorBoundary>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.12),transparent_40%),radial-gradient(circle_at_75%_10%,rgba(56,189,248,0.12),transparent_38%),radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.12),transparent_38%)]" />
            </div>
        </div>
    );
}

const tileXY = (lng: number, lat: number, zoom: number) => {
    const z = Math.round(zoom);
    const n = 2 ** z;
    const x = Math.floor(((lng + 180) / 360) * n);
    const latRad = (lat * Math.PI) / 180;
    const y = Math.floor(((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n);
    return { x, y, z };
};

export function MapLayer({ readonly }: { readonly?: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const navControlRef = useRef<maplibregl.NavigationControl | null>(null);
    const initialCenterRef = useRef<{ lat: number; lng: number } | null>(null);
    const overlayRef = useRef<DeckMapboxOverlay | null>(null);
    const mapFrameRaf = useRef<number | null>(null);
    const [mapFrame, setMapFrame] = useState(0);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [mapGateTimerDone, setMapGateTimerDone] = useState(false);
    const [demReady, setDemReady] = useState(false);
    const [meshReady, setMeshReady] = useState(false);
    const terrainReady = demReady && meshReady;

    useEffect(() => {
        return () => {
            if (mapFrameRaf.current !== null) cancelAnimationFrame(mapFrameRaf.current);
        };
    }, []);

    const { updateView, registerMap, view } = useMapView();
    const { status, center, requestLocation, setCenterFromMap, mapConfig } = useGeoState();
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
                osmId: item.osmId,
                osmType: item.osmType,
            })) as Poi[];
    }, [poiItems]);

    const poiPinsVisual = useMemo(() => {
        return poiItems.map((item) => ({
            id: item.id,
            lat: item.lat,
            lng: item.lng,
            kind: item.cluster ? "cluster" : item.category ?? undefined,
            name: item.name ?? undefined,
            osmId: item.osmId,
            osmType: item.osmType,
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

    const stylePath = mapConfig?.stylePath ?? DEFAULT_STYLE_PATH;
    const vectorTilePath = mapConfig?.vectorTilePath ?? DEFAULT_VECTOR_TILE_PATH;
    const terrainTilePath = mapConfig?.terrainTilePath ?? DEFAULT_TERRAIN_TILE_PATH;
    const maptilerStyleUrl = useMemo(
        () => buildApiUrl(apiBase, `/maptiler/json?path=${stylePath}`),
        [apiBase, stylePath],
    );
    const mapStyleUrl = mapConfig ? maptilerStyleUrl : FALLBACK_STYLE_URL;
    const maptilerVectorTiles = useMemo(
        () => buildApiUrl(apiBase, `/maptiler/tiles?path=${vectorTilePath}`),
        [apiBase, vectorTilePath],
    );
    const terrainUrl = useMemo(
        () => buildApiUrl(apiBase, `/maptiler/tiles?path=${terrainTilePath}`),
        [apiBase, terrainTilePath],
    );

    useEffect(() => {
        setMapGateTimerDone(false);
    }, [terrainUrl]);

    const rebuildTerrainSources = useCallback(
        (map: maplibregl.Map) => {
            map.setTerrain(null);

            if (map.getLayer("terrain-hillshade")) map.removeLayer("terrain-hillshade");
            if (map.getSource("terrain-dem")) map.removeSource("terrain-dem");

            map.addSource("terrain-dem", {
                type: "raster-dem",
                tiles: [terrainUrl],
                tileSize: 256,
                maxzoom: 14,
                encoding: "mapbox",
            } as any);

            map.setTerrain({ source: "terrain-dem", exaggeration: TERRAIN_EXAGGERATION });

            map.addLayer({
                id: "terrain-hillshade",
                type: "hillshade",
                source: "terrain-dem",
                paint: {
                    "hillshade-exaggeration": 0.7,
                    "hillshade-shadow-color": "#0f172a",
                    "hillshade-highlight-color": "#e2e8f0",
                },
            } as any);
        },
        [terrainUrl],
    );

    useEffect(() => {
        setDemReady(false);
        setMeshReady(false);
        setMapLoaded(false);
        setMapGateTimerDone(false);

        const map = mapRef.current;
        if (!map || !map.isStyleLoaded()) return;

        rebuildTerrainSources(map);
        map.once("idle", () => setMapLoaded(true));
    }, [rebuildTerrainSources]);

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
        origin: center ?? null,
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
            const proxied = buildApiUrl(
                apiBase,
                `/maptiler/${endpoint}?path=${u.pathname}${qs ? `&${qs}` : ""}`,
            );
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
                onTileLoad: () => setMeshReady(true),
                onTileError: () => null,
            }),
        );

        return layers;
    }, [terrainUrl]);

    useEffect(() => {
        if (meshReady) return;
        const timeout = setTimeout(() => setMeshReady(true), 2000);
        return () => clearTimeout(timeout);
    }, [meshReady, terrainUrl]);

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
        if (!session) return;
        if (mapRef.current) return;
        const initialCenter = initialCenterRef.current;
        if (!ref.current || !initialCenter || status !== "ready") return;

        const map = new maplibregl.Map({
            container: ref.current,
            style: mapStyleUrl,
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

        const bump = () => {
            setMapFrame((n) => n + 1);
        };

        const loadFallback = setTimeout(() => setMapLoaded(true), 3200);

        map.once("styledata", () => {
            setMapLoaded(true);
        });

        map.on("load", () => {
            setMapLoaded(true);
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

            rebuildTerrainSources(map);

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
        map.on("zoom", () => { sync(); bump(); });
        map.on("rotate", () => { sync(); bump(); });
        map.on("pitch", () => { sync(); bump(); });
        map.on("render", bump);
        registerMap(map);

        return () => {
            clearTimeout(loadFallback);
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
        mapStyleUrl,
        maptilerVectorTiles,
        pickPoiAndFetch,
        proxiedMaptilerRequest,
        readonly,
        registerMap,
        rebuildTerrainSources,
        setCenterFromMap,
        setViewport,
        status,
        terrainUrl,
        updateView,
    ]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map || !map.isStyleLoaded()) return;

        const checkReady = () => {
            const dem = map.getSource("terrain-dem") as any;
            const shade = map.getSource("terrain-dem-hillshade") as any;
            if (dem?.loaded?.() && shade?.loaded?.()) {
                setDemReady(true);
                return;
            }
            if (map.isSourceLoaded("terrain-dem") && map.isSourceLoaded("terrain-dem-hillshade")) {
                setDemReady(true);
            }
        };

        const handleSourceData = (ev: MapSourceDataEvent) => {
            if (ev.sourceId === "terrain-dem" || ev.sourceId === "terrain-dem-hillshade") {
                checkReady();
            }
        };

        const handleData = (ev: maplibregl.MapDataEvent & { sourceId?: string }) => {
            const sid = ev.sourceId;
            if (sid === "terrain-dem" || sid === "terrain-dem-hillshade") {
                checkReady();
            }
        };

        checkReady();
        map.on("sourcedata", handleSourceData);
        map.on("data", handleData);
        map.once("idle", checkReady);

        return () => {
            map.off("sourcedata", handleSourceData);
            map.off("data", handleData);
        };
    }, [mapLoaded, terrainUrl]);

    useEffect(() => {
        if (demReady) return;
        const fallback = setTimeout(() => setDemReady(true), 2500);
        return () => clearTimeout(fallback);
    }, [demReady, terrainUrl]);

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

    const loadSteps = [
        { key: "map", label: "Map style", done: mapLoaded },
        { key: "dem", label: "Terrain DEM", done: demReady },
        { key: "mesh", label: "3D surface", done: meshReady },
    ];
    const readyProgress = Math.round((loadSteps.filter((step) => step.done).length / loadSteps.length) * 100);
    const mapReady = mapLoaded && (terrainReady || mapGateTimerDone);
    const showPreparingOverlay = Boolean(session) && !mapReady;
    const showTilesBrokenDialog = Boolean(session);

    const prewarmedRef = useRef<Record<string, boolean>>({});
    const prewarmTiles = useDebouncedCallback(async () => {
        if (!mapRef.current || !session?.accessToken) return;
        const map = mapRef.current;
        const z = Math.max(0, Math.floor(map.getZoom()));
        const center = map.getCenter();
        const layers = [
            { path: "/tiles/v3/{z}/{x}/{y}.pbf", zoom: Math.max(0, z - 1) },
            { path: "/tiles/terrain-rgb-v2/{z}/{x}/{y}.png", zoom: Math.max(0, z - 1) },
            { path: "/tiles/satellite-v2/{z}/{x}/{y}.jpg", zoom: z },
        ];

        const ops: any[] = [];

        for (const layer of layers) {
            const { x, y, z: layerZ } = tileXY(center.lng, center.lat, layer.zoom);
            const key = `${layer.path}:${layerZ}:${x}:${y}`;
            if (prewarmedRef.current[key]) continue;
            prewarmedRef.current[key] = true;

            for (let dx = -1; dx <= 1; dx += 1) {
                for (let dy = -1; dy <= 1; dy += 1) {
                    const tx = x + dx;
                    const ty = y + dy;
                    if (tx < 0 || ty < 0) continue;
                    ops.push({
                        id: `${layer.path}:${layerZ}:${tx}:${ty}`,
                        op: "maptiler.tile",
                        path: layer.path.replace("{z}", String(layerZ)).replace("{x}", String(tx)).replace("{y}", String(ty)),
                        maxAgeMinutes: 720,
                    });
                }
            }
        }

        // Add common font glyphs once
        if (!prewarmedRef.current["font:NotoSans0-255"]) {
            prewarmedRef.current["font:NotoSans0-255"] = true;
            ops.push({ id: "font:NotoSans0-255", op: "maptiler.tile", path: "/fonts/Noto Sans Regular/0-255.pbf", maxAgeMinutes: 1440 });
        }

        if (!ops.length) return;

        try {
            await fetch(buildApiUrl(apiBase, "/api/batch"), {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ ops, warmOnly: true }),
            });
        } catch {
            // ignore prewarm errors
        }
    }, 1500);

    useEffect(() => {
        if (!mapLoaded) {
            setMapGateTimerDone(false);
            return;
        }
        const gate = setTimeout(() => setMapGateTimerDone(true), 1500);
        return () => clearTimeout(gate);
    }, [mapLoaded, terrainReady]);

    useEffect(() => {
        if (!mapReady) return;
        prewarmTiles();
    }, [mapReady, prewarmTiles]);

    if (!session) {
        return <StarfieldBackground />;
    }

    if (status === "blocked" || status === "error") {
        return <MapStatusOverlay state="blocked" />;
    }

    if (status !== "ready" || !center) {
        return <MapStatusOverlay state="requesting" />;
    }

    return (
        <>
            <div ref={ref} className="absolute inset-0 z-0" />
            {showTilesBrokenDialog ? (
                <div className="pointer-events-none absolute left-1/2 top-1/2 z-50 w-[520px] max-w-[calc(100%-48px)] -translate-x-1/2 -translate-y-1/2">
                    <div className="space-y-4 rounded-2xl border border-rose-400/40 bg-slate-900/95 p-6 text-white shadow-2xl">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/20 text-rose-200">
                                <span className="text-2xl">⚠️</span>
                            </div>
                            <div>
                                <p className="text-sm uppercase tracking-[0.24em] text-rose-200/80">Map outage</p>
                                <h2 className="text-2xl font-semibold text-white">Map tiles are currently broken</h2>
                            </div>
                        </div>
                        <p className="text-base text-white/80">
                            We’re in the middle of a backend refactor and tiles are not rendering. Please come back later.
                        </p>
                    </div>
                </div>
            ) : null}
            {showPreparingOverlay ? (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm">
                    <div className="w-80 max-w-[calc(100%-48px)] space-y-3 rounded-xl border border-white/10 bg-slate-900/80 p-4 text-white shadow-2xl">
                        <div className="flex items-center justify-between text-xs uppercase tracking-[0.08em] text-white/60">
                            <span>Preparing terrain</span>
                            <span>{readyProgress}%</span>
                        </div>
                        <div className="space-y-2">
                            {loadSteps.map((step) => (
                                <div key={step.key} className="space-y-1">
                                    <div className="flex items-center justify-between text-xs text-white/70">
                                        <span>{step.label}</span>
                                        <span className={step.done ? "text-emerald-300" : "text-white/60"}>
                                            {step.done ? "ready" : "loading"}
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                                        <div
                                            className={`${step.done ? "bg-emerald-400" : "bg-sky-400"} h-full rounded-full transition-all duration-500 ${step.done ? "" : "animate-pulse"}`}
                                            style={{ width: step.done ? "100%" : "32%" }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}
            {!readonly ? (
                <div className="pointer-events-none absolute right-3 top-20 z-40 flex flex-col items-end gap-3">
                    <div className="pointer-events-auto w-80 max-w-[calc(100%-24px)] space-y-2">
                        <LocationOverview />
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
            {!readonly ? (
                <MapPinsOverlay
                    map={mapRef.current}
                    pois={poiPinsVisual}
                    frame={mapFrame}
                    loading={poiStatus === "loading"}
                />
            ) : null}
            {!readonly ? <MapLocateButton onClick={() => requestLocation({ force: true })} /> : null}
        </>
    );
}