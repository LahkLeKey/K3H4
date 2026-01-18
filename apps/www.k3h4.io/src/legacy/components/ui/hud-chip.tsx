import { type ReactNode } from "react";

import { cn } from "../../lib/utils";

export type HudChipProps = {
    children: ReactNode;
    tone?: "default" | "outline";
    className?: string;
};

export function HudChip({ children, tone = "default", className }: HudChipProps) {
    const base = "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur";
    const variant =
        tone === "outline"
            ? "border border-white/40 bg-white/5 text-white"
            : "bg-white/10 text-white";
    return <span className={cn(base, variant, className)}>{children}</span>;
}
