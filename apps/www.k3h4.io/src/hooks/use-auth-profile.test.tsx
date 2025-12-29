import type { ReactNode } from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useAuthProfile } from "./use-auth-profile";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../lib/constants";
import { authStore } from "../stores/auth-store";

const sessionReturn: any = {};
const profileReturn: any = {};
const githubUrlReturn: any = {};
const githubCallbackReturn: any = {};
const profileSaveReturn: any = {};
const deriveUserMock = vi.fn();

vi.mock("./use-auth-queries", () => ({
    deriveUser: (...args: unknown[]) => deriveUserMock(...args),
    useSessionQuery: () => sessionReturn,
    useProfileQuery: () => profileReturn,
    useGithubUrlMutation: () => githubUrlReturn,
    useGithubCallbackMutation: () => githubCallbackReturn,
    useProfileSaveMutation: () => profileSaveReturn,
}));

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

describe("useAuthProfile", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
        Object.defineProperty(window, "location", {
            value: { href: "http://localhost", origin: "http://localhost" },
            writable: true,
            configurable: true,
        });
        deriveUserMock.mockReturnValue({ status: "anonymous" });
        sessionReturn.data = undefined;
        sessionReturn.isPending = false;
        sessionReturn.isError = false;
        sessionReturn.error = null;
        profileReturn.data = undefined;
        profileReturn.isPending = false;
        githubUrlReturn.mutateAsync = vi.fn().mockResolvedValue({ authorizeUrl: "http://auth" });
        githubUrlReturn.error = null;
        githubCallbackReturn.mutateAsync = vi.fn();
        githubCallbackReturn.error = null;
        profileSaveReturn.mutateAsync = vi.fn();
        profileSaveReturn.isPending = false;
        authStore.setState({
            apiBase,
            redirectUri: "http://localhost/callback",
            user: { status: "anonymous" },
            authStatus: "idle",
            authMessage: "",
            profile: null,
            profileLoading: false,
            profileMessage: "",
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("boots from token and populates user and profile", async () => {
        sessionReturn.data = { user: { email: "a@b.com" } };
        deriveUserMock.mockReturnValue({ status: "authenticated", email: "a@b.com" });
        profileReturn.data = { profile: { displayName: "Name" } };
        const setAuthStateSpy = vi.spyOn(authStore.getState(), "setAuthState");
        const setProfileFromServerSpy = vi.spyOn(authStore.getState(), "setProfileFromServer");
        const setUserSpy = vi.spyOn(authStore.getState(), "setUser");
        const client = createClient();

        const { result } = renderHook(() => useAuthProfile(), { wrapper: wrapper(client) });

        await waitFor(() => expect(result.current.userEmail).toBe("a@b.com"));
        expect(setUserSpy).toHaveBeenCalledWith({ status: "authenticated", email: "a@b.com" });
        expect(setAuthStateSpy).toHaveBeenCalledWith("success", "Signed in as a@b.com");
        expect(setProfileFromServerSpy).toHaveBeenCalledWith({ displayName: "Name" });
        expect(result.current.profileLoading).toBe(false);
    });

    it("handles github login redirect", async () => {
        const setAuthStateSpy = vi.spyOn(authStore.getState(), "setAuthState");
        const client = createClient();

        const { result } = renderHook(() => useAuthProfile(), { wrapper: wrapper(client) });

        await act(async () => {
            await result.current.handleGithubLogin();
        });

        expect(githubUrlReturn.mutateAsync).toHaveBeenCalledWith({ redirectUri: "http://localhost/callback" });
        expect(setAuthStateSpy).toHaveBeenCalledWith("loading", "Redirecting to GitHub...");
        expect(window.location.href).toBe("http://auth");
    });

    it("signs out and clears caches", async () => {
        const client = createClient();
        const removeSpy = vi.spyOn(client, "removeQueries");
        const setAuthStateSpy = vi.spyOn(authStore.getState(), "setAuthState");
        authStore.setState({ authStatus: "success", authMessage: "" });
        localStorage.setItem(REFRESH_TOKEN_KEY, "refresh");

        const { result } = renderHook(() => useAuthProfile(), { wrapper: wrapper(client) });

        act(() => result.current.handleSignOut());

        expect(localStorage.getItem(ACCESS_TOKEN_KEY)).toBeNull();
        expect(localStorage.getItem(REFRESH_TOKEN_KEY)).toBeNull();
        expect(authStore.getState().user).toEqual({ status: "anonymous" });
        expect(authStore.getState().profile).toBeNull();
        expect(setAuthStateSpy).toHaveBeenCalledWith("idle", "Signed out");
        expect(removeSpy).toHaveBeenCalledWith({ queryKey: ["auth", "session"] });
        expect(removeSpy).toHaveBeenCalledWith({ queryKey: ["auth", "profile"] });
    });

    it("surfaces session errors and resets token state", async () => {
        sessionReturn.isError = true;
        sessionReturn.error = new Error("expired");
        deriveUserMock.mockReturnValue({ status: "anonymous" });
        const setAuthStateSpy = vi.spyOn(authStore.getState(), "setAuthState");
        const setUserSpy = vi.spyOn(authStore.getState(), "setUser");
        const client = createClient();

        const { result } = renderHook(() => useAuthProfile(), { wrapper: wrapper(client) });

        await waitFor(() => expect(result.current.user.status).toBe("anonymous"));
        expect(setUserSpy).toHaveBeenCalledWith({ status: "anonymous" });
        expect(setAuthStateSpy).toHaveBeenCalledWith("idle", "expired");
    });

    it("skips profile save when missing profile", async () => {
        profileSaveReturn.mutateAsync.mockResolvedValue({ profile: { preference: { note: "x" } } });
        const setProfileMessageSpy = vi.spyOn(authStore.getState(), "setProfileMessage");
        const client = createClient();

        const { result } = renderHook(() => useAuthProfile(), { wrapper: wrapper(client) });

        act(() => {
            result.current.handleProfileSave();
        });

        expect(setProfileMessageSpy).toHaveBeenCalledWith("Nothing to save");
    });
});
