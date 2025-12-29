import { beforeAll, describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./accordion";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "./dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./alert-dialog";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
    Command,
} from "./command";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

beforeAll(() => {
    if (!global.ResizeObserver) {
        // Minimal polyfill for jsdom to satisfy cmdk internals
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).ResizeObserver = class {
            observe() { }
            unobserve() { }
            disconnect() { }
        }
    }

    if (!Element.prototype.scrollIntoView) {
        Element.prototype.scrollIntoView = () => { };
    }
});

describe("Radix UI wrappers", () => {
    it("toggles accordion content", async () => {
        const user = userEvent.setup();
        render(
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Section</AccordionTrigger>
                    <AccordionContent data-testid="accordion-content">
                        Hidden details
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );

        const content = screen.getByTestId("accordion-content");
        expect(content.getAttribute("data-state")).toBe("closed");

        await user.click(screen.getByText("Section"));
        expect(content.getAttribute("data-state")).toBe("open");

        await user.click(screen.getByText("Section"));
        expect(content.getAttribute("data-state")).toBe("closed");
    });

    it("renders alert variants", () => {
        render(
            <div>
                <Alert>
                    <AlertTitle>Heads up</AlertTitle>
                    <AlertDescription>Default alert</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Something went wrong</AlertDescription>
                </Alert>
            </div>
        );

        const alerts = screen.getAllByRole("alert");
        expect(alerts).toHaveLength(2);
        expect(screen.getByText("Heads up")).toBeInTheDocument();
        expect(alerts[1].className).toContain("text-destructive");
    });

    it("switches tabs", async () => {
        const user = userEvent.setup();
        render(
            <Tabs defaultValue="one">
                <TabsList>
                    <TabsTrigger value="one">One</TabsTrigger>
                    <TabsTrigger value="two">Two</TabsTrigger>
                </TabsList>
                <TabsContent value="one" data-testid="tab-one">
                    First tab
                </TabsContent>
                <TabsContent value="two" data-testid="tab-two">
                    Second tab
                </TabsContent>
            </Tabs>
        );

        expect(screen.getByTestId("tab-one")).toBeVisible();
        expect(screen.getByTestId("tab-two")).not.toBeVisible();

        await user.click(screen.getByRole("tab", { name: "Two" }));

        expect(screen.getByTestId("tab-two")).toBeVisible();
        expect(screen.getByTestId("tab-one")).not.toBeVisible();
    });

    it("opens popover content", async () => {
        const user = userEvent.setup();
        render(
            <Popover>
                <PopoverTrigger>Open popover</PopoverTrigger>
                <PopoverContent>Popover body</PopoverContent>
            </Popover>
        );

        await user.click(screen.getByText("Open popover"));
        expect(await screen.findByText("Popover body")).toBeInTheDocument();
    });

    it("opens and closes dialog", async () => {
        const user = userEvent.setup();
        render(
            <Dialog>
                <DialogTrigger>Open dialog</DialogTrigger>
                <DialogContent>
                    <DialogTitle>Dialog heading</DialogTitle>
                    <DialogDescription>Dialog details</DialogDescription>
                </DialogContent>
            </Dialog>
        );

        await user.click(screen.getByText("Open dialog"));
        expect(await screen.findByText("Dialog heading")).toBeInTheDocument();

        await user.click(screen.getByText("Close"));
        await waitFor(() => expect(screen.queryByText("Dialog heading")).not.toBeInTheDocument());
    });

    it("handles alert dialog confirm/cancel", async () => {
        const user = userEvent.setup();
        render(
            <AlertDialog>
                <AlertDialogTrigger>Delete</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );

        await user.click(screen.getByText("Delete"));
        expect(await screen.findByText("Are you sure?")).toBeInTheDocument();

        await user.click(screen.getByText("Cancel"));
        await waitFor(() => expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument());
    });

    it("filters command items and shows empty state", async () => {
        const user = userEvent.setup();
        render(
            <Command label="Command palette">
                <CommandInput placeholder="Search" />
                <CommandList>
                    <CommandEmpty>No results.</CommandEmpty>
                    <CommandGroup heading="Commands">
                        <CommandItem>First</CommandItem>
                        <CommandItem disabled>Second</CommandItem>
                        <CommandSeparator />
                        <CommandItem>
                            Third<CommandShortcut>⌘3</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        expect(screen.getByText("First")).toBeInTheDocument();

        await user.type(screen.getByPlaceholderText("Search"), "zzz");
        expect(await screen.findByText("No results.")).toBeInTheDocument();
    });

    it("shows tooltip on hover", async () => {
        const user = userEvent.setup();
        render(
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger>Hover me</TooltipTrigger>
                    <TooltipContent>Tooltip text</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );

        await user.hover(screen.getByText("Hover me"));
        const tooltips = await screen.findAllByRole("tooltip");
        expect(tooltips[0]).toHaveTextContent("Tooltip text");
    });
});
