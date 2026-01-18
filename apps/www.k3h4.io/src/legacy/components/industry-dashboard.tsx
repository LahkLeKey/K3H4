import type { ReactNode } from "react";

import { cn } from "../lib/utils";

export type IndustryDashboardProps = {
    children: ReactNode;
    className?: string;
};

// Minimal layout wrapper to keep page spacing consistent across industry demos
export function IndustryDashboard({ children, className }: IndustryDashboardProps) {
    return (
        <section className={cn("flex flex-col gap-6", className)}>
            {children}
        </section>
    );
}
