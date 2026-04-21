import { defineConfig } from "vitest/config";
export default defineConfig({
  tests: {
    globals: true,
    environment: "",
    setupFiles: ["<rootDir>/tests/unit/lib/helpers"],
    include: ["<rootDir>/tests/unit/**/*.test.js"],
    coverage: {
      provider: "v8",
      reporters: ["text", "lcov"],
      exclude: [
        "src/assets/.*",
        "src/app/.*/fields.js",
        "src/app/.*/steps.js",
        "src/app/.*/index.js",
        "src/app.js",
      ],
    },
    snapshot: {
      dir: "src/snapshots",
    },
  },
});
