/*
 * @Author: zhangfengfei
 * @Date: 2021-06-28 17:56:07
 * @LastEditTime: 2021-12-15 11:13:47
 * @LastEditors: zhangfengfei
 */
import React, { CSSProperties } from 'react';
import styles from './index.less';

interface MatchstickTitleProps {
  className?: string;
  style?: CSSProperties;
}

const MatchstickTitle: React.FC<MatchstickTitleProps> = ({ children, className, style }) => {
  return (
    <div className={`${styles.main} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default MatchstickTitle;
