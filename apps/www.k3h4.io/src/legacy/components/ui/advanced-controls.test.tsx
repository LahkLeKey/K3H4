import { beforeAll, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";
import { Toggle } from "./toggle";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./pagination";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "./sheet";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from "./drawer";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./collapsible";

beforeAll(() => {
    if (!global.ResizeObserver) {
        // Minimal shim for radix components that rely on size observers
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).ResizeObserver = class {
            observe() { }
            unobserve() { }
            disconnect() { }
        };
    }

    if (!window.matchMedia) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).matchMedia = () => ({ matches: false, addListener() { }, removeListener() { } });
    }

    if (!Element.prototype.hasPointerCapture) {
        Element.prototype.hasPointerCapture = () => false;
        Element.prototype.setPointerCapture = () => { };
        Element.prototype.releasePointerCapture = () => { };
    }

    if (!Element.prototype.scrollIntoView) {
        Element.prototype.scrollIntoView = () => { };
    }

    const originalGetComputedStyle = window.getComputedStyle;
    window.getComputedStyle = (...args) => {
        const style = originalGetComputedStyle(...args);
        if (style && !style.transform) {
            Object.defineProperty(style, "transform", {
                value: "matrix(1,0,0,1,0,0)",
                configurable: true,
            });
        }
        return style;
    };
});

describe("UI advanced controls", () => {
    it("selects an option", async () => {
        const user = userEvent.setup();
        render(
            <Select defaultValue="b">
                <SelectTrigger aria-label="letters">
                    <SelectValue placeholder="Pick one" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="a">Option A</SelectItem>
                    <SelectItem value="b">Option B</SelectItem>
                </SelectContent>
            </Select>
        );

        expect(screen.getByText("Option B")).toBeInTheDocument();

        await user.click(screen.getByLabelText("letters"));
        const optionA = await screen.findByText("Option A");
        await user.click(optionA);

        expect(screen.getByText("Option A")).toBeInTheDocument();
    });

    it("toggles standalone and grouped toggles", async () => {
        const user = userEvent.setup();
        render(
            <div>
                <Toggle aria-label="solo" />
                <ToggleGroup type="single" aria-label="numbers">
                    <ToggleGroupItem value="one">One</ToggleGroupItem>
                    <ToggleGroupItem value="two">Two</ToggleGroupItem>
                </ToggleGroup>
            </div>
        );

        const solo = screen.getByRole("button", { name: "solo" });
        expect(solo).toHaveAttribute("data-state", "off");
        await user.click(solo);
        expect(solo).toHaveAttribute("data-state", "on");

        const two = screen.getByRole("radio", { name: "Two" });
        await user.click(two);
        expect(two).toHaveAttribute("data-state", "on");
    });

    it("selects a radio option", async () => {
        const user = userEvent.setup();
        render(
            <RadioGroup aria-label="choices">
                <RadioGroupItem value="x" aria-label="x" />
                <RadioGroupItem value="y" aria-label="y" />
            </RadioGroup>
        );

        const optionY = screen.getByRole("radio", { name: "y" });
        expect(optionY).not.toBeChecked();
        await user.click(optionY);
        expect(optionY).toBeChecked();
    });

    it("renders pagination with active page", () => {
        render(
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#prev" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#1">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#2" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#next" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );

        expect(screen.getByLabelText("Go to next page")).toBeInTheDocument();
        expect(screen.getByText("2")).toHaveAttribute("aria-current", "page");
    });

    it("opens and closes a sheet", async () => {
        const user = userEvent.setup();
        render(
            <Sheet>
                <SheetTrigger>Open sheet</SheetTrigger>
                <SheetContent>
                    <SheetTitle>Sheet title</SheetTitle>
                    <SheetDescription>Sheet body</SheetDescription>
                </SheetContent>
            </Sheet>
        );

        await user.click(screen.getByText("Open sheet"));
        expect(await screen.findByText("Sheet title")).toBeInTheDocument();

        await user.click(screen.getByText("Close"));
    });

    it("opens and closes a drawer", async () => {
        const user = userEvent.setup();
        render(
            <Drawer>
                <DrawerTrigger>Open drawer</DrawerTrigger>
                <DrawerContent>
                    <DrawerTitle>Drawer title</DrawerTitle>
                    <DrawerDescription>Drawer body</DrawerDescription>
                    <DrawerClose>Dismiss</DrawerClose>
                </DrawerContent>
            </Drawer>
        );

        await user.click(screen.getByText("Open drawer"));
        expect(await screen.findByText("Drawer title")).toBeInTheDocument();

        await user.click(screen.getByText("Dismiss"));
    });

    it("toggles collapsible content", async () => {
        const user = userEvent.setup();
        render(
            <Collapsible>
                <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                <CollapsibleContent>Hidden area</CollapsibleContent>
            </Collapsible>
        );

        await user.click(screen.getByText("Toggle"));
        expect(await screen.findByText("Hidden area")).toBeInTheDocument();
    });
});
