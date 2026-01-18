import { useMemo, useState } from "react";

import { AtlasCanvas } from "./AtlasCanvas";
import { AtlasTopBar } from "../hud/AtlasTopBar";
import { AtlasCommandSurface } from "../hud/AtlasCommandSurface";
import { WorkspacePanel } from "../workspaces/WorkspacePanel";
import { WorldMapOverlay } from "../shell/world-map-overlay";
import { AtlasProvider, useAtlas } from "../../state/atlas/atlas-store";

export type AtlasRootProps = {
    userEmail: string | null;
    profileAvatar?: string | null;
    onSignOut?: () => void;
};

function AtlasShell({ userEmail, profileAvatar, onSignOut }: AtlasRootProps) {
    const { zones, activeZoneId, setActiveZone, workspaceOpen, setWorkspaceOpen } = useAtlas();
    const activeZone = useMemo(() => zones.find((z) => z.id === activeZoneId) ?? zones[0], [activeZoneId, zones]);
    const [mapOpen, setMapOpen] = useState(false);

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
            <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_16%_18%,rgba(88,224,196,0.16),transparent_34%),radial-gradient(circle_at_84%_18%,rgba(120,178,255,0.14),transparent_30%),radial-gradient(circle_at_46%_82%,rgba(251,146,60,0.16),transparent_34%)]" aria-hidden />
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_32%,rgba(255,255,255,0.05)_62%,rgba(255,255,255,0)_100%)]" aria-hidden />

            <AtlasCanvas />
            <div className="relative z-10 flex min-h-screen flex-col">
                <AtlasTopBar
                    userEmail={userEmail}
                    profileAvatar={profileAvatar}
                    onSignOut={onSignOut}
                    onOpenMap={() => setMapOpen(true)}
                />
                <div className="flex-1" />
                <div className="relative z-10 flex-1">
                    <div className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-36 pt-28 md:grid md:grid-cols-[minmax(0,1fr)_minmax(320px,38vw)] md:items-start md:gap-6 md:pt-32">
                        <div className="hidden md:block" />
                        <WorkspacePanel open={workspaceOpen} onClose={() => setWorkspaceOpen(false)} />
                    </div>
                </div>
                <AtlasCommandSurface onOpenMap={() => setMapOpen(true)} onToggleWorkspace={() => setWorkspaceOpen((prev) => !prev)} workspaceOpen={workspaceOpen} />
            </div>

            <WorldMapOverlay
                open={mapOpen}
                nodes={zones.map((z) => ({ id: z.id, label: z.label, description: z.description, accent: z.accent, glyph: z.glyph, anchor: z.anchor }))}
                activeKey={activeZone.id}
                onSelect={(id) => {
                    setActiveZone(id);
                    setWorkspaceOpen(true);
                    setMapOpen(false);
                }}
                onClose={() => setMapOpen(false)}
            />
        </div>
    );
}

export function AtlasRoot(props: AtlasRootProps) {
    return (
        <AtlasProvider>
            <AtlasShell {...props} />
        </AtlasProvider>
    );
}
