module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  globals: {
    expect: true,
    setupDefaultMocks: "readonly",
  },
  extends: ["prettier", "eslint:recommended", "plugin:prettier/recommended"],
  ignorePatterns: [
    "wallaby.conf.js",
    "node_modules",
    "coverage",
    ".aws-sam",
    "dist",
  ],
  rules: {
    "no-console": 2,
    "padding-line-between-statements": [
      "error",
      { blankLine: "any", prev: "*", next: "*" },
    ],
  },
};
