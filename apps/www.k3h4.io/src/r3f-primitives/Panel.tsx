import type { ReactNode } from "react";

import { Html } from "./Html";

export type PanelProps = {
    position?: [number, number, number];
    width?: number;
    title?: string;
    accent?: string;
    children?: ReactNode;
    footer?: ReactNode;
};

export function Panel({ position = [0, 1.2, 0], width = 320, title, accent = "#7fe4d0", children, footer }: PanelProps) {
    return (
        <Html position={position} distanceFactor={8}>
            <div
                className="rounded-2xl border border-white/10 bg-slate-950/80 shadow-2xl backdrop-blur"
                style={{ width }}
            >
                {title ? (
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
                            <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
                            {title}
                        </div>
                    </div>
                ) : null}
                <div className="px-4 py-3 text-sm text-slate-200">{children}</div>
                {footer ? <div className="border-t border-white/10 px-4 py-3 text-xs text-slate-300">{footer}</div> : null}
            </div>
        </Html>
    );
}
