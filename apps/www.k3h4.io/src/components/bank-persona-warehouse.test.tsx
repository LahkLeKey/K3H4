import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { BankTable } from "./bank/bank-table";
import { PersonaTable } from "./persona/persona-table";
import { WarehouseDashboard } from "./warehouse/warehouse-dashboard";

const mockUseK3h4Bank = vi.fn();
const mockUsePersonaListQuery = vi.fn();
const mockUseCreatePersonaMutation = vi.fn();
const mockUseGeneratePersonaMutation = vi.fn();
const mockUseFreightLoadsQuery = vi.fn();
const mockUseWarehouseItemsQuery = vi.fn();
const mockUseCreateWarehouseItemMutation = vi.fn();
const mockUseUpdateWarehouseItemMutation = vi.fn();

vi.mock("../hooks/use-k3h4-bank", () => ({ useK3h4Bank: (...args: unknown[]) => mockUseK3h4Bank(...args) }));
vi.mock("../hooks/use-persona-queries", () => ({
    usePersonaListQuery: (...args: unknown[]) => mockUsePersonaListQuery(...args),
    useCreatePersonaMutation: (...args: unknown[]) => mockUseCreatePersonaMutation(...args),
    useGeneratePersonaMutation: (...args: unknown[]) => mockUseGeneratePersonaMutation(...args),
}));
vi.mock("../hooks/use-warehouse-queries", () => ({
    useWarehouseItemsQuery: (...args: unknown[]) => mockUseWarehouseItemsQuery(...args),
    useCreateWarehouseItemMutation: (...args: unknown[]) => mockUseCreateWarehouseItemMutation(...args),
    useUpdateWarehouseItemMutation: (...args: unknown[]) => mockUseUpdateWarehouseItemMutation(...args),
}));
vi.mock("../hooks/use-freight-queries", () => ({ useFreightLoadsQuery: (...args: unknown[]) => mockUseFreightLoadsQuery(...args) }));

describe("BankTable", () => {
    it("renders balance, filters, and triggers actions", () => {
        const refreshBalance = vi.fn();
        const refreshTransactions = vi.fn();
        const applyDelta = vi.fn();
        const setAbsolute = vi.fn();
        mockUseK3h4Bank.mockReturnValue({
            balance: "25",
            loading: false,
            updating: false,
            message: "ok",
            error: "",
            transactions: [
                { id: "1", note: "a", amount: "5", balanceAfter: "30", direction: "credit", createdAt: "2024-01-01" },
            ],
            totalTransactions: 1,
            transactionsLoading: false,
            refreshBalance,
            refreshTransactions,
            applyDelta,
            setAbsolute,
            amountInput: "10",
            setAmountInput: vi.fn(),
            note: "note",
            setNote: vi.fn(),
        });

        render(<BankTable apiBase="api" userEmail="me@test.com" />);

        expect(screen.getByText(/k3h4 bank/i)).toBeInTheDocument();
        expect(screen.getByText(/Balance: 25\.00 k3h4-coin/)).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: /refresh balance/i }));
        fireEvent.click(screen.getByRole("button", { name: /refresh activity/i }));
        fireEvent.click(screen.getByRole("button", { name: /deposit/i }));
        fireEvent.click(screen.getByRole("button", { name: /set exact/i }));
        expect(refreshBalance).toHaveBeenCalled();
        expect(refreshTransactions).toHaveBeenCalled();
        expect(applyDelta).toHaveBeenCalledWith(expect.any(Number), expect.any(String));
        expect(setAbsolute).toHaveBeenCalled();
        expect(screen.getByText(/1 of 1/)).toBeInTheDocument();
    });
});

describe("PersonaTable", () => {
    it("filters and sends transfers", () => {
        const applyDelta = vi.fn();
        mockUseK3h4Bank.mockReturnValue({
            balance: "5",
            loading: false,
            updating: false,
            message: "",
            error: "",
            applyDelta,
            refreshBalance: vi.fn(),
            amountInput: "3",
            setAmountInput: vi.fn(),
            note: "hi",
        });
        mockUsePersonaListQuery.mockReturnValue({
            data: [
                { id: "p1", alias: "Alpha", account: "acct1", handle: "@a", note: "n", tags: ["vip"] },
            ], isLoading: false, isSuccess: true, error: null
        });
        mockUseCreatePersonaMutation.mockReturnValue({ mutateAsync: vi.fn() });
        mockUseGeneratePersonaMutation.mockReturnValue({ mutate: vi.fn(), isPending: false });

        render(<PersonaTable apiBase="api" userEmail="me@test.com" />);

        fireEvent.change(screen.getByPlaceholderText(/filter personas/i), { target: { value: "alp" } });
        const amountInputs = screen.getAllByPlaceholderText(/Amount/);
        fireEvent.change(amountInputs[0], { target: { value: "4" } });
        const noteInputs = screen.getAllByPlaceholderText(/Note/);
        fireEvent.change(noteInputs[0], { target: { value: "thanks" } });
        fireEvent.click(screen.getByRole("button", { name: /pay/i }));
        expect(applyDelta).toHaveBeenCalled();
        expect(screen.getByText(/Alpha/)).toBeInTheDocument();
    });
});

describe("WarehouseDashboard", () => {
    it("lists items and toggles status", async () => {
        const updateItem = vi.fn(() => Promise.resolve());
        mockUseFreightLoadsQuery.mockReturnValue({
            data: [
                { id: "f1", title: "Load", originName: "A", destinationName: "B", status: "created", distanceKm: 10, durationMinutes: 5, cost: 2 },
                { id: "f2", title: "Done", originName: "C", destinationName: "D", status: "completed", distanceKm: 5, durationMinutes: 2, cost: 1 },
            ]
        });
        mockUseWarehouseItemsQuery.mockReturnValue({
            data: [
                { id: "i1", sku: "SKU", description: "Widget", location: "A1", quantity: 2, status: "stored", freightLoadId: "f1" },
            ]
        });
        mockUseCreateWarehouseItemMutation.mockReturnValue({ mutateAsync: vi.fn() });
        mockUseUpdateWarehouseItemMutation.mockReturnValue({ mutateAsync: updateItem, isPending: false });
        const onNavigateFreight = vi.fn();

        render(<WarehouseDashboard apiBase="api" userEmail="me@test.com" onNavigateFreight={onNavigateFreight} />);

        expect(screen.getByText(/Warehouse/)).toBeInTheDocument();
        expect(screen.getAllByText(/SKU/).length).toBeGreaterThan(0);
        fireEvent.click(screen.getByRole("button", { name: /Pick/i }));
        expect(updateItem).toHaveBeenCalled();
        fireEvent.click(screen.getAllByRole("button", { name: /Freight/i })[0]);
        expect(onNavigateFreight).toHaveBeenCalled();
    });
});
