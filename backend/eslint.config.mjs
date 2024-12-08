import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            semi: ["error", "always"],

            "@typescript-eslint/no-explicit-any": [
                "error",
                {
                    ignoreRestArgs: true,
                },
            ],

            "object-curly-spacing": ["error", "always"], // "always" requires spaces; "never" disallows them
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];
