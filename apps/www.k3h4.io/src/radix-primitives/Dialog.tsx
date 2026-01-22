import type { ComponentPropsWithoutRef, ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const overlayBase = "fixed inset-0 z-40 bg-slate-950/70 backdrop-blur";
const contentBase = "fixed left-1/2 top-1/2 z-50 w-[min(520px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-slate-900/95 p-6 text-slate-100 shadow-2xl backdrop-blur";

export type DialogProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root> & {
    trigger?: ReactNode;
};

export function Dialog({ trigger, children, ...props }: DialogProps) {
    return (
        <DialogPrimitive.Root {...props}>
            {trigger ? <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger> : null}
            {children}
        </DialogPrimitive.Root>
    );
}

export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export const DialogPortal = DialogPrimitive.Portal;
export const DialogOverlay = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>) => (
    <DialogPrimitive.Overlay {...props} className={`${overlayBase} ${className}`.trim()} />
);
export const DialogContent = ({ className = "", children, ...props }: ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) => (
    <DialogPrimitive.Portal>
        <DialogOverlay />
        <DialogPrimitive.Content {...props} className={`${contentBase} ${className}`.trim()}>
            {children}
            <DialogPrimitive.Close className="absolute right-3 top-3 rounded-full px-2 py-1 text-slate-400 transition hover:bg-white/10 hover:text-white">
                ×
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
);
