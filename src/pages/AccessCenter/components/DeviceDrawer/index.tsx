/* eslint-disable no-nested-ternary */
/*
 * @Author: zhangfengfei
 * @Date: 2021-11-22 17:24:24
 * @LastEditTime: 2021-12-27 16:22:42
 * @LastEditors: zhangfengfei
 */

import { ModalState } from '@/hooks/useModal';
import { Button, Drawer, Form, message, Space } from 'antd';
import React, { createContext, FC, useRef } from 'react';
import {
  arrayToTree,
  isReqSuccess,
  paramsTransToNum,
  removeEmpty,
  translateMultiSelectValue,
} from '@/utils/utils';
import { useRequest } from 'ahooks';
import { addDeviceService, DeviceItem, updateDeviceService } from '@/services/devices';
import { useForm } from 'antd/lib/form/Form';
import DeviceInfo from './DeviceInfo';
import DeviceForm, { deviceNumArr } from './DeviceForm';
import styles from './index.less';
import { useDispatch, useSelector } from 'umi';
import { ConnectState } from '@/models/connect';
import { isNil } from 'lodash';

interface DeviceDrawerProps extends ModalState {
  currentItem?: DeviceItem;
  refresh: () => void;
}

export const DeviceDrawerContext = createContext<ModalState>({} as ModalState);

const DeviceDrawer: FC<DeviceDrawerProps> = (props) => {
  const dispatch = useDispatch();
  const { divisions } = useSelector((state: ConnectState) => state.global);

  const { currentItem, visible, setVisible, setTypeWithVisible, type, refresh } = props;
  const [form] = useForm();
  const onClose = () => {
    setVisible(false);
  };

  const importRef = useRef<any>();

  const ref = useRef<any>();
  // 添加、编辑设备
  const deviceReq = useRequest(type === 'add' ? addDeviceService : updateDeviceService, {
    manual: true,
    onSuccess: (res, params) => {
      if (isReqSuccess(res)) {
        message.success(type === 'add' ? '添加成功' : '修改成功');
        onClose();
        refresh();
        dispatch({
          type: 'global/getStatistics',
        });
      }
    },
  });

  const onImport = () => {
    if (!isNil(importRef.current)) {
      form.setFieldsValue(importRef.current);
      ref.current.setProtocol(importRef.current.video_protocol);
      ref.current.setPicEnable(importRef.current.pic_enable);
    }
  };
  // 提交事件
  const onSubmit = async () => {
    try {
      const currentValue = await form.validateFields();
      const values = paramsTransToNum(currentValue, deviceNumArr);

      // 行政区划特别处理
      const civil_code_arr = (values.civil_name || []) as string[];
      const item = divisions.find((i) => i.code === civil_code_arr[civil_code_arr.length - 1]);
      //添加编辑请求
      deviceReq
        .run({
          ...values,
          device_id: currentItem?.device_id,
          civil_name: item?.name,
          // 默认ip
          device_name: values.device_name || currentItem?.device_name || values.device_ip,
        })
        .then(() => {
          if (type === 'add') {
            // 添加成功保存值
            importRef.current = currentValue;
          }
        });
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <Drawer
      className={styles.drawer}
      title={type === 'info' ? '设备信息' : type === 'add' ? '添加设备' : '编辑设备信息'}
      width={600}
      visible={visible}
      onClose={onClose}
      destroyOnClose
      footer={
        <Space className="footer">
          <Button onClick={type === 'add' ? onImport : onClose} className="margin-right-little">
            {type === 'add' ? '导入上次配置' : type === 'info' ? '关闭' : '取消'}
          </Button>
          <Button
            loading={deviceReq.loading}
            onClick={() => {
              if (type === 'info') {
                setTypeWithVisible('update');
              } else {
                onSubmit();
              }
            }}
            type="primary"
          >
            {type === 'info' ? '编辑' : '保存'}
          </Button>
        </Space>
      }
    >
      <DeviceDrawerContext.Provider value={props}>
        {type !== 'info' && (
          <DeviceForm
            form={form}
            ref={ref}
            type={type}
            currentItem={currentItem}
            divisions={divisions}
          />
        )}
        {type === 'info' && currentItem && <DeviceInfo currentItem={currentItem} />}
      </DeviceDrawerContext.Provider>
    </Drawer>
  );
};

export default DeviceDrawer;
