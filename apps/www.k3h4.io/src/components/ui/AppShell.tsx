import { useEffect, useRef, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { MapLayer } from "@/radix-components/MapLayer";
import { MapViewProvider } from "@/react-hooks/useMapView";
import { UiErrorBoundary } from "./UiErrorBoundary";
import { PageHeader } from "@/radix-components/PageHeader";
import { useAuthStore } from "@/react-hooks/auth";
import { useAuthOverlay } from "@/react-hooks/useAuthOverlay";
import { LoginMenu } from "@/radix-components/auth/LoginMenu";
import { CallbackScreen } from "@/radix-components/auth/CallbackScreen";
import { useGeoState } from "@/zustand-stores/geo";
import { useMapView } from "@/react-hooks/useMapView";
import { SessionPanel } from "@/radix-components/auth/SessionPanel";
import { primeHistoryCache, usePoiStore } from "@/zustand-stores/poi";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const radiusFromZoom = (zoom: number | null | undefined) => {
    const z = Number.isFinite(zoom) ? (zoom as number) : 14;
    // Rough meters-per-pixel heuristic for Web Mercator; keeps initial radius reasonable
    const metersPerPixel = 156543.03392 * Math.cos((44.7434 * Math.PI) / 180) / Math.pow(2, z);
    return clamp(metersPerPixel * 200, 500, 4500);
};

const bboxFromCenterRadius = (center: { lat: number; lng: number }, radiusM: number) => {
    const latDelta = radiusM / 111_320;
    const lngDelta = radiusM / (111_320 * Math.cos((center.lat * Math.PI) / 180) || 1);
    return {
        minLat: center.lat - latDelta,
        minLng: center.lng - lngDelta,
        maxLat: center.lat + latDelta,
        maxLng: center.lng + lngDelta,
    };
};

function GeoPrefsHydrator() {
    const { apiBase, session, signOut } = useAuthStore();
    const { hydrateFromPrefs } = useGeoState();
    const { updateView, view } = useMapView();
    const { bbox, zoom, kinds, setViewport } = usePoiStore();
    const queryClient = useQueryClient();
    const requestedRef = useRef(false);

    useEffect(() => {
        if (!session?.accessToken || requestedRef.current) return;
        requestedRef.current = true;
        let aborted = false;

        const center = view?.center ?? { lat: 44.7434, lng: -92.8512 };
        const radiusFromViewport = (() => {
            if (!bbox) return null;
            const latMeters = Math.abs(bbox.maxLat - bbox.minLat) * 111_320 * 0.5;
            const lngMeters = Math.abs(bbox.maxLng - bbox.minLng) * 111_320 * Math.cos((center.lat * Math.PI) / 180) * 0.5;
            return Math.max(latMeters, lngMeters);
        })();

        const radiusM = clamp(radiusFromViewport ?? radiusFromZoom(zoom ?? view?.zoom ?? null), 500, 4500);
        const viewport = center
            ? {
                center,
                radiusM,
                kinds,
            }
            : undefined;

        const load = async () => {
            try {
                const res = await fetch(`${apiBase}/frontend/map/bootstrap`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ includePrefs: true, includeHistory: true, includeMap: true, viewport }),
                });
                if (res.status === 401) {
                    signOut();
                    return;
                }
                if (!res.ok) return;
                const data = await res.json();
                if (aborted) return;

                if (Array.isArray(data?.history)) {
                    primeHistoryCache(session.accessToken, data.history);
                }

                const viewResp = data?.prefs?.view ?? data?.view ?? null;
                const poiPref = data?.prefs?.poi ?? data?.poi ?? null;
                const viewportPois = data?.viewportPois ?? null;

                if (viewResp?.center) {
                    hydrateFromPrefs({ center: viewResp.center, pois: poiPref?.pois ?? null });
                    updateView({
                        center: viewResp.center,
                        zoom: viewResp.zoom ?? undefined,
                        bearing: viewResp.bearing ?? undefined,
                        pitch: viewResp.pitch ?? undefined,
                    });
                } else if (poiPref?.pois) {
                    hydrateFromPrefs({ center: null, pois: poiPref.pois });
                }

                if (viewportPois?.pois && center) {
                    const estimatedBbox = bboxFromCenterRadius(center, radiusM);
                    const roundedZoom = Math.round(zoom ?? view?.zoom ?? 14);
                    setViewport(estimatedBbox, roundedZoom);

                    const items = Array.isArray(viewportPois.pois)
                        ? viewportPois.pois.map((p: any) => ({
                            id: String(p.id ?? p.osmId ?? ""),
                            lat: Number(p.lat ?? p.latitude ?? 0),
                            lng: Number(p.lng ?? p.longitude ?? 0),
                            name: p.name ?? null,
                            category: p.category ?? null,
                            osmId: p.osmId ?? null,
                            osmType: p.osmType ?? null,
                        }))
                        : [];

                    if (items.length) {
                        const queryKey = [
                            "pois",
                            estimatedBbox.minLat,
                            estimatedBbox.minLng,
                            estimatedBbox.maxLat,
                            estimatedBbox.maxLng,
                            roundedZoom,
                            kinds.join(","),
                        ];

                        queryClient.setQueryData(queryKey, {
                            items,
                            total: items.length,
                            returned: items.length,
                            clustered: false,
                            bbox: estimatedBbox,
                            zoom: roundedZoom,
                        });
                    }
                }
            } catch (err) {
                console.warn("geo prefs load failed", err);
            }
        };

        void load();
        return () => {
            aborted = true;
        };
    }, [apiBase, session?.accessToken, hydrateFromPrefs, updateView, signOut, bbox, zoom, kinds, view, queryClient, setViewport]);

    return null;
}

type AppShellProps = {
    showNav?: boolean;
    background?: ReactNode;
    foreground?: ReactNode;
};

export function AppShell({ showNav = true, background, foreground }: AppShellProps) {
    const { session, signOut } = useAuthStore();
    const authView = useAuthOverlay();
    const shouldShowAuth = !session || (typeof window !== "undefined" && window.location.pathname.startsWith("/auth"));
    const { reset: resetGeo } = useGeoState();
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        if (!session) {
            resetGeo();
            setShowProfile(false);
        }
    }, [session, resetGeo]);

    return (
        <MapViewProvider>
            <div className="relative h-screen w-screen overflow-hidden bg-slate-950">
                {showNav && session ? (
                    <PageHeader
                        className="absolute inset-x-0 top-0 z-30"
                        rightSlot={(
                            <>
                                <button
                                    type="button"
                                    onClick={() => setShowProfile(true)}
                                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:-translate-y-[1px] hover:border-white/30 hover:bg-white/15 active:translate-y-0"
                                >
                                    Profile
                                </button>
                                <button
                                    type="button"
                                    onClick={signOut}
                                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:-translate-y-[1px] hover:border-white/30 hover:bg-white/15 active:translate-y-0"
                                >
                                    Sign out
                                </button>
                            </>
                        )}
                    />
                ) : null}
                <GeoPrefsHydrator />
                <UiErrorBoundary>
                    <div className="absolute inset-0">{background ?? <MapLayer readonly={shouldShowAuth} />}</div>
                </UiErrorBoundary>

                <div className={`relative z-10 h-full ${foreground ? "" : "pointer-events-none"}`}>
                    {foreground}
                </div>

                {session && showProfile ? (
                    <SessionPanel session={session} variant="overlay" onClose={() => setShowProfile(false)} />
                ) : null}
                {shouldShowAuth ? (authView === "callback" ? <CallbackScreen /> : <LoginMenu />) : null}
            </div>
        </MapViewProvider>
    );
}
