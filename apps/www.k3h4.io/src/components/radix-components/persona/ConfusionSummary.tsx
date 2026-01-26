import type { PersonaConfusionResult } from "../../../zustand-stores/persona";
import { Grid, StatChip } from "../../ui";
import { formatNumber } from "./formatNumber";

export function ConfusionSummary({ result }: { result: PersonaConfusionResult }) {
    return (
        <Grid gap="sm" smCols={3} lgCols={5}>
            <StatChip label="Accuracy" value={`${(result.metrics.accuracy * 100).toFixed(1)}%`} accent="#22d3ee" />
            <StatChip label="Precision" value={`${(result.metrics.precision * 100).toFixed(1)}%`} accent="#a78bfa" />
            <StatChip label="Recall" value={`${(result.metrics.recall * 100).toFixed(1)}%`} accent="#f59e0b" />
            <StatChip label="F1" value={`${(result.metrics.f1 * 100).toFixed(1)}%`} accent="#4ade80" />
            <StatChip label="Evaluated" value={formatNumber(result.evaluated)} accent="#f472b6" />
        </Grid>
    );
}
