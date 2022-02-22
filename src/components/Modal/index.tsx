import React from 'react';
import { Modal, Button } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { useKeyPress } from '@umijs/hooks';

import styles from './index.less';

export interface ModalComponentProps extends ModalProps {
  type?: 'edit' | undefined;
  /**
   * 是否开启与form联动的button
   * 开启后自动设置antd modal footer = false
   */
  formButton?: boolean;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  children,
  type = '',
  formButton = false,
  ...props
}) => {
  useKeyPress(13, (event) => {
    if (props.visible && formButton) {
      if (props.onOk) {
        // @ts-ignore
        props.onOk();
      }
    }
  });

  if (formButton) {
    // eslint-disable-next-line no-param-reassign
    props.footer = (
      <div>
        <Button onClick={props.onCancel}>取消</Button>
        <Button
          htmlType="submit"
          type="primary"
          className="margin-left-default"
          onClick={props.onOk}
          loading={props.confirmLoading}
        >
          确定
        </Button>
      </div>
    );
  }
  return (
    <Modal {...props} maskClosable={false} className={`${styles.main} ${props.className}`}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
