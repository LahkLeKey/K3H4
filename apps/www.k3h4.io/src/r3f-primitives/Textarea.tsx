import type { TextareaHTMLAttributes } from "react";

import { Html } from "./Html";

export type TextareaProps = {
    position?: [number, number, number];
    width?: number;
    className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ position = [0, 1, 0], width = 260, className = "", ...rest }: TextareaProps) {
    return (
        <Html position={position} distanceFactor={9}>
            <textarea
                {...rest}
                style={{ width }}
                className={`rounded-xl border border-white/15 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 shadow-md backdrop-blur transition hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:border-transparent ${className}`.trim()}
            />
        </Html>
    );
}
