import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        process: true,
        __REACT_DEVTOOLS_GLOBAL_HOOK__: true,
        Buffer: true,
        setImmediate: true,
        WorkerGlobalScope: true,
        global: true
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
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
    }
  }
]
