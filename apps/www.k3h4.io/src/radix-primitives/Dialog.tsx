import type { ReactNode } from "react";

export type DialogProps = {
    open: boolean;
    title?: string;
    onClose: () => void;
    children?: ReactNode;
    footer?: ReactNode;
};

export function Dialog({ open, title, onClose, children, footer }: DialogProps) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 backdrop-blur">
            <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-950 shadow-2xl ring-1 ring-white/10">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
                        <span className="h-2 w-2 rounded-full bg-emerald-300" />
                        {title ?? "Dialog"}
                    </div>
                    <button type="button" onClick={onClose} className="text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-white">
                        Close
                    </button>
                </div>
                <div className="px-5 py-4 text-sm text-slate-200">{children}</div>
                {footer ? <div className="border-t border-white/10 px-5 py-3 text-xs text-slate-300">{footer}</div> : null}
            </div>
        </div>
    );
}
