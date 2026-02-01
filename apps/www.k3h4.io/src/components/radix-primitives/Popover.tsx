import type { ReactNode } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

export type PopoverProps = {
    trigger: ReactNode;
    content: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    modal?: boolean;
    side?: PopoverPrimitive.PopoverContentProps["side"];
    align?: PopoverPrimitive.PopoverContentProps["align"];
    sideOffset?: number;
    collisionPadding?: number;
    triggerClassName?: string;
    contentClassName?: string;
};

export function Popover({
    trigger,
    content,
    open,
    defaultOpen,
    onOpenChange,
    modal = false,
    side = "bottom",
    align = "center",
    sideOffset = 8,
    collisionPadding = 12,
    triggerClassName = "",
    contentClassName = "",
}: PopoverProps) {
    return (
        <PopoverPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} modal={modal}>
            <PopoverPrimitive.Trigger asChild className={triggerClassName}>
                {trigger}
            </PopoverPrimitive.Trigger>
            <PopoverPrimitive.Portal>
                <PopoverPrimitive.Content
                    side={side}
                    align={align}
                    sideOffset={sideOffset}
                    collisionPadding={collisionPadding}
                    className={`z-50 rounded-xl border border-white/10 bg-slate-900/95 p-4 text-sm text-slate-100 shadow-2xl backdrop-blur data-[state=open]:fade-in data-[state=closed]:fade-out ${contentClassName}`.trim()}
                >
                    {content}
                    <PopoverPrimitive.Arrow className="fill-slate-900" />
                </PopoverPrimitive.Content>
            </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
    );
}
