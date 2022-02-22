/*
 * @Author: zhangfengfei
 * @Date: 2021-12-21 16:11:52
 * @LastEditTime: 2021-12-29 10:42:13
 * @LastEditors: zhangfengfei
 */
import { StatusType } from '@/pages/data';
import { DeviceItem } from '@/services/devices';
import React, { CSSProperties, FC } from 'react';

interface DeviceStatusProps {
  currentItem: DeviceItem;
  className?: string;
  style?: CSSProperties;
}

const DeviceStatus: FC<DeviceStatusProps> = ({ currentItem, style, className }) => {
  const isOnline = currentItem.status === StatusType.在线;
  const ip = currentItem.image_service_addr;

  const styles: CSSProperties = {
    padding: '5px 16px',
    borderRadius: 8,
    color: isOnline ? '#24BF8A' : '#FF4343',
    background: isOnline ? 'rgba(36, 191, 138, 0.1)' : 'rgba(255, 67, 67, 0.1)',
  };

  return (
    <span className={className} style={{ ...styles, ...style }}>
      {ip || '-'}
    </span>
  );
};

export default DeviceStatus;
