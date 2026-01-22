import { Select } from "../@/radix-primitives";
import { Button, FormField, Grid, Pill, Stack, Textarea } from "../@/components/ui";

export type PersonaOption = { value: string; label: string };

export type PersonaAttributesTabProps = {
    personaOptions: PersonaOption[];
    selectedPersonaId?: string;
    attributesInput: string;
    parsedAttributes: { category: string; values: string[]; weight?: number }[];
    onSelectPersona: (id: string) => void;
    onAttributesChange: (value: string) => void;
    onSave: () => void;
};

export function PersonaAttributesTab({
    personaOptions,
    selectedPersonaId,
    attributesInput,
    parsedAttributes,
    onSelectPersona,
    onAttributesChange,
    onSave,
}: PersonaAttributesTabProps) {
    return (
        <Grid gap="md" mdCols={3}>
            <Stack gap="sm">
                <FormField label="Persona" hint="Replace all attributes for the selected persona.">
                    <Select value={selectedPersonaId || ""} onChange={(e) => onSelectPersona(e.target.value)}>
                        <option value="" disabled>
                            Select persona
                        </option>
                        {personaOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </Select>
                </FormField>
                <Button accent="#f59e0b" onClick={onSave} disabled={!selectedPersonaId || parsedAttributes.length === 0}>
                    Save attributes
                </Button>
            </Stack>
            <Stack gap="sm" className="md:col-span-2">
                <FormField label="Attributes" hint="Format: category: value1, value2 | weight=1">
                    <Textarea
                        rows={6}
                        value={attributesInput}
                        onChange={(e) => onAttributesChange(e.target.value)}
                        placeholder="category: value1, value2 | weight=1"
                    />
                </FormField>
                <Stack direction="row" gap="xs" className="text-xs text-slate-300">
                    <Pill tone="slate">Parsed {parsedAttributes.length} entries</Pill>
                    {parsedAttributes.map((attr, idx) => (
                        <Pill key={`${attr.category}-${idx}`} tone="slate" className="normal-case tracking-normal">
                            {attr.category}: {attr.values.join("/")}
                            {attr.weight ? ` (w${attr.weight})` : ""}
                        </Pill>
                    ))}
                </Stack>
            </Stack>
        </Grid>
    );
}
