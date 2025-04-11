import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import { config as baseConfig } from "./base.js";

/**
 * Shared ESLint configuration for React projects
 * 
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  ...baseConfig,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        React: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/prop-types": "off",
      "react/jsx-key": "warn",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
