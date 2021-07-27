module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'google',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'require-jsdoc': 'off',
    'linebreak-style': 'off',
    'jsx-quotes': ['warn', 'prefer-single'],
    'react/jsx-space-before-closing': ['warn', 'always'],
    'react/function-component-definition': ['error', {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    }],
    'react/jsx-closing-tag-location': ['warn'],
    'react/jsx-curly-spacing': ['warn', {
      when: 'never',
      allowMultiline: false,
    }],
    'react/jsx-equals-spacing': ['warn', 'never'],
    'react/jsx-props-no-multi-spaces': ['warn'],
  },
};
