import { beforeEach, describe, expect, it, vi, beforeAll } from "vitest";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { agricultureDashboardStore } from "../../../stores/agriculture-dashboard-store";

vi.mock("../plot-canvas", () => ({
    PlotCanvas: ({ overlay }: { overlay?: () => React.ReactNode }) => <div data-testid="plot-canvas">{overlay?.()}</div>,
}));

vi.mock("../actions/plot-action", () => ({ PlotActionForm: () => <div>plot form</div> }));
vi.mock("../actions/seeds-action", () => ({ SeedsActionForm: ({ onConfirm }: any) => <button onClick={onConfirm}>Confirm seeds purchase</button> }));
vi.mock("../actions/workers-action", () => ({ WorkersActionForm: () => <div>workers form</div> }));
vi.mock("../../../lib/telemetry", () => ({ trackTelemetry: vi.fn() }));

const bankUpdateMock = { isPending: false, mutateAsync: vi.fn() };
const seedOptionsMock = [{ code: "corn", label: "Corn" }];
const baseHook = {
    bank: { balance: 100, message: "" },
    filteredPlots: [
        { id: "p1", name: "Plot 1", crop: "Wheat", stage: "planned", acres: "5", health: "good", latestCondition: null },
    ],
    activePlot: { id: "p1", name: "Plot 1", crop: "Wheat", stage: "planned", acres: "5", health: "good", latestCondition: null },
    plotMeshes: [
        { id: "p1", name: "Plot 1", crop: "Wheat", stage: "planned", acres: "5", health: "good", latestCondition: null, position: [0, 0, 0], size: [3, 2], healthTint: 1 },
    ],
    seedOptions: seedOptionsMock,
    assigneeOptions: [],
    derivedStatusMessage: "",
    busy: false,
    bankUpdateMutation: bankUpdateMock,
    balanceValue: 100,
    handleConfirmAddPlot: vi.fn(),
    handleConfirmBuySeeds: vi.fn().mockResolvedValue(true),
    handleConfirmScheduleWorkers: vi.fn(),
};

vi.mock("../use-agriculture-dashboard", () => ({
    useAgricultureDashboard: () => baseHook,
}));

import { AgricultureDashboard } from "../agriculture-dashboard";

const resetStore = () => {
    const state = agricultureDashboardStore.getState();
    state.setActionMode(null);
    state.setSeedCommodity("");
    state.setSeedCost("20");
    state.setHighlightedPlot("p1");
    state.setStatusMessage("");
};

beforeAll(async () => {
    if (typeof (global as any).ResizeObserver === "undefined") {
        const { default: ResizeObserver } = await import("resize-observer-polyfill");
        (global as any).ResizeObserver = ResizeObserver;
    }
});

describe("AgricultureDashboard inventory and planting", () => {
    beforeEach(() => {
        localStorage.clear();
        resetStore();
        vi.clearAllMocks();
    });

    it("adds purchased seeds to inventory and selects them", async () => {
        const state = agricultureDashboardStore.getState();
        state.setActionMode("seeds");
        state.setSeedCommodity("corn");

        render(<AgricultureDashboard />);

        await userEvent.click(screen.getByText(/Confirm seeds purchase/i));

        const select = await screen.findByRole("combobox");
        await waitFor(() => expect((select as HTMLSelectElement).value).toBe("corn"));
        const option = within(select).getByText(/Corn · 6 in storage/i);
        expect(option).toBeInTheDocument();
    });

    it("applies a seed to the active plot and decrements inventory", async () => {
        const state = agricultureDashboardStore.getState();
        state.setActionMode("seeds");
        state.setSeedCommodity("corn");

        render(<AgricultureDashboard />);

        await userEvent.click(screen.getByText(/Confirm seeds purchase/i));

        const applyButton = screen.getByRole("button", { name: /Apply to plot/i });
        await userEvent.click(applyButton);

        const select = screen.getByRole("combobox");
        const option = within(select).getByText(/Corn · 5 in storage/i);
        expect(option).toBeInTheDocument();
        expect(select).toHaveValue("corn");
        expect(screen.getByText(/Planted Corn on Plot 1./i)).toBeInTheDocument();
    });
});
