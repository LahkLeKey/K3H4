import { type ReactNode } from "react";

import { Button } from "../ui/button";
import { HudChip } from "../ui/hud-chip";
import { HudToolbar } from "../ui/hud-toolbar";

export type AgricultureOverlayProps = {
    plotCount: number;
    balance: number | string | null;
    actionOverlay: ReactNode;
    footerOverlay: ReactNode;
    onAddPlot: () => void;
    onBuySeeds: () => void;
    onSchedule: () => void;
    onRefresh: () => void;
};

export function AgricultureOverlay({ plotCount, balance, actionOverlay, footerOverlay, onAddPlot, onBuySeeds, onSchedule, onRefresh }: AgricultureOverlayProps) {
    return (
        <div className="pointer-events-none absolute inset-0">
            <div className="pointer-events-auto absolute left-4 top-4 flex flex-col gap-3">
                <HudToolbar className="backdrop-blur">
                    <HudChip>Plots {plotCount ?? "—"}</HudChip>
                    <HudChip tone="outline">Balance {balance ?? "—"}</HudChip>
                </HudToolbar>
            </div>

            <div className="pointer-events-auto absolute right-4 top-4 flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={onRefresh}>Refresh</Button>
            </div>

            <div className="pointer-events-auto absolute right-4 top-20 flex max-h-[calc(100%-8rem)] w-[380px] flex-col gap-3 overflow-auto rounded-2xl bg-background/80 p-3 shadow-xl backdrop-blur">
                {actionOverlay}
            </div>

            <div className="pointer-events-auto absolute left-1/2 bottom-6 flex -translate-x-1/2 gap-2 rounded-full bg-background/90 px-4 py-2 text-sm font-semibold shadow backdrop-blur">
                <Button size="sm" variant="secondary" onClick={onAddPlot}>Add plot</Button>
                <Button size="sm" variant="secondary" onClick={onBuySeeds}>Buy seeds</Button>
                <Button size="sm" variant="secondary" onClick={onSchedule}>Schedule workers</Button>
                <Button size="sm" variant="outline" onClick={onRefresh}>Refresh</Button>
            </div>

            <div className="pointer-events-auto absolute left-4 bottom-4 flex max-w-[480px] flex-col gap-3 rounded-2xl bg-background/80 p-3 shadow-xl backdrop-blur">
                {footerOverlay}
            </div>
        </div>
    );
}
