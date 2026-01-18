import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { AtlasScene } from "../r3f-components/AtlasScene";
import { CallbackScreen } from "../radix-components/auth/CallbackScreen";
import { LoginMenu } from "../radix-components/auth/LoginMenu";
import { useAuthOverlay } from "../react-hooks/useAuthOverlay";

export function AppShell() {
    const view = useAuthOverlay();
    const overlay = view === "callback" ? <CallbackScreen /> : <LoginMenu />;

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-slate-950">
            <Canvas shadows dpr={[1, 1.8]} className="h-full w-full">
                <AtlasScene />
                <Html fullscreen>{overlay}</Html>
            </Canvas>
        </div>
    );
}
