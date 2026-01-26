import type { ComponentPropsWithoutRef } from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

export const Collapsible = CollapsiblePrimitive.Root;
export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;
export const CollapsibleContent = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>) => (
    <CollapsiblePrimitive.Content {...props} className={className} />
);
