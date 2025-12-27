import type { ReactNode } from "react";

import { cn } from "../../lib/utils";

export type PanelGridProps = {
    primary: ReactNode;
    secondary?: ReactNode;
    className?: string;
    columnsClassName?: string;
};

export function PanelGrid({ primary, secondary, className, columnsClassName }: PanelGridProps) {
    return (
        <div className={cn("grid gap-6", columnsClassName ?? "md:grid-cols-[1.1fr,0.9fr]", className)}>
            {primary}
            {secondary}
        </div>
    );
}
