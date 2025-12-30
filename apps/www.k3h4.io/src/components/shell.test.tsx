import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { screen, waitFor, within, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithQuery } from "../test/utils";

const useAuthProfileMock = vi.fn();

vi.mock("../hooks/use-auth-profile", () => ({
    useAuthProfile: (...args: unknown[]) => useAuthProfileMock(...args),
}));

vi.mock("../lib/telemetry", () => ({
    trackTelemetry: vi.fn(),
    setTelemetryApiBase: vi.fn(),
}));

vi.mock("./auth-access-section", () => ({ AuthAccessSection: ({ authStatus }: { authStatus: string }) => <div>AuthAccess {authStatus}</div> }));
vi.mock("./profile-panel", () => ({ ProfilePanel: () => <div>ProfilePanel</div> }));

vi.mock("./bank/bank-table", () => ({ BankTable: () => <div>BankTable</div> }));
vi.mock("./persona/persona-table", () => ({ PersonaTable: () => <div>PersonaTable</div> }));
vi.mock("./agency/assignment-agency", () => ({ AssignmentAgency: () => <div>Agency</div> }));
vi.mock("./freight/freight-manager", () => ({ FreightManager: () => <div>Freight</div> }));
vi.mock("./warehouse/warehouse-dashboard", () => ({ WarehouseDashboard: () => <div>Warehouse</div> }));
vi.mock("./pos/pos-dashboard", () => ({ PosDashboard: () => <div>POS</div> }));
vi.mock("./agriculture/agriculture-dashboard", () => ({ AgricultureDashboard: () => <div>Agriculture</div> }));
vi.mock("./culinary/culinary-ops", () => ({ CulinaryOps: () => <div>Culinary</div> }));

import { Shell } from "./shell";
import { trackTelemetry } from "../lib/telemetry";
import { MODULE_STORAGE_KEY } from "../lib/constants";

const dropdownButtonLabel = /industry module/i;
const businessDropdownLabel = /business flow/i;
const userStorageKey = `${MODULE_STORAGE_KEY}:user@test.com`;

describe("Shell", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        useAuthProfileMock.mockReturnValue({
            apiBase: "https://api.example.com",
            userEmail: "user@test.com",
            authStatus: "success",
            authMessage: "",
            profile: null,
            profileLoading: false,
            profileMessage: "",
            setProfile: vi.fn(),
            handleGithubLogin: vi.fn(),
            handleSignOut: vi.fn(),
            handleProfileSave: vi.fn(),
        });
    });

    it("renders current module label and switches modules", async () => {
        const user = userEvent.setup();
        renderWithQuery(
            <MemoryRouter initialEntries={["/"]}>
                <Shell />
            </MemoryRouter>,
        );

        const trigger = screen.getByRole("button", { name: dropdownButtonLabel });
        expect(within(trigger).getByText(/Industry module/i)).toBeInTheDocument();
        expect(within(trigger).getByText("Bank")).toBeInTheDocument();

        await user.click(trigger);
        await user.click(await screen.findByRole("menuitem", { name: /Culinary/i }));

        await waitFor(() => expect(within(trigger).getByText("Culinary")).toBeInTheDocument());
        expect(trackTelemetry).toHaveBeenCalledWith("shell.module.select", { module: "culinary", userEmail: "user@test.com" });
    });

    it("switches business scenarios and syncs module selection", async () => {
        const user = userEvent.setup();
        renderWithQuery(
            <MemoryRouter initialEntries={["/"]}>
                <Shell />
            </MemoryRouter>,
        );

        const businessTrigger = screen.getByRole("button", { name: businessDropdownLabel });
        await user.click(businessTrigger);
        await user.click(await screen.findByRole("menuitem", { name: /Farm Supply Loop/i }));

        const moduleTrigger = screen.getByRole("button", { name: dropdownButtonLabel });
        await waitFor(() => expect(within(moduleTrigger).getByText("Agriculture")).toBeInTheDocument());
        expect(trackTelemetry).toHaveBeenCalledWith("shell.business.select", { business: "farm", userEmail: "user@test.com" });
        expect(trackTelemetry).toHaveBeenCalledWith("shell.module.select", { module: "agriculture", userEmail: "user@test.com" });
    });

    it("persists selection to localStorage", async () => {
        const user = userEvent.setup();
        renderWithQuery(
            <MemoryRouter initialEntries={["/"]}>
                <Shell />
            </MemoryRouter>,
        );

        const trigger = screen.getByRole("button", { name: dropdownButtonLabel });

        await user.click(trigger);
        await user.click(await screen.findByRole("menuitem", { name: /Point of Sale/i }));

        await waitFor(() => expect(within(trigger).getByText("Point of Sale")).toBeInTheDocument());
        await waitFor(() => expect(localStorage.getItem(userStorageKey)).toBe("pos"));
    });

    it("restores persisted module from localStorage for user and global fallback", async () => {
        localStorage.setItem(userStorageKey, "warehouse");
        const user = userEvent.setup();
        renderWithQuery(
            <MemoryRouter initialEntries={["/"]}>
                <Shell />
            </MemoryRouter>,
        );

        const trigger = screen.getByRole("button", { name: dropdownButtonLabel });
        await waitFor(() => expect(within(trigger).getByText("Warehouse")).toBeInTheDocument());

        cleanup();

        // fallback to global key when user-specific missing
        localStorage.clear();
        localStorage.setItem(MODULE_STORAGE_KEY, "freight");
        renderWithQuery(
            <MemoryRouter initialEntries={["/"]}>
                <Shell />
            </MemoryRouter>,
        );

        const fallbackTrigger = screen.getByRole("button", { name: dropdownButtonLabel });
        await waitFor(() => expect(within(fallbackTrigger).getByText("Freight")).toBeInTheDocument());
        await user.click(fallbackTrigger);
        const freightOptions = await screen.findAllByRole("menuitem", { name: /Freight/i });
        expect(freightOptions.length).toBeGreaterThanOrEqual(1);
    });

    it("shows signed out view and hides module switcher when unauthenticated", async () => {
        useAuthProfileMock.mockReturnValueOnce({
            apiBase: "https://api.example.com",
            userEmail: null,
            authStatus: "idle",
            authMessage: "Please sign in",
            profile: null,
            profileLoading: false,
            profileMessage: "",
            setProfile: vi.fn(),
            handleGithubLogin: vi.fn(),
            handleSignOut: vi.fn(),
            handleProfileSave: vi.fn(),
        });

        renderWithQuery(
            <MemoryRouter initialEntries={["/"]}>
                <Shell />
            </MemoryRouter>,
        );

        expect(screen.queryByRole("button", { name: dropdownButtonLabel })).not.toBeInTheDocument();
        expect(screen.queryByRole("button", { name: businessDropdownLabel })).not.toBeInTheDocument();
        expect(screen.getByText(/AuthAccess idle/)).toBeInTheDocument();
    });
});
