/*
 * @Author: zhangfengfei
 * @Date: 2021-12-14 17:06:50
 * @LastEditTime: 2021-12-27 15:35:18
 * @LastEditors: zhangfengfei
 */
import { ModalType } from '@/hooks/useModal';
import { ServiceItem } from '@/services/services';
import { Form, FormInstance, InputNumber, Select } from 'antd';
import React, { FC, useEffect } from 'react';

const formLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    offset: 1,
  },
};

interface ServiceFormProps {
  form: FormInstance<any>;
  currentItem?: ServiceItem;
  type: ModalType;
  videoConfig: any;
}

const ServiceForm: FC<ServiceFormProps> = ({ form, currentItem, videoConfig, type }) => {
  useEffect(() => {
    if (type === 'add') {
      // 添加重置
      form.resetFields();
    } else if (type === 'update' && currentItem) {
      // 编辑赋值
      if (videoConfig) {
        form.setFieldsValue(videoConfig);
      } else {
        form.resetFields();
      }
    }
  }, [type, currentItem, form, videoConfig]);

  const rules = [{ required: true, message: '请输入' }];

  return (
    <Form form={form} autoComplete="off" labelAlign="right" {...formLayout}>
      <Form.Item rules={rules} label="内网IP" name="local_ip">
        <Select placeholder="请选择">
          {(currentItem?.ip_addrs ?? []).map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item rules={rules} label="外网IP" name="public_ip">
        <Select placeholder="请选择">
          {(currentItem?.ip_addrs ?? []).map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item rules={rules} label="RTSP端口" name="rtsp_port">
        <InputNumber min={1} max={65535} placeholder="0~65535" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item rules={rules} label="RTMP端口" name="rtmp_port">
        <InputNumber min={1} max={65535} placeholder="0~65535" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item rules={rules} label="HTTP端口" name="http_port">
        <InputNumber min={1} max={65535} placeholder="0~65535" style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item rules={rules} label="OPS端口" name="ops_port">
        <InputNumber min={1} max={65535} placeholder="0~65535" style={{ width: '100%' }} />
      </Form.Item>
    </Form>
  );
};

export default ServiceForm;
