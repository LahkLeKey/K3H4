import { useEffect } from "react";

import { MapLayer } from "./MapLayer";
import { MapViewProvider } from "../react-hooks/useMapView";
import { UiErrorBoundary } from "./UiErrorBoundary";
import { useAuthStore } from "../react-hooks/auth";
import { useAuthOverlay } from "../react-hooks/useAuthOverlay";
import { LoginMenu } from "../radix-components/auth/LoginMenu";
import { CallbackScreen } from "../radix-components/auth/CallbackScreen";
import { useGeoState } from "../zustand-stores/geo";
import { useMapView } from "../react-hooks/useMapView";

function GeoPrefsHydrator() {
    const { apiBase, session } = useAuthStore();
    const { hydrateFromPrefs } = useGeoState();
    const { updateView } = useMapView();

    useEffect(() => {
        if (!session?.accessToken) return;
        let aborted = false;

        const load = async () => {
            try {
                const res = await fetch(`${apiBase}/geo/prefs`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${session.accessToken}` },
                    credentials: "include",
                });
                if (!res.ok) return;
                const data = await res.json();
                if (aborted) return;

                if (data?.view?.center) {
                    hydrateFromPrefs({ center: data.view.center, pois: data?.poi?.pois ?? null });
                    updateView({
                        center: data.view.center,
                        zoom: data.view.zoom ?? undefined,
                        bearing: data.view.bearing ?? undefined,
                        pitch: data.view.pitch ?? undefined,
                    });
                } else if (data?.poi?.pois) {
                    hydrateFromPrefs({ center: null, pois: data.poi.pois });
                }
            } catch (err) {
                console.warn("geo prefs load failed", err);
            }
        };

        void load();
        return () => {
            aborted = true;
        };
    }, [apiBase, session?.accessToken, hydrateFromPrefs, updateView]);

    return null;
}

export function AppShell() {
    const { session, signOut } = useAuthStore();
    const authView = useAuthOverlay();
    const shouldShowAuth = !session || (typeof window !== "undefined" && window.location.pathname.startsWith("/auth"));

    return (
        <MapViewProvider>
            <div className="relative h-screen w-screen overflow-hidden bg-slate-950">
                <div className="pointer-events-auto absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-3 bg-slate-950/85 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur">
                    <div className="flex items-center gap-2">
                        <div className="rounded bg-emerald-500/20 px-2 py-1 text-xs text-emerald-200">LIVE</div>
                        <div className="text-base tracking-tight text-white">K3H4 Atlas</div>
                    </div>
                    <button
                        type="button"
                        onClick={signOut}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:-translate-y-[1px] hover:border-white/30 hover:bg-white/15 active:translate-y-0"
                        disabled={!session}
                    >
                        {session ? "Sign out" : "Not signed in"}
                    </button>
                </div>
                <GeoPrefsHydrator />
                <UiErrorBoundary>
                    <MapLayer />
                </UiErrorBoundary>
                {shouldShowAuth ? (authView === "callback" ? <CallbackScreen /> : <LoginMenu />) : null}
            </div>
        </MapViewProvider>
    );
}
