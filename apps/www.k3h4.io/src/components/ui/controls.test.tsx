import { beforeAll, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Checkbox } from "./checkbox";
import { Switch } from "./switch";
import { Slider } from "./slider";

beforeAll(() => {
    if (!global.ResizeObserver) {
        // Minimal shim for radix slider use-size hook
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).ResizeObserver = class {
            observe() { }
            unobserve() { }
            disconnect() { }
        };
    }
});

describe("UI controls", () => {
    it("toggles checkbox", async () => {
        const user = userEvent.setup();
        render(<Checkbox aria-label="accept" />);

        const box = screen.getByRole("checkbox", { name: "accept" });
        expect(box).not.toBeChecked();
        await user.click(box);
        expect(box).toBeChecked();
    });

    it("toggles switch", async () => {
        const user = userEvent.setup();
        render(<Switch aria-label="power" />);

        const toggle = screen.getByRole("switch", { name: "power" });
        expect(toggle).toHaveAttribute("data-state", "unchecked");
        await user.click(toggle);
        expect(toggle).toHaveAttribute("data-state", "checked");
    });

    it("adjusts slider value", async () => {
        render(<Slider aria-label="volume" defaultValue={[20]} />);

        const slider = screen.getByRole("slider");
        expect(slider).toHaveAttribute("aria-valuenow", "20");
        expect(slider).toHaveAttribute("aria-valuemin", "0");
        expect(slider).toHaveAttribute("aria-valuemax", "100");
    });
});
