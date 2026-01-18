import type { ReactNode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
    useAssignmentsQuery,
    useCreateAssignmentMutation,
    useCreateTimecardMutation,
    usePayTimecardMutation,
} from "./use-assignment-queries";
import { trackTelemetry } from "../lib/telemetry";
import { ACCESS_TOKEN_KEY } from "../lib/constants";
import { queryClient as sharedQueryClient } from "../lib/query-client";

vi.mock("../lib/query-client", () => {
    const client = new QueryClient({
        defaultOptions: { queries: { retry: false, gcTime: 0 }, mutations: { retry: false } },
    });
    return { queryClient: client };
});

const apiBase = "https://assign.test";
const token = "assign-token";

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

describe("use-assignment-queries", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    });

    afterEach(() => {
        (globalThis as any).fetch = undefined;
        vi.restoreAllMocks();
    });

    it("fetches assignments with auth headers and tracks success", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ assignments: [{ id: "a1" }] }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();

        const { result } = renderHook(() => useAssignmentsQuery(apiBase), { wrapper: wrapper(client) });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/assignments`, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        expect(result.current.data).toEqual([{ id: "a1" }]);
        expect(trackTelemetry).toHaveBeenCalledWith("assignment.list.success", { count: 1 });
    });

    it("creates an assignment and invalidates list", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ assignment: { id: "a2" } }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();
        const invalidateSpy = vi.spyOn(sharedQueryClient, "invalidateQueries");
        const { result } = renderHook(() => useCreateAssignmentMutation(apiBase), { wrapper: wrapper(client) });

        await result.current.mutateAsync({ title: "Dev", personaId: "p1", hourlyRate: 100 });

        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/assignments`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ title: "Dev", personaId: "p1", hourlyRate: 100 }),
        });
        expect(trackTelemetry).toHaveBeenCalledWith("assignment.create.success", { personaId: "p1" });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["assignments", apiBase, token] });
    });

    it("adds timecard and invalidates list", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ assignment: { id: "a3" } }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();
        const invalidateSpy = vi.spyOn(sharedQueryClient, "invalidateQueries");
        const { result } = renderHook(() => useCreateTimecardMutation(apiBase), { wrapper: wrapper(client) });

        await result.current.mutateAsync({ assignmentId: "a3", hours: 4, note: "work" });

        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/assignments/a3/timecards`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ assignmentId: "a3", hours: 4, note: "work" }),
        });
        expect(trackTelemetry).toHaveBeenCalledWith("assignment.timecard.success", { assignmentId: "a3", hours: 4 });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["assignments", apiBase, token] });
    });

    it("pays timecard and invalidates assignments and bank balance", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ assignment: { id: "a4" } }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();
        const invalidateSpy = vi.spyOn(sharedQueryClient, "invalidateQueries");
        const { result } = renderHook(() => usePayTimecardMutation(apiBase), { wrapper: wrapper(client) });

        await result.current.mutateAsync({ assignmentId: "a4", timecardId: "t1" });

        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/assignments/a4/pay`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ assignmentId: "a4", timecardId: "t1" }),
        });
        expect(trackTelemetry).toHaveBeenCalledWith("assignment.pay.success", { assignmentId: "a4", timecardId: "t1" });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["assignments", apiBase, token] });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["bank", "balance"] });
    });
});
