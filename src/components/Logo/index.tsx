/*
 * @Author: zhangfengfei
 * @Date: 2021-06-30 20:40:22
 * @LastEditTime: 2021-12-07 14:49:12
 * @LastEditors: zhangfengfei
 */
import React, { CSSProperties } from 'react';
import styles from './style.less';

export interface LogoProps {
  style?: CSSProperties;
}

const Logo: React.FC<LogoProps> = ({ style }) => {
  return (
    <img className={styles.main} style={style} width={40} height={40} src="/logo.png" alt="" />
  );
};

export default Logo;
