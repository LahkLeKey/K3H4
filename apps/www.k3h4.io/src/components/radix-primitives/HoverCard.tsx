import type { ComponentPropsWithoutRef, ReactNode } from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

const contentBase = "z-50 w-[260px] max-w-[92vw] rounded-xl border border-white/10 bg-slate-900/95 p-4 text-sm text-slate-100 shadow-2xl backdrop-blur";

export type HoverCardProps = ComponentPropsWithoutRef<typeof HoverCardPrimitive.Root> & {
    trigger: ReactNode;
    contentClassName?: string;
};

export function HoverCard({ trigger, children, contentClassName = "", ...props }: HoverCardProps) {
    return (
        <HoverCardPrimitive.Root {...props}>
            <HoverCardPrimitive.Trigger asChild>{trigger}</HoverCardPrimitive.Trigger>
            <HoverCardPrimitive.Portal>
                <HoverCardPrimitive.Content sideOffset={8} className={`${contentBase} ${contentClassName}`.trim()}>
                    {children}
                    <HoverCardPrimitive.Arrow className="fill-slate-900" />
                </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Portal>
        </HoverCardPrimitive.Root>
    );
}
