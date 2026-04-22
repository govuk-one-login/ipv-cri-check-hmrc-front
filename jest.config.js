module.exports = {
  clearMocks: true,
  modulePaths: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*"],
  testMatch: ["<rootDir>/test/unit/**/*.test.js"],
  setupFilesAfterEnv: ["<rootDir>/test/unit/lib/helpers"],
  coveragePathIgnorePatterns: [
    "src/assets/.*",
    "src/app/.*/fields.js",
    "src/app/.*/steps.js",
    "src/app/.*/index.js",
    "src/app.js",
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 75,
      functions: 100,
      lines: 100,
    },
  },
};
