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
    assigneeOptions: ["Crew", "Alexa"],
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
vi.mock("../../lib/telemetry", () => ({ trackTelemetry: vi.fn() }));

const getFieldInput = (labelText: string) => {
    const labelNode = screen.getAllByText(labelText, { selector: "p" }).find((node) => node.parentElement?.querySelector("input, select"));
    const container = labelNode?.parentElement || undefined;
    const input = container?.querySelector("input, select");
    if (!input) {
        throw new Error(`No input found for label ${labelText}`);
    }
    return input as HTMLInputElement | HTMLSelectElement;
};

describe("AgricultureDashboard", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        const state = agricultureDashboardStore.getState();
        state.setActionMode(null);
        state.setSearchTerm("");
        state.setRosterOpen(false);
        state.setSignalsOpen(false);
        state.setPlotName("New field");
        state.setPlotCrop("Wheat");
        state.setPlotAcres("5");
        state.setPlotCost("50");
        state.setSeedCommodity("");
        state.setSeedCost("20");
        state.setWorkerTaskTitle("Tend plots");
        state.setWorkerDueDate("");
        state.setWorkerAssignee("Crew");
        state.setStatusMessage("");
    });

    it("renders overview data", () => {
        renderWithQuery(<AgricultureDashboard apiBase="https://api.example.com" userEmail="user@test.com" />);
        expect(screen.getAllByText(/North/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText(/Balance 100/)).toBeInTheDocument();
        expect(screen.getByText(/Plots 1/)).toBeInTheDocument();
    });

    it("persists plot form edits to localStorage", async () => {
        renderWithQuery(<AgricultureDashboard apiBase="https://api.example.com" userEmail="user@test.com" />);

        await userEvent.click(screen.getAllByRole("button", { name: /Add plot/i })[0]);
        await screen.findByText(/Farm action/i);

        const plotNameInput = getFieldInput("Plot name");
        const cropInput = getFieldInput("Crop");
        const acresInput = getFieldInput("Acres");
        const costInput = getFieldInput("Cost (coin)");

        await userEvent.clear(plotNameInput);
        await userEvent.type(plotNameInput, "Irrigation Field");
        await userEvent.clear(cropInput);
        await userEvent.type(cropInput, "Barley");
        await userEvent.clear(acresInput);
        await userEvent.type(acresInput, "12");
        await userEvent.clear(costInput);
        await userEvent.type(costInput, "75");

        const snapshot = JSON.parse(localStorage.getItem("k3h4:agriculture-dashboard") || "{}")?.state ?? {};
        expect(snapshot.actionMode).toBe("plot");
        expect(snapshot.plotName).toBe("Irrigation Field");
        expect(snapshot.plotCrop).toBe("Barley");
        expect(snapshot.plotAcres).toBe("12");
        expect(snapshot.plotCost).toBe("75");
    });

    it("persists seed purchase intent to localStorage", async () => {
        renderWithQuery(<AgricultureDashboard apiBase="https://api.example.com" userEmail="user@test.com" />);

        await userEvent.click(screen.getAllByRole("button", { name: /Buy seeds/i })[0]);
        await screen.findByText(/Farm action/i);

        const commoditySelect = getFieldInput("Commodity");
        const costInput = getFieldInput("Cost (coin)");

        await userEvent.selectOptions(commoditySelect, "corn");
        await userEvent.clear(costInput);
        await userEvent.type(costInput, "42");

        const snapshot = JSON.parse(localStorage.getItem("k3h4:agriculture-dashboard") || "{}")?.state ?? {};
        expect(snapshot.actionMode).toBe("seeds");
        expect(snapshot.seedCommodity).toBe("corn");
        expect(snapshot.seedCost).toBe("42");
    });

    it("persists worker scheduling edits to localStorage", async () => {
        renderWithQuery(<AgricultureDashboard apiBase="https://api.example.com" userEmail="user@test.com" />);

        await userEvent.click(screen.getAllByRole("button", { name: /Schedule workers/i })[0]);
        await screen.findByText(/Farm action/i);

        const taskInput = getFieldInput("Task title");
        const dueDateInput = getFieldInput("Due date");
        const assigneeSelect = getFieldInput("Assignee");

        await userEvent.clear(taskInput);
        await userEvent.type(taskInput, "Harvest prep");
        await userEvent.clear(dueDateInput);
        await userEvent.type(dueDateInput, "2026-02-14");
        await userEvent.selectOptions(assigneeSelect, "Alexa");

        const snapshot = JSON.parse(localStorage.getItem("k3h4:agriculture-dashboard") || "{}")?.state ?? {};
        expect(snapshot.actionMode).toBe("workers");
        expect(snapshot.workerTaskTitle).toBe("Harvest prep");
        expect(snapshot.workerDueDate).toBe("2026-02-14");
        expect(snapshot.workerAssignee).toBe("Alexa");
    });
});
