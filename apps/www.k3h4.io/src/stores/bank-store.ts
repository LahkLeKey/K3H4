import { createStore } from "../lib/store";

export type TabKey = "overview" | "activity" | "actions";

export type BankStoreState = {
  apiBase: string;
  amountInput: string;
  note: string;
  activeTab: TabKey;
  setApiBase: (apiBase: string) => void;
  setAmountInput: (value: string) => void;
  setNote: (value: string) => void;
  setActiveTab: (tab: TabKey) => void;
};

const apiBaseDefault = (globalThis as any)?.__API_URL__ || (import.meta as any)?.API_URL || "http://localhost:3001";

export const bankStore = createStore<BankStoreState>((set) => ({
  apiBase: apiBaseDefault,
  amountInput: "100.00",
  note: "",
  activeTab: "overview",
  setApiBase: (apiBase) => set({ apiBase }),
  setAmountInput: (value) => set({ amountInput: value }),
  setNote: (value) => set({ note: value }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
