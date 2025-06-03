const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const reactRefreshPlugin = require('eslint-plugin-react-refresh');
const js = require('@eslint/js');
const globals = require('globals');

module.exports = {
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.es2021,
      ...globals.node,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-unused-vars': ['error', { 
      varsIgnorePattern: '^[A-Z_]',
      args: 'none'
    }],
    'no-empty': 'warn',
    'no-prototype-builtins': 'warn',
    'react-hooks/rules-of-hooks': 'warn',
    'no-constant-condition': 'warn',
    'no-fallthrough': 'warn',
    'no-cond-assign': 'warn',
    'no-control-regex': 'warn',
    'no-misleading-character-class': 'warn',
    'getter-return': 'warn',
    'valid-typeof': 'warn',
    'no-useless-escape': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react/prop-types': 'off'
  },
  ignorePatterns: ['dist/', 'node_modules/', '*.config.js']
};