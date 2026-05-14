module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  globals: {
    expect: true,
    setupDefaultMocks: "readonly",
    req: "writable",
    res: "writable",
    next: "writable",
    createDefaultReqResNext: "readonly",
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
