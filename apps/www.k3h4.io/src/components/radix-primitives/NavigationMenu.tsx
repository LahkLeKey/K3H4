import type { ComponentPropsWithoutRef } from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

const rootBase = "relative z-20";
const listBase = "flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 p-2 text-sm text-slate-100 shadow-sm backdrop-blur";
const triggerBase = "flex select-none items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10 data-[state=open]:text-emerald-200";
const contentBase = "absolute left-1/2 top-full z-30 mt-2 w-[min(640px,92vw)] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur";

export const NavigationMenu = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>) => (
    <NavigationMenuPrimitive.Root {...props} className={`${rootBase} ${className}`.trim()} />
);
export const NavigationMenuList = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>) => (
    <NavigationMenuPrimitive.List {...props} className={`${listBase} ${className}`.trim()} />
);
export const NavigationMenuItem = NavigationMenuPrimitive.Item;
export const NavigationMenuTrigger = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>) => (
    <NavigationMenuPrimitive.Trigger {...props} className={`${triggerBase} ${className}`.trim()} />
);
export const NavigationMenuContent = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>) => (
    <NavigationMenuPrimitive.Content {...props} className={`${contentBase} ${className}`.trim()} />
);
export const NavigationMenuLink = NavigationMenuPrimitive.Link;
export const NavigationMenuIndicator = NavigationMenuPrimitive.Indicator;
export const NavigationMenuViewport = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>) => (
    <NavigationMenuPrimitive.Viewport {...props} className={`absolute left-1/2 top-full z-30 mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur ${className}`.trim()} />
);
