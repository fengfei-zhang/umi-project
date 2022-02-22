/*
 * @Author: zhangfengfei
 * @Date: 2021-08-03 15:57:47
 * @LastEditTime: 2021-12-07 16:57:20
 * @LastEditors: zhangfengfei
 */
import React from 'react';
import { Badge } from 'antd';
import styles from './index.less';
import classNames from 'classnames';

interface StatusTextProps {
  isOnline: boolean;
}

const StatusText: React.FC<StatusTextProps> = ({ isOnline, children }) => {
  return (
    <Badge
      status="processing"
      className={classNames({
        [styles.online]: isOnline,
        [styles.offline]: !isOnline,
      })}
      text={children}
    />
  );
};

export default StatusText;
