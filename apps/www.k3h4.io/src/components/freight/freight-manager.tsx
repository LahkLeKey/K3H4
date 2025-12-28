import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import {
    useCompleteFreightMutation,
    useCreateFreightMutation,
    useFreightLoadsQuery,
    type FreightLoad,
} from "../../hooks/use-freight-queries";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export type FreightManagerProps = {
    apiBase: string;
    userEmail: string | null;
};

const defaultOrigin = { name: "NYC", lat: 40.7128, lng: -74.006 };
const defaultDestination = { name: "Chicago", lat: 41.8781, lng: -87.6298 };
type Target = "origin" | "destination";

export function FreightManager({ apiBase, userEmail }: FreightManagerProps) {
    const loadsQuery = useFreightLoadsQuery(apiBase);
    const createLoad = useCreateFreightMutation(apiBase);
    const completeLoad = useCompleteFreightMutation(apiBase);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapLoaded = useRef(false);
    const originMarker = useRef<maplibregl.Marker | null>(null);
    const destinationMarker = useRef<maplibregl.Marker | null>(null);
    const routeLayerAdded = useRef(false);
    const [selectedLoadId, setSelectedLoadId] = useState<string | null>(null);
    const [showCompleted, setShowCompleted] = useState(false);
    const [form, setForm] = useState({
        title: "Hotshot lane",
        originName: defaultOrigin.name,
        originLat: String(defaultOrigin.lat),
        originLng: String(defaultOrigin.lng),
        destinationName: defaultDestination.name,
        destinationLat: String(defaultDestination.lat),
        destinationLng: String(defaultDestination.lng),
        ratePerKm: "2",
    });
    const [inlineError, setInlineError] = useState<string>("");

    const filteredLoads = useMemo(() => {
        const list = loadsQuery.data ?? [];
        return showCompleted ? list : list.filter((l) => l.status !== "completed");
    }, [loadsQuery.data, showCompleted]);

    const selectedLoad = useMemo(() => {
        const found = filteredLoads.find((l) => l.id === selectedLoadId);
        if (found) return found;
        return filteredLoads[0] ?? null;
    }, [filteredLoads, selectedLoadId]);

    const activeRoute = useMemo(() => selectedLoad?.routeGeoJson ?? null, [selectedLoad]);

    const syncFormFromLoad = (load: FreightLoad | null) => {
        if (!load) return;
        setForm((prev) => ({
            ...prev,
            originName: load.originName,
            originLat: String(load.originLat),
            originLng: String(load.originLng),
            destinationName: load.destinationName,
            destinationLat: String(load.destinationLat),
            destinationLng: String(load.destinationLng),
        }));
    };

    // initialize map once, center on geolocation if available
    useEffect(() => {
        if (mapRef.current || !mapContainerRef.current) return;
        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: "https://demotiles.maplibre.org/style.json",
            center: [defaultOrigin.lng, defaultOrigin.lat],
            zoom: 3.5,
        });
        mapRef.current = map;

        map.getCanvas().addEventListener("contextmenu", (event) => event.preventDefault());
        map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-left");

        const handleResize = () => map.resize();

        map.on("load", () => {
            mapLoaded.current = true;
            map.resize();
            placeMarkers();
            renderRoute();
        });
        map.on("style.load", () => {
            map.resize();
            placeMarkers();
            renderRoute();
        });
        map.on("contextmenu", (e) => openContextMenu(e.lngLat));
        window.addEventListener("resize", handleResize);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    map.setCenter([longitude, latitude]);
                    map.setZoom(9);
                },
                () => undefined,
                { enableHighAccuracy: true, timeout: 3000 }
            );
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            map.remove();
            mapRef.current = null;
        };
    }, []);

    const placeMarkers = () => {
        if (!mapRef.current) return;
        const map = mapRef.current;
        const originLng = selectedLoad ? selectedLoad.originLng : Number(form.originLng);
        const originLat = selectedLoad ? selectedLoad.originLat : Number(form.originLat);
        const destLng = selectedLoad ? selectedLoad.destinationLng : Number(form.destinationLng);
        const destLat = selectedLoad ? selectedLoad.destinationLat : Number(form.destinationLat);
        const origin = [originLng, originLat] as [number, number];
        const dest = [destLng, destLat] as [number, number];

        if (!originMarker.current) {
            originMarker.current = new maplibregl.Marker({ color: "#10b981", scale: 1.25 }).setLngLat(origin).addTo(map);
        } else {
            originMarker.current.setLngLat(origin);
        }
        if (!destinationMarker.current) {
            destinationMarker.current = new maplibregl.Marker({ color: "#f97316", scale: 1.25 }).setLngLat(dest).addTo(map);
        } else {
            destinationMarker.current.setLngLat(dest);
        }
    };

    const renderRoute = () => {
        if (!mapRef.current || !mapLoaded.current) return;
        const map = mapRef.current;

        if (!activeRoute) {
            if (map.getLayer("freight-route-line")) map.removeLayer("freight-route-line");
            if (map.getSource("freight-route")) map.removeSource("freight-route");
            routeLayerAdded.current = false;
            return;
        }

        // Wait for style before adding sources/layers to avoid duplicate-source errors
        if (!map.isStyleLoaded()) {
            map.once("style.load", renderRoute);
            return;
        }

        if (map.getLayer("freight-route-line")) map.removeLayer("freight-route-line");
        if (map.getSource("freight-route")) map.removeSource("freight-route");
        routeLayerAdded.current = false;

        map.addSource("freight-route", {
            type: "geojson",
            data: { type: "Feature", geometry: activeRoute, properties: {} },
        });

        map.addLayer({
            id: "freight-route-line",
            source: "freight-route",
            type: "line",
            paint: {
                "line-color": "#0ea5e9",
                "line-width": 4,
            },
        });
        routeLayerAdded.current = true;
        const coords = activeRoute.coordinates as any[];
        if (coords?.length) {
            const bounds = new maplibregl.LngLatBounds(coords[0], coords[0]);
            coords.forEach((c: [number, number]) => bounds.extend(c));
            map.fitBounds(bounds, { padding: 40, maxZoom: 12 });
        }
    };

    useEffect(() => {
        placeMarkers();
        renderRoute();
    }, [activeRoute, form.originLat, form.originLng, form.destinationLat, form.destinationLng, selectedLoad]);

    useEffect(() => {
        if (!selectedLoad && filteredLoads.length) {
            setSelectedLoadId(filteredLoads[0].id);
            syncFormFromLoad(filteredLoads[0]);
        }
        if (selectedLoad && filteredLoads.length && !filteredLoads.find((l) => l.id === selectedLoad.id)) {
            setSelectedLoadId(filteredLoads[0].id);
            syncFormFromLoad(filteredLoads[0]);
        }
        if (!filteredLoads.length) {
            setSelectedLoadId(null);
        }
    }, [filteredLoads, selectedLoad]);

    const fitSelectedRoute = () => {
        if (!mapRef.current || !selectedLoad) return;
        const map = mapRef.current;
        const coords = (selectedLoad.routeGeoJson as any)?.coordinates as any[];
        if (coords?.length) {
            const bounds = new maplibregl.LngLatBounds(coords[0], coords[0]);
            coords.forEach((c: [number, number]) => bounds.extend(c));
            map.fitBounds(bounds, { padding: 48, maxZoom: 12 });
            return;
        }
        const bounds = new maplibregl.LngLatBounds(
            [selectedLoad.originLng, selectedLoad.originLat],
            [selectedLoad.destinationLng, selectedLoad.destinationLat]
        );
        map.fitBounds(bounds, { padding: 48, maxZoom: 10 });
    };

    const fitAllRoutes = () => {
        if (!mapRef.current || !filteredLoads.length) return;
        const map = mapRef.current;
        const bounds = new maplibregl.LngLatBounds();
        filteredLoads.forEach((load) => {
            const coords = (load.routeGeoJson as any)?.coordinates as any[];
            if (coords?.length) {
                coords.forEach((c: [number, number]) => bounds.extend(c));
            } else {
                bounds.extend([load.originLng, load.originLat]);
                bounds.extend([load.destinationLng, load.destinationLat]);
            }
        });
        if (!bounds.isEmpty()) {
            map.fitBounds(bounds, { padding: 64, maxZoom: 9 });
        }
    };

    const handleSelectLoad = (load: FreightLoad) => {
        setSelectedLoadId(load.id);
        syncFormFromLoad(load);
        setInlineError("");
    };

    const setPoint = (which: Target, lngLat: maplibregl.LngLatLike) => {
        const toTuple = (value: maplibregl.LngLatLike): [number, number] => {
            if (Array.isArray(value)) return [value[0], value[1]];
            if ("lng" in value) return [value.lng, value.lat];
            if ("lon" in value) return [value.lon, value.lat];
            return [Number(form.originLng), Number(form.originLat)];
        };
        const [lng, lat] = toTuple(lngLat);
        setForm((prev) => ({
            ...prev,
            ...(which === "origin"
                ? { originLat: String(lat), originLng: String(lng), originName: prev.originName || "Origin" }
                : { destinationLat: String(lat), destinationLng: String(lng), destinationName: prev.destinationName || "Destination" }),
        }));
        setInlineError("");
    };

    const openContextMenu = (lngLat: maplibregl.LngLat) => {
        if (!mapRef.current) return;
        const container = document.createElement("div");
        container.className = "flex flex-col gap-2 text-sm";
        const originBtn = document.createElement("button");
        originBtn.className = "rounded border bg-white px-3 py-1 hover:bg-slate-50";
        originBtn.innerText = "Set origin here";
        originBtn.onclick = () => {
            setPoint("origin", lngLat);
            popup.remove();
        };
        const destBtn = document.createElement("button");
        destBtn.className = "rounded border bg-white px-3 py-1 hover:bg-slate-50";
        destBtn.innerText = "Set destination here";
        destBtn.onclick = () => {
            setPoint("destination", lngLat);
            popup.remove();
        };
        container.append(originBtn, destBtn);
        const popup = new maplibregl.Popup({ closeButton: true, closeOnMove: true, offset: 12, anchor: "bottom" })
            .setLngLat(lngLat)
            .setDOMContent(container)
            .addTo(mapRef.current);
    };

    const handleCreate = async () => {
        const parsed = {
            originLat: Number(form.originLat),
            originLng: Number(form.originLng),
            destinationLat: Number(form.destinationLat),
            destinationLng: Number(form.destinationLng),
            ratePerKm: Number(form.ratePerKm),
        };
        if (!Object.values(parsed).every((n) => Number.isFinite(n))) {
            setInlineError("Enter valid coordinates and rate");
            return;
        }
        if (!form.title.trim()) {
            setInlineError("Title is required");
            return;
        }
        setInlineError("");
        await createLoad.mutateAsync({
            title: form.title.trim(),
            originName: form.originName.trim() || "Origin",
            originLat: parsed.originLat,
            originLng: parsed.originLng,
            destinationName: form.destinationName.trim() || "Destination",
            destinationLat: parsed.destinationLat,
            destinationLng: parsed.destinationLng,
            ratePerKm: parsed.ratePerKm,
        });
        placeMarkers();
    };

    const handleComplete = async (load: FreightLoad) => {
        try {
            await completeLoad.mutateAsync({ id: load.id });
        } catch (err) {
            setInlineError(err instanceof Error ? err.message : "Unable to complete load");
        }
    };

    // trigger route render when data changes
    useMemo(renderRoute, [activeRoute]);

    return (
        <Card className="border bg-background/80">
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-lg">Freight manager</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Plan OSRM routes, price freight loads, and pay with k3h4-coins as {userEmail || "guest"}.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                    <Badge variant="secondary">Loads: {loadsQuery.data?.length ?? 0}</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-5">
                <div className="grid gap-3 sm:grid-cols-[repeat(3,minmax(0,1fr))]">
                    <div className="space-y-1">
                        <Label>Title</Label>
                        <Input value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} />
                    </div>
                    <div className="space-y-1">
                        <Label>Rate per km</Label>
                        <Input value={form.ratePerKm} inputMode="decimal" onChange={(e) => setForm((prev) => ({ ...prev, ratePerKm: e.target.value }))} />
                    </div>
                    <div className="flex items-end">
                        <Button className="w-full" onClick={handleCreate} disabled={createLoad.isPending}>
                            Create load
                        </Button>
                    </div>
                    <div className="space-y-1">
                        <Label>Origin name</Label>
                        <Input value={form.originName} onChange={(e) => setForm((prev) => ({ ...prev, originName: e.target.value }))} />
                    </div>
                    <div className="space-y-1">
                        <Label>Origin lat, lng</Label>
                        <div className="grid grid-cols-2 gap-2">
                            <Input value={form.originLat} inputMode="decimal" onChange={(e) => setForm((prev) => ({ ...prev, originLat: e.target.value }))} />
                            <Input value={form.originLng} inputMode="decimal" onChange={(e) => setForm((prev) => ({ ...prev, originLng: e.target.value }))} />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label>Destination name</Label>
                        <Input value={form.destinationName} onChange={(e) => setForm((prev) => ({ ...prev, destinationName: e.target.value }))} />
                    </div>
                    <div className="space-y-1">
                        <Label>Destination lat, lng</Label>
                        <div className="grid grid-cols-2 gap-2">
                            <Input value={form.destinationLat} inputMode="decimal" onChange={(e) => setForm((prev) => ({ ...prev, destinationLat: e.target.value }))} />
                            <Input value={form.destinationLng} inputMode="decimal" onChange={(e) => setForm((prev) => ({ ...prev, destinationLng: e.target.value }))} />
                        </div>
                    </div>
                </div>

                {inlineError ? <p className="text-sm text-destructive">{inlineError}</p> : null}
                {loadsQuery.isLoading ? <p className="text-sm text-muted-foreground">Loading freight loads...</p> : null}
                {loadsQuery.error ? <p className="text-sm text-destructive">{(loadsQuery.error as Error).message}</p> : null}

                <div className="relative h-96 w-full overflow-hidden rounded-lg border shadow-sm" style={{ isolation: "isolate" }}>
                    <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap gap-2">
                        <Button size="sm" variant="secondary" className="pointer-events-auto" onClick={fitSelectedRoute} disabled={!selectedLoad}>
                            Fit selected
                        </Button>
                        <Button size="sm" variant="secondary" className="pointer-events-auto" onClick={fitAllRoutes} disabled={!filteredLoads.length}>
                            Fit all
                        </Button>
                        <Button
                            size="sm"
                            variant={showCompleted ? "secondary" : "ghost"}
                            className="pointer-events-auto"
                            onClick={() => setShowCompleted((v) => !v)}
                        >
                            {showCompleted ? "Showing completed" : "Show completed"}
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="pointer-events-auto"
                            onClick={() => {
                                setSelectedLoadId(null);
                                setInlineError("");
                            }}
                        >
                            New load
                        </Button>
                    </div>
                    <div ref={mapContainerRef} className="absolute inset-0" />
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Route</TableHead>
                            <TableHead className="text-right">Distance</TableHead>
                            <TableHead className="text-right">Cost</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredLoads.map((load) => {
                            const isSelected = load.id === selectedLoad?.id;
                            return (
                                <TableRow key={load.id} className={isSelected ? "bg-muted/40" : "cursor-pointer"} onClick={() => handleSelectLoad(load)}>
                                    <TableCell>
                                        <div className="font-semibold leading-tight">{load.title}</div>
                                        <div className="text-xs text-muted-foreground">{load.createdAt ? new Date(load.createdAt).toLocaleString() : ""}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">{load.originName} → {load.destinationName}</div>
                                        <div className="text-xs text-muted-foreground">~{load.durationMinutes} min ETA</div>
                                    </TableCell>
                                    <TableCell className="text-right font-mono">{Number(load.distanceKm).toFixed(2)} km</TableCell>
                                    <TableCell className="text-right font-mono">{Number(load.cost).toFixed(2)} k3h4c</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Badge variant={load.status === "completed" ? "secondary" : "outline"}>{load.status}</Badge>
                                            {load.status !== "completed" ? (
                                                <Button size="sm" onClick={() => handleComplete(load)} disabled={completeLoad.isPending}>
                                                    Mark delivered
                                                </Button>
                                            ) : null}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {filteredLoads.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-sm text-muted-foreground">
                                    No freight loads yet. Create one above.
                                </TableCell>
                            </TableRow>
                        ) : null}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
