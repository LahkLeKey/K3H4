import type { ReactNode } from "react";

export type SheetProps = {
    open: boolean;
    side?: "left" | "right" | "top" | "bottom";
    onClose: () => void;
    title?: string;
    children?: ReactNode;
};

export function Sheet({ open, side = "right", onClose, title, children }: SheetProps) {
    if (!open) return null;
    const sideClasses: Record<string, string> = {
        right: "inset-y-0 right-0 w-[380px]",
        left: "inset-y-0 left-0 w-[380px]",
        top: "inset-x-0 top-0 h-[320px]",
        bottom: "inset-x-0 bottom-0 h-[320px]",
    };
    return (
        <div className="fixed inset-0 z-40 flex">
            <div className="absolute inset-0 bg-slate-950/60" onClick={onClose} />
            <div className={`relative z-10 border-l border-white/10 bg-slate-950 shadow-2xl ${sideClasses[side] ?? sideClasses.right}`}>
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-sm font-semibold text-slate-100">
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-300" />
                        {title ?? "Sheet"}
                    </div>
                    <button type="button" onClick={onClose} className="text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-white">
                        Close
                    </button>
                </div>
                <div className="h-full overflow-y-auto px-4 py-4 text-sm text-slate-200">{children}</div>
            </div>
        </div>
    );
}
