import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...rest }: InputProps) {
    return (
        <input
            {...rest}
            className={`flex h-10 w-full rounded-xl border border-white/15 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 shadow-sm backdrop-blur transition hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:border-transparent ${className}`.trim()}
        />
    );
}
