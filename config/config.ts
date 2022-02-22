/*
 * @Author: zhangfengfei
 * @Date: 2021-06-28 17:05:42
 * @LastEditTime: 2022-02-21 17:46:24
 * @LastEditors: zhangfengfei
 */
import { IConfig } from 'umi';
import routes from './routes';
import moment from 'moment';
// @ts-ignore
import slash from 'slash2';
import defaultSettings from './defaultSettings';

// https://umijs.org/config/
import webpackPlugin from './plugin.config';

const pjson = require('../package.json');
const { primaryColor } = defaultSettings;

export default {
  hash: true,
  routes,
  outputPath: './build',
  targets: {
    ie: 10,
  },
  theme: {
    'primary-color': primaryColor,
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string,
      ) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }

        const match = context.resourcePath.match(/src(.*)/);

        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = slash(antdProPath)
            .split('/')
            .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
            .map((a: string) => a.toLowerCase());
          return `project-name${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }

        return localName;
      },
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  define: {
    'process.env.version': pjson.version,
    'process.env.time': moment().format('YYYY-MM-DD HH:mm:ss'),
  },
  externals: {},
  proxy: {
    '/api/v1/dis': {
      target: 'http://192.168.2.86:8087',
      logLevel: 'debug',
      changeOrigin: true,
    },
  },
  dva: {
    hmr: true,
    immer: true,
    // dynamicImport: undefined,
  },
  locale: {
    antd: true,
  },
  antd: {},
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
} as IConfig;
