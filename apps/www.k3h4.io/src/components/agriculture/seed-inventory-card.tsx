import { useMemo } from "react";

import { Button } from "../ui/button";
import { HudCard } from "../ui/hud-card";
import { HudToolbar } from "../ui/hud-toolbar";

export type SeedInventoryItem = {
    code: string;
    label: string;
    quantity: number;
};

export type SeedInventoryCardProps = {
    items: SeedInventoryItem[];
    selectedCode: string;
    onSelect: (code: string) => void;
    onApplyToPlot: () => void;
    disabled?: boolean;
};

export function SeedInventoryCard({ items, selectedCode, onSelect, onApplyToPlot, disabled }: SeedInventoryCardProps) {
    const selectedQuantity = useMemo(() => items.find((item) => item.code === selectedCode)?.quantity ?? 0, [items, selectedCode]);
    return (
        <HudCard className="flex flex-col gap-3">
            <HudToolbar justify="between">
                <div className="flex flex-col">
                    <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Seed inventory</p>
                    <span className="text-sm font-semibold">{selectedCode || "Pick a seed"}</span>
                </div>
                <Button size="sm" variant="outline" onClick={onApplyToPlot} disabled={disabled || !selectedCode || selectedQuantity <= 0}>Apply to plot</Button>
            </HudToolbar>
            <div className="flex flex-col gap-2">
                <select
                    value={selectedCode}
                    onChange={(e) => onSelect(e.target.value)}
                    className="w-full rounded-lg border border-muted bg-background px-3 py-2 text-sm"
                >
                    <option value="">Select seed</option>
                    {items.map((item) => (
                        <option key={item.code} value={item.code}>
                            {item.label} · {item.quantity} in storage
                        </option>
                    ))}
                </select>
                {selectedCode ? (
                    <p className="text-xs text-muted-foreground">{selectedQuantity} units available. Applying will decrement inventory.</p>
                ) : (
                    <p className="text-xs text-muted-foreground">Choose a seed to plant onto the active plot.</p>
                )}
            </div>
        </HudCard>
    );
}
