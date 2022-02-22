/*
 * @Author: zhangfengfei
 * @Date: 2021-12-17 14:28:26
 * @LastEditTime: 2021-12-24 10:20:00
 * @LastEditors: zhangfengfei
 */
import CustomIcon from '@/components/CustomIcon';
import { ConnectState } from '@/models/connect';
import { divided } from '@/utils/utils';
import { Col, Row } from 'antd';
import React, { FC } from 'react';
import { useSelector } from 'umi';
import styles from './index.less';

interface DeviceStatisticsProps {}

const DeviceStatistics: FC<DeviceStatisticsProps> = () => {
  const { statistics } = useSelector((state: ConnectState) => state.global);

  const infos = [
    {
      icon: <CustomIcon style={{ width: 40, height: 40 }} type="StartDevice" />,
      label: '启用设备',
      value: statistics.start_num,
      unit: '台',
    },
    {
      icon: <CustomIcon style={{ width: 40, height: 40 }} type="StartPercent" />,
      label: '启用率',
      value: divided(statistics.start_num, statistics.total),
      unit: '%',
    },
    {
      icon: <CustomIcon style={{ width: 40, height: 40 }} type="OnlineDevice" />,
      label: '在线设备',
      value: statistics.online_num,
      unit: '台',
    },
    {
      icon: <CustomIcon style={{ width: 40, height: 40 }} type="OnlineDevice" />,
      label: '在线率',
      value: divided(statistics.online_num, statistics.start_num),
      unit: '%',
    },
  ];

  return (
    <div className={`${styles.statistic} bgc-white margin-bottom-big`}>
      <Row justify="space-around">
        <Col key="total">
          <span className="margin-right-big" style={{ fontSize: 16 }}>
            接入设备
          </span>
          <span className="margin-right-little primary-color" style={{ fontSize: 28 }}>
            {statistics.total}
          </span>
          台
        </Col>
        <Col style={{ position: 'relative', width: 128 }}>
          <img
            style={{ width: 128, height: 74, position: 'absolute' }}
            src="/device-total.png"
            alt=""
          />
        </Col>
        {/* <Divider style={{ height: 46 }} type="vertical" /> */}
        {infos.map((item) => {
          return (
            <Col key={item.label}>
              <span className="margin-right-big">{item.icon}</span>
              <span className="margin-right-big" style={{ fontSize: 16 }}>
                {item.label}
              </span>
              <span className="margin-right-little" style={{ fontSize: 22 }}>
                {item.value}
              </span>
              {item.unit}
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default DeviceStatistics;
