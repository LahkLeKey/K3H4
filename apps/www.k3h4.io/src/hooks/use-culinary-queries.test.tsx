import type { ReactNode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
    useCulinaryOverviewQuery,
    useCreateCulinaryMenuItem,
    useCreateCulinaryPrepTask,
    useCreateCulinarySupplierNeed,
} from "./use-culinary-queries";
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

describe("useCulinaryQueries", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("fetches overview and tracks success", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ menuItems: [], prepTasks: [], supplierNeeds: [] }),
        });
        vi.stubGlobal("fetch", fetchMock);
        const client = createClient();

        const { result } = renderHook(() => useCulinaryOverviewQuery(apiBase), { wrapper: wrapper(client) });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/culinary/overview`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        expect(trackTelemetry).toHaveBeenCalledWith("culinary.overview.success", { menu: 0, prep: 0, suppliers: 0 });
    });

    it("creates a menu item and invalidates overview", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ item: { id: "m1" } }) });
        vi.stubGlobal("fetch", fetchMock);
        const client = createClient();
        const invalidateSpy = vi.spyOn(client, "invalidateQueries");
        const { result } = renderHook(() => useCreateCulinaryMenuItem(apiBase), { wrapper: wrapper(client) });
        const payload = { name: "Burger", prepMinutes: 10, cost: 3, price: 9 };

        await result.current.mutateAsync(payload);

        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/culinary/menu-items`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        expect(trackTelemetry).toHaveBeenCalledWith("culinary.menu.success", { name: "Burger" });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["culinary", "overview", apiBase] });
    });

    it("creates a prep task and normalizes the due time", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ prep: { id: "p1" } }) });
        vi.stubGlobal("fetch", fetchMock);
        const client = createClient();
        const invalidateSpy = vi.spyOn(client, "invalidateQueries");
        const { result } = renderHook(() => useCreateCulinaryPrepTask(apiBase), { wrapper: wrapper(client) });

        await result.current.mutateAsync({ task: "Chop", station: "Grill", dueAt: "14:30" });

        const [, options] = fetchMock.mock.calls[0];
        const payload = JSON.parse((options?.body as string) ?? "{}");
        expect(payload.dueAt).toMatch(/T\d{2}:\d{2}:/);
        expect(trackTelemetry).toHaveBeenCalledWith("culinary.prep.success", { station: "Grill" });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["culinary", "overview", apiBase] });
    });

    it("surfaces supplier need errors", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: false, json: async () => ({ error: "denied" }) });
        vi.stubGlobal("fetch", fetchMock);
        const client = createClient();
        const { result } = renderHook(() => useCreateCulinarySupplierNeed(apiBase), { wrapper: wrapper(client) });

        await expect(result.current.mutateAsync({ item: "Tomatoes", quantity: "4 cases" })).rejects.toThrow("denied");
        expect(trackTelemetry).toHaveBeenCalledWith("culinary.supplier.error", { message: "denied" });
    });
});
