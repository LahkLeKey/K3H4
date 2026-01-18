import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { PanelGrid } from "./panel-grid";
import { TopTabs } from "./top-tabs";

describe("shell building blocks", () => {
    it("lays out panel grid", () => {
        render(
            <PanelGrid
                primary={<div data-testid="primary">Primary</div>}
                secondary={<div data-testid="secondary">Secondary</div>}
            />
        );

        expect(screen.getByTestId("primary")).toBeInTheDocument();
        expect(screen.getByTestId("secondary")).toBeInTheDocument();
    });

    it("switches tabs and marks active", async () => {
        const handleChange = vi.fn();

        render(<TopTabs activeTab="bank" onChange={handleChange} />);

        const persona = screen.getByRole("button", { name: /persona/i });
        expect(screen.getByRole("button", { name: /bank/i })).toHaveAttribute("aria-pressed", "true");

        await persona.click();
        expect(handleChange).toHaveBeenCalledWith("persona");
    });
});
