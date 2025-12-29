import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from "./input-group";

describe("InputGroup", () => {
    it("focuses input when addon is clicked", async () => {
        const user = userEvent.setup();

        render(
            <InputGroup>
                <InputGroupAddon>https://</InputGroupAddon>
                <InputGroupInput placeholder="url" />
                <InputGroupButton size="sm">Go</InputGroupButton>
            </InputGroup>
        );

        const input = screen.getByPlaceholderText("url");
        await user.click(screen.getByText("https://"));
        expect(input).toHaveFocus();
    });

    it("renders textarea and inline text", () => {
        render(
            <InputGroup>
                <InputGroupText>Notes</InputGroupText>
                <InputGroupTextarea aria-label="notes" />
            </InputGroup>
        );

        expect(screen.getByText("Notes")).toBeInTheDocument();
        expect(screen.getByLabelText("notes")).toBeInTheDocument();
    });
});
