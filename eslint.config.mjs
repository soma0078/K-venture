import { defineConfig } from 'eslint-define-config';
import coreWebVitals from 'eslint-config-next/core-web-vitals.js';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import validateFilenamePlugin from 'eslint-plugin-validate-filename';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';

export default defineConfig([
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        browser: true,
        es2021: true,
        node: true,
      },
    },

    plugins: {
      '@typescript-eslint': typescriptPlugin,
      'simple-import-sort': simpleImportSort,
      'validate-filename': validateFilenamePlugin,
      'no-relative-import-paths': noRelativeImportPaths,
      prettier: prettierPlugin,
    },

    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },

    rules: {
      ...coreWebVitals.rules,
      'prettier/prettier': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-unused-vars': ['warn', { args: 'none' }],
      '@typescript-eslint/no-explicit-any': 'warn', // 다음 주소에 필요
      '@typescript-eslint/no-unused-vars': 'warn',
      'validate-filename/naming-rules': [
        'error',
        {
          index: true,
          rules: [
            {
              case: 'pascal',
              target: '**/components/**',
            },
            {
              case: 'camel',
              target: '**/hooks/**',
              patterns: '^use',
            },
          ],
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
      ],
      'no-relative-import-paths/no-relative-import-paths': [
        'error',
        { allowSameFolder: true, rootDir: 'src', prefix: '@' },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },

    ignores: ['node_modules', 'dist'],
  },
]);
