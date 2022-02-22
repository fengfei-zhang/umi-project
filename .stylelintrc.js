/*
 * @Author: zhangfengfei
 * @Date: 2022-02-21 14:37:10
 * @LastEditTime: 2022-02-21 17:29:54
 * @LastEditors: zhangfengfei
 */
const { stylelint } = require('@umijs/fabric');

const myRules = {
  'font-family-no-missing-generic-family-keyword': [
    true,
    {
      ignoreValues: [
        'PingFangSC-Regular,PingFang SC',
        'PingFangSC-Semibold, PingFang SC',
        'PingFangSC-Medium, PingFang SC',
      ],
    },
  ],
};

module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/stylelint')],
  rules: myRules,
};
