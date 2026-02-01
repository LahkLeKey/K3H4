import { useLayoutEffect, useRef, type ReactNode } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";

import { PageHeader } from "../radix-components/PageHeader";
import { R3FErrorBoundary } from "./R3FErrorBoundary";

type FullscreenCanvasLayoutProps = {
    children: ReactNode;
    camera?: CanvasProps["camera"];
    className?: string;
    showHeader?: boolean;
    showDebugBorder?: boolean;
};

export function FullscreenCanvasLayout({
    children,
    camera = { position: [0, 0, 5], fov: 55 },
    className = "bg-slate-950 text-white",
    showHeader = true,
    showDebugBorder = false,
}: FullscreenCanvasLayoutProps) {
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
        <div className={`flex min-h-screen w-screen flex-col ${className}`.trim()}>
            {showHeader ? <PageHeader className="sticky top-0 z-20" /> : null}
            <div
                ref={canvasWrapperRef}
                className={`flex-1${showDebugBorder ? " border-2 border-yellow-400" : ""}`.trim()}
            >
                <R3FErrorBoundary>
                    <Canvas dpr={[1, 2]} camera={camera} className="h-full w-full" gl={{ antialias: true }}>
                        {children}
                    </Canvas>
                </R3FErrorBoundary>
            </div>
        </div>
    );
}
