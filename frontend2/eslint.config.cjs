const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const reactRefreshPlugin = require('eslint-plugin-react-refresh');
const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
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
  },
  {
    ignores: ['dist/', 'node_modules/', '*.config.js']
  }
];