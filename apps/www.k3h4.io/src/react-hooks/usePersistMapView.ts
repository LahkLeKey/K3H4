import { useEffect } from "react";

type View = {
    center: { lat: number; lng: number };
    zoom: number;
    bearing: number;
    pitch: number;
    ready: boolean;
};

export function usePersistMapView(
    apiBase: string,
    accessToken: string | null | undefined,
    signOut: () => void,
    view: View,
) {
    useEffect(() => {
        if (!accessToken || !view.ready) return;
        const handle = setTimeout(() => {
            void fetch(`${apiBase}/geo/prefs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: "include",
                body: JSON.stringify({ center: view.center, view: { zoom: view.zoom, bearing: view.bearing, pitch: view.pitch } }),
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
    }, [accessToken, apiBase, signOut, view]);
}