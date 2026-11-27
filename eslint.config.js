import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig(
  {
    ignores: ["coverage/**/*", "dist/**/*", ".aws-sam/**/*"],
  },
  js.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ["src/assets/**"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["src/assets/javascripts/**"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    linterOptions: {
      reportUnusedInlineConfigs: "error",
    },
  }
);
