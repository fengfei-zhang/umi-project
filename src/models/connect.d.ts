/*
 * @Author: zhangfengfei
 * @Date: 2021-06-28 17:05:42
 * @LastEditTime: 2022-02-21 16:21:55
 * @LastEditors: zhangfengfei
 */
import type { Effect } from 'umi';
import { GlobalModelState } from './global';
import { UserModelState } from './user';

export { GlobalModelState, UserModelState };

export interface Loading {
  global: boolean;
  effects: Effect;
  models: {
    global?: boolean;
    home?: boolean;
    user?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  user: UserModelState;
  loading: Loading;
}

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = any, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

export interface Route {
  routes?: Route[];
}

export interface PageState {
  page: number;
  size: number;
  total: number;
}

export interface ModalState {
  visible: boolean;
  type?: 'update' | 'add';
}
