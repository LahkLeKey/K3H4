import type { ComponentPropsWithoutRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

export const Checkbox = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>) => (
    <CheckboxPrimitive.Root
        {...props}
        className={`flex h-4 w-4 items-center justify-center rounded border border-white/20 bg-slate-950 text-emerald-300 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-300/70 data-[state=checked]:border-emerald-300 ${className}`.trim()}
    >
        <CheckboxPrimitive.Indicator className="text-[12px] leading-none">✓</CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
);
