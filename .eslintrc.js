/*
 * @Author: zhangfengfei
 * @Date: 2021-06-28 17:05:42
 * @LastEditTime: 2022-02-21 18:01:17
 * @LastEditors: zhangfengfei
 */

const myRules = {
  'no-console': 0,
  'no-restricted-globals': 0,
  camelcase: 0, // 驼峰命名
  'no-param-reassign': 0,
  // 'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  'no-bitwise': 0,
  'no-useless-catch': 0,
  'no-underscore-dangle': 0,
  'react/self-closing-comp': 0,
  'react/jsx-props-no-spreading': 0,
  'no-unused-vars': 0,
  '@typescript-eslint/no-unused-vars': 1, // 未使用的变量名
  '@typescript-eslint/camelcase': 0,
  '@typescript-eslint/consistent-type-imports': 0,
};

module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],

  // in antd-design-pro
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },

  rules: myRules,
};
