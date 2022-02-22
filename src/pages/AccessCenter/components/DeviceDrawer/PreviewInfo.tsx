/*
 * @Author: zhangfengfei
 * @Date: 2021-12-15 11:36:53
 * @LastEditTime: 2021-12-16 09:49:53
 * @LastEditors: zhangfengfei
 */
import InfoItem from '@/components/InfoItem';
import MatchstickTitle from '@/components/MatchstickTitle';
import useModal from '@/hooks/useModal';
import { DeviceItem } from '@/services/devices';
import { EyeFilled } from '@ant-design/icons';
import { Switch } from 'antd';
import React, { FC } from 'react';
import PreviewDrawer from '../PreviewDrawer';

interface PreviewInfoProps {
  currentItem: DeviceItem;
}

const PreviewInfo: FC<PreviewInfoProps> = ({ currentItem }) => {
  const previewDrawer = useModal();
  return (
    <>
      <div className="margin-left-middle padding-all-middle dash-box">
        <MatchstickTitle
          style={{ fontSize: 14 }}
          className="flex flex-pack-justify margin-bottom-little"
        >
          <span className="margin-left-little">视频播放</span>
          <a
            onClick={() => {
              previewDrawer.setTypeWithVisible('add');
            }}
          >
            <EyeFilled className="margin-right-little" />
            预览
          </a>
        </MatchstickTitle>
        <InfoItem label="主码流地址" value={currentItem.major_stream_url} />
        <InfoItem label="子码流地址" value={currentItem.minor_stream_url} />
        <MatchstickTitle style={{ fontSize: 14 }} className="flex flex-pack-justify">
          <span className="margin-left-little">图片推送</span>
          <a
            onClick={() => {
              previewDrawer.setTypeWithVisible('update');
            }}
          >
            <EyeFilled className="margin-right-little" />
            预览
          </a>
        </MatchstickTitle>
        <InfoItem label="图片推送" value={<Switch checked={currentItem.pic_enable || false} />} />
      </div>
      <PreviewDrawer {...previewDrawer} currentItem={currentItem} />
    </>
  );
};

export default PreviewInfo;
