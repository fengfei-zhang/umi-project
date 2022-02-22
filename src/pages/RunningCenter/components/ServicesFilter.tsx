/*
 * @Author: zhangfengfei
 * @Date: 2021-12-07 17:40:58
 * @LastEditTime: 2021-12-14 17:43:45
 * @LastEditors: zhangfengfei
 */
import FormFilter, { FormFilterState } from '@/components/FormFilter';
import { EnumStartType, StatusType } from '@/pages/data';
import { enumToOptions } from '@/utils/utils';
import { useForm } from 'antd/lib/form/Form';
import React, { FC } from 'react';

interface ServicesFilterProps {
  onChange: (values: any) => void;
}

const ServicesFilter: FC<ServicesFilterProps> = ({ onChange }) => {
  const [form] = useForm();
  const data: FormFilterState[] = [
    {
      label: '查询',
      name: 'q',
      placeholder: '请输入服务IP地址',
      type: 'input',
    },
    // {
    //   label: '筛选',
    //   name: 'status',
    //   type: 'select',
    //   placeholder: '服务器',
    //   options: [
    //     {
    //       label: '全部',
    //       value: null,
    //     },
    //     // ...enumToOptions(StatusType),
    //   ],
    // },
  ];

  return (
    <FormFilter showResetButton={false} form={form} formFilterData={data} onChange={onChange} />
  );
};

export default ServicesFilter;
