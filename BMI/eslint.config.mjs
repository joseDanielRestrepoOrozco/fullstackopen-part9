import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylisticTs from '@stylistic/eslint-plugin-ts'
import tsParser from '@typescript-eslint/parser'
import tseslint from 'typescript-eslint'

export default defineConfig([
  tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{ts,mts,cts}'],
    languageOptions: {
      globals: globals.node,
      parser: tsParser,
      parserOptions: { project: './tsconfig.json' },
    },
    plugins: { '@stylistic/ts': stylisticTs },
    rules: {
      '@stylistic/ts/semi': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
        },
      ],

      'no-case-declarations': 'off',
    },
  },
])
