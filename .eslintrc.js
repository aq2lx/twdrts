module.exports = {
  env: {
    'browser': true
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        'endOfLine': 'lf',
        'semi': false,
        'singleQuote': true
      }
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
