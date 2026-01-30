import path from 'node:path';
import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['src/test/vitest-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      all: true,
      statements: 0.8,
      branches: 0.6,
      functions: 0.8,
      lines: 0.8,
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/**/__mocks__/**'],
    },
  },
  resolve: {
    alias: {
      '~': path.join(__dirname, 'src'),
    },
  },
});
