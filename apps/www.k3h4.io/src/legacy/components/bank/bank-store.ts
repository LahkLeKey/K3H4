import { createStore } from "../../lib/store";
import type { CoinStack, LedgerEntry } from "./bank-types";

export type BankDirection = "" | "credit" | "debit";

export type BankStoreState = {
    page: number;
    pageSize: number;
    fromDate: string;
    toDate: string;
    direction: BankDirection;

    ledgerPage: number;
    ledgerTitle: string;
    ledgerEntries: LedgerEntry[];
    ledgerTotalPages: number;

    coinStacks: CoinStack[];
    hoveredId: string | null;
    burstStackId: string | null;
    burstToken: number;
    perfLimited: boolean;

    setPage: (updater: (prev: number) => number) => void;
    setPageValue: (value: number) => void;
    setPageSize: (value: number) => void;
    setFromDate: (value: string) => void;
    setToDate: (value: string) => void;
    setDirection: (value: BankDirection) => void;

    setLedgerPage: (updater: (prev: number) => number) => void;
    setLedgerData: (data: { title: string; entries: LedgerEntry[]; totalPages: number }) => void;

    setCoinStacks: (stacks: CoinStack[]) => void;
    setHovered: (id: string | null) => void;
    triggerBurst: (id: string) => void;
    setPerfLimited: (value: boolean) => void;
};

export const bankStore = createStore<BankStoreState>((set) => ({
    page: 0,
    pageSize: 10,
    fromDate: "",
    toDate: "",
    direction: "",

    ledgerPage: 0,
    ledgerTitle: "Ledger",
    ledgerEntries: [],
    ledgerTotalPages: 1,

    coinStacks: [],
    hoveredId: null,
    burstStackId: null,
    burstToken: 0,
    perfLimited: false,

    setPage: (updater) => set((state) => ({ page: updater(state.page) })),
    setPageValue: (value) => set({ page: value }),
    setPageSize: (value) => set({ pageSize: value }),
    setFromDate: (value) => set({ fromDate: value }),
    setToDate: (value) => set({ toDate: value }),
    setDirection: (value) => set({ direction: value }),

    setLedgerPage: (updater) => set((state) => ({ ledgerPage: updater(state.ledgerPage) })),
    setLedgerData: ({ title, entries, totalPages }) => set({ ledgerTitle: title, ledgerEntries: entries, ledgerTotalPages: Math.max(1, totalPages) }),

    setCoinStacks: (stacks) => set({ coinStacks: stacks }),
    setHovered: (id) => set({ hoveredId: id }),
    triggerBurst: (id) => set((state) => ({ burstStackId: id, burstToken: state.burstToken + 1 })),
    setPerfLimited: (value) => set({ perfLimited: value }),
}));

export const useBankStore = bankStore.useShallow;
