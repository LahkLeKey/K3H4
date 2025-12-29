import type { ReactNode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
    useSessionQuery,
    useProfileQuery,
    useGithubUrlMutation,
    useGithubCallbackMutation,
    useProfileSaveMutation,
    deriveUser,
} from "./use-auth-queries";
import { trackTelemetry } from "../lib/telemetry";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../lib/constants";
import { queryClient as sharedQueryClient } from "../lib/query-client";

vi.mock("../lib/query-client", () => {
    const client = new QueryClient({
        defaultOptions: { queries: { retry: false, gcTime: 0 }, mutations: { retry: false } },
    });
    return { queryClient: client };
});

const apiBase = "https://api.example.com";
const token = "auth-token";

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

describe("use-auth-queries", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        if (!(globalThis as any).localStorage) {
            const store = new Map<string, string>();
            (globalThis as any).localStorage = {
                getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
                setItem: (key: string, value: string) => store.set(key, String(value)),
                removeItem: (key: string) => store.delete(key),
                clear: () => store.clear(),
                key: (index: number) => Array.from(store.keys())[index] ?? null,
                get length() {
                    return store.size;
                },
            } as Storage;
        }
        localStorage.clear();
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    });

    afterEach(() => {
        (globalThis as any).fetch = undefined;
        vi.restoreAllMocks();
    });

    it("derives user identity from session", () => {
        expect(deriveUser({ user: { email: "a@b.com" } })).toEqual({ status: "authenticated", email: "a@b.com" });
        expect(deriveUser({ user: { email: null } })).toEqual({ status: "anonymous" });
        expect(deriveUser(undefined)).toEqual({ status: "anonymous" });
    });

    it("fetches session with auth headers and tracks success", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ user: { email: "a@b.com" } }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();

        const { result } = renderHook(() => useSessionQuery(apiBase), { wrapper: wrapper(client) });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/auth/me`, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        expect(trackTelemetry).toHaveBeenCalledWith("auth.session.success");
    });

    it("clears caches and tokens on unauthorized session", async () => {
        const clearSpy = vi.spyOn(sharedQueryClient, "clear");
        const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 401, json: async () => ({ error: "unauthorized" }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();

        renderHook(() => useSessionQuery(apiBase), { wrapper: wrapper(client) });
        await waitFor(() => expect(fetchMock).toHaveBeenCalled());
        expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toBeNull();
        expect(localStorage.getItem(REFRESH_TOKEN_KEY)).toBeNull();
        expect(clearSpy).toHaveBeenCalled();
    });

    it("fetches profile when enabled", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ profile: { displayName: "Test" } }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();

        const { result } = renderHook(() => useProfileQuery(apiBase, true), { wrapper: wrapper(client) });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/profile`, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        expect(result.current.data?.profile.displayName).toBe("Test");
        expect(trackTelemetry).toHaveBeenCalledWith("auth.profile.success");
    });

    it("gets github auth url", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ authorizeUrl: "https://github.com/auth" }) });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();
        const { result } = renderHook(() => useGithubUrlMutation(apiBase), { wrapper: wrapper(client) });

        const data = await result.current.mutateAsync({ redirectUri: "http://localhost/callback" });
        expect(data.authorizeUrl).toBe("https://github.com/auth");
        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/auth/github/url`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ redirectUri: "http://localhost/callback" }),
        });
        expect(trackTelemetry).toHaveBeenCalledWith("auth.github.url.success", { redirectUri: "http://localhost/callback" });
    });

    it("handles github callback, stores tokens, and invalidates queries", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ accessToken: "a", refreshToken: "r", profile: { displayName: "P" } }),
        });
        (globalThis as any).fetch = fetchMock;
        const client = createClient();
        const invalidateSpy = vi.spyOn(client, "invalidateQueries");

        const { result } = renderHook(() => useGithubCallbackMutation(apiBase), { wrapper: wrapper(client) });
        const data = await result.current.mutateAsync({ code: "123", redirectUri: "http://localhost/cb" });

        expect(data.accessToken).toBe("a");
        expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toBe("a");
        expect(localStorage.getItem(REFRESH_TOKEN_KEY)).toBe("r");
        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/auth/github/callback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: "123", redirectUri: "http://localhost/cb" }),
        });
        expect(trackTelemetry).toHaveBeenCalledWith("auth.github.callback.success", { redirectUri: "http://localhost/cb" });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["auth", "session"] });
        expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ["auth", "profile"] });
    });

    it("saves profile preferences and caches response", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ profile: { preference: { note: null } } }) });
        vi.stubGlobal("fetch", fetchMock);
        const client = createClient();
        const setQueryDataSpy = vi.spyOn(client, "setQueryData");

        const { result } = renderHook(() => useProfileSaveMutation(apiBase), { wrapper: wrapper(client) });
        const payload = { preference: { note: "hello" } };
        await result.current.mutateAsync(payload);

        expect(fetchMock).toHaveBeenCalledWith(`${apiBase}/profile`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ preference: { note: "hello" } }),
        });
        expect(setQueryDataSpy).toHaveBeenCalledWith(["auth", "profile"], { profile: { preference: { note: null } } });
        expect(trackTelemetry).toHaveBeenCalledWith("auth.profile.save.success");
    });
});
