import { baseUrl } from '../src/api';
import { userLoginApi, captchaApi, verifyCaptchaApi } from '../src/api';

export default {
  // 2.1.1 用户登录
  [`POST ${baseUrl}${userLoginApi}`]: (req: any, res: any) => {
    const { username, secret } = req.body;
    if (username && secret) {
      setTimeout(() => {
        res.send({
          code: 200,
          data: {
            token:
              'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjI2MjA5NzEsImlzcyI6InZpc2ciLCJub25jZSI6ImVlYWZiNzE2ZjkzZmEwOTBkNzcxNjc0OWE2ZWVmYTcyIiwic3ViIjoxLCJzdWJfdHlwZSI6InVzZXIifQ.RwpIv0awlYLhIwsJjaoEb3aVLSlhx4gUvw2bnccSFeVFx2XT56uDN4u0s8V7gLWk7N6PY__eF-u71Pec3F_CMw',
          },
          message: 'ok',
          request_id: '56e83d08ea1e4c209af9b857c2a9abf8',
        });
      }, 1000);
    } else {
      res.status(400).send({
        data: {},
        message: '参数错误',
        request_id: '56e83d08ea1e4c209af9b857c2a9abf8',
      });
    }
  },
  // 2.1.2 获取验证码
  [`GET ${baseUrl}${captchaApi}`]: (req: any, res: any) => {
    setTimeout(() => {
      res.send({
        code: 200,
        message: 'ok',
        data: {
          id_key: 'HFOJBohSTnzvNC68UDnN',
          data: 'data:image/png;base64,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',
        },
        request_id: 'fc63274a-6379-42c5-ac5a-8f2c4858e895',
      });
    }, 1000);
  },
  // 2.1.3 校验验证码
  [`POST ${baseUrl}${verifyCaptchaApi}`]: (req: any, res: any) => {
    const { id_key, verify_value } = req.body;
    if (id_key && verify_value) {
      setTimeout(() => {
        res.send({
          code: 200,
          message: 'ok',
          data: {},
          request_id: '9eb186f3-e92c-4b4d-8665-bae7b1846594',
        });
      }, 1000);
    } else {
      res.status(400).send({
        data: {},
        message: '参数错误',
        request_id: '56e83d08ea1e4c209af9b857c2a9abf8',
      });
    }
  },
};
