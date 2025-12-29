import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

describe("Card primitives", () => {
    it("renders header, content, and footer", () => {
        render(
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>Body content</CardContent>
                <CardFooter>Footer actions</CardFooter>
            </Card>
        );

        expect(screen.getByText("Card Title")).toBeInTheDocument();
        expect(screen.getByText("Card Description")).toBeInTheDocument();
        expect(screen.getByText("Body content")).toBeInTheDocument();
        expect(screen.getByText("Footer actions")).toBeInTheDocument();
    });
});
