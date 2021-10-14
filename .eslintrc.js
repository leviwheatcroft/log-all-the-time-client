module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    curly: ['error', 'multi-or-nest', 'consistent'],
    'quote-props': ['error', 'as-needed'],
    'arrow-parens': 'off',
    //   'no-shadow': 'off',
    //   'import/prefer-default-export': 'off',
    //   'linebreak-style': 'off',
    'comma-dangle': ['error', 'only-multiline'],
    //   'semi': ['error', 'never'],
    //   'space-before-function-paren': ['error', 'always'],
    //   'nonblock-statement-body-position': ['error', 'below'],
    //   'no-use-before-define': ['error', { functions: false }],
    //   'no-underscore-dangle': 'off',
    //   'curly': ['error', 'multi-or-nest', 'consistent'],
    //   'operator-linebreak': ['error', 'after'],
    //   // 'no-param-reassign': ['error', { 'props': false }],
    //   'no-await-in-loop': 'off',
    //   'class-methods-use-this': 'off',
    //   'arrow-body-style': 'off',
    //   'consistent-return': 'off',
    //   'no-param-reassign': 'off',
    'no-console': ['warn', { allow: ['warn', 'error', 'assert'] }],
    //   'no-unused-vars': [
    //     'error',
    //     {
    //       argsIgnorePattern: '^_'
    //     }
    //   ]
  }
}

// rules: {

// },
