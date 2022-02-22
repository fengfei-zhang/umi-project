export enum ServiceType {
  视频接入,
  图片接入,
}
export enum StatusType {
  离线,
  在线,
}
export const StartType = {
  已启用: true,
  未启用: false,
};
export enum EnumStartType {
  未启用,
  已启用,
}

export enum StreamType {
  主码流,
  子码流,
}

// 设备类型
export enum DeviceType {
  其他,
  球机,
  半球,
  固定枪机,
  遥控枪机,
  卡口枪机,
}

/** 接入类型 */
export enum AccessType {
  device,
  platform,
}

/** 视频接入协议 */
export enum VideoProtocolType {
  ONVIF,
  RTSP,
  // 海康,
  // 大华,
}

/** 图片接入协议 */
export enum PicProtocolType {
  // '1400 ',
  海康 = 1,
  大华,
}
// 设备品牌
export enum DeviceBrandType {
  其他,
  海康,
  大华,
  华为,
  宇视,
  科达,
  英飞拓,
  中兴,
  天地伟业,
}

/** 设备功能 */
export enum DeviceFunctionType {
  其他,
  视频监控,
  车辆识别,
  人脸识别,
  人体识别,
  视频服务器,
}
/** 监视方向 */
export enum MonitorDirectionType {
  其他,
  东,
  西,
  南,
  北,
  东南,
  东北,
  西南,
  西北,
  全向,
}
/** 补光灯 */
export enum FillInLightType {
  其他,
  无补光,
  红外补光,
  白光补光,
}
/** 坐标系 */
export enum CoordinateSystemType {
  'wgs-84',
  'gcj-高德',
}
/** 监控点类型 */
export enum PointType {
  其他,
  一类视频监控点,
  二类视频监控点,
  三类视频监控点,
  公安内部视频监控点,
}
/** 所属行业 */
export enum IndustryType {
  其他,
  公安机关,
  环保部门,
  文博部门,
  医疗部门,
  旅游管理,
  新闻广电,
  食品医疗监督管理部门,
  教育管理部门,
  检察院,
  法院,
  金融部门,
  交通部门,
  住房和城乡建设部门,
  水利部门,
  林业部门,
  安全生产监督部门,
  市政市容委,
  国土局,
}

/** 网络类型 */
export enum NetworkType {
  其他,
  视频专网,
  互联网,
  VPN专线,
}
/** 网络运营商 */
export enum ISPType {
  其他,
  联通,
  电信,
  移动,
  广电,
}
/** 立杆类型 */
export enum PoleType {
  新建,
  借墙,
  借杆,
}
/** 支臂方向 */
export enum BracketDirectionType {
  其他,
  东,
  西,
  南,
  北,
}

export interface ListParams {
  page?: number;
  size?: number;
  sort?: string;
  desc?: number;
}

export interface DevicesListParams extends ListParams {
  q?: string;
  /** device_id为空则返回所有设备 */
  device_id?: string;
}
export interface ChannelsListParams extends ListParams {
  access_type?: string;
}

interface OrigalStreams {
  stream_type: number;
  origal_url: string;
}
export interface ChannelLocation {
  type: string;
  longitude?: string;
  latitude?: string;
}

export interface ChannelParams {
  name?: string;
  fetch_stream_type?: number;
  origal_streams?: OrigalStreams[];
  cid?: number;
  username?: string;
  password?: string;
  ip?: string;
  civil_code?: string;
  device_type?: string;
  gbcode?: string;
  manufacturer?: string;
  model?: string;
  ptz_type?: number;
  location?: ChannelLocation;
  record_enable?: number;
  record_mode?: number;
  record_cycle?: number;
  record_format?: number;
  record_slot?: string;
  extension?: string;
}

export interface AddChannelParams extends ChannelParams {
  parent_id: string;
  channel_no: string;
}

export interface UptChannelParams extends ChannelParams {
  channel_id: string;
}
