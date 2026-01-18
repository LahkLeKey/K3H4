import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type WorkspaceTab = "overview" | "data" | "actions" | "history";

export type WorkspaceState = {
    activeTab: WorkspaceTab;
    setActiveTab: (tab: WorkspaceTab) => void;
    selectedEntityId: string | null;
    setSelectedEntityId: (id: string | null) => void;
};

const WorkspaceContext = createContext<WorkspaceState | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
    const [activeTab, setActiveTab] = useState<WorkspaceTab>("overview");
    const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

    const value = useMemo<WorkspaceState>(() => ({ activeTab, setActiveTab, selectedEntityId, setSelectedEntityId }), [activeTab, selectedEntityId]);

    return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
    const ctx = useContext(WorkspaceContext);
    if (!ctx) throw new Error("useWorkspace must be used inside WorkspaceProvider");
    return ctx;
}
