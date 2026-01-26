import type { ComponentPropsWithoutRef } from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

export const RadioGroup = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>) => (
    <RadioGroupPrimitive.Root {...props} className={`flex flex-col gap-2 ${className}`.trim()} />
);

export const RadioGroupItem = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>) => (
    <RadioGroupPrimitive.Item
        {...props}
        className={`flex h-4 w-4 items-center justify-center rounded-full border border-white/25 bg-slate-950 shadow-sm outline-none transition focus:ring-2 focus:ring-emerald-300/70 data-[state=checked]:border-emerald-300 ${className}`.trim()}
    >
        <RadioGroupPrimitive.Indicator className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
    </RadioGroupPrimitive.Item>
);
