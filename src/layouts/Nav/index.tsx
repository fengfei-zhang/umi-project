/*
 * @Author: zhangfengfei
 * @Date: 2021-07-01 10:37:40
 * @LastEditTime: 2022-02-22 15:25:35
 * @LastEditors: zhangfengfei
 */
import CustomIcon from '@/components/CustomIcon';
import Logo from '@/components/Logo';
import cookie from '@/utils/cookie';
import { logout } from '@/utils/utils';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React, { CSSProperties, FC } from 'react';
import { Link, useHistory } from 'umi';
import styles from './index.less';
import NavMenu from './NavMenu';

const iconStyle: CSSProperties = {
  width: 16,
  height: 16,
  color: '#4BC9CF',
};

interface NavProps {
  isLogin?: boolean;
}

const Nav: FC<NavProps> = ({ isLogin }) => {
  const history = useHistory();
  return (
    <Row justify="space-between" className={`flex flex-align-center ${styles.nav}`}>
      <Col className={`h-100 flex flex-align-center ${styles.left}`}>
        <Logo style={{ height: 24, width: 24 }} />
        <span className={`margin-left-little ${styles.title}`}>xxxx系统</span>
      </Col>

      {isLogin && (
        <Col flex={1} className="h-100 margin-left-middle">
          <NavMenu />
        </Col>
      )}
      {isLogin && (
        <Col className={`${styles.right} flex flex-align-center`}>
          {/* <Button
            type="text"
            className="margin-right-big"
            onClick={() => {
              history.push('/system-manage');
            }}
          >
            <SettingOutlined className="margin-right-little" />
            系统管理
          </Button> */}
        </Col>
      )}
    </Row>
  );
};

export default Nav;
