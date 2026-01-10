import { type ComponentProps } from "react";

import { cn } from "../../lib/utils";
import { Card } from "./card";

export type HudCardProps = ComponentProps<typeof Card>;

// Card wrapper with HUD-friendly padding and backdrop styling.
export function HudCard({ className, ...props }: HudCardProps) {
    return <Card className={cn("bg-background/70 p-4 shadow-xl", className)} {...props} />;
}
