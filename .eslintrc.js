const ext = [
  'airbnb',
  'eslint:recommended',
  'plugin:eslint-comments/recommended',
  'plugin:prettier/recommended',
  'plugin:promise/recommended',
  'plugin:react/recommended',
  'plugin:unicorn/recommended',
  'prettier',
  'prettier/react',
];

const rules = {
  // Eslint
  'arrow-parens': 'off', // handled by prettier
  'dot-notation': 1,
  eqeqeq: ['error', 'always', { null: 'ignore' }],
  'func-names': 'off',
  'function-paren-newline': 'off', // handled by prettier
  'implicit-arrow-linebreak': 'off', // handled by prettier
  'no-confusing-arrow': 'off', // unlikely to affect code and makes code longer.
  // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
  'no-prototype-builtins': 'off',
  'no-underscore-dangle': 'off',
  'no-use-before-define': [
    'error',
    { functions: false, classes: true, variables: true },
  ],
  'object-curly-newline': 'off', // handled by prettier
  'operator-linebreak': 'off', // handled by prettier
  'sort-imports': 'off', // handled by simple-import-sort
  'sort-keys': 'warn',

  // Import
  'import/first': 'error',
  'import/newline-after-import': 'error',
  'import/no-default-export': 'error',
  'import/no-duplicates': 'error',
  'import/order': 'off', // handled by simple-import-sort
  'import/prefer-default-export': 'off',

  // React
  // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
  'react/destructuring-assignment': 'off',
  // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
  'react/jsx-filename-extension': [
    'warn',
    { extensions: ['.js', '.jsx', '.tsx', 'mdx'] },
  ],
  'react/jsx-one-expression-per-line': 'off', // handled by prettier
  'react/jsx-props-no-spreading': 'off',
  'react/jsx-wrap-multilines': 'off', // conflicts with prettier
  'react/prop-types': [2, { ignore: ['children', 'className', 'style'] }],
  'react/require-default-props': 'off',

  // React Hooks
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',

  // Simple Import Sort
  'simple-import-sort/sort': 'error',

  // Unicorn
  'unicorn/filename-case': [
    'error',
    {
      cases: {
        camelCase: true,
        pascalCase: true,
      },
    },
  ],
  'unicorn/no-useless-undefined': 'off',
  // Common abbreviations are known and readable
  'unicorn/prevent-abbreviations': 'off',
};

module.exports = {
  // parser: 'babel-eslint',
  plugins: [
    '@typescript-eslint',
    'eslint-comments',
    'import',
    'jest',
    'mdx',
    'prettier',
    'promise',
    'react',
    'react-hooks',
    'simple-import-sort',
    'testing-library',
    'typescript',
    'unicorn',
  ],
  extends: ext.concat(['plugin:mdx/recommended']),
  env: {
    es2017: true,
    browser: true,
    jest: true,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: rules,
  overrides: [
    {
      files: '.stories.{js,jsx}',
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2018,
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.json'],
      },
      extends: ext.concat([
        'airbnb-typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:testing-library/react',
        'plugin:testing-library/recommended',
        'prettier/@typescript-eslint',
      ]),
      rules: {
        ...rules,
        // Typescript
        // Makes no sense to allow type inference for expression parameters, but require typing the response
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          { allowExpressions: true, allowTypedFunctionExpressions: true },
        ],
        '@typescript-eslint/no-empty-interface': [
          'error',
          { allowSingleExtends: true },
        ],
        '@typescript-eslint/no-use-before-define': [
          'error',
          { functions: false, classes: true, variables: true, typedefs: true },
        ],
        '@typescript-eslint/no-explicit-any': 2,
        '@typescript-eslint/restrict-template-expressions': 'off',
      },
    },
  ],
};
