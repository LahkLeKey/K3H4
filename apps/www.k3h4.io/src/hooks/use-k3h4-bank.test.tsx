import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";

import { useK3h4Bank } from "./use-k3h4-bank";
import { bankStore } from "../stores/bank-store";

const balanceMock = vi.fn();
const transactionsMock = vi.fn();
const updateMock = vi.fn();

vi.mock("./use-bank-queries", () => ({
    useBankBalanceQuery: (...args: unknown[]) => balanceMock(...args),
    useBankTransactionsQuery: (...args: unknown[]) => transactionsMock(...args),
    useBankUpdateMutation: (...args: unknown[]) => updateMock(...args),
}));

describe("useK3h4Bank", () => {
    const initialApiBase = bankStore.getState().apiBase;

    beforeEach(() => {
        vi.clearAllMocks();
        bankStore.setState({ apiBase: initialApiBase, amountInput: "100.00", note: "", activeTab: "overview" });
    });

    afterEach(() => {
        balanceMock.mockReset();
        transactionsMock.mockReset();
        updateMock.mockReset();
    });

    it("syncs api base into store and exposes composed values", async () => {
        const balanceQuery = { data: { balance: "321.00" }, isPending: false, refetch: vi.fn() } as const;
        const transactionsQuery = {
            data: { transactions: [{ id: "t1" }], total: 5 },
            isPending: false,
            refetch: vi.fn(),
        } as const;
        const updateMutation = { isPending: true, isSuccess: false, mutate: vi.fn() } as const;
        balanceMock.mockReturnValue(balanceQuery);
        transactionsMock.mockReturnValue(transactionsQuery);
        updateMock.mockReturnValue(updateMutation);
        const setApiBaseSpy = vi.spyOn(bankStore.getState(), "setApiBase");

        const { result } = renderHook(() =>
            useK3h4Bank("https://bank.test", { page: 2, pageSize: 5, direction: "debit", from: "2025-01-01" }),
        );

        await waitFor(() => expect(setApiBaseSpy).toHaveBeenCalledWith("https://bank.test"));
        expect(balanceMock).toHaveBeenCalledWith("https://bank.test");
        expect(transactionsMock).toHaveBeenCalledWith("https://bank.test", {
            page: 2,
            pageSize: 5,
            from: "2025-01-01",
            to: undefined,
            direction: "debit",
        });

        expect(result.current.balance).toBe("321.00");
        expect(result.current.transactions).toEqual([{ id: "t1" }]);
        expect(result.current.totalTransactions).toBe(5);
        expect(result.current.loading).toBe(false);
        expect(result.current.transactionsLoading).toBe(false);
        expect(result.current.updating).toBe(true);
        result.current.refreshBalance();
        result.current.refreshTransactions();
        expect(balanceQuery.refetch).toHaveBeenCalled();
        expect(transactionsQuery.refetch).toHaveBeenCalled();
    });

    it("updates store-driven inputs and delegates mutations", () => {
        const updateMutation = { isPending: false, isSuccess: true, mutate: vi.fn() } as const;
        balanceMock.mockReturnValue({ data: { balance: "10" }, isPending: false, refetch: vi.fn() });
        transactionsMock.mockReturnValue({ data: { transactions: [], total: 0 }, isPending: false, refetch: vi.fn() });
        updateMock.mockReturnValue(updateMutation);

        const { result } = renderHook(() => useK3h4Bank("https://bank.test"));

        act(() => {
            result.current.setAmountInput("12.50");
            result.current.setNote("note");
            result.current.setActiveTab("actions");
        });
        act(() => {
            result.current.applyDelta(5, "tip");
            result.current.setAbsolute(20, "reset");
        });

        expect(bankStore.getState().amountInput).toBe("12.50");
        expect(bankStore.getState().note).toBe("note");
        expect(bankStore.getState().activeTab).toBe("actions");
        expect(updateMutation.mutate).toHaveBeenCalledWith({ delta: 5, reason: "tip" });
        expect(updateMutation.mutate).toHaveBeenCalledWith({ set: 20, reason: "reset" });
        expect(result.current.message).toBe("Balance updated");
    });
});
