import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderWithQuery } from "../../test/utils";

import { CulinaryOps } from "./culinary-ops";

vi.mock("../../hooks/use-culinary-queries", () => ({
    useCulinaryOverviewQuery: () => ({
        data: {
            menuItems: [{ id: "m1", name: "Salad", prepMinutes: 10, cost: "4.00", price: "12.00" }],
            prepTasks: [{ id: "p1", task: "Chop", station: "Garde", dueAt: null, status: "pending" }],
            supplierNeeds: [{ id: "s1", item: "Greens", quantity: "3", status: "open", dueDate: null }],
        },
        isLoading: false,
        isError: false,
    }),
    useCreateCulinaryMenuItem: () => ({ mutateAsync: vi.fn().mockResolvedValue({ id: "m2" }), isPending: false }),
    useCreateCulinaryPrepTask: () => ({ mutateAsync: vi.fn().mockResolvedValue({ id: "p2" }), isPending: false }),
    useCreateCulinarySupplierNeed: () => ({ mutateAsync: vi.fn().mockResolvedValue({ id: "s2" }), isPending: false }),
}));

describe("CulinaryOps", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders overview data", () => {
        renderWithQuery(<CulinaryOps apiBase="https://api.example.com" userEmail="user@test.com" />);
        expect(screen.getByText(/Salad/)).toBeInTheDocument();
        expect(screen.getByText(/Chop/)).toBeInTheDocument();
        expect(screen.getByText(/Greens/)).toBeInTheDocument();
    });

    it("submits menu, prep, and supplier forms", async () => {
        renderWithQuery(<CulinaryOps apiBase="https://api.example.com" userEmail="user@test.com" />);

        await userEvent.click(screen.getByRole("button", { name: /Add menu item/i }));
        await userEvent.click(screen.getByRole("button", { name: /Add prep task/i }));
        await userEvent.click(screen.getByRole("button", { name: /Add supplier need/i }));
    });
});
