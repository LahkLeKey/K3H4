import type { InputHTMLAttributes } from "react";

export type SliderProps = {
    value?: number;
    onValueChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange" | "min" | "max" | "step">;

export function Slider({ value, onValueChange, min = 0, max = 100, step = 1, className = "", ...rest }: SliderProps) {
    return (
        <input
            type="range"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onValueChange?.(Number(e.target.value))}
            className={`w-full accent-emerald-300 transition focus:outline-none focus:ring-2 focus:ring-emerald-300/60 ${className}`.trim()}
            {...rest}
        />
    );
}
