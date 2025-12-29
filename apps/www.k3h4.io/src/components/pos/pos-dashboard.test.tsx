import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, cleanup } from "@testing-library/react";
import { renderWithQuery } from "../../test/utils";

import { PosDashboard } from "./pos-dashboard";

const mockUsePosOverviewQuery = vi.fn();
const mockUseCreatePosTicket = vi.fn();
const mockUseCreatePosStore = vi.fn();

vi.mock("../../hooks/use-pos-queries", () => ({
    usePosOverviewQuery: (...args: unknown[]) => mockUsePosOverviewQuery(...args),
    useCreatePosTicket: (...args: unknown[]) => mockUseCreatePosTicket(...args),
    useCreatePosStore: (...args: unknown[]) => mockUseCreatePosStore(...args),
}));

const apiBase = "https://api.example.com";
const userEmail = "user@test.com";

describe("PosDashboard", () => {
    let ticketMutate: ReturnType<typeof vi.fn>;
    let storeMutate: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        vi.clearAllMocks();
        ticketMutate = vi.fn().mockResolvedValue({ id: "t1" });
        storeMutate = vi.fn().mockResolvedValue({ id: "s1" });
        mockUsePosOverviewQuery.mockReturnValue({
            data: {
                metrics: { grossRevenue: "120.00", tickets: 2, avgTicket: "60.00" },
                orders: [
                    { store: "Main", channel: "In-store", tickets: 1, revenue: "70.00" },
                    { store: "Online", channel: "Delivery", tickets: 1, revenue: "50.00" },
                ],
                topItems: [{ name: "Burger", sold: 3, revenue: "30.00" }],
                stores: [{ id: "1", name: "Main", channel: "In-store" }],
            },
            isLoading: false,
            isError: false,
        });
        mockUseCreatePosTicket.mockReturnValue({ mutateAsync: ticketMutate, isPending: false });
        mockUseCreatePosStore.mockReturnValue({ mutateAsync: storeMutate, isPending: false });
    });

    afterEach(() => {
        cleanup();
    });

    it("renders metrics and lists", () => {
        renderWithQuery(<PosDashboard apiBase={apiBase} userEmail={userEmail} />);
        expect(screen.getByText("Gross revenue")).toBeInTheDocument();
        expect(screen.getByText("120.00")).toBeInTheDocument();
        expect(screen.getByText("Orders by channel")).toBeInTheDocument();
        expect(screen.getByText("Top items")).toBeInTheDocument();
    });

    it("submits quick ticket with defaults and trims values", async () => {
        renderWithQuery(<PosDashboard apiBase={apiBase} userEmail={userEmail} />);

        const [ticketStoreInput] = screen.getAllByLabelText(/Store name/i);
        await userEvent.type(ticketStoreInput, " Main  ");
        await userEvent.clear(screen.getByLabelText(/Qty/i));
        const ticketButton = screen.getByRole("button", { name: /Create ticket/i });
        await userEvent.click(ticketButton);

        expect(ticketMutate).toHaveBeenCalledWith({
            storeName: "Main",
            channel: "In-store",
            total: 75,
            items: [{ name: "Item", price: 25, quantity: 1 }],
            status: "closed",
        });
        expect(ticketStoreInput).toHaveValue("");
    });

    it("validates quick ticket inputs and shows errors", async () => {
        renderWithQuery(<PosDashboard apiBase={apiBase} userEmail={userEmail} />);

        await userEvent.click(screen.getByRole("button", { name: /Create ticket/i }));
        expect(screen.getByText("Store name is required")).toBeInTheDocument();

        const [ticketStoreInput] = screen.getAllByLabelText(/Store name/i);
        await userEvent.type(ticketStoreInput, "North");
        await userEvent.clear(screen.getByLabelText(/Total/i));
        await userEvent.type(screen.getByLabelText(/Total/i), "abc");
        await userEvent.click(screen.getByRole("button", { name: /Create ticket/i }));
        expect(screen.getByText("Total must be a number")).toBeInTheDocument();
        expect(ticketMutate).not.toHaveBeenCalled();
    });

    it("surfaces ticket mutation errors", async () => {
        ticketMutate.mockRejectedValueOnce(new Error("Ticket failed"));
        renderWithQuery(<PosDashboard apiBase={apiBase} userEmail={userEmail} />);

        const [ticketStoreInput] = screen.getAllByLabelText(/Store name/i);
        await userEvent.type(ticketStoreInput, "Main");
        await userEvent.click(screen.getByRole("button", { name: /Create ticket/i }));

        expect(await screen.findByText("Ticket failed")).toBeInTheDocument();
    });

    it("validates store creation and surfaces errors", async () => {
        storeMutate.mockRejectedValueOnce(new Error("Store failed"));
        renderWithQuery(<PosDashboard apiBase={apiBase} userEmail={userEmail} />);

        await userEvent.click(screen.getByRole("button", { name: /Add store/i }));
        expect(screen.getByText("Store name is required")).toBeInTheDocument();

        const [, storeNameInput] = screen.getAllByLabelText(/^Store name$/i);
        const [, channelSelect] = screen.getAllByLabelText(/^Channel$/i);
        await userEvent.type(storeNameInput, "Pop-up");
        await userEvent.selectOptions(channelSelect, "Delivery");
        await userEvent.click(screen.getByRole("button", { name: /Add store/i }));
        expect(await screen.findByText("Store failed")).toBeInTheDocument();
        expect(storeMutate).toHaveBeenCalledWith({ name: "Pop-up", channel: "Delivery" });
    });

    it("shows loading, empty, and error states", async () => {
        mockUsePosOverviewQuery.mockReturnValueOnce({ data: undefined, isLoading: true, isError: false });
        renderWithQuery(<PosDashboard apiBase={apiBase} userEmail={userEmail} />);
        expect(screen.getByText(/Loading POS overview/i)).toBeInTheDocument();
        cleanup();

        mockUsePosOverviewQuery.mockReturnValueOnce({
            data: { metrics: { grossRevenue: "0", tickets: 0, avgTicket: "0" }, orders: [], topItems: [], stores: [] },
            isLoading: false,
            isError: false,
        });
        renderWithQuery(<PosDashboard apiBase={apiBase} userEmail={userEmail} />);
        expect(screen.getAllByText("No orders yet.").length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText("No item sales yet.").length).toBeGreaterThanOrEqual(1);
        cleanup();

        mockUsePosOverviewQuery.mockReturnValueOnce({
            data: undefined,
            isLoading: false,
            isError: true,
            error: new Error("Overview failed"),
        });
        renderWithQuery(<PosDashboard apiBase={apiBase} userEmail={userEmail} />);
        expect(screen.getByText("Overview failed")).toBeInTheDocument();
    });
});
