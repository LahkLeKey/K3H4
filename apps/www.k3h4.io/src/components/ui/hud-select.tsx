import { type ReactNode, type SelectHTMLAttributes } from "react";

import { cn } from "../../lib/utils";

export type HudSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    hint?: ReactNode;
};

export function HudSelect({ label, hint, className, children, ...props }: HudSelectProps) {
    return (
        <div className="space-y-1 text-sm">
            {label ? <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p> : null}
            <select
                className={cn("w-full rounded-md border bg-background px-3 py-2 text-sm", className)}
                {...props}
            >
                {children}
            </select>
            {hint ? <p className="text-[11px] text-muted-foreground">{hint}</p> : null}
        </div>
    );
}
