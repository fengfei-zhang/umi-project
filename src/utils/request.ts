// import { createAxios } from 'rsf';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import axios from 'axios';
import { message } from 'antd';
import debounce from 'lodash/debounce';
import cookie from '@/utils/cookie';
import { clearEmptyParams } from './utils';
import qs from 'qs';
import { baseUrl } from '@/api';

const { CancelToken } = axios;
// const CancelToken = axios.CancelToken;

/** 后端接口标准格式 */

export interface AxiosResData<T = any> {
  data: T;
  message: string;
  code: number;
  request_id: string;
}
// 接口的data
export type ResponseData<T = any> = Promise<AxiosResponse<AxiosResData<T>>>;
type ServiceCancel = Record<string, CancelTokenSource>;
const cancelMap: ServiceCancel = {};
/**
 * @description: 创建CancelTokenSource
 */
export const createCancelToken = (requestId: string) => {
  cancelMap[requestId] = CancelToken.source();
  return cancelMap[requestId].token;
};

const showMessageDelayTime = 500;
// 延迟展示错误信息，针对用户不断点击或者多个请求同时报错的情况
// ${showErrorMessageDelayTime}秒内只展示一次错误信息
// 用户体验相关，不需要也可以，多个 message.error 的情况还是比较少的。
export const showErrorMessageDebounce = debounce((messageStr, callback?: any) => {
  if (callback) callback();
  message.error(messageStr);
}, showMessageDelayTime);

export const showSuccessMessageDebounce = debounce((messageStr, callback?: any) => {
  if (callback) callback();
  message.success(messageStr);
}, showMessageDelayTime);

// 返回 axio，详细请参考 https://github.com/axios/axios
const requestV1Instance = axios.create({
  // 超时时间 30 秒
  timeout: 30 * 1000,
  baseURL: baseUrl,
});

/**
 * @description: 拦截器
 */
const interceptors = (instance: AxiosInstance) => {
  // 添加请求拦截器
  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const { headers, method } = config;
    // 鉴权
    const token = cookie.getCookie('token');
    headers.Authorization = `Bearer ${token}`;
    headers['Cache-Control'] = 'no-cache';
    // 移除请求中值为''，undefined，null的参数
    clearEmptyParams(config, [null, '', undefined]);
    if (method === 'get') {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, {
          arrayFormat: 'repeat',
        });
      };
    }
    return config;
  });
  // 添加响应拦截器
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // console.log(error);
      if (axios.isCancel(error)) {
        // 取消请求的情况
        throw error;
      }
      // 统一处理错误信息
      if (error.response) {
        if (error.response.config.showNoneFailMessgeGlobally) {
          // 单个请求设置了 showNoneFailMessgeGlobally = true，不做全局提示。
          throw error;
        }
        // 服务端有响应，但是请求码是非 2xx 请求
        // 默认非 2xx 请求都是 非法请求
        const { data, status } = error.response;
        if (status === 401) {
          // token 过期失效
          showErrorMessageDebounce(data.message || '登录失效，需重新登录。');
          setTimeout(() => {
            // 为什么不用 history.push，因为会遗留各种 redux 的状态数据，
            // 而且登录用户也可能不是上一个用户，这种情况还是有可能发生的。
            // 所以直接重载页面，跳转到登录页面，就不用考虑上面的情况了。
            window.location.href = '/user/login';
          }, 800);
          throw error;
        }
        if (String(status).substring(0, 1) === '5') {
          if (data.data.err_msg) {
            showErrorMessageDebounce(data.data.err_msg);
          } else {
            showErrorMessageDebounce('系统错误。');
          }
          throw error;
        }
        if (data) {
          // 404 返回的 不一定是 json 数据，只有 data 不为 null，才是返回了 json 格式
          showErrorMessageDebounce(data.data.err_msg || data.message || error.response.statusText);
        } else {
          showErrorMessageDebounce(error.response.statusText);
        }
      } else if (error.request) {
        // 服务端无响应的情况
        // 网络无连接时会立即返回错误，请求超时（默认8秒）返回错误，跨域返回错误等情况
        showErrorMessageDebounce('网络连接出问题，或者连接超时。');
      } else {
        // axios 配置错误，一般都不会出现这个问题的。
        showErrorMessageDebounce('发生了未知错误。');
      }
    },
  );
  return instance;
};

const requestV1 = interceptors(requestV1Instance);

export { requestV1 };
