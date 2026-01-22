import { create } from "zustand";

export type TelemetryTab = "overview" | "performance" | "reliability" | "errors" | "events";

export type TelemetryState = {
    activeTab: TelemetryTab;
    windowHours: number;
    limit: number;
    setActiveTab: (tab: TelemetryTab) => void;
    setWindowHours: (hours: number) => void;
    setLimit: (limit: number) => void;
};

const defaultState = {
    activeTab: "overview" as TelemetryTab,
    windowHours: 24,
    limit: 200,
};

export const useTelemetryStore = create<TelemetryState>((set) => ({
    ...defaultState,
    setActiveTab: (activeTab) => set({ activeTab }),
    setWindowHours: (windowHours) => set({ windowHours }),
    setLimit: (limit) => set({ limit }),
}));
