/*
 * @Author: zhangfengfei
 * @Date: 2021-12-14 11:11:29
 * @LastEditTime: 2021-12-29 13:38:28
 * @LastEditors: zhangfengfei
 */
import { Col, Form, FormItemProps, Row } from 'antd';
import React, { FC, ReactNode } from 'react';

export interface InfoItemProps extends FormItemProps {
  value: ReactNode;
}

const InfoItem: FC<InfoItemProps> = (props) => {
  const { value, ...rest } = props;
  return (
    <Form.Item
      className="margin-bottom-little"
      labelCol={{ span: 6, offset: 1 }}
      wrapperCol={{ span: 17 }}
      labelAlign={rest.labelAlign || 'left'}
      {...rest}
    >
      {value || '-'}
    </Form.Item>
  );
};

export default InfoItem;
