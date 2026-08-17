import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

export default [
  js.configs.recommended,
  // "essential" only: rules that catch actual bugs (unused refs, invalid
  // template syntax, etc). Deliberately not using "recommended"/
  // "strongly-recommended", which are almost entirely formatting/style
  // preferences (attribute order, quote style, indentation) - out of scope
  // for this pass and would produce a huge, unrelated diff across the SFCs.
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue', '**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        global: 'readonly',
      },
    },
    rules: {
      // "Select" is an internal, never-globally-registered child component,
      // always referenced via PascalCase in precompiled SFC templates (never
      // an in-DOM template), so it never actually collides with the native
      // <select> element at runtime.
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
    },
  },
  {
    files: ['src/entry.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { require: 'readonly', module: 'writable' },
    },
  },
  {
    files: ['build/**/*.js', 'test/**/*.js', 'eslint.config.js'],
    languageOptions: {
      globals: { URL: 'readonly', process: 'readonly' },
    },
  },
  {
    ignores: ['dist/**', 'docs/**', 'node_modules/**'],
  },
];
