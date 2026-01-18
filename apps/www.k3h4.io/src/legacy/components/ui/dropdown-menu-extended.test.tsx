import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "./dropdown-menu";

describe("Dropdown menu primitives", () => {
    it("renders items, checkbox, radio, and sub content", () => {
        render(
            <DropdownMenu open onOpenChange={() => { }}>
                <DropdownMenuTrigger>Open</DropdownMenuTrigger>
                <DropdownMenuContent forceMount>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Item A</DropdownMenuItem>
                    <DropdownMenuCheckboxItem checked>Enabled</DropdownMenuCheckboxItem>
                    <DropdownMenuRadioGroup value="b">
                        <DropdownMenuRadioItem value="a">Option A</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="b">Option B</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSub open>
                        <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>Nested</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    <DropdownMenuSeparator />
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        expect(screen.getByRole("menuitem", { name: /Item A/i })).toBeInTheDocument();
        expect(screen.getByRole("menuitemcheckbox", { name: /Enabled/i })).toHaveAttribute("aria-checked", "true");
        expect(screen.getByRole("menuitemradio", { name: /Option B/i })).toHaveAttribute("aria-checked", "true");
        expect(screen.getByText("Nested")).toBeInTheDocument();
        expect(screen.getByText("⌘K")).toBeInTheDocument();
    });
});
