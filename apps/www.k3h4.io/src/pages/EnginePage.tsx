import { useLayoutEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";

import { PageHeader } from "../components/radix-components/PageHeader";
import { R3FErrorBoundary } from "../components/r3f-components/R3FErrorBoundary";

export function EnginePage() {
    const canvasWrapperRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const updateCanvasHeight = () => {
            if (!canvasWrapperRef.current) {
                return;
            }

            const { top } = canvasWrapperRef.current.getBoundingClientRect();
            const availableHeight = Math.max(0, window.innerHeight - top);
            canvasWrapperRef.current.style.height = `${availableHeight}px`;
        };

        updateCanvasHeight();
        window.addEventListener("resize", updateCanvasHeight);
        return () => window.removeEventListener("resize", updateCanvasHeight);
    }, []);

    return (
        <div className="flex min-h-screen w-screen flex-col bg-slate-950 text-white">
            <PageHeader className="sticky top-0 z-20" />
            {/* TODO: remove debug border once layout is verified. */}
            <div ref={canvasWrapperRef} className="flex-1 border-2 border-yellow-400">
                <R3FErrorBoundary>
                    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 55 }} className="h-full w-full" gl={{ antialias: true }}>
                        <ambientLight intensity={0.6} />
                        <directionalLight position={[4, 4, 6]} intensity={0.9} />
                        <mesh>
                            <boxGeometry args={[1.5, 1.5, 1.5]} />
                            <meshStandardMaterial color="#38bdf8" roughness={0.35} metalness={0.1} />
                        </mesh>
                    </Canvas>
                </R3FErrorBoundary>
            </div>
        </div>
    );
}
