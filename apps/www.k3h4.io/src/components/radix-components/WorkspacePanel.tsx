import { Tabs } from "../radix-primitives";
import { Badge, Button, Card, Panel, StatChip, Table } from "../ui";
import { useAtlasState } from "../../react-hooks/atlas";
import { FreightBoard } from "./FreightBoard";
import { PersonaBoard } from "./PersonaBoard";
import { StaffingBoard } from "./StaffingBoard";
import { AssignmentBoard } from "./AssignmentBoard";
import { BankBoard } from "./BankBoard";
import { AgricultureBoard } from "./AgricultureBoard";
import { WarehouseBoard } from "./WarehouseBoard";
import { PosBoard } from "./PosBoard";
import { ArcadeBoard } from "./ArcadeBoard";
import { CulinaryBoard } from "./CulinaryBoard";
import { UsdaBoard } from "./UsdaBoard";
import type { AtlasAction, AtlasTimelineEvent, AtlasWorkItem, AtlasStream } from "../../react-hooks/data/atlas";

const statusTone: Record<AtlasWorkItem["status"], string> = {
    ready: "text-emerald-200",
    "in-progress": "text-sky-200",
    blocked: "text-amber-200",
};

function OverviewTab({ summary, metrics, accent }: { summary: string; metrics: { label: string; value: string; delta?: string }[]; accent: string }) {
    return (
        <div className="space-y-4">
            <Card eyebrow="Workspace" title="Overview" actions={<Badge accent={accent}>Live</Badge>}>
                <p className="text-sm text-slate-200/90">{summary}</p>
            </Card>
            <div className="grid gap-2 sm:grid-cols-2">
                {metrics.map((metric) => (
                    <StatChip key={metric.label} label={metric.label} value={metric.value} delta={metric.delta} accent={accent} />
                ))}
            </div>
        </div>
    );
}

function StreamsTab({ streams }: { streams: AtlasStream[] }) {
    return (
        <Table
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
                <Card key={action.label} eyebrow={action.tag?.toUpperCase()} title={action.label} actions={action.cta ? <Button accent="#6cf1d0">{action.cta}</Button> : null}>
                    <p className="text-sm text-slate-200/90">{action.description}</p>
                </Card>
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
                    {item.tone === "positive" ? <Badge accent="#6cf1d0">Clear</Badge> : null}
                    {item.tone === "warn" ? <Badge accent="#f59e0b">Watch</Badge> : null}
                    {item.tone === "info" ? <Badge accent="#60a5fa">Info</Badge> : null}
                </div>
            ))}
        </div>
    );
}

function WorkTab({ work }: { work: AtlasWorkItem[] }) {
    return (
        <Table
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

    if (activeContext.id === "bank") {
        tabs.splice(1, 0, {
            key: "bank",
            label: "Ledger",
            content: <BankBoard />,
        });
    }

    if (activeContext.id === "freight") {
        tabs.splice(1, 0, {
            key: "freight",
            label: "Freight",
            content: <FreightBoard />,
        });
    }

    if (activeContext.id === "agriculture") {
        tabs.splice(1, 0, {
            key: "agri",
            label: "Agri Ops",
            content: <AgricultureBoard />,
        });
    }

    if (activeContext.id === "warehouse") {
        tabs.splice(1, 0, {
            key: "warehouse",
            label: "Warehouse",
            content: <WarehouseBoard />,
        });
    }

    if (activeContext.id === "pos") {
        tabs.splice(1, 0, {
            key: "pos",
            label: "POS",
            content: <PosBoard />,
        });
    }

    if (activeContext.id === "arcade") {
        tabs.splice(1, 0, {
            key: "arcade",
            label: "Arcade",
            content: <ArcadeBoard />,
        });
    }

    if (activeContext.id === "persona") {
        tabs.splice(1, 0, {
            key: "persona",
            label: "Personas",
            content: <PersonaBoard />,
        });
    }

    if (activeContext.id === "laplace") {
        tabs.splice(1, 0, {
            key: "staffing",
            label: "Staffing",
            content: <StaffingBoard />,
        });
        tabs.splice(2, 0, {
            key: "assignments",
            label: "Assignments",
            content: <AssignmentBoard />,
        });
    }

    if (activeContext.id === "culinary") {
        tabs.splice(1, 0, {
            key: "culinary",
            label: "Culinary",
            content: <CulinaryBoard />,
        });
    }

    if (activeContext.id === "usda") {
        tabs.splice(1, 0, {
            key: "usda",
            label: "USDA",
            content: <UsdaBoard />,
        });
    }

    if (!workspaceOpen) {
        return (
            <div className="sticky bottom-24 flex justify-end">
                <Button accent={activeContext.accent} onClick={() => setWorkspaceOpen(true)}>
                    Open workspace
                </Button>
            </div>
        );
    }

    return (
        <div className="relative">
            <Panel title={`${activeContext.glyph ? `${activeContext.glyph} ` : ""}${activeContext.name}`} accent={activeContext.accent} className="w-full rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl">
                <Tabs tabs={tabs} />
            </Panel>
        </div>
    );
}
