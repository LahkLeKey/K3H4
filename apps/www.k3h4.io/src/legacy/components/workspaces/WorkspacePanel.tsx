import type { ReactNode } from "react";
import { PanelRightClose } from "lucide-react";

import { Button } from "../ui/button";
import { useActiveZone } from "../../state/atlas/atlas-store";

export type WorkspacePanelProps = {
    open: boolean;
    onClose: () => void;
    children?: ReactNode;
};

export function WorkspacePanel({ open, onClose, children }: WorkspacePanelProps) {
    const zone = useActiveZone();
    if (!open) {
        return (
            <div className="fixed inset-x-0 bottom-20 z-20 flex justify-center md:static md:inset-auto md:justify-end">
                <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg backdrop-blur"
                >
                    Open {zone.label}
                </button>
            </div>
        );
    }

    return (
        <div className="relative w-full md:ml-auto md:max-w-[520px]">
            <div
                className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full px-2 pb-5 sm:px-3 md:static md:inset-auto md:px-0 md:pb-0"
                role="dialog"
                aria-label={`${zone.label} workspace`}
            >
                <div className="glass-surface relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/85 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl md:sticky md:top-28 md:max-h-[72vh] md:rounded-[28px] md:shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ background: zone.accent }} />
                            <div className="flex flex-col">
                                <span className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Workspace</span>
                                <span className="text-lg font-semibold text-white">{zone.glyph ? `${zone.glyph} ${zone.label}` : zone.label}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span className="hidden md:inline">Stays over the live 3D canvas.</span>
                            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Hide workspace">
                                <PanelRightClose className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="max-h-[70vh] overflow-y-auto px-3 py-4 sm:px-4 md:px-6 md:py-6">
                        {children ?? <DefaultWorkspaceContent />}
                    </div>
                </div>
            </div>
        </div>
    );
}

function DefaultWorkspaceContent() {
    const zone = useActiveZone();
    return (
        <div className="flex flex-col gap-4 text-sm text-slate-200">
            <p className="text-slate-300">Workspace placeholder. Rebuild this zones data/actions into the unified workspace shell.</p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Zone</div>
                <div className="text-lg font-semibold text-white">{zone.label}</div>
                <p className="text-slate-300">{zone.description}</p>
            </div>
        </div>
    );
}
