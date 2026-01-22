import type { ReactNode } from "react";

export type GridProps = {
    cols?: number;
    smCols?: number;
    mdCols?: number;
    lgCols?: number;
    gap?: "sm" | "md" | "lg";
    children?: ReactNode;
    className?: string;
};

const gapClasses: Record<NonNullable<GridProps["gap"]>, string> = {
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
};

const colMap: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    11: "grid-cols-11",
    12: "grid-cols-12",
};

const colsClass = (prefix: string, cols?: number) => {
    if (!cols || cols < 1) return "";
    const cls = colMap[cols];
    return cls ? `${prefix}${cls}` : `${prefix}${colMap[1]}`;
};

export function Grid({ cols = 1, smCols, mdCols, lgCols, gap = "md", children, className = "" }: GridProps) {
    return (
        <div className={`grid ${colsClass("", cols)} ${colsClass("sm:", smCols)} ${colsClass("md:", mdCols)} ${colsClass("lg:", lgCols)} ${gapClasses[gap]} ${className}`.trim()}>
            {children}
        </div>
    );
}
