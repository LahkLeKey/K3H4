import { type ReactNode } from "react";

import { cn } from "../../lib/utils";

export type MetricTileProps = {
    label: string;
    value: ReactNode;
    hint?: ReactNode;
    className?: string;
};

// Compact HUD-friendly stat tile used in cards.
export function MetricTile({ label, value, hint, className }: MetricTileProps) {
    return (
        <div className={cn("rounded-md border border-muted-foreground/20 bg-muted/30 px-2 py-2", className)}>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
            <p className="font-semibold">{value}</p>
            {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
        </div>
    );
}
