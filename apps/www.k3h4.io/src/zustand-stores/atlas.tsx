import { create } from "zustand";

import { atlasContexts, type AtlasContext } from "../react-hooks/data/atlas";

export type AtlasState = {
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

const initialId = atlasContexts[0]?.id ?? "bank";
const resolveContext = (id: string) => atlasContexts.find((ctx) => ctx.id === id) ?? atlasContexts[0];

export const useAtlasStore = create<AtlasState>((set, get) => ({
    contexts: atlasContexts,
    activeId: initialId,
    activeContext: resolveContext(initialId),
    workspaceOpen: true,
    mapOpen: false,
    autopilot: true,
    lastInteractionAt: Date.now(),

    heartbeat: () => set({ lastInteractionAt: Date.now() }),

    setActiveId: (id, options = { manual: true }) => {
        const manual = options.manual !== false;
        const nextContext = resolveContext(id);
        set((state) => ({
            activeId: id,
            activeContext: nextContext,
            autopilot: manual ? false : state.autopilot,
            lastInteractionAt: manual ? Date.now() : state.lastInteractionAt,
        }));
    },

    selectNext: (options = { manual: true }) => {
        const currentId = get().activeId;
        const idx = atlasContexts.findIndex((ctx) => ctx.id === currentId);
        const next = atlasContexts[(idx + 1) % atlasContexts.length];
        get().setActiveId(next.id, options);
    },

    selectPrev: (options = { manual: true }) => {
        const currentId = get().activeId;
        const idx = atlasContexts.findIndex((ctx) => ctx.id === currentId);
        const prev = atlasContexts[(idx - 1 + atlasContexts.length) % atlasContexts.length];
        get().setActiveId(prev.id, options);
    },

    setWorkspaceOpen: (open: boolean) =>
        set((state) => ({
            workspaceOpen: open,
            autopilot: open ? false : state.autopilot,
            lastInteractionAt: Date.now(),
        })),

    setMapOpen: (open: boolean) =>
        set((state) => ({
            mapOpen: open,
            autopilot: open ? false : state.autopilot,
            lastInteractionAt: Date.now(),
        })),

    setAutopilot: (enabled: boolean) => set({ autopilot: enabled }),
}));

export function useAtlasState() {
    return useAtlasStore();
}

export function AtlasProvider({ children }: { children: React.ReactNode }) {
    // No-op wrapper for compatibility; zustand store does not require a provider.
    return <>{children}</>;
}
