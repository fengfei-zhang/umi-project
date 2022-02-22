/*
 * @Author: zhangfengfei
 * @Date: 2021-06-28 17:05:42
 * @LastEditTime: 2021-12-07 14:39:08
 * @LastEditors: zhangfengfei
 */
import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'umi';
import { ConnectState } from '@/models/connect';
import Logo from '@/components/Logo';
import style from './UserLayout.less';
import Nav from './Nav';

interface UserLayoutProps {
  route: any;
}

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const { children } = props;

  const contentRef = useRef<any>();

  return (
    <div className={style.main} id="user-layout">
      <div className={style.content} ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
