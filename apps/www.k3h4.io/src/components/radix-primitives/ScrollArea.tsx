import type { ComponentPropsWithoutRef } from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

export const ScrollArea = ({ className = "", children, ...props }: ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>) => (
    <ScrollAreaPrimitive.Root {...props} className={`overflow-hidden ${className}`.trim()}>
        <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
            {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollAreaPrimitive.Scrollbar orientation="vertical" className="flex touch-none select-none p-1">
            <ScrollAreaPrimitive.Thumb className="flex-1 rounded-full bg-white/20" />
        </ScrollAreaPrimitive.Scrollbar>
        <ScrollAreaPrimitive.Scrollbar orientation="horizontal" className="flex touch-none select-none p-1">
            <ScrollAreaPrimitive.Thumb className="flex-1 rounded-full bg-white/20" />
        </ScrollAreaPrimitive.Scrollbar>
        <ScrollAreaPrimitive.Corner className="bg-white/10" />
    </ScrollAreaPrimitive.Root>
);
