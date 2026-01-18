import { Badge2D, Button2D, Card2D, Panel2D, StatChip2D, Table2D, Tabs2D } from "./ui/2d";
import { useAtlasState } from "../state/atlas";
import type { AtlasAction, AtlasTimelineEvent, AtlasWorkItem, AtlasStream } from "../data/atlas";

const statusTone: Record<AtlasWorkItem["status"], string> = {
    ready: "text-emerald-200",
    "in-progress": "text-sky-200",
    blocked: "text-amber-200",
};

function OverviewTab({ summary, metrics, accent }: { summary: string; metrics: { label: string; value: string; delta?: string }[]; accent: string }) {
    return (
        <div className="space-y-4">
            <Card2D eyebrow="Workspace" title="Overview" actions={<Badge2D accent={accent}>Live</Badge2D>}>
                <p className="text-sm text-slate-200/90">{summary}</p>
            </Card2D>
            <div className="grid gap-2 sm:grid-cols-2">
                {metrics.map((metric) => (
                    <StatChip2D key={metric.label} label={metric.label} value={metric.value} delta={metric.delta} accent={accent} />
                ))}
            </div>
        </div>
    );
}

function StreamsTab({ streams }: { streams: AtlasStream[] }) {
    return (
        <Table2D
            columns={[
                { key: "label", label: "Stream" },
                { key: "status", label: "Status" },
                { key: "volume", label: "Volume" },
                { key: "window", label: "Window" },
            ]}
            rows={streams}
            rowKey={(row) => row.label}
        />
    );
}

function ActionsTab({ actions }: { actions: AtlasAction[] }) {
    return (
        <div className="grid gap-3">
            {actions.map((action) => (
                <Card2D key={action.label} eyebrow={action.tag?.toUpperCase()} title={action.label} actions={action.cta ? <Button2D accent="#6cf1d0">{action.cta}</Button2D> : null}>
                    <p className="text-sm text-slate-200/90">{action.description}</p>
                </Card2D>
            ))}
        </div>
    );
}

function TimelineTab({ timeline }: { timeline: AtlasTimelineEvent[] }) {
    return (
        <div className="flex flex-col gap-3">
            {timeline.map((item) => (
                <div key={`${item.at}-${item.title}`} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">{item.at}</span>
                    <div className="flex flex-col gap-1 text-sm text-slate-100">
                        <span className="font-semibold">{item.title}</span>
                        <span className="text-slate-300">{item.detail}</span>
                    </div>
                    {item.tone === "positive" ? <Badge2D accent="#6cf1d0">Clear</Badge2D> : null}
                    {item.tone === "warn" ? <Badge2D accent="#f59e0b">Watch</Badge2D> : null}
                    {item.tone === "info" ? <Badge2D accent="#60a5fa">Info</Badge2D> : null}
                </div>
            ))}
        </div>
    );
}

function WorkTab({ work }: { work: AtlasWorkItem[] }) {
    return (
        <Table2D
            columns={[
                { key: "title", label: "Item" },
                { key: "owner", label: "Owner" },
                {
                    key: "status",
                    label: "Status",
                    render: (row) => <span className={`font-semibold ${statusTone[row.status]}`}>{row.status}</span>,
                },
                { key: "eta", label: "ETA" },
            ]}
            rows={work}
            rowKey={(row, idx) => `${row.title}-${idx}`}
        />
    );
}

export function WorkspacePanel() {
    const { activeContext, workspaceOpen, setWorkspaceOpen } = useAtlasState();

    const tabs = [
        {
            key: "overview",
            label: "Overview",
            content: <OverviewTab summary={activeContext.summary} metrics={activeContext.metrics} accent={activeContext.accent} />,
        },
        {
            key: "streams",
            label: "Streams",
            content: <StreamsTab streams={activeContext.streams} />,
        },
        {
            key: "actions",
            label: "Actions",
            content: <ActionsTab actions={activeContext.actions} />,
        },
        {
            key: "timeline",
            label: "Timeline",
            content: <TimelineTab timeline={activeContext.timeline} />,
        },
        {
            key: "work",
            label: "Work",
            content: <WorkTab work={activeContext.work} />,
        },
    ];

    if (!workspaceOpen) {
        return (
            <div className="sticky bottom-24 flex justify-end">
                <Button2D accent={activeContext.accent} onClick={() => setWorkspaceOpen(true)}>
                    Open workspace
                </Button2D>
            </div>
        );
    }

    return (
        <div className="relative">
            <Panel2D title={`${activeContext.glyph ? `${activeContext.glyph} ` : ""}${activeContext.name}`} accent={activeContext.accent} className="w-full rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl">
                <Tabs2D tabs={tabs} />
            </Panel2D>
        </div>
    );
}
