/*
 * @Author: zhangfengfei
 * @Date: 2021-06-28 17:56:07
 * @LastEditTime: 2022-02-22 13:58:21
 * @LastEditors: zhangfengfei
 */
import React, { CSSProperties } from 'react';
import styles from './index.less';
import { ReactComponent as Password } from '@/assets/icons/password.svg';
import { ReactComponent as User } from '@/assets/icons/user.svg';

const iconsMap = {
  Password,
  User,
};

export type IconsKeys = keyof typeof iconsMap;

interface CustomIconProps {
  type: IconsKeys;
  className?: string;
  style?: CSSProperties;
}

export default function CustomIcon(props: CustomIconProps) {
  const { type, className, style, ...otherProps } = props;
  let content = null;
  const styleProps: CSSProperties = {
    height: 21,
    width: 21,
    ...style,
  };

  const iconProps = {
    className: `${className} ${styles.icon}`,
    style: styleProps,
    ...otherProps,
  };

  if (type) {
    content = React.createElement(iconsMap[type], iconProps);
  }

  return content;
}
