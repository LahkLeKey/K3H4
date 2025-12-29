import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderWithQuery } from "../../test/utils";

import { AgricultureDashboard } from "./agriculture-dashboard";

vi.mock("../../hooks/use-agriculture-queries", () => ({
    useAgricultureOverviewQuery: () => ({
        data: {
            plots: [{ id: "p1", name: "North", crop: "Corn", stage: "Planning", acres: "10", health: "Healthy" }],
            tasks: [{ id: "t1", title: "Irrigate", assignee: "Crew", dueDate: null, status: "pending" }],
            shipments: [{ id: "s1", lot: "LOT-1", destination: "Chicago", mode: "Truck", eta: null, freightLoadId: null }],
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
        expect(screen.getByText(/LOT-1/)).toBeInTheDocument();
    });

    it("submits plot, task, and shipment forms", async () => {
        renderWithQuery(<AgricultureDashboard apiBase="https://api.example.com" userEmail="user@test.com" />);

        await userEvent.click(screen.getByRole("button", { name: /Add plot/i }));
        await userEvent.click(screen.getByRole("button", { name: /Add task/i }));
        await userEvent.click(screen.getByRole("button", { name: /Add shipment/i }));
    });
});
