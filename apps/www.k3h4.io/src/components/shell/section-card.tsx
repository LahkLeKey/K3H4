import type { ReactNode } from "react";

import { cn } from "../../lib/utils";
import { Card } from "../ui/card";

export type SectionCardProps = {
    children: ReactNode;
    className?: string;
    tone?: "default" | "muted";
};

export function SectionCard({ children, className, tone = "default" }: SectionCardProps) {
    const toneClass = tone === "muted" ? "bg-background/60" : "bg-background/70";
    return <Card className={cn("border p-6 shadow-sm", toneClass, className)}>{children}</Card>;
}
