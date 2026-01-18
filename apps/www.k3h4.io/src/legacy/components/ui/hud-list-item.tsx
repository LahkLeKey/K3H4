import { type ReactNode } from "react";

import { cn } from "../../lib/utils";

export type HudListItemProps = {
    primary: ReactNode;
    secondary?: ReactNode;
    className?: string;
};

// Compact row for HUD list content so items share spacing and typography.
export function HudListItem({ primary, secondary, className }: HudListItemProps) {
    return (
        <div className={cn("flex items-center justify-between", className)}>
            <span className="text-sm font-medium leading-tight text-foreground">{primary}</span>
            {secondary ? <span className="text-[11px] text-muted-foreground">{secondary}</span> : null}
        </div>
    );
}
