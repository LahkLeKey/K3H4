import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { PageHeader } from "../radix-components/PageHeader";
import { R3FErrorBoundary } from "../r3f-components/R3FErrorBoundary";
import { useAuthStore } from "../react-hooks/auth";
import { SessionPanel } from "../r3f-primitives/SessionPanel";

function OrbitingStars() {
    return (
        <>
            <Stars
                radius={160}
                depth={120}
                count={2200}
                factor={1.15}
                saturation={0.05}
                fade
                speed={0.2}
            />
            <Stars
                radius={110}
                depth={90}
                count={1400}
                factor={0.85}
                saturation={0.08}
                fade
                speed={0.35}
            />
            <Stars
                radius={70}
                depth={60}
                count={1000}
                factor={0.55}
                saturation={0.08}
                fade
                speed={0.55}
            />
        </>
    );
}
export function HomePage() {
    const { session } = useAuthStore();

    if (!session) return null;

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-slate-950 text-white">
            {/* 3D background layer */}
            <div className="pointer-events-none absolute inset-0">
                <R3FErrorBoundary>
                    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: false }}>
                        <color attach="background" args={["#020617"]} />
                        <ambientLight intensity={0.18} color="#cbd5e1" />
                        <OrbitingStars />
                    </Canvas>
                </R3FErrorBoundary>
            </div>

            {/* 2D interaction layer */}
            <div className="relative z-10 flex h-full flex-col">
                <PageHeader className="sticky top-0 z-20" />

                <main className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-10">
                    <SessionPanel session={session} variant="page" />
                </main>
            </div>
        </div>
    );
}
