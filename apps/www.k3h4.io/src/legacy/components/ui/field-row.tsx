import { type ReactNode } from "react";

import { cn } from "../../lib/utils";

export type FieldRowProps = {
    children: ReactNode;
    className?: string;
    columnsClassName?: string;
};

const defaultColumns = "sm:grid-cols-2 lg:grid-cols-4";

// Simple grid wrapper for form rows to keep consistent spacing across HUD forms.
export function FieldRow({ children, className, columnsClassName = defaultColumns }: FieldRowProps) {
    return <div className={cn("grid gap-3", columnsClassName, className)}>{children}</div>;
}
