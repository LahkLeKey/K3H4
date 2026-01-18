import React from "react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "./hover-card";
import { Kbd, KbdGroup } from "./kbd";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Toaster } from "./sonner";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "./resizable";

vi.mock("next-themes", () => ({ useTheme: () => ({ theme: "light" }) }));
vi.mock("sonner", () => ({
    Toaster: (props: any) => (
        <div data-testid="sonner" data-theme={props.theme} className={props.className} />
    ),
}));

beforeAll(() => {
    if (!global.ResizeObserver) {
        // Minimal shim for resizable panels
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).ResizeObserver = class {
            observe() { }
            unobserve() { }
            disconnect() { }
        };
    }
});

describe("ui extra primitives", () => {
    it("renders hover card content when open", () => {
        render(
            <HoverCard open>
                <HoverCardTrigger>Hover me</HoverCardTrigger>
                <HoverCardContent>Details</HoverCardContent>
            </HoverCard>
        );

        expect(screen.getByText("Details")).toBeInTheDocument();
    });

    it("renders keyboard hints", () => {
        render(
            <KbdGroup>
                <Kbd>Cmd</Kbd>
                <Kbd>K</Kbd>
            </KbdGroup>
        );

        expect(screen.getAllByText(/Cmd|K/)).toHaveLength(2);
    });

    it("shows scroll area with thumb", () => {
        render(
            <ScrollArea style={{ height: 60 }}>
                <div style={{ height: 200 }}>Content</div>
                <ScrollBar orientation="vertical" />
            </ScrollArea>
        );

        expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("forwards theme into toaster", () => {
        render(<Toaster position="top-center" />);
        expect(screen.getByTestId("sonner")).toHaveAttribute("data-theme", "light");
    });

    it("renders resizable panels", () => {
        const PanelGroup = ResizablePanelGroup as unknown as React.ComponentType<any>;
        render(
            <PanelGroup direction="horizontal">
                <ResizablePanel defaultSize={50}>One</ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50}>Two</ResizablePanel>
            </PanelGroup>
        );

        expect(screen.getAllByText(/One|Two/)).toHaveLength(2);
        expect(screen.getByRole("separator")).toBeInTheDocument();
    });
});
