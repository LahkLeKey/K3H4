import { create } from "zustand";

export type LogisticsTab = "freight" | "warehouse" | "agriculture" | "usda" | "culinary" | "pos";

export type LogisticsFieldKey =
    | "freightTitle"
    | "freightRate"
    | "warehouseSku"
    | "warehouseQty"
    | "culinaryName"
    | "posStore"
    | "freightCustomTitle"
    | "freightCustomRate"
    | "freightActionStatus"
    | "warehouseLocation"
    | "warehouseCreateStatus"
    | "agricultureSlotId"
    | "agricultureInvName"
    | "agricultureInvQty"
    | "agricultureFormStatus"
    | "culinaryPrepMinutes"
    | "culinaryStatus"
    | "posTicketStore"
    | "posTicketChannel"
    | "posTicketAmount"
    | "posTicketStatus"
    | "status";

const defaultState = {
    activeTab: "freight" as LogisticsTab,
    freightTitle: "Austin -> Dallas",
    freightRate: "2.1",
    warehouseSku: "SKU-123",
    warehouseQty: "10",
    culinaryName: "Smoked Trout Toast",
    posStore: "Demo Store",
    posTicketStore: "Demo Store",
    posTicketChannel: "dine-in",
    posTicketAmount: "42.00",
    posTicketStatus: "",
    freightCustomTitle: "Austin -> Dallas",
    freightCustomRate: "2.1",
    freightActionStatus: "",
    warehouseLocation: "A1",
    warehouseCreateStatus: "",
    agricultureSlotId: "slot-1",
    agricultureInvName: "Seeds",
    agricultureInvQty: "5",
    agricultureFormStatus: "",
    culinaryPrepMinutes: "12",
    culinaryStatus: "",
    status: "",
    usdaDetail: null as { title: string; code?: string; wikidataId?: string; enrichment: any } | null,
};

export type LogisticsState = {
    activeTab: LogisticsTab;
    freightTitle: string;
    freightRate: string;
    warehouseSku: string;
    warehouseQty: string;
    culinaryName: string;
    posStore: string;
    posTicketStore: string;
    posTicketChannel: string;
    posTicketAmount: string;
    posTicketStatus: string;
    freightCustomTitle: string;
    freightCustomRate: string;
    freightActionStatus: string;
    warehouseLocation: string;
    warehouseCreateStatus: string;
    agricultureSlotId: string;
    agricultureInvName: string;
    agricultureInvQty: string;
    agricultureFormStatus: string;
    culinaryPrepMinutes: string;
    culinaryStatus: string;
    status: string;
    usdaDetail: { title: string; code?: string; wikidataId?: string; enrichment: any } | null;
    setActiveTab: (tab: LogisticsTab) => void;
    updateField: (key: LogisticsFieldKey, value: string) => void;
    setStatus: (message: string) => void;
    resetStatus: () => void;
    setUsdaDetail: (detail: { title: string; code?: string; wikidataId?: string; enrichment: any } | null) => void;
    reset: () => void;
};

export const useLogisticsStore = create<LogisticsState>((set) => ({
    ...defaultState,
    setActiveTab: (tab) => set({ activeTab: tab }),
    updateField: (key, value) => set({ [key]: value } as unknown as Partial<LogisticsState>),
    setStatus: (message) => set({ status: message }),
    resetStatus: () => set({ status: "" }),
    setUsdaDetail: (detail) => set({ usdaDetail: detail }),
    reset: () => set(() => ({ ...defaultState })),
}));
