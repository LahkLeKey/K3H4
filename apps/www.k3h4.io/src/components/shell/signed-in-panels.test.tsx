import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("../profile-panel", () => ({
    ProfilePanel: () => <div data-testid="profile-panel" />,
}));
vi.mock("../preferences-panel", () => ({
    PreferencesPanel: () => <div data-testid="preferences-panel" />,
}));
vi.mock("./section-card", () => ({
    SectionCard: ({ children, tone }: { children: React.ReactNode; tone: string }) => (
        <div data-testid={`section-${tone}`}>{children}</div>
    ),
}));

import { SignedInPanels } from "./signed-in-panels";

describe("SignedInPanels", () => {
    it("renders profile and preferences panels", () => {
        const noOp = vi.fn();

        render(
            <SignedInPanels
                userEmail="user@example.com"
                profile={null}
                profileLoading={false}
                profileMessage=""
                setProfile={noOp}
                onSave={noOp}
                onSignOut={noOp}
            />
        );

        expect(screen.getByTestId("profile-panel")).toBeInTheDocument();
        expect(screen.getByTestId("preferences-panel")).toBeInTheDocument();
        expect(screen.getByTestId("section-default")).toBeInTheDocument();
        expect(screen.getByTestId("section-muted")).toBeInTheDocument();
    });
});
