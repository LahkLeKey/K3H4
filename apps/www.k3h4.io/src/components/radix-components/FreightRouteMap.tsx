import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import type { Feature, FeatureCollection, Geometry, Point } from "geojson";

import type { FreightDirection } from "../../react-hooks/freight-directions";

const MAP_STYLE = "https://demotiles.maplibre.org/style.json";
const DEFAULT_CENTER = { lat: 38.0, lng: -95.0 };

type FreightRouteMapProps = {
    direction?: FreightDirection | null;
    placeholderCenter?: { lat: number; lng: number };
    className?: string;
    isLoading?: boolean;
};

type StopProperties = {
    role: string;
    label: string | null;
    sequence: number;
};

export function FreightRouteMap({ direction, placeholderCenter, className = "", isLoading = false }: FreightRouteMapProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const [ready, setReady] = useState(false);
    const initialCenter = useMemo(() => placeholderCenter ?? DEFAULT_CENTER, [placeholderCenter]);
    const initialCenterRef = useRef(initialCenter);

    useEffect(() => {
        if (!containerRef.current) return;
        const map = new maplibregl.Map({
            container: containerRef.current,
            style: MAP_STYLE,
            center: [initialCenterRef.current.lng, initialCenterRef.current.lat],
            zoom: 4.8,
            minZoom: 2,
            maxZoom: 16,
            dragRotate: false,
            pitchWithRotate: false,
            maxPitch: 0,
            interactive: true,
            attributionControl: false,
            renderWorldCopies: false,
        });
        mapRef.current = map;

        map.on("load", () => {
            if (!map.getSource("freight-route")) {
                map.addSource("freight-route", {
                    type: "geojson",
                    data: { type: "FeatureCollection", features: [] },
                });
            }
            if (!map.getLayer("freight-route-line")) {
                map.addLayer({
                    id: "freight-route-line",
                    type: "line",
                    source: "freight-route",
                    layout: { "line-join": "round", "line-cap": "round" },
                    paint: {
                        "line-color": "#34d399",
                        "line-width": 4,
                        "line-opacity": 0.8,
                    },
                });
            }
            if (!map.getSource("freight-route-stops")) {
                map.addSource("freight-route-stops", {
                    type: "geojson",
                    data: { type: "FeatureCollection", features: [] },
                });
            }
            if (!map.getLayer("freight-route-stops")) {
                map.addLayer({
                    id: "freight-route-stops",
                    type: "circle",
                    source: "freight-route-stops",
                    paint: {
                        "circle-stroke-width": 2,
                        "circle-stroke-color": "#000",
                        "circle-color": [
                            "match",
                            ["get", "role"],
                            "origin",
                            "#22d3ee",
                            "destination",
                            "#fbbf24",
                            "#fafafa",
                        ],
                        "circle-opacity": 0.95,
                        "circle-radius": ["interpolate", ["linear"], ["zoom"], 4, 4, 9, 6],
                    },
                });
            }
            map.addControl(new maplibregl.NavigationControl({ showCompass: false, visualizePitch: false }), "bottom-right");
            setReady(true);
        });

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    useEffect(() => {
        const map = mapRef.current;
        if (!map || !ready) return;

        const routeSource = map.getSource("freight-route") as maplibregl.GeoJSONSource | null;
        const stopSource = map.getSource("freight-route-stops") as maplibregl.GeoJSONSource | null;
        const emptyCollection: FeatureCollection = { type: "FeatureCollection", features: [] };

        const geometry = direction?.geometry as Geometry | undefined;
        const routeData: FeatureCollection = geometry
            ? {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        geometry,
                        properties: null,
                    },
                ],
            }
            : emptyCollection;

        routeSource?.setData(routeData);

        const stopFeatures: Feature<Point, StopProperties>[] =
            direction?.stops?.map((stop) => ({
                type: "Feature",
                geometry: { type: "Point", coordinates: [stop.longitude, stop.latitude] },
                properties: {
                    role: stop.metadata?.role ?? (stop.sequence === 0 ? "origin" : stop.sequence === 1 ? "destination" : "stop"),
                    label: stop.label,
                    sequence: stop.sequence,
                },
            })) ?? [];
        stopSource?.setData({ type: "FeatureCollection", features: stopFeatures });

        const polylineCoords = (() => {
            if (!geometry) return [] as Array<[number, number]>;
            if (geometry.type === "LineString") return geometry.coordinates as Array<[number, number]>;
            if (geometry.type === "MultiLineString") {
                return (geometry.coordinates as Array<Array<[number, number]>>).flat();
            }
            return [] as Array<[number, number]>;
        })();

        if (polylineCoords.length > 1) {
            const bounds = polylineCoords.reduce(
                (acc, [lng, lat]) => {
                    return {
                        minLng: Math.min(acc.minLng, lng),
                        minLat: Math.min(acc.minLat, lat),
                        maxLng: Math.max(acc.maxLng, lng),
                        maxLat: Math.max(acc.maxLat, lat),
                    };
                },
                {
                    minLng: polylineCoords[0][0],
                    minLat: polylineCoords[0][1],
                    maxLng: polylineCoords[0][0],
                    maxLat: polylineCoords[0][1],
                },
            );
            map.fitBounds([
                [bounds.minLng, bounds.minLat],
                [bounds.maxLng, bounds.maxLat],
            ],
                {
                    padding: 40,
                    maxZoom: 14,
                    duration: 450,
                    linear: true,
                });
        } else if (direction) {
            const center: [number, number] =
                direction.originLat != null && direction.originLng != null
                    ? [direction.originLng, direction.originLat]
                    : [initialCenterRef.current.lng, initialCenterRef.current.lat];
            map.flyTo({ center, zoom: 10, duration: 450 });
        }
    }, [direction, ready]);

    const mapClasses = `${className} relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-xl`;

    return (
        <div className={mapClasses}>
            <div ref={containerRef} className="h-full w-full" />
            {isLoading ? (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/80 text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
                    refreshing route
                </div>
            ) : null}
        </div>
    );
}