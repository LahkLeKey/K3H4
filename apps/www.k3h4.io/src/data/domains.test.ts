import { describe, expect, it } from "vitest";

import { domains } from "./domains";

describe("domains data", () => {
  it("exports a domains array", () => {
    expect(Array.isArray(domains)).toBe(true);
    expect(domains).toHaveLength(0);
  });
});
