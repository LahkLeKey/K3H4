import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarCheckboxItem,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent,
    MenubarShortcut,
} from "./menubar";

describe("Menubar primitives", () => {
    it("renders checkbox, radio, and sub menu content", () => {
        render(
            <Menubar>
                <MenubarMenu {...({ open: true, onOpenChange: () => { } } as any)}>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent forceMount>
                        <MenubarItem>New</MenubarItem>
                        <MenubarCheckboxItem checked>Autosave</MenubarCheckboxItem>
                        <MenubarRadioGroup value="code">
                            <MenubarRadioItem value="code">Code</MenubarRadioItem>
                            <MenubarRadioItem value="preview">Preview</MenubarRadioItem>
                        </MenubarRadioGroup>
                        <MenubarSub open>
                            <MenubarSubTrigger>Share</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem>Link</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarShortcut>Ctrl+P</MenubarShortcut>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        );

        expect(screen.getByRole("menuitem", { name: /New/i })).toBeInTheDocument();
        expect(screen.getByRole("menuitemcheckbox", { name: /Autosave/i })).toHaveAttribute("aria-checked", "true");
        expect(screen.getByRole("menuitemradio", { name: /Code/i })).toHaveAttribute("aria-checked", "true");
        expect(screen.getByRole("menuitemradio", { name: /Preview/i })).toHaveAttribute("aria-checked", "false");
        expect(screen.getByText("Link")).toBeInTheDocument();
        expect(screen.getByText("Ctrl+P")).toBeInTheDocument();
    });
});
