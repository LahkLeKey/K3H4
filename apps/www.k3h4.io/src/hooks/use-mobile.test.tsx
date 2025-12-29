import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";

import { useIsMobile } from "./use-mobile";

const listeners: Record<string, ((ev: MediaQueryListEvent) => void)[]> = {};

function mockMatchMedia(matches: boolean) {
    const mql: MediaQueryList = {
        matches,
        media: "(max-width: 767px)",
        onchange: null,
        addEventListener: (event, listener) => {
            listeners[event] = listeners[event] || [];
            listeners[event].push(listener);
        },
        removeEventListener: (event, listener) => {
            listeners[event] = (listeners[event] || []).filter((l) => l !== listener);
        },
        addListener: () => { },
        removeListener: () => { },
        dispatchEvent: () => true,
    };
    return mql;
}

describe("useIsMobile", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        Object.keys(listeners).forEach((k) => delete listeners[k]);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("returns true when viewport below breakpoint and reacts to changes", () => {
        const addListenerSpy = vi.fn();
        const removeListenerSpy = vi.fn();
        const mql = mockMatchMedia(true);
        mql.addEventListener = vi.fn(mql.addEventListener);
        mql.removeEventListener = vi.fn(mql.removeEventListener);
        Object.defineProperty(window, "matchMedia", { value: () => mql, configurable: true });
        Object.defineProperty(window, "innerWidth", { value: 600, writable: true });

        const { result, unmount } = renderHook(() => useIsMobile());
        expect(result.current).toBe(true);
        expect(mql.addEventListener).toHaveBeenCalled();

        act(() => {
            (window as any).innerWidth = 900;
            listeners.change?.forEach((listener) => listener({ matches: false } as MediaQueryListEvent));
        });

        expect(result.current).toBe(false);

        unmount();
        expect(mql.removeEventListener).toHaveBeenCalled();
    });
});
