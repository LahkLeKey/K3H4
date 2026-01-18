import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("../lib/telemetry", () => ({
  trackTelemetry: vi.fn(),
  setTelemetryApiBase: vi.fn(),
}));

const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === "string" && args[0].includes("React Router Future Flag Warning")) {
    return;
  }
  originalWarn(...(args as []));
};

// Force an in-memory localStorage for tests (bun/jsdom may not provide full API)
const store = new Map<string, string>();
const memoryStorage: Storage = {
  getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
  setItem: (key: string, value: string) => {
    store.set(key, String(value));
  },
  removeItem: (key: string) => {
    store.delete(key);
  },
  clear: () => {
    store.clear();
  },
  key: (index: number) => Array.from(store.keys())[index] ?? null,
  get length() {
    return store.size;
  },
};

Object.defineProperty(globalThis, "localStorage", {
  value: memoryStorage,
  writable: false,
  configurable: true,
});
