import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithQuery } from "../../test/utils";
import type { Assignment } from "../../hooks/use-assignment-queries";

const usePersonaListQueryMock = vi.fn();
const useAssignmentsQueryMock = vi.fn();
const useCreateAssignmentMutationMock = vi.fn();
const useCreateTimecardMutationMock = vi.fn();
const usePayTimecardMutationMock = vi.fn();

vi.mock("../../hooks/use-persona-queries", () => ({
    usePersonaListQuery: (...args: unknown[]) => usePersonaListQueryMock(...args),
}));

vi.mock("../../hooks/use-assignment-queries", () => ({
    useAssignmentsQuery: (...args: unknown[]) => useAssignmentsQueryMock(...args),
    useCreateAssignmentMutation: (...args: unknown[]) => useCreateAssignmentMutationMock(...args),
    useCreateTimecardMutation: (...args: unknown[]) => useCreateTimecardMutationMock(...args),
    usePayTimecardMutation: (...args: unknown[]) => usePayTimecardMutationMock(...args),
}));

import { AssignmentAgency } from "./assignment-agency";

const persona = { id: "p1", alias: "Alex", account: "acct-123", handle: "@alex" };
const baseAssignment: Assignment = {
    id: "a1",
    personaId: persona.id,
    persona,
    title: "QA Sprint",
    status: "open",
    hourlyRate: "120",
    timecards: [],
    payouts: [],
};

let createAssignmentFn: ReturnType<typeof vi.fn>;
let createTimecardFn: ReturnType<typeof vi.fn>;
let payTimecardFn: ReturnType<typeof vi.fn>;

beforeEach(() => {
    createAssignmentFn = vi.fn().mockResolvedValue({});
    createTimecardFn = vi.fn().mockResolvedValue({});
    payTimecardFn = vi.fn().mockResolvedValue({});

    usePersonaListQueryMock.mockReturnValue({
        data: [persona],
        isLoading: false,
        isFetching: false,
        refetch: vi.fn(),
    });

    useAssignmentsQueryMock.mockReturnValue({
        data: [],
        isLoading: false,
        error: null,
        refetch: vi.fn(),
    });

    useCreateAssignmentMutationMock.mockReturnValue({ mutateAsync: createAssignmentFn, isPending: false });
    useCreateTimecardMutationMock.mockReturnValue({ mutateAsync: createTimecardFn, isPending: false });
    usePayTimecardMutationMock.mockReturnValue({ mutateAsync: payTimecardFn, isPending: false });
});

describe("AssignmentAgency", () => {
    it("requires title and persona", async () => {
        const user = userEvent.setup();

        renderWithQuery(<AssignmentAgency apiBase="https://api.example.com" userEmail="user@test.com" />);

        await user.click(screen.getByRole("button", { name: /create assignment/i }));

        expect(screen.getByText("Assignment title and persona are required")).toBeInTheDocument();
        expect(createAssignmentFn).not.toHaveBeenCalled();
        expect(screen.getByText(/No assignments yet/i)).toBeInTheDocument();
    });

    it("validates hourly rate input", async () => {
        const user = userEvent.setup();

        renderWithQuery(<AssignmentAgency apiBase="https://api.example.com" userEmail="user@test.com" />);

        await user.type(screen.getByLabelText(/assignment title/i), "Test shift");
        await user.selectOptions(screen.getByLabelText(/worker persona/i), "p1");
        const rate = screen.getByLabelText(/hourly rate/i);
        await user.clear(rate);
        await user.type(rate, "-5");

        await user.click(screen.getByRole("button", { name: /create assignment/i }));

        expect(screen.getByText("Enter a valid hourly rate")).toBeInTheDocument();
        expect(createAssignmentFn).not.toHaveBeenCalled();
    });

    it("creates assignment and resets form", async () => {
        const user = userEvent.setup();

        renderWithQuery(<AssignmentAgency apiBase="https://api.example.com" userEmail="user@test.com" />);

        const title = screen.getByLabelText(/assignment title/i);
        const personaSelect = screen.getByLabelText(/worker persona/i);
        const rate = screen.getByLabelText(/hourly rate/i);

        await user.type(title, "  Shift Run  ");
        await user.selectOptions(personaSelect, "p1");
        await user.clear(rate);
        await user.type(rate, "150");
        await user.click(screen.getByRole("button", { name: /create assignment/i }));

        await waitFor(() => expect(createAssignmentFn).toHaveBeenCalledWith({
            title: "Shift Run",
            personaId: "p1",
            hourlyRate: 150,
        }));

        expect(title).toHaveValue("");
        expect(personaSelect).toHaveValue("");
        expect(rate).toHaveValue("150");
    });

    it("adds timecards with validation and notes", async () => {
        const assignment = { ...baseAssignment };
        useAssignmentsQueryMock.mockReturnValue({
            data: [assignment],
            isLoading: false,
            error: null,
            refetch: vi.fn(),
        });

        const user = userEvent.setup();
        renderWithQuery(<AssignmentAgency apiBase="https://api.example.com" userEmail="user@test.com" />);

        const hoursInput = screen.getByPlaceholderText("Hours worked");
        const noteInput = screen.getByPlaceholderText("Timecard note");
        const addButton = screen.getByRole("button", { name: /add timecard/i });

        await user.clear(hoursInput);
        await user.type(hoursInput, "0");
        await user.click(addButton);

        expect(await screen.findByText("Enter valid hours for the timecard")).toBeInTheDocument();
        expect(createTimecardFn).not.toHaveBeenCalled();

        await user.clear(hoursInput);
        await user.type(hoursInput, "4");
        await user.clear(noteInput);
        await user.type(noteInput, "Shift note");
        await user.click(addButton);

        await waitFor(() => expect(createTimecardFn).toHaveBeenCalledWith({
            assignmentId: assignment.id,
            hours: 4,
            note: "Shift note",
        }));
        await waitFor(() => expect(screen.queryByText(/Enter valid hours/)).not.toBeInTheDocument());
    });

    it("pays approved timecards and surfaces errors", async () => {
        const assignments: Assignment[] = [{
            ...baseAssignment,
            timecards: [
                { id: "tc-1", hours: "4", amount: "480", note: "approved", status: "approved" },
                { id: "tc-2", hours: "2", amount: "240", note: "submitted", status: "submitted" },
            ],
            payouts: [
                { id: "pay-1", amount: "480", note: "stub", status: "paid", createdAt: "2024-01-01T00:00:00Z" },
            ],
        }];

        const payError = new Error("Payment failed");
        payTimecardFn.mockRejectedValueOnce(payError);

        useAssignmentsQueryMock.mockReturnValueOnce({
            data: assignments,
            isLoading: false,
            error: null,
            refetch: vi.fn(),
        });

        const user = userEvent.setup();
        renderWithQuery(<AssignmentAgency apiBase="https://api.example.com" userEmail="user@test.com" />);

        await user.click(screen.getByRole("button", { name: /pay/i }));

        await waitFor(() => expect(payTimecardFn).toHaveBeenCalledWith({ assignmentId: "a1", timecardId: "tc-1" }));
        await waitFor(() => expect(screen.getByText(payError.message)).toBeInTheDocument());
    });
});
