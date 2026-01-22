import { Select } from "../@/radix-primitives";
import { Button, FormField, Grid, Input, Pill, Stack, Surface } from "../@/components/ui";
import type { PersonaConfusionResult } from "../@/zustand-stores/persona";
import type { PairRow } from "../@/zustand-stores/persona-dashboard";
import { ConfusionSummary } from "./ConfusionSummary";

export type PersonaOption = { value: string; label: string };

export type PersonaQualityTabProps = {
    threshold: number;
    modelPath: string;
    pairRows: PairRow[];
    personaOptions: PersonaOption[];
    confusion: PersonaConfusionResult | null;
    confusionStatus: "idle" | "loading" | "ready" | "error";
    confusionError: string | null;
    validPairs: PairRow[];
    onThresholdChange: (value: number) => void;
    onModelPathChange: (value: string) => void;
    onRunConfusion: () => void;
    onAddPair: () => void;
    onUpdatePairRow: (id: string, updates: Partial<PairRow>) => void;
};

export function PersonaQualityTab({
    threshold,
    modelPath,
    pairRows,
    personaOptions,
    confusion,
    confusionStatus,
    confusionError,
    validPairs,
    onThresholdChange,
    onModelPathChange,
    onRunConfusion,
    onAddPair,
    onUpdatePairRow,
}: PersonaQualityTabProps) {
    return (
        <Stack gap="md">
            <Grid gap="md" lgCols={3}>
                <Stack gap="sm">
                    <FormField label="Threshold (0-1)">
                        <Input
                            type="number"
                            min={0}
                            max={1}
                            step={0.01}
                            value={threshold}
                            onChange={(e) => onThresholdChange(Number(e.target.value))}
                        />
                    </FormField>
                    <FormField label="ONNX model path" hint="Optional">
                        <Input
                            placeholder="Optional ONNX model path"
                            value={modelPath}
                            onChange={(e) => onModelPathChange(e.target.value)}
                        />
                    </FormField>
                    <Button accent="#e11d48" onClick={onRunConfusion} disabled={confusionStatus === "loading" || validPairs.length === 0}>
                        {confusionStatus === "loading" ? "Scoring..." : "Run confusion"}
                    </Button>
                    {confusionError ? <div className="text-xs text-amber-300">{confusionError}</div> : null}
                    {validPairs.length === 0 ? <div className="text-xs text-slate-400">Add at least one labeled pair.</div> : null}
                </Stack>
                <Stack gap="sm" className="lg:col-span-2">
                    <Stack direction="row" justify="between" align="center">
                        <span className="text-xs text-slate-400">Pairs ({pairRows.length})</span>
                        <Button
                            variant="subtle"
                            accent="#94a3b8"
                            className="px-3 py-1 text-[11px]"
                            onClick={onAddPair}
                        >
                            Add pair
                        </Button>
                    </Stack>
                    <Stack gap="sm">
                        {pairRows.map((row) => (
                            <Surface key={row.id} radius="xl" padding="sm" className="grid grid-cols-5 items-center gap-2 text-sm text-white">
                                <Select
                                    value={row.sourceId || ""}
                                    onChange={(e) => onUpdatePairRow(row.id, { sourceId: e.target.value })}
                                    className="col-span-2"
                                >
                                    <option value="">Source</option>
                                    {personaOptions.map((opt) => (
                                        <option key={`s-${opt.value}`} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </Select>
                                <Select
                                    value={row.targetId || ""}
                                    onChange={(e) => onUpdatePairRow(row.id, { targetId: e.target.value })}
                                    className="col-span-2"
                                >
                                    <option value="">Target</option>
                                    {personaOptions.map((opt) => (
                                        <option key={`t-${opt.value}`} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </Select>
                                <label className="flex items-center gap-2 text-xs text-slate-200">
                                    <input
                                        type="checkbox"
                                        checked={row.label}
                                        onChange={(e) => onUpdatePairRow(row.id, { label: e.target.checked })}
                                    />
                                    Match
                                </label>
                            </Surface>
                        ))}
                    </Stack>
                </Stack>
            </Grid>
            {confusion ? (
                <Stack gap="sm">
                    <ConfusionSummary result={confusion} />
                    <Surface radius="xl" padding="md" className="text-xs text-slate-200">
                        <Stack direction="row" align="center" gap="sm" className="text-[11px]">
                            <Pill tone="slate">TP {confusion.counts.tp}</Pill>
                            <Pill tone="slate">FP {confusion.counts.fp}</Pill>
                            <Pill tone="slate">TN {confusion.counts.tn}</Pill>
                            <Pill tone="slate">FN {confusion.counts.fn}</Pill>
                            <Pill tone="slate">Threshold {confusion.threshold}</Pill>
                            <Pill tone="slate">Missing {confusion.missing}</Pill>
                        </Stack>
                    </Surface>
                </Stack>
            ) : null}
        </Stack>
    );
}
