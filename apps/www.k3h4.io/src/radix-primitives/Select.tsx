import type { ComponentPropsWithoutRef, ReactNode } from "react";
import * as RadixSelect from "@radix-ui/react-select";

export type SelectProps = ComponentPropsWithoutRef<typeof RadixSelect.Root> & {
    placeholder?: ReactNode;
    contentClassName?: string;
    triggerClassName?: string;
};

const baseTrigger = "inline-flex w-full items-center justify-between gap-2 rounded-xl border border-white/15 bg-slate-950/70 px-3 py-2 text-sm text-slate-100 shadow-sm backdrop-blur transition hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed";
const baseContent = "z-50 min-w-[180px] overflow-hidden rounded-xl border border-white/10 bg-slate-900/95 text-sm text-slate-100 shadow-2xl backdrop-blur";
const baseItem = "flex cursor-pointer select-none items-center gap-2 px-3 py-2 text-sm text-slate-100 outline-none transition data-[highlighted]:bg-white/10 data-[state=checked]:text-emerald-200";

export function Select({ children, placeholder, contentClassName = "", triggerClassName = "", ...props }: SelectProps) {
    return (
        <RadixSelect.Root {...props}>
            <RadixSelect.Trigger className={`${baseTrigger} ${triggerClassName}`.trim()}>
                <RadixSelect.Value placeholder={placeholder} />
                <RadixSelect.Icon aria-hidden>▾</RadixSelect.Icon>
            </RadixSelect.Trigger>
            <RadixSelect.Portal>
                <RadixSelect.Content className={`${baseContent} ${contentClassName}`.trim()} position="popper" sideOffset={8}>
                    <RadixSelect.Viewport className="p-1">{children}</RadixSelect.Viewport>
                </RadixSelect.Content>
            </RadixSelect.Portal>
        </RadixSelect.Root>
    );
}

export const SelectGroup = RadixSelect.Group;
export const SelectValue = RadixSelect.Value;
export const SelectLabel = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof RadixSelect.Label>) => (
    <RadixSelect.Label {...props} className={`px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-400 ${className}`.trim()} />
);
export const SelectItem = ({ children, className = "", ...props }: ComponentPropsWithoutRef<typeof RadixSelect.Item>) => (
    <RadixSelect.Item {...props} className={`${baseItem} ${className}`.trim()}>
        <RadixSelect.ItemIndicator className="text-emerald-300">•</RadixSelect.ItemIndicator>
        <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
);
export const SelectSeparator = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof RadixSelect.Separator>) => (
    <RadixSelect.Separator {...props} className={`my-1 h-px bg-white/10 ${className}`.trim()} />
);
