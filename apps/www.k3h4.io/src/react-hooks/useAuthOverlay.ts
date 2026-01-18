import { useMemo } from "react";

export type AuthOverlayView = "login" | "callback";

// Chooses which auth overlay to render based on the current path.
export function useAuthOverlay(): AuthOverlayView {
    return useMemo(() => {
        if (typeof window === "undefined") return "login";
        return window.location.pathname.startsWith("/auth/callback") ? "callback" : "login";
    }, []);
}
