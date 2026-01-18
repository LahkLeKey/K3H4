import { Badge } from "../ui/badge";
import { FieldRow } from "../ui/field-row";
import { HudCard } from "../ui/hud-card";
import { HudToolbar } from "../ui/hud-toolbar";
import { MetricTile } from "../ui/metric-tile";

export type PlotSummary = {
    name: string;
    crop: string;
    stage: string;
    acres: string | number;
    health: string;
    latestCondition: { recordedAt: string } | null | undefined;
};

const formatDate = (value?: string | null) => {
    if (!value) return "—";
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return "—";
    return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(parsed);
};

export function PlotFocusCard({ activePlot }: { activePlot: PlotSummary | undefined }) {
    return (
        <HudCard>
            <HudToolbar justify="between">
                <HudToolbar className="flex-col items-start gap-1 p-0">
                    <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Plot focus</p>
                    <span className="text-lg font-semibold">{activePlot ? activePlot.name : "Select a plot"}</span>
                </HudToolbar>
                {activePlot ? <Badge variant="secondary">{activePlot.crop}</Badge> : null}
            </HudToolbar>
            {activePlot ? (
                <FieldRow columnsClassName="grid-cols-2" className="mt-3 gap-2 text-sm">
                    <MetricTile label="Stage" value={activePlot.stage} />
                    <MetricTile label="Acres" value={activePlot.acres} />
                    <MetricTile label="Health" value={<Badge variant="success">{activePlot.health}</Badge>} />
                    <MetricTile
                        label="Last reading"
                        value={<span className="text-xs text-muted-foreground">{activePlot.latestCondition ? formatDate(activePlot.latestCondition.recordedAt) : "—"}</span>}
                    />
                </FieldRow>
            ) : (
                <p className="mt-3 text-sm text-muted-foreground">Hover or click a plot to pin details.</p>
            )}
        </HudCard>
    );
}
