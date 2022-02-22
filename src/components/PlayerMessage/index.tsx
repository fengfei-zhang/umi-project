import React from 'react';
import { Spin, Row } from 'antd';
import selectVideoImg from '@/assets/img/select-video.png';
import { LOCAL_RECORD_CODE_MAP } from '@/utils/const';

import styles from './index.less';

export interface PlayerMessageProps {
  file: string;

  type: 'living' | 'record';

  // 云录像
  errorMessage?: any;
  code?: any;
  replay?: () => void;
  loading?: boolean;
  /**
   * 未开启前端录像或云录像
   */
  isClose?: boolean;
}

/**
 * 返回状态  请选择视频源|视频加载中|视频加载错误
 * @param props
 */
const PlayerMessage: React.FC<PlayerMessageProps> = (props) => {
  const { errorMessage, code, replay = () => {}, loading, file, isClose, type } = props;

  let content = null;
  const closeContent = (
    <div className={styles.main}>
      <div className={styles.box}>
        <img src={selectVideoImg} alt="" />
        <div style={{ marginTop: 8 }}>
          <span>该设备暂无录像</span>
        </div>
      </div>
    </div>
  );
  // 如果不为录像 或者 未在加载状态
  if (loading) {
    content = <Spin className={styles.spin} />;
  } else {
    content = (
      <div className={styles.box}>
        <img src={selectVideoImg} alt="" />
        <br />
        <span style={{ marginTop: 8, display: 'inline-block' }}>请选择视频源</span>
      </div>
    );
  }
  if (type === 'record') {
    //  camera local video control not enabled
    if (code === LOCAL_RECORD_CODE_MAP['141221']) {
      return closeContent;
    }

    // 未开启前端录像或云录像
    if (isClose) {
      return closeContent;
    }
    if (!file && !errorMessage) {
      return (
        <Row className={styles.main} justify="center" align="middle">
          {content}
        </Row>
      );
    }
  } else if (type === 'living') {
    if (!file) {
      return (
        <Row className={styles.main} justify="center" align="middle">
          {content}
        </Row>
      );
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.box}>
        {code !== 'fe0000000' && (
          // fe0000000 视频播放结束/未获取到录像请选择其他时段重试
          // eslint-disable-next-line react/button-has-type
          <button
            className="html5-player-middle-button"
            style={{ position: 'static', margin: 0 }}
            onClick={replay}
          >
            <svg className="html5-player-icon html5-player-replay-icon" aria-hidden="true">
              <use xlinkHref="#icon-replay" />
            </svg>
          </button>
        )}
        <div>{errorMessage}</div>
      </div>
    </div>
  );
};

export default PlayerMessage;
