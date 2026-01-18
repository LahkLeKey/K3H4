import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";

import { AtlasScene } from "../r3f-components/AtlasScene.tsx";
import { AuthenticatedScene } from "../r3f-components/AuthenticatedScene.tsx";
import { AtlasExperience } from "../radix-components/AtlasExperience.tsx";
import { CallbackScreen } from "../radix-components/auth/CallbackScreen.tsx";
import { LoginMenu } from "../radix-components/auth/LoginMenu.tsx";
import { MapLayer } from "./MapLayer.tsx";
import { useAtlasState } from "../react-hooks/atlas";
import { useAuthStore } from "../react-hooks/auth";
import { useAuthOverlay } from "../react-hooks/useAuthOverlay";
import { MapViewProvider } from "../react-hooks/useMapView";
import { GeoRouteProvider } from "../react-hooks/useGeoRoute";

export function AppShell() {
    const { session } = useAuthStore();
    const view = useAuthOverlay();
    const { hydrate } = useAtlasState();

    useEffect(() => {
        if (session?.accessToken) {
            hydrate();
        }
    }, [session?.accessToken, hydrate]);
    const overlay = view === "callback" ? <CallbackScreen /> : session ? <AtlasExperience /> : <LoginMenu />;
    const scene = session ? <AuthenticatedScene /> : <AtlasScene />;

    return (
        <MapViewProvider>
            <GeoRouteProvider>
                <div className="relative h-screen w-screen overflow-hidden bg-slate-950">
                    <MapLayer />
                    <Canvas
                        shadows
                        dpr={[1, 1.8]}
                        className="absolute inset-0 h-full w-full"
                        gl={{ antialias: true, alpha: true }}
                        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
                    >
                        {scene}
                    </Canvas>
                    <div className="pointer-events-auto absolute inset-0 z-40">{overlay}</div>
                </div>
            </GeoRouteProvider>
        </MapViewProvider>
    );
}
