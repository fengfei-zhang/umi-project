/*
 * @Author: zhangfengfei
 * @Date: 2021-07-01 10:37:40
 * @LastEditTime: 2021-12-17 14:23:49
 * @LastEditors: zhangfengfei
 */
import CustomIcon from '@/components/CustomIcon';
import Dropdown from '@/components/Dropdown';
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
        <span className={`margin-left-little ${styles.title}`}>设备接入管理中心</span>
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
          <Dropdown
            title={
              <span className="pointer" style={{ display: 'inline-block', fontSize: 16 }}>
                <span className={`margin-right-little ${styles.user_icon}`}>
                  <CustomIcon
                    type="userAccount"
                    style={{ height: 14, width: 14, marginLeft: 5, marginBottom: 5 }}
                  />
                </span>
                {cookie.getCookie('account')}
              </span>
            }
            data={[
              {
                label: '退出登录',
                value: 'logout',
                icon: <CustomIcon type="logout" style={iconStyle} />,
              },
            ]}
            onClick={() => {
              logout();
              window.location.href = '/user/login';
            }}
            showDownIcon={false}
          />
        </Col>
      )}
    </Row>
  );
};

export default Nav;
