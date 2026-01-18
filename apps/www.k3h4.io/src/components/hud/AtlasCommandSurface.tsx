import { Map, MoveLeft, MoveRight, PanelRightOpen, Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { useAtlas, useActiveZone } from "../../state/atlas/atlas-store";

export function AtlasCommandSurface({ onOpenMap, onToggleWorkspace, workspaceOpen }: { onOpenMap: () => void; onToggleWorkspace: () => void; workspaceOpen: boolean }) {
    const { nextZone, prevZone } = useAtlas();
    const activeZone = useActiveZone();
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
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: activeZone.accent }} />
                    <span className="text-xs uppercase tracking-[0.22em] text-slate-400">Command Strip</span>
                    <span className="hidden text-sm font-semibold text-white sm:inline">Context travel + workspace access</span>
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
                                <Button variant="ghost" size="icon" onClick={onToggleWorkspace} aria-label={workspaceOpen ? "Hide workspace" : "Show workspace"}>
                                    <PanelRightOpen className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={prevZone} aria-label="Previous context">
                                    <MoveLeft className="h-4 w-4" />
                                </Button>
                                <Button variant="default" size="icon" onClick={nextZone} aria-label="Next context">
                                    <MoveRight className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-[11px] text-slate-300">
                                <span className="rounded-full bg-white/5 px-3 py-1">Swipe or tap ⚡ to travel</span>
                                <span className="hidden xs:inline">Workspace stays live while you move</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="hidden items-center gap-2 md:flex">
                        <Button variant="ghost" size="sm" onClick={onOpenMap} className="gap-2 rounded-full border border-white/10 bg-white/5 text-white">
                            <Map className="h-4 w-4" />
                            Map
                        </Button>
                        <Button variant="outline" size="sm" onClick={onToggleWorkspace} className="gap-1 rounded-full border-white/20 text-white">
                            {workspaceOpen ? "Hide workspace" : "Show workspace"}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={prevZone} className="gap-1 text-slate-100">
                            <MoveLeft className="h-4 w-4" />
                            Prev
                        </Button>
                        <Button variant="default" size="sm" onClick={nextZone} className="gap-1">
                            Next
                            <MoveRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
