import globals from 'globals'
import reactRefresh from 'eslint-plugin-react-refresh'
import { config as reactConfig } from '@repo/eslint-config/react-internal.js'

export default [
  ...reactConfig,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
