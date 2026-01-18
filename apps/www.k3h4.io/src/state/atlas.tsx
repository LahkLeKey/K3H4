import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

import { atlasContexts, type AtlasContext } from "../data/atlas";

type AtlasState = {
    contexts: AtlasContext[];
    activeId: string;
    activeContext: AtlasContext;
    setActiveId: (id: string, options?: { manual?: boolean }) => void;
    selectNext: (options?: { manual?: boolean }) => void;
    selectPrev: (options?: { manual?: boolean }) => void;
    workspaceOpen: boolean;
    setWorkspaceOpen: (open: boolean) => void;
    mapOpen: boolean;
    setMapOpen: (open: boolean) => void;
    autopilot: boolean;
    setAutopilot: (enabled: boolean) => void;
    heartbeat: () => void;
    lastInteractionAt: number;
};

const AtlasContextState = createContext<AtlasState | null>(null);

export function AtlasProvider({ children }: { children: ReactNode }) {
    const [activeId, setActiveId] = useState<string>(atlasContexts[0]?.id ?? "bank");
    const [workspaceOpen, setWorkspaceOpenState] = useState<boolean>(true);
    const [mapOpen, setMapOpenState] = useState<boolean>(false);
    const [autopilot, setAutopilot] = useState<boolean>(true);
    const [lastInteractionAt, setLastInteractionAt] = useState<number>(() => Date.now());

    const value = useMemo<AtlasState>(() => {
        const heartbeat = () => setLastInteractionAt(Date.now());
        const activeContext = atlasContexts.find((ctx) => ctx.id === activeId) ?? atlasContexts[0];
        const setWorkspaceOpen = (open: boolean) => {
            heartbeat();
            if (open) setAutopilot(false);
            setWorkspaceOpenState(open);
        };
        const setMapOpen = (open: boolean) => {
            heartbeat();
            if (open) setAutopilot(false);
            setMapOpenState(open);
        };
        const setActiveIdSafe = (id: string, options: { manual?: boolean } = { manual: true }) => {
            if (options.manual !== false) {
                heartbeat();
                setAutopilot(false);
            }
            setActiveId(id);
        };
        const selectNext = (options: { manual?: boolean } = { manual: true }) => {
            const idx = atlasContexts.findIndex((ctx) => ctx.id === activeId);
            const next = atlasContexts[(idx + 1) % atlasContexts.length];
            setActiveIdSafe(next.id, options);
        };
        const selectPrev = (options: { manual?: boolean } = { manual: true }) => {
            const idx = atlasContexts.findIndex((ctx) => ctx.id === activeId);
            const prev = atlasContexts[(idx - 1 + atlasContexts.length) % atlasContexts.length];
            setActiveIdSafe(prev.id, options);
        };
        return {
            contexts: atlasContexts,
            activeId,
            activeContext,
            setActiveId: setActiveIdSafe,
            selectNext,
            selectPrev,
            workspaceOpen,
            setWorkspaceOpen,
            mapOpen,
            setMapOpen,
            autopilot,
            setAutopilot,
            heartbeat,
            lastInteractionAt,
        };
    }, [activeId, workspaceOpen, mapOpen, autopilot, lastInteractionAt]);

    return <AtlasContextState.Provider value={value}>{children}</AtlasContextState.Provider>;
}

export function useAtlasState() {
    const state = useContext(AtlasContextState);
    if (!state) throw new Error("useAtlasState must be used inside AtlasProvider");
    return state;
}
