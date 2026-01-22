import type { ComponentPropsWithoutRef, ReactNode } from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";

const contentBase = "z-50 min-w-[180px] overflow-hidden rounded-xl border border-white/10 bg-slate-900/95 p-1 text-sm text-slate-100 shadow-2xl backdrop-blur";
const itemBase = "flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none transition data-[highlighted]:bg-white/10 data-[state=checked]:text-emerald-200";

export type ContextMenuProps = ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root> & {
    trigger: ReactNode;
    contentClassName?: string;
};

export function ContextMenu({ trigger, children, contentClassName = "", ...props }: ContextMenuProps) {
    return (
        <ContextMenuPrimitive.Root {...props}>
            <ContextMenuPrimitive.Trigger asChild>{trigger}</ContextMenuPrimitive.Trigger>
            <ContextMenuPrimitive.Portal>
                <ContextMenuPrimitive.Content className={`${contentBase} ${contentClassName}`.trim()}>
                    {children}
                </ContextMenuPrimitive.Content>
            </ContextMenuPrimitive.Portal>
        </ContextMenuPrimitive.Root>
    );
}

export const ContextMenuItem = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item>) => (
    <ContextMenuPrimitive.Item {...props} className={`${itemBase} ${className}`.trim()} />
);
export const ContextMenuCheckboxItem = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>) => (
    <ContextMenuPrimitive.CheckboxItem {...props} className={`${itemBase} ${className}`.trim()}>
        <ContextMenuPrimitive.ItemIndicator className="text-emerald-300">✓</ContextMenuPrimitive.ItemIndicator>
    </ContextMenuPrimitive.CheckboxItem>
);
export const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;
export const ContextMenuRadioItem = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>) => (
    <ContextMenuPrimitive.RadioItem {...props} className={`${itemBase} ${className}`.trim()}>
        <ContextMenuPrimitive.ItemIndicator className="text-emerald-300">•</ContextMenuPrimitive.ItemIndicator>
    </ContextMenuPrimitive.RadioItem>
);
export const ContextMenuLabel = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label>) => (
    <ContextMenuPrimitive.Label {...props} className={`px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-slate-400 ${className}`.trim()} />
);
export const ContextMenuSeparator = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>) => (
    <ContextMenuPrimitive.Separator {...props} className={`my-1 h-px bg-white/10 ${className}`.trim()} />
);
export const ContextMenuGroup = ContextMenuPrimitive.Group;
