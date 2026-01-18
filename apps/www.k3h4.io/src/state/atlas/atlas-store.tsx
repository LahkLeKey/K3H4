import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { getZoneById, getZoneIndex, ZONE_REGISTRY } from "./registry";
import type { ZoneDefinition, ZoneId } from "./types";

export type AtlasState = {
    zones: ZoneDefinition[];
    activeZoneId: ZoneId;
    setActiveZone: (id: ZoneId) => void;
    nextZone: () => void;
    prevZone: () => void;
    workspaceOpen: boolean;
    setWorkspaceOpen: (open: boolean) => void;
};

const AtlasContext = createContext<AtlasState | null>(null);

export function AtlasProvider({ children }: { children: ReactNode }) {
    const [activeZoneId, setActiveZoneId] = useState<ZoneId>(ZONE_REGISTRY[0]?.id ?? "bank");
    const [workspaceOpen, setWorkspaceOpen] = useState<boolean>(true);

    const value = useMemo<AtlasState>(() => {
        const setActiveZone = (id: ZoneId) => {
            setActiveZoneId(id);
        };
        const nextZone = () => {
            const idx = getZoneIndex(activeZoneId);
            const next = ZONE_REGISTRY[(idx + 1) % ZONE_REGISTRY.length];
            setActiveZoneId(next.id);
        };
        const prevZone = () => {
            const idx = getZoneIndex(activeZoneId);
            const next = ZONE_REGISTRY[(idx - 1 + ZONE_REGISTRY.length) % ZONE_REGISTRY.length];
            setActiveZoneId(next.id);
        };
        return {
            zones: ZONE_REGISTRY,
            activeZoneId,
            setActiveZone,
            nextZone,
            prevZone,
            workspaceOpen,
            setWorkspaceOpen,
        };
    }, [activeZoneId, workspaceOpen]);

    return <AtlasContext.Provider value={value}>{children}</AtlasContext.Provider>;
}

export function useAtlas() {
    const ctx = useContext(AtlasContext);
    if (!ctx) throw new Error("useAtlas must be used inside AtlasProvider");
    return ctx;
}

export function useActiveZone(): ZoneDefinition {
    const ctx = useAtlas();
    const zone = getZoneById(ctx.activeZoneId) ?? ZONE_REGISTRY[0];
    return zone;
}
