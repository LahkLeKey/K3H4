import { useEffect } from "react";
import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { AtlasScene } from "../r3f-components/AtlasScene.tsx";
import { AuthenticatedScene } from "../r3f-components/AuthenticatedScene.tsx";
import { CallbackScreen } from "../radix-components/auth/CallbackScreen.tsx";
import { LoginMenu } from "../radix-components/auth/LoginMenu.tsx";
import { SessionLanding } from "../radix-components/auth/SessionLanding.tsx";
import { useAuthStore } from "../react-hooks/auth";
import { useAuthOverlay } from "../react-hooks/useAuthOverlay";
import { useAtlasState } from "../react-hooks/atlas";

export function AppShell() {
    const { session } = useAuthStore();
    const view = useAuthOverlay();
    const { hydrate } = useAtlasState();

    useEffect(() => {
        if (session?.accessToken) {
            hydrate();
        }
    }, [session?.accessToken, hydrate]);
    const overlay = view === "callback" ? <CallbackScreen /> : session ? <SessionLanding session={session} /> : <LoginMenu />;
    const scene = session ? <AuthenticatedScene /> : <AtlasScene />;

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-slate-950">
            <Canvas shadows dpr={[1, 1.8]} className="h-full w-full">
                {scene}
                <Html fullscreen>{overlay}</Html>
            </Canvas>
        </div>
    );
}
