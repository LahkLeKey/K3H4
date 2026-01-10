import { type ReactNode } from "react";

import { cn } from "../../lib/utils";
import { Card } from "./card";
import { Button } from "./button";

export type ActionPanelProps = {
    eyebrow?: string;
    title: string;
    onClose?: () => void;
    children: ReactNode;
    footer?: ReactNode;
    className?: string;
};

export function ActionPanel({ eyebrow, title, onClose, children, footer, className }: ActionPanelProps) {
    return (
        <Card className={cn("bg-background/80 p-4 shadow-xl space-y-3", className)}>
            <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-1">
                    {eyebrow ? <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">{eyebrow}</p> : null}
                    <div className="text-lg font-semibold">{title}</div>
                </div>
                {onClose ? (
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        Close
                    </Button>
                ) : null}
            </div>
            {children}
            {footer ? <div className="pt-2">{footer}</div> : null}
        </Card>
    );
}
