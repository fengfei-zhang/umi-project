/*
 * @Author: zhangfengfei
 * @Date: 2021-06-28 17:05:42
 * @LastEditTime: 2022-02-22 11:48:25
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
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];

export default routes;
