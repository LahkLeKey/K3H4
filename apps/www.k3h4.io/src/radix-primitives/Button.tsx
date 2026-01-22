import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonProps = {
    accent?: string;
    icon?: ReactNode;
    variant?: "solid" | "outline" | "ghost" | "subtle";
    children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

const baseClasses = "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition focus:outline-none focus:ring-2 focus:ring-emerald-300/60";

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
    solid: "border border-transparent bg-slate-50 text-slate-900 shadow hover:bg-white disabled:opacity-60",
    outline: "border border-white/20 bg-slate-900/70 text-slate-50 shadow hover:border-white/40 hover:bg-slate-800 disabled:opacity-60",
    ghost: "border border-transparent bg-transparent text-slate-100 hover:bg-white/10 disabled:opacity-50",
    subtle: "border border-white/10 bg-white/5 text-slate-50 hover:border-white/25 hover:bg-white/10 disabled:opacity-60",
};

export function Button({ accent = "#7fe4d0", icon, children, className = "", variant = "outline", ...rest }: ButtonProps) {
    const pill = <span className="h-2 w-2 rounded-full" style={{ background: accent }} />;
    return (
        <button
            type="button"
            {...rest}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`.trim()}
        >
            {pill}
            {icon ? <span className="text-slate-200">{icon}</span> : null}
            <span>{children}</span>
        </button>
    );
}
