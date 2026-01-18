import type { ReactNode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { usePersonaListQuery, useCreatePersonaMutation, useGeneratePersonaMutation } from "./use-persona-queries";
import { trackTelemetry } from "../lib/telemetry";
import { ACCESS_TOKEN_KEY } from "../lib/constants";
import { queryClient as sharedQueryClient } from "../lib/query-client";

vi.mock("../lib/query-client", () => {
    const client = new QueryClient({
        defaultOptions: { queries: { retry: false, gcTime: 0 }, mutations: { retry: false } },
    });
    return { queryClient: client };
});

const apiBase = "https://persona.test";
const token = "persona-token";

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

describe("use-persona-queries", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    });

    afterEach(() => {
        (globalThis as any).fetch = undefined;
        vi.restoreAllMocks();
    });

    it("lists personas with auth headers and tracks success", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ personas: [{ id: "p1" }] }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();

        const { result } = renderHook(() => usePersonaListQuery(apiBase), { wrapper: wrapper(client) });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/personas`, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        expect(result.current.data).toEqual([{ id: "p1" }]);
        expect(trackTelemetry).toHaveBeenCalledWith("persona.list.success", { count: 1 });
    });

    it("creates a persona and invalidates list", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ persona: { id: "p2" } }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();
        const invalidateSpy = vi.spyOn(sharedQueryClient, "invalidateQueries");
        const { result } = renderHook(() => useCreatePersonaMutation(apiBase), { wrapper: wrapper(client) });

        await result.current.mutateAsync({ alias: "A", account: "acct", handle: "h", tags: ["x"] });

        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/personas`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ alias: "A", account: "acct", handle: "h", tags: ["x"] }),
        });
        expect(trackTelemetry).toHaveBeenCalledWith("persona.create.success", { hasHandle: true, hasTags: true });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["personas", apiBase, token] });
    });

    it("generates personas and invalidates list", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ personas: [{ id: "p3" }] }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();
        const invalidateSpy = vi.spyOn(sharedQueryClient, "invalidateQueries");
        const { result } = renderHook(() => useGeneratePersonaMutation(apiBase), { wrapper: wrapper(client) });

        await result.current.mutateAsync(2);

        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/personas/generate`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ count: 2 }),
        });
        expect(trackTelemetry).toHaveBeenCalledWith("persona.generate.success", { count: 2 });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["personas", apiBase, token] });
    });
});
