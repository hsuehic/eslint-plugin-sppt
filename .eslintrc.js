module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  overrides: [
    {
      files: 'scripts/**/*.ts',
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-namespace': 'off',
      },
    },
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],
  },
};
