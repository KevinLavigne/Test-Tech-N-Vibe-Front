module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "import"],
  rules: {
    "react/prop-types": 0,
    "no-console": "off",
    "no-restricted-syntax": [
      "error",
      {
        selector:
          "CallExpression[callee.object.name='console'][callee.property.name!=/^(error|warn)$/]",
        message:
          "You can only call the error() and warn() functions from the console object",
      },
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-no-constructed-context-values": "off",
  },
  settings: {
    "import/resolver": {
      "eslint-import-resolver-custom-alias": {
        alias: {
          "@assets": "./src/assets",
          "@components": "./src/components",
          "@pages": "./src/pages",
          "@services": "./src/services",
        },
        extensions: [".js", ".jsx"],
      },
    },
  },
};
