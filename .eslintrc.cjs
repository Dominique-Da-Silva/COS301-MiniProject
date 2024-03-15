module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'supabase', 'src/types/database.types.ts', 'src/old code', 'src/store'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'eqeqeq': 'error',
    'camelcase': ['error', {
      'properties': 'never', // Avoid camelCase for object properties
      'ignoreDestructuring': true, // Ignore destructured variables
      'ignoreImports': true // Ignore import statements
    }],
    'no-unused-vars': 'error', // Enforce no unused vars
    '@typescript-eslint/no-unused-vars': 'error', // Enforce no unused vars for TypeScript
    'no-unused-expressions': 'error',// Enforce no unused expressions
    '@typescript-eslint/no-explicit-any': 'off', // Allow the use of any type
  },
}
