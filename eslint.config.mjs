import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  nextPlugin.configs["core-web-vitals"],
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  globalIgnores([".next/**", "next-env.d.ts", "test-results/**"]),
]);
