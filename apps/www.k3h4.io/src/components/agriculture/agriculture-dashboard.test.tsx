import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderWithQuery } from "../../test/utils";
import ResizeObserver from "resize-observer-polyfill";

import { agricultureDashboardStore } from "../../stores/agriculture-dashboard-store";
import { AgricultureDashboard } from "./agriculture-dashboard";

if (typeof (globalThis as any).ResizeObserver === "undefined") {
    (globalThis as any).ResizeObserver = ResizeObserver;
    (global as any).ResizeObserver = ResizeObserver;
    if (typeof window !== "undefined") {
        (window as any).ResizeObserver = ResizeObserver;
    }
}

const bankUpdateMock = { isPending: false, mutateAsync: vi.fn() };
const seedOptionsMock = [{ code: "corn", label: "Corn" }];
const baseHook = {
    bank: { balance: 100, message: "" },
    filteredPlots: [
        { id: "p1", name: "North", crop: "Corn", stage: "Planning", acres: "10", health: "Healthy", latestCondition: null },
    ],
    activePlot: { id: "p1", name: "North", crop: "Corn", stage: "Planning", acres: "10", health: "Healthy", latestCondition: null },
    plotMeshes: [
        { id: "p1", name: "North", crop: "Corn", stage: "Planning", acres: "10", health: "Healthy", latestCondition: null, position: [0, 0, 0], size: [3, 2], healthTint: 1 },
    ],
    seedOptions: seedOptionsMock,
    assigneeOptions: [],
    derivedStatusMessage: "",
    busy: false,
    bankUpdateMutation: bankUpdateMock,
    balanceValue: 100,
    handleConfirmAddPlot: vi.fn().mockResolvedValue({ id: "p2" }),
    handleConfirmBuySeeds: vi.fn().mockResolvedValue(true),
    handleConfirmScheduleWorkers: vi.fn().mockResolvedValue({ id: "t2" }),
};

vi.mock("./use-agriculture-dashboard", () => ({
    useAgricultureDashboard: () => baseHook,
}));

vi.mock("./plot-canvas", () => ({
    PlotCanvas: ({ overlay, onAddPlot, onBuySeeds, onSchedule, onRefresh }: any) => (
        <div>
            <button onClick={onAddPlot}>Add plot</button>
            <button onClick={onBuySeeds}>Buy seeds</button>
            <button onClick={onSchedule}>Schedule workers</button>
            <button onClick={onRefresh}>Refresh</button>
            <div data-testid="overlay">{overlay?.()}</div>
        </div>
    ),
}));

vi.mock("./actions/plot-action", () => ({ PlotActionForm: () => <div>plot form</div> }));
vi.mock("./actions/seeds-action", () => ({ SeedsActionForm: () => <div>seeds form</div> }));
vi.mock("./actions/workers-action", () => ({ WorkersActionForm: () => <div>workers form</div> }));
vi.mock("../../lib/telemetry", () => ({ trackTelemetry: vi.fn() }));

describe("AgricultureDashboard", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        const state = agricultureDashboardStore.getState();
        state.setActionMode(null);
        state.setPlotName("");
        state.setPlotCrop("");
        state.setPlotAcres("");
        state.setPlotCost("");
        state.setSeedCommodity("");
        state.setSeedCost("");
        state.setWorkerTaskTitle("");
        state.setWorkerDueDate(null);
        state.setWorkerAssignee("");
        state.setStatusMessage("");
    });

    it("renders overview data", () => {
        renderWithQuery(<AgricultureDashboard apiBase="https://api.example.com" userEmail="user@test.com" />);
        expect(screen.getAllByText(/North/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText(/Balance 100/)).toBeInTheDocument();
        expect(screen.getByText(/Plots 1/)).toBeInTheDocument();
    });

    it("opens action panels from toolbar", async () => {
        renderWithQuery(<AgricultureDashboard apiBase="https://api.example.com" userEmail="user@test.com" />);

        await userEvent.click(screen.getAllByRole("button", { name: /Add plot/i })[0]);
        expect(await screen.findByText(/plot form/i)).toBeInTheDocument();

        await userEvent.click(screen.getAllByRole("button", { name: /Buy seeds/i })[0]);
        expect(await screen.findByText(/seeds form/i)).toBeInTheDocument();

        await userEvent.click(screen.getAllByRole("button", { name: /Schedule workers/i })[0]);
        expect(await screen.findByText(/workers form/i)).toBeInTheDocument();
    });
});
