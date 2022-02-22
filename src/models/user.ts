/*
 * @Author: zhangfengfei
 * @Date: 2021-06-29 19:52:07
 * @LastEditTime: 2022-02-21 16:57:20
 * @LastEditors: zhangfengfei
 */
import type { Subscription, Effect } from 'umi';

export interface UserModelState {}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    // query: Effect;
  };
  reducers: {
    // changeInfo: Reducer<UserModelState>;
  };
  subscriptions: { setup: Subscription };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {},

  effects: {
    // *query(_, { call, select }) {
    //   const a = yield select((state: { global: any }) => state.global);
    //   console.log(a);
    // },
  },

  reducers: {
    // changeInfo(state: any, { payload }): UserModelState {
    //   return {
    //     ...state,
    //     info: payload,
    //   };
    // },
  },

  subscriptions: {
    setup({ history }): void {},
  },
};

export default UserModel;
