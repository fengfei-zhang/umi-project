/*
 * @Author: zhangfengfei
 * @Date: 2021-12-15 14:01:00
 * @LastEditTime: 2021-12-21 17:49:26
 * @LastEditors: zhangfengfei
 */
import { ModalState } from '@/hooks/useModal';
import { DeviceItem } from '@/services/devices';
import { Button, Drawer } from 'antd';
import React, { FC, useState } from 'react';
import Live from './Live';
import Pictures from './Pictures';

interface PreviewDrawerProps extends ModalState {
  currentItem: DeviceItem;
}

const PreviewDrawer: FC<PreviewDrawerProps> = ({ type, visible, currentItem, setVisible }) => {
  const onClose = () => {
    setVisible(false);
  };

  return (
    <Drawer
      title={`${type === 'add' ? '视频播放' : '图片推送'} (${currentItem.device_name || '-'})`}
      visible={visible}
      width={570}
      closable
      onClose={onClose}
      destroyOnClose
      footer={
        <div className="footer">
          <Button type="primary" onClick={onClose}>
            返回
          </Button>
        </div>
      }
    >
      <div className="padding-left-middle padding-right-middle">
        {type === 'add' && <Live currentItem={currentItem} setVisible={setVisible} />}
        {type === 'update' && <Pictures currentItem={currentItem} />}
      </div>
    </Drawer>
  );
};

export default PreviewDrawer;
