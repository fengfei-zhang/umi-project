/*
 * @Author: zhangfengfei
 * @Date: 2021-12-14 10:23:39
 * @LastEditTime: 2021-12-23 16:23:16
 * @LastEditors: zhangfengfei
 */
/* eslint-disable no-nested-ternary */
/*
 * @Author: zhangfengfei
 * @Date: 2021-11-22 17:24:24
 * @LastEditTime: 2021-12-13 17:53:30
 * @LastEditors: zhangfengfei
 */

import { ModalState } from '@/hooks/useModal';
import { Button, Drawer, Form, message, Space } from 'antd';
import React, { FC, useEffect, useRef } from 'react';
import { isReqSuccess, paramsTransToNum } from '@/utils/utils';
import { useRequest } from 'ahooks';
import { useForm } from 'antd/lib/form/Form';
import {
  getVideoConfigService,
  ServiceItem,
  updateServiceConfigService,
} from '@/services/services';
import ServiceForm from './ServiceForm';

// 需要转number的字段
const arrString = [
  'http_port',
  'https_port',
  'ops_port',
  'rtsp_port',
  'rtmp_port',
  'sip_port',
  'rtp_port',
  'key_number',
];
interface ServiceDrawerProps extends ModalState {
  currentItem?: ServiceItem;
  refresh: () => void;
}

const ServiceDrawer: FC<ServiceDrawerProps> = ({
  currentItem,
  visible,
  setVisible,
  setTypeWithVisible,
  type,
  refresh,
}) => {
  const [form] = useForm();
  const onClose = () => {
    setVisible(false);
  };

  const getVideoConfigServiceReq = useRequest(getVideoConfigService, {
    manual: true,
    formatResult: (res) => {
      if (isReqSuccess(res)) {
        return res.data.data.videoservice_conf;
      }
      return undefined;
    },
  });
  // 编辑服务
  const updateServiceReq = useRequest(updateServiceConfigService, {
    manual: true,
    onSuccess: (res, params) => {
      if (isReqSuccess(res)) {
        message.success('修改成功', 1, () => {
          onClose();
          refresh();
        });
      }
    },
  });

  // 提交事件
  const onSubmit = async () => {
    try {
      const values = paramsTransToNum(await form.validateFields(), arrString);
      updateServiceReq.run({ videoservice_conf: { ...values, uuid: currentItem?.uuid } });
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  useEffect(() => {
    if (currentItem && visible) {
      getVideoConfigServiceReq.run({ service_id: currentItem.uuid });
    }
  }, [currentItem, visible]);

  return (
    <Drawer
      title="编辑服务信息"
      width={570}
      visible={visible}
      onClose={onClose}
      destroyOnClose
      footer={
        <Space className="footer">
          <Button onClick={onClose}>取消</Button>
          <Button loading={updateServiceReq.loading} onClick={onSubmit} type="primary">
            保存
          </Button>
        </Space>
      }
    >
      {!getVideoConfigServiceReq.loading && (
        <ServiceForm
          form={form}
          type={type}
          currentItem={currentItem}
          videoConfig={getVideoConfigServiceReq.data}
        />
      )}
    </Drawer>
  );
};

export default ServiceDrawer;
