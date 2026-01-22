import type { ComponentPropsWithoutRef } from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";

export const Toggle = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof TogglePrimitive.Root>) => (
    <TogglePrimitive.Root
        {...props}
        className={`inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-100 transition data-[state=on]:border-emerald-300 data-[state=on]:bg-emerald-400/20 data-[state=on]:text-white hover:border-white/20 ${className}`.trim()}
    />
);
