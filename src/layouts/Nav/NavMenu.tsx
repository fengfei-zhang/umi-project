/*
 * @Author: zhangfengfei
 * @Date: 2021-08-05 09:40:47
 * @LastEditTime: 2021-12-17 16:46:04
 * @LastEditors: zhangfengfei
 */
import React, { useEffect, useState } from 'react';
import { Menu, Row } from 'antd';
import styles from './NavMenu.less';
import { Link } from 'umi';

interface NavMenuProps {
  className?: string;
}
const routeUrl = ['/access-center', '/verify-center', '/running-center'];

const NavMenu: React.FC<NavMenuProps> = ({ className }) => {
  const [key, setKey] = useState('0');
  const { pathname } = window.location;

  useEffect(() => {
    const exit = routeUrl.findIndex((i) => {
      return pathname.indexOf(i) !== -1;
    });
    if (exit >= 0) {
      setKey(String(exit));
    } else {
      setKey('');
    }
  }, [pathname]);

  return (
    <Menu className={` ${styles.menu} h-100`} selectedKeys={[key]} mode="horizontal">
      <Menu.Item key="0" className="h-100 flex flex-align-center">
        <Link to="/access-center">接入中心</Link>
      </Menu.Item>
      {/* <Menu.Item key="1" className="h-100 flex flex-align-center">
        <Link to="/verify-center">验证中心</Link>
      </Menu.Item> */}
      <Menu.Item key="2" className="h-100 flex flex-align-center">
        <Link to="/running-center">运行中心</Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavMenu;
