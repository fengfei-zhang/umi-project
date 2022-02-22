/*
 * @Author: zhangfengfei
 * @Date: 2021-12-14 15:18:30
 * @LastEditTime: 2021-12-21 10:31:11
 * @LastEditors: zhangfengfei
 */
import { ServiceType } from '@/pages/data';
import {
  deleteServiceService,
  ServiceItem,
  updateServiceAddStatusService,
} from '@/services/services';
import { isReqSuccess } from '@/utils/utils';
import { useRequest } from 'ahooks';
import { message, Space, Table, TableProps } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import React, { FC, useState } from 'react';

interface AddServiceTableProps extends TableProps<ServiceItem> {
  refresh: () => Promise<any>;
  // onDelete: (params: ServiceItem) => void;
}

const AddServiceTable: FC<AddServiceTableProps> = (props) => {
  const { refresh, ...tableProps } = props;
  // 修改添加状态请求
  const updateAddStatusReq = useRequest(updateServiceAddStatusService, {
    manual: true,
    onSuccess: (res) => {
      if (isReqSuccess(res)) {
        message.success('添加成功');
        refresh();
      }
    },
  });
  // 删除服务请求
  const deleteServiceReq = useRequest(deleteServiceService, {
    manual: true,
    onSuccess: (res) => {
      if (isReqSuccess(res)) {
        message.success('删除成功');
        refresh();
      }
    },
  });

  const columns: ColumnProps<ServiceItem>[] = [
    {
      title: '服务节点ID',
      dataIndex: 'uuid',
    },
    {
      title: '版本号',
      dataIndex: 'version',
    },
    {
      title: '主机名',
      dataIndex: 'host',
    },
    {
      title: '服务类型',
      dataIndex: 'type',
      render: (text) => ServiceType[text],
    },
    {
      title: '操作',
      key: 'operation',
      className: 'operation',
      render: (_, record) => (
        <Space
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <a
            onClick={() => {
              updateAddStatusReq.run({ uuid: record.uuid, is_add: 1 });
            }}
          >
            添加
          </a>
          <a
            onClick={() => {
              deleteServiceReq.run({ service_id: record.uuid });
            }}
          >
            删除
          </a>
        </Space>
      ),
    },
  ];

  return (
    <Table
      {...tableProps}
      dataSource={tableProps.dataSource?.filter((i) => i.is_add === 0)}
      columns={columns}
      rowKey="uuid"
      pagination={false}
      //   pagination={{
      //     ...tableProps.pagination,
      //     showQuickJumper: true,
      //     showSizeChanger: true,
      //   }}
    ></Table>
  );
};

export default AddServiceTable;
