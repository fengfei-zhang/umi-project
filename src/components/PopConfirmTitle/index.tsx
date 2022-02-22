/*
 * @Author: zhangfengfei
 * @Date: 2021-07-28 18:10:22
 * @LastEditTime: 2021-12-08 15:45:41
 * @LastEditors: zhangfengfei
 */
import React, { FC, ReactNode } from 'react';
import { CSSProperties } from 'react';
import styles from './index.less';

interface PopConfirmTitleProps {
  showTip?: ReactNode;
  textWidth?: number;
  className?: CSSProperties;
}

const PopConfirmTitle: FC<PopConfirmTitleProps> = ({
  showTip = false,
  textWidth,
  className,
  children,
}) => {
  return (
    <div>
      {showTip && <p className={styles.tip}>{showTip}</p>}
      <p style={{ width: textWidth }} className={`${styles.contain} ${className}`}>
        {children}
      </p>
    </div>
  );
};

export default PopConfirmTitle;
