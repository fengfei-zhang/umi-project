/*
 * @Author: zhangfengfei
 * @Date: 2021-06-28 17:56:07
 * @LastEditTime: 2021-12-21 10:22:57
 * @LastEditors: zhangfengfei
 */
import React, { CSSProperties } from 'react';
import { ReactComponent as UserAccount } from '@/assets/icons/icon_account.svg';
import { ReactComponent as UpCloud } from '@/assets/icons/upCloud.svg';
import { ReactComponent as CheckCode } from '@/assets/icons/check-code.svg';
import { ReactComponent as Password } from '@/assets/icons/password.svg';
import { ReactComponent as User } from '@/assets/icons/user.svg';
import { ReactComponent as Logout } from '@/assets/icons/icon_logout.svg';
import { ReactComponent as Edit } from '@/assets/icons/icon_edit.svg';
import { ReactComponent as Add } from '@/assets/icons/add.svg';
import { ReactComponent as Detail } from '@/assets/icons/detail.svg';
import { ReactComponent as Import } from '@/assets/icons/icon_import.svg';
import { ReactComponent as Clock } from '@/assets/icons/Clock.svg';
import { ReactComponent as ServiceAddress } from '@/assets/icons/service-address.svg';
import { ReactComponent as StartDevice } from '@/assets/icons/start-device.svg';
import { ReactComponent as StartPercent } from '@/assets/icons/start-percent.svg';
import { ReactComponent as OnlineDevice } from '@/assets/icons/online-device.svg';
import { ReactComponent as OnlinePercent } from '@/assets/icons/online-percent.svg';
import { ReactComponent as TotalDevice } from '@/assets/icons/total-device.svg';
import { ReactComponent as Delete } from '@/assets/icons/delete.svg';
// import { ReactComponent as PartAccess } from '@/assets/icons/part-access.svg';
// import { ReactComponent as AllAccess } from '@/assets/icons/all-access.svg';
import styles from './index.less';

const iconsMap = {
  userAccount: UserAccount,
  checkCode: CheckCode,
  password: Password,
  user: User,
  upCloud: UpCloud,
  logout: Logout,
  delete: Delete,
  edit: Edit,
  add: Add,
  detail: Detail,
  import: Import,
  Clock,
  ServiceAddress,
  StartDevice,
  StartPercent,
  OnlineDevice,
  OnlinePercent,
  TotalDevice,
  // PartAccess,
  // AllAccess,
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
