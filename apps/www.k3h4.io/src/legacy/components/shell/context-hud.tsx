import type { ReactNode } from "react";
import { PanelRightOpen } from "lucide-react";

import { Button } from "../ui/button";
import type { HudChip, WorldNode } from "./immersive-world";

export type ContextHudProps = {
    module: WorldNode;
    userEmail: string | null;
    authMessage: string;
    panelOpen: boolean;
    onTogglePanel: () => void;
    enteringLabel: string | null;
};

export function ContextHud({ module, userEmail, authMessage, panelOpen, onTogglePanel, enteringLabel }: ContextHudProps) {
    const sessionLabel = userEmail ? `Signed in as ${userEmail}` : authMessage || "Guest session";
    const chips: HudChip[] = module.hudChips && module.hudChips.length > 0 ? module.hudChips : [
        { label: "Status", value: "Live", tone: "info" },
    ];

    return (
        <div className="pointer-events-auto flex w-full max-w-3xl flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 shadow-xl backdrop-blur-xl">
            <div className="flex flex-wrap items-center gap-2">
                <HudPill label="Context" value={module.glyph ? `${module.glyph} ${module.label}` : module.label} tone="info" accent={module.accent} />
                {chips.map((chip) => (
                    <HudPill key={`${module.key}-${chip.label}`} label={chip.label} value={chip.value} tone={chip.tone} />
                ))}
                <HudPill label="Session" value={sessionLabel} tone={userEmail ? "positive" : "neutral"} />
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-200">
                    <PanelRightOpen className="h-3.5 w-3.5 text-slate-300" />
                    {enteringLabel ? `Entering: ${enteringLabel}` : module.description}
                </span>
                <Button variant="secondary" size="sm" onClick={onTogglePanel} className="gap-2 rounded-full border border-white/10 bg-white/10 text-[12px] text-white">
                    {panelOpen ? "Hide panel" : "Show panel"}
                </Button>
            </div>
        </div>
    );
}

export type HudPillProps = {
    label: string;
    value: string;
    tone?: "neutral" | "info" | "positive" | "warning";
    accent?: string;
};

export function HudPill({ label, value, tone = "neutral", accent }: HudPillProps) {
    const toneStyles = {
        neutral: "border-white/12 bg-white/5 text-slate-200",
        info: "border-sky-300/25 bg-sky-500/10 text-sky-100",
        positive: "border-emerald-300/25 bg-emerald-500/10 text-emerald-100",
        warning: "border-amber-300/25 bg-amber-500/10 text-amber-100",
    } as const;
    const dot = accent ?? (tone === "warning" ? "#fbbf24" : tone === "positive" ? "#34d399" : tone === "info" ? "#60a5fa" : "#94a3b8");
    return (
        <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${toneStyles[tone]}`}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: dot }} />
            <span className="text-[10px] text-white/90">{label}</span>
            <span className="text-xs font-semibold text-white normal-case tracking-normal">{value}</span>
        </div>
    );
}
