import { type ReactNode } from "react";

import { cn } from "../../lib/utils";

export type HudListPanelProps = {
    title: ReactNode;
    badge?: ReactNode;
    loading?: boolean;
    empty?: ReactNode;
    children?: ReactNode;
    className?: string;
    contentClassName?: string;
};

// Reusable HUD list container with consistent padding and header treatment.
export function HudListPanel({
    title,
    badge,
    loading = false,
    empty = "No data",
    children,
    className,
    contentClassName,
}: HudListPanelProps) {
    return (
        <div className={cn("rounded-lg border bg-muted/40 px-3 py-2", className)}>
            <div className="flex items-center justify-between">
                <span className="font-semibold">{title}</span>
                {badge}
            </div>
            <div className={cn("mt-2 space-y-1 text-xs text-muted-foreground", contentClassName)}>
                {loading ? "Loading…" : children ?? empty}
            </div>
        </div>
    );
}
