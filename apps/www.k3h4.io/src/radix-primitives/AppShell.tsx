import { Canvas } from "@react-three/fiber";

import { MapLayer } from "./MapLayer";
import { MapViewProvider } from "../react-hooks/useMapView";
import { AuthenticatedScene } from "../r3f-components/AuthenticatedScene";
import { UiErrorBoundary } from "./UiErrorBoundary";
import { withR3FErrorBoundary } from "../r3f-components/withR3FErrorBoundary";
import { useAuthStore } from "../react-hooks/auth";
import { useAuthOverlay } from "../react-hooks/useAuthOverlay";
import { LoginMenu } from "../radix-components/auth/LoginMenu";
import { CallbackScreen } from "../radix-components/auth/CallbackScreen";

const SafeCanvas = withR3FErrorBoundary(() => (
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
));

export function AppShell() {
    const { session } = useAuthStore();
    const authView = useAuthOverlay();
    const shouldShowAuth = !session || (typeof window !== "undefined" && window.location.pathname.startsWith("/auth"));

    return (
        <MapViewProvider>
            <div className="relative h-screen w-screen overflow-hidden bg-slate-950">
                <UiErrorBoundary>
                    <MapLayer />
                </UiErrorBoundary>
                {shouldShowAuth ? (authView === "callback" ? <CallbackScreen /> : <LoginMenu />) : null}
                <SafeCanvas />
            </div>
        </MapViewProvider>
    );
}
