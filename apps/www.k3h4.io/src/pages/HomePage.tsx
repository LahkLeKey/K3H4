import { Float, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { PageHeader } from "../components/PageHeader";
import { R3FErrorBoundary } from "../r3f-components/R3FErrorBoundary";
import { useAuthStore } from "../react-hooks/auth";
import { SessionPanel } from "../components/SessionPanel";

function Ground() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]} receiveShadow>
            <planeGeometry args={[120, 120]} />
            <meshStandardMaterial color="#0b1224" metalness={0.25} roughness={0.85} transparent opacity={0.9} />
        </mesh>
    );
}

function MenuRing({ color, radius, y = 0.12 }: { color: string; radius: number; y?: number }) {
    return (
        <Float speed={1} rotationIntensity={0.26} floatIntensity={0.22} position={[0, y, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <torusGeometry args={[radius, 0.08, 24, 128]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.75} metalness={0.5} roughness={0.25} />
            </mesh>
        </Float>
    );
}

function MenuPillar() {
    return (
        <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.4} position={[0, 0.5, 0]}>
            <mesh castShadow position={[0, 0.7, 0]}>
                <boxGeometry args={[1.6, 3.2, 0.45]} />
                <meshStandardMaterial color="#10b981" emissive="#34d399" emissiveIntensity={0.5} metalness={0.45} roughness={0.28} />
            </mesh>
        </Float>
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
                    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 2.5, 7], fov: 55 }} gl={{ antialias: true, alpha: false }}>
                        <color attach="background" args={["#030712"]} />
                        <fog attach="fog" args={["#030712", 10, 26]} />
                        <ambientLight intensity={0.42} color="#c7d2fe" />
                        <pointLight position={[6, 4, 6]} intensity={1.35} color="#34d399" castShadow />
                        <pointLight position={[-5, 3, -5]} intensity={1.1} color="#60a5fa" />
                        <Stars radius={80} depth={50} count={1100} factor={3} saturation={0.2} fade speed={1} />

                        <Ground />
                        <MenuPillar />
                        <MenuRing color="#34d399" radius={2.8} />
                        <MenuRing color="#60a5fa" radius={3.8} y={0.18} />
                        <MenuRing color="#a855f7" radius={5.1} y={0.09} />
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
