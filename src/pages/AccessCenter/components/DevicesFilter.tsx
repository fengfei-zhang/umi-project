/*
 * @Author: zhangfengfei
 * @Date: 2021-12-07 17:40:58
 * @LastEditTime: 2021-12-21 10:11:44
 * @LastEditors: zhangfengfei
 */
import FormFilter, { FormFilterState } from '@/components/FormFilter';
import { EnumStartType, StartType, StatusType } from '@/pages/data';
import { enumToOptions, objToOptions } from '@/utils/utils';
import { useForm } from 'antd/lib/form/Form';
import React, { FC } from 'react';

interface DevicesFilterProps {
  onChange: (values: any) => void;
}

const DevicesFilter: FC<DevicesFilterProps> = ({ onChange }) => {
  const [form] = useForm();
  const data: FormFilterState[] = [
    {
      label: '查询',
      name: 'q',
      placeholder: '请输入设备名称/设备IP',
      type: 'input',
    },
    // {
    //   label: '筛选',
    //   name: 'status',
    //   type: 'select',
    //   placeholder: '设备状态',
    //   options: [
    //     {
    //       label: '全部状态',
    //       value: null,
    //     },
    //     ...enumToOptions(StatusType),
    //   ],
    // },
    {
      label: '筛选',
      name: 'is_start',
      type: 'select',
      placeholder: '启用状态',
      options: [
        {
          label: '全部',
          value: null,
        },
        {
          label: '未启用',
          value: false,
        },
        {
          label: '已启用',
          value: true,
        },
        // ...enumToOptions(EnumStartType),
      ],
    },
  ];

  return <FormFilter form={form} formFilterData={data} onChange={onChange} />;
};

export default DevicesFilter;
