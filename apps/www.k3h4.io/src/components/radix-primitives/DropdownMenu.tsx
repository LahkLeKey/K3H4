import type { ComponentPropsWithoutRef, ReactNode } from "react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";

const contentBase = "z-50 min-w-[180px] overflow-hidden rounded-xl border border-white/10 bg-slate-900/95 p-1 text-sm text-slate-100 shadow-2xl backdrop-blur";
const itemBase = "flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none transition data-[highlighted]:bg-white/10 data-[state=checked]:text-emerald-200";

export type DropdownMenuProps = ComponentPropsWithoutRef<typeof Dropdown.Root> & {
    trigger: ReactNode;
    contentClassName?: string;
};

export function DropdownMenu({ trigger, children, contentClassName = "", ...props }: DropdownMenuProps) {
    return (
        <Dropdown.Root {...props}>
            <Dropdown.Trigger asChild>{trigger}</Dropdown.Trigger>
            <Dropdown.Portal>
                <Dropdown.Content className={`${contentBase} ${contentClassName}`.trim()} sideOffset={8}>
                    {children}
                    <Dropdown.Arrow className="fill-slate-900" />
                </Dropdown.Content>
            </Dropdown.Portal>
        </Dropdown.Root>
    );
}

export const DropdownMenuGroup = Dropdown.Group;
export const DropdownMenuRadioGroup = Dropdown.RadioGroup;

export const DropdownMenuItem = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof Dropdown.Item>) => (
    <Dropdown.Item {...props} className={`${itemBase} ${className}`.trim()} />
);

export const DropdownMenuCheckboxItem = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof Dropdown.CheckboxItem>) => (
    <Dropdown.CheckboxItem
        {...props}
        className={`${itemBase} ${className}`.trim()}
    >
        <Dropdown.ItemIndicator className="text-emerald-300">✓</Dropdown.ItemIndicator>
    </Dropdown.CheckboxItem>
);

export const DropdownMenuRadioItem = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof Dropdown.RadioItem>) => (
    <Dropdown.RadioItem {...props} className={`${itemBase} ${className}`.trim()}>
        <Dropdown.ItemIndicator className="text-emerald-300">•</Dropdown.ItemIndicator>
    </Dropdown.RadioItem>
);

export const DropdownMenuLabel = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof Dropdown.Label>) => (
    <Dropdown.Label {...props} className={`px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-slate-400 ${className}`.trim()} />
);

export const DropdownMenuSeparator = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof Dropdown.Separator>) => (
    <Dropdown.Separator {...props} className={`my-1 h-px bg-white/10 ${className}`.trim()} />
);

export const DropdownMenuSub = Dropdown.Sub;
export const DropdownMenuSubTrigger = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof Dropdown.SubTrigger>) => (
    <Dropdown.SubTrigger {...props} className={`${itemBase} ${className}`.trim()} />
);
export const DropdownMenuSubContent = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof Dropdown.SubContent>) => (
    <Dropdown.SubContent {...props} className={`${contentBase} ${className}`.trim()} sideOffset={6}>
        {props.children}
    </Dropdown.SubContent>
);
