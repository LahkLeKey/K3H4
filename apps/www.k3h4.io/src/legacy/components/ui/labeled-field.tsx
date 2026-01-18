import { type ReactNode } from "react";

import { cn } from "../../lib/utils";

export type LabeledFieldProps = {
    label: string;
    children: ReactNode;
    hint?: ReactNode;
    className?: string;
};

export function LabeledField({ label, children, hint, className }: LabeledFieldProps) {
    return (
        <div className={cn("space-y-1 text-sm", className)}>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
            {children}
            {hint ? <p className="text-[11px] text-muted-foreground">{hint}</p> : null}
        </div>
    );
}
