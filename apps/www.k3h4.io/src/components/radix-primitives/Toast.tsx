import type { ComponentPropsWithoutRef, ReactNode } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";

const viewportBase = "fixed bottom-4 right-4 z-50 flex w-[360px] max-w-[90vw] flex-col gap-2";
const toastBase = "relative rounded-2xl border border-white/10 bg-slate-900/95 p-4 text-sm text-slate-100 shadow-2xl backdrop-blur";

export type ToastProps = ComponentPropsWithoutRef<typeof ToastPrimitive.Root> & {
    title?: ReactNode;
    description?: ReactNode;
};

export function Toast({ title, description, className = "", children, ...props }: ToastProps) {
    return (
        <ToastPrimitive.Root {...props} className={`${toastBase} ${className}`.trim()}>
            {title ? <ToastPrimitive.Title className="text-sm font-semibold text-white">{title}</ToastPrimitive.Title> : null}
            {description ? <ToastPrimitive.Description className="mt-1 text-slate-300">{description}</ToastPrimitive.Description> : null}
            {children}
            <ToastPrimitive.Close className="absolute right-2 top-2 rounded-full px-2 py-1 text-slate-400 transition hover:bg-white/10 hover:text-white">
                ×
            </ToastPrimitive.Close>
        </ToastPrimitive.Root>
    );
}

export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>) => (
    <ToastPrimitive.Viewport {...props} className={`${viewportBase} ${className}`.trim()} />
);
