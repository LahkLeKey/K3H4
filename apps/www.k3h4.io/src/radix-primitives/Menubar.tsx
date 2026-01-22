import type { ComponentPropsWithoutRef } from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";

const barBase = "flex h-10 items-center gap-1 rounded-xl border border-white/10 bg-slate-950/70 px-2 text-sm text-slate-100 shadow-sm backdrop-blur";
const itemBase = "flex cursor-pointer select-none items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-slate-100 outline-none transition data-[highlighted]:bg-white/10 data-[state=open]:text-emerald-200";
const contentBase = "z-50 min-w-[180px] rounded-xl border border-white/10 bg-slate-900/95 p-1 text-sm text-slate-100 shadow-2xl backdrop-blur";

export const Menubar = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>) => (
    <MenubarPrimitive.Root {...props} className={`${barBase} ${className}`.trim()} />
);

export const MenubarMenu = MenubarPrimitive.Menu;
export const MenubarTrigger = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>) => (
    <MenubarPrimitive.Trigger {...props} className={`${itemBase} ${className}`.trim()} />
);
export const MenubarContent = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>) => (
    <MenubarPrimitive.Content {...props} className={`${contentBase} ${className}`.trim()} sideOffset={8}>
        {props.children}
    </MenubarPrimitive.Content>
);
export const MenubarItem = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof MenubarPrimitive.Item>) => (
    <MenubarPrimitive.Item {...props} className={`${itemBase} ${className}`.trim()} />
);
export const MenubarSeparator = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>) => (
    <MenubarPrimitive.Separator {...props} className={`my-1 h-px bg-white/10 ${className}`.trim()} />
);
export const MenubarLabel = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof MenubarPrimitive.Label>) => (
    <MenubarPrimitive.Label {...props} className={`px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-slate-400 ${className}`.trim()} />
);
