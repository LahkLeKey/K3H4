import { Link } from "react-router-dom";
import type { ComponentType } from "react";

import { cn } from "../../lib/utils";

export type NavItem = {
    to: string;
    label: string;
    icon?: ComponentType<{ className?: string }>;
};

export type NavLinksProps = {
    items: NavItem[];
    activePath: string;
    className?: string;
    pillClassName?: string;
};

export function NavLinks({ items, activePath, className, pillClassName }: NavLinksProps) {
    return (
        <nav className={cn("flex flex-1 flex-wrap items-center gap-2 text-sm", className)}>
            {items.map((item) => {
                const active = activePath === item.to;
                const Icon = item.icon;
                return (
                    <Link
                        key={item.to}
                        to={item.to}
                        className={cn(
                            "inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition hover:bg-accent",
                            active ? "bg-accent text-foreground" : "text-muted-foreground",
                            pillClassName
                        )}
                    >
                        {Icon ? <Icon className="h-4 w-4" /> : null}
                        <span>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
