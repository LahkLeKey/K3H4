import { beforeAll, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./input-otp";

beforeAll(() => {
    if (!global.ResizeObserver) {
        // Minimal shim for input-otp
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).ResizeObserver = class {
            observe() { }
            unobserve() { }
            disconnect() { }
        };
    }
});

describe("InputOTP", () => {
    it("renders slots with provided value", () => {
        const handleChange = vi.fn();

        render(
            <InputOTP maxLength={4} value="12" onChange={handleChange}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                </InputOTPGroup>
                <InputOTPSeparator />
            </InputOTP>
        );

        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByRole("separator")).toBeInTheDocument();
    });
});
