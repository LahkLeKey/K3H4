import type { ReactNode } from "react";

import { Html3D } from "./Html3D";

export type Card3DProps = {
    position?: [number, number, number];
    width?: number;
    title?: string;
    eyebrow?: string;
    actions?: ReactNode;
    children?: ReactNode;
    footer?: ReactNode;
    className?: string;
};

export function Card3D({ position = [0, 1.1, 0], width = 320, title, eyebrow, actions, children, footer, className = "" }: Card3DProps) {
    return (
        <Html3D position={position} distanceFactor={8}>
            <div className={`rounded-2xl border border-white/10 bg-slate-950/85 shadow-2xl backdrop-blur ${className}`.trim()} style={{ width }}>
                {(eyebrow || title || actions) ? (
                    <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
                        <div className="flex flex-col gap-1">
                            {eyebrow ? <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{eyebrow}</span> : null}
                            {title ? <span className="text-sm font-semibold text-white">{title}</span> : null}
                        </div>
                        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
                    </div>
                ) : null}
                <div className="px-4 py-3 text-sm text-slate-200">{children}</div>
                {footer ? <div className="border-t border-white/10 px-4 py-3 text-xs text-slate-300">{footer}</div> : null}
            </div>
        </Html3D>
    );
}
