import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
  },
  {
    files: ["**/*.browser.js"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
];
