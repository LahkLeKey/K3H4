import { AtlasHud } from "./AtlasHud";
import { AtlasMapDialog } from "./AtlasMapDialog";
import { CommandStrip } from "./CommandStrip";
import { WorkspacePanel } from "./WorkspacePanel";
import { Badge, Card, StatChip } from "../radix-primitives";
import { useAtlasState } from "../react-hooks/atlas";

function SignalBoard() {
    const { activeContext } = useAtlasState();
    return (
        <div className="space-y-3">
            <Card eyebrow="Context" title={activeContext.name} actions={<Badge accent={activeContext.accent}>Live</Badge>}>
                <p className="text-sm text-slate-200/90">{activeContext.summary}</p>
            </Card>

            <div className="grid gap-2 md:grid-cols-3">
                {activeContext.metrics.map((metric) => (
                    <StatChip key={metric.label} label={metric.label} value={metric.value} delta={metric.delta} accent={activeContext.accent} />
                ))}
            </div>

            <Card eyebrow="Streams" title="Live feeds">
                <div className="grid gap-2 sm:grid-cols-2">
                    {activeContext.streams.map((stream) => (
                        <div key={stream.label} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                                <span className="h-2 w-2 rounded-full" style={{ background: stream.accent ?? activeContext.accent }} />
                                {stream.label}
                            </div>
                            <div className="text-sm font-semibold text-white">{stream.volume}</div>
                            <div className="text-xs text-slate-400">{stream.status} • {stream.window}</div>
                        </div>
                    ))}
                </div>
            </Card>

            <Card eyebrow="Pulse" title="Latest signals">
                <div className="flex flex-col gap-2">
                    {activeContext.timeline.map((item) => (
                        <div key={`${item.at}-${item.title}`} className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{item.at}</span>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-white">{item.title}</span>
                                <span className="text-xs text-slate-300">{item.detail}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

function AtlasShell() {
    const { mapOpen, setMapOpen, setWorkspaceOpen, workspaceOpen } = useAtlasState();

    return (
        <div className="pointer-events-none relative min-h-screen overflow-hidden text-slate-50">
            <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-b from-slate-950/70 via-slate-950/45 to-slate-950/75 backdrop-blur" aria-hidden />
            <AtlasHud onOpenMap={() => setMapOpen(true)} onToggleWorkspace={() => setWorkspaceOpen(!workspaceOpen)} />

            <main className="pointer-events-auto relative z-10 mx-auto grid w-full max-w-6xl gap-6 rounded-[32px] border border-white/10 bg-slate-950/65 px-4 pb-28 pt-28 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur lg:grid-cols-[1.05fr_0.95fr]">
                <SignalBoard />
                <WorkspacePanel />
            </main>

            <CommandStrip onOpenMap={() => setMapOpen(true)} onToggleWorkspace={() => setWorkspaceOpen(!workspaceOpen)} />
            <AtlasMapDialog open={mapOpen} onClose={() => setMapOpen(false)} />
        </div>
    );
}

export function AtlasExperience() {
    return <AtlasShell />;
}
