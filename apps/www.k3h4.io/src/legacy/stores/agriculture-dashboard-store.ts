import { createStore } from "../lib/store";

const STORAGE_KEY = "k3h4:agriculture-dashboard";
const STORAGE_VERSION = 1;

export type ActionMode = "plot" | "seeds" | "workers" | null;
export type ToolId = "select" | "plant" | "water" | "fertilize" | "treat" | "harvest" | "assign";

export type AgricultureDashboardState = {
  highlightedPlot: string | null;
  searchTerm: string;
  rosterOpen: boolean;
  signalsOpen: boolean;
  actionMode: ActionMode;
  activeTool: ToolId;
  showHowToPlay: boolean;
  reducedMotion: boolean;
  keyboardNavigation: boolean;
  plotName: string;
  plotCrop: string;
  plotAcres: string;
  plotCost: string;
  seedCommodity: string;
  seedCost: string;
  workerTaskTitle: string;
  workerDueDate: string;
  workerAssignee: string;
  statusMessage: string;
  setHighlightedPlot: (id: string | null) => void;
  setSearchTerm: (value: string) => void;
  setRosterOpen: (value: boolean) => void;
  setSignalsOpen: (value: boolean) => void;
  setActionMode: (mode: ActionMode) => void;
  setActiveTool: (tool: ToolId) => void;
  setShowHowToPlay: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
  setKeyboardNavigation: (value: boolean) => void;
  setPlotName: (value: string) => void;
  setPlotCrop: (value: string) => void;
  setPlotAcres: (value: string) => void;
  setPlotCost: (value: string) => void;
  setSeedCommodity: (value: string) => void;
  setSeedCost: (value: string) => void;
  setWorkerTaskTitle: (value: string) => void;
  setWorkerDueDate: (value: string) => void;
  setWorkerAssignee: (value: string) => void;
  setStatusMessage: (value: string) => void;
};

const defaultState: Omit<AgricultureDashboardState, "setHighlightedPlot" | "setSearchTerm" | "setRosterOpen" | "setSignalsOpen" | "setActionMode" | "setActiveTool" | "setShowHowToPlay" | "setReducedMotion" | "setKeyboardNavigation" | "setPlotName" | "setPlotCrop" | "setPlotAcres" | "setPlotCost" | "setSeedCommodity" | "setSeedCost" | "setWorkerTaskTitle" | "setWorkerDueDate" | "setWorkerAssignee" | "setStatusMessage"> = {
  highlightedPlot: null,
  searchTerm: "",
  rosterOpen: false,
  signalsOpen: false,
  actionMode: null,
  activeTool: "select",
  showHowToPlay: true,
  reducedMotion: false,
  keyboardNavigation: true,
  plotName: "New field",
  plotCrop: "Wheat",
  plotAcres: "5",
  plotCost: "50",
  seedCommodity: "",
  seedCost: "20",
  workerTaskTitle: "Tend plots",
  workerDueDate: "",
  workerAssignee: "Crew",
  statusMessage: "",
};

type StorageEnvelope = {
  version: number;
  state: Partial<AgricultureDashboardState>;
};

const loadFromStorage = (): Partial<AgricultureDashboardState> => {
  if (typeof window === "undefined") return {};
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    const payload = JSON.parse(raw) as StorageEnvelope;
    if (payload?.version !== STORAGE_VERSION || !payload.state) return {};
    return payload.state;
  } catch (_error) {
    return {};
  }
};

const persist = (state: AgricultureDashboardState) => {
  if (typeof window === "undefined") return;
  const snapshot: Partial<AgricultureDashboardState> = {
    searchTerm: state.searchTerm,
    actionMode: state.actionMode,
    activeTool: state.activeTool,
    showHowToPlay: state.showHowToPlay,
    reducedMotion: state.reducedMotion,
    keyboardNavigation: state.keyboardNavigation,
    plotName: state.plotName,
    plotCrop: state.plotCrop,
    plotAcres: state.plotAcres,
    plotCost: state.plotCost,
    seedCommodity: state.seedCommodity,
    seedCost: state.seedCost,
    workerTaskTitle: state.workerTaskTitle,
    workerDueDate: state.workerDueDate,
    workerAssignee: state.workerAssignee,
  };
  const payload: StorageEnvelope = { version: STORAGE_VERSION, state: snapshot };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

export const agricultureDashboardStore = createStore<AgricultureDashboardState>((set, get) => ({
  ...defaultState,
  ...loadFromStorage(),
  setHighlightedPlot: (id) => set({ highlightedPlot: id }),
  setSearchTerm: (value) => {
    set({ searchTerm: value });
    persist(get());
  },
  setRosterOpen: (value) => set({ rosterOpen: value }),
  setSignalsOpen: (value) => set({ signalsOpen: value }),
  setActionMode: (mode) => {
    set({ actionMode: mode });
    persist(get());
  },
  setActiveTool: (tool) => {
    set({ activeTool: tool });
    persist(get());
  },
  setShowHowToPlay: (value) => {
    set({ showHowToPlay: value });
    persist(get());
  },
  setReducedMotion: (value) => {
    set({ reducedMotion: value });
    persist(get());
  },
  setKeyboardNavigation: (value) => {
    set({ keyboardNavigation: value });
    persist(get());
  },
  setPlotName: (value) => {
    set({ plotName: value });
    persist(get());
  },
  setPlotCrop: (value) => {
    set({ plotCrop: value });
    persist(get());
  },
  setPlotAcres: (value) => {
    set({ plotAcres: value });
    persist(get());
  },
  setPlotCost: (value) => {
    set({ plotCost: value });
    persist(get());
  },
  setSeedCommodity: (value) => {
    set({ seedCommodity: value });
    persist(get());
  },
  setSeedCost: (value) => {
    set({ seedCost: value });
    persist(get());
  },
  setWorkerTaskTitle: (value) => {
    set({ workerTaskTitle: value });
    persist(get());
  },
  setWorkerDueDate: (value) => {
    set({ workerDueDate: value });
    persist(get());
  },
  setWorkerAssignee: (value) => {
    set({ workerAssignee: value });
    persist(get());
  },
  setStatusMessage: (value) => set({ statusMessage: value }),
}));
