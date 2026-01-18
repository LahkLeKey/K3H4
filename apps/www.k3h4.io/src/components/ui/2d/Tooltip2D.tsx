import { useState } from "react";

export type Tooltip2DProps = {
    label: string;
    children: React.ReactNode;
    className?: string;
};

export function Tooltip2D({ label, children, className = "" }: Tooltip2DProps) {
    const [open, setOpen] = useState(false);
    return (
        <span
            className={`relative inline-flex ${className}`.trim()}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
        >
            {children}
            {open ? (
                <span className="absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/12 bg-slate-950 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-100 shadow-xl">
                    {label}
                </span>
            ) : null}
        </span>
    );
}
