import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { AspectRatio } from "./aspect-ratio";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./breadcrumb";
import {
    ButtonGroup,
    ButtonGroupSeparator,
    ButtonGroupText,
} from "./button-group";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "./empty";

describe("ui primitives smoke", () => {
    it("renders breadcrumbs with ellipsis and page", () => {
        render(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/root">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbEllipsis />
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Current</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );

        expect(screen.getByRole("navigation", { name: "breadcrumb" })).toBeInTheDocument();
        expect(screen.getByText("More")).toBeInTheDocument();
        expect(screen.getByText("Current")).toHaveAttribute("aria-current", "page");
    });

    it("keeps children inside aspect ratio", () => {
        render(
            <AspectRatio ratio={16 / 9}>
                <div data-testid="ratio-child">Framed</div>
            </AspectRatio>
        );

        expect(screen.getByTestId("ratio-child")).toBeInTheDocument();
    });

    it("groups buttons with separators", () => {
        render(
            <ButtonGroup orientation="vertical">
                <ButtonGroupText>Label</ButtonGroupText>
                <ButtonGroupSeparator orientation="horizontal" />
                <ButtonGroupText>Action</ButtonGroupText>
            </ButtonGroup>
        );

        const group = screen.getByRole("group");
        expect(group).toHaveAttribute("data-orientation", "vertical");
        expect(group.querySelectorAll("[data-slot='button-group-separator']").length).toBe(1);
    });

    it("renders empty state pieces", () => {
        render(
            <Empty>
                <EmptyHeader>
                    <EmptyTitle>Nothing here</EmptyTitle>
                    <EmptyDescription>Hook up data to see content</EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <EmptyMedia variant="icon">
                        <svg role="img" aria-label="icon" />
                    </EmptyMedia>
                </EmptyContent>
            </Empty>
        );

        expect(screen.getByText("Nothing here")).toBeInTheDocument();
        expect(screen.getByLabelText("icon")).toBeInTheDocument();
    });
});
