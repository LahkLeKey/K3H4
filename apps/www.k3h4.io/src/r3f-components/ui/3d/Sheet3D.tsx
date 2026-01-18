import type { ReactNode } from "react";

import { Html3D } from "./Html3D";

export type Sheet3DProps = {
    position?: [number, number, number];
    width?: number;
    title?: string;
    open: boolean;
    onClose: () => void;
    children?: ReactNode;
};

export function Sheet3D({ position = [0, 1.1, 0], width = 340, title, open, onClose, children }: Sheet3DProps) {
    if (!open) return null;
    return (
        <Html3D position={position} distanceFactor={8}>
            <div className="rounded-2xl border border-white/12 bg-slate-950/90 shadow-2xl backdrop-blur" style={{ width }}>
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-sm font-semibold text-slate-100">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-300" />
                        {title ?? "Sheet"}
                    </div>
                    <button type="button" onClick={onClose} className="text-[11px] uppercase tracking-[0.2em] text-slate-400 hover:text-white">
                        Close
                    </button>
                </div>
                <div className="px-4 py-3 text-sm text-slate-200">{children}</div>
            </div>
        </Html3D>
    );
}
