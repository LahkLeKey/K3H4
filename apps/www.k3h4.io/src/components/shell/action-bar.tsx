import type { ReactNode } from "react";

import { cn } from "../../lib/utils";

export type ShellActionBarProps = {
    children: ReactNode;
    className?: string;
};

export function ShellActionBar({ children, className }: ShellActionBarProps) {
    return <div className={cn("flex items-center gap-2", className)}>{children}</div>;
}
