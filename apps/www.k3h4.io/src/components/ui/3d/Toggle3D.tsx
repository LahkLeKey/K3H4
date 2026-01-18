import type { ButtonHTMLAttributes } from "react";

import { Html3D } from "./Html3D";

export type Toggle3DProps = {
    position?: [number, number, number];
    pressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    children: React.ReactNode;
    className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange">;

export function Toggle3D({ position = [0, 1, 0], pressed, onPressedChange, children, className = "", ...rest }: Toggle3DProps) {
    return (
        <Html3D position={position} distanceFactor={8}>
            <button
                type="button"
                aria-pressed={pressed}
                onClick={() => onPressedChange?.(!pressed)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] transition ${pressed ? "border-emerald-300/60 bg-emerald-400/10 text-white" : "border-white/12 bg-slate-900 text-slate-200 hover:border-white/30 hover:text-white"} ${className}`.trim()}
                {...rest}
            >
                {children}
            </button>
        </Html3D>
    );
}
