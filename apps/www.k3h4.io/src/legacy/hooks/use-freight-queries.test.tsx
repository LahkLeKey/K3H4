import type { ReactNode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useFreightLoadsQuery, useCreateFreightMutation, useCompleteFreightMutation } from "./use-freight-queries";
import { trackTelemetry } from "../lib/telemetry";
import { ACCESS_TOKEN_KEY } from "../lib/constants";
import { queryClient as sharedQueryClient } from "../lib/query-client";

vi.mock("../lib/query-client", () => {
    const client = new QueryClient({
        defaultOptions: { queries: { retry: false, gcTime: 0 }, mutations: { retry: false } },
    });
    return { queryClient: client };
});

const apiBase = "https://api.freight.test";
const token = "freight-token";

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

describe("use-freight-queries", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    });

    afterEach(() => {
        (globalThis as any).fetch = undefined;
        vi.restoreAllMocks();
    });

    it("fetches loads with auth headers and tracks success", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ loads: [{ id: "f1" }] }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();

        const { result } = renderHook(() => useFreightLoadsQuery(apiBase), { wrapper: wrapper(client) });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/freight`, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        expect(result.current.data).toEqual([{ id: "f1" }]);
        expect(trackTelemetry).toHaveBeenCalledWith("freight.list.success", { count: 1 });
    });

    it("surfaces freight list errors", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: "boom" }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();

        const { result } = renderHook(() => useFreightLoadsQuery(apiBase), { wrapper: wrapper(client) });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(trackTelemetry).toHaveBeenCalledWith("freight.list.error", { message: "boom" });
        expect((result.current.error as Error).message).toBe("boom");
    });

    it("creates a freight load and invalidates list", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ load: { id: "abc" } }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();
        const invalidateSpy = vi.spyOn(sharedQueryClient, "invalidateQueries");
        const { result } = renderHook(() => useCreateFreightMutation(apiBase), { wrapper: wrapper(client) });

        await result.current.mutateAsync({
            title: "Box",
            originName: "A",
            originLat: 1,
            originLng: 2,
            destinationName: "B",
            destinationLat: 3,
            destinationLng: 4,
            ratePerKm: 5,
        });

        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/freight`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({
                title: "Box",
                originName: "A",
                originLat: 1,
                originLng: 2,
                destinationName: "B",
                destinationLat: 3,
                destinationLng: 4,
                ratePerKm: 5,
            }),
        });
        expect(trackTelemetry).toHaveBeenCalledWith("freight.create.success", { title: "Box", rate: 5 });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["freight", apiBase, token] });
    });

    it("completes a freight load and invalidates caches", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ load: { id: "xyz" } }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();
        const invalidateSpy = vi.spyOn(sharedQueryClient, "invalidateQueries");
        const { result } = renderHook(() => useCompleteFreightMutation(apiBase), { wrapper: wrapper(client) });

        await result.current.mutateAsync({ id: "xyz" });

        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/freight/xyz/complete`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });
        expect(trackTelemetry).toHaveBeenCalledWith("freight.complete.success", { id: "xyz" });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["freight", apiBase, token] });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["bank", "balance"] });
    });
});
