import { Canvas } from "@react-three/fiber";

import { MapLayer } from "./MapLayer";
import { MapViewProvider } from "../react-hooks/useMapView";
import { AuthenticatedScene } from "../r3f-components/AuthenticatedScene";

export function AppShell() {
    return (
        <MapViewProvider>
            <div className="relative h-screen w-screen overflow-hidden bg-slate-950">
                <MapLayer />
                <Canvas
                    shadows
                    dpr={[1, 1.8]}
                    className="absolute inset-0 h-full w-full"
                    style={{ pointerEvents: "none" }}
                    gl={{ antialias: true, alpha: true }}
                    onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
                >
                    <AuthenticatedScene />
                </Canvas>
            </div>
        </MapViewProvider>
    );
}
