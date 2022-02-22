/*
 * @Author: zhangfengfei
 * @Date: 2021-07-08 14:03:46
 * @LastEditTime: 2021-12-08 15:50:09
 * @LastEditors: zhangfengfei
 */
import { useState, useMemo } from 'react';

export declare type ModalType = 'add' | 'update' | 'info';

export interface useModalConfig {
  defaultVisible?: boolean;
  defaultType?: ModalType;
}

export interface ModalState {
  type: ModalType;
  setType: React.Dispatch<React.SetStateAction<ModalType>>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
  setTypeWithVisible: (val: ModalType, show?: boolean) => void;
}

export default function useModal(config: useModalConfig = {}) {
  const { defaultType = 'add', defaultVisible = false } = config;
  const [type, setType] = useState<ModalType>(defaultType);
  const [visible, setVisible] = useState<boolean>(defaultVisible);

  function toggle() {
    setVisible(!visible);
  }

  function setTypeWithVisible(val: ModalType) {
    setType(val);
    setVisible(true);
  }

  return useMemo(() => {
    return {
      type,
      setType,
      visible,
      setVisible,
      toggle,
      setTypeWithVisible,
    };
  }, [type, visible]);
}
