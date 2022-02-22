import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Select } from 'antd';
import LyPlayer from '@/components/LyPlayer';
import { useRequest } from 'ahooks';
import { DeviceItem } from '@/services/devices';
import { getChannelLiveUrlService } from '@/services/channel';
import { isReqSuccess } from '@/utils/utils';
import './Live.less';
import { SyncOutlined, UndoOutlined } from '@ant-design/icons';
import { useHistory } from 'umi';
import { DeviceDrawerContext } from '../DeviceDrawer';
import DeviceStatus from './DeviceStatus';
import InfoItem from '@/components/InfoItem';

const { Option } = Select;

export interface LiveProps {
  currentItem: DeviceItem;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const Live: React.FC<LiveProps> = ({ currentItem, setVisible }) => {
  const deviceDrawer = useContext(DeviceDrawerContext);
  const [duration, setDuration] = useState(0);
  const history = useHistory();
  // const [recording, setRecording] = useState(false);
  const [streamType, setStreamType] = useState<'major' | 'minor'>('minor');
  // flv 的live_url地址
  // const [flvUrl, setflvUrl] = useState<LiveUrl>();

  const [playingUrl, setPlayingUrl] = useState<'local_url' | 'public_url'>('public_url');

  // const containerRef = useRef<HTMLElement>();
  // const selectionRef = useRef<any>();
  // const [command, setCommand] = useState<DragCommandType>();

  // const videoManulrecordControl = useRequest(videoManulrecordControlService, {
  //   manual: true,
  //   onSuccess: (res) => {
  //     responseCheck(res, () => {
  //       message.success(`已${recording ? '关闭' : '开启'}录像`);
  //       setRecording(!recording);
  //     });
  //   },
  // });

  // const videoChannelDragzoomRequest = useRequest(videoChannelDragzoomService, {
  //   manual: true,
  //   onSuccess: (res) => {
  //     responseCheck(res, () => {
  //       // message.success(`已${recording ? '关闭' : '开启'}录像`);
  //     });
  //   },
  // });

  //  查询通道实时视频播放地址
  const { data, loading, refresh } = useRequest(
    () =>
      getChannelLiveUrlService({
        stream_type: streamType,
        device_id: currentItem.device_id,
      }),
    {
      refreshDeps: [streamType, currentItem.device_id],
      formatResult: (res) => {
        if (isReqSuccess(res)) {
          const result = res.data.data.live_urls.find((i) => i.protocol === 'http-flv');
          return result;
        }
        return undefined;
      },
    },
  );

  let content = (
    <div
      className="flex flex-align-center flex-pack-center"
      style={{ backgroundColor: 'black', height: 330 }}
    >
      <span style={{ color: '#fff' }}>暂无视频</span>
    </div>
  );
  if (!loading && data) {
    content = (
      <div style={{ height: 330, position: 'relative' }}>
        <LyPlayer
          isLiving
          file={`${data[playingUrl]}&format=1.flv`}
          height={330}
          controls={{
            recordingControl: <span className={`player-control pointer}`}></span>,
            ptzControl: <span className="player-control flex flex-align-center"></span>,
            zoomContro: <span className="player-control  flex flex-align-center"></span>,
          }}
          onEnd={(value: number) => {
            setDuration(value);
          }}
        ></LyPlayer>
      </div>
    );
  }

  return (
    <>
      <div className="margin-bottom-little flex flex-pack-justify flex-align-center">
        <span>
          <Select
            className="margin-right-little"
            style={{ width: 120 }}
            value={streamType}
            onChange={(value: any) => {
              setStreamType(value);
            }}
          >
            <Option key={1} value={'major'}>
              主码流
            </Option>
            <Option key={2} value={'minor'}>
              子码流
            </Option>
          </Select>
          <Select
            className="margin-right-little"
            value={playingUrl}
            style={{ width: 120 }}
            onChange={(value: any) => {
              setPlayingUrl(value);
            }}
          >
            <Option key={1} value={'public_url'}>
              外网地址
            </Option>
            <Option key={2} value={'local_url'}>
              内网地址
            </Option>
          </Select>
        </span>
        {duration !== 0 && <span>本次开流时长：{(duration / 1000).toFixed(1)} s</span>}
        <a onClick={refresh}>
          <UndoOutlined rotate={135} className="primary-color margin-right-little" />
          刷新
        </a>
      </div>
      <div id="livingPlayer" className="margin-bottom-big">
        {content}
      </div>

      <div
        className="dash-box margin-top-big padding-all-middle"
        style={{ borderColor: '#2BBFC7', backgroundColor: 'rgba(43, 191, 199, 0.08)' }}
      >
        <InfoItem
          label="播放地址"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          labelAlign="left"
          value={data && data[playingUrl]}
        />
      </div>
      <div className="dash-box margin-top-big padding-all-middle">
        <h4 className="margin-bottom-middle">设备在线，播放失败？</h4>
        <p className="margin-bottom-middle">
          1.查看前端设备是否故障，前往
          <a
            href={`http://${currentItem.device_ip}`}
            target="_blank"
            onClick={() => {
              // setVisible(false);
              // deviceDrawer.setTypeWithVisible('update');
            }}
          >
            设备配置页&gt;&gt;
          </a>
        </p>
        <p>
          2.查看接入服务是否正常，前往
          <a
            onClick={() => {
              history.push('/running-center');
            }}
          >
            运行中心&gt;&gt;
          </a>
        </p>
      </div>
    </>
  );
};

export default Live;
