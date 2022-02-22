/*
 * @Author: zhangfengfei
 * @Date: 2021-12-14 10:02:12
 * @LastEditTime: 2021-12-22 15:09:46
 * @LastEditors: zhangfengfei
 */
import CustomIcon from '@/components/CustomIcon';
import DeleteModal from '@/components/DeleteModal';
import ContainerTitle from '@/components/DivideList/ContainerTitle';
import useModal from '@/hooks/useModal';
import { ServiceType, StatusType } from '@/pages/data';
import { deleteServiceService, restartService, ServiceItem } from '@/services/services';
import { getOffsetHeightById, isReqSuccess } from '@/utils/utils';
import { useRequest } from 'ahooks';
import { Button, message, Space, Table, TableProps } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { isNil } from 'lodash';
import moment from 'moment';
import React, { FC, useState } from 'react';
import ServiceDrawer from '../components/ServiceDrawer';

interface ServiceTableProps extends TableProps<ServiceItem> {
  refresh: () => Promise<any>;
}

const ServiceTable: FC<ServiceTableProps> = (props) => {
  const { refresh, ...tableProps } = props;
  const [serviceItem, setServiceItem] = useState<ServiceItem>();
  // drawer状态
  const serviceDrawer = useModal();
  // 删除服务modal状态
  const [deleteVisible, setDeleteVisible] = useState(false);
  // 删除服务请求
  const deleteServiceReq = useRequest(deleteServiceService, {
    manual: true,
    onSuccess: (res) => {
      if (isReqSuccess(res)) {
        message.success('删除成功');
        setDeleteVisible(false);
        refresh();
      }
    },
  });

  // 服务重启
  const restartServiceReq = useRequest(restartService, {
    manual: true,
    onSuccess: (res) => {
      if (isReqSuccess(res)) {
        message.success('操作成功');
        refresh();
      }
    },
  });
  const handleOk = () => {
    if (serviceItem) {
      deleteServiceReq.run({ service_id: serviceItem.uuid });
    }
  };

  const handleCancel = () => {
    setDeleteVisible(false);
  };

  const columns: ColumnProps<ServiceItem>[] = [
    {
      title: '服务节点ID',
      dataIndex: 'uuid',
      width: 400,
      render: (text, record) => (
        <ContainerTitle
          isOnline={record.status === StatusType.在线}
          icon={<CustomIcon style={{ width: 40, height: 40 }} type="ServiceAddress" />}
          label={text}
        />
      ),
    },
    {
      title: '服务地址',
      dataIndex: 'service_addr',
      render: (text) => text || '-',
    },
    {
      title: '服务类型',
      dataIndex: 'type',
      render: (text) => ServiceType[text],
    },
    {
      title: '接入路数',
      dataIndex: 'device_num',
      render: (text) => (isNil(text) ? '-' : text),
    },
    {
      title: '服务启动时间',
      dataIndex: 'last_regist_time',
      render: (text) => moment.unix(text).format('YYYY-MM-DD HH:mm:ss'),
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
      title: '操作',
      key: 'operation',
      className: 'operation',
      render: (_, record) => (
        <Space
          onClick={(e) => {
            e.stopPropagation();
            setServiceItem(record);
          }}
        >
          <Button
            type="link"
            style={{ padding: 0 }}
            disabled={record.type === ServiceType.图片接入}
            onClick={() => {
              serviceDrawer.setTypeWithVisible('update');
            }}
          >
            编辑
          </Button>
          <Button
            type="link"
            style={{ padding: 0 }}
            onClick={() => {
              restartServiceReq.run({ uuid: record.uuid });
            }}
          >
            重启
          </Button>
          <Button
            type="link"
            style={{ padding: 0 }}
            onClick={() => {
              setDeleteVisible(true);
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bgc-white">
      <Table
        {...tableProps}
        dataSource={tableProps.dataSource?.filter((i) => i.is_add === 1)}
        columns={columns}
        rowKey="uuid"
        pagination={{
          ...tableProps.pagination,
          showQuickJumper: true,
          showSizeChanger: true,
        }}
        scroll={{ y: getOffsetHeightById('main-layout') - 200 }}
      />
      <ServiceDrawer {...serviceDrawer} currentItem={serviceItem} refresh={refresh} />
      <DeleteModal visible={deleteVisible} onOk={handleOk} onCancel={handleCancel}></DeleteModal>
    </div>
  );
};

export default ServiceTable;
