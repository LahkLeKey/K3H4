import type { InputHTMLAttributes } from "react";

import { Html3D } from "./Html3D";

export type Input3DProps = {
    position?: [number, number, number];
    width?: number;
    className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input3D({ position = [0, 1, 0], width = 240, className = "", ...rest }: Input3DProps) {
    return (
        <Html3D position={position} distanceFactor={9}>
            <input
                {...rest}
                style={{ width }}
                className={`rounded-xl border border-white/15 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 shadow-md backdrop-blur transition hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-300/60 ${className}`.trim()}
            />
        </Html3D>
    );
}
