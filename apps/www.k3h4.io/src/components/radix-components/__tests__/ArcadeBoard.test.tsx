import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ArcadeBoard } from "../ArcadeBoard";
import { useArcadeStore } from "../../../zustand-stores/arcade";
import { useAuthStore } from "../../../zustand-stores/auth";

const overviewSample = {
    machines: [
        {
            id: "machine-1",
            name: "Pinball",
            status: "ready",
            createdAt: "2026-01-01T00:00:00.000Z",
        },
    ],
    cards: [
        {
            id: "card-1",
            label: "Arcade card",
            balance: "15.00",
            topUps: [
                {
                    id: "topup-1",
                    amount: "5.00",
                    source: "k3h4-coin",
                    createdAt: "2026-01-01T01:00:00.000Z",
                },
            ],
        },
    ],
    prizes: [
        {
            id: "prize-1",
            name: "Scratch ticket",
            sku: "scratch-001",
            costCoins: "3.50",
            stock: 7,
        },
    ],
    sessions: [
        {
            id: "session-1",
            machineId: "machine-1",
            cardId: "card-1",
            creditsSpent: "2.00",
            score: 120,
            startedAt: "2026-01-01T02:00:00.000Z",
        },
    ],
    redemptions: [
        {
            id: "redemption-1",
            prizeId: "prize-1",
            cardId: "card-1",
            sessionId: "session-1",
            createdAt: "2026-01-01T02:05:00.000Z",
        },
    ],
};

describe("ArcadeBoard", () => {
    const originalFetch = useArcadeStore.getState().fetchOverview;

    beforeEach(() => {
        useAuthStore.setState({ session: { accessToken: "stub-token" } });
        useArcadeStore.setState({
            overview: overviewSample,
            status: "ready",
            error: null,
            fetchOverview: vi.fn().mockResolvedValue(undefined),
        });
    });

    afterEach(() => {
        useArcadeStore.setState({
            overview: null,
            status: "idle",
            error: null,
            fetchOverview: originalFetch,
        });
        useAuthStore.setState({ session: null });
        vi.clearAllMocks();
    });

    it("renders the ledger-driven overview", () => {
        render(<ArcadeBoard />);
        expect(screen.getByText("Arcade card")).toBeInTheDocument();
        expect(screen.getByText("Pinball")).toBeInTheDocument();
        expect(screen.getByText("Scratch ticket")).toBeInTheDocument();
        expect(screen.getByText("Play history")).toBeInTheDocument();
        expect(screen.getByText("Prize claims")).toBeInTheDocument();
        expect(screen.getByText("₭15.00")).toBeInTheDocument();
        expect(screen.getByText("120")).toBeInTheDocument();
    });
});
