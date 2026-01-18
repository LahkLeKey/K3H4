// @vitest-environment jsdom
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import { SeedInventoryCard } from "../seed-inventory-card";
import { SelectedPlotControlsCard } from "../selected-plot-controls-card";
import { PlotFocusCard } from "../plot-focus-card";

const seedItems = [
    { code: "corn", label: "Corn", quantity: 3 },
    { code: "barley", label: "Barley", quantity: 0 },
];

describe("SeedInventoryCard", () => {
    it("disables apply when no seed is selected", () => {
        render(
            <SeedInventoryCard
                items={seedItems}
                selectedCode=""
                onSelect={vi.fn()}
                onApplyToPlot={vi.fn()}
            />,
        );

        const applyButton = screen.getByRole("button", { name: /Apply to plot/i });
        expect(applyButton).toBeDisabled();
        expect(screen.getByText(/Choose a seed to plant/i)).toBeInTheDocument();
    });

    it("enables apply for seeds with quantity and calls handlers", async () => {
        const handleApply = vi.fn();

        const Wrapper = () => {
            const [selected, setSelected] = useState("corn");
            return (
                <SeedInventoryCard
                    items={seedItems}
                    selectedCode={selected}
                    onSelect={setSelected}
                    onApplyToPlot={handleApply}
                />
            );
        };

        render(<Wrapper />);

        const select = screen.getByRole("combobox");
        const applyButton = screen.getByRole("button", { name: /Apply to plot/i });

        // Switch to a seed with no quantity; apply should disable
        await userEvent.selectOptions(select, "barley");
        expect(applyButton).toBeDisabled();

        // Switch back to a stocked seed; apply should enable and fire
        await userEvent.selectOptions(select, "corn");
        expect(screen.getByText(/3 units available/i)).toBeInTheDocument();
        expect(applyButton).not.toBeDisabled();
        await userEvent.click(applyButton);
        expect(handleApply).toHaveBeenCalled();
    });

    it("keeps apply disabled when selected seed is out of stock", async () => {
        const handleApply = vi.fn();

        render(
            <SeedInventoryCard
                items={seedItems}
                selectedCode="barley"
                onSelect={vi.fn()}
                onApplyToPlot={handleApply}
            />,
        );

        expect(screen.getByText(/0 units available/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Apply to plot/i })).toBeDisabled();
    });
});

describe("SelectedPlotControlsCard", () => {
    it("disables controls until a plot is selected", () => {
        render(
            <SelectedPlotControlsCard activePlotName={undefined} onBuySeeds={vi.fn()} onSchedule={vi.fn()} onRefresh={vi.fn()} />,
        );

        expect(screen.getByRole("button", { name: /Buy seeds/i })).toBeDisabled();
        expect(screen.getByRole("button", { name: /Schedule workers/i })).toBeDisabled();
        expect(screen.getByRole("button", { name: /Refresh/i })).not.toBeDisabled();
        expect(screen.getByText(/Pick a plot to enable controls/i)).toBeInTheDocument();
    });

    it("fires callbacks when controls are active", async () => {
        const onBuySeeds = vi.fn();
        const onSchedule = vi.fn();
        const onRefresh = vi.fn();
        render(
            <SelectedPlotControlsCard activePlotName="North" onBuySeeds={onBuySeeds} onSchedule={onSchedule} onRefresh={onRefresh} />,
        );

        await userEvent.click(screen.getByRole("button", { name: /Refresh/i }));
        await userEvent.click(screen.getByRole("button", { name: /^Buy seeds/i }));
        await userEvent.click(screen.getByRole("button", { name: /Schedule workers/i }));

        expect(onRefresh).toHaveBeenCalled();
        expect(onBuySeeds).toHaveBeenCalled();
        expect(onSchedule).toHaveBeenCalled();
    });
});

describe("PlotFocusCard", () => {
    const originalTz = process.env.TZ;

    beforeAll(() => {
        process.env.TZ = "UTC";
    });

    afterAll(() => {
        process.env.TZ = originalTz;
    });

    it("shows a placeholder when no plot is active", () => {
        render(<PlotFocusCard activePlot={undefined} />);
        expect(screen.getByText(/Select a plot/i)).toBeInTheDocument();
        expect(screen.getByText(/Hover or click a plot/i)).toBeInTheDocument();
    });

    it("renders plot metrics and formats the last reading date", () => {
        render(
            <PlotFocusCard
                activePlot={{
                    name: "North",
                    crop: "Corn",
                    stage: "Growing",
                    acres: "12",
                    health: "Healthy",
                    latestCondition: { recordedAt: "2026-02-14T00:00:00Z" },
                }}
            />,
        );

        expect(screen.getByText(/North/)).toBeInTheDocument();
        expect(screen.getByText(/Corn/)).toBeInTheDocument();
        expect(screen.getByText(/Growing/)).toBeInTheDocument();
        expect(screen.getByText(/12/)).toBeInTheDocument();
        expect(screen.getByText(/Healthy/)).toBeInTheDocument();
        expect(screen.getByText(/Feb 14/i)).toBeInTheDocument();
    });
});
