import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [path.join(__dirname, "src", "test", "setup.ts")],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      all: true,
      statements: 0.8,
      branches: 0.75,
      functions: 0.8,
      lines: 0.8,
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/test/**",
        "src/**/*.d.ts",
        "src/main.tsx",
        "src/index.tsx",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
});
