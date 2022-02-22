import React, { useRef } from 'react';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import type { FormInstance } from 'antd/lib/form/Form';
import moment from 'moment';
import { debounce, isEmpty, isEqual } from 'lodash';
import styles from './index.less';
import MultipleInput from '../MultipleInput';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;

export type ValuesState = Record<string, any>;

interface OptionState {
  value: any;
  label: string;
  key?: string;
}

export interface FormFilterState {
  type: 'input' | 'select' | 'rang-picker' | 'multiple-input';
  name: string;
  width?: number;
  label?: string;
  options?: OptionState[];
  placeholder?: string;
}

interface FormFilterProps {
  onChange: (values: ValuesState) => void;
  formFilterData: FormFilterState[];
  form: FormInstance<any>;
  showResetButton?: boolean;
}

const FormFilter: React.FC<FormFilterProps> = ({
  onChange,
  formFilterData,
  form,
  showResetButton = true,
}) => {
  const preRef = useRef();

  // 搜索条件改变的时候 需要全部获取
  const onValueChange = () => {
    const values = form.getFieldsValue();

    if (!isEqual(preRef.current, values)) {
      onChange(values);
      preRef.current = values;
    }
  };

  // 重置筛选
  const onReset = () => {
    form.resetFields();
    onValueChange();
  };

  return (
    <div className={styles.main} id="formFilter">
      <Form layout="inline" form={form} autoComplete="off">
        {formFilterData.map((item) => {
          let content;

          if (item.type === 'select' && !isEmpty(item.options)) {
            content = (
              <Select
                style={{ width: item.width || 110 }}
                onChange={onValueChange}
                placeholder={item.placeholder}
                getPopupContainer={() => document.getElementById('formFilter') as HTMLDivElement}
              >
                {item.options &&
                  item.options.map((option) => (
                    <Option value={option.value} key={option.key || option.value}>
                      {option.label}
                    </Option>
                  ))}
              </Select>
            );
          }

          if (item.type === 'input') {
            content = (
              <Input
                allowClear
                prefix={<SearchOutlined />}
                style={{ width: item.width || 300 }}
                placeholder={item.placeholder}
                onChange={debounce(onValueChange, 500)}
              />
            );
          }

          // if (item.type === 'multiple-input') {
          //   content = <MultipleInput options={item.options} onChange={onValueChange} />;
          // }

          if (item.type === 'rang-picker') {
            content = (
              <RangePicker
                format="YYYY-MM-DD"
                style={{ width: item.width }}
                disabledDate={(current) => !(current && current < moment().endOf('day'))}
                popupStyle={{ zIndex: 999 }}
                getPopupContainer={() => document.getElementById('formFilter') as HTMLDivElement}
                onChange={onValueChange}
              />
            );
          }

          if (content) {
            return (
              <Form.Item label={item.label} name={item.name} key={item.name}>
                {content}
              </Form.Item>
            );
          }

          return null;
        })}
        {showResetButton && (
          <Form.Item>
            <Button type="default" onClick={onReset}>
              重置筛选
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};

export default FormFilter;
