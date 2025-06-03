const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    ignores: ['dist'],
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        ...globals.commonjs
      },
      sourceType: 'module',
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'no-undef': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
    },
  },
];