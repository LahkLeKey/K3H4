import React, { useCallback, useState } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AuthAccessSection } from "./auth-access-section";
import { AuthCta } from "./auth-cta";
import { PreferencesPanel } from "./preferences-panel";
import { ProfilePanel } from "./profile-panel";
import { ProfileView } from "./profile-view";
import { CallbackStatusCard } from "./callback-status-card";
import { ErrorBoundary } from "./error-boundary";
import type { ProfileState } from "../stores/auth-store";
import { ACCOUNT_DELETE_PHRASE } from "../lib/constants";

vi.mock("./section", () => ({ Section: ({ children }: { children: React.ReactNode }) => <div data-testid="section">{children}</div> }));

describe("AuthCta", () => {
    it("shows login CTA and handles click", () => {
        const onLogin = vi.fn();
        render(<AuthCta userEmail={null} authStatus="idle" authMessage="" onGithubLogin={onLogin} />);

        fireEvent.click(screen.getByRole("button", { name: /login with github/i }));
        expect(onLogin).toHaveBeenCalled();
        expect(screen.queryByText(/session active/i)).toBeNull();
    });

    it("disables while loading and shows messages", () => {
        render(<AuthCta userEmail="me@test.com" authStatus="loading" authMessage="busy" onGithubLogin={vi.fn()} />);

        expect(screen.getByRole("button", { name: /redirecting/i })).toBeDisabled();
        expect(screen.getByText("busy")).toBeInTheDocument();
        expect(screen.getByText(/session active for me@test.com/i)).toBeInTheDocument();
    });
});

describe("AuthAccessSection", () => {
    it("renders section with nested CTA", () => {
        render(
            <AuthAccessSection authStatus="idle" authMessage="" userEmail={null} onGithubLogin={vi.fn()} eyebrow="Hello" title="T" description="D" />,
        );

        expect(screen.getByTestId("section")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /welcome to k3h4/i })).toBeInTheDocument();
    });
});

describe("PreferencesPanel", () => {
    it("updates preference fields", async () => {
        const user = userEvent.setup();
        const setProfileSpy = vi.fn();
        const Wrapper = () => {
            const [profile, setProfile] = useState<ProfileState | null>({ preference: { theme: "system", locale: "en-US", timezone: "UTC", marketingOptIn: false } });
            const handleSetProfile = useCallback(
                (updater: (prev: ProfileState | null) => ProfileState | null) => {
                    setProfile((prev) => updater(prev));
                    setProfileSpy(updater);
                },
                [],
            );
            return <PreferencesPanel profile={profile} setProfile={handleSetProfile} />;
        };
        render(<Wrapper />);

        await user.selectOptions(screen.getByLabelText(/theme/i), "dark");
        await user.clear(screen.getByLabelText(/locale/i));
        await user.type(screen.getByLabelText(/locale/i), "fr-FR");
        await user.clear(screen.getByLabelText(/timezone/i));
        await user.type(screen.getByLabelText(/timezone/i), "PST");
        await user.click(screen.getByRole("checkbox"));

        expect(setProfileSpy.mock.calls.length).toBeGreaterThanOrEqual(4);
        expect((screen.getByLabelText(/theme/i) as HTMLSelectElement).value).toBe("dark");
        expect((screen.getByLabelText(/locale/i) as HTMLInputElement).value).toBe("fr-FR");
        expect((screen.getByLabelText(/timezone/i) as HTMLInputElement).value).toBe("PST");
        expect((screen.getByRole("checkbox") as HTMLInputElement).checked).toBe(true);
    });
});

describe("ProfilePanel", () => {
    it("renders profile details, handles note change, and actions", () => {
        const setProfile = vi.fn();
        const onSave = vi.fn();
        const onSignOut = vi.fn();
        render(
            <ProfilePanel
                userEmail="user@test.com"
                profile={{ displayName: "Name", avatarUrl: "", preference: { note: "hi" } }}
                profileLoading={false}
                profileMessage="saved"
                setProfile={setProfile}
                onSave={onSave}
                onSignOut={onSignOut}
                onDeleteAccount={vi.fn()}
                deletingAccount={false}
                deleteProgress={0}
                deleteStatusText=""
            />,
        );

        fireEvent.change(screen.getByPlaceholderText(/add a short note/i), { target: { value: "new" } });
        fireEvent.click(screen.getByRole("button", { name: /save profile/i }));
        fireEvent.click(screen.getByRole("button", { name: /sign out/i }));

        expect(setProfile).toHaveBeenCalled();
        expect(onSave).toHaveBeenCalled();
        expect(onSignOut).toHaveBeenCalled();
        const savedMessages = screen.getAllByText(/saved/i);
        expect(savedMessages.length).toBeGreaterThan(0);
        expect(screen.getByText(/signed in as user@test.com/i)).toBeInTheDocument();
    });
});

describe("ProfileView", () => {
    it("shows avatar fallback and passes through panel actions", () => {
        const setProfile = vi.fn();
        const onSave = vi.fn();
        const onSignOut = vi.fn();
        const onDeleteAccount = vi.fn();
        render(
            <ProfileView
                userEmail="u@test.com"
                profile={{ displayName: "User", preference: { timezone: "CST" } }}
                profileLoading={false}
                profileMessage="msg"
                setProfile={setProfile as any}
                onSave={onSave}
                onSignOut={onSignOut}
                onDeleteAccount={onDeleteAccount}
                deletingAccount={false}
                deleteProgress={0}
                deleteStatusText=""
            />,
        );

        expect(screen.getByRole("heading", { name: "User" })).toBeInTheDocument();
        expect(screen.getByText(/cst/i)).toBeInTheDocument();
        const signedIn = screen.getAllByText(/signed in as u@test.com/i);
        expect(signedIn.length).toBeGreaterThan(0);
        fireEvent.click(screen.getByRole("button", { name: /save profile/i }));
        expect(onSave).toHaveBeenCalled();
    });

    it("requires double confirmation to delete", async () => {
        const user = userEvent.setup();
        const onDeleteAccount = vi.fn();
        render(
            <ProfilePanel
                userEmail="user@test.com"
                profile={{ displayName: "Name", avatarUrl: "" }}
                profileLoading={false}
                profileMessage=""
                setProfile={vi.fn()}
                onSave={vi.fn()}
                onSignOut={vi.fn()}
                onDeleteAccount={onDeleteAccount}
                deletingAccount={false}
                deleteProgress={0}
                deleteStatusText=""
            />,
        );

        await user.click(screen.getByRole("button", { name: /delete my account/i }));
        const deleteAction = screen.getByRole("button", { name: /delete my data/i });
        expect(deleteAction).toBeDisabled();

        await user.click(screen.getByRole("button", { name: /i understand/i }));
        await user.type(screen.getByPlaceholderText(new RegExp(ACCOUNT_DELETE_PHRASE, "i")), ACCOUNT_DELETE_PHRASE);
        await user.click(deleteAction);
        expect(onDeleteAccount).toHaveBeenCalledWith(ACCOUNT_DELETE_PHRASE);
    });
});

describe("CallbackStatusCard", () => {
    it("shows loading state by default", () => {
        render(<CallbackStatusCard authStatus="loading" authMessage="" onRestart={vi.fn()} onContinue={vi.fn()} />);
        expect(screen.getByText(/preparing github sign-in/i)).toBeInTheDocument();
    });

    it("shows error actions", () => {
        const onRestart = vi.fn();
        render(<CallbackStatusCard authStatus="error" authMessage="boom" onRestart={onRestart} onContinue={vi.fn()} />);
        fireEvent.click(screen.getByRole("button", { name: /restart github sign-in/i }));
        expect(onRestart).toHaveBeenCalled();
        expect(screen.getByText("boom")).toBeInTheDocument();
    });

    it("shows continue on success", () => {
        const onContinue = vi.fn();
        render(<CallbackStatusCard authStatus="success" authMessage="done" onRestart={vi.fn()} onContinue={onContinue} />);
        fireEvent.click(screen.getByRole("button", { name: /continue/i }));
        expect(onContinue).toHaveBeenCalled();
    });
});

describe("ErrorBoundary", () => {
    beforeEach(() => {
        vi.spyOn(console, "error").mockImplementation(() => { });
        Object.defineProperty(window, "location", {
            value: { reload: vi.fn() },
            writable: true,
            configurable: true,
        });
    });

    it("renders children when no error", () => {
        render(
            <ErrorBoundary>
                <div>child</div>
            </ErrorBoundary>,
        );
        expect(screen.getByText("child")).toBeInTheDocument();
    });

    it("shows fallback and reloads on retry", () => {
        const Thrower = () => {
            throw new Error("fail");
        };
        render(
            <ErrorBoundary>
                <Thrower />
            </ErrorBoundary>,
        );

        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
        fireEvent.click(screen.getByRole("button", { name: /reload app/i }));
        expect(window.location.reload).toHaveBeenCalled();
    });
});
