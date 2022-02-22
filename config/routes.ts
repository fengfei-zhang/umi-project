/*
 * @Author: zhangfengfei
 * @Date: 2021-06-28 17:05:42
 * @LastEditTime: 2021-12-07 17:02:24
 * @LastEditors: zhangfengfei
 */
// 默认从pages开始查找

import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user/login',
        title: '用户登录',
        component: './User/Login/index',
        exact: true,
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/access-center',
        component: './AccessCenter',
        exact: true,
        title: '接入中心',
      },
      {
        path: '/running-center',
        component: './RunningCenter',
        exact: true,
        title: '运行中心',
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];

export default routes;
