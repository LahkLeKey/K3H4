import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Navbar } from "./navbar";
import { AuthButton } from "./shell/auth-button";

describe("Navbar", () => {
    it("renders brand and home link", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>,
        );

        const brandLink = screen.getByRole("link", { name: /k3h4 auth/i });
        expect(brandLink).toHaveAttribute("href", "/");
        const homeLink = screen.getByRole("link", { name: "Home" });
        expect(homeLink).toHaveAttribute("href", "/");
    });
});

describe("AuthButton", () => {
    it("calls handler when idle sign-in", () => {
        const onClick = vi.fn();
        render(<AuthButton userEmail={null} authStatus="idle" onClick={onClick} />);

        const button = screen.getByRole("button", { name: /sign in with github/i });
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalled();
        expect(button).not.toBeDisabled();
    });

    it("disables while loading with signed-in label", () => {
        const onClick = vi.fn();
        render(<AuthButton userEmail="user@test.com" authStatus="loading" onClick={onClick} />);

        const button = screen.getByRole("button", { name: /signed in as user@test.com/i });
        fireEvent.click(button);
        expect(onClick).not.toHaveBeenCalled();
        expect(button).toBeDisabled();
    });
});
