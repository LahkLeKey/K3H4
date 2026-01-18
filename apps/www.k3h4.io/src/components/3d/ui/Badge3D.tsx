import type { ReactNode } from "react";

import { Html3D } from "./Html3D";

export type Badge3DProps = {
    position?: [number, number, number];
    accent?: string;
    children: ReactNode;
};

export function Badge3D({ position = [0, 1, 0], accent = "#94a3b8", children }: Badge3DProps) {
    return (
        <Html3D position={position} distanceFactor={9}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-100">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                {children}
            </span>
        </Html3D>
    );
}
