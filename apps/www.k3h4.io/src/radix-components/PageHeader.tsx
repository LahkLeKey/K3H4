import clsx from "clsx";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
    { to: "/", label: "Home" },
    { to: "/map", label: "Map" },
    { to: "/bank", label: "Bank" },
    { to: "/personas", label: "Personas" },
    { to: "/logistics", label: "Logistics" },
    { to: "/telemetry", label: "Telemetry" },
];

type PageHeaderProps = {
    rightSlot?: ReactNode;
    className?: string;
};

export function PageHeader({ rightSlot, className }: PageHeaderProps) {
    return (
        <div
            className={clsx(
                "pointer-events-auto flex flex-wrap items-center justify-between gap-3 bg-slate-950/85 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur",
                className,
            )}
        >
            <div className="flex flex-wrap items-center gap-2">
                <div className="rounded bg-emerald-500/20 px-2 py-1 text-xs text-emerald-200">Portfolio</div>
                <div className="text-base tracking-tight text-white">Kyle Halek - Hastings, MN</div>
                <nav className="ml-1 flex items-center gap-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                clsx(
                                    "rounded-full border px-3 py-1 text-xs font-semibold transition",
                                    isActive
                                        ? "border-white bg-white text-slate-950 shadow-sm"
                                        : "border-white/10 bg-white/10 text-white hover:border-white/20 hover:bg-white/20",
                                )
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
            <div className="flex items-center gap-2">{rightSlot}</div>
        </div>
    );
}
