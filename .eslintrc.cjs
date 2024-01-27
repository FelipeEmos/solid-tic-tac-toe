/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["solid", "@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:solid/typescript",
    "plugin:prettier/recommended",
  ],
  rules: {
    "solid/reactivity": "warn",
    "solid/no-destructure": "warn",
    "solid/jsx-no-undef": "error",
    "prettier/prettier": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
  },
};

module.exports = config;
