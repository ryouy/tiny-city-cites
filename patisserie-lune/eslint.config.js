import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  { ignores: ['dist/', '.astro/', 'node_modules/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    languageOptions: {
      globals: { window: 'readonly', document: 'readonly', IntersectionObserver: 'readonly', HTMLElement: 'readonly' },
    },
  },
  {
    // ビルド設定・Node スクリプト用
    files: ['astro.config.mjs', 'scripts/*.mjs'],
    languageOptions: { globals: { process: 'readonly', console: 'readonly' } },
  },
];
