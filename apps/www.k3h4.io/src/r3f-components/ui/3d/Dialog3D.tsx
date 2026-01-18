import type { ReactNode } from "react";

import { Html3D } from "./Html3D";

export type Dialog3DProps = {
    position?: [number, number, number];
    width?: number;
    title?: string;
    open: boolean;
    onClose: () => void;
    children?: ReactNode;
    footer?: ReactNode;
};

export function Dialog3D({ position = [0, 1.4, 0], width = 420, title, open, onClose, children, footer }: Dialog3DProps) {
    if (!open) return null;
    return (
        <Html3D position={position} distanceFactor={7}>
            <div className="rounded-2xl border border-white/12 bg-slate-950 shadow-2xl backdrop-blur" style={{ width }}>
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-sm font-semibold text-slate-100">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-300" />
                        {title ?? "Dialog"}
                    </div>
                    <button type="button" onClick={onClose} className="text-[11px] uppercase tracking-[0.2em] text-slate-400 hover:text-white">
                        Close
                    </button>
                </div>
                <div className="px-4 py-3 text-sm text-slate-200">{children}</div>
                {footer ? <div className="border-t border-white/10 px-4 py-3 text-xs text-slate-300">{footer}</div> : null}
            </div>
        </Html3D>
    );
}
