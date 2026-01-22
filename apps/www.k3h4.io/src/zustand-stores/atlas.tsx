import { create } from "zustand";

import { atlasContexts as atlasTemplates, type AtlasContext } from "@/react-hooks/data/atlas";
import { useBankStore } from "./bank";
import { useFreightStore } from "./freight";
import { usePersonaStore } from "./persona";
import { useStaffingStore } from "./staffing";
import { useAssignmentStore } from "./assignments";
import { useAgricultureStore } from "./agriculture";
import { useWarehouseStore } from "./warehouse";
import { usePosStore } from "./pos";
import { useArcadeStore } from "./arcade";
import { useCulinaryStore } from "./culinary";
import { useUsdaStore } from "./usda";

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
    hydrate: () => Promise<void>;
};

const templateById = (id: string) => atlasTemplates.find((ctx) => ctx.id === id);

const buildContexts = (): AtlasContext[] => {
    const bank = useBankStore.getState();
    const freight = useFreightStore.getState();
    const persona = usePersonaStore.getState();
    const staffing = useStaffingStore.getState();
    const assignments = useAssignmentStore.getState();
    const agriculture = useAgricultureStore.getState();
    const warehouse = useWarehouseStore.getState();
    const pos = usePosStore.getState();
    const arcade = useArcadeStore.getState();
    const culinary = useCulinaryStore.getState();
    const usda = useUsdaStore.getState();

    const bankTpl = templateById("bank");
    const freightTpl = templateById("freight");
    const personaTpl = templateById("persona");
    const laplaceTpl = templateById("laplace");
    const agricultureTpl = templateById("agriculture");
    const warehouseTpl = templateById("warehouse");
    const posTpl = templateById("pos");
    const arcadeTpl = templateById("arcade");
    const culinaryTpl = templateById("culinary");
    const usdaTpl = templateById("usda");

    const contexts: AtlasContext[] = [];

    if (bankTpl) {
        contexts.push({
            ...bankTpl,
            summary: bank.balance ? `Balance ₭${bank.balance}` : "Load bank balance",
            metrics: [
                { label: "Balance", value: bank.balance ? `₭${bank.balance}` : "-" },
                { label: "Txns", value: bank.transactions.length.toString() },
                { label: "Credits", value: bank.transactions.filter((t) => t.direction === "credit").length.toString() },
            ],
            streams: bank.transactions.slice(0, 3).map((t) => ({
                label: t.kind,
                status: t.direction,
                volume: `₭${t.amount}`,
                window: new Date(t.createdAt).toLocaleTimeString(),
                accent: t.direction === "credit" ? "#22c55e" : "#f97316",
            })),
            timeline: bank.transactions.slice(0, 3).map((t) => ({
                at: new Date(t.createdAt).toLocaleTimeString(),
                title: t.kind,
                detail: t.note ?? t.direction,
                tone: t.direction === "credit" ? "positive" : "info",
            })),
        });
    }

    if (agricultureTpl) {
        const ov = agriculture.overview;
        contexts.push({
            ...agricultureTpl,
            summary: ov ? `${ov.plots} plots · ${ov.tasks} tasks` : agricultureTpl.summary,
            metrics: [
                { label: "Plots", value: ov ? ov.plots.toString() : "-" },
                { label: "Tasks", value: ov ? ov.tasks.toString() : "-" },
                { label: "Harvest", value: ov ? ov.harvest : "-" },
            ],
            streams: [
                { label: "Seeds", status: "stock", volume: ov ? ov.seeds : "-", window: "inventory", accent: agricultureTpl.accent },
                { label: "Fertilizer", status: "stock", volume: ov ? ov.fertilizer : "-", window: "inventory", accent: "#a5b4fc" },
                { label: "Burn", status: "finance", volume: ov ? `₭${ov.burnRate}` : "-", window: "runway", accent: "#f472b6" },
            ],
            timeline: [
                { at: "Now", title: "Slots", detail: ov ? `${ov.unlockedSlots} unlocked` : "Unlock plots", tone: "info" },
                { at: "Finance", title: "P&L", detail: ov ? `₭${ov.pnl}` : "Sync ledger", tone: "info" },
                { at: "Harvest", title: "Receivables", detail: ov ? `₭${ov.receivables}` : "Collect", tone: "positive" },
            ],
        });
    }

    if (freightTpl) {
        const totals = freight.totals;
        contexts.push({
            ...freightTpl,
            summary: `${freight.loads.length} loads · ${totals.distanceKm.toFixed(1)} km planned`,
            metrics: [
                { label: "Active", value: totals.active.toString() },
                { label: "Completed", value: totals.completed.toString() },
                { label: "Cost", value: `₭${totals.cost.toFixed(2)}` },
            ],
            streams: freight.loads.slice(0, 3).map((l) => ({
                label: l.title,
                status: l.status,
                volume: `${l.distanceKm.toFixed(1)} km`,
                window: l.originName,
                accent: freightTpl.accent,
            })),
            timeline: freight.loads.slice(0, 3).map((l) => ({
                at: l.status,
                title: l.title,
                detail: `${l.originName} → ${l.destinationName}`,
                tone: l.status === "completed" ? "positive" : "info",
            })),
        });
    }

    if (warehouseTpl) {
        contexts.push({
            ...warehouseTpl,
            summary: `${warehouse.items.length} SKUs · ${warehouse.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0)} qty`,
            metrics: [
                { label: "SKUs", value: warehouse.items.length.toString() },
                { label: "Active", value: warehouse.items.filter((i) => i.status !== "archived").length.toString() },
                { label: "Qty", value: warehouse.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0).toString() },
            ],
            streams: warehouse.items.slice(0, 3).map((item) => ({
                label: item.sku,
                status: item.status,
                volume: `${item.quantity} units`,
                window: item.location,
                accent: warehouseTpl.accent,
            })),
            timeline: warehouse.items.slice(0, 3).map((item) => ({
                at: item.location,
                title: item.sku,
                detail: item.description ?? "Inventory",
                tone: "info",
            })),
        });
    }

    if (personaTpl) {
        contexts.push({
            ...personaTpl,
            summary: `${persona.stats.total} personas · ${persona.stats.attributes} attributes`,
            metrics: [
                { label: "Personas", value: persona.stats.total.toString() },
                { label: "Attributes", value: persona.stats.attributes.toString() },
                { label: "Categories", value: Object.keys(persona.stats.categories).length.toString() },
            ],
            streams: persona.personas.slice(0, 3).map((p) => ({
                label: p.alias,
                status: p.tags[0] ?? "profile",
                volume: `${p.attributes.length} attrs`,
                window: p.account,
                accent: personaTpl.accent,
            })),
            timeline: persona.personas.slice(0, 3).map((p) => ({
                at: p.handle ?? p.account,
                title: p.alias,
                detail: p.note ?? p.tags.join(", "),
                tone: "info",
            })),
        });
    }

    if (posTpl) {
        const ov = pos.overview;
        contexts.push({
            ...posTpl,
            summary: ov ? `${ov.metrics.tickets} tickets · ₭${ov.metrics.grossRevenue}` : posTpl.summary,
            metrics: [
                { label: "Gross", value: ov ? `₭${ov.metrics.grossRevenue}` : "-" },
                { label: "Tickets", value: ov ? ov.metrics.tickets.toString() : "-" },
                { label: "Avg", value: ov ? `₭${ov.metrics.avgTicket}` : "-" },
            ],
            streams: ov?.orders.slice(0, 3).map((o) => ({
                label: o.store,
                status: o.channel,
                volume: `${o.tickets} tickets`,
                window: `₭${o.revenue}`,
                accent: posTpl.accent,
            })) ?? posTpl.streams,
            timeline: ov?.topItems.slice(0, 3).map((item) => ({
                at: `${item.sold} sold`,
                title: item.name,
                detail: `₭${item.revenue}`,
                tone: "info",
            })) ?? posTpl.timeline,
        });
    }

    if (laplaceTpl) {
        contexts.push({
            ...laplaceTpl,
            summary: `${staffing.roles.length} roles · ${assignments.metrics.hours.toFixed(1)} hrs logged`,
            metrics: [
                { label: "Open roles", value: (staffing.metrics?.openRoles ?? 0).toString() },
                { label: "Candidates", value: (staffing.metrics?.activeCandidates ?? 0).toString() },
                { label: "Assignments", value: assignments.metrics.count.toString() },
            ],
            streams: staffing.shifts.slice(0, 3).map((s) => ({
                label: s.title,
                status: s.status ?? "scheduled",
                volume: s.coverageStatus ?? "coverage",
                window: s.location ?? "",
                accent: laplaceTpl.accent,
            })),
            timeline: assignments.assignments.slice(0, 3).map((a) => ({
                at: a.persona?.alias ?? "persona",
                title: a.title,
                detail: `${a.timecards.length} tcs / ${a.payouts.length} payouts`,
                tone: "info",
            })),
        });
    }

    if (arcadeTpl) {
        const ov = arcade.overview;
        contexts.push({
            ...arcadeTpl,
            summary: ov ? `${ov.cards.length} cards · ${ov.sessions.length} sessions` : arcadeTpl.summary,
            metrics: [
                { label: "Cards", value: ov ? ov.cards.length.toString() : "-" },
                { label: "Machines", value: ov ? ov.machines.length.toString() : "-" },
                { label: "Prizes", value: ov ? ov.prizes.length.toString() : "-" },
            ],
            streams: ov?.cards.slice(0, 3).map((card) => ({
                label: card.label ?? "Card",
                status: "balance",
                volume: `₭${card.balance}`,
                window: `${card.topUps.length} top-ups`,
                accent: arcadeTpl.accent,
            })) ?? arcadeTpl.streams,
            timeline: ov?.redemptions.slice(0, 3).map((r) => ({
                at: r.createdAt ? new Date(r.createdAt).toLocaleTimeString() : "redeem",
                title: r.prizeId,
                detail: r.cardId,
                tone: "info",
            })) ?? arcadeTpl.timeline,
        });
    }

    if (culinaryTpl) {
        const ov = culinary.overview;
        contexts.push({
            ...culinaryTpl,
            summary: ov ? `${ov.menuItems.length} menu · ${ov.prepTasks.length} prep tasks` : culinaryTpl.summary,
            metrics: [
                { label: "Menu", value: ov ? ov.menuItems.length.toString() : "-" },
                { label: "Prep", value: ov ? ov.prepTasks.length.toString() : "-" },
                { label: "Suppliers", value: ov ? ov.supplierNeeds.length.toString() : "-" },
            ],
            streams: ov?.prepTasks.slice(0, 3).map((p) => ({
                label: p.task,
                status: p.status,
                volume: p.station,
                window: p.dueAt ? new Date(p.dueAt).toLocaleTimeString() : "due",
                accent: culinaryTpl.accent,
            })) ?? culinaryTpl.streams,
            timeline: ov?.supplierNeeds.slice(0, 3).map((need) => ({
                at: need.dueDate ? new Date(need.dueDate).toLocaleDateString() : "request",
                title: need.item,
                detail: need.quantity,
                tone: "info",
            })) ?? culinaryTpl.timeline,
        });
    }

    if (usdaTpl) {
        contexts.push({
            ...usdaTpl,
            summary: `${usda.regions.length} regions · ${usda.commodities.length} commodities`,
            metrics: [
                { label: "Regions", value: usda.regions.length.toString() },
                { label: "Commodities", value: usda.commodities.length.toString() },
                { label: "Countries", value: usda.countries.length.toString() },
            ],
            streams: [
                { label: "Regions", status: "esr", volume: usda.regions.length.toString(), window: "reference", accent: usdaTpl.accent },
                { label: "Commodities", status: "esr", volume: usda.commodities.length.toString(), window: "reference", accent: "#a78bfa" },
                { label: "Countries", status: "esr", volume: usda.countries.length.toString(), window: "reference", accent: "#34d399" },
            ],
            timeline: usda.regions.slice(0, 3).map((r: any, idx: number) => ({
                at: `ref ${idx + 1}`,
                title: r?.name ?? "Region",
                detail: "ESR region",
                tone: "info",
            })),
        });
    }

    return contexts;
};

const initialContexts = buildContexts();
const initialId = initialContexts[0]?.id ?? atlasTemplates[0]?.id ?? "bank";

export const useAtlasStore = create<AtlasState>((set, get) => ({
    contexts: initialContexts,
    activeId: initialId,
    activeContext: initialContexts[0] ?? (atlasTemplates[0] as AtlasContext),
    workspaceOpen: true,
    mapOpen: false,
    autopilot: true,
    lastInteractionAt: Date.now(),

    heartbeat: () => set({ lastInteractionAt: Date.now() }),

    setActiveId: (id, options = { manual: true }) => {
        const manual = options.manual !== false;
        const nextContext = get().contexts.find((ctx) => ctx.id === id) ?? get().contexts[0];
        set((state) => ({
            activeId: id,
            activeContext: nextContext,
            autopilot: manual ? false : state.autopilot,
            lastInteractionAt: manual ? Date.now() : state.lastInteractionAt,
        }));
    },

    selectNext: (options = { manual: true }) => {
        const ctxs = get().contexts;
        const currentId = get().activeId;
        const idx = ctxs.findIndex((ctx) => ctx.id === currentId);
        const next = ctxs[(idx + 1) % ctxs.length];
        if (next) get().setActiveId(next.id, options);
    },

    selectPrev: (options = { manual: true }) => {
        const ctxs = get().contexts;
        const currentId = get().activeId;
        const idx = ctxs.findIndex((ctx) => ctx.id === currentId);
        const prev = ctxs[(idx - 1 + ctxs.length) % ctxs.length];
        if (prev) get().setActiveId(prev.id, options);
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

    hydrate: async () => {
        // Fetch domain data in parallel; tolerate failures.
        await Promise.allSettled([
            useBankStore.getState().fetchBalance(),
            useBankStore.getState().fetchTransactions(),
            useFreightStore.getState().fetchLoads(),
            usePersonaStore.getState().fetchPersonas(),
            useStaffingStore.getState().fetchDashboard(),
            useAssignmentStore.getState().fetchAssignments(),
            useAgricultureStore.getState().fetchOverview(),
            useWarehouseStore.getState().fetchItems(),
            usePosStore.getState().fetchOverview(),
            useArcadeStore.getState().fetchOverview(),
            useCulinaryStore.getState().fetchOverview(),
            useUsdaStore.getState().fetchReference(),
        ]);

        const ctxs = buildContexts();
        set((state) => ({
            contexts: ctxs,
            activeContext: ctxs.find((c) => c.id === state.activeId) ?? ctxs[0] ?? state.activeContext,
        }));
    },
}));

export function useAtlasState() {
    return useAtlasStore();
}

export function AtlasProvider({ children }: { children: React.ReactNode }) {
    // No-op wrapper for compatibility; zustand store does not require a provider.
    return <>{children}</>;
}
