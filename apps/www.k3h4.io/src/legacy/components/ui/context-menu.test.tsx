import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuTrigger,
} from "./context-menu";

describe("context menu", () => {
    it("renders menu items when open", () => {
        render(
            <ContextMenu>
                <ContextMenuTrigger>Trigger</ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuLabel inset>Menu</ContextMenuLabel>
                    <ContextMenuItem>
                        Action <ContextMenuShortcut>Ctrl+A</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuCheckboxItem checked>Checked</ContextMenuCheckboxItem>
                    <ContextMenuRadioGroup value="one">
                        <ContextMenuRadioItem value="one">One</ContextMenuRadioItem>
                    </ContextMenuRadioGroup>
                    <ContextMenuSeparator />
                </ContextMenuContent>
            </ContextMenu>
        );

        fireEvent.contextMenu(screen.getByText("Trigger"));

        expect(screen.getByText("Menu")).toBeInTheDocument();
        expect(screen.getByText("Action")).toBeInTheDocument();
        expect(screen.getByText("Checked")).toBeInTheDocument();
        expect(screen.getByText("One")).toBeInTheDocument();
    });
});
