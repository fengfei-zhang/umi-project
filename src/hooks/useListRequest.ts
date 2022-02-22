import { isReqSuccess } from '@/utils/utils';
import { useRequest } from '@umijs/hooks';
import { AxiosResponse } from 'axios';
import useCancelRequest from './useCancelRequest';

interface UseListRequest {
  service: any;
  cancelMap?: any;
  serviceId?: string;
  onSuccess?: (response: AxiosResponse) => void;
  name: string;
  cancel?: boolean;
  paginated?: boolean;
}

const useListRequest = ({
  service,
  cancelMap,
  onSuccess,
  serviceId = service.name,
  name,
  cancel = true,
  paginated = true,
}: UseListRequest) => {
  const { cancelRequest } = useCancelRequest([cancelMap]);

  return useRequest(
    (params: any) => {
      if (cancel && cancelMap) {
        cancelRequest(serviceId);
      }
      params.page = params.current;
      params.size = params.pageSize;
      return service(params);
    },
    {
      formatResult: (response: AxiosResponse) => {
        if (isReqSuccess(response, name)) {
          const result = isReqSuccess(response).data;
          if (onSuccess) {
            onSuccess(response);
          }

          return {
            list: result[name],
            total: result.total,
          };
        }
        return {
          list: [],
          total: 0,
        };
      },
      defaultLoading: true,
      initialData: { list: [], total: 0 },
      paginated: true,
    },
  );
};

export default useListRequest;
