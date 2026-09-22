import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.feature.spec.ts", "**/*.steps.ts", "**/*.test.ts"],
    setupFiles: ["./tests/setup.ts"],
  },
});
