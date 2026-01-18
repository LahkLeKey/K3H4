import { Alert2D } from "@/components/ui/2d";
import { Button } from "../../ui/button";
import { FieldRow } from "../../ui/field-row";
import { FormActions } from "../../ui/form-actions";
import { HudSelect } from "../../ui/hud-select";
import { Input } from "../../ui/input";
import { LabeledField } from "../../ui/labeled-field";

export type SeedOption = {
    label: string;
    code: string;
};

export type SeedsActionProps = {
    seedOptions: SeedOption[];
    seedCommodity: string;
    seedCost: string;
    busy?: boolean;
    onSeedCommodityChange: (value: string) => void;
    onSeedCostChange: (value: string) => void;
    onConfirm: () => void;
};

export function SeedsActionForm({
    seedOptions,
    seedCommodity,
    seedCost,
    busy,
    onSeedCommodityChange,
    onSeedCostChange,
    onConfirm,
}: SeedsActionProps) {
    const selectedLabel = seedOptions.find((item) => item.code === seedCommodity)?.label;
    const preview = seedCommodity ? selectedLabel || "Custom seed" : "Pick a USDA commodity to buy.";

    return (
        <FieldRow>
            <LabeledField label="Commodity" className="sm:col-span-2">
                <HudSelect value={seedCommodity} onChange={(e) => onSeedCommodityChange(e.target.value)}>
                    <option value="">Select commodity</option>
                    {seedOptions.map((item) => (
                        <option key={item.code || item.label} value={item.code}>{item.label}</option>
                    ))}
                </HudSelect>
            </LabeledField>
            <LabeledField label="Cost (coin)">
                <Input type="number" value={seedCost} onChange={(e) => onSeedCostChange(e.target.value)} />
            </LabeledField>
            <LabeledField label="Preview">
                <Alert2D className="border-dashed bg-background/70" description={preview} tone="info" />
            </LabeledField>
            <FormActions note="Debits coin and opens USDA signals.">
                <Button size="sm" onClick={onConfirm} disabled={!seedCommodity || busy}>Purchase seeds</Button>
            </FormActions>
        </FieldRow>
    );
}
