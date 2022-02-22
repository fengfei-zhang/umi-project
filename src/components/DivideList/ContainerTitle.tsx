/*
 * @Author: zhangfengfei
 * @Date: 2021-12-17 11:39:35
 * @LastEditTime: 2021-12-17 13:43:17
 * @LastEditors: zhangfengfei
 */
import React from 'react';
import StatusText from '../StatusText';

import styles from './containerTitle.less';

interface ContainerTitleProps {
  icon: any;
  isOnline: boolean;
  label: string;
  value?: string;
}

const ContainerTitle: React.FC<ContainerTitleProps> = ({ isOnline, icon, label, value }) => {
  return (
    <div>
      <span className={styles.icon}>
        {icon}
        <StatusText isOnline={isOnline} />
      </span>
      <span className={styles.title}>
        <span className={styles['title-label']}>{label}</span>
      </span>
    </div>
  );
};

export default ContainerTitle;
