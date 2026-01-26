import type { ComponentPropsWithoutRef } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

const itemBase = "overflow-hidden rounded-xl border border-white/10 bg-slate-950/60";
const triggerBase = "flex w-full items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/5 data-[state=open]:text-emerald-200";
const contentBase = "px-4 pb-4 text-sm text-slate-200";

export const Accordion = AccordionPrimitive.Root;
export const AccordionItem = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>) => (
    <AccordionPrimitive.Item {...props} className={`${itemBase} ${className}`.trim()} />
);
export const AccordionTrigger = ({ className = "", children, ...props }: ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) => (
    <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger {...props} className={`${triggerBase} ${className}`.trim()}>
            {children}
            <span aria-hidden className="text-slate-400 data-[state=open]:rotate-180 transition-transform">▾</span>
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
);
export const AccordionContent = ({ className = "", children, ...props }: ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) => (
    <AccordionPrimitive.Content {...props} className={`${contentBase} ${className}`.trim()}>
        <div className="pt-1">{children}</div>
    </AccordionPrimitive.Content>
);
