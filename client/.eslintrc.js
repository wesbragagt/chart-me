module.exports = {
    settings: {
      react: {
        version: "17.0"
      }
    },
    env: {
      browser: true,
      "jest/globals": true
    },
    extends: [
      'plugin:react/recommended',
      'standard',
      "eslint:recommended", "plugin:@typescript-eslint/recommended"
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    plugins: [
      'react',
      '@typescript-eslint',
      "jest"
    ],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "react/prop-types": "off",
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      "indent": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-var-requires": "off",
      "no-trailing-spaces": "off"
    }
  }