import type { ComponentPropsWithoutRef } from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

export const Separator = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>) => (
    <SeparatorPrimitive.Root {...props} className={`bg-white/10 ${props.orientation === "vertical" ? "mx-2 h-full w-px" : "my-2 h-px w-full"} ${className}`.trim()} />
);
