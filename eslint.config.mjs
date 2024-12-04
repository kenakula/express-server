import pluginJs from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';
import stylisticTs from '@stylistic/eslint-plugin-ts';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,tsx}'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@stylistic/js': stylisticJs,
      '@stylistic/ts': stylisticTs,
      '@simpleImportSort': simpleImportSort,
    },
    rules: {
      '@stylistic/js/no-multiple-empty-lines': ['error', { max: 1 }],
      '@stylistic/js/max-len': ['error', { code: 120 }],
      '@stylistic/ts/semi': 'error',
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/quotes': ['error', 'single'],
      '@stylistic/ts/comma-dangle': ['error', 'only-multiline'],
      '@stylistic/ts/object-curly-spacing': ['error', 'always'],
      '@simpleImportSort/imports': 'error',
    },
  },
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
    }
  },
  {
    ignores: ['node_modules/**', 'dist/**'],
  }
];
