import { create } from "zustand";

export type StorefrontsTab = "culinary" | "pos" | "arcade";

export type StorefrontsFieldKey =
  | "culinaryName"
  | "culinaryPrepMinutes"
  | "culinaryStatus"
  | "posTicketStore"
  | "posTicketChannel"
  | "posTicketAmount"
  | "posTicketStatus"
  | "status";

const defaultState = {
  activeTab: "culinary" as StorefrontsTab,
  culinaryName: "Smoked Trout Toast",
  culinaryPrepMinutes: "12",
  culinaryStatus: "",
  posTicketStore: "Demo Store",
  posTicketChannel: "dine-in",
  posTicketAmount: "42.00",
  posTicketStatus: "",
  status: "",
};

export type StorefrontsState = {
  activeTab: StorefrontsTab;
  culinaryName: string;
  culinaryPrepMinutes: string;
  culinaryStatus: string;
  posTicketStore: string;
  posTicketChannel: string;
  posTicketAmount: string;
  posTicketStatus: string;
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
