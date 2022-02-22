/*
 * @Author: zhangfengfei
 * @Date: 2022-02-21 14:37:10
 * @LastEditTime: 2022-02-22 15:18:35
 * @LastEditors: zhangfengfei
 */
import { createCancelToken, requestV1 } from '@/utils/request';
import { userLoginApi } from '@/api';

/**
 * 用户登录
 * @param params
 */
export async function userLoginService(
  params: {
    username: string;
    secret: string;
  },
  requestId: string = 'userLogin',
): Promise<any> {
  return requestV1.post(userLoginApi, params, {
    cancelToken: createCancelToken(requestId),
  });
}

/**
 * 获取验证码
 */
/* export async function captchaService(requestId: string = 'captcha'): Promise<any> {
  return requestV1.get(captchaApi, {
    cancelToken: createCancelToken(requestId),
  });
} */

/**
 * 校验验证码
 */
/* export async function verifyCaptchaService(
  params: {
    id_key: string;
    verify_value: string;
  },
  requestId: string = 'verify_captcha',
): Promise<any> {
  return requestV1.post(verifyCaptchaApi, params, {
    cancelToken: createCancelToken(requestId),
  });
} */
