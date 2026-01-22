import { create } from "zustand";

export type PairRow = { id: string; sourceId?: string; targetId?: string; label: boolean };

export type PersonaDashboardState = {
    activeTab: string;
    selectedPersonaId?: string;
    rosterQuery: string;
    selectedTag: string | null;
    sortKey: "alias" | "attributes";
    newAlias: string;
    newAccount: string;
    newHandle: string;
    newTags: string;
    newNote: string;
    generateCount: number;
    creating: boolean;
    seeding: boolean;
    attributesInput: string;
    pairRows: PairRow[];
    threshold: number;
    modelPath: string;
    showGraph: boolean;
    setActiveTab: (tab: string) => void;
    setSelectedPersonaId: (id?: string) => void;
    setRosterQuery: (q: string) => void;
    setSelectedTag: (tag: string | null) => void;
    setSortKey: (key: "alias" | "attributes") => void;
    setNewAlias: (v: string) => void;
    setNewAccount: (v: string) => void;
    setNewHandle: (v: string) => void;
    setNewTags: (v: string) => void;
    setNewNote: (v: string) => void;
    setGenerateCount: (v: number) => void;
    setCreating: (v: boolean) => void;
    setSeeding: (v: boolean) => void;
    setAttributesInput: (v: string) => void;
    setThreshold: (v: number) => void;
    setModelPath: (v: string) => void;
    setShowGraph: (v: boolean) => void;
    resetNewPersona: () => void;
    addPairRow: () => void;
    updatePairRow: (id: string, updates: Partial<PairRow>) => void;
    setPairRows: (rows: PairRow[]) => void;
};

export const usePersonaDashboardStore = create<PersonaDashboardState>((set, get) => ({
    activeTab: "overview",
    rosterQuery: "",
    selectedTag: null,
    sortKey: "attributes",
    newAlias: "",
    newAccount: "",
    newHandle: "",
    newTags: "",
    newNote: "",
    generateCount: 2,
    creating: false,
    seeding: false,
    attributesInput: "stack: node, python | weight=1\nindustry: fintech, logistics",
    pairRows: [{ id: "pair-0", label: true }],
    threshold: 0.5,
    modelPath: "",
    showGraph: false,
    setActiveTab: (activeTab) => set({ activeTab }),
    setSelectedPersonaId: (selectedPersonaId) => set({ selectedPersonaId }),
    setRosterQuery: (rosterQuery) => set({ rosterQuery }),
    setSelectedTag: (selectedTag) => set({ selectedTag }),
    setSortKey: (sortKey) => set({ sortKey }),
    setNewAlias: (newAlias) => set({ newAlias }),
    setNewAccount: (newAccount) => set({ newAccount }),
    setNewHandle: (newHandle) => set({ newHandle }),
    setNewTags: (newTags) => set({ newTags }),
    setNewNote: (newNote) => set({ newNote }),
    setGenerateCount: (generateCount) => set({ generateCount }),
    setCreating: (creating) => set({ creating }),
    setSeeding: (seeding) => set({ seeding }),
    setAttributesInput: (attributesInput) => set({ attributesInput }),
    setThreshold: (threshold) => set({ threshold }),
    setModelPath: (modelPath) => set({ modelPath }),
    setShowGraph: (showGraph) => set({ showGraph }),
    resetNewPersona: () => set({ newAlias: "", newAccount: "", newHandle: "", newTags: "", newNote: "" }),
    addPairRow: () => {
        const nextIndex = get().pairRows.length;
        set({ pairRows: [...get().pairRows, { id: `pair-${nextIndex}`, label: nextIndex % 2 === 0 }] });
    },
    updatePairRow: (id, updates) => set({ pairRows: get().pairRows.map((row) => (row.id === id ? { ...row, ...updates } : row)) }),
    setPairRows: (pairRows) => set({ pairRows }),
}));
