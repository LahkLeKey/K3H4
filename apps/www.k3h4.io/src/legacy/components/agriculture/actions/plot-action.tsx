import { Button } from "../../ui/button";
import { FieldRow } from "../../ui/field-row";
import { FormActions } from "../../ui/form-actions";
import { Input } from "../../ui/input";
import { LabeledField } from "../../ui/labeled-field";

export type PlotActionProps = {
    plotName: string;
    plotCrop: string;
    plotAcres: string;
    plotCost: string;
    busy?: boolean;
    onPlotNameChange: (value: string) => void;
    onPlotCropChange: (value: string) => void;
    onPlotAcresChange: (value: string) => void;
    onPlotCostChange: (value: string) => void;
    onConfirm: () => void;
};

export function PlotActionForm({
    plotName,
    plotCrop,
    plotAcres,
    plotCost,
    busy,
    onPlotNameChange,
    onPlotCropChange,
    onPlotAcresChange,
    onPlotCostChange,
    onConfirm,
}: PlotActionProps) {
    return (
        <FieldRow>
            <LabeledField label="Plot name">
                <Input value={plotName} onChange={(e) => onPlotNameChange(e.target.value)} />
            </LabeledField>
            <LabeledField label="Crop">
                <Input value={plotCrop} onChange={(e) => onPlotCropChange(e.target.value)} />
            </LabeledField>
            <LabeledField label="Acres">
                <Input type="number" value={plotAcres} onChange={(e) => onPlotAcresChange(e.target.value)} />
            </LabeledField>
            <LabeledField label="Cost (coin)">
                <Input type="number" value={plotCost} onChange={(e) => onPlotCostChange(e.target.value)} />
            </LabeledField>
            <FormActions note="Creates plot and debits K3H4 coin.">
                <Button size="sm" onClick={onConfirm} disabled={busy}>Confirm plot purchase</Button>
            </FormActions>
        </FieldRow>
    );
}
