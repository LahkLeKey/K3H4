import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

import { R3FErrorBoundary } from "@/r3f-components/R3FErrorBoundary";
import { PageHeader } from "./PageHeader";

export type StarLayer = {
    radius: number;
    depth: number;
    count: number;
    factor: number;
    saturation?: number;
    fade?: boolean;
    speed?: number;
};

export type StarfieldLayoutProps = {
    children: ReactNode;
    gradientClassName?: string;
    className?: string;
    contentClassName?: string;
    starLayers?: StarLayer[];
    showHeader?: boolean;
};

const defaultLayers: StarLayer[] = [
    { radius: 150, depth: 120, count: 1900, factor: 1.0, saturation: 0.06, fade: true, speed: 0.24 },
    { radius: 95, depth: 70, count: 1200, factor: 0.82, saturation: 0.08, fade: true, speed: 0.42 },
];

export function StarfieldLayout({
    children,
    gradientClassName = "bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.12),transparent_40%),radial-gradient(circle_at_75%_10%,rgba(56,189,248,0.12),transparent_38%),radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.12),transparent_38%)]",
    className = "bg-slate-950 text-white",
    contentClassName = "mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10",
    starLayers = defaultLayers,
    showHeader = true,
}: StarfieldLayoutProps) {
    return (
        <div className={`relative min-h-screen w-screen overflow-hidden ${className}`.trim()}>
            <div className="pointer-events-none absolute inset-0">
                <R3FErrorBoundary>
                    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 9], fov: 45 }} gl={{ antialias: true, alpha: false }}>
                        <color attach="background" args={["#020617"]} />
                        <ambientLight intensity={0.18} color="#cbd5e1" />
                        {starLayers.map((layer, idx) => (
                            <Stars key={idx} {...layer} />
                        ))}
                    </Canvas>
                </R3FErrorBoundary>
                <div className={`absolute inset-0 ${gradientClassName}`} />
            </div>

            <div className="relative z-10 flex min-h-screen flex-col">
                {showHeader ? <PageHeader className="sticky top-0 z-20" /> : null}
                <main className={contentClassName}>{children}</main>
            </div>
        </div>
    );
}
