const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  js.configs.recommended, // Utilizar la configuración recomendada de ESLint
  {
    ignores: ['dist'],
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.jest // Agregar globales de Jest
      },
      sourceType: 'module',
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }], // Modificada esta línea
      'no-undef': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
    },
  },
];