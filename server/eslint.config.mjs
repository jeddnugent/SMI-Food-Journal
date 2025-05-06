import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // 🔧 Add custom rules here:
  tseslint.config({
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn", 
      "no-var": "off",
      "semi": ["error", "always"],
    },
  }),
]);

