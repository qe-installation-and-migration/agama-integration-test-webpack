import js from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import neostandard from "neostandard";
import tsEslint from "typescript-eslint";
import tsEslintParser from "@typescript-eslint/parser";
import globals from "globals";
import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import stylistic from "@stylistic/eslint-plugin";

const neostandardConfig = neostandard({ semi: true, noStyle: true });

export default [
  ...neostandardConfig,
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      ecmaVersion: 7,
      sourceType: "module",
      globals: {
        ...globals.commonjs,
        ...globals.node,
        msCrypto: true,
      },
      parser: tsEslintParser,
    },
  },
  {
    plugins: {
      "typescript-eslint": tsEslintPlugin,
      "@stylistic": stylistic,
    },
  },
  {
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/no-trailing-spaces": "error",
      "no-var": "error",
      "no-multi-str": "off",
      "no-use-before-define": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-use-before-define": "warn",
      "@typescript-eslint/ban-ts-comment": "off",
      "lines-between-class-members": [
        "error",
        "always",
        {
          exceptAfterSingleLine: true,
        },
      ],
      "prefer-promise-reject-errors": [
        "error",
        {
          allowEmptyReject: true,
        },
      ],
      camelcase: "off",
      "comma-dangle": "off",
      curly: "off",
      "jsx-quotes": "off",
      "key-spacing": "off",
      "no-console": "off",
      quotes: "off",
      "space-before-function-paren": "off",
      "n/no-callback-literal": "off",
    },
  },
  {
    ignores: ["node_modules/*", "dist/*"],
  },
];
