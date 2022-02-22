/*
 * @Author: zhangfengfei
 * @Date: 2021-12-08 16:40:56
 * @LastEditTime: 2021-12-24 10:49:26
 * @LastEditors: zhangfengfei
 */
import InfoItem, { InfoItemProps } from '@/components/InfoItem';
import MatchstickTitle from '@/components/MatchstickTitle';
import {
  BracketDirectionType,
  CoordinateSystemType,
  DeviceBrandType,
  DeviceFunctionType,
  DeviceType,
  FillInLightType,
  IndustryType,
  ISPType,
  MonitorDirectionType,
  NetworkType,
  PicProtocolType,
  PointType,
  PoleType,
  VideoProtocolType,
} from '@/pages/data';
import { DeviceItem } from '@/services/devices';
import { CaretRightOutlined, EyeFilled, EyeOutlined } from '@ant-design/icons';
import { Collapse, Form } from 'antd';
import moment from 'moment';
import type { FC } from 'react';
import React from 'react';
import PreviewInfo from './PreviewInfo';

const { Panel } = Collapse;
interface DeviceInfoProps {
  currentItem: DeviceItem;
}

const DeviceInfo: FC<DeviceInfoProps> = ({ currentItem }) => {
  const accessData = [
    {
      label: '设备IP',
      value: currentItem.device_ip,
      required: true,
    },
    {
      label: '用户名',
      value: currentItem.username,
      required: true,
    },
    {
      label: '密码',
      value: currentItem.password,
      required: true,
    },
    {
      label: '视频接入协议',
      value: VideoProtocolType[currentItem.video_protocol],
      required: true,
    },
    {
      label: '端口',
      value: currentItem.video_ctrl_port,
      required: true,
    },
    {
      label: '图片接入协议',
      value: PicProtocolType[currentItem.pic_protocol],
    },
    {
      label: '接入时间',
      value: moment.unix(currentItem.create_time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      label: '启用状态',
      value: currentItem.is_start ? '启用' : '未启用',
    },
    {
      label: '首次上线时间',
      value:
        currentItem.first_online_time &&
        moment.unix(currentItem.first_online_time).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];
  const deviceInfoData = [
    {
      label: '设备ID',
      value: currentItem.device_id,
    },
    {
      label: '设备名称',
      value: currentItem.device_name,
    },
    {
      label: 'SN编码',
      value: currentItem.sn,
    },
    {
      label: '设备品牌',
      value: DeviceBrandType[currentItem.device_brand],
    },
    {
      label: '设备型号',
      value: currentItem.device_model,
    },
    {
      label: '摄像机类型',
      value: DeviceType[currentItem.device_type],
    },
    {
      label: '摄像机功能',
      value: currentItem.device_function_array?.map((i) => `${DeviceFunctionType[i]} `),
    },
    {
      label: '监视方向',
      value: MonitorDirectionType[currentItem.monitor_direction],
    },
    {
      label: '补光灯',
      value: FillInLightType[currentItem.fill_in_light],
    },
  ];
  const pointInfo = [
    {
      label: '点位名称',
      value: currentItem.location,
    },
    {
      label: '行政区划',
      value: currentItem.civil_name,
    },
    {
      label: '行政编码',
      value: currentItem.civil_code,
    },
    {
      label: '坐标系',
      value: CoordinateSystemType[currentItem.coordinate_system],
    },
    {
      label: '经度',
      value: currentItem.longitude,
    },
    {
      label: '纬度',
      value: currentItem.latitude,
    },
    {
      label: '监控点类型',
      value: PointType[currentItem.point_type],
    },
    {
      label: '采集区域',
      value: currentItem.collect_area,
    },
    {
      label: '所属行业',
      value: IndustryType[currentItem.industry],
    },
    {
      label: '网络类型',
      value: NetworkType[currentItem.network_type],
    },
    {
      label: '网络运营商',
      value: ISPType[currentItem.isp],
    },
    {
      label: '安装联系人',
      value: currentItem.contact_name,
    },
    {
      label: '联系人电话',
      value: currentItem.contact_number,
    },
    {
      label: '立杆类型',
      value: PoleType[currentItem.pole_type],
    },
    {
      label: '立杆高度',
      value: currentItem.pole_height,
    },
    {
      label: '支臂方向',
      value: BracketDirectionType[currentItem.bracket_direction],
    },
    {
      label: '支臂长度',
      value: currentItem.bracket_length,
    },
    {
      label: '箱体数量',
      value: currentItem.box_num,
    },
    {
      label: '箱体编号',
      value: currentItem.box_id,
    },
  ];

  return (
    <Collapse
      ghost
      defaultActiveKey={['1', '2', '3', '4', '5']}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined style={{ color: '#2BBFC7' }} rotate={isActive ? 90 : 0} />
      )}
    >
      <Panel header="设备接入" key="1">
        {accessData.map((item, index) => (
          <InfoItem {...item} key={item.label} />
        ))}
        <PreviewInfo currentItem={currentItem} />
      </Panel>
      <Panel header="设备属性信息" key="2">
        {deviceInfoData.map((item, index) => (
          <InfoItem {...item} key={item.label} />
        ))}
      </Panel>
      <Panel header="点位属性信息" key="3">
        {pointInfo.map((item, index) => (
          <InfoItem {...item} key={item.label} />
        ))}
      </Panel>
    </Collapse>
  );
};

export default DeviceInfo;
