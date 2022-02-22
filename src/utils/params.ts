import cloneDeep from 'lodash/cloneDeep';
import axios from 'axios';

export function formatFormDataParams(params: any) {
  const formData = new FormData();
  Object.keys(params).forEach((i) => {
    if (i === 'meta-data') {
      const copy = cloneDeep(params[i]);
      delete copy.sign_cert;
      delete copy.encry_cert;
      formData.append(i, JSON.stringify(copy));
    } else {
      formData.append(i, params[i]);
    }
  });
  return formData;
}

export function getCancelToken() {
  const { CancelToken } = axios;
  const source = CancelToken.source();
  return source;
}
