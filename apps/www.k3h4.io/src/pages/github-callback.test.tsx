import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { GithubCallbackPage } from "./github-callback";

const mockNavigate = vi.fn();
const mockUseAuthProfile = vi.fn();
let locationSearch = "?code=abc";

vi.mock("react-router-dom", async () => {
    const mod = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
    return { ...mod, useNavigate: () => mockNavigate, useLocation: () => ({ pathname: "/auth/github/callback", search: locationSearch }) };
});

vi.mock("../hooks/use-auth-profile", () => ({
    useAuthProfile: () => mockUseAuthProfile(),
}));

beforeEach(() => {
    mockNavigate.mockReset();
    mockUseAuthProfile.mockReset();
    locationSearch = "?code=abc";
});

describe("GithubCallbackPage", () => {
    it("completes callback and redirects on success", async () => {
        const completeGithubCallback = vi.fn(async () => ({ ok: true }));
        const setAuthState = vi.fn();
        mockUseAuthProfile.mockReturnValue({
            authStatus: "loading",
            authMessage: "",
            redirectUri: "http://localhost",
            completeGithubCallback,
            setAuthState,
        });

        render(
            <MemoryRouter>
                <GithubCallbackPage />
            </MemoryRouter>,
        );

        await waitFor(() => expect(completeGithubCallback).toHaveBeenCalledWith("abc", "http://localhost"), { timeout: 1500 });
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true }), { timeout: 1500 });
        expect(setAuthState).not.toHaveBeenCalledWith("error", expect.anything());
    });

    it("surfaces error param and does not call callback", async () => {
        locationSearch = "?error=denied";
        const completeGithubCallback = vi.fn();
        const setAuthState = vi.fn();
        mockUseAuthProfile.mockReturnValue({
            authStatus: "error",
            authMessage: "boom",
            redirectUri: "http://localhost",
            completeGithubCallback,
            setAuthState,
        });
        render(
            <MemoryRouter>
                <GithubCallbackPage />
            </MemoryRouter>,
        );

        await waitFor(() => expect(setAuthState).toHaveBeenCalledWith("error", "denied"), { timeout: 1500 });
        expect(completeGithubCallback).not.toHaveBeenCalled();
    });

    it("handles missing code", async () => {
        locationSearch = "";
        const setAuthState = vi.fn();
        mockUseAuthProfile.mockReturnValue({
            authStatus: "error",
            authMessage: "",
            redirectUri: "http://localhost",
            completeGithubCallback: vi.fn(),
            setAuthState,
        });
        render(
            <MemoryRouter>
                <GithubCallbackPage />
            </MemoryRouter>,
        );

        await waitFor(() => expect(setAuthState).toHaveBeenCalledWith("error", "Missing authorization code"), { timeout: 1500 });
    });
});
