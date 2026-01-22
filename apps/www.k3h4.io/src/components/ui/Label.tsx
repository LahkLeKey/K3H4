import type { LabelHTMLAttributes, ReactNode } from "react";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
    hint?: ReactNode;
};

export function Label({ children, hint, className = "", ...rest }: LabelProps) {
    return (
        <label {...rest} className={`flex items-center justify-between text-xs font-semibold uppercase tracking-[0.16em] text-slate-300 ${className}`.trim()}>
            <span>{children}</span>
            {hint ? <span className="text-[11px] text-slate-400">{hint}</span> : null}
        </label>
    );
}
