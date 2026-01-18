import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Html } from "./Html";

export type ButtonProps = {
    position?: [number, number, number];
    accent?: string;
    icon?: ReactNode;
    children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export function Button({ position = [0, 1, 0], accent = "#7fe4d0", icon, children, ...rest }: ButtonProps) {
    return (
        <Html position={position} distanceFactor={8}>
            <button
                type="button"
                {...rest}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-slate-900/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-50 shadow-xl backdrop-blur transition hover:border-white/30"
            >
                <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
                {icon ? <span className="text-slate-200">{icon}</span> : null}
                <span>{children}</span>
            </button>
        </Html>
    );
}
