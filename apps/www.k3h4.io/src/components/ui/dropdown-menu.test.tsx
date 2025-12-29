import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "./dropdown-menu";

describe("DropdownMenu", () => {
    it("opens and shows items", async () => {
        const user = userEvent.setup();
        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Item A</DropdownMenuItem>
                    <DropdownMenuItem inset>Item B</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>,
        );

        await user.click(screen.getByText("Open"));
        expect(await screen.findByText("Actions")).toBeInTheDocument();
        expect(screen.getByText("Item A")).toBeInTheDocument();
        expect(screen.getByText("Item B")).toBeInTheDocument();
    });
});
