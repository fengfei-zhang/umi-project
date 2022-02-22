import { isEmpty } from 'lodash';

/**
 * 格式化useRequest使用paginated的请求参数（主要是page,size）
 */
export const formatRequestPageParams = (params: any) => {
  // 处理请求参数
  const { current, pageSize, ...otherParams } = params;
  return {
    page: current,
    size: pageSize,
    ...otherParams,
  };
};

/**
 * 格式化useRequest使用filters的请求参数
 */
export const formatRequestFiltersParams = (params: any) => {
  // 处理请求参数
  const { filters, ...otherParams } = params;

  if (filters && !isEmpty(filters)) {
    const { status } = filters;
    if (!status) {
      return otherParams;
    }
    if (status.length > 1) {
      return otherParams;
    }
    const value = status[0];

    return {
      status: value,
      ...otherParams,
    };
  }

  return otherParams;
};

/**
 * 格式化useRequest使用sorter的请求参数
 */
export const formatRequestSortersParams = (params: any) => {
  // 处理请求参数
  const { sorter, ...otherParams } = params;
  if (sorter && !isEmpty(sorter)) {
    return params;
  }

  return otherParams;
};

/**
 * 格式化useRequest的请求参数
 */
export const formatRequestParams = (params: any) => {
  // 处理请求参数
  const pageParams = formatRequestPageParams(params);
  const filtersParams = formatRequestFiltersParams(pageParams);
  const sorterParams = formatRequestSortersParams(filtersParams);
  return sorterParams;
};

/**
 * todo 处理useRequest 数据返回
 * ! 处理请求
 */

/**
 * 1. 判断请求是否为成功
 */
export function isReqSuccess(response: any) {
  try {
    if (response.status === 200 && response.data.data) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

/**
 * 2. 格式化请求成功后返回值
 * @param {*} response
 * @param {string} returnDataKey
 * @params {*} return
 */
export function formatResponseResult(response: any, returnDataKey: string) {
  // 判断请求
  if (isReqSuccess(response)) {
    return {
      list: response.data.data[returnDataKey],
      total: response.data.data.count,
      ...response.data.data,
    };
  }
  return {
    list: [],
    total: 0,
  };
}

export default '';
