import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
import react from 'eslint-plugin-react';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react,
    },
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "react/jsx-no-target-blank":'error',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
  },
])
