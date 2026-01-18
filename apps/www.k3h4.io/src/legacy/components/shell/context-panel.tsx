import type { ReactNode } from "react";
import { PanelRightClose } from "lucide-react";

import { Button } from "../ui/button";
import type { WorldNode } from "./immersive-world";

export type ContextPanelProps = {
    module: WorldNode;
    children: ReactNode;
    onClose: () => void;
};

export function ContextPanel({ module, children, onClose }: ContextPanelProps) {
    return (
        <div className="relative w-full md:ml-auto md:max-w-[520px]">
            <div className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full px-2 pb-5 sm:px-3 md:static md:inset-auto md:px-0 md:pb-0">
                <div
                    className="glass-surface relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/85 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl transition-all md:sticky md:top-28 md:max-h-[72vh] md:rounded-[28px] md:shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
                    role="dialog"
                    aria-label={`${module.label} context panel`}
                >
                    <div className="absolute left-1/2 top-2 z-10 h-1 w-16 -translate-x-1/2 rounded-full bg-white/25 md:hidden" aria-hidden />
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: module.accent }} />
                            <div className="flex flex-col">
                                <span className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Context Panel</span>
                                <span className="text-lg font-semibold text-white">{module.glyph ? `${module.glyph} ${module.label}` : module.label}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span className="hidden md:inline">Stays over the live 3D canvas.</span>
                            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Hide panel">
                                <PanelRightClose className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="max-h-[70vh] overflow-y-auto px-3 py-4 sm:px-4 md:px-6 md:py-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
