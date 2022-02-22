<!--
 * @Author: zhangfengfei
 * @Date: 2022-02-22 16:14:41
 * @LastEditTime: 2022-02-22 16:41:02
 * @LastEditors: zhangfengfei
-->
# xxx项目

## 相关技术

技术栈为 [react](https://reactjs.org/)

状态管理为 [dva](https://dvajs.com/)

基础脚手架为 [umijs](https://umijs.org/)

使用 [typescript](https://www.typescriptlang.org/) 进行开发


## 项目结构

```
├── CHANGELOG.md
├── README.md
├── .editorconfig
├── .gitignore
├── .huskyrc
├── .lintstagedrc
├── .npmrc
├── .prettierignore
├── .prettierrc
├── .eslintrc.js
├── README.md
├── svn-build.sh               // 构建脚本
├── commitlint.config.js
├── config
│   ├── config.small.ts
│   ├── config.ts
│   ├── defaultSettings.ts // 主题配置
│   ├── routes.ts          // 路由配置
│   └── webpackConfig.ts   // 额外webpack配置
├── deploy                 // 部署文档
├── mock
├── package.json
├── public
├── serverConfig.json
├── src
│   ├── api
│   ├── app.tsx
│   ├── assets
│   ├── components
│   ├── global.less
│   ├── global.tsx
│   ├── hooks               // 组件抽象逻辑
│   ├── layouts
│   ├── models
│   ├── pages
│   ├── services
│   ├── typings.d.ts
│   └── utils
├── tsconfig.json
└── typings.d.ts
```

### 开发

#### 配置

在 `config/routes.ts`中配置路由

在 `config/config.ts`中的proxy字段代理到后端

#### 脚本说明

`cm`：提交commit

`start` ：启动，本地mock数据

`start:no-mock `：启动，代理后端数据

`lint-staged`：格式化提交代码

