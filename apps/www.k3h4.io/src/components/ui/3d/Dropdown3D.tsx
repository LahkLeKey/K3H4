import { useState } from "react";

import { Html3D } from "./Html3D";

export type Dropdown3DOption = {
    key: string;
    label: string;
    description?: string;
};

export type Dropdown3DProps = {
    position?: [number, number, number];
    width?: number;
    label?: string;
    options: Dropdown3DOption[];
    value?: string;
    onSelect?: (key: string) => void;
    className?: string;
};

export function Dropdown3D({ position = [0, 1.2, 0], width = 220, label = "Select", options, value, onSelect, className = "" }: Dropdown3DProps) {
    const [open, setOpen] = useState(false);
    const [internal, setInternal] = useState(value ?? options[0]?.key ?? "");
    const active = value ?? internal;
    const activeLabel = options.find((o) => o.key === active)?.label ?? label;

    return (
        <Html3D position={position} distanceFactor={8}>
            <div className={`relative inline-block text-left ${className}`.trim()} style={{ width }}>
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="inline-flex w-full items-center justify-between gap-3 rounded-xl border border-white/12 bg-slate-950/85 px-3 py-2 text-sm font-semibold text-slate-100 shadow-xl backdrop-blur hover:border-white/30"
                >
                    <span>{activeLabel}</span>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-400">▼</span>
                </button>
                {open ? (
                    <div className="absolute left-0 right-0 z-10 mt-2 rounded-xl border border-white/12 bg-slate-950/95 p-2 shadow-2xl backdrop-blur">
                        <div className="flex flex-col gap-1">
                            {options.map((opt) => (
                                <button
                                    key={opt.key}
                                    type="button"
                                    onClick={() => {
                                        setInternal(opt.key);
                                        onSelect?.(opt.key);
                                        setOpen(false);
                                    }}
                                    className={`flex w-full flex-col items-start gap-0.5 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-white/5 ${opt.key === active ? "border border-emerald-400/40 bg-white/5" : "border border-transparent"}`.trim()}
                                >
                                    <span className="font-semibold text-slate-100">{opt.label}</span>
                                    {opt.description ? <span className="text-xs text-slate-400">{opt.description}</span> : null}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </Html3D>
    );
}
