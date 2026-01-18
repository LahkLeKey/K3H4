import { useState } from "react";

import { Html } from "./Html";

export type PopoverProps = {
    position?: [number, number, number];
    width?: number;
    trigger: React.ReactNode;
    content: React.ReactNode;
    className?: string;
};

export function Popover({ position = [0, 1.2, 0], width = 240, trigger, content, className = "" }: PopoverProps) {
    const [open, setOpen] = useState(false);
    return (
        <Html position={position} distanceFactor={8}>
            <div className={`relative inline-block ${className}`.trim()} style={{ width }}>
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-white/12 bg-slate-950 px-3 py-2 text-sm font-semibold text-slate-100 shadow-xl backdrop-blur hover:border-white/30"
                >
                    {trigger}
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-400">▼</span>
                </button>
                {open ? (
                    <div className="absolute left-0 right-0 z-30 mt-2 rounded-xl border border-white/12 bg-slate-950/95 p-3 text-sm text-slate-100 shadow-2xl backdrop-blur">
                        {content}
                    </div>
                ) : null}
            </div>
        </Html>
    );
}
