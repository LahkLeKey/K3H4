import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "./sheet";

// Simple controlled-open smoke to cover layout and close button.
describe("Sheet primitives", () => {
    it("renders header, body, footer when open", () => {
        render(
            <Sheet open onOpenChange={() => { }}>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>Sheet Title</SheetTitle>
                        <SheetDescription>Sheet Desc</SheetDescription>
                    </SheetHeader>
                    <div>Panel body</div>
                    <SheetFooter>
                        <button type="button">Action</button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        );

        expect(screen.getByText("Sheet Title")).toBeInTheDocument();
        expect(screen.getByText("Sheet Desc")).toBeInTheDocument();
        expect(screen.getByText("Panel body")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /action/i })).toBeInTheDocument();
    });
});
