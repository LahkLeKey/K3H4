import type { ComponentPropsWithoutRef } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

export const Slider = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof SliderPrimitive.Root>) => (
    <SliderPrimitive.Root
        {...props}
        className={`relative flex w-full touch-none select-none items-center ${className}`.trim()}
    >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/10">
            <SliderPrimitive.Range className="absolute h-full bg-emerald-400" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-emerald-200 bg-white shadow-md outline-none transition focus:ring-2 focus:ring-emerald-300/70" />
    </SliderPrimitive.Root>
);
