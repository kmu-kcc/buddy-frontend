module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
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
    '@typescript-eslint',
    'react',
    'react-hooks',
    'import',
  ],
  rules: {
    'max-len': 'off',
    'require-jsdoc': 'off',
    'linebreak-style': 'off',
    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['error'],
    '@typescript-eslint/type-annotation-spacing': ['warn'],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
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
