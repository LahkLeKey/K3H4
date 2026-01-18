import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "./App";

vi.mock("./components/shell", () => ({ Shell: () => <div data-testid="shell">shell</div> }));

describe("App", () => {
    it("renders shell wrapper", () => {
        render(<App />);
        expect(screen.getByTestId("shell")).toBeInTheDocument();
    });
});
