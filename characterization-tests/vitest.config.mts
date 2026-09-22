import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.feature.spec.ts"],
    setupFiles: ["./tests/setup.ts"],
  },
});
