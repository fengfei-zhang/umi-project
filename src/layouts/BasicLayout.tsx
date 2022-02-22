/*
 * @Author: zhangfengfei
 * @Date: 2021-06-28 17:05:42
 * @LastEditTime: 2021-12-08 15:21:39
 * @LastEditors: zhangfengfei
 */
import React from 'react';
import style from './BasicLayout.less';
import cookie from '@/utils/cookie';
import Nav from './Nav';
import { useHistory } from 'umi';

interface BasicLayoutProps {}

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const history = useHistory();
  const { children } = props;
  if (window.location.pathname === '/') {
    // 跳转到登录页面
    if (!cookie.getCookie('token')) {
      history.push('/user/login');
    } else {
      history.push('/access-center');
    }
  }
  return (
    <div className={style.main}>
      <Nav isLogin />
      <div className={`${style.content} padding-all-big`} id="main-layout">
        {children}
      </div>
    </div>
  );
};

export default BasicLayout;
