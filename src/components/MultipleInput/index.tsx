import useDeepCompareEffect from '@/hooks/useDeepCompareEffect';
import { CloseOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { cloneDeep, remove } from 'lodash';
import React, { useState } from 'react';
import styles from './index.less';

interface ValueItems {
  key: any;
  label: any;
}

interface MultipleInputProps {
  options?: ValueItems[];
  value?: any;
  onChange?: (val: any) => void;
}

const { Option } = Select;

const MultipleInput: React.FC<MultipleInputProps> = (props) => {
  const { value, onChange, options = [], children } = props;
  const initialOptions = options[0];

  const [name, setName] = useState<any>(`${initialOptions.key}-${initialOptions.label}`);
  const [tags, setTags] = useState<string[]>([`label-${initialOptions.label}`]);

  const onSelectTypeChange = (val: any) => {
    setName(val);
    tags.pop();
    tags.push(`label-${val.split('-')[1]}`);
    setTags([...tags]);
  };

  const onTagsSelectChange = (val: any) => {
    let repeatIndex = -1;
    const currentName = name.split('-')[1];
    const valueKey = {};

    tags.pop();

    options.forEach((i) => {
      valueKey[i.label] = i.key;
    });

    tags.forEach((i, idx) => {
      if (i.indexOf(currentName) !== -1) {
        repeatIndex = idx;
      }
    });

    if (repeatIndex !== -1) {
      tags[repeatIndex] = `${currentName}:${val}`;
    } else {
      tags.push(`${currentName}:${val}`);
    }

    const reuslt = [...tags];

    reuslt.push(`label-${currentName}`);
    setTags(reuslt);

    const res = tags.map((i) => {
      return {
        key: valueKey[i.split(':')[0]],
        value: i.split(':')[1],
      };
    });

    if (onChange) {
      onChange(cloneDeep(res));
    }
  };

  //   useDeepCompareEffect(() => {}, [value]);

  return (
    <div className={styles.main}>
      <div className="flex">
        <div className={`${styles.select}`}>
          <Select
            value={name}
            style={{ width: 120 }}
            onChange={onSelectTypeChange}
            getPopupContainer={() => document.getElementById('formFilter') as HTMLDivElement}
          >
            {options.map((item) => {
              return (
                <Option key={item.key} value={`${item.key}-${item.label}`}>
                  {item.label}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className={styles.tags}>
          <Select
            mode="tags"
            value={tags}
            style={{ width: 600 }}
            open={false}
            tagRender={(tagsProps) => {
              if (typeof tagsProps.value === 'string' && tagsProps.value.indexOf('label') !== -1) {
                return <div>{tagsProps.value.split('label-')[1]}：</div>;
              }

              return (
                <div className={styles.item}>
                  {tagsProps.label}
                  <CloseOutlined className={styles.close} onClick={tagsProps.onClose} />
                </div>
              );
            }}
            onDeselect={(val) => {
              // eslint-disable-next-line func-names
              remove(tags, function (n) {
                return n === val;
              });
              setTags(cloneDeep(tags));
            }}
            onChange={(val) => {
              onTagsSelectChange(val[val.length - 1]);
            }}
          >
            {children}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default MultipleInput;
