import { isReqSuccess } from '@/utils/utils';
import { useRequest } from '@umijs/hooks';
import { message } from 'antd';
import { AxiosResponse } from 'axios';
import useMessageLoading from './useMessageLoading';

interface UseOperateRequestOperation {
  onSuccess?: (response: AxiosResponse) => void;
  service: any;
  showMsg?: boolean;
}

export default function useOperateRequest({
  onSuccess,
  service,
  showMsg = true,
}: UseOperateRequestOperation) {
  const request = useRequest(service, {
    formatResult: (response: AxiosResponse) => {
      if (isReqSuccess(response)) {
        if (onSuccess) {
          onSuccess(response);
        }
        if (showMsg) {
          message.success('操作成功');
        }
      }
    },
    manual: true,
  });
  useMessageLoading(request.loading);

  return request;
}
