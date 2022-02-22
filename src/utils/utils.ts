/* eslint-disable no-param-reassign */
import { cloneDeep, divide, isEmpty, isNil, isString, remove } from 'lodash';
import cookie from './cookie';
import { COOKIE_LIST } from './const';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { DropDownPropsItem } from '@/components/Dropdown';
import { DivisionData } from '@/services/global';

export function findRootKey(list: any, key: string = 'code', parentKey: string = 'parent_code') {
  let i;
  let rootKey = '';
  // 存id
  const ids: number[] = [];
  // 存parentId
  const parentIds: number[] = [];
  for (i = 0; i < list.length; i += 1) {
    ids.push(list[i][key]);

    if (list[i][parentKey] > 0) {
      parentIds.push(list[i][parentKey]);
    }
  }

  list.forEach((item: any) => {
    if (!ids.includes(item[parentKey])) {
      rootKey = item[parentKey];
    }
  });
  return rootKey;
}

export function filterDropDownNameBykey(data: DropDownPropsItem[], key?: string) {
  let name;
  data.forEach((item) => {
    if (item.value === key) {
      name = item.label;
    }
  });
  return name;
}
/**
 * @description: 格式化列表请求结果 使其符合antd table
 * @param {AxiosResponse} response AxiosResponse
 * @param {string} name 返回数据列表的属性名
 * @return {*} {list:[],total:0}
 */
export const formateListResult = (response: AxiosResponse, name: string) => {
  if (isReqSuccess(response, name)) {
    const result = isReqSuccess(response).data;
    return {
      list: result[name],
      total: result.total,
    };
  }
  return {
    list: [],
    total: 0,
  };
};

// /**
//  *
//  * @param newList 列表
//  * @param key
//  * @param parentKey
//  */
// export function listToTreeWithOption(list: DivisionData[]) {
//   // const map = {};
//   // let node;
//   // const roots = [];
//   // let i;

//   const rootKey = findRootKey(list, key, parentKey);

//   // const;

//   // list.forEach((item, i) => {
//   //   list[i].title = list[i].title || list[i].name;
//   //   list[i].key = list[i][key];
//   //   map[list[i][key]] = i; // initialize the map
//   //   list[i].children = []; // initialize the children
//   // });

//   // // for (i = 0; i < list.length; i += 1) {
//   // // }

//   // for (i = 0; i < list.length; i += 1) {
//   //   node = list[i];

//   //   if (node[parentKey] !== rootKey) {
//   //     // if you have dangling branches check that map[node[parentKey]] exists
//   //     if (list[map[node[parentKey]]]) {
//   //       list[map[node[parentKey]]].children.push(node);
//   //     } else {
//   //       roots.push(node);
//   //     }
//   //   } else {
//   //     roots.push(node);
//   //   }
//   // }

//   // return roots;
// }

export interface FormattedParams {
  label: string;
  key: string;
  parentKey: string;
}
const initFormattedParams = {
  label: 'name',
  key: 'code',
  parentKey: 'parent_code',
};

export function arrayToTree(items: DivisionData[], params: FormattedParams = initFormattedParams) {
  const { label, key, parentKey } = params;
  const rootKey = findRootKey(items, key, parentKey);

  const result = []; // 存放结果集
  const itemMap = {}; //
  for (const item of items) {
    const id = item[key];
    const pid = item[parentKey];

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      };
    }

    itemMap[id] = {
      ...item,
      label: item[label],
      value: item[key],
      children: itemMap[id].children,
    };

    const treeItem = itemMap[id];

    if (pid === rootKey) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        };
      }
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
}

interface OptionItem {
  label: string;
  value: string;
  children?: OptionItem[];
}

// 移除转换后children为[]的子节点
export function removeEmpty(arr: OptionItem[]) {
  arr.forEach((ele, index) => {
    if (ele.children) {
      if (isEmpty(ele.children)) {
        delete ele.children;
      } else {
        removeEmpty(ele.children);
      }
    }
  });
  return arr;
}

export function findParentId(
  selectedValue: string,
  itemsMap: Record<string, any>,
  arr: any[],
  rootKey: string,
) {
  if (selectedValue && selectedValue !== rootKey) {
    arr.push(selectedValue);
    findParentId(itemsMap[selectedValue], itemsMap, arr, rootKey);
  }
}

export function translateMultiSelectValue(items: DivisionData[], selectValue: string) {
  const rootKey = findRootKey(items);
  const result: any[] = [];
  const itemsMap = {};
  items.forEach((ele) => {
    itemsMap[ele.code] = ele.parent_code;
  });
  findParentId(selectValue, itemsMap, result, rootKey);
  result.reverse();
  return result;
}

export function logout() {
  COOKIE_LIST.forEach((item) => {
    cookie.removeCookie(item);
  });
}

/**
 * 下载流文件
 * @param {Blob} result
 * @param {String} fileName
 * @param {String} type
 */
export function downloadBlobFile(result: any, fileName: string, type?: string) {
  const blob = new Blob([result]);
  const downloadElement = document.createElement('a');
  const href = window.URL.createObjectURL(blob); // 创建下载的链接
  downloadElement.href = href;
  if (type) {
    downloadElement.download = `${fileName}.${type}`; // 下载后文件名
  } else {
    downloadElement.download = `${fileName}`; // 下载后文件名
  }
  document.body.appendChild(downloadElement);
  downloadElement.click(); // 点击下载
  document.body.removeChild(downloadElement); // 下载完成移除元素
  window.URL.revokeObjectURL(href); // 释放掉blob对象
}

/**
 * 判断接口是否成功，并返回相关数据
 * @param response
 * @param returnDataKey
 */
export function isReqSuccess(response: any, returnDataKey?: string) {
  if (response.status === 200 && response.data.data) {
    if (returnDataKey && response.data.data[returnDataKey]) {
      return response.data.data[returnDataKey];
    }
    return response.data;
  }
  return false;
}

/**
 * @description: 表单某些string参数转number
 * @param {Record} obj 对象
 * @param {string} arr string[]
 * @return {*} 对象
 */
export const paramsTransToNum = (obj: any, arr: string[]) => {
  arr.forEach((element) => {
    if (Object.keys(obj).includes(element)) {
      if (typeof obj[element] === 'string') {
        if (!isNaN(Number(obj[element]))) {
          obj[element] = Number(obj[element]);
        }
      }
    }
  });
  return obj;
};

/**
 * @description 获取原始类型
 * @param {*} value
 * @returns {String} 类型字符串，如'String', 'Object', 'Null', 'Boolean', 'Number', 'Array'
 */
export function toRawType(value: any) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

/** 请求参数移除''，null,undefined */
export function clearEmptyParams(config: AxiosRequestConfig, items: any[]) {
  ['data', 'params'].forEach((item) => {
    if (config[item]) {
      const keys = Object.keys(config[item]);
      if (keys.length) {
        keys.forEach((key) => {
          const rawType = toRawType(config[item]);
          if (items.includes(config[item][key]) && ['Object'].includes(rawType)) {
            // 移除属性之前，进行深拷贝断开引用，避免影响页面
            config[item] = cloneDeep(config[item]);
            delete config[item][key];
          }
        });
      }
    }
  });
}

interface Option {
  label: string;
  value: any;
  key?: string;
}

/**
 * @description 获取enum的select options
 * @param {obj} Enum
 * @param {} callback 默认isString
 * @returns {String} options
 */

export function enumToOptions(
  obj: Record<string, any>,
  callback?: (res: any) => boolean,
): Option[] {
  return Object.values(obj)
    .filter((i) => {
      if (callback) {
        return callback(i);
      }
      return isString(i);
    })
    .map((item) => {
      return {
        key: item,
        label: item,
        value: obj[item],
      };
    });
}

/**
 * @description 获取enum的select options
 * @param {obj} Enum
 * @param {} callback 默认isString
 * @returns {String} options
 */

export function objToOptions(obj: Record<string, any>): Option[] {
  return Object.entries(obj).map((item) => {
    return {
      key: item[0],
      label: item[0],
      value: item[1],
    };
  });
}

export function getOffsetHeightById(id: string) {
  const ele = document.getElementById(id);
  if (ele) {
    return ele.offsetHeight;
  }
  return 0;
}

export const divided = (divisor: number, dividend: number) => {
  if (!divisor || !dividend) {
    return 0;
  }
  return `${(divide(divisor, dividend) * 100).toFixed(2)}`;
};

/** 值为null undefined和'' */
export const isBlank = (value: any) => {
  return isNil(value) || value === '';
};
