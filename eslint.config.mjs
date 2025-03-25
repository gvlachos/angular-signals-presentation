import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import stylisticTs from '@stylistic/eslint-plugin-ts'

export default defineConfig([
  {
    plugins: {
      '@stylistic/ts': stylisticTs
    },
    rules: {
      // `@typescript-eslint` rules:
      // Change `@typescript-eslint/` to `@stylistic/ts/` prefix
      '@typescript-eslint/semi': 'error',
      '@stylistic/ts/semi': 'error',
    }
  },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
  tseslint.configs.recommended,
]);
