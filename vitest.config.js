import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    globals: true,
    include: ["test/unit/**/*.test.js"],
    coverage: {
      provider: "v8",
      reporters: ["text", "lcov"],
      exclude: [
        "src/assets/**",
        "src/app/**/fields.js",
        "src/app/**/steps.js",
        "src/app/**/index.js",
        "src/app.js",
        "test/**",
      ],
    },
  },
});
