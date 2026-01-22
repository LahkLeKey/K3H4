import type { PersonaCompatibility } from "../@/zustand-stores/persona";
import { Badge, Button, Card, Grid, Histogram, MetricTile, SectionHeader, Stack, Surface } from "../@/components/ui";
import { CompatibilityRow } from "./CompatibilityRow";

export type KPI = { label: string; value: string; hint: string; trend?: number[]; accent: string };

export type PersonaOverviewTabProps = {
    authed: boolean;
    statusText: string;
    compatText: string;
    kpis: KPI[];
    compatBins: number[];
    compatTop: PersonaCompatibility[];
    compatibilities: PersonaCompatibility[];
    generateCount: number;
    seeding: boolean;
    status: "idle" | "loading" | "ready" | "error";
    compatStatus: "idle" | "loading" | "ready" | "error";
    onRefresh: () => void;
    onGenerate: () => Promise<void> | void;
    onRecompute: () => Promise<void> | void;
};

export function PersonaOverviewTab({
    authed,
    statusText,
    compatText,
    kpis,
    compatBins,
    compatTop,
    compatibilities,
    generateCount,
    seeding,
    status,
    compatStatus,
    onRefresh,
    onGenerate,
    onRecompute,
}: PersonaOverviewTabProps) {
    return (
        <Stack gap="md">
            <SectionHeader
                kicker="Persona"
                title="Persona dashboard"
                description="Roster, compatibility pairs, and quality signals."
                status={`Auth: ${authed ? "ready" : "sign in"} · ${statusText} · Compat ${compatText}`}
                actions={(
                    <Stack direction="row" align="center" gap="sm">
                        <Button accent="#22d3ee" variant="outline" onClick={onRefresh} disabled={status === "loading"}>
                            {status === "loading" ? "Refreshing..." : "Refresh"}
                        </Button>
                        <Button accent="#a78bfa" variant="outline" onClick={onGenerate} disabled={seeding}>
                            {seeding ? "Seeding..." : `Generate ${generateCount}`}
                        </Button>
                        <Button accent="#f59e0b" variant="outline" onClick={onRecompute} disabled={compatStatus === "loading"}>
                            {compatStatus === "loading" ? "Recomputing..." : "Recompute"}
                        </Button>
                    </Stack>
                )}
            />

            <Grid gap="md" smCols={2} lgCols={4}>
                {kpis.map((kpi) => (
                    <MetricTile key={kpi.label} label={kpi.label} value={kpi.value} hint={kpi.hint} accent={kpi.accent} trend={kpi.trend} />
                ))}
            </Grid>

            <Card eyebrow="Compatibility" title="Score distribution" actions={<Badge accent="#0ea5e9">Jaccard + ONNX</Badge>}>
                <Histogram bins={compatBins} labels={["0-0.2", "0.2-0.4", "0.4-0.6", "0.6-0.8", "0.8-1.0"]} footer={`Pairs: ${compatibilities.length}`} />
                <Stack gap="sm" className="mt-3">
                    {compatTop.length === 0 ? (
                        <Surface radius="xl" padding="md" className="text-sm text-slate-200">No compatibility rows yet.</Surface>
                    ) : (
                        compatTop.map((compat) => <CompatibilityRow key={compat.id} compat={compat} />)
                    )}
                </Stack>
            </Card>
        </Stack>
    );
}
