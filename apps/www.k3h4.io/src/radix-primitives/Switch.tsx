import type { InputHTMLAttributes } from "react";

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
    label?: string;
};

export function Switch({ label, className = "", ...rest }: SwitchProps) {
    return (
        <label className={`inline-flex items-center gap-3 text-sm text-slate-100 ${className}`.trim()}>
            <span className="relative inline-flex h-5 w-9 items-center rounded-full bg-slate-700 transition focus-within:ring-2 focus-within:ring-emerald-300/60">
                <input type="checkbox" className="peer sr-only" {...rest} />
                <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition peer-checked:translate-x-4 peer-checked:bg-emerald-300" />
            </span>
            {label ? <span className="text-slate-200">{label}</span> : null}
        </label>
    );
}
