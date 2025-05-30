import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import js from '@eslint/js'
import globals from 'globals'

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
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
  globals: {
    process: 'readonly',
    __REACT_DEVTOOLS_GLOBAL_HOOK__: 'readonly',
    Buffer: 'readonly',
    setImmediate: 'readonly',
    WorkerGlobalScope: 'readonly',
    global: 'readonly',
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