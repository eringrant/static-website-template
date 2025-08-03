import html from "@html-eslint/eslint-plugin";
import js from "@eslint/js";
import css from "@eslint/css";
import json from "@eslint/json";
import markdown from "@eslint/markdown";

export default [
  // HTML
  {
    files: ["**/*.html"],
    plugins: {
      html,
    },
    language: "html/html",
    rules: {
      "html/no-duplicate-class": "error",
    },
  },
  // JavaScript
  {
    files: ["**/*.js", "**/*.mjs"],
    ...js.configs.recommended,
    rules: {
      "no-unused-vars": "error",
      "no-console": ["warn", { allow: ["error", "warn"] }],
    },
  },

  // CSS
  {
    files: ["**/*.css"],
    language: "css/css",
    ...css.configs.recommended,
    rules: {
      "css/no-empty-blocks": "error",
    },
  },

  // JSON
  {
    files: ["**/*.json"],
    language: "json/json",
    ...json.configs.recommended,
    rules: {
      "json/no-duplicate-keys": "error",
    },
  },

  // Markdown
  {
    files: ["**/*.md"],
    plugins: {
      markdown,
    },
    processor: "markdown/markdown",
  },
];
