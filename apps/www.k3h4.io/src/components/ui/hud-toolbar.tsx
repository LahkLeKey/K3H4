import { type ReactNode } from "react";

import { cn } from "../../lib/utils";

export type HudToolbarProps = {
    children: ReactNode;
    justify?: "start" | "end" | "between" | "center";
    className?: string;
};

const justifyMap: Record<NonNullable<HudToolbarProps["justify"]>, string> = {
    start: "justify-start",
    end: "justify-end",
    between: "justify-between",
    center: "justify-center",
};

// Compact flex row used across HUD surfaces for consistent spacing/alignment.
export function HudToolbar({ children, justify = "start", className }: HudToolbarProps) {
    return <div className={cn("flex flex-wrap items-center gap-2", justifyMap[justify], className)}>{children}</div>;
}
