import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { atlasContexts, type AtlasContext } from "../data/atlas";

type AtlasState = {
    contexts: AtlasContext[];
    activeId: string;
    activeContext: AtlasContext;
    setActiveId: (id: string) => void;
    selectNext: () => void;
    selectPrev: () => void;
    workspaceOpen: boolean;
    setWorkspaceOpen: (open: boolean) => void;
    mapOpen: boolean;
    setMapOpen: (open: boolean) => void;
};

const AtlasContextState = createContext<AtlasState | null>(null);

export function AtlasProvider({ children }: { children: ReactNode }) {
    const [activeId, setActiveId] = useState<string>(atlasContexts[0]?.id ?? "bank");
    const [workspaceOpen, setWorkspaceOpen] = useState<boolean>(true);
    const [mapOpen, setMapOpen] = useState<boolean>(false);

    const value = useMemo<AtlasState>(() => {
        const activeContext = atlasContexts.find((ctx) => ctx.id === activeId) ?? atlasContexts[0];
        const selectNext = () => {
            const idx = atlasContexts.findIndex((ctx) => ctx.id === activeId);
            const next = atlasContexts[(idx + 1) % atlasContexts.length];
            setActiveId(next.id);
        };
        const selectPrev = () => {
            const idx = atlasContexts.findIndex((ctx) => ctx.id === activeId);
            const prev = atlasContexts[(idx - 1 + atlasContexts.length) % atlasContexts.length];
            setActiveId(prev.id);
        };
        return {
            contexts: atlasContexts,
            activeId,
            activeContext,
            setActiveId,
            selectNext,
            selectPrev,
            workspaceOpen,
            setWorkspaceOpen,
            mapOpen,
            setMapOpen,
        };
    }, [activeId, workspaceOpen, mapOpen]);

    return <AtlasContextState.Provider value={value}>{children}</AtlasContextState.Provider>;
}

export function useAtlasState() {
    const state = useContext(AtlasContextState);
    if (!state) throw new Error("useAtlasState must be used inside AtlasProvider");
    return state;
}
