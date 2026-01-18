import { AtlasScene } from "./AtlasScene";
import { AtlasHud } from "./AtlasHud";
import { AtlasMapDialog } from "./AtlasMapDialog";
import { CommandStrip } from "./CommandStrip";
import { WorkspacePanel } from "./WorkspacePanel";
import { Badge2D, Card2D, StatChip2D } from "./ui/2d";
import { AtlasProvider, useAtlasState } from "../state/atlas";

function SignalBoard() {
    const { activeContext } = useAtlasState();
    return (
        <div className="space-y-3">
            <Card2D eyebrow="Context" title={activeContext.name} actions={<Badge2D accent={activeContext.accent}>Live</Badge2D>}>
                <p className="text-sm text-slate-200/90">{activeContext.summary}</p>
            </Card2D>

            <div className="grid gap-2 md:grid-cols-3">
                {activeContext.metrics.map((metric) => (
                    <StatChip2D key={metric.label} label={metric.label} value={metric.value} delta={metric.delta} accent={activeContext.accent} />
                ))}
            </div>

            <Card2D eyebrow="Streams" title="Live feeds">
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
            </Card2D>

            <Card2D eyebrow="Pulse" title="Latest signals">
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
            </Card2D>
        </div>
    );
}

function AtlasShell() {
    const { mapOpen, setMapOpen, setWorkspaceOpen, workspaceOpen } = useAtlasState();

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
            <div
                className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,rgba(124,252,238,0.12),transparent_32%),radial-gradient(circle_at_82%_16%,rgba(148,196,255,0.12),transparent_34%),radial-gradient(circle_at_46%_82%,rgba(251,191,36,0.12),transparent_36%)]"
                aria-hidden
            />
            <AtlasScene />
            <AtlasHud onOpenMap={() => setMapOpen(true)} onToggleWorkspace={() => setWorkspaceOpen(!workspaceOpen)} />

            <main className="relative z-10 mx-auto grid w-full max-w-6xl gap-6 px-4 pb-28 pt-28 lg:grid-cols-[1.05fr_0.95fr]">
                <SignalBoard />
                <WorkspacePanel />
            </main>

            <CommandStrip onOpenMap={() => setMapOpen(true)} onToggleWorkspace={() => setWorkspaceOpen(!workspaceOpen)} />
            <AtlasMapDialog open={mapOpen} onClose={() => setMapOpen(false)} />
        </div>
    );
}

export function AtlasExperience() {
    return (
        <AtlasProvider>
            <AtlasShell />
        </AtlasProvider>
    );
}
