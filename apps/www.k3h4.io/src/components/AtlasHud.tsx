import { Badge, Button, Dropdown, StatChip } from "../radix-primitives";
import { useAtlasState } from "../react-hooks/atlas";

export type AtlasHudProps = {
    onOpenMap: () => void;
    onToggleWorkspace: () => void;
};

export function AtlasHud({ onOpenMap, onToggleWorkspace }: AtlasHudProps) {
    const { contexts, activeContext, setActiveId, selectNext, selectPrev, workspaceOpen, autopilot, setAutopilot, heartbeat } = useAtlasState();

    return (
        <header className="fixed inset-x-0 top-0 z-20 px-3 pt-3 sm:px-6">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 shadow-[0_16px_60px_rgba(0,0,0,0.45)] backdrop-blur">
                <div className="flex items-center gap-3">
                    <Badge accent={activeContext.accent}>K3H4 Atlas</Badge>
                    <div className="flex flex-col leading-tight">
                        <span className="text-[11px] uppercase tracking-[0.22em] text-slate-400">Active</span>
                        <span className="text-sm font-semibold text-white">{activeContext.glyph ? `${activeContext.glyph} ${activeContext.name}` : activeContext.name}</span>
                    </div>
                </div>

                <div className="flex flex-1 flex-wrap items-center justify-center gap-3">
                    <Dropdown
                        options={contexts.map((ctx) => ({ key: ctx.id, label: ctx.name, description: ctx.summary }))}
                        value={activeContext.id}
                        onSelect={(key) => setActiveId(key)}
                        className="w-[220px]"
                    />
                    <div className="hidden items-center gap-2 md:flex">
                        <Button accent={activeContext.accent} onClick={() => selectPrev()}>
                            Prev
                        </Button>
                        <Button accent={activeContext.accent} onClick={() => selectNext()}>
                            Next
                        </Button>
                        <Button accent={autopilot ? "#6cf1d0" : "#f97316"} onClick={() => { setAutopilot(!autopilot); heartbeat(); }}>
                            {autopilot ? "Autopilot" : "Manual"}
                        </Button>
                        <Button accent="#60a5fa" onClick={onOpenMap}>
                            Map
                        </Button>
                        <Button accent="#f4d35e" onClick={onToggleWorkspace}>
                            {workspaceOpen ? "Hide workspace" : "Show workspace"}
                        </Button>
                    </div>
                </div>

                <div className="hidden shrink-0 items-center gap-2 lg:flex">
                    {activeContext.metrics.slice(0, 2).map((metric) => (
                        <StatChip key={metric.label} label={metric.label} value={metric.value} accent={activeContext.accent} delta={metric.delta} />
                    ))}
                </div>
            </div>
        </header>
    );
}
