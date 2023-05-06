module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['./vite.config.ts'],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['react', '@tanstack/query', '@typescript-eslint', 'prettier'],
  rules: {
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/prefer-query-object-syntax': 'error',
    'react/react-in-jsx-scope': 'off',
    'jsx-quotes': 'off',
    'import/extensions': 'off',
    'no-param-reassign': 'off',
    'no-case-declarations': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'off',
    'no-return-assign': 'off',
  },
};
