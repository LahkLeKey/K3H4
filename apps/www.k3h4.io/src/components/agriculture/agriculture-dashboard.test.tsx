import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderWithQuery } from "../../test/utils";

import { AgricultureDashboard } from "./agriculture-dashboard";

vi.mock("../../hooks/use-agriculture-queries", () => ({
    useAgricultureOverviewQuery: () => ({
        data: {
            plots: 1,
            tasks: 1,
            shipments: 1,
        },
        isLoading: false,
        isError: false,
    }),
    useAgriculturePlotsQuery: () => ({
        data: {
            plots: [{ id: "p1", name: "North", crop: "Corn", stage: "Planning", acres: "10", health: "Healthy", latestCondition: null, plans: [] }],
        },
        isLoading: false,
        isError: false,
    }),
    useAgriculturePlansQuery: () => ({
        data: {
            plans: [{ id: "plan1", crop: "Corn", phase: "Planning", status: "Active", startDate: "2026-01-01", targetHarvestDate: null, endDate: null, plotId: "p1", tasks: [] }],
        },
        isLoading: false,
        isError: false,
    }),
    useAgricultureTasksQuery: () => ({
        data: {
            tasks: [{ id: "t1", title: "Irrigate", assignee: "Crew", dueDate: null, status: "pending" }],
        },
        isLoading: false,
        isError: false,
    }),
    useAgricultureInventoryQuery: () => ({
        data: {
            inventory: [
                {
                    id: "inv1",
                    sku: "SKU-001",
                    description: "Fertilizer",
                    totalQuantity: "100",
                    unit: "bags",
                    location: "Warehouse",
                    status: "active",
                    movements: [],
                },
            ],
        },
        isLoading: false,
        isError: false,
    }),
    useAgricultureAnalyticsQuery: () => ({
        data: {
            totalPlots: 1,
            planPhaseCounts: { Planning: 1 },
            taskStatusCounts: { pending: 1 },
            inventoryHighlights: [{ sku: "SKU-001", totalQuantity: "100", unit: "bags" }],
            trackedShipments: 1,
        },
        isLoading: false,
        isError: false,
    }),
    useAgricultureResourcesQuery: () => ({
        data: {
            categories: [
                {
                    id: "cat1",
                    slug: "farm-management",
                    title: "Farm Management & Decision Support",
                    description: "Tools for planning and traceability",
                    resources: [
                        {
                            id: "res1",
                            title: "Farmbrite",
                            summary: "Organize tasks, finances, and mapping",
                            url: "https://www.farmbrite.com",
                            tags: ["planning", "mapping"],
                            source: "Farmbrite",
                        },
                    ],
                },
            ],
        },
        isLoading: false,
        isError: false,
    }),
    useCreateAgriculturePlot: () => ({ mutateAsync: vi.fn().mockResolvedValue({ id: "p2" }), isPending: false }),
    useCreateAgricultureTask: () => ({ mutateAsync: vi.fn().mockResolvedValue({ id: "t2" }), isPending: false }),
    useCreateAgricultureShipment: () => ({ mutateAsync: vi.fn().mockResolvedValue({ id: "s2" }), isPending: false }),
}));

describe("AgricultureDashboard", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders overview data", () => {
        renderWithQuery(<AgricultureDashboard apiBase="https://api.example.com" userEmail="user@test.com" />);
        expect(screen.getByText(/North/)).toBeInTheDocument();
        expect(screen.getByText(/Irrigate/)).toBeInTheDocument();
        expect(screen.getAllByText(/Farmbrite/).length).toBeGreaterThanOrEqual(1);
    });

    it("submits plot, task, and shipment forms", async () => {
        renderWithQuery(<AgricultureDashboard apiBase="https://api.example.com" userEmail="user@test.com" />);

        await userEvent.click(screen.getByRole("button", { name: /Add plot/i }));
        await userEvent.click(screen.getByRole("button", { name: /Add task/i }));
        await userEvent.click(screen.getByRole("button", { name: /Add shipment/i }));
    });
});
