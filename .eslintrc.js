module.exports = {
  extends: ['react-app'],
  plugins: ['react-hooks'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'prettier/prettier': 'off',
  },
};
