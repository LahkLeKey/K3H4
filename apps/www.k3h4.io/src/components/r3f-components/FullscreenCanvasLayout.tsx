import type { ReactNode } from "react";
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
    return (
        <div className={`flex h-screen w-screen flex-col ${className}`.trim()}>
            {showHeader ? <PageHeader className="sticky top-0 z-20" /> : null}
            <div
                className={`relative flex-1 min-h-0${showDebugBorder ? " border-2 border-yellow-400" : ""}`.trim()}
            >
                <R3FErrorBoundary>
                    <Canvas
                        dpr={[1, 2]}
                        camera={camera}
                        className="h-full w-full"
                        style={{ width: "100%", height: "100%", display: "block" }}
                        gl={{ antialias: true }}
                    >
                        {children}
                    </Canvas>
                </R3FErrorBoundary>
            </div>
        </div>
    );
}
