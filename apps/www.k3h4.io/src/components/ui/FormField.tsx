import type { ReactNode } from "react";

import { Stack } from "./Stack";

export type FormFieldProps = {
    label?: ReactNode;
    hint?: ReactNode;
    description?: ReactNode;
    error?: ReactNode;
    required?: boolean;
    actions?: ReactNode;
    children?: ReactNode;
    className?: string;
};

export function FormField({
    label,
    hint,
    description,
    error,
    required,
    actions,
    children,
    className = "",
}: FormFieldProps) {
    return (
        <Stack gap="xs" className={className}>
            {(label || actions) ? (
                <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.16em] text-slate-300">
                    {label ? (
                        <span className="font-semibold">
                            {label}
                            {required ? <span className="ml-1 text-rose-200">*</span> : null}
                        </span>
                    ) : null}
                    {actions ? <span className="text-[11px] text-slate-400">{actions}</span> : null}
                </div>
            ) : null}
            {children}
            {description ? <div className="text-[11px] text-slate-400">{description}</div> : null}
            {hint ? <div className="text-[11px] text-slate-400">{hint}</div> : null}
            {error ? <div className="text-[11px] text-amber-300">{error}</div> : null}
        </Stack>
    );
}
