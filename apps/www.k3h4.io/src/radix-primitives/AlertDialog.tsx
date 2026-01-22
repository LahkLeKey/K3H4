import type { ComponentPropsWithoutRef, ReactNode } from "react";
import * as AlertPrimitive from "@radix-ui/react-alert-dialog";

const overlayBase = "fixed inset-0 z-40 bg-slate-950/70 backdrop-blur";
const contentBase = "fixed left-1/2 top-1/2 z-50 w-[min(500px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-amber-200/20 bg-slate-900/95 p-6 text-slate-100 shadow-2xl backdrop-blur";

export type AlertDialogProps = ComponentPropsWithoutRef<typeof AlertPrimitive.Root> & {
    trigger?: ReactNode;
};

export function AlertDialog({ trigger, children, ...props }: AlertDialogProps) {
    return (
        <AlertPrimitive.Root {...props}>
            {trigger ? <AlertPrimitive.Trigger asChild>{trigger}</AlertPrimitive.Trigger> : null}
            {children}
        </AlertPrimitive.Root>
    );
}

export const AlertDialogTrigger = AlertPrimitive.Trigger;
export const AlertDialogCancel = AlertPrimitive.Cancel;
export const AlertDialogAction = AlertPrimitive.Action;
export const AlertDialogTitle = AlertPrimitive.Title;
export const AlertDialogDescription = AlertPrimitive.Description;

export const AlertDialogOverlay = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof AlertPrimitive.Overlay>) => (
    <AlertPrimitive.Overlay {...props} className={`${overlayBase} ${className}`.trim()} />
);

export const AlertDialogContent = ({ className = "", children, ...props }: ComponentPropsWithoutRef<typeof AlertPrimitive.Content>) => (
    <AlertPrimitive.Portal>
        <AlertDialogOverlay />
        <AlertPrimitive.Content {...props} className={`${contentBase} ${className}`.trim()}>
            {children}
        </AlertPrimitive.Content>
    </AlertPrimitive.Portal>
);
