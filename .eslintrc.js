module.exports = {
    env: {
      browser: true,
      commonjs: true,
      es2020: true,
      node: true,
    },
    extends: 'airbnb',
    parserOptions: {
      ecmaVersion: 12,
    },
    rules: {
      'global-require': 'off',
      'import/no-dynamic-require': 'off',
      'no-unused-expressions': 'off',
      'arrow-parens': 'off',
      'no-return-await': 'off',
      // 'max-len': 'off',
      // 不要改变函数的入参, 加上这个规则之后, 大部分入参都要copy一份, 而且还是深copy
      'no-param-reassign': 'off',
      // JavaScript 有很多语言特性, 并不是每个人都喜欢所有这些特性;
      // 您可能决定禁止使用try-catch或者class,或者您可能决定禁止使用in运算符;
      'no-restricted-syntax': 'off',
    },
  };
  