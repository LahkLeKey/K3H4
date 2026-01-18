import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { InvoiceDialog } from "./invoice-dialog";

const payout = {
    id: "paystub-123456",
    amount: "480",
    note: "Timecard payout",
    status: "paid",
    createdAt: "2024-01-01T00:00:00Z",
};

const assignment = {
    id: "a1",
    personaId: "p1",
    persona: { id: "p1", alias: "Alex", account: "acct-123", handle: "@alex" },
    title: "QA Sprint",
    status: "open",
    hourlyRate: "120",
    timecards: [],
    payouts: [],
};

const persona = assignment.persona;

describe("InvoiceDialog", () => {
    it("shows invoice details for payout", async () => {
        const user = userEvent.setup();

        render(<InvoiceDialog payout={payout} assignment={assignment} persona={persona} />);

        await user.click(screen.getByRole("button", { name: /invoice/i }));

        expect(screen.getByText(/Invoice #PAYSTUB/i)).toBeInTheDocument();
        expect(screen.getByText(/Timecard payout for QA Sprint/i)).toBeInTheDocument();
        expect(screen.getByText(persona.alias)).toBeInTheDocument();
        expect(screen.getByText(persona.account)).toBeInTheDocument();
        expect(screen.getByText(/480\s*k3h4c/i)).toBeInTheDocument();
        expect(screen.getByText(payout.status)).toBeInTheDocument();
    });
});
