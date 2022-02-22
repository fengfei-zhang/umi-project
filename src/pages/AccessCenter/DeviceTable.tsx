/*
 * @Author: zhangfengfei
 * @Date: 2021-12-08 14:42:05
 * @LastEditTime: 2021-12-24 16:20:06
 * @LastEditors: zhangfengfei
 */
import DeleteModal from '@/components/DeleteModal';
import StatusText from '@/components/StatusText';
import useModal, { ModalState } from '@/hooks/useModal';
import { PicProtocolType, StatusType, VideoProtocolType } from '@/pages/data';
import { deleteDeviceService, DeviceItem } from '@/services/devices';
import { getOffsetHeightById, isReqSuccess } from '@/utils/utils';
import { CheckCircleOutlined, DeleteOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { message, Modal, Popconfirm, Table, TableProps } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { isNil } from 'lodash';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'umi';
import DeviceDrawer from './components/DeviceDrawer';

interface DeviceTableProps {
  tableProps: TableProps<DeviceItem>;
  refresh: () => Promise<any>;
  deviceDrawer: ModalState;
}

const DeviceTable: FC<DeviceTableProps> = ({ tableProps, refresh, deviceDrawer }) => {
  const dispatch = useDispatch();
  const [deviceItem, setDeviceItem] = useState<DeviceItem>();

  const [deleteVisible, setDeleteVisible] = useState(false);

  const deleteDeviceReq = useRequest(deleteDeviceService, {
    manual: true,
    onSuccess: (res) => {
      if (isReqSuccess(res)) {
        message.success('删除成功');
        setDeleteVisible(false);
        refresh();
        dispatch({
          type: 'global/getStatistics',
        });
      }
    },
  });

  const columns: ColumnProps<DeviceItem>[] = [
    {
      title: '设备IP',
      dataIndex: 'device_ip',
      render: (text, record) => (
        <StatusText isOnline={record.status === StatusType.在线}>{text}</StatusText>
      ),
    },
    {
      title: '设备名称',
      dataIndex: 'device_name',
      render: (text) => text || '-',
    },

    {
      title: '视频接入',
      dataIndex: 'video_protocol',
      render: (text, record) => (
        <>
          <div>{VideoProtocolType[text]}</div>
          <span className="font-gray">{record.video_service_addr || '-'}</span>
        </>
      ),
    },

    {
      title: '图片接入',
      dataIndex: 'pic_protocol',
      render: (text, record) => (
        <>
          <div>{record.pic_enable === false ? '关闭' : PicProtocolType[text]}</div>
          <span className="font-gray">{record.image_service_addr || '-'}</span>
        </>
      ),
    },
    {
      title: '启用状态',
      dataIndex: 'is_start',
      render: (text) =>
        text ? (
          <CheckCircleOutlined style={{ color: '#24BF8A', fontSize: 20 }} />
        ) : (
          <MinusCircleOutlined style={{ fontSize: 20 }} />
        ),
    },
    {
      title: '首次上线时间',
      dataIndex: 'first_online_time',
      render: (text) => (text === 0 ? '-' : moment.unix(text).format('YYYY-MM-DD HH:mm:ss')),
    },
    {
      title: '操作',
      key: 'operation',
      className: 'operation',
      render: (_, record) => (
        <div
          onClick={(e) => {
            setDeviceItem(record);
            e.stopPropagation();
          }}
        >
          <a
            className="margin-right-little"
            onClick={() => {
              deviceDrawer.setTypeWithVisible('info');
            }}
          >
            详情
          </a>
          <a
            className="margin-right-little"
            onClick={() => {
              deviceDrawer.setTypeWithVisible('update');
            }}
          >
            编辑
          </a>
          <a
            className="margin-right-little"
            onClick={() => {
              setDeleteVisible(true);
            }}
          >
            删除
          </a>
        </div>
      ),
    },
  ];

  const handleOk = () => {
    if (deviceItem) {
      deleteDeviceReq.run({ device_id: deviceItem.device_id });
    }
  };

  const handleCancel = () => {
    setDeleteVisible(false);
  };

  useEffect(() => {
    if (deviceDrawer.type === 'add') {
      setDeviceItem(undefined);
    }
  }, [deviceDrawer.type]);

  return (
    <div className="bgc-white">
      <Table
        {...tableProps}
        columns={columns}
        rowKey="device_id"
        pagination={{
          ...tableProps.pagination,
          showQuickJumper: true,
          showSizeChanger: true,
        }}
        scroll={{ y: getOffsetHeightById('main-layout') - 350 }}
      />
      <DeviceDrawer {...deviceDrawer} currentItem={deviceItem} refresh={refresh} />
      <DeleteModal
        visible={deleteVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmName={`${deviceItem?.device_name || deviceItem?.device_ip}`}
      >
        <p>删除后，已经产生的历史录像和抓拍图片</p>
        <p>会按照原定的存储规则继续保存。</p>
      </DeleteModal>
    </div>
  );
};

export default DeviceTable;
