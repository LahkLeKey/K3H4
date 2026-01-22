import type { ReactNode } from "react";

export type SurfaceProps = {
    tone?: "soft" | "overlay";
    padding?: "xs" | "sm" | "md";
    radius?: "lg" | "xl" | "2xl";
    border?: boolean;
    className?: string;
    children?: ReactNode;
};

const toneClasses: Record<NonNullable<SurfaceProps["tone"]>, string> = {
    soft: "bg-white/5 text-slate-200",
    overlay: "bg-slate-900/70 text-slate-200",
};

const paddingClasses: Record<NonNullable<SurfaceProps["padding"]>, string> = {
    xs: "p-2",
    sm: "px-3 py-2",
    md: "px-4 py-3",
};

const radiusClasses: Record<NonNullable<SurfaceProps["radius"]>, string> = {
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
};

export function Surface({
    tone = "soft",
    padding = "md",
    radius = "xl",
    border = true,
    className = "",
    children,
}: SurfaceProps) {
    const borderClasses = border ? "border border-white/10" : "";
    return (
        <div className={`${radiusClasses[radius]} ${borderClasses} ${toneClasses[tone]} ${paddingClasses[padding]} ${className}`.trim()}>
            {children}
        </div>
    );
}
