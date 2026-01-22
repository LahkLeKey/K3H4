import type { ReactNode } from "react";

export type StackProps = {
    gap?: "xs" | "sm" | "md" | "lg";
    direction?: "column" | "row";
    align?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "between" | "end";
    className?: string;
    children?: ReactNode;
};

const gapClasses: Record<NonNullable<StackProps["gap"]>, string> = {
    xs: "gap-2",
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
};

const directionClasses: Record<NonNullable<StackProps["direction"]>, string> = {
    column: "flex-col",
    row: "flex-row flex-wrap",
};

const alignClasses: Record<NonNullable<StackProps["align"]>, string> = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
};

const justifyClasses: Record<NonNullable<StackProps["justify"]>, string> = {
    start: "justify-start",
    center: "justify-center",
    between: "justify-between",
    end: "justify-end",
};

export function Stack({
    gap = "md",
    direction = "column",
    align = "stretch",
    justify = "start",
    className = "",
    children,
}: StackProps) {
    return (
        <div className={`flex ${directionClasses[direction]} ${gapClasses[gap]} ${alignClasses[align]} ${justifyClasses[justify]} ${className}`.trim()}>
            {children}
        </div>
    );
}
