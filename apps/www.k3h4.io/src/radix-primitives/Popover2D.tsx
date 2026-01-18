import { useState } from "react";

export type Popover2DProps = {
    trigger: React.ReactNode;
    content: React.ReactNode;
    className?: string;
};

export function Popover2D({ trigger, content, className = "" }: Popover2DProps) {
    const [open, setOpen] = useState(false);
    return (
        <div className={`relative inline-block ${className}`.trim()}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-slate-950 px-3 py-2 text-sm font-semibold text-slate-100 shadow-md backdrop-blur hover:border-white/30"
            >
                {trigger}
            </button>
            {open ? (
                <div className="absolute left-0 z-30 mt-2 min-w-[200px] rounded-xl border border-white/12 bg-slate-950/95 p-3 text-sm text-slate-100 shadow-2xl backdrop-blur">
                    {content}
                </div>
            ) : null}
        </div>
    );
}
