import type { ComponentPropsWithoutRef } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export const Switch = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>) => (
    <SwitchPrimitive.Root
        {...props}
        className={`relative h-6 w-11 rounded-full bg-white/15 outline-none transition data-[state=checked]:bg-emerald-400/60 ${className}`.trim()}
    >
        <SwitchPrimitive.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow-sm transition data-[state=checked]:translate-x-[1.375rem]" />
    </SwitchPrimitive.Root>
);
