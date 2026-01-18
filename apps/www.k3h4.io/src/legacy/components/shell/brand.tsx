import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { cn } from "../../lib/utils";

export type ShellBrandProps = {
    to?: string;
    label?: string;
    mark?: ReactNode;
    className?: string;
};

export function ShellBrand({ to = "/", label = "K3H4", mark, className }: ShellBrandProps) {
    return (
        <Link to={to} className={cn("flex items-center gap-2 text-sm font-semibold", className)}>
            {mark ?? <div className="h-8 w-8 rounded-full bg-primary/10" />}
            <span>{label}</span>
        </Link>
    );
}
