import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Md5 } from 'ts-md5/dist/md5';
import CustomIcon from '@/components/CustomIcon';
import VerificationCode from '@/components/VerificationCode';
import { userLoginService } from '@/services/user';
import { AxiosResponse } from 'axios';
import { isReqSuccess } from '@/utils/utils';
import MatchstickTitle from '@/components/MatchstickTitle';
import cookie from '@/utils/cookie';
import styles from './index.less';
import { useHistory } from 'umi';
import Logo from '@/components/Logo';
import { useRequest } from 'ahooks';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const Login: React.FC = () => {
  const [focusId, setFocusId] = useState<any>();
  const history = useHistory();
  const [captchaKey, setCaptchaKey] = useState('');

  const [, setCaptchaUrl] = useState('');

  // 获取验证码
  // const captchaReq = useRequest(captchaService, {
  //   manual: true,
  //   formatResult: (response: AxiosResponse) => {
  //     if (isReqSuccess(response)) {
  //       const { data } = isReqSuccess(response);
  //       setCaptchaKey(data.id_key);
  //       setCaptchaUrl(data.data);
  //       return data;
  //     }
  //     return response.data;
  //   },
  // });
  // // 校验验证码
  // const verifyCaptchaReq = useRequest(verifyCaptchaService, {
  //   manual: true,
  //   formatResult: (response: AxiosResponse) => {
  //     if (isReqSuccess(response)) return true;
  //     return false;
  //   },
  //   onError: () => captchaReq.run(),
  // });

  // 登录
  const loginRequest = useRequest(
    (params: { username: string; secret: string }) => userLoginService(params),
    {
      manual: true,
      // 验证码校验成功才可发请求
      // ready: !!verifyCaptchaReq.data,
      formatResult: (response: AxiosResponse) => {
        return isReqSuccess(response, 'token');
      },
      onSuccess: (data: any, params) => {
        cookie.setCookie('token', data);
        cookie.setCookie('account', params[0].username);
        message.success('登录成功');
        history.replace('/access-center');
      },
      // onError: () => captchaReq.refresh(),
    },
  );

  // useEffect(() => {
  //   captchaReq.run();
  // }, []);

  const onSubmit = (values: { username: string; secret: string; code: string }) => {
    // verifyCaptchaReq.run({
    //   id_key: captchaKey,
    //   verify_value: values.code,
    // });
    loginRequest.run({ username: values.username, secret: Md5.hashStr(values.secret) });
  };

  return (
    <div className={styles.main}>
      <div className="flex flex-pack-center  flex-align-center" style={{ height: '100vh' }}>
        <div>
          <div
            className={`flex  flex-align-center flex-pack-center ${styles.title}`}
            style={{ width: 450 }}
          >
            <Logo />
            <span className="margin-left-middle" style={{ display: 'inline-block' }}>
              xxxx系统
            </span>
          </div>
          <div className={styles['form-layout']}>
            <MatchstickTitle className={styles['form-title']}>登录</MatchstickTitle>
            <div className={styles.form}>
              <Form onFinish={onSubmit} {...formItemLayout} layout="vertical">
                <Form.Item
                  name="username"
                  label="用户名"
                  rules={[{ required: true, message: '请输入用户名' }]}
                >
                  <Input
                    placeholder="请输入用户名"
                    prefix={
                      <CustomIcon
                        type="User"
                        className={focusId === 'account' ? 'primary-color' : ''}
                        style={{ height: 22, width: 22 }}
                      />
                    }
                    onFocus={(e) => {
                      setFocusId(e.target.id);
                    }}
                    onBlur={(e) => {
                      setFocusId('');
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="密码"
                  name="secret"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input.Password
                    type="password"
                    placeholder="请输入密码"
                    prefix={
                      <CustomIcon
                        type="Password"
                        className={focusId === 'password' ? 'primary-color' : ''}
                        style={{ height: 22, width: 22 }}
                      />
                    }
                    onFocus={(e) => {
                      setFocusId(e.target.id);
                    }}
                    onBlur={(e) => {
                      setFocusId('');
                    }}
                  />
                </Form.Item>
                {/* <Form.Item
                  label="验证码"
                  name="code"
                  rules={[{ required: true, message: '请输入验证码' }]}
                >
                  <Input
                    placeholder="请输入验证码"
                    prefix={
                      <CustomIcon
                        type="checkCode"
                        className={focusId === 'code' ? 'primary-color' : ''}
                        style={{ height: 22, width: 22 }}
                      />
                    }
                    onFocus={(e) => {
                      setFocusId(e.target.id);
                    }}
                    onBlur={(e) => {
                      setFocusId('');
                    }}
                    suffix={
                      <VerificationCode
                        onClick={captchaReq.run}
                        className={styles.code}
                        url={captchaUrl}
                      ></VerificationCode>
                    }
                  />
                </Form.Item> */}

                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className={styles.button}
                  loading={loginRequest.loading}
                >
                  登录
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
