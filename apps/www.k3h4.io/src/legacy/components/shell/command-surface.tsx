import { useEffect, useState } from "react";
import { Map, MoveLeft, MoveRight, PanelRightClose, PanelRightOpen, Zap } from "lucide-react";

import { Button } from "../ui/button";

export type CommandSurfaceProps = {
    accent: string;
    previousLabel: string;
    nextLabel: string;
    onPrevious: () => void;
    onNext: () => void;
    onOpenMap: () => void;
    onTogglePanel: () => void;
    panelOpen: boolean;
};

export function CommandSurface({ accent, previousLabel, nextLabel, onPrevious, onNext, onOpenMap, onTogglePanel, panelOpen }: CommandSurfaceProps) {
    const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.matchMedia("(max-width: 768px)").matches : false));
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 768px)");
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    return (
        <div className="fixed inset-x-0 bottom-3 z-30 px-3 md:px-6">
            <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/75 px-4 py-3 text-sm text-slate-200 shadow-xl backdrop-blur-xl">
                <div className="flex flex-1 items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
                    <span className="text-xs uppercase tracking-[0.22em] text-slate-400">Command Strip</span>
                    <span className="hidden text-sm font-semibold text-white sm:inline">Travel, map, and panel shortcuts stay live</span>
                </div>

                {isMobile ? (
                    <div className="flex w-full flex-col gap-2 md:hidden">
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-xs uppercase tracking-[0.18em] text-slate-400">Mobile actions</span>
                            <Button variant="default" size="sm" className="gap-2 rounded-full" onClick={() => setMobileMenuOpen((prev) => !prev)} aria-label="Toggle mobile actions">
                                <Zap className="h-4 w-4" />
                                {mobileMenuOpen ? "Close" : "Actions"}
                            </Button>
                        </div>
                        {mobileMenuOpen ? (
                            <div className="flex flex-wrap items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={onOpenMap} aria-label="Open map">
                                    <Map className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={onTogglePanel} aria-label={panelOpen ? "Hide panel" : "Show panel"}>
                                    {panelOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
                                </Button>
                                <Button variant="ghost" size="icon" onClick={onPrevious} aria-label={`Go to ${previousLabel}`}>
                                    <MoveLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="default" size="icon" onClick={onNext} aria-label={`Go to ${nextLabel}`}>
                                    <MoveRight className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-[11px] text-slate-300">
                                <span className="rounded-full bg-white/5 px-3 py-1">Swipe or tap ⚡ to travel</span>
                                <span className="hidden xs:inline">Panel stays alive while you move</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="hidden items-center gap-2 md:flex">
                        <Button variant="ghost" size="sm" onClick={onOpenMap} className="gap-2 rounded-full border border-white/10 bg-white/5 text-white">
                            <Map className="h-4 w-4" />
                            Map
                        </Button>
                        <Button variant="outline" size="sm" onClick={onTogglePanel} className="gap-1 rounded-full border-white/20 text-white">
                            {panelOpen ? "Hide panel" : "Show panel"}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={onPrevious} className="gap-1 text-slate-100">
                            <MoveLeft className="h-4 w-4" />
                            {previousLabel}
                        </Button>
                        <Button variant="default" size="sm" onClick={onNext} className="gap-1">
                            {nextLabel}
                            <MoveRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
