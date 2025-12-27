import type { ReactNode } from "react";

import { cn } from "../../lib/utils";

export type StatusLineProps = {
    children: ReactNode;
    className?: string;
};

export function StatusLine({ children, className }: StatusLineProps) {
    if (!children) return null;
    return (
        <div className={cn("mx-auto flex max-w-6xl items-center gap-2 px-4 pb-3 text-xs text-muted-foreground", className)}>
            {children}
        </div>
    );
}
