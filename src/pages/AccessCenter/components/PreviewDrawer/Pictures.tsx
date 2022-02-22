/*
 * @Author: zhangfengfei
 * @Date: 2021-12-16 10:24:25
 * @LastEditTime: 2021-12-21 16:56:52
 * @LastEditors: zhangfengfei
 */
import CustomIcon from '@/components/CustomIcon';
import { DeviceItem, getDevicePicService } from '@/services/devices';
import { SyncOutlined, UndoOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Col, Row, Spin, Image, Empty } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import DeviceStatus from './DeviceStatus';

interface PicturesProps {
  currentItem: DeviceItem;
}

const Pictures: FC<PicturesProps> = ({ currentItem }) => {
  const { data, refresh, loading } = useRequest(
    () => getDevicePicService({ device_id: currentItem.device_id }),
    {
      formatResult: (res) => res.data.data,
    },
  );

  return (
    <div>
      <div className="flex flex-pack-justify margin-bottom-middle">
        <DeviceStatus currentItem={currentItem} />
        <a onClick={refresh}>
          <UndoOutlined rotate={135} className="primary-color margin-right-little" />
          刷新
        </a>
      </div>
      <Spin spinning={loading} className="">
        <Row gutter={[24, 24]}>
          {data ? (
            data.timestamps.map((item) => {
              const date = moment.unix(item).format('YYYY-MM-DD HH:mm:ss');
              return (
                <Col span={12}>
                  <div
                    className="padding-all-little"
                    style={{ border: '1px solid #D9D9D9', height: 180 }}
                  >
                    <Image width={'100%'} height={120} src={`${data.base_url}${item}`} />
                    <span
                      className="flex flex-align-center margin-top-little"
                      style={{ color: '#7F8A93' }}
                    >
                      <CustomIcon type="Clock" className="margin-right-little" />
                      <span>{date}</span>
                    </span>
                  </div>
                </Col>
              );
            })
          ) : (
            <Empty className="flex flex-v flex-align-center" style={{ width: '100%' }} />
          )}
        </Row>
      </Spin>
    </div>
  );
};

export default Pictures;
