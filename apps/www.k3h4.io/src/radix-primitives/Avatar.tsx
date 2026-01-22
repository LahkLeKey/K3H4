import type { ComponentPropsWithoutRef } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

export const Avatar = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>) => (
    <AvatarPrimitive.Root {...props} className={`inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-slate-800 text-sm text-slate-100 ${className}`.trim()} />
);

export const AvatarImage = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>) => (
    <AvatarPrimitive.Image {...props} className={`h-full w-full object-cover ${className}`.trim()} />
);

export const AvatarFallback = ({ className = "", ...props }: ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>) => (
    <AvatarPrimitive.Fallback {...props} className={`flex h-full w-full items-center justify-center bg-slate-700 text-xs font-semibold uppercase text-slate-100 ${className}`.trim()} />
);
