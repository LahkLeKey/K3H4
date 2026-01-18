import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import { HomePage } from "./home";
import { ProfilePage } from "./profile";

const mockUseAuthProfile = vi.fn();

vi.mock("../hooks/use-auth-profile", () => ({
    useAuthProfile: () => mockUseAuthProfile(),
}));

vi.mock("../components/auth-access-section", () => ({
    AuthAccessSection: (props: { title?: string }) => <div data-testid="auth-access">{props.title ?? "auth"}</div>,
}));

vi.mock("../components/bank/bank-table", () => ({
    BankTable: (props: { userEmail: string | null }) => <div data-testid="bank-table">{props.userEmail}</div>,
}));

vi.mock("../components/profile-view", () => ({
    ProfileView: (props: { userEmail: string | null }) => <div data-testid="profile-view">{props.userEmail}</div>,
}));

beforeEach(() => {
    mockUseAuthProfile.mockReset();
});

describe("HomePage", () => {
    it("shows bank table when authenticated", () => {
        mockUseAuthProfile.mockReturnValue({
            apiBase: "api",
            user: { status: "authenticated" },
            userEmail: "me@test.com",
            authStatus: "success",
            authMessage: "",
            handleGithubLogin: vi.fn(),
        });

        render(<HomePage />);
        expect(screen.getByTestId("bank-table")).toHaveTextContent("me@test.com");
        expect(screen.queryByTestId("auth-access")).toBeNull();
    });

    it("shows auth access when unauthenticated", () => {
        mockUseAuthProfile.mockReturnValue({
            apiBase: "api",
            user: { status: "unauthenticated" },
            userEmail: null,
            authStatus: "idle",
            authMessage: "",
            handleGithubLogin: vi.fn(),
        });

        render(<HomePage />);
        expect(screen.getByTestId("auth-access")).toBeInTheDocument();
    });
});

describe("ProfilePage", () => {
    it("prompts auth when unauthenticated", () => {
        mockUseAuthProfile.mockReturnValue({
            authStatus: "idle",
            authMessage: "",
            user: { status: "unauthenticated" },
            userEmail: null,
            profile: null,
            profileLoading: false,
            profileMessage: "",
            setProfile: vi.fn(),
            handleProfileSave: vi.fn(),
            handleSignOut: vi.fn(),
            handleGithubLogin: vi.fn(),
        });

        render(<ProfilePage />);
        expect(screen.getByTestId("auth-access")).toBeInTheDocument();
    });

    it("renders profile view when authenticated", () => {
        mockUseAuthProfile.mockReturnValue({
            authStatus: "success",
            authMessage: "",
            user: { status: "authenticated" },
            userEmail: "user@test.com",
            profile: { displayName: "User" },
            profileLoading: false,
            profileMessage: "ok",
            setProfile: vi.fn(),
            handleProfileSave: vi.fn(),
            handleSignOut: vi.fn(),
            handleGithubLogin: vi.fn(),
        });

        render(<ProfilePage />);
        expect(screen.getByTestId("profile-view")).toHaveTextContent("user@test.com");
    });
});
