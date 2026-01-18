import { type ReactNode } from "react";

import { cn } from "../../lib/utils";

export type FormActionsProps = {
    children: ReactNode;
    note?: ReactNode;
    className?: string;
};

// Shared footer row for form CTAs to keep spacing and notes consistent.
export function FormActions({ children, note, className }: FormActionsProps) {
    return (
        <div className={cn("flex flex-wrap items-center gap-3 sm:col-span-2 lg:col-span-4", className)}>
            {children}
            {note ? <span className="text-xs text-muted-foreground">{note}</span> : null}
        </div>
    );
}
