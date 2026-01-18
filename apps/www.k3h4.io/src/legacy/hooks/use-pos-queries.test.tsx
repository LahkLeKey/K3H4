import type { ReactNode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { usePosOverviewQuery, useCreatePosTicket, useCreatePosStore } from "./use-pos-queries";
import { trackTelemetry } from "../lib/telemetry";
import { ACCESS_TOKEN_KEY } from "../lib/constants";

const apiBase = "https://api.example.com";
const token = "test-token";

function createClient() {
    return new QueryClient({
        defaultOptions: {
            queries: { retry: false, gcTime: 0 },
            mutations: { retry: false },
        },
    });
}

function wrapper(client: QueryClient) {
    return function Wrapper({ children }: { children: ReactNode }) {
        return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    };
}

describe("usePosQueries", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("fetches overview with auth headers and tracks success", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                metrics: { grossRevenue: "$100", tickets: 2, avgTicket: "$50" },
                orders: [],
                topItems: [],
                stores: [],
            }),
        });
        vi.stubGlobal("fetch", fetchMock);
        const client = createClient();

        const { result } = renderHook(() => usePosOverviewQuery(apiBase), { wrapper: wrapper(client) });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/pos/overview`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        expect(trackTelemetry).toHaveBeenCalledWith("pos.overview.success", { tickets: 2, stores: 0 });
    });

    it("creates a ticket and invalidates overview", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ticket: { id: "t1" } }) });
        vi.stubGlobal("fetch", fetchMock);
        const client = createClient();
        const invalidateSpy = vi.spyOn(client, "invalidateQueries");
        const { result } = renderHook(() => useCreatePosTicket(apiBase), { wrapper: wrapper(client) });
        const payload = { total: 25, channel: "Online" };

        await result.current.mutateAsync(payload);

        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/pos/tickets`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        expect(trackTelemetry).toHaveBeenCalledWith("pos.ticket.success", { channel: "Online" });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["pos", "overview", apiBase] });
    });

    it("creates a store and invalidates overview", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ store: { id: "s1" } }) });
        vi.stubGlobal("fetch", fetchMock);
        const client = createClient();
        const invalidateSpy = vi.spyOn(client, "invalidateQueries");
        const { result } = renderHook(() => useCreatePosStore(apiBase), { wrapper: wrapper(client) });
        const payload = { name: "New Shop", channel: "In-store" };

        await result.current.mutateAsync(payload);

        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/pos/stores`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        expect(trackTelemetry).toHaveBeenCalledWith("pos.store.success", { channel: "In-store" });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["pos", "overview", apiBase] });
    });
});
