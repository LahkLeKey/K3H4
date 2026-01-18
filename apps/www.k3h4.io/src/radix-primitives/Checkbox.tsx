import type { InputHTMLAttributes } from "react";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
    label?: string;
};

export function Checkbox({ label, className = "", ...rest }: CheckboxProps) {
    return (
        <label className={`inline-flex items-center gap-2 text-sm text-slate-100 ${className}`.trim()}>
            <input
                type="checkbox"
                className="h-4 w-4 rounded border border-white/25 bg-slate-900 text-emerald-300 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-300/70"
                {...rest}
            />
            {label ? <span className="text-slate-200">{label}</span> : null}
        </label>
    );
}
