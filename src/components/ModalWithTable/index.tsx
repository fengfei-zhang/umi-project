/*
 * @Author: zhangfengfei
 * @Date: 2021-08-12 16:14:10
 * @LastEditTime: 2021-12-14 15:37:23
 * @LastEditors: zhangfengfei
 */

import { ModalState } from '@/hooks/useModal';
import { Button, Modal } from 'antd';
import React, { FC } from 'react';

interface ModalWithTableProps extends ModalState {
  title: string;
  width?: number;
  onClose?: () => void;
}

const ModalWithTable: FC<ModalWithTableProps> = ({
  visible,
  width = 900,
  title,
  setVisible,
  children,
  onClose,
}) => {
  const onCancel = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };
  const modalProps = {
    title,
    visible,
    width,
    onCancel,
    footer: <Button onClick={onCancel}>关闭</Button>,
  };
  return <Modal {...modalProps}>{children}</Modal>;
};

export default ModalWithTable;
