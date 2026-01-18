import type { InputHTMLAttributes } from "react";

import { Html3D } from "./Html3D";

export type Slider3DProps = {
    position?: [number, number, number];
    width?: number;
    value?: number;
    onValueChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange" | "min" | "max" | "step">;

export function Slider3D({ position = [0, 1, 0], width = 200, value, onValueChange, min = 0, max = 100, step = 1, className = "", ...rest }: Slider3DProps) {
    return (
        <Html3D position={position} distanceFactor={9}>
            <input
                type="range"
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={(e) => onValueChange?.(Number(e.target.value))}
                style={{ width }}
                className={`accent-emerald-300 transition focus:outline-none focus:ring-2 focus:ring-emerald-300/60 ${className}`.trim()}
                {...rest}
            />
        </Html3D>
    );
}
