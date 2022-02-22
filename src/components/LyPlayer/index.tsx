/*
 * @Author: zhangfengfei
 * @Date: 2021-07-22 13:48:18
 * @LastEditTime: 2021-12-22 10:25:00
 * @LastEditors: zhangfengfei
 */
import React, { useEffect, useRef, useState } from 'react';
// @ts-ignore
import Player from 'ly-player';
import styles from './index.less';
import 'html5-player/libs/assets/css/style.css';

export interface LyPlayerProps {
  isLiving: boolean;
  className?: string;
  // 转码端口，为了同时转码多个流
  port?: number;
  file: any;
  onEnd: (time: number) => void;
  [key: string]: any;
}

const LyPlayer: React.FC<LyPlayerProps> = (props) => {
  const { className, isLiving, onEnd, file } = props;

  const [loadTime, setLoadTime] = useState<number>(0);
  const playerRef = useRef<any>();
  const timer = useRef<any>();

  useEffect(() => {
    start();
    return clear;
  }, []);

  function start() {
    timer.current = setInterval(() => {
      setLoadTime((count) => {
        onEnd(count + 100);
        return count + 100;
      });
    }, 100);
  }

  function clear() {
    clearInterval(timer.current);
    timer.current = null;
    setLoadTime(0);
  }

  useEffect(() => {
    return () => {
      // 防止出现 The HTMLMediaElement.error attribute is not null 问题
      // https://github.com/Bilibili/flv.js/issues/334
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, []);

  return (
    <Player
      // 默认播发器配置
      file={file}
      contextMenu={false}
      className={`${styles['player-container']} ${className}`}
      // 目前存在开启worker的时候，有些播放源会存在卡帧问题。
      flvConfig={{
        enableWorker: isLiving,
      }}
      isLiving={isLiving}
      timeSliderShowFormat="date"
      autoplay
      retryTimes={2}
      timeout={1000 * 10}
      livingMaxBuffer={20}
      controls={{ playPause: !isLiving }}
      videoCallback={(player: any) => {
        playerRef.current = player;
        // player.on('loading', (loading: any) => {
        //   console.log(`player loading ====== ${loading}`);
        // });
        player.on('ready', (ready: any) => {
          clear();
          // console.log(`player ready ====== ${ready}`);
        });
        // player.on('replay', (replay: any) => {
        //   console.log(`player replay ====== ${replay}`);
        // });
        player.on('reload', (reload: any) => {
          start();
          // console.log(`player ====== reload ${reload}`, timeoutErrorRef.current);
          // 点击重新加载按钮
        });
        player.on('error', (error: any) => {
          clear();
          // 如果加载出错,停止计算加载时间
          // console.log(`player ====== error`, error);
          if (error && error.type === 'error') {
            // 重试后还是加载出错
          }
        });
        player.on('ended', (error: any) => {});
        player.on('pause', (error: any) => {
          // console.log('======pause=====', player);
          // 停止计时
        });
        player.on('play', (error: any) => {
          // console.log('======play=====', player);
          // 停止计时
        });
      }}
      // {...rest}
    />
  );
};

export default LyPlayer;
