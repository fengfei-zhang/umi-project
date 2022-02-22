/*
 * @Author: zhangfengfei
 * @Date: 2021-06-28 17:05:42
 * @LastEditTime: 2022-02-21 16:24:22
 * @LastEditors: zhangfengfei
 */
import { isReqSuccess } from '@/utils/utils';
import type { Effect, Reducer, Subscription } from 'umi';

export interface GlobalModelState {}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  reducers: {};
  effects: {};
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {},

  reducers: {
    // saveDivisions(state, action) {
    //   return {
    //     ...state,
    //     divisions: action.payload,
    //   };
    // },
  },
  effects: {
    // *getDivisions({ payload }, { call, put, select }) {
    //   try {
    //     const response = yield call(getDivisionsService);
    //     if (isReqSuccess(response)) {
    //       const divisions = response.data.data.divisions as DivisionData[];
    //       yield put({
    //         type: 'saveDivisions',
    //         payload: divisions,
    //       });
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
  },

  subscriptions: {
    setup({ history, dispatch }): void {
      // 接入中心触发
      // history.listen(({ pathname }) => {
      //   if (pathname === '/access-center') {
      //     dispatch({
      //       type: 'getDivisions',
      //     });
      //     dispatch({
      //       type: 'getStatistics',
      //     });
      //   }
      // });
    },
  },
};

export default GlobalModel;
