import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config(
    stylistic.configs.customize({
        indent: 4,
        semi: true,
    }),
    { ignores: ["dist"] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{js,ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            "@stylistic": stylistic,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "@stylistic/jsx-one-expression-per-line": ["error", { allow: "non-jsx" }],
            "@stylistic/linebreak-style": ["error", "unix"],
            "@stylistic/no-extra-parens": "error",
            "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
            "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            "sort-keys": ["error", "asc", { natural: true }],
        },
    },
);
