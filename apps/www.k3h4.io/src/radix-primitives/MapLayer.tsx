import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import maplibregl, { type RequestParameters, type ResourceType } from "maplibre-gl";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { TerrainLayer, MVTLayer } from "@deck.gl/geo-layers";
import { GeoJsonLayer } from "@deck.gl/layers";
import { FillStyleExtension, PathStyleExtension } from "@deck.gl/extensions";

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

const patternAtlas = (() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 128;
    c.height = 128;
    const g = c.getContext("2d");
    if (!g) return null;

    g.fillStyle = "black";
    g.fillRect(0, 0, 128, 128);
    g.strokeStyle = "white";
    g.lineWidth = 4;
    for (let y = 0; y < 128; y += 22) {
        for (let x = 0; x < 128; x += 22) {
            g.beginPath();
            g.moveTo(x, y);
            g.lineTo(x + 11, y + 18);
            g.lineTo(x + 22, y);
            g.closePath();
            g.stroke();
        }
    }

    return {
        atlas: c.toDataURL("image/png"),
        mapping: { tri: { x: 0, y: 0, width: 128, height: 128, mask: true } },
    } as const;
})();

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
        // Primary DEM: self-hosted raster-dem
        () => `${apiBase}/geo/dem/{z}/{x}/{y}.png`,
        [apiBase],
    );
    const maptilerVectorTiles = useMemo(
        () => `${apiBase}/maptiler/tiles?path=/tiles/v3/{z}/{x}/{y}.pbf`,
        [apiBase],
    );
    const maptilerStyleUrl = useMemo(() => `${apiBase}/maptiler/json?path=${MAPTILER_STYLE_PATH}`, [apiBase]);

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

        layers.push(
            new MVTLayer({
                id: "mvt-stylized",
                data: [maptilerVectorTiles],
                loadOptions: {
                    fetch: async (url: string, options?: RequestInit) => {
                        const res = await fetch(url, options);
                        if (res.ok) return res;
                        // Fall back to an empty tile so deck.gl continues without spamming errors
                        return new Response(new Uint8Array(), { status: 200, statusText: "empty" });
                    },
                },
                renderSubLayers: (props: any) =>
                    new GeoJsonLayer(props, {
                        id: `${props.id}-geo`,
                        extensions: [new FillStyleExtension({ pattern: true }), new PathStyleExtension({ dash: true })],
                        filled: true,
                        fillPatternAtlas: patternAtlas?.atlas,
                        fillPatternMapping: patternAtlas?.mapping,
                        fillPatternMask: true,
                        getFillPatternScale: () => 1,
                        getFillPatternOffset: () => [0, 0],
                        getFillPattern: (f: any) => {
                            const ln = f.properties?.layerName;
                            // Disable water patterns to avoid distant tiling artifacts
                            if (ln === "water") return null;
                            // Disable building patterns entirely to avoid distant white boxes
                            return null;
                        },
                        getFillColor: (f: any) => {
                            const ln = f.properties?.layerName;
                            if (ln === "water") return [0, 0, 0, 0];
                            if (ln === "building") return [0, 0, 0, 0];
                            return [0, 0, 0, 0];
                        },
                        stroked: true,
                        lineWidthUnits: "pixels",
                        getLineWidth: (f: any) => {
                            const ln = f.properties?.layerName;
                            const cls = f.properties?.class;
                            if (ln === "waterway") return 2.5;
                            if (ln === "transportation" && (cls === "motorway" || cls === "trunk")) return 5.5;
                            if (ln === "transportation") return 2.0;
                            if (ln === "building") return 0;
                            return 0;
                        },
                        getLineColor: (f: any) => {
                            const ln = f.properties?.layerName;
                            const cls = f.properties?.class;
                            if (ln === "waterway") return [90, 150, 210, 240];
                            if (ln === "transportation" && (cls === "motorway" || cls === "trunk")) return [255, 210, 130, 255];
                            if (ln === "transportation") return [160, 160, 160, 230];
                            if (ln === "building") return [0, 0, 0, 0];
                            return [0, 0, 0, 0];
                        },
                        getDashArray: (f: any) => {
                            const ln = f.properties?.layerName;
                            const cls = f.properties?.class;
                            if (ln === "waterway") return [2.2, 1.6];
                            if (ln === "transportation" && (cls === "motorway" || cls === "trunk")) return [5.0, 2.0];
                            if (ln === "transportation" && (cls === "path" || cls === "track")) return [0.6, 1.4];
                            if (ln === "building") return [0, 0];
                            return [0, 0];
                        },
                    }),
            }),
        );

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
                const sid = ev?.sourceId;
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
        registerMap,
        terrainUrl,
        updateView,
        status,
        maptilerStyleUrl,
        maptilerVectorTiles,
        proxiedMaptilerRequest,
        readonly,
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
            {poiStatus === "error" && !readonly ? (
                <div className="pointer-events-none absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full bg-slate-900/85 px-4 py-2 text-xs font-semibold text-white shadow-lg">
                    poi fetch failed
                    {poiError ? <span className="ml-2 text-[11px] font-normal text-amber-200/80">{poiError}</span> : null}
                </div>
            ) : null}
            {!readonly ? <MapPinsOverlay map={mapRef.current} pois={poiList} frame={mapFrame} /> : null}
            {!readonly ? <LocationOverview /> : null}
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
