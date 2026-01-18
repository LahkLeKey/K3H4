import type { InputHTMLAttributes } from "react";

import { Html } from "./Html";

export type CheckboxProps = {
    position?: [number, number, number];
    label?: string;
    className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function Checkbox({ position = [0, 1, 0], label, className = "", ...rest }: CheckboxProps) {
    return (
        <Html position={position} distanceFactor={9}>
            <label className={`inline-flex items-center gap-2 text-sm text-slate-100 ${className}`.trim()}>
                <input
                    type="checkbox"
                    className="h-4 w-4 rounded border border-white/25 bg-slate-900 text-emerald-300 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-300/70"
                    {...rest}
                />
                {label ? <span className="text-slate-200">{label}</span> : null}
            </label>
        </Html>
    );
}
