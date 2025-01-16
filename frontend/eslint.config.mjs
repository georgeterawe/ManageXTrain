import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import babelParser from '@babel/eslint-parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'], // Applies to JavaScript and React files
    languageOptions: {
      globals: { ...globals.browser, process: 'readonly' }, // Define process as global
      parser: babelParser, // Use Babel parser to handle JSX
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
    plugins: {
      react: pluginReact, // Register the React plugin correctly
      prettier: pluginPrettier, // Register the Prettier plugin correctly
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    rules: {
      // JavaScript recommended rules
      ...pluginJs.configs.recommended.rules,
      // React recommended rules
      ...pluginReact.configs.recommended.rules,
      // Prettier plugin rules
      ...pluginPrettier.configs.recommended.rules,
      // Prettier conflict resolution
      ...eslintConfigPrettier.rules,
    },
  },
];
