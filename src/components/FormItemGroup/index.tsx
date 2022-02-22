/*
 * @Author: zhangfengfei
 * @Date: 2021-12-10 11:24:38
 * @LastEditTime: 2021-12-13 16:12:47
 * @LastEditors: zhangfengfei
 */

import { enumToOptions } from '@/utils/utils';
import { Checkbox, Col, Radio, Row } from 'antd';
import React, { FC } from 'react';

interface FormItemGroupProps {
  type: 'Radio' | 'Checkbox';
  enumValue: Record<string, any>;
  defaultValue?: any;
  // antd 注入的value 和 onChange
  value?: any;
  onChange?: (params: any) => void;
}

const FormItemGroup: FC<FormItemGroupProps> = ({
  type,
  enumValue,
  value,
  onChange,
  defaultValue,
}) => {
  return type === 'Radio' ? (
    <Radio.Group
      style={{ width: '100%' }}
      value={value}
      onChange={(e) => {
        if (onChange) {
          onChange(e.target.value);
        }
      }}
      defaultValue={defaultValue}
    >
      <Row>
        {enumToOptions(enumValue).map((item) => (
          <Col span={8} key={item.label}>
            <Radio value={item.value} style={{ lineHeight: '32px' }}>
              {item.label}
            </Radio>
          </Col>
        ))}
      </Row>
    </Radio.Group>
  ) : (
    <Checkbox.Group
      style={{ width: '100%' }}
      value={value}
      onChange={(params) => {
        if (onChange) {
          onChange(params);
        }
      }}
      defaultValue={defaultValue}
    >
      <Row>
        {enumToOptions(enumValue).map((item) => (
          <Col span={8} key={item.label}>
            <Checkbox value={item.value} style={{ lineHeight: '32px' }}>
              {item.label}
            </Checkbox>
          </Col>
        ))}
      </Row>
    </Checkbox.Group>
  );
};

export default FormItemGroup;
