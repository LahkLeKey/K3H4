import { Badge } from "../ui/badge";
import { FieldRow } from "../ui/field-row";
import { HudCard } from "../ui/hud-card";
import { HudChip } from "../ui/hud-chip";
import { HudToolbar } from "../ui/hud-toolbar";
import { MetricTile } from "../ui/metric-tile";

export type AnalyticsPulseProps = {
    planPhases: Array<[string, number]>;
    taskStatusCounts: Array<[string, number]>;
};

export function AnalyticsPulseCard({ planPhases, taskStatusCounts }: AnalyticsPulseProps) {
    return (
        <HudCard>
            <HudToolbar justify="between">
                <HudChip tone="outline" className="text-sm font-semibold">Analytics pulse</HudChip>
                <Badge variant="outline">Live</Badge>
            </HudToolbar>
            <FieldRow columnsClassName="grid-cols-1" className="mt-3 gap-2 text-sm">
                {planPhases.length ? planPhases.map(([phase, count]) => (
                    <MetricTile key={phase} label={phase} value={count} />
                )) : <span className="text-muted-foreground">No plan phases yet.</span>}
                {taskStatusCounts.length ? taskStatusCounts.map(([status, count]) => (
                    <MetricTile key={status} label={status} value={count} />
                )) : null}
            </FieldRow>
        </HudCard>
    );
}
