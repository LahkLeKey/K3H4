import type { ButtonHTMLAttributes } from "react";

export type ToggleProps = {
    pressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
    children: React.ReactNode;
    className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange">;

export function Toggle({ pressed, onPressedChange, children, className = "", ...rest }: ToggleProps) {
    return (
        <button
            type="button"
            aria-pressed={pressed}
            onClick={() => onPressedChange?.(!pressed)}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] transition ${pressed ? "border-emerald-300/60 bg-emerald-400/10 text-white" : "border-white/12 bg-slate-900 text-slate-200 hover:border-white/30 hover:text-white"} ${className}`.trim()}
            {...rest}
        >
            {children}
        </button>
    );
}
