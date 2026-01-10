import type { ReactNode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
    useAgricultureOverviewQuery,
    useAgricultureResourcesQuery,
    useCreateAgriculturePlot,
    useCreateAgricultureTask,
    useCreateAgricultureShipment,
} from "./use-agriculture-queries";
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

describe("useAgricultureQueries", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("fetches overview with auth and tracks success", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                plots: 0,
                tasks: 0,
                shipments: 0,
            }),
        });
        vi.stubGlobal("fetch", fetchMock);
        const client = createClient();

        const { result } = renderHook(() => useAgricultureOverviewQuery(apiBase), { wrapper: wrapper(client) });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/agriculture/overview`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        expect(trackTelemetry).toHaveBeenCalledWith("agriculture.overview.success", { plots: 0, tasks: 0, shipments: 0 });
    });

    it("creates a plot and invalidates overview", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ plot: { id: "p1" } }) });
        vi.stubGlobal("fetch", fetchMock);
        const client = createClient();
        const invalidateSpy = vi.spyOn(client, "invalidateQueries");
        const { result } = renderHook(() => useCreateAgriculturePlot(apiBase), { wrapper: wrapper(client) });
        const payload = { name: "Lot 1", crop: "Corn", acres: 10 };

        await result.current.mutateAsync(payload);

        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/agriculture/plots`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        expect(trackTelemetry).toHaveBeenCalledWith("agriculture.plot.success", { crop: "Corn" });
        const invalidateScopes = ["overview", "plots", "plans", "tasks", "inventory", "analytics", "resources"];
        expect(invalidateSpy).toHaveBeenCalledTimes(invalidateScopes.length);
        invalidateScopes.forEach((scope, index) => {
            expect(invalidateSpy).toHaveBeenNthCalledWith(index + 1, { queryKey: ["agriculture", scope, apiBase, token] });
        });
    });

    it("returns an error when creating a task fails", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: "nope" }) });
        vi.stubGlobal("fetch", fetchMock);
        const client = createClient();
        const { result } = renderHook(() => useCreateAgricultureTask(apiBase), { wrapper: wrapper(client) });

        await expect(result.current.mutateAsync({ title: "Irrigate", assignee: "Sam" })).rejects.toThrow("nope");
        expect(trackTelemetry).toHaveBeenCalledWith("agriculture.task.error", { message: "nope" });
    });

    it("creates a shipment and invalidates overview", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ shipment: { id: "s1" } }) });
        vi.stubGlobal("fetch", fetchMock);
        const client = createClient();
        const invalidateSpy = vi.spyOn(client, "invalidateQueries");
        const { result } = renderHook(() => useCreateAgricultureShipment(apiBase), { wrapper: wrapper(client) });
        const payload = { lot: "L1", destination: "Chicago", mode: "Rail" };

        await result.current.mutateAsync(payload);

        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/agriculture/shipments`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        expect(trackTelemetry).toHaveBeenCalledWith("agriculture.shipment.success", { mode: "Rail", freightLinked: false });
        const shipmentScopes = ["overview", "plots", "plans", "tasks", "inventory", "analytics", "resources"];
        expect(invalidateSpy).toHaveBeenCalledTimes(shipmentScopes.length);
        shipmentScopes.forEach((scope, index) => {
            expect(invalidateSpy).toHaveBeenNthCalledWith(index + 1, { queryKey: ["agriculture", scope, apiBase, token] });
        });
    });

    it("loads resource categories and tracks success", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                categories: [
                    {
                        id: "cat1",
                        slug: "farm-management",
                        title: "Farm Management",
                        description: "Platforms and guides",
                        resources: [],
                    },
                ],
            }),
        });
        vi.stubGlobal("fetch", fetchMock);
        const client = createClient();

        const { result } = renderHook(() => useAgricultureResourcesQuery(apiBase), { wrapper: wrapper(client) });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/agriculture/resources`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        expect(trackTelemetry).toHaveBeenCalledWith("agriculture.resources.success", { categories: 1 });
    });
});
