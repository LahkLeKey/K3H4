import type { ComponentPropsWithoutRef } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

export const Progress = ({ className = "", value = 0, max = 100, ...props }: ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>) => (
    <ProgressPrimitive.Root
        {...props}
        value={value}
        max={max}
        className={`relative h-3 w-full overflow-hidden rounded-full bg-white/10 ${className}`.trim()}
    >
        <ProgressPrimitive.Indicator
            className="h-full bg-emerald-400 transition-all"
            style={{ width: `${Math.min(100, Math.max(0, value ?? 0))}%` }}
        />
    </ProgressPrimitive.Root>
);
