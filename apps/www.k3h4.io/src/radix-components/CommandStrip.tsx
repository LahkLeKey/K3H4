import { Badge, Button } from "../radix-primitives";
import { useAtlasState } from "../react-hooks/atlas";

export type CommandStripProps = {
    onOpenMap: () => void;
    onToggleWorkspace: () => void;
};

export function CommandStrip({ onOpenMap, onToggleWorkspace }: CommandStripProps) {
    const { activeContext, selectNext, selectPrev, workspaceOpen, autopilot, setAutopilot, heartbeat } = useAtlasState();

    return (
        <div className="pointer-events-auto fixed inset-x-0 bottom-4 z-20 px-3 sm:px-6">
            <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-sm text-slate-100 shadow-[0_14px_60px_rgba(0,0,0,0.4)] backdrop-blur">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                    <Badge accent={activeContext.accent}>Command strip</Badge>
                    <span className="hidden sm:inline text-slate-300">Travel + workspace controls</span>
                </div>
                <div className="ml-auto flex flex-wrap items-center gap-2">
                    <Button accent="#60a5fa" onClick={onOpenMap}>
                        Map
                    </Button>
                    <Button accent={activeContext.accent} onClick={() => selectPrev()}>
                        Prev
                    </Button>
                    <Button accent={activeContext.accent} onClick={() => selectNext()}>
                        Next
                    </Button>
                    <Button accent={autopilot ? "#6cf1d0" : "#f97316"} onClick={() => { setAutopilot(!autopilot); heartbeat(); }}>
                        {autopilot ? "Autopilot" : "Manual"}
                    </Button>
                    <Button accent="#f4d35e" onClick={onToggleWorkspace}>
                        {workspaceOpen ? "Hide workspace" : "Show workspace"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
