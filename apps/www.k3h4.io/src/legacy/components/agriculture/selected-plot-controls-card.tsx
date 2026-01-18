import { Button } from "../ui/button";
import { HudCard } from "../ui/hud-card";
import { HudToolbar } from "../ui/hud-toolbar";

export type SelectedPlotControlsProps = {
    activePlotName?: string;
    onBuySeeds: () => void;
    onSchedule: () => void;
    onRefresh: () => void;
};

export function SelectedPlotControlsCard({ activePlotName, onBuySeeds, onSchedule, onRefresh }: SelectedPlotControlsProps) {
    const disabled = !activePlotName;
    return (
        <HudCard className="flex flex-col gap-3">
            <HudToolbar justify="between">
                <div className="flex flex-col">
                    <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Plot controls</p>
                    <span className="text-sm font-semibold">{activePlotName ?? "Select a plot"}</span>
                </div>
                <Button size="sm" variant="outline" onClick={onRefresh}>Refresh</Button>
            </HudToolbar>
            <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="secondary" onClick={onBuySeeds} disabled={disabled}>Buy seeds</Button>
                <Button size="sm" variant="secondary" onClick={onSchedule} disabled={disabled}>Schedule workers</Button>
            </div>
            {disabled ? <p className="text-xs text-muted-foreground">Pick a plot to enable controls.</p> : null}
        </HudCard>
    );
}
