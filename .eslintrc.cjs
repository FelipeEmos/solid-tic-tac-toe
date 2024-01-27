/** @type {import("eslint").Linter.Config} */
const config = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: true,
        ecmaFeatures: {
            jsx: true,
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    plugins: [
        "solid",
        "@typescript-eslint",
    ],
    extends: [
        "eslint:recommended",
        "plugin:solid/typescript"
    ],
    rules: {
        "solid/reactivity": "warn",
        "solid/no-destructure": "warn",
        "solid/jsx-no-undef": "error"
    },
    // overrides: [
    //     {
    //         "env": {
    //             "node": true
    //         },
    //         "files": [
    //             ".eslintrc.{js,cjs}"
    //         ],
    //         "parserOptions": {
    //             "sourceType": "script"
    //         }
    //     }
    // ],
    // env: {
    //     "browser": true,
    //     "es2021": true
    // },
}

module.exports = config;
