# 新接入项目

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

## 构建

### 开发

在 `config/config.ts`中配置路由

启动脚本：`npm run start` 开启代理：`start:no-mock`



## 发布

### 开发环境部署

1. 如没有安装 deploy-cli-service,执行`npm install deploy-cli-service -g`
2. 在 `deploy.config.js` 进行相关配置
3. 执行 `npm run deploy:dev` 完成部署

### 武汉环境

执行 `./ftp-build.sh` 后上传至指定 ftp

## 提测

执行`./svn-build.sh`得出提测文件夹，直接拖动文件夹至 svn 目录并上传即可
