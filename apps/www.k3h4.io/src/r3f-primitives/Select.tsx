import type { SelectHTMLAttributes } from "react";

import { Html } from "./Html";

export type SelectProps = {
    position?: [number, number, number];
    width?: number;
    options: { value: string; label: string }[];
    className?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ position = [0, 1.2, 0], width = 220, options, className = "", ...rest }: SelectProps) {
    return (
        <Html position={position} distanceFactor={8}>
            <select
                {...rest}
                style={{ width }}
                className={`rounded-xl border border-white/12 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 shadow-xl backdrop-blur transition hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:border-transparent ${className}`.trim()}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-100">
                        {opt.label}
                    </option>
                ))}
            </select>
        </Html>
    );
}
