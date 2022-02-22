/*
 * @Author: zhangfengfei
 * @Date: 2021-12-09 11:13:08
 * @LastEditTime: 2021-12-21 15:57:51
 * @LastEditors: zhangfengfei
 */
import { Radio, RadioChangeEvent } from 'antd';
import React, { FC } from 'react';
import styles from './index.less';

interface ModeSelectorProps {
  mode: 'part' | 'all';
  onSelect: (value: 'part' | 'all') => void;
}

const ModeSelector: FC<ModeSelectorProps> = ({ onSelect, mode }) => {
  function onChange(e: RadioChangeEvent) {
    onSelect(e.target.value);
  }

  return (
    <Radio.Group className={styles.selector} onChange={onChange} defaultValue="part">
      <Radio.Button className={styles.button} key={1} value="part">
        <img
          className="margin-right-big"
          src={`./part_${mode === 'part' ? 'select' : 'unselect'}.png`}
          alt="快速接入"
        />
        {/* <CustomIcon type="PartAccess"></CustomIcon> */}
        快速接入
      </Radio.Button>
      <Radio.Button className={styles.button} key={2} value="all">
        <img
          className="margin-right-big"
          src={`./all_${mode === 'all' ? 'select' : 'unselect'}.png`}
          alt="快速接入"
        />
        {/* <CustomIcon type="AllAccess"></CustomIcon> */}
        完整接入
      </Radio.Button>
    </Radio.Group>
  );
};

export default ModeSelector;
