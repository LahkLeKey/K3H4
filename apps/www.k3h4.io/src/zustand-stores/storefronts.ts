import { create } from "zustand";

export type StorefrontsTab = "culinary" | "arcade";

export type StorefrontsFieldKey =
  | "culinaryName"
  | "culinaryPrepMinutes"
  | "culinaryStatus"
  | "culinaryPosStore"
  | "culinaryPosChannel"
  | "culinaryPosAmount"
  | "culinaryPosStatus"
  | "arcadePosStore"
  | "arcadePosChannel"
  | "arcadePosAmount"
  | "arcadePosStatus"
  | "arcadeCardLabel"
  | "arcadeCardId"
  | "arcadeTopupAmount"
  | "arcadeTopupStatus"
  | "arcadeSessionMachineId"
  | "arcadeSessionCardId"
  | "arcadeSessionCredits"
  | "arcadeSessionStatus"
  | "arcadePrizeId"
  | "arcadePrizeCardId"
  | "arcadePrizeStatus"
  | "status";

const defaultState = {
  activeTab: "culinary" as StorefrontsTab,
  culinaryName: "Smoked Trout Toast",
  culinaryPrepMinutes: "12",
  culinaryStatus: "",
  culinaryPosStore: "Culinary House",
  culinaryPosChannel: "dine-in",
  culinaryPosAmount: "42.00",
  culinaryPosStatus: "",
  arcadePosStore: "Arcade Bar",
  arcadePosChannel: "arcade",
  arcadePosAmount: "25.00",
  arcadePosStatus: "",
  arcadeCardLabel: "Visitor card",
  arcadeCardId: "",
  arcadeTopupAmount: "10",
  arcadeTopupStatus: "",
  arcadeSessionMachineId: "",
  arcadeSessionCardId: "",
  arcadeSessionCredits: "2",
  arcadeSessionStatus: "",
  arcadePrizeId: "",
  arcadePrizeCardId: "",
  arcadePrizeStatus: "",
  status: "",
};

export type StorefrontsState = {
  activeTab: StorefrontsTab;
  culinaryName: string;
  culinaryPrepMinutes: string;
  culinaryStatus: string;
  culinaryPosStore: string;
  culinaryPosChannel: string;
  culinaryPosAmount: string;
  culinaryPosStatus: string;
  arcadePosStore: string;
  arcadePosChannel: string;
  arcadePosAmount: string;
  arcadePosStatus: string;
  arcadeCardLabel: string;
  arcadeCardId: string;
  arcadeTopupAmount: string;
  arcadeTopupStatus: string;
  arcadeSessionMachineId: string;
  arcadeSessionCardId: string;
  arcadeSessionCredits: string;
  arcadeSessionStatus: string;
  arcadePrizeId: string;
  arcadePrizeCardId: string;
  arcadePrizeStatus: string;
  status: string;
  setActiveTab: (tab: StorefrontsTab) => void;
  updateField: (key: StorefrontsFieldKey, value: string) => void;
  setStatus: (message: string) => void;
  resetStatus: () => void;
  reset: () => void;
};

export const useStorefrontsStore = create<StorefrontsState>((set) => ({
  ...defaultState,
  setActiveTab: (tab) => set({ activeTab: tab }),
  updateField: (key, value) => set({ [key]: value } as unknown as Partial<StorefrontsState>),
  setStatus: (message) => set({ status: message }),
  resetStatus: () => set({ status: "" }),
  reset: () => set(() => ({ ...defaultState })),
}));
