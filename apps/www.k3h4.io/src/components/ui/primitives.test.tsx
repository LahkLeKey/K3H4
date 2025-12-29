import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Avatar, AvatarFallback } from "./avatar";
import { Badge } from "./badge";
import { Button } from "./button";
import { Progress } from "./progress";
import { Skeleton } from "./skeleton";
import { Spinner } from "./spinner";

describe("UI primitives", () => {
    it("renders button variants and asChild", async () => {
        const user = userEvent.setup();
        render(
            <div>
                <Button variant="destructive">Delete</Button>
                <Button asChild>
                    <a href="/home">Home</a>
                </Button>
            </div>
        );

        expect(screen.getByText("Delete").className).toContain("bg-destructive");

        const linkButton = screen.getByRole("link", { name: "Home" });
        expect(linkButton.tagName).toBe("A");
        expect(linkButton.className).toContain("inline-flex");
    });

    it("shows badge variants", () => {
        render(
            <div>
                <Badge>Default</Badge>
                <Badge variant="info">Info</Badge>
            </div>
        );

        expect(screen.getByText("Default").className).toContain("bg-primary");
        expect(screen.getByText("Info").className).toContain("bg-sky-100");
    });

    it("renders avatar primitives", () => {
        render(
            <Avatar data-testid="avatar-root">
                <AvatarFallback>AB</AvatarFallback>
            </Avatar>
        );

        expect(screen.getByTestId("avatar-root")).toBeInTheDocument();
    });

    it("renders skeleton, progress, and spinner", () => {
        const { container } = render(
            <div>
                <Skeleton data-testid="skeleton" />
                <Progress value={40} />
                <Spinner />
            </div>
        );

        expect(screen.getByTestId("skeleton").className).toContain("animate-pulse");

        const indicator = container.querySelector(".bg-primary");
        expect(indicator?.getAttribute("style")).toContain("translateX(-60%)");

        expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
    });
});
