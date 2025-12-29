import type { ReactNode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useBankBalanceQuery, useBankTransactionsQuery, useBankUpdateMutation, bankKeys } from "./use-bank-queries";
import { trackTelemetry } from "../lib/telemetry";
import { ACCESS_TOKEN_KEY } from "../lib/constants";
import { queryClient as sharedQueryClient } from "../lib/query-client";

vi.mock("../lib/query-client", () => {
    const client = new QueryClient({
        defaultOptions: { queries: { retry: false, gcTime: 0 }, mutations: { retry: false } },
    });
    return { queryClient: client };
});

const apiBase = "https://api.example.com";
const token = "bank-token";

function createClient() {
    return new QueryClient({
        defaultOptions: { queries: { retry: false, gcTime: 0 }, mutations: { retry: false } },
    });
}

function wrapper(client: QueryClient) {
    return function Wrapper({ children }: { children: ReactNode }) {
        return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    };
}

describe("use-bank-queries", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    });

    afterEach(() => {
        (globalThis as any).fetch = undefined;
        vi.restoreAllMocks();
    });

    it("fetches balance with auth headers and tracks success", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ balance: "150.00" }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();

        const { result } = renderHook(() => useBankBalanceQuery(apiBase), { wrapper: wrapper(client) });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/bank/balance`, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        expect(result.current.data?.balance).toBe("150.00");
        expect(trackTelemetry).toHaveBeenCalledWith("bank.balance.fetch.success");
    });

    it("lists transactions with filters and tracks counts", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ transactions: [{ id: "t1" }, { id: "t2" }], total: 2 }),
        });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();
        const filters = { page: 1, pageSize: 50, from: "2025-01-01", to: "2025-02-01", direction: "credit" as const };

        const { result } = renderHook(() => useBankTransactionsQuery(apiBase, filters), { wrapper: wrapper(client) });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(fetchMock).toHaveBeenCalledWith(
            `${apiBase}/bank/transactions?limit=50&offset=50&from=2025-01-01&to=2025-02-01&direction=credit`,
            {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            },
        );
        expect(result.current.data?.transactions).toHaveLength(2);
        expect(trackTelemetry).toHaveBeenCalledWith("bank.transactions.fetch.success", { count: 2, page: 1, pageSize: 50 });
    });

    it("updates balance, caches result, and invalidates transactions", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ balance: "200.00", transaction: { id: "txn-1" } }),
        });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();
        const setQueryDataSpy = vi.spyOn(sharedQueryClient, "setQueryData");
        const invalidateSpy = vi.spyOn(sharedQueryClient, "invalidateQueries");
        const { result } = renderHook(() => useBankUpdateMutation(apiBase), { wrapper: wrapper(client) });

        await result.current.mutateAsync({ delta: 25, reason: "bonus" });

        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/bank/balance`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ delta: 25, reason: "bonus" }),
        });
        expect(trackTelemetry).toHaveBeenCalledWith("bank.balance.update.success", { mode: "delta" });
        expect(setQueryDataSpy).toHaveBeenCalledWith(bankKeys.balance(apiBase, token), { balance: "200.00" });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["bank", "transactions", apiBase, token] });
    });
});
