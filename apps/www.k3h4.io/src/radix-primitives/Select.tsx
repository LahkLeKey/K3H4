import type { SelectHTMLAttributes } from "react";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    options: { value: string; label: string }[];
};

export function Select({ options, className = "", ...rest }: SelectProps) {
    return (
        <select
            {...rest}
            className={`w-full rounded-xl border border-white/12 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 shadow-sm backdrop-blur transition hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:border-transparent ${className}`.trim()}
        >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-slate-900 text-slate-100">
                    {opt.label}
                </option>
            ))}
        </select>
    );
}
