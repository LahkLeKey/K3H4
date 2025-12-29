import type { ReactNode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useWarehouseItemsQuery, useCreateWarehouseItemMutation, useUpdateWarehouseItemMutation } from "./use-warehouse-queries";
import { trackTelemetry } from "../lib/telemetry";
import { ACCESS_TOKEN_KEY } from "../lib/constants";
import { queryClient as sharedQueryClient } from "../lib/query-client";

vi.mock("../lib/query-client", () => {
    const client = new QueryClient({
        defaultOptions: { queries: { retry: false, gcTime: 0 }, mutations: { retry: false } },
    });
    return { queryClient: client };
});

const apiBase = "https://warehouse.test";
const token = "warehouse-token";

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

describe("use-warehouse-queries", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    });

    afterEach(() => {
        (globalThis as any).fetch = undefined;
        vi.restoreAllMocks();
    });

    it("lists items with auth headers and tracks success", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ items: [{ id: "w1" }] }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();

        const { result } = renderHook(() => useWarehouseItemsQuery(apiBase), { wrapper: wrapper(client) });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/warehouse/items`, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        expect(result.current.data).toEqual([{ id: "w1" }]);
        expect(trackTelemetry).toHaveBeenCalledWith("warehouse.list.success", { count: 1 });
    });

    it("creates an item and invalidates list", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ item: { id: "w2" } }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();
        const invalidateSpy = vi.spyOn(sharedQueryClient, "invalidateQueries");
        const { result } = renderHook(() => useCreateWarehouseItemMutation(apiBase), { wrapper: wrapper(client) });

        await result.current.mutateAsync({ sku: "ABC", quantity: 5, location: "A1", status: "new", freightLoadId: "f1" });

        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/warehouse/items`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ sku: "ABC", quantity: 5, location: "A1", status: "new", freightLoadId: "f1" }),
        });
        expect(trackTelemetry).toHaveBeenCalledWith("warehouse.create.success", { sku: "ABC", freightLoadId: "f1" });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["warehouse", apiBase, token] });
    });

    it("updates an item and invalidates warehouse and freight caches", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ item: { id: "w3" } }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();
        const invalidateSpy = vi.spyOn(sharedQueryClient, "invalidateQueries");
        const { result } = renderHook(() => useUpdateWarehouseItemMutation(apiBase), { wrapper: wrapper(client) });

        await result.current.mutateAsync({ id: "w3", quantity: 10, freightLoadId: null });

        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/warehouse/items/w3`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ quantity: 10, freightLoadId: null }),
        });
        expect(trackTelemetry).toHaveBeenCalledWith("warehouse.update.success", { id: "w3" });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["warehouse", apiBase, token] });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["freight", apiBase, token] });
    });
});
