import type { ReactNode } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export type TooltipProps = {
    children: ReactNode;
    content: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    delayDuration?: number;
    side?: TooltipPrimitive.TooltipContentProps["side"];
    align?: TooltipPrimitive.TooltipContentProps["align"];
    sideOffset?: number;
    className?: string;
    contentClassName?: string;
};

export function Tooltip({
    children,
    content,
    open,
    defaultOpen,
    onOpenChange,
    delayDuration = 200,
    side = "top",
    align = "center",
    sideOffset = 6,
    className = "",
    contentClassName = "",
}: TooltipProps) {
    return (
        <TooltipPrimitive.Provider delayDuration={delayDuration}>
            <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
                <TooltipPrimitive.Trigger asChild className={className}>
                    {children}
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Portal>
                    <TooltipPrimitive.Content
                        side={side}
                        align={align}
                        sideOffset={sideOffset}
                        className={`rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-[11px] text-slate-100 shadow-xl backdrop-blur data-[state=delayed-open]:fade-in data-[state=closed]:fade-out ${contentClassName}`.trim()}
                    >
                        {content}
                        <TooltipPrimitive.Arrow className="fill-slate-900" />
                    </TooltipPrimitive.Content>
                </TooltipPrimitive.Portal>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}
