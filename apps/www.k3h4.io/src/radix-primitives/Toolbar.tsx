import type { ComponentPropsWithoutRef } from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";

const toolbarBase = "flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 p-2 text-sm text-slate-100 shadow-sm backdrop-blur";
const itemBase = "inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-100 transition hover:border-white/20 data-[state=on]:border-emerald-300 data-[state=on]:bg-emerald-400/20";

export const Toolbar = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>) => (
    <ToolbarPrimitive.Root {...props} className={`${toolbarBase} ${className}`.trim()} />
);
export const ToolbarButton = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof ToolbarPrimitive.Button>) => (
    <ToolbarPrimitive.Button {...props} className={`${itemBase} ${className}`.trim()} />
);
export const ToolbarToggleItem = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem>) => (
    <ToolbarPrimitive.ToggleItem {...props} className={`${itemBase} ${className}`.trim()} />
);
export const ToolbarSeparator = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>) => (
    <ToolbarPrimitive.Separator {...props} className={`mx-1 h-5 w-px bg-white/15 ${className}`.trim()} />
);
export const ToolbarLink = ToolbarPrimitive.Link;
export const ToolbarGroup = ToolbarPrimitive.ToolbarGroup;
