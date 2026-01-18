import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import {
    ChartContainer,
    ChartLegendContent,
    ChartStyle,
    ChartTooltipContent,
} from "./chart";

type PayloadItem = {
    value: number;
    name: string;
    color: string;
    dataKey: string;
    type?: string;
    payload?: Record<string, unknown>;
};

type ChartPayload = PayloadItem & { payload: Record<string, unknown> };

type RechartsResponsiveProps = { width?: number; height?: number };

type ResponsiveChildren = ((props: RechartsResponsiveProps) => unknown) | unknown;

type ResponsiveContainerProps = { children?: ResponsiveChildren };

vi.mock("recharts", () => {
    const ResponsiveContainer = ({ children }: ResponsiveContainerProps) => (
        <div data-testid="responsive-container">{typeof children === "function" ? children({ width: 400, height: 240 }) : children}</div>
    );

    const Tooltip = (props: Record<string, unknown>) => <div data-testid="tooltip" {...props} />;
    const Legend = (props: Record<string, unknown>) => <div data-testid="legend" {...props} />;

    return { __esModule: true, ResponsiveContainer, Tooltip, Legend };
});

const Icon = () => <svg data-testid="icon" />;

describe("Chart utilities", () => {
    it("renders themed chart styles and tooltip content", () => {
        const config = {
            revenue: { theme: { light: "#111", dark: "#222" } },
            sales: { label: "Sales", icon: Icon, color: "#0f0" },
        };

        const payload: ChartPayload[] = [
            {
                value: 1200,
                name: "sales",
                color: "#0f0",
                dataKey: "sales",
                type: "line",
                payload: { fill: "#0f0" },
            },
        ];

        render(
            <ChartContainer config={config}>
                <>
                    <ChartStyle id="chart-test" config={config} />
                    <ChartTooltipContent active payload={payload as unknown as any} label="sales" indicator="dashed" />
                </>
            </ChartContainer>
        );

        const style = Array.from(document.querySelectorAll("style")).find((el) => el.textContent?.includes("--color-revenue"));
        expect(style?.textContent).toContain("--color-revenue: #111");
        expect(style?.textContent).toContain("--color-revenue: #222");
        expect(screen.getAllByText(/Sales/).length).toBeGreaterThanOrEqual(1);
        expect(screen.getByText("1,200")).toBeInTheDocument();
    });

    it("renders legend items with icons from config", () => {
        const config = {
            sales: { label: "Sales", icon: Icon, color: "#0f0" },
        };

        const payload: PayloadItem[] = [
            { value: 1, name: "sales", color: "#0f0", dataKey: "sales", type: "line" },
        ];

        render(
            <ChartContainer config={config}>
                <ChartLegendContent payload={payload as unknown as any} />
            </ChartContainer>
        );

        expect(screen.getByTestId("icon")).toBeInTheDocument();
        expect(screen.getByText("Sales")).toBeInTheDocument();
    });
});
